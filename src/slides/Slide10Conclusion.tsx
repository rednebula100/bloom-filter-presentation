import SlideFrame from "@/src/components/SlideFrame";

const conclusions = [
  ["01", "데이터가 많아질수록", "거짓 양성 확률은 증가한다."],
  ["02", "메모리를 늘리면", "오류율을 낮출 수 있다."],
  ["03", "해시 함수 개수에는 수학적으로", "예측 가능한 최적점이 존재한다."],
];

export default function Slide10Conclusion() {
  return (
    <SlideFrame className="conclusion-slide" eyebrow="CONCLUSION" title="완벽함을 포기하는 것이 더 강한 시스템을 만든다">
      <ol className="conclusion-list">
        {conclusions.map(([number, lead, result]) => (
          <li key={number}><span>{number}</span><p>{lead}<br /><strong>{result}</strong></p></li>
        ))}
      </ol>

      <p className="final-definition">블룸 필터는 완벽한 기억장치가 아니라,<br /><strong>확률을 이용해 효율적인 판단을 먼저 수행하는 시스템</strong>이다.</p>
      <p className="final-emphasis">완벽함을 포기하는 것이 때로는 더 강한 시스템을 만든다.</p>
    </SlideFrame>
  );
}
