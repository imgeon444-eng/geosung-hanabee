'use client';

import { useState } from 'react';

const FAQS = [
  {
    q: '벌들이 밖으로 잘 안 나와요. 무엇을 점검해야 하나요?',
    a: '1) 설치 위치 점검: 과도한 그늘이거나 출입구로 햇빛이 전혀 들지 않으면 비행을 주저할 수 있습니다. 동남쪽 방향으로 돌려주세요.\n2) 환경 점검: 하우스 온도가 17~27℃, 습도 70% 수준인지 확인하세요.\n3) 꽃가루 과다 급여: 동봉된 꽃가루를 설치 즉시 넣어주면 벌들이 통 안에서만 머물 수 있으니 초반에는 외부 꽃으로 유도해 주세요.',
  },
  {
    q: '벌통 입구에 죽은 벌이 몇 마리 보이는데 괜찮은가요?',
    a: '자연스러운 노화 현상입니다. 벌통 안에는 알부터 유충, 성충이 함께 공존하며 평균 수명(약 30~45일)이 다한 벌은 밖으로 배출됩니다. 단, 수십 마리가 일시에 무더기로 죽어 있다면 농약 잔류 독성이나 35℃ 이상의 고온 피해일 수 있으므로 즉시 당사(055-294-4446)로 연락해 주세요.',
  },
  {
    q: '농약(살충제/살균제)을 살포해야 할 때는 어떻게 하나요?',
    a: '1) 살포 전날 낮 11시: 출입문 노란 손잡이를 왼쪽으로 밀어 복귀만 가능하도록 잠급니다.\n2) 전날 저녁: 벌통을 하우스 밖 서늘한 곳으로 격리하고 꽃가루를 급여합니다.\n3) 방제 당일: 벌통이 없는 상태에서 살포합니다.\n4) 방제 후: 약제 독성이 빠질 때까지 환기 후 재투입합니다.\n⚠️ 약제 성분마다 안전 재투입 기간이 다르므로 살포 전 반드시 당사로 성분을 확인해 주세요.',
  },
  {
    q: '꿀벌(양봉) 대신 뒤영벌(하나벌)을 써야 하는 이유는 무엇인가요?',
    a: '뒤영벌은 몸집통이 크고 날개 근육의 진동(소닉 수분)이 뛰어나 토마토, 가지, 고추 등 꽃가루가 깊숙이 박힌 작물에 압도적인 수정율을 자랑합니다. 또한 꿀벌이 활동하지 못하는 6~8℃의 저온과 흐린 날씨에도 활발하게 날아다닙니다.',
  },
  {
    q: '주문 후 배송은 며칠 정도 소요되며 어떻게 오나요?',
    a: '희망 투입일 2~3일 전에 예약해 주시면, 고객님의 농장 일정에 맞춰 가장 활력이 왕성한 봉군을 엄선하여 전용 충격 흡수 박스에 담아 안전 특송 택배로 농장 문 앞까지 배송해 드립니다.',
  },
];

export default function FaqSupport({ onOpenConsultation }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#07130E] relative overflow-hidden">
      
      {/* 🔮 글로우 */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* 섹션 헤더 */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-black tracking-wide">
            <span>❓ 자주 묻는 질문 & 고객지원</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            궁금한 점, <span className="text-amber-400">하나벌 전문가</span>가 답해드립니다
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed break-keep">
            농가에서 가장 자주 문의하시는 질문들을 정리했습니다. 추가 문의는 언제든 전화나 카카오톡으로 연락주세요.
          </p>
        </div>

        {/* FAQ 아코디언 */}
        <div className="space-y-3.5 mb-16">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#071911] border border-emerald-500/20 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none hover:bg-[#0a2318] transition-colors"
                >
                  <span className="font-black text-white text-base sm:text-lg flex items-center gap-3">
                    <span className="text-amber-400 font-mono text-xl">Q.</span>
                    <span>{faq.q}</span>
                  </span>
                  <span className={`text-xl text-amber-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
                    ▾
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 pt-2 border-t border-emerald-500/10 bg-[#05140d]/60 text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line animate-fade-in-up">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 고객센터 안내 & 카카오톡 / 전화 연결 배너 */}
        <div className="bg-gradient-to-r from-emerald-950/80 via-[#071911] to-amber-950/40 border-2 border-emerald-500/30 rounded-3xl p-8 sm:p-10 shadow-2xl text-center">
          <span className="text-xs font-bold text-amber-300 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            농가 전담 고객지원센터
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white mt-3 mb-2">
            실시간 유선 상담 & 카카오톡 1:1 지원
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mb-6">
            평일 08:30 ~ 17:30 (점심시간 12:30 ~ 13:30)<br />
            작물별 봉군 처방부터 현장 긴급 문의까지 친절히 상담해 드립니다.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:0552944446"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-base shadow-[0_0_25px_rgba(245,158,11,0.4)] flex items-center justify-center gap-2 transition-all hover:scale-105"
            >
              <span>📞 전화 상담 055-294-4446</span>
            </a>

            <a
              href="https://pf.kakao.com/_xkxaxcfX/chat"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#FEE500] hover:brightness-95 text-[#191600] font-black text-base shadow-md flex items-center justify-center gap-2 transition-all hover:scale-105"
            >
              <span>💬 카카오톡 1:1 상담하기</span>
            </a>

            <button
              onClick={onOpenConsultation}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-200 font-black text-base transition-all hover:scale-105"
            >
              <span>📝 온라인 상담 예약 접수</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
