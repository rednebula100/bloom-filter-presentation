import BitArray from "@/src/components/BitArray";
import HashFlow from "@/src/components/HashFlow";
import SlideFrame from "@/src/components/SlideFrame";
import type { SlideProps } from "@/src/app/presentationStore";

const activePositions = [3, 8, 14];

export default function Slide03Structure({ step }: SlideProps) {
  const bits = Array.from({ length: 16 }, (_, index) => step >= 3 && activePositions.includes(index));

  return (
    <SlideFrame className="structure-slide" eyebrow="CORE / DATA FLOW" title="블룸 필터의 구조">
      <div className="index-contract">
        INDEX RANGE&nbsp;&nbsp;<strong>0–15</strong>
        <span>0부터 시작</span>
      </div>

      <div className="structure-flow">
        <HashFlow
          input="apple"
          outputs={activePositions}
          visibleCount={step >= 2 ? 3 : 0}
          showFunctions={step >= 1}
        />
        <div className="structure-bits">
          <BitArray bits={bits} highlighted={step >= 3 ? activePositions : []} showIndices />
        </div>
      </div>

      <p className={`structure-conclusion reveal ${step >= 4 ? "visible" : ""}`} aria-hidden={step < 4}>
        데이터 자체가 아니라&nbsp;&nbsp;<strong>데이터가 가리킨 위치</strong>만 기억한다.
      </p>
    </SlideFrame>
  );
}
