// Feature: aircraft-part-labels-popup, Property 6: All six parts have descriptions
// Validates: Requirements 2.1–2.6

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { PART_DESCRIPTIONS } from './partDescriptions.js';

const REQUIRED_KEYS = ['AILERONS', 'ELEVATORS', 'RUDDER', 'FLAPS', 'SLATS', 'SPOILERS'];

describe('PART_DESCRIPTIONS', () => {
  it('contains exactly the six required keys', () => {
    expect(Object.keys(PART_DESCRIPTIONS)).toHaveLength(6);
    for (const key of REQUIRED_KEYS) {
      expect(PART_DESCRIPTIONS).toHaveProperty(key);
    }
  });

  // Feature: aircraft-part-labels-popup, Property 6: All six parts have descriptions
  it('property: every required key maps to a non-empty string', () => {
    fc.assert(
      fc.property(fc.constantFrom(...REQUIRED_KEYS), (key) => {
        const desc = PART_DESCRIPTIONS[key];
        return typeof desc === 'string' && desc.length > 0;
      }),
      { numRuns: 100 }
    );
  });

  it('has the exact description for AILERONS', () => {
    expect(PART_DESCRIPTIONS['AILERONS']).toBe(
      'Located on the outer part of each wing. They control the roll of the aircraft by moving up on one wing and down on the other, causing the airplane to tilt left or right.'
    );
  });

  it('has the exact description for ELEVATORS', () => {
    expect(PART_DESCRIPTIONS['ELEVATORS']).toBe(
      'Found on the horizontal tail (horizontal stabilizer). It controls the pitch of the aircraft, allowing the nose to move up or down.'
    );
  });

  it('has the exact description for RUDDER', () => {
    expect(PART_DESCRIPTIONS['RUDDER']).toBe(
      "Positioned on the vertical tail (vertical stabilizer). It controls the yaw, which moves the aircraft's nose left or right."
    );
  });

  it('has the exact description for FLAPS', () => {
    expect(PART_DESCRIPTIONS['FLAPS']).toBe(
      'Located on the inner section of the wings. They increase lift and drag, helping the aircraft during takeoff and landing by allowing slower flight speeds.'
    );
  });

  it('has the exact description for SLATS', () => {
    expect(PART_DESCRIPTIONS['SLATS']).toBe(
      'Installed on the front edge of the wings. They improve lift at low speeds and help prevent stalling during takeup and landing.'
    );
  });

  it('has the exact description for SPOILERS', () => {
    expect(PART_DESCRIPTIONS['SPOILERS']).toBe(
      'Panels on the top of the wings that reduce lift and increase drag. They are used to help the aircraft descend faster or slow down after landing.'
    );
  });
});
