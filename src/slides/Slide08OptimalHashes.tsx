import ProbabilityGraph from "@/src/components/ProbabilityGraph";
import SlideFrame from "@/src/components/SlideFrame";
import type { SlideProps } from "@/src/app/presentationStore";
import { experimentConfig, optimalHashCount, theoryProbabilities } from "@/src/data/probabilityExperiment";

export default function Slide08OptimalHashes({ beat }: SlideProps) {
  const revealed = beat === 1;
  const optimum = optimalHashCount(experimentConfig.m, experimentConfig.n).toFixed(2);

  return (
    <SlideFrame className={`optimal-hash-slide ${revealed ? "is-revealed" : ""}`} title="해시 함수는 많을수록 좋지 않다">
      <div className="experiment-conditions" aria-label="그래프 조건">
        <span><b>m</b> = 1000</span><span><b>n</b> = 200</span><span><b>k</b> = 1 ~ 10</span>
      </div>

      <div className="optimal-layout">
        <div className="optimal-graph">
          <ProbabilityGraph theory={theoryProbabilities} showTheory={revealed} highlightOptimal={revealed} ariaLabel="해시 함수 개수에 따른 이론 거짓 양성 확률" />
        </div>
        <aside className="optimal-formula" aria-hidden={!revealed}>
          <span>최적 해시 함수 개수</span>
          <strong>k<sub>opt</sub> = <i>m</i>/<i>n</i> ln 2</strong>
          <p>k<sub>opt</sub> = (1000/200) ln 2</p>
          <b>≈ {optimum}</b>
          <small>정수로는 k = 3 또는 4</small>
        </aside>
      </div>

      <p className="optimal-conclusion" aria-hidden={!revealed}>더 많이 검사한다고 <strong>항상 더 정확해지는 것은 아니다.</strong></p>
    </SlideFrame>
  );
}
