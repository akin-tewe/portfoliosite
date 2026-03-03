# Transparent Video Encoding Workflow

This project uses transparent (alpha channel) videos for character animations. Two formats are required for cross-browser support:

| Format | Codec | Browser | Encoded where |
|---|---|---|---|
| `.mp4` | HEVC with alpha (`hvc1`) | Safari | macOS only (GitHub Actions) |
| `.webm` | VP9 with alpha | Chrome, Firefox | Local (Windows/Mac/Linux) |

## Naming Convention

Files use a suffix to indicate format:
- `{name}M.mp4` — HEVC alpha for Safari
- `{name}W.webm` — VP9 alpha for Chrome/Firefox

Example: `walkingM.mp4`, `walkingW.webm`

## Current Transparent Videos

| Video | Location | Used by |
|---|---|---|
| `walkingM.mp4` / `walkingW.webm` | `public/` | ContactMe.tsx |
| `aboutmeM.mp4` / `aboutmeW.webm` | `public/` | AboutMe.tsx (via TransparentVideo) |
| `lowerblacksplashM.mp4` / `lowerblacksplashW.webm` | `public/` | Landing.tsx (via MainVideo) |
| `runningM.mp4` / `runningW.webm` | `public/` | LoadingOverlay.tsx (via MainVideo) |

## Step 1: Export from Premiere Pro

1. Select the composition/sequence with transparency
2. Export settings:
   - Format: **MXF OP1a**
   - Codec: **Apple ProRes 4444** (must be 4444, not 422 — only 4444 supports alpha)
   - Check **"Include Alpha Channel"** or ensure alpha is enabled
3. Export the `.mxf` file
4. Place it in `public/test/`

### Verifying alpha

Run ffprobe on the exported file:

```bash
ffprobe -v info your_file.mxf 2>&1 | grep Stream
```

Look for `yuva444p12le` — the **a** in `yuva` confirms alpha is present. If you see `yuv444p12le` (no `a`), alpha was not included in the export.

## Step 2: Encode WebM (VP9 alpha) — Local

This can be done on any OS with ffmpeg installed.

```bash
ffmpeg -i public/test/source.mxf \
  -c:v libvpx-vp9 \
  -pix_fmt yuva420p \
  -b:v 2M \
  -an \
  public/{name}W.webm -y
```

- `-pix_fmt yuva420p` — preserves alpha channel
- `-b:v 2M` — target bitrate (adjust if quality is insufficient)
- `-an` — strips audio

## Step 3: Encode MP4 (HEVC alpha) — GitHub Actions

HEVC alpha encoding requires Apple's VideoToolbox hardware encoder, which only exists on macOS. We use a GitHub Actions workflow to access a macOS runner.

### Triggering the workflow

1. Commit and push the `.mxf` file to `public/test/`
2. Go to **Actions** > **Encode HEVC Alpha (macOS)** > **Run workflow**
3. Set inputs:
   - `input_path`: path to the MXF in repo (e.g. `public/test/source.mxf`)
   - `output_name`: desired output filename without extension (e.g. `walkingM`)
4. Run the workflow
5. Once complete, download the artifact from the workflow run page (or via API)
6. Place the `.mp4` in `public/`

### Workflow file

Located at `.github/workflows/encode-hevc-alpha.yml`. It runs:

```bash
ffmpeg -i <input> \
  -c:v hevc_videotoolbox \
  -allow_sw 1 \
  -alpha_quality 0.75 \
  -tag:v hvc1 \
  -b:v 2M \
  -an \
  <output>.mp4 -y
```

- `hevc_videotoolbox` — Apple's hardware HEVC encoder (only available on macOS)
- `-alpha_quality 0.75` — alpha channel quality (0.0–1.0)
- `-tag:v hvc1` — required tag for Safari to recognize the codec
- `-allow_sw 1` — falls back to software encoding if hardware isn't available

### Why not encode locally on Windows?

`libx265` (the open-source HEVC encoder) does not support alpha layer encoding. Apple's HEVC alpha is a proprietary dual-layer extension only implemented in VideoToolbox. There is no Windows or Linux encoder that can produce it.

## Step 4: Wire up in code

Videos are rendered via components in `components/SplashVideo.tsx`:

- **`<TransparentVideo>`** — for inline character animations (about page, etc.)
- **`<MainVideo>`** — for hero/splash videos (desktop only, with IntersectionObserver play/pause)

Both accept `mp4Src` and `webmSrc` props. Source order in the `<video>` tag:

```tsx
<source src={mp4Src} type="video/mp4;codecs=hvc1" />  {/* Safari picks this */}
<source src={webmSrc} type="video/webm" />             {/* Chrome/Firefox pick this */}
```

Safari will play the first source it supports (HEVC alpha). Chrome/Firefox skip the HEVC source and fall back to WebM.

For standalone video tags (like in ContactMe.tsx), use the same source order directly.

## Cleanup

After encoding is complete and files are placed in `public/`:

1. Delete the `.mxf` source from `public/test/` (these are 25–50MB each)
2. Commit the encoded files to git
3. Verify on both Safari and Chrome that transparency renders correctly
