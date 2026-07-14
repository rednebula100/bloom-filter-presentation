import type { CSSProperties } from "react";
import SlideFrame from "@/src/components/SlideFrame";
import type { SlideProps } from "@/src/app/presentationStore";

const backgroundBits = [
  [7, 12, 0], [15, 22, 1], [24, 9, 0], [33, 18, 1], [43, 11, 0], [55, 20, 1],
  [66, 8, 1], [78, 17, 0], [89, 11, 1], [11, 39, 1], [21, 48, 0], [35, 42, 1],
  [48, 50, 0], [61, 39, 1], [73, 48, 0], [86, 42, 1], [94, 52, 0], [5, 68, 1],
  [17, 77, 0], [29, 66, 1], [41, 75, 1], [54, 68, 0], [69, 78, 1], [81, 67, 0],
  [91, 78, 1], [9, 91, 0], [26, 88, 1], [46, 92, 0], [63, 89, 1], [76, 94, 0],
] as const;

export default function Slide01Title({ step }: SlideProps) {
  return (
    <SlideFrame className="title-slide">
      <div className="bit-field" aria-hidden="true">
        {backgroundBits.map(([x, y, value], index) => (
          <span
            key={`${x}-${y}`}
            className={`bit-field__bit ${index % 7 === 0 ? "is-live" : ""}`}
            style={
              {
                left: `${x}%`,
                top: `${y}%`,
                "--ambient-delay": `${(index % 6) * 1.8}s`,
              } as CSSProperties
            }
          >
            {value}
          </span>
        ))}
      </div>

      <div className="title-slide__axis" aria-hidden="true">
        <span>PROBABILISTIC</span>
        <i />
        <span>MEMORY SYSTEM</span>
      </div>

      <div className="title-slide__content">
        <p className={`title-kicker reveal ${step >= 1 ? "visible" : ""}`} aria-hidden={step < 1}>
          QUESTION 01&nbsp;&nbsp;/&nbsp;&nbsp;COMPUTATIONAL MEMORY
        </p>
        <h1
          className={`hero-title reveal ${step >= 1 ? "visible glitch-once" : ""}`}
          aria-hidden={step < 1}
        >
          컴퓨터는 왜 일부러
          <br />
          틀린 답을 내는가?
        </h1>
        <p className={`hero-subtitle reveal ${step >= 2 ? "visible" : ""}`} aria-hidden={step < 2}>
          블룸 필터의 <em>거짓 양성 확률</em>과 메모리 최적화
        </p>
      </div>

      <p className={`title-thesis reveal ${step >= 2 ? "visible" : ""}`} aria-hidden={step < 2}>
        정확성 <strong>100%</strong>를 포기하면&nbsp;&nbsp;더 빠르고 가벼워질 수 있다.
      </p>
    </SlideFrame>
  );
}
