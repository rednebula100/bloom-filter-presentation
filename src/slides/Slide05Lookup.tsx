import BitArray from "@/src/components/BitArray";
import SlideFrame from "@/src/components/SlideFrame";
import type { SlideProps } from "@/src/app/presentationStore";
import { applePositions, bitsFor, finalActivePositions } from "@/src/data/bloomDemo";

export default function Slide05Lookup({ beat }: SlideProps) {
  const checked = beat === 1;

  return (
    <SlideFrame className={`lookup-slide ${checked ? "is-checked" : ""}`} title="블룸 필터는 어떻게 조회하는가?">
      <p className="slide-lead">입력값이 가리키는 모든 위치가 1인지 확인한다.</p>

      <div className="lookup-query">
        <span>조회할 데이터</span>
        <code>apple</code>
        <div className="lookup-positions" aria-label="apple의 해시 위치">
          {applePositions.map((position, index) => (
            <span style={{ "--lookup-delay": `${index * 220}ms` } as React.CSSProperties} key={position}>{position}</span>
          ))}
        </div>
      </div>

      <div className="lookup-bits">
        <BitArray
          bits={bitsFor(finalActivePositions)}
          checking={checked ? applePositions : []}
          checkDelay={180}
          checkStagger={220}
          showIndices
        />
      </div>

      <div className="lookup-result" aria-hidden={!checked}>
        <span>조회 결과</span>
        <strong>PROBABLY PRESENT</strong>
        <small>존재할 수도 있음</small>
      </div>

      <p className="lookup-conclusion" aria-hidden={!checked}>
        블룸 필터는 “존재한다”가 아니라<br />
        <strong>“존재할 수도 있다”</strong>고 판단한다.
      </p>
    </SlideFrame>
  );
}
