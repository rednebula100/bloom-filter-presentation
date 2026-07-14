import type { CSSProperties } from "react";
import BitArray from "@/src/components/BitArray";
import SlideFrame from "@/src/components/SlideFrame";
import StatusPanel from "@/src/components/StatusPanel";
import type { SlideProps } from "@/src/app/presentationStore";

const dataRows = [
  "malicious-site-001.com",
  "user_483921",
  "cache_key_product_8172",
  "document_checksum_9281",
  "session_kr_2026_0714",
  "asset_hash_bf72a09c",
];

const compactBits = Array.from({ length: 16 }, (_, index) => [1, 4, 8, 11, 14].includes(index));

export default function Slide02Memory({ step }: SlideProps) {
  const bloomVisible = step >= 2;

  return (
    <SlideFrame className="memory-slide" eyebrow="WHY / MEMORY COST" title="완벽한 기억은 무겁다">
      <div className="memory-comparison">
        <section className={`raw-memory ${step >= 1 ? "is-expanded" : ""}`} aria-label="원본 데이터 전체 저장">
          <div className="comparison-label">
            <span>FULL DATA STORAGE</span>
            <small>원본을 그대로 기억</small>
          </div>
          <div className="data-stream" aria-label="저장되는 데이터 예시">
            {dataRows.map((row, index) => (
              <code key={row} style={{ "--row-index": index } as CSSProperties}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {row}
              </code>
            ))}
            <code className="data-stream__more"><span>··</span>계속 쌓이는 원본 데이터</code>
          </div>
          <div className={`memory-growth reveal ${step >= 1 ? "visible" : ""}`} aria-hidden={step < 1}>
            <StatusPanel label="MEMORY LOAD" value="2.4 MB → 18.7 MB → 92.1 MB" note="ILLUSTRATIVE · 개념적 수치" tone="purple" />
            <div className="memory-meter" aria-hidden="true"><i /><i /><i /><i /><i /></div>
          </div>
        </section>

        <div className="comparison-divider" aria-hidden="true">
          <span>VS</span>
        </div>

        <section className={`compact-memory ${bloomVisible ? "is-active" : ""}`} aria-label="비트 배열 기반 기억">
          <div className="comparison-label">
            <span>BLOOM FILTER</span>
            <small>위치만 압축해 기억</small>
          </div>
          <div className="compact-memory__array">
            <BitArray
              bits={bloomVisible ? compactBits : Array(16).fill(false)}
              highlighted={bloomVisible ? [1, 4, 8, 11, 14] : []}
              showIndices
            />
          </div>
          <div className={`compact-caption reveal ${bloomVisible ? "visible" : ""}`} aria-hidden={!bloomVisible}>
            <StatusPanel label="COMPACT BIT MEMORY" value="16 bits" note="원본 대신 흔적만 저장" tone="lime" />
          </div>
        </section>
      </div>

      <p className={`memory-question reveal ${step >= 3 ? "visible" : ""}`} aria-hidden={step < 3}>
        원본 데이터를 모두 기억하지 않고도
        <br />
        <strong>존재 여부</strong>를 판단할 수 있을까?
      </p>
    </SlideFrame>
  );
}
