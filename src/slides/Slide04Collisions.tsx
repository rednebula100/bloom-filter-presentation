import type { CSSProperties } from "react";
import BitArray from "@/src/components/BitArray";
import SlideFrame from "@/src/components/SlideFrame";
import type { SlideProps } from "@/src/app/presentationStore";
import {
  applePositions,
  bitsFor,
  finalActivePositions,
  insertedItems,
} from "@/src/data/bloomDemo";

const newPositions = [2, 11, 6];
const collisionPositions = new Set([8, 3, 11, 2, 6, 14]);

export default function Slide04Collisions({ beat }: SlideProps) {
  const expanded = beat === 1;
  const activePositions = expanded ? finalActivePositions : applePositions;

  return (
    <SlideFrame
      className={`accumulation-slide ${expanded ? "is-expanded" : ""}`}
      title="데이터가 쌓이면 비트가 겹친다"
    >
      <p className="slide-lead">새 데이터는 빈 비트를 채우기도 하고, 이미 켜진 비트를 함께 사용하기도 한다.</p>

      <div className="insertion-sequence" aria-label="데이터별 교육용 해시 위치">
        {insertedItems.map((item, itemIndex) => (
          <div
            className={`insertion-row ${itemIndex === 0 ? "is-existing" : ""}`}
            style={{ "--item-delay": `${120 + (itemIndex - 1) * 390}ms` } as CSSProperties}
            key={item.word}
          >
            <code>{item.word}</code>
            <span className="insertion-arrow" aria-hidden="true">→</span>
            <div className="position-list">
              {item.positions.map((position) => {
                const collided = itemIndex > 0 && collisionPositions.has(position) &&
                  insertedItems.slice(0, itemIndex).some((prior) => prior.positions.includes(position as never));
                return (
                  <span className={collided ? "is-collision" : ""} key={position}>
                    {position}
                    {collided && <small>겹침</small>}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="accumulation-bits">
        <p><strong>{expanded ? "4개 데이터의 흔적" : "apple의 흔적"}</strong><span>16칸 비트 배열</span></p>
        <BitArray
          bits={bitsFor(activePositions)}
          highlighted={expanded ? newPositions : []}
          collision={expanded ? finalActivePositions : []}
          deferred={expanded ? newPositions : []}
          activationDelay={420}
          activationStagger={300}
          showIndices
        />
      </div>

      <p className="accumulation-conclusion" aria-hidden={!expanded}>
        데이터가 많아질수록<br />
        <strong>서로 다른 데이터의 흔적이 같은 비트를 공유한다.</strong>
      </p>
    </SlideFrame>
  );
}
