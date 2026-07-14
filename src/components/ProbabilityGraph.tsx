import type { CSSProperties } from "react";
import type { ProbabilityPoint } from "@/src/data/probabilityExperiment";

type ProbabilityGraphProps = {
  theory: ProbabilityPoint[];
  experiment?: ProbabilityPoint[];
  showTheory?: boolean;
  showExperiment?: boolean;
  highlightOptimal?: boolean;
  ariaLabel: string;
};

const WIDTH = 920;
const HEIGHT = 500;
const LEFT = 92;
const RIGHT = 42;
const TOP = 36;
const BOTTOM = 78;
const MAX_P = 25;

const xFor = (k: number) => LEFT + ((k - 1) / 9) * (WIDTH - LEFT - RIGHT);
const yFor = (probability: number) => TOP + ((MAX_P - probability) / MAX_P) * (HEIGHT - TOP - BOTTOM);

function linePath(points: ProbabilityPoint[]) {
  return points.map((point, index) => `${index === 0 ? "M" : "L"} ${xFor(point.k)} ${yFor(point.probability)}`).join(" ");
}

export default function ProbabilityGraph({
  theory,
  experiment = [],
  showTheory = true,
  showExperiment = false,
  highlightOptimal = false,
  ariaLabel,
}: ProbabilityGraphProps) {
  return (
    <svg className="probability-graph" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label={ariaLabel}>
      <title>{ariaLabel}</title>
      <desc>해시 함수 개수에 따른 거짓 양성 확률을 나타낸 그래프</desc>

      {highlightOptimal && (
        <rect
          className="optimal-band"
          x={xFor(2.75)}
          y={TOP}
          width={xFor(4.25) - xFor(2.75)}
          height={HEIGHT - TOP - BOTTOM}
        />
      )}

      {[0, 5, 10, 15, 20, 25].map((tick) => (
        <g key={tick}>
          <line className="graph-grid" x1={LEFT} x2={WIDTH - RIGHT} y1={yFor(tick)} y2={yFor(tick)} />
          <text className="graph-tick" x={LEFT - 22} y={yFor(tick) + 8} textAnchor="end">{tick}%</text>
        </g>
      ))}

      <line className="graph-axis" x1={LEFT} x2={LEFT} y1={TOP} y2={HEIGHT - BOTTOM} />
      <line className="graph-axis" x1={LEFT} x2={WIDTH - RIGHT} y1={HEIGHT - BOTTOM} y2={HEIGHT - BOTTOM} />

      {theory.map((point) => (
        <text className="graph-tick" key={point.k} x={xFor(point.k)} y={HEIGHT - BOTTOM + 38} textAnchor="middle">{point.k}</text>
      ))}

      <text className="graph-axis-label" x={(LEFT + WIDTH - RIGHT) / 2} y={HEIGHT - 14} textAnchor="middle">해시 함수 개수 k</text>
      <text className="graph-axis-label" x={-228} y={28} textAnchor="middle" transform="rotate(-90)">거짓 양성 확률 P</text>

      {showTheory && (
        <path className="theory-line" pathLength={1} d={linePath(theory)} />
      )}

      {showTheory && theory.map((point) => (
        <circle className={`theory-point ${highlightOptimal && (point.k === 3 || point.k === 4) ? "is-optimal" : ""}`} key={point.k} cx={xFor(point.k)} cy={yFor(point.probability)} r="7" />
      ))}

      {showExperiment && experiment.map((point, index) => (
        <g key={point.k} style={{ "--point-delay": `${240 + index * 70}ms` } as CSSProperties} className="experiment-point">
          <circle cx={xFor(point.k)} cy={yFor(point.probability)} r="10" />
          {(point.k === 3 || point.k === 4) && <circle className="experiment-halo" cx={xFor(point.k)} cy={yFor(point.probability)} r="19" />}
        </g>
      ))}

      {highlightOptimal && (
        <g className="optimal-label">
          <line x1={xFor(3.5)} x2={xFor(3.5)} y1={yFor(7.6)} y2={yFor(2.3)} />
          <text x={xFor(3.5)} y={yFor(1.1)} textAnchor="middle">최저점 k ≈ 3~4</text>
        </g>
      )}
    </svg>
  );
}
