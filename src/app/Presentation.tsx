"use client";

import { useCallback, useEffect, useLayoutEffect, useReducer, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Navigation from "@/src/components/Navigation";
import ProgressBar from "@/src/components/ProgressBar";
import Slide01Title from "@/src/slides/Slide01Title";
import Slide02Memory from "@/src/slides/Slide02Memory";
import Slide03Structure from "@/src/slides/Slide03Structure";
import Slide04Collisions from "@/src/slides/Slide04Collisions";
import Slide05Lookup from "@/src/slides/Slide05Lookup";
import Slide06FalsePositive from "@/src/slides/Slide06FalsePositive";
import Slide07ProbabilityMath from "@/src/slides/Slide07ProbabilityMath";
import Slide08OptimalHashes from "@/src/slides/Slide08OptimalHashes";
import Slide09Experiment from "@/src/slides/Slide09Experiment";
import Slide10Conclusion from "@/src/slides/Slide10Conclusion";
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
    section: "도입",
    beats: [{ id: "cover", label: "표지" }],
    component: Slide01Title,
  },
  {
    id: "memory-weight",
    title: "완벽한 기억은 무겁다",
    section: "블룸 필터가 필요한 이유",
    beats: [
      { id: "full-storage", label: "원본 저장의 부담" },
      {
        id: "compact-memory",
        label: "압축된 비트 기억",
        autoSequence: "activate-compact-memory",
      },
    ],
    component: Slide02Memory,
  },
  {
    id: "structure",
    title: "데이터를 저장하지 않고 위치를 저장한다",
    section: "블룸 필터의 작동 원리",
    beats: [
      { id: "hash-input", label: "입력과 해시 함수" },
      {
        id: "set-bits",
        label: "위치만 기억",
        autoSequence: "draw-paths-and-set-bits",
      },
    ],
    component: Slide03Structure,
  },
  {
    id: "collisions",
    title: "데이터가 쌓이면 비트가 겹친다",
    section: "비트의 누적과 충돌",
    beats: [
      { id: "apple-inserted", label: "apple이 남긴 비트" },
      {
        id: "shared-bits",
        label: "데이터가 공유하는 비트",
        autoSequence: "insert-items-and-mark-collisions",
      },
    ],
    component: Slide04Collisions,
  },
  {
    id: "lookup",
    title: "블룸 필터는 어떻게 조회하는가?",
    section: "블룸 필터의 조회",
    beats: [
      { id: "lookup-input", label: "apple 조회" },
      {
        id: "probably-present",
        label: "존재할 수도 있음",
        autoSequence: "check-apple-positions",
      },
    ],
    component: Slide05Lookup,
  },
  {
    id: "false-positive",
    title: "존재하지 않는데 존재할 수도 있다고 판단한다",
    section: "거짓 양성",
    beats: [
      { id: "missing-input", label: "목록에 없는 melon" },
      {
        id: "matching-bits",
        label: "모두 1인 해시 위치",
        autoSequence: "check-melon-positions",
      },
      {
        id: "false-positive-reveal",
        label: "거짓 양성",
        autoSequence: "compare-filter-with-actual-data",
      },
    ],
    component: Slide06FalsePositive,
  },
  {
    id: "probability-math",
    title: "거짓 양성 확률을 결정하는 수학",
    section: "거짓 양성 확률의 변수",
    beats: [
      { id: "probability-formula", label: "거짓 양성 확률 공식" },
      {
        id: "variable-relations",
        label: "변수와 확률의 관계",
        autoSequence: "reveal-variable-relations",
      },
    ],
    component: Slide07ProbabilityMath,
  },
  {
    id: "optimal-hashes",
    title: "해시 함수는 많을수록 좋지 않다",
    section: "최적 해시 함수 개수",
    beats: [
      { id: "empty-axes", label: "실험 조건과 빈 그래프" },
      {
        id: "optimal-curve",
        label: "이론 곡선과 최저점",
        autoSequence: "draw-theory-curve-and-optimum",
      },
    ],
    component: Slide08OptimalHashes,
  },
  {
    id: "theory-experiment",
    title: "이론은 실제 실험에서도 맞을까?",
    section: "이론과 시뮬레이션",
    beats: [
      { id: "theory-baseline", label: "이론 곡선과 실험 조건" },
      {
        id: "simulation-comparison",
        label: "고정 실험값 비교",
        autoSequence: "plot-fixed-experiment-results",
      },
    ],
    component: Slide09Experiment,
  },
  {
    id: "conclusion",
    title: "완벽함을 포기하는 것이 더 강한 시스템을 만든다",
    section: "결론",
    beats: [{ id: "conclusion", label: "탐구 결론" }],
    component: Slide10Conclusion,
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
  const beat = slide.beats[state.beat];
  const SlideComponent = slide.component;
  const totalProgress =
    (state.slideIndex + (state.beat + 1) / slide.beats.length) / slides.length;

  return (
    <main
      className="presentation-viewport"
      data-presentation-root
      data-slide-index={state.slideIndex}
      data-step={state.beat}
      data-beat={state.beat}
      data-beat-id={beat.id}
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
          <SlideComponent beat={state.beat} direction={state.direction} />
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

        <p className="sr-only" aria-live="polite">
          {`${state.slideIndex + 1}번 슬라이드, ${beat.label}: ${slide.title}`}
        </p>
      </div>
    </main>
  );
}
