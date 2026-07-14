import type { ComponentType } from "react";

export type Direction = "forward" | "backward";

export type SlideProps = {
  beat: number;
  direction: Direction;
};

export type SlideBeat = {
  id: string;
  label: string;
  autoSequence?: string;
};

export type SlideDefinition = {
  id: string;
  title: string;
  section: string;
  beats: readonly SlideBeat[];
  component: ComponentType<SlideProps>;
};

export type PresentationState = {
  slideIndex: number;
  beat: number;
  direction: Direction;
  resetCount: number;
};

export type PresentationAction =
  | { type: "NEXT" }
  | { type: "PREVIOUS" }
  | { type: "HOME" }
  | { type: "END" }
  | { type: "RESET" };

export const initialPresentationState: PresentationState = {
  slideIndex: 0,
  beat: 0,
  direction: "forward",
  resetCount: 0,
};

export function lastBeatIndex(slide: SlideDefinition) {
  return slide.beats.length - 1;
}

export function createPresentationReducer(slides: SlideDefinition[]) {
  return function presentationReducer(
    state: PresentationState,
    action: PresentationAction,
  ): PresentationState {
    const current = slides[state.slideIndex];

    switch (action.type) {
      case "NEXT":
        if (state.beat < lastBeatIndex(current)) {
          return { ...state, beat: state.beat + 1, direction: "forward" };
        }
        if (state.slideIndex < slides.length - 1) {
          return {
            ...state,
            slideIndex: state.slideIndex + 1,
            beat: 0,
            direction: "forward",
          };
        }
        return state;

      case "PREVIOUS":
        if (state.beat > 0) {
          return { ...state, beat: state.beat - 1, direction: "backward" };
        }
        if (state.slideIndex > 0) {
          const previousIndex = state.slideIndex - 1;
          return {
            ...state,
            slideIndex: previousIndex,
            beat: lastBeatIndex(slides[previousIndex]),
            direction: "backward",
          };
        }
        return state;

      case "HOME":
        return { ...state, slideIndex: 0, beat: 0, direction: "backward" };

      case "END":
        return {
          ...state,
          slideIndex: slides.length - 1,
          beat: 0,
          direction: "forward",
        };

      case "RESET":
        return {
          ...state,
          beat: 0,
          direction: "backward",
          resetCount: state.resetCount + 1,
        };
    }
  };
}

export function isAtStart(state: PresentationState) {
  return state.slideIndex === 0 && state.beat === 0;
}

export function isAtEnd(state: PresentationState, slides: SlideDefinition[]) {
  const lastIndex = slides.length - 1;
  return state.slideIndex === lastIndex && state.beat === lastBeatIndex(slides[lastIndex]);
}
