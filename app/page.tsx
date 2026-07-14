import type { Metadata } from "next";
import Presentation from "@/src/app/Presentation";

export const metadata: Metadata = {
  title: "컴퓨터는 왜 일부러 틀린 답을 내는가?",
  description: "블룸 필터의 거짓 양성 확률과 메모리 최적화를 설명하는 인터랙티브 수학 발표",
};

export default function Home() {
  return <Presentation />;
}
