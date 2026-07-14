import type { ComponentType } from "react";

export type Direction = "forward" | "backward";

export type SlideProps = {
  step: number;
  direction: Direction;
};

export type SlideDefinition = {
  id: string;
  title: string;
  section: string;
  maxStep: number;
  component: ComponentType<SlideProps>;
};

export type PresentationState = {
  slideIndex: number;
  step: number;
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
  step: 0,
  direction: "forward",
  resetCount: 0,
};

export function createPresentationReducer(slides: SlideDefinition[]) {
  return function presentationReducer(
    state: PresentationState,
    action: PresentationAction,
  ): PresentationState {
    const current = slides[state.slideIndex];

    switch (action.type) {
      case "NEXT":
        if (state.step < current.maxStep) {
          return { ...state, step: state.step + 1, direction: "forward" };
        }
        if (state.slideIndex < slides.length - 1) {
          return {
            ...state,
            slideIndex: state.slideIndex + 1,
            step: 0,
            direction: "forward",
          };
        }
        return state;

      case "PREVIOUS":
        if (state.step > 0) {
          return { ...state, step: state.step - 1, direction: "backward" };
        }
        if (state.slideIndex > 0) {
          const previousIndex = state.slideIndex - 1;
          return {
            ...state,
            slideIndex: previousIndex,
            step: slides[previousIndex].maxStep,
            direction: "backward",
          };
        }
        return state;

      case "HOME":
        return { ...state, slideIndex: 0, step: 0, direction: "backward" };

      case "END":
        return {
          ...state,
          slideIndex: slides.length - 1,
          step: 0,
          direction: "forward",
        };

      case "RESET":
        return {
          ...state,
          step: 0,
          direction: "backward",
          resetCount: state.resetCount + 1,
        };
    }
  };
}

export function isAtStart(state: PresentationState) {
  return state.slideIndex === 0 && state.step === 0;
}

export function isAtEnd(state: PresentationState, slides: SlideDefinition[]) {
  const lastIndex = slides.length - 1;
  return state.slideIndex === lastIndex && state.step === slides[lastIndex].maxStep;
}
