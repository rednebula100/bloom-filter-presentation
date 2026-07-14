import BitArray from "@/src/components/BitArray";
import SlideFrame from "@/src/components/SlideFrame";
import type { SlideProps } from "@/src/app/presentationStore";

const dataRows = [
  "malicious-site-001.com",
  "user_483921",
  "cache_key_product_8172",
  "document_checksum_9281",
  "session_kr_2026_0714",
  "asset_hash_bf72a09c",
];

const activePositions = [1, 4, 8, 11, 14];
const compactBits = Array.from({ length: 16 }, (_, index) => activePositions.includes(index));

export default function Slide02Memory({ beat }: SlideProps) {
  const compactActive = beat === 1;

  return (
    <SlideFrame
      className={`memory-slide ${compactActive ? "is-compressed" : ""}`}
      title="완벽한 기억은 무겁다"
    >
      <p className="slide-lead">원본을 모두 보관하는 가장 확실한 방법은, 데이터가 늘수록 더 무거워진다.</p>

      <div className="memory-scene">
        <section className="raw-memory" aria-label="원본 데이터 전체 저장">
          <header className="scene-label">
            <strong>원본 데이터 전체 저장</strong>
            <span>모든 문자열을 그대로 기억</span>
          </header>

          <div className="data-stream" aria-label="계속 누적되는 원본 데이터">
            {dataRows.map((row) => (
              <code key={row}>{row}</code>
            ))}
            <code className="data-stream__more">··· 계속 쌓이는 원본 데이터</code>
          </div>

          <div className="memory-load">
            <span>저장 부담</span>
            <strong>2.4 MB → 18.7 MB → 92.1 MB</strong>
            <small>illustrative · 이해를 위한 개념적 수치</small>
          </div>
        </section>

        <div className="comparison-divider" aria-hidden="true">
          <span>→</span>
        </div>

        <section className="compact-memory" aria-label="압축된 비트 배열 기억">
          <header className="scene-label">
            <strong>압축된 비트 기억</strong>
            <span>원본 대신 위치의 흔적만 기억</span>
          </header>

          <div className="compact-memory__array">
            <BitArray
              bits={compactActive ? compactBits : Array(16).fill(false)}
              highlighted={compactActive ? activePositions : []}
              showIndices={false}
              activationDelay={160}
              activationStagger={90}
            />
          </div>

          <div className="compact-caption">
            <strong>16개의 비트</strong>
            <span>원본 전체가 아닌, 존재를 나타내는 작은 흔적</span>
          </div>
        </section>
      </div>

      <p className="memory-insight" aria-hidden={!compactActive}>
        원본 전체를 저장하지 않고도 <strong>존재 여부</strong>를 빠르게 확인한다.
      </p>
    </SlideFrame>
  );
}
