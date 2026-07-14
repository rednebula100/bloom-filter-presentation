import type { CSSProperties } from "react";
import SlideFrame from "@/src/components/SlideFrame";
import type { SlideProps } from "@/src/app/presentationStore";

const relations = [
  { variable: "n", change: "증가", result: "P 증가", kind: "up", caption: "더 많은 데이터가 비트를 채운다" },
  { variable: "m", change: "증가", result: "P 감소", kind: "down", caption: "더 넓은 배열이 충돌을 줄인다" },
  { variable: "k", change: "변화", result: "감소 후 증가", kind: "valley", caption: "검사 횟수에도 최적점이 있다" },
];

export default function Slide07ProbabilityMath({ beat }: SlideProps) {
  const explained = beat === 1;

  return (
    <SlideFrame className={`probability-math-slide ${explained ? "is-explained" : ""}`} title="거짓 양성 확률을 결정하는 수학">
      <div className="formula-hero" aria-label="거짓 양성 확률 근사 공식">
        <span>P</span>
        <b>≈</b>
        <span>(1 − e<sup>−kn/m</sup>)<sup>k</sup></span>
      </div>

      <dl className="variable-strip">
        <div><dt>m</dt><dd>비트 배열 길이</dd></div>
        <div><dt>n</dt><dd>저장한 데이터 개수</dd></div>
        <div><dt>k</dt><dd>해시 함수 개수</dd></div>
        <div><dt>P</dt><dd>거짓 양성 확률</dd></div>
      </dl>

      <div className="relation-strip" aria-hidden={!explained}>
        {relations.map((relation, index) => (
          <section key={relation.variable} style={{ "--relation-delay": `${120 + index * 190}ms` } as CSSProperties}>
            <div className="relation-equation"><strong>{relation.variable}</strong><span>{relation.change}</span><b>→</b><em>{relation.result}</em></div>
            <svg viewBox="0 0 280 84" aria-hidden="true">
              <path className={`relation-line relation-line--${relation.kind}`} pathLength="1" d={relation.kind === "up" ? "M 14 68 C 90 66, 178 50, 266 14" : relation.kind === "down" ? "M 14 14 C 90 28, 178 56, 266 68" : "M 14 18 C 74 72, 146 80, 266 18"} />
            </svg>
            <p>{relation.caption}</p>
          </section>
        ))}
      </div>

      <p className="probability-conclusion" aria-hidden={!explained}>
        거짓 양성 확률은 <strong>데이터 수 · 메모리 크기 · 해시 함수 개수의 균형</strong>으로 결정된다.
      </p>
    </SlideFrame>
  );
}
