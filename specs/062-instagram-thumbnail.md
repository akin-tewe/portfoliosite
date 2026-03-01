# Task 062 — Replace Instagram Redesign Thumbnail with Video

## Goal
The Instagram Redesign project card (id: 1) currently has no thumbnail (no `image`, no `video`). Replace it with the newly added video files — `igthumbW.webm` (wide/desktop) and `igthumbM.mp4` (mobile fallback).

## Asset Locations
Already in the repo:
- `/public/projects/instadesign/igthumbW.webm` — wide format, WebM (Chrome/Firefox)
- `/public/projects/instadesign/igthumbM.mp4` — mobile fallback, MP4 (Safari/universal)

## Files to Edit

### `data/ProjectThumbData.tsx`

Find the Instagram Redesign entry (id: 1):
```ts
{
    id: 1,
    title: "Instagram Redesign",
    tag: "Concept",
    body: "Conceptual redesign of Instagram's web experience.",
    color: "bg-rose-500",
    shadow: "rgba(251, 113, 133, 0.4)",
    tags: ["Front End", "UI/UX Design"],
    image: null,
    link: "/projects/instadesign",
    gradient: null,
},
```

Add a `video` field with the wide source, and add a `videoMobile` field for the mobile fallback:
```ts
{
    id: 1,
    title: "Instagram Redesign",
    tag: "Concept",
    body: "Conceptual redesign of Instagram's web experience.",
    color: "bg-rose-500",
    shadow: "rgba(251, 113, 133, 0.4)",
    tags: ["Front End", "UI/UX Design"],
    image: null,
    video: "/projects/instadesign/igthumbW.webm",
    videoMobile: "/projects/instadesign/igthumbM.mp4",
    link: "/projects/instadesign",
    gradient: null,
},
```

### `app/Landing.tsx`

The existing video rendering block in the project card loop looks like this:
```jsx
{project.video && (
  <video
    src={project.video}
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none"
  />
)}
```

Replace with a `<source>`-based approach that supports responsive formats:
```jsx
{project.video && (
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none"
  >
    <source src={project.video} type={project.video.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
    {project.videoMobile && (
      <source src={project.videoMobile} type={project.videoMobile.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
    )}
  </video>
)}
```

This way:
- Browsers that support WebM (Chrome, Firefox) use `igthumbW.webm`
- Safari falls through to `igthumbM.mp4`
- If a project has no `videoMobile`, the single source still works (backward compatible with Sifty's `.mp4`)

### TypeScript Note
If there is a TypeScript error about `videoMobile` not existing on the project type, look for any explicit type definition for the project data. If none exists (the data is just inferred), this should work automatically since TypeScript infers from the data array. If a type IS defined, add `videoMobile?: string;` to it.

## DO NOT Change
- The video files themselves
- Any other project entries
- The glass dot / MaslowCycle code
- The project card layout, hover effects, or styling
- The locked card rendering path

## Verification
- `npm run build` passes with zero errors
- Instagram Redesign card shows the video thumbnail playing on loop
- In Chrome: the `.webm` source loads
- In Safari: falls back to `.mp4`
- Other video cards (Sifty) still work correctly with their single `.mp4` source
- The video fills the card's 9:5 aspect ratio with `object-cover`
