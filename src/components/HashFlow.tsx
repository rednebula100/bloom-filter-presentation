import type { CSSProperties } from "react";

export type HashFlowProps = {
  input: string;
  outputs: number[];
  visibleCount: number;
  showFunctions?: boolean;
};

const FLOW_WIDTH = 1560;
const FLOW_HEIGHT = 420;
const hashCenters = [80, 210, 340];
const subscripts = ["₁", "₂", "₃"];

export default function HashFlow({
  input,
  outputs,
  visibleCount,
  showFunctions = true,
}: HashFlowProps) {
  return (
    <div className="hash-flow" aria-label={`${input} 입력의 해시 흐름`}>
      <svg
        className="hash-flow__lines"
        viewBox={`0 0 ${FLOW_WIDTH} ${FLOW_HEIGHT}`}
        role="img"
        aria-label="입력에서 세 해시 함수와 비트 위치로 이어지는 경로"
        preserveAspectRatio="none"
      >
        {hashCenters.map((y, index) => (
          <path
            key={`branch-${index}`}
            className={`hash-line hash-line--branch ${showFunctions ? "is-visible" : ""}`}
            d={`M 292 210 C 328 210, 342 ${y}, 380 ${y}`}
          />
        ))}
        {outputs.map((output, index) => {
          const endX = ((output + 0.5) / 16) * FLOW_WIDTH;
          const firstControlX = output < 5 ? 460 : 720;
          const secondControlX = output < 5 ? endX + 40 : endX - 120;
          return (
            <path
              key={`output-${output}`}
              className={`hash-line hash-line--output ${index < visibleCount ? "is-visible" : ""}`}
              d={`M 510 ${hashCenters[index]} C ${firstControlX} ${hashCenters[index]}, ${secondControlX} 330, ${endX} 416`}
              style={{ "--line-delay": `${index * 150}ms` } as CSSProperties}
            />
          );
        })}
      </svg>

      <div className="hash-input-node">
        <span>INPUT</span>
        <code>{input}</code>
      </div>

      {outputs.map((output, index) => (
        <div
          className={`hash-function ${showFunctions ? "is-visible" : ""}`}
          style={{ top: `${hashCenters[index] - 54}px` }}
          key={`hash-${output}`}
        >
          <strong>{`H${subscripts[index]}`}</strong>
          <span>hash {String(index + 1).padStart(2, "0")}</span>
        </div>
      ))}

      {outputs.map((output, index) => (
        <div
          className={`hash-result ${index < visibleCount ? "is-visible" : ""}`}
          style={
            {
              left: `${((output + 0.5) / 16) * 100}%`,
              "--result-delay": `${index * 150 + 120}ms`,
            } as CSSProperties
          }
          key={`result-${output}`}
        >
          <span>{`H${subscripts[index]}(${input})`}</span>
          <strong>→ {output}</strong>
        </div>
      ))}
    </div>
  );
}
