/**
 * Calculate cursor-following modal position with viewport edge clamping.
 *
 * The modal appears above-right of the cursor by default.
 * If it would overflow an edge it flips to the opposite side.
 */

export interface ModalPositionInput {
  cursorX: number;
  cursorY: number;
  modalWidth: number;
  modalHeight: number;
  viewportWidth: number;
  viewportHeight: number;
  pad?: number;
}

export interface ModalPosition {
  x: number;
  y: number;
}

export function calcModalPosition({
  cursorX,
  cursorY,
  modalWidth,
  modalHeight,
  viewportWidth,
  viewportHeight,
  pad = 16,
}: ModalPositionInput): ModalPosition {
  // Horizontal: prefer right of cursor
  let x = cursorX + pad;
  if (x + modalWidth > viewportWidth) {
    x = cursorX - modalWidth - pad;
  }
  // Clamp so it never goes off-screen left
  if (x < 0) x = 0;

  // Vertical: prefer above cursor
  let y = cursorY - modalHeight - pad;
  if (y < 0) {
    // Flip below cursor
    y = cursorY + pad;
  }
  // If flipped below and still overflows bottom, clamp to bottom edge
  if (y + modalHeight > viewportHeight) {
    y = viewportHeight - modalHeight;
  }
  // Final clamp so it never goes above viewport
  if (y < 0) y = 0;

  return { x, y };
}
