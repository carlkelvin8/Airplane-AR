# Implementation Plan: Aircraft Part Labels Popup

## Overview

Wire up the interactive part-label popup in `markerless.html`. All DOM elements and CSS already exist — the work is completing the `PART_DESCRIPTIONS` map, tagging sprites in `addCallout`, and implementing the `setupLabelClick` IIFE with raycaster hit detection and show/hide logic.

## Tasks

- [x] 1. Add PART_DESCRIPTIONS map
  - Define the `PART_DESCRIPTIONS` constant in the `<script module>` block with all six part keys and their exact description strings
  - Keys must be uppercase: `AILERONS`, `ELEVATORS`, `RUDDER`, `FLAPS`, `SLATS`, `SPOILERS`
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

  - [x]* 1.1 Write property test for PART_DESCRIPTIONS completeness
    - **Property 6: All six parts have descriptions**
    - **Validates: Requirements 2.1–2.6**

- [ ] 2. Implement showPopup and hidePopup functions
  - [x] 2.1 Implement `showPopup(key)`
    - Look up `key` in `PART_DESCRIPTIONS`; return early if not found
    - Set `#popupTitle` textContent to `key` and `#popupBody` textContent to the description
    - Add `.visible` class to `#partPopup` and `#partPopupOverlay`
    - _Requirements: 1.1, 1.2, 1.3, 5.2_

  - [ ]* 2.2 Write property test for showPopup round trip
    - **Property 1: Part description lookup round trip**
    - **Validates: Requirements 1.2, 1.3, 2.1–2.6**

  - [x] 2.3 Implement `hidePopup()`
    - Remove `.visible` class from `#partPopup` and `#partPopupOverlay`
    - _Requirements: 3.2, 4.2, 5.1_

  - [ ]* 2.4 Write property test for hidePopup
    - **Property 3: Close restores hidden state**
    - **Validates: Requirements 3.2, 4.2**

- [x] 3. Wire close button and overlay dismiss handlers
  - Attach a `click` listener on `#popupClose` that calls `hidePopup()`
  - Attach a `click` listener on `#partPopupOverlay` that calls `hidePopup()`
  - _Requirements: 3.1, 3.2, 3.3, 4.1, 4.2_

- [x] 4. Tag label sprites in addCallout
  - In `addCallout(target, text, offset)`, after creating the sprite, set `spr.userData.partKey = text.toUpperCase()` and `spr.userData.isPartLabel = true`
  - _Requirements: 6.1_

- [ ] 5. Implement setupLabelClick IIFE
  - [x] 5.1 Implement listener deduplication
    - Before attaching new listeners, remove `window.__labelClickHandler` from `renderer.domElement` for both `click` and `touchend` events
    - Store the new handler on `window.__labelClickHandler`
    - _Requirements: 6.2_

  - [ ]* 5.2 Write property test for no listener stacking
    - **Property 5: No listener stacking on model reload**
    - **Validates: Requirements 6.2**

  - [x] 5.3 Implement raycaster hit detection
    - Create a `THREE.Raycaster` and `THREE.Vector2`; normalize pointer/touch coords to NDC
    - Call `raycaster.intersectObjects(labelSprites, false)` and find the first hit where `userData.isPartLabel === true`
    - If no tagged hit, exit without showing popup
    - _Requirements: 6.1, 6.3_

  - [ ]* 5.4 Write property test for raycaster tag filtering
    - **Property 4: Raycaster only hits tagged sprites**
    - **Validates: Requirements 6.1, 6.3**

  - [x] 5.5 Implement popup open guard
    - Before calling `showPopup`, check `popup.classList.contains('visible')`; if true, return without updating the popup
    - _Requirements: 1.4_

  - [ ]* 5.6 Write property test for popup open guard
    - **Property 2: Popup is blocked while already visible**
    - **Validates: Requirements 1.4**

- [x] 6. Call setupLabelClick from load3dAircraft
  - After all six `addCallout` calls complete inside `load3dAircraft`, invoke `setupLabelClick()`
  - _Requirements: 1.1, 6.2_

- [x] 7. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- All changes are confined to `markerless.html` — no new files or dependencies
- Property tests use fast-check with a minimum of 100 iterations per property, tagged with `// Feature: aircraft-part-labels-popup, Property N: ...`
- Unit tests and property tests are complementary: unit tests cover specific examples and edge cases, property tests verify general rules
