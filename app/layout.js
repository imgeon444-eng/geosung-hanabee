import "./globals.css";

export const metadata = {
  title: "거성 하나벌 | 국내 1위 친환경 화분매개 수정벌 전문기업 (농업회사법인 거성)",
  description: "국내 시장 점유율 60% 1위! 26년 연구 노하우의 서양 뒤영벌(수정벌) 전문 브랜드 하나벌. 과실 당도 증대, 착과율 극대화, 인건비 절감을 위한 맞춤형 봉군 공급 및 정기구독 서비스.",
  keywords: "하나벌, 거성, 뒤영벌, 수정벌, 화분매개곤충, 토마토 수정, 딸기 수정, 사과 수정벌, 멜론 수정, 서양뒤영벌, 농업회사법인거성",
  openGraph: {
    title: "거성 하나벌 | 고품질 과실수확의 성공 파트너",
    description: "국내 최대 30만 봉군 생산 인프라. 착과율과 품질을 극대화하는 건강한 수정벌을 농장으로 직접 배송해 드립니다.",
    url: "https://www.hanabee.co.kr",
    siteName: "거성 하나벌",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="bg-[#07130E] text-slate-100 antialiased selection:bg-[#F59E0B] selection:text-black">
        {children}
      </body>
    </html>
  );
}

