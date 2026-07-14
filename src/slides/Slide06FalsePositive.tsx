import BitArray from "@/src/components/BitArray";
import SlideFrame from "@/src/components/SlideFrame";
import type { SlideProps } from "@/src/app/presentationStore";
import { bitsFor, finalActivePositions, insertedItems, melonPositions } from "@/src/data/bloomDemo";

export default function Slide06FalsePositive({ beat }: SlideProps) {
  const checked = beat >= 1;
  const revealed = beat === 2;

  return (
    <SlideFrame
      className={`false-positive-slide ${checked ? "is-checked" : ""} ${revealed ? "is-revealed" : ""}`}
      title="존재하지 않는데 존재할 수도 있다고 판단한다"
    >
      <div className="false-positive-context">
        <section className="actual-list" aria-label="실제로 삽입된 데이터">
          <span>실제 삽입 목록</span>
          <div>{insertedItems.map((item) => <code key={item.word}>{item.word}</code>)}</div>
          <p><code>melon</code>은 목록에 없음</p>
        </section>

        <section className="melon-query" aria-label="melon 조회">
          <span>조회할 데이터</span>
          <code>melon</code>
          <div>
            {melonPositions.map((position, index) => (
              <b style={{ "--lookup-delay": `${index * 220}ms` } as React.CSSProperties} key={position}>{position}</b>
            ))}
          </div>
        </section>
      </div>

      <div className="false-positive-bits">
        <BitArray
          bits={bitsFor(finalActivePositions)}
          checking={checked ? melonPositions : []}
          checkDelay={160}
          checkStagger={220}
          showIndices
        />
      </div>

      <div className="probable-result" aria-hidden={!checked}>
        <span>Bloom Filter Result</span>
        <strong>PROBABLY PRESENT</strong>
      </div>

      <div className="false-positive-reveal" aria-hidden={!revealed}>
        <strong className="false-positive-label">FALSE POSITIVE</strong>
        <div className="result-comparison">
          <section>
            <span>Bloom Filter Result</span>
            <strong>Probably Present</strong>
          </section>
          <section>
            <span>Actual Data</span>
            <strong>Not Present</strong>
          </section>
        </div>
        <p>필요한 비트는 모두 1이지만, <strong>실제 데이터에는 존재하지 않는다.</strong></p>
      </div>
    </SlideFrame>
  );
}
