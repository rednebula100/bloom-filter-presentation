"use client";

import { useCallback, useEffect, useLayoutEffect, useReducer, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Navigation from "@/src/components/Navigation";
import ProgressBar from "@/src/components/ProgressBar";
import Slide01Title from "@/src/slides/Slide01Title";
import Slide02Memory from "@/src/slides/Slide02Memory";
import Slide03Structure from "@/src/slides/Slide03Structure";
import { commandForKeyboardEvent } from "./keyboard";
import {
  createPresentationReducer,
  initialPresentationState,
  isAtEnd,
  isAtStart,
  type PresentationAction,
  type SlideDefinition,
} from "./presentationStore";

const STAGE_WIDTH = 1920;
const STAGE_HEIGHT = 1080;

const slides: SlideDefinition[] = [
  {
    id: "question",
    title: "컴퓨터는 왜 일부러 틀린 답을 내는가?",
    section: "PROLOGUE",
    maxStep: 2,
    component: Slide01Title,
  },
  {
    id: "memory-weight",
    title: "완벽한 기억은 무겁다",
    section: "WHY BLOOM FILTER",
    maxStep: 3,
    component: Slide02Memory,
  },
  {
    id: "structure",
    title: "블룸 필터의 구조",
    section: "CORE MECHANISM",
    maxStep: 4,
    component: Slide03Structure,
  },
];

const presentationReducer = createPresentationReducer(slides);

export default function Presentation() {
  const [state, dispatch] = useReducer(presentationReducer, initialPresentationState);
  const [scale, setScale] = useState(1);
  const [chromeVisible, setChromeVisible] = useState(true);
  const chromeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigationGate = useRef(0);

  const wakeChrome = useCallback(() => {
    setChromeVisible(true);
    if (chromeTimer.current) clearTimeout(chromeTimer.current);
    chromeTimer.current = setTimeout(() => setChromeVisible(false), 2600);
  }, []);

  const move = useCallback((action: PresentationAction) => {
    const now = Date.now();
    if ((action.type === "NEXT" || action.type === "PREVIOUS") && now < navigationGate.current) {
      return;
    }
    navigationGate.current = now + 120;
    dispatch(action);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await document.documentElement.requestFullscreen();
      }
    } catch {
      // Fullscreen can be denied by browser policy; the presentation remains usable.
    }
  }, []);

  useLayoutEffect(() => {
    const updateScale = () => {
      setScale(Math.min(window.innerWidth / STAGE_WIDTH, window.innerHeight / STAGE_HEIGHT));
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  useEffect(() => {
    chromeTimer.current = setTimeout(() => setChromeVisible(false), 2600);
    return () => {
      if (chromeTimer.current) clearTimeout(chromeTimer.current);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const command = commandForKeyboardEvent(event);
      if (!command) return;
      event.preventDefault();
      wakeChrome();

      if (command === "fullscreen") {
        void toggleFullscreen();
        return;
      }

      const actions: Record<Exclude<typeof command, "fullscreen">, PresentationAction> = {
        next: { type: "NEXT" },
        previous: { type: "PREVIOUS" },
        home: { type: "HOME" },
        end: { type: "END" },
        reset: { type: "RESET" },
      };
      move(actions[command]);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [move, toggleFullscreen, wakeChrome]);

  const slide = slides[state.slideIndex];
  const SlideComponent = slide.component;
  const totalProgress =
    (state.slideIndex + (state.step + 1) / (slide.maxStep + 1)) / slides.length;

  return (
    <main
      className="presentation-viewport"
      data-presentation-root
      data-slide-index={state.slideIndex}
      data-step={state.step}
      data-scale={scale.toFixed(4)}
      onPointerMove={wakeChrome}
      onPointerDown={wakeChrome}
    >
      <div
        className="presentation-stage"
        style={{ "--stage-scale": scale } as CSSProperties}
        aria-label="블룸 필터 인터랙티브 프레젠테이션"
      >
        <div
          key={slide.id}
          className={`slide-transition slide-transition--${state.direction}`}
        >
          <SlideComponent step={state.step} direction={state.direction} />
        </div>

        <Navigation
          hidden={!chromeVisible}
          previousDisabled={isAtStart(state)}
          nextDisabled={isAtEnd(state, slides)}
          onPrevious={() => {
            wakeChrome();
            move({ type: "PREVIOUS" });
          }}
          onNext={() => {
            wakeChrome();
            move({ type: "NEXT" });
          }}
        />

        <ProgressBar
          hidden={!chromeVisible}
          section={slide.section}
          current={state.slideIndex + 1}
          total={slides.length}
          progress={totalProgress}
        />

        <p className="keyboard-hint" aria-hidden="true">
          ← → STEP&nbsp;&nbsp;·&nbsp;&nbsp;F FULLSCREEN&nbsp;&nbsp;·&nbsp;&nbsp;R RESET
        </p>
        <p className="sr-only" aria-live="polite">
          {`${state.slideIndex + 1}번 슬라이드, ${state.step}단계: ${slide.title}`}
        </p>
      </div>
    </main>
  );
}
