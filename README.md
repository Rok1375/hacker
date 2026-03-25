# Henry Heffernan - Portfolio 2022

Interactive 3D portfolio website built with Next.js 14, Three.js, React Three Fiber, and Framer Motion. Features a retro BIOS-style loading screen, typewriter text animations, and a 3D computer room scene with video-textured monitors.

## Tech Stack

- **Framework**: Next.js 14 (Static Export)
- **3D Engine**: Three.js with React Three Fiber and Drei
- **Animation**: Framer Motion, CSS keyframes
- **Styling**: Tailwind CSS 3.4
- **Language**: TypeScript 5.3

## Project Structure

```
henry-portfolio/
├── app/                    # Next.js App Router
│   ├── globals.css         # Global styles and animations
│   ├── layout.tsx          # Root layout with metadata
│   └── page.tsx            # Main page composing all sections
├── canvas/                 # Three.js 3D scene
│   ├── Camera.tsx          # Perspective camera with mouse parallax
│   ├── Computer.tsx        # GLTF computer model with video textures
│   ├── Environment.tsx     # Lights (directional, ambient, monitor glow)
│   ├── Experience.tsx      # Main canvas component, orchestrates scene
│   ├── Renderer.tsx        # WebGL renderer config
│   └── World.tsx           # Scene composition (computer + environment)
├── components/             # React UI components
│   ├── InfoButton.tsx      # Info icon button with hover animation
│   ├── InfoPanel.tsx       # Name/title/time display panel
│   ├── InteractiveZone.tsx # Click-to-enter monitor overlay
│   ├── LoadingScreen.tsx   # BIOS-style boot sequence
│   ├── MuteButton.tsx      # Audio mute toggle with icon
│   ├── Overlay.tsx         # Monitor-entered overlay with back button
│   ├── TypewriterText.tsx  # Character-by-character text reveal
│   └── VideoTextures.tsx   # Hidden video preload elements
├── utils/                  # Shared utilities
│   ├── EventEmitter.ts     # Global event bus (eventemitter3)
│   ├── Mouse.ts            # Normalized mouse position tracker
│   ├── Resources.ts        # Asset loader (GLTF, textures, video)
│   ├── Sizes.ts            # Viewport size + pixel ratio tracker
│   ├── sources.ts          # Asset manifest
│   └── Time.ts             # Animation frame ticker
└── public/                 # Static assets
    ├── models/             # GLTF models (computer_room.glb)
    ├── videos/             # Monitor video textures
    └── images/             # OG preview images
```

## Setup

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Static Build

```bash
npm run build
```

Output goes to `dist/`. Deploy to any static host (Vercel, Netlify, GitHub Pages).

## Assets

Place your assets in the `public/` directory:

- `public/models/computer_room.glb` - 3D computer room model
- `public/videos/video-1.mp4` - Monitor screen video 1
- `public/videos/video-2.mp4` - Monitor screen video 2
- `public/images/preview-new.jpg` - OG image for social sharing
- `public/favicon.ico` - Browser favicon

The site will render a black 3D scene until the GLTF model is provided. Videos are optional. The loading screen and UI work independently of the 3D assets.

## License

MIT
