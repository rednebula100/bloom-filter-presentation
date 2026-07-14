import ProbabilityGraph from "@/src/components/ProbabilityGraph";
import SlideFrame from "@/src/components/SlideFrame";
import type { SlideProps } from "@/src/app/presentationStore";
import { experimentConfig, getFixedSimulationResults, theoryProbabilities } from "@/src/data/probabilityExperiment";

const experimentResults = getFixedSimulationResults();

export default function Slide09Experiment({ beat }: SlideProps) {
  const compared = beat === 1;

  return (
    <SlideFrame className={`experiment-slide ${compared ? "is-compared" : ""}`} title="이론은 실제 실험에서도 맞을까?">
      <div className="validation-layout">
        <section className="experiment-method" aria-label="고정 시뮬레이션 조건">
          <span>실험 조건</span>
          <dl>
            <div><dt>비트 배열</dt><dd>m = {experimentConfig.m}</dd></div>
            <div><dt>삽입 데이터</dt><dd>n = {experimentConfig.n}</dd></div>
            <div><dt>해시 함수</dt><dd>k = 1 ~ 10</dd></div>
            <div><dt>미삽입 조회</dt><dd>조건마다 10,000개</dd></div>
            <div><dt>재현 조건</dt><dd>고정 seed 사용</dd></div>
          </dl>
          <div className="graph-legend">
            <span><i className="legend-theory" />이론 곡선</span>
            <span className="legend-experiment"><i />고정 실험값</span>
          </div>
        </section>

        <div className="validation-graph">
          <ProbabilityGraph theory={theoryProbabilities} experiment={experimentResults} showExperiment={compared} highlightOptimal={compared} ariaLabel="이론 확률과 고정 시뮬레이션 결과 비교" />
        </div>
      </div>

      <p className="validation-conclusion" aria-hidden={!compared}>반복 실험에서도 이론과 비슷한 <strong>k = 3~4의 최저점</strong>이 나타난다.</p>
    </SlideFrame>
  );
}
