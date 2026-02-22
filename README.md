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
- Reference: [Rotation controller code](file:///c:/Users/Admin/DEVELOPMENT/AR/markerless.html#L582-L624)

## 🎮Right Controller — Move
- Purpose: Moves the aircraft relative to its anchor.
- Actions:
  - Up/Down: Move vertically
  - Left/Right: Move horizontally
- Limits: Movement is clamped around the initial anchor position to keep the object in bounds.
- Hold behavior: Holding a direction repeats the movement for continuous motion.
- Reference: [Movement controller code](file:///c:/Users/Admin/DEVELOPMENT/AR/markerless.html#L626-L686)

## 🔍Zoom In / Zoom Out
- Purpose: Scales the active aircraft uniformly.
- Buttons:
  - “+” Zoom In
  - “−” Zoom Out
- Behavior:
  - Zoom In increases scale by ~10%.
  - Zoom Out decreases scale by ~10%.
- Reference: [Zoom buttons and handlers](file:///c:/Users/Admin/DEVELOPMENT/AR/markerless.html#L1593-L1620)

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
- Reference: [Menu toggle logic](file:///c:/Users/Admin/DEVELOPMENT/AR/markerless.html#L734-L752)

## Tips
- Place aircraft: Use the menu’s “Load 3D Aircraft” 
- Camera start: Use “Start Camera” in the menu; the preview appears behind the scene.
- Labels: Use “Show/Unshow Labels” in the menu to toggle overlays.

