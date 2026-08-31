'use client';

export default function ProductLineup({ onOpenConsultation, onPrefillAndOpen }) {
  const products = [
    {
      id: 'greenhouse-bee',
      badge: '대표 베스트셀러',
      title: '시설채소용 하나벌',
      subtitle: '하우스 완숙·방울토마토, 딸기, 고추, 멜론 전용',
      desc: '시설 하우스 내의 다양한 기후 조건(온도 20~30℃, 저온기 11℃ 이상)에서도 쉼 없이 비행하며 꽃 하나하나 꼼꼼하게 수정합니다.',
      specs: [
        '봉군 규격: 80~150마리 (작물별 최적화)',
        '적용 면적: 200~500평 (하우스 1~2동당 1통)',
        '수분 활동: 약 40~45일 지속 유지',
        '포장: 환기구 및 설탕물 피더 내장 안전 벌통',
      ],
      tags: ['토마토', '딸기', '고추/파프리카', '멜론/수박'],
      isPopular: true,
    },
    {
      id: 'orchard-bee',
      badge: '과수 농가 필수',
      title: '과수원·야외용 하나벌',
      subtitle: '사과, 배, 복숭아, 블루베리 등 과수 전용',
      desc: '개화 시기가 짧고 이른 봄 변덕스러운 날씨(저온, 비, 강풍)에도 양봉 꿀벌과 달리 즉각 비행하여 씨방을 완벽하게 결실시킵니다.',
      specs: [
        '봉군 규격: 200~300마리 이상 대형 군집',
        '적용 면적: 200~300평당 1통 집중 투입',
        '특장점: 정형과(예쁜 모양) 비율 95% 달성',
        '활동성: 6~8℃ 저온 환경에서도 비행',
      ],
      tags: ['사과', '배', '블루베리', '복숭아'],
      isPopular: false,
    },
    {
      id: 'pollen',
      badge: '발아율 95% 이상',
      title: '인공수분용 명품 꽃가루',
      subtitle: '순도 100% 엄선 정제 화분 (과수·채소용)',
      desc: '거성 농업연구소의 엄격한 품질 관리를 거쳐 발아력과 활력이 검증된 최고급 인공수분용 꽃가루입니다.',
      specs: [
        '품질: 순도 100%, 발아율 95% 이상 검증',
        '보관 및 배송: 초저온 동결 포장 안전 배송',
        '용도: 기상 악화 시 긴급 인공수분 및 증량제 혼합용',
      ],
      tags: ['사과 화분', '배 화분', '키위 화분', '복숭아 화분'],
      isPopular: false,
    },
  ];

  return (
    <section id="products" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#061810] relative overflow-hidden border-b border-emerald-500/20">
      
      {/* 🔮 배경 */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* 섹션 헤더 */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-black tracking-wide">
            <span>📦 거성 하나벌 프리미엄 라인업</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            작물과 재배 환경에 맞춘 <span className="text-amber-400">맞춤형 제품 구성</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed break-keep">
            국내 최대 30만 봉군 스마트 사육 시설에서 갓 출하된 최상의 활력을 지닌 뒤영벌을<br className="hidden sm:inline" />
            농장 문 앞까지 안전하고 신속하게 특송 배송해 드립니다.
          </p>
        </div>

        {/* 3대 제품 카드 */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {products.map((product) => (
            <div
              key={product.id}
              className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                product.isPopular
                  ? 'bg-gradient-to-b from-[#09291b] to-[#071911] border-2 border-amber-400/60 shadow-[0_15px_40px_rgba(245,158,11,0.2)]'
                  : 'bg-[#071911] border border-emerald-500/20 hover:border-emerald-500/40 shadow-lg'
              }`}
            >
              {product.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 text-xs font-black px-4 py-1 rounded-full shadow-md">
                  ★ 전국 농가 최다 주문
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full">
                    {product.badge}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-white mb-1">
                  {product.title}
                </h3>
                <p className="text-xs text-emerald-300 font-bold mb-4">
                  {product.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 break-keep">
                  {product.desc}
                </p>

                {/* 규격 리스트 */}
                <div className="bg-[#05140d] p-4 rounded-2xl border border-emerald-500/20 mb-6 space-y-2">
                  <span className="text-[11px] font-black text-slate-400 uppercase block tracking-wider mb-2">
                    주요 규격 및 특징
                  </span>
                  {product.specs.map((spec, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-200">
                      <span className="text-amber-400 font-bold shrink-0">✓</span>
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>

                {/* 태그 */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {product.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#0a2318] text-emerald-200 border border-emerald-500/20"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  if (onPrefillAndOpen) {
                    onPrefillAndOpen({ crop: product.title });
                  } else if (onOpenConsultation) {
                    onOpenConsultation();
                  }
                }}
                className={`w-full py-3.5 rounded-xl font-black text-sm transition-all flex items-center justify-center gap-2 ${
                  product.isPopular
                    ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md'
                    : 'bg-emerald-950 hover:bg-emerald-900 text-white border border-emerald-500/30'
                }`}
              >
                <span>{product.title} 주문·상담 신청</span>
                <span>→</span>
              </button>
            </div>
          ))}
        </div>

        {/* 🔄 작기 맞춤 정기 구독 안내 배너 */}
        <div className="bg-gradient-to-r from-amber-500/10 via-[#071911] to-emerald-500/10 border-2 border-amber-400/40 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black">
                <span>🔄 SMART SUBSCRIPTION</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                작기 맞춤 정기 구독으로 <span className="text-amber-400">품절 걱정 없이 안전하게</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed break-keep">
                개화 시기마다 일일이 주문할 필요 없이, 농가의 작기 스케줄에 맞춰 가장 신선한 봉군을 정기적으로 자동 배송해 드립니다. 
                정기 구독 시 <strong className="text-amber-300">구독 할인 혜택</strong>과 <strong className="text-white">우선 출하권</strong>이 부여됩니다.
              </p>
              
              <div className="grid sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-[#05140d]/80 p-3 rounded-xl border border-emerald-500/20 text-xs">
                  <span className="text-amber-400 font-bold block mb-0.5">💰 구독 할인</span>
                  <span className="text-slate-300">정기 주문 시 봉군당 특별 단가 적용</span>
                </div>
                <div className="bg-[#05140d]/80 p-3 rounded-xl border border-emerald-500/20 text-xs">
                  <span className="text-amber-400 font-bold block mb-0.5">🚀 최우선 출하</span>
                  <span className="text-slate-300">성수기 품절 시에도 물량 100% 보장</span>
                </div>
                <div className="bg-[#05140d]/80 p-3 rounded-xl border border-emerald-500/20 text-xs">
                  <span className="text-amber-400 font-bold block mb-0.5">👨‍🌾 전담 매니저</span>
                  <span className="text-slate-300">작기별 환경 점검 & 이상 시 긴급 교체</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 text-center lg:text-right">
              <button
                onClick={onOpenConsultation}
                className="w-full lg:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-base shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all hover:scale-105 active:scale-95"
              >
                정기 구독 상담 문의하기 →
              </button>
              <span className="block text-[11px] text-slate-400 mt-2">
                전화 문의: 055-294-4446
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
