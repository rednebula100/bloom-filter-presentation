import type { CSSProperties } from "react";

export type BitArrayProps = {
  bits: boolean[];
  highlighted?: number[];
  checking?: number[];
  collision?: number[];
  showIndices?: boolean;
};

export default function BitArray({
  bits,
  highlighted = [],
  checking = [],
  collision = [],
  showIndices = true,
}: BitArrayProps) {
  return (
    <div className="bit-array" role="group" aria-label={`${bits.length}칸 비트 배열`}>
      {bits.map((bit, index) => {
        const isHighlighted = highlighted.includes(index);
        const isChecking = checking.includes(index);
        const isCollision = collision.includes(index);
        const activationOrder = highlighted.indexOf(index);

        return (
          <div
            className={[
              "bit-cell",
              bit ? "is-active" : "",
              isHighlighted ? "is-highlighted" : "",
              isChecking ? "is-checking" : "",
              isCollision ? "is-collision" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            style={
              {
                "--bit-delay": `${Math.max(activationOrder, 0) * 120}ms`,
              } as CSSProperties
            }
            key={index}
            aria-label={`인덱스 ${index}, 값 ${bit ? 1 : 0}`}
          >
            {showIndices && <span className="bit-index">{index}</span>}
            <span className="bit-value">{bit ? "1" : "0"}</span>
          </div>
        );
      })}
    </div>
  );
}
