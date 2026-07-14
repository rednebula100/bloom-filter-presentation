import BitArray from "@/src/components/BitArray";
import HashFlow from "@/src/components/HashFlow";
import SlideFrame from "@/src/components/SlideFrame";
import type { SlideProps } from "@/src/app/presentationStore";

const activePositions = [3, 8, 14];

export default function Slide03Structure({ beat }: SlideProps) {
  const sequenceActive = beat === 1;
  const bits = Array.from(
    { length: 16 },
    (_, index) => sequenceActive && activePositions.includes(index),
  );

  return (
    <SlideFrame
      className={`structure-slide ${sequenceActive ? "is-sequenced" : ""}`}
      title="데이터를 저장하지 않고 위치를 저장한다"
    >
      <p className="index-contract">16칸 비트 배열 · 인덱스 0–15 · 0부터 시작</p>

      <div className="structure-flow">
        <HashFlow input="apple" outputs={activePositions} active={sequenceActive} />
        <div className="structure-bits">
          <BitArray
            bits={bits}
            highlighted={sequenceActive ? activePositions : []}
            showIndices
            activationDelay={650}
            activationStagger={130}
          />
        </div>
      </div>

      <p className="structure-conclusion" aria-hidden={!sequenceActive}>
        데이터 자체가 아니라
        <br />
        <strong>데이터가 가리킨 위치</strong>만 기억한다.
      </p>
    </SlideFrame>
  );
}
