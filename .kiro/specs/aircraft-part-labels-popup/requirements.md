# Requirements Document

## Introduction

This feature adds an interactive popup/modal to the AR Aircraft web app (`markerless.html`). When a user clicks or taps a 3D aircraft part label (Ailerons, Elevator, Rudder, Flaps, Slats, or Spoilers), a popup appears displaying the part name and a description of its function. The popup can be dismissed via an X button or by tapping the background overlay.

## Glossary

- **App**: The interactive 3D aircraft web application running in `markerless.html`.
- **Label**: A Three.js sprite rendered in 3D space over an aircraft part, tagged with a `partKey` and `isPartLabel` flag in `userData`.
- **Popup**: The HTML modal element (`#partPopup`) that displays a part name and description.
- **Overlay**: The semi-transparent backdrop element (`#partPopupOverlay`) rendered behind the Popup.
- **Part_Descriptions**: The in-memory map of part keys (e.g., `'AILERONS'`) to their human-readable description strings.
- **Raycaster**: The Three.js `Raycaster` used to detect pointer/touch intersections with Label sprites in the 3D scene.
- **Close_Button**: The X button (`#popupClose`) inside the Popup used to dismiss it.

## Requirements

### Requirement 1: Display Popup on Label Interaction

**User Story:** As a user, I want to click or tap an aircraft part label in the 3D view, so that I can read a description of that part.

#### Acceptance Criteria

1. WHEN a user clicks or taps a Label sprite in the 3D scene, THE App SHALL display the Popup with the corresponding part name and description.
2. WHEN a Label is clicked or tapped, THE App SHALL populate the Popup title with the part name derived from the Label's `partKey`.
3. WHEN a Label is clicked or tapped, THE App SHALL populate the Popup body with the description from Part_Descriptions matching the Label's `partKey`.
4. WHEN the Popup is already visible, THE App SHALL ignore subsequent Label click and tap events until the Popup is dismissed.

---

### Requirement 2: Part Description Content

**User Story:** As a user, I want each popup to show an accurate description of the aircraft part, so that I can learn what each part does.

#### Acceptance Criteria

1. THE Part_Descriptions SHALL contain an entry for `AILERONS` with the description: "Located on the outer part of each wing. They control the roll of the aircraft by moving up on one wing and down on the other, causing the airplane to tilt left or right."
2. THE Part_Descriptions SHALL contain an entry for `ELEVATORS` with the description: "Found on the horizontal tail (horizontal stabilizer). It controls the pitch of the aircraft, allowing the nose to move up or down."
3. THE Part_Descriptions SHALL contain an entry for `RUDDER` with the description: "Positioned on the vertical tail (vertical stabilizer). It controls the yaw, which moves the aircraft's nose left or right."
4. THE Part_Descriptions SHALL contain an entry for `FLAPS` with the description: "Located on the inner section of the wings. They increase lift and drag, helping the aircraft during takeoff and landing by allowing slower flight speeds."
5. THE Part_Descriptions SHALL contain an entry for `SLATS` with the description: "Installed on the front edge of the wings. They improve lift at low speeds and help prevent stalling during takeup and landing."
6. THE Part_Descriptions SHALL contain an entry for `SPOILERS` with the description: "Panels on the top of the wings that reduce lift and increase drag. They are used to help the aircraft descend faster or slow down after landing."

---

### Requirement 3: Dismiss Popup via Close Button

**User Story:** As a user, I want to close the popup using an X button, so that I can return to viewing the 3D model.

#### Acceptance Criteria

1. THE Popup SHALL contain a Close_Button rendered as an X icon.
2. WHEN the Close_Button is clicked or tapped, THE App SHALL hide the Popup and the Overlay.
3. WHEN the Close_Button is clicked or tapped, THE App SHALL restore Label click and tap event handling so a new Popup can be opened.

---

### Requirement 4: Dismiss Popup via Overlay

**User Story:** As a user, I want to close the popup by tapping outside of it, so that I have a quick way to dismiss it.

#### Acceptance Criteria

1. WHEN the Popup is visible, THE App SHALL display the Overlay behind the Popup covering the full viewport.
2. WHEN the user clicks or taps the Overlay, THE App SHALL hide the Popup and the Overlay.

---

### Requirement 5: Popup Visibility State

**User Story:** As a user, I want the popup to appear and disappear cleanly, so that the experience feels responsive.

#### Acceptance Criteria

1. WHEN the Popup is hidden, THE App SHALL not render the Popup or the Overlay in the viewport.
2. WHEN the Popup is shown, THE App SHALL render the Popup centered in the viewport above all other UI elements.
3. WHILE the Popup is visible, THE App SHALL prevent 3D model rotation and movement gestures from being triggered by pointer events that interact with the Popup or Overlay.

---

### Requirement 6: Raycaster Label Detection

**User Story:** As a developer, I want label hit detection to be accurate and non-duplicating, so that the correct popup is shown and event listeners do not stack.

#### Acceptance Criteria

1. THE Raycaster SHALL be configured to intersect only Label sprites tagged with `isPartLabel: true` in `userData`.
2. WHEN the 3D aircraft model is reloaded, THE App SHALL remove the previous label click and touch event listeners from the renderer canvas before attaching new ones.
3. IF a Raycaster intersection produces no hit on a Label sprite, THEN THE App SHALL not display the Popup.
