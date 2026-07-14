import type { CSSProperties } from "react";

export type HashFlowProps = {
  input: string;
  outputs: number[];
  active: boolean;
};

const FLOW_WIDTH = 1560;
const FLOW_HEIGHT = 360;
const subscripts = ["₁", "₂", "₃"];

export default function HashFlow({ input, outputs, active }: HashFlowProps) {
  const positions = outputs.map((output) => ((output + 0.5) / 16) * FLOW_WIDTH);

  return (
    <div className={`hash-flow ${active ? "is-active" : ""}`} aria-label={`${input} 입력의 해시 흐름`}>
      <svg
        className="hash-flow__lines"
        viewBox={`0 0 ${FLOW_WIDTH} ${FLOW_HEIGHT}`}
        role="img"
        aria-label="입력값이 세 해시 함수를 거쳐 3, 8, 14번 비트로 이어지는 경로"
        preserveAspectRatio="none"
      >
        {positions.map((x, index) => (
          <path
            key={`branch-${outputs[index]}`}
            className="hash-line hash-line--branch"
            d={`M 780 94 C 780 126, ${x} 126, ${x} 152`}
          />
        ))}
        {positions.map((x, index) => (
          <path
            key={`output-${outputs[index]}`}
            className={`hash-line hash-line--output ${active ? "is-visible" : ""}`}
            d={`M ${x} 258 L ${x} 356`}
            style={{ "--line-delay": `${index * 200}ms` } as CSSProperties}
          />
        ))}
      </svg>

      <div className="hash-input-node">
        <span>입력값</span>
        <code>{input}</code>
      </div>

      {positions.map((x, index) => (
        <div
          className="hash-function"
          style={{ left: `${(x / FLOW_WIDTH) * 100}%` }}
          key={`hash-${outputs[index]}`}
        >
          <strong>{`H${subscripts[index]}`}</strong>
        </div>
      ))}

      {positions.map((x, index) => (
        <div
          className={`hash-result ${active ? "is-visible" : ""}`}
          style={
            {
              left: `${(x / FLOW_WIDTH) * 100}%`,
              "--result-delay": `${index * 200 + 150}ms`,
            } as CSSProperties
          }
          key={`result-${outputs[index]}`}
        >
          {outputs[index]}
        </div>
      ))}
    </div>
  );
}
