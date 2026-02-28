import { describe, it, expect } from "vitest";
import { calcModalPosition } from "./calcModalPosition";

const VIEWPORT = { viewportWidth: 1920, viewportHeight: 1080 };
const MODAL = { modalWidth: 300, modalHeight: 200 };
const PAD = 16; // default

describe("calcModalPosition", () => {
  // ── Default placement (above-right of cursor) ──

  it("places modal above-right of cursor in open space", () => {
    const { x, y } = calcModalPosition({
      cursorX: 500,
      cursorY: 600,
      ...MODAL,
      ...VIEWPORT,
    });
    expect(x).toBe(500 + PAD); // right of cursor
    expect(y).toBe(600 - 200 - PAD); // above cursor
  });

  it("respects custom pad value", () => {
    const { x, y } = calcModalPosition({
      cursorX: 500,
      cursorY: 600,
      ...MODAL,
      ...VIEWPORT,
      pad: 24,
    });
    expect(x).toBe(500 + 24);
    expect(y).toBe(600 - 200 - 24);
  });

  // ── Right edge ──

  it("flips to left of cursor when right edge overflows", () => {
    const { x } = calcModalPosition({
      cursorX: 1800,
      cursorY: 600,
      ...MODAL,
      ...VIEWPORT,
    });
    // 1800 + 16 + 300 = 2116 > 1920, so flip
    expect(x).toBe(1800 - 300 - PAD);
  });

  it("clamps to left edge when flipped left would go negative", () => {
    const { x } = calcModalPosition({
      cursorX: 100,
      cursorY: 600,
      modalWidth: 500,
      modalHeight: 200,
      viewportWidth: 400,
      viewportHeight: 1080,
    });
    // 100 + 16 + 500 > 400 → flip: 100 - 500 - 16 = -416 → clamped to 0
    expect(x).toBe(0);
  });

  // ── Top edge ──

  it("flips below cursor when top edge overflows", () => {
    const { y } = calcModalPosition({
      cursorX: 500,
      cursorY: 100,
      ...MODAL,
      ...VIEWPORT,
    });
    // 100 - 200 - 16 = -116 < 0 → flip below: 100 + 16
    expect(y).toBe(100 + PAD);
  });

  // ── Bottom edge ──

  it("clamps to bottom when flipped below overflows viewport", () => {
    const { y } = calcModalPosition({
      cursorX: 500,
      cursorY: 50,
      modalWidth: 300,
      modalHeight: 200,
      viewportWidth: 1920,
      viewportHeight: 250,
    });
    // above: 50 - 200 - 16 = -166 → flip below: 50 + 16 = 66
    // 66 + 200 = 266 > 250 → clamp: 250 - 200 = 50
    expect(y).toBe(50);
  });

  // ── Corner cases ──

  it("handles top-right corner (both edges)", () => {
    const { x, y } = calcModalPosition({
      cursorX: 1800,
      cursorY: 50,
      ...MODAL,
      ...VIEWPORT,
    });
    expect(x).toBe(1800 - 300 - PAD); // flipped left
    expect(y).toBe(50 + PAD); // flipped below
  });

  it("handles bottom-right corner", () => {
    const { x, y } = calcModalPosition({
      cursorX: 1800,
      cursorY: 1000,
      ...MODAL,
      ...VIEWPORT,
    });
    expect(x).toBe(1800 - 300 - PAD); // flipped left
    expect(y).toBe(1000 - 200 - PAD); // above cursor (fits)
  });

  it("handles cursor at exact top-left origin", () => {
    const { x, y } = calcModalPosition({
      cursorX: 0,
      cursorY: 0,
      ...MODAL,
      ...VIEWPORT,
    });
    expect(x).toBe(0 + PAD); // right (fits in 1920)
    expect(y).toBe(0 + PAD); // flipped below (0 - 200 - 16 < 0)
  });

  it("handles cursor at bottom-right corner of viewport", () => {
    const { x, y } = calcModalPosition({
      cursorX: 1920,
      cursorY: 1080,
      ...MODAL,
      ...VIEWPORT,
    });
    // right: 1920 + 16 + 300 > 1920 → flip: 1920 - 300 - 16 = 1604
    expect(x).toBe(1604);
    // above: 1080 - 200 - 16 = 864 (fits)
    expect(y).toBe(864);
  });

  // ── Tiny viewport (modal larger than viewport) ──

  it("clamps to 0,0 when modal is larger than viewport", () => {
    const { x, y } = calcModalPosition({
      cursorX: 50,
      cursorY: 50,
      modalWidth: 500,
      modalHeight: 400,
      viewportWidth: 300,
      viewportHeight: 200,
    });
    // right: 50+16+500 > 300 → flip: 50-500-16 = -466 → clamped 0
    expect(x).toBe(0);
    // above: 50-400-16 = -366 → flip: 50+16 = 66
    // 66+400 = 466 > 200 → clamp: 200-400 = -200 → final clamp 0
    expect(y).toBe(0);
  });

  // ── Different modal sizes ──

  it("handles small modal (tag-only mini cards)", () => {
    const { x, y } = calcModalPosition({
      cursorX: 960,
      cursorY: 540,
      modalWidth: 180,
      modalHeight: 120,
      ...VIEWPORT,
    });
    expect(x).toBe(960 + PAD);
    expect(y).toBe(540 - 120 - PAD);
  });

  it("handles large modal with many tags", () => {
    const { x, y } = calcModalPosition({
      cursorX: 960,
      cursorY: 540,
      modalWidth: 320,
      modalHeight: 350,
      ...VIEWPORT,
    });
    expect(x).toBe(960 + PAD);
    expect(y).toBe(540 - 350 - PAD);
  });

  // ── Common real-world viewports ──

  it("works on 1366x768 (common laptop)", () => {
    const { x, y } = calcModalPosition({
      cursorX: 1200,
      cursorY: 100,
      ...MODAL,
      viewportWidth: 1366,
      viewportHeight: 768,
    });
    // right: 1200+16+300 = 1516 > 1366 → flip: 1200-300-16 = 884
    expect(x).toBe(884);
    // above: 100-200-16 = -116 → flip: 100+16 = 116
    expect(y).toBe(116);
  });

  it("works on Nest Hub (1024x600)", () => {
    const { x, y } = calcModalPosition({
      cursorX: 800,
      cursorY: 500,
      ...MODAL,
      viewportWidth: 1024,
      viewportHeight: 600,
    });
    // right: 800+16+300 = 1116 > 1024 → flip: 800-300-16 = 484
    expect(x).toBe(484);
    // above: 500-200-16 = 284 (fits)
    expect(y).toBe(284);
  });

  // ── Boundary precision ──

  it("does NOT flip when modal exactly fits right edge", () => {
    const { x } = calcModalPosition({
      cursorX: 1604,
      cursorY: 500,
      ...MODAL,
      ...VIEWPORT,
    });
    // 1604 + 16 + 300 = 1920 === viewportWidth → not > so no flip
    expect(x).toBe(1604 + PAD);
  });

  it("flips when modal overflows right by 1px", () => {
    const { x } = calcModalPosition({
      cursorX: 1605,
      cursorY: 500,
      ...MODAL,
      ...VIEWPORT,
    });
    // 1605 + 16 + 300 = 1921 > 1920 → flip
    expect(x).toBe(1605 - 300 - PAD);
  });

  it("does NOT flip vertically when modal exactly fits above", () => {
    const { y } = calcModalPosition({
      cursorX: 500,
      cursorY: 216,
      ...MODAL,
      ...VIEWPORT,
    });
    // 216 - 200 - 16 = 0 → not < 0, no flip
    expect(y).toBe(0);
  });

  it("flips vertically when 1px too close to top", () => {
    const { y } = calcModalPosition({
      cursorX: 500,
      cursorY: 215,
      ...MODAL,
      ...VIEWPORT,
    });
    // 215 - 200 - 16 = -1 < 0 → flip below: 215 + 16
    expect(y).toBe(231);
  });
});
