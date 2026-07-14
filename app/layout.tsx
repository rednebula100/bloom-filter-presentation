import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import "@/src/styles/tokens.css";
import "@/src/styles/global.css";
import "@/src/styles/presentation.css";
import "@/src/styles/animations.css";

const title = "컴퓨터는 왜 일부러 틀린 답을 내는가?";
const description =
  "블룸 필터의 구조와 메모리 최적화를 탐구하는 16:9 인터랙티브 웹 프레젠테이션";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const imageUrl = `${protocol}://${host}/og.png`;

  return {
    title,
    description,
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: "ko_KR",
      images: [{ url: imageUrl, width: 1920, height: 1080, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
