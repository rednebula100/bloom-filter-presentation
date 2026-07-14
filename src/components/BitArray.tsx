import type { CSSProperties } from "react";

export type BitArrayProps = {
  bits: boolean[];
  highlighted?: number[];
  checking?: number[];
  collision?: number[];
  deferred?: number[];
  showIndices?: boolean;
  activationDelay?: number;
  activationStagger?: number;
  checkDelay?: number;
  checkStagger?: number;
};

export default function BitArray({
  bits,
  highlighted = [],
  checking = [],
  collision = [],
  deferred = [],
  showIndices = true,
  activationDelay = 0,
  activationStagger = 120,
  checkDelay = 0,
  checkStagger = 180,
}: BitArrayProps) {
  return (
    <div className="bit-array" role="group" aria-label={`${bits.length}칸 비트 배열`}>
      {bits.map((bit, index) => {
        const isHighlighted = highlighted.includes(index);
        const isChecking = checking.includes(index);
        const isCollision = collision.includes(index);
        const isDeferred = deferred.includes(index);
        const activationOrder = highlighted.indexOf(index);
        const checkingOrder = checking.indexOf(index);

        return (
          <div
            className={[
              "bit-cell",
              bit ? "is-active" : "",
              isHighlighted ? "is-highlighted" : "",
              isChecking ? "is-checking" : "",
              isCollision ? "is-collision" : "",
              isDeferred ? "is-deferred" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            style={
              {
                "--bit-delay": `${activationDelay + Math.max(activationOrder, 0) * activationStagger}ms`,
                "--check-delay": `${checkDelay + Math.max(checkingOrder, 0) * checkStagger}ms`,
              } as CSSProperties
            }
            key={index}
            aria-label={`인덱스 ${index}, 값 ${bit ? 1 : 0}`}
          >
            {showIndices && <span className="bit-index">{index}</span>}
            <span className="bit-value">{bit ? "1" : "0"}</span>
            {isChecking && <span className="bit-check" aria-hidden="true">✓</span>}
          </div>
        );
      })}
    </div>
  );
}
