import type { CSSProperties } from "react";
import SlideFrame from "@/src/components/SlideFrame";

const backgroundBits = [
  [8, 13, 0], [17, 23, 1], [28, 10, 0], [39, 18, 1], [51, 12, 0],
  [64, 20, 1], [76, 9, 1], [89, 17, 0], [12, 43, 1], [26, 50, 0],
  [45, 45, 1], [61, 40, 0], [80, 48, 1], [93, 56, 0], [9, 72, 1],
  [23, 81, 0], [41, 74, 1], [58, 83, 0], [72, 72, 1], [88, 82, 0],
  [15, 94, 0], [36, 91, 1], [67, 92, 1], [84, 95, 0],
] as const;

export default function Slide01Title() {
  return (
    <SlideFrame className="title-slide">
      <div className="bit-field" aria-hidden="true">
        {backgroundBits.map(([x, y, value], index) => (
          <span
            key={`${x}-${y}`}
            className={`bit-field__bit ${index % 6 === 0 ? "is-live" : ""}`}
            style={
              {
                left: `${x}%`,
                top: `${y}%`,
                "--ambient-delay": `${(index % 5) * 2.1}s`,
              } as CSSProperties
            }
          >
            {value}
          </span>
        ))}
      </div>

      <div className="title-slide__content">
        <p className="title-topic">블룸 필터 · 거짓 양성 확률 · 메모리 최적화</p>
        <h1 className="hero-title">
          컴퓨터는 왜
          <br />
          <em>일부러 틀린 답</em>을
          <br />
          내는가?
        </h1>
        <p className="hero-subtitle">블룸 필터의 거짓 양성 확률과 메모리 최적화</p>
      </div>

      <p className="title-thesis">
        정확성 <strong>100%</strong>를 포기하면 더 빠르고 가벼워질 수 있다.
      </p>
    </SlideFrame>
  );
}
