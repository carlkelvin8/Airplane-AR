# AR Aircraft Controls Manual

This project provides on-screen controllers to rotate, move, zoom, and manage the UI for the AR aircraft. Below is a concise manual.

## 📱Controllers at a Glance
- Left controller: Rotating controller (D‑pad)
- Right controller: Moving controller (D‑pad)
- Zoom: Plus and minus buttons at the bottom center
- Menu: Dropdown toggle button (three bars)

## 🎮Left Controller — Rotate
- Purpose: Rotates the active aircraft.
- Actions:
  - Up/Down: Pitch up/down
  - Left/Right: Yaw left/right
- Hold behavior: Holding a direction repeats the action for smooth rotation.
- Reference: [Rotation controller code](markerless.html#L582-L624)

## 🎮Right Controller — Move
- Purpose: Moves the aircraft relative to its anchor.
- Actions:
  - Up/Down: Move vertically
  - Left/Right: Move horizontally
- Limits: Movement is clamped around the initial anchor position to keep the object in bounds.
- Hold behavior: Holding a direction repeats the movement for continuous motion.
- Reference: [Movement controller code](markerless.html#L626-L686)

## 🔍Zoom In / Zoom Out
- Purpose: Scales the active aircraft uniformly.
- Buttons:
  - “+” Zoom In
  - “−” Zoom Out
- Behavior:
  - Zoom In increases scale by ~10%.
  - Zoom Out decreases scale by ~10%.
- Reference: [Zoom buttons and handlers](markerless.html#L1593-L1620)

## 📃Dropdown Menu Toggle
- Purpose: Opens a dropdown with quick actions.
- Toggle:
  - Tap the menu button (three bars) to open/close.
  - Tapping outside the menu closes it.
- Common items:
  - Load 3D Aircraft
  - Reset
  - Start Camera
  - Show/Unshow Labels
- Reference: [Menu toggle logic](markerless.html#L734-L752)

## Tips
- Place aircraft: Use the menu’s “Load 3D Aircraft” 
- Camera start: Use “Start Camera” in the menu; the preview appears behind the scene.
- Labels: Use “Show/Unshow Labels” in the menu to toggle overlays.


## Developer Notes
- Tech Stack
  - HTML/CSS/JavaScript (ES Modules via importmap)
  - UI: Custom D‑pad controllers, dropdown menu
  - Media: getUserMedia for camera preview
  - Architecture
  - Rotation controller (left D‑pad): [markerless.html:L582-L624](markerless.html#L582-L624)
  - Movement controller (right D‑pad): [markerless.html:L626-L686](markerless.html#L626-L686)
  - Zoom handlers (adjustScale): [markerless.html:L1593-L1620](markerless.html#L1593-L1620)
  - Menu toggle logic: [markerless.html:L734-L752](markerless.html#L734-L752)
  - Anchor‑based movement clamp: [markerless.html:L640-L655](markerless.html#L640-L655)
  - Overlay meshes for aircraft surfaces: [markerless.html:L1226-L1333](markerless.html#L1226-L1333)
  - Overlay tilt helper (Y): [markerless.html:L1603-L1619](markerless.html#L1603-L1619)
  - Labels (sprite + line): [markerless.html:L1709-L1716](markerless.html#L1709-L1716)
  - Start overlay toggle variable: [markerless.html:L1490-L1490](markerless.html#L1490-L1490)
- Input Patterns
  - Hold‑to‑repeat via setInterval for D‑pads
  - Movement clamped around an anchor to prevent losing the object
  - Responsive layout for zoom buttons inside a top‑controls wrapper
- Extensibility Tips
  - New surface overlays: use mkOverlay, position/rotate, then push to overlayMeshes for global tilt control
  - Add menu actions via addMenuItem(title, handler) and call closeMenu after
  - Duplicate label sprites for per‑surface annotations; keep renderOrder high and disable depthTest/depthWrite
  - For device‑tilt analog feedback, map camera Euler angles to UI knob transform for visual cues
