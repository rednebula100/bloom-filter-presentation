import assert from "node:assert/strict";
import test from "node:test";

import {
  createPresentationReducer,
  initialPresentationState,
} from "../src/app/presentationStore.ts";
import { commandForKeyboardEvent } from "../src/app/keyboard.ts";

const slides = [
  { id: "s1", title: "", section: "", beats: [{ id: "b0", label: "" }] },
  { id: "s2", title: "", section: "", beats: [{ id: "b0", label: "" }, { id: "b1", label: "" }] },
  { id: "s3", title: "", section: "", beats: [{ id: "b0", label: "" }, { id: "b1", label: "" }] },
  { id: "s4", title: "", section: "", beats: [{ id: "b0", label: "" }, { id: "b1", label: "" }] },
  { id: "s5", title: "", section: "", beats: [{ id: "b0", label: "" }, { id: "b1", label: "" }] },
  { id: "s6", title: "", section: "", beats: [{ id: "b0", label: "" }, { id: "b1", label: "" }, { id: "b2", label: "" }] },
];

test("manual beats follow the scripted forward and backward flow", () => {
  const reduce = createPresentationReducer(slides);
  let state = initialPresentationState;
  const assertScene = (slideIndex, beat) => {
    assert.deepEqual([state.slideIndex, state.beat], [slideIndex, beat]);
  };

  assertScene(0, 0);
  for (const expected of [[1, 0], [1, 1], [2, 0], [2, 1]]) {
    state = reduce(state, { type: "NEXT" });
    assertScene(...expected);
  }
  for (const expected of [[2, 0], [1, 1], [1, 0], [0, 0]]) {
    state = reduce(state, { type: "PREVIOUS" });
    assertScene(...expected);
  }
});

test("slides 4 through 6 use the exact scripted beat flow in both directions", () => {
  const reduce = createPresentationReducer(slides);
  let state = { ...initialPresentationState, slideIndex: 2, beat: 1 };
  const expectedForward = [[3, 0], [3, 1], [4, 0], [4, 1], [5, 0], [5, 1], [5, 2]];
  const expectedBackward = [[5, 1], [5, 0], [4, 1], [4, 0], [3, 1], [3, 0], [2, 1]];

  for (const expected of expectedForward) {
    state = reduce(state, { type: "NEXT" });
    assert.deepEqual([state.slideIndex, state.beat], expected);
  }
  for (const expected of expectedBackward) {
    state = reduce(state, { type: "PREVIOUS" });
    assert.deepEqual([state.slideIndex, state.beat], expected);
  }
});

test("a repeated key does not produce a presentation command", () => {
  const command = commandForKeyboardEvent({
    key: "ArrowRight",
    repeat: true,
    altKey: false,
    ctrlKey: false,
    metaKey: false,
    target: null,
  });
  assert.equal(command, null);
});
