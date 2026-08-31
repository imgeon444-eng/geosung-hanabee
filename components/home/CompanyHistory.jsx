'use client';

export default function CompanyHistory({ onOpenConsultation }) {
  const historyList = [
    { year: '1999', title: '연구의 시작', desc: '서양 뒤영벌 인공 사육 및 작물별 수분활동 연구활동 착수' },
    { year: '2001', title: '국내 최초 대량사육', desc: '국내 최초 뒤영벌 대량사육 시설 완공 및 국산화 성공' },
    { year: '2002', title: '하나벌 브랜드 출시', desc: '대산 설립 및 대한민국 대표 수정벌 브랜드 "하나벌" 공식 런칭' },
    { year: '2007', title: '법인 전환 및 확장', desc: '사업장 확장 이전, 법인기업 전환, 천적 연구 10종 및 친환경 인공수분 화분 출시' },
    { year: '2009', title: '종자업 등록', desc: '국립종자원 정식 종자업 등록 및 고품질 품종 연구 개시' },
    { year: '2010', title: '거성 법인 설립', desc: '수정벌 6만 봉군 생산시설 준공, 농업회사법인 거성 설립 및 사업부 분리' },
    { year: '2012', title: '토마토 신품종 출시', desc: '우수 완숙 토마토 3종, 방울 토마토 1종 자체 신품종 개발 및 보급' },
    { year: '2014', title: '12만 봉군 제2공장 증축', desc: '수정벌 12만 봉군 스마트 자동화 사육 시설증축 (제2공장 완공)' },
    { year: '2015', title: '지리산 연구소 설립', desc: '청정 지리산 자락에 종자 & 뒤영벌 품종개량 전문 연구소 설립' },
    { year: '현재', title: '국내 1위 (30만 봉군)', desc: '국내 시장 점유율 60% 이상 석권, 연간 30만 봉군 생산 인프라 보유' },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#061810] relative overflow-hidden border-b border-emerald-500/20">
      
      {/* 🔮 센터 조명 */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* 섹션 헤더 */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-black tracking-wide">
            <span>🏛️ 26년의 기술과 신뢰</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            대한민국 화분매개의 역사, <span className="text-amber-400">농업회사법인 (합)거성</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed break-keep">
            1999년 뒤영벌 사육 연구를 시작으로 국내 최초 대량 사육에 성공한 이래,<br className="hidden sm:inline" />
            농민의 땀과 결실을 함께해 온 거성의 역사와 철학을 소개합니다.
          </p>
        </div>

        {/* 대표이사 인사말 카드 */}
        <div className="bg-gradient-to-r from-[#071911] via-[#09291b] to-[#071911] border-2 border-amber-400/40 rounded-3xl p-6 sm:p-10 shadow-2xl mb-20 relative overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-4 text-center">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-amber-400 to-emerald-600 p-1 mx-auto mb-4 shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                <div className="w-full h-full bg-[#071911] rounded-full flex items-center justify-center text-4xl sm:text-5xl">
                  👨‍🌾
                </div>
              </div>
              <h3 className="text-xl font-black text-white">
                권 두 재 <span className="text-sm text-amber-300 font-normal">대표이사</span>
              </h3>
              <p className="text-xs text-emerald-300 font-bold mt-1">
                농업회사법인 합자회사 거성
              </p>
              <div className="inline-block mt-3 px-3 py-1 bg-amber-400/10 text-amber-300 text-xs font-black rounded-full border border-amber-400/20">
                농민 출신 CEO
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4 text-slate-200 text-sm sm:text-base leading-relaxed break-keep">
              <h4 className="text-xl sm:text-2xl font-black text-white">
                "농민이 안심하고 최고의 과실을 수확할 수 있도록 언제나 곁을 지키겠습니다."
              </h4>
              <p className="text-slate-300 text-xs sm:text-sm">
                안녕하십니까? 농업회사법인 합자회사 거성의 권두재 대표입니다.
              </p>
              <p className="text-slate-300 text-xs sm:text-sm">
                저는 농민 출신 CEO로서 현장의 고충을 누구보다 잘 알고 있기에, 농민과 소비자가 모두 만족할 수 있는 친환경 농자재 생산을 위해 끊임없이 연구해 왔습니다. 
                특히 화분매개 곤충인 <strong className="text-amber-300 font-bold">"하나벌"</strong>은 2001년부터 당사 순수 기술로 생산·판매를 시작하여 국내 시장 점유율 60% 이상의 압도적 1위를 지켜오고 있습니다.
              </p>
              <p className="text-slate-300 text-xs sm:text-sm">
                수정벌, 명품 꽃가루, 친환경 농자재를 통해 생태계를 보호하고 농가의 실질적인 소득 증대에 기여하는 영원한 성공 파트너가 될 것을 약속드립니다. 감사합니다.
              </p>
            </div>

          </div>
        </div>

        {/* 연혁 타임라인 (Timeline Grid) */}
        <div className="bg-[#071911] border border-emerald-500/20 rounded-3xl p-6 sm:p-10 shadow-xl">
          <div className="text-center mb-10">
            <span className="text-xs font-black text-amber-400 uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full">
              COMPANY HISTORY
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-2">
              거성 하나벌이 걸어온 길
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {historyList.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#05140d] border border-emerald-500/20 hover:border-amber-400/40 p-4 rounded-2xl transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xl font-black text-amber-400 font-mono block mb-1">
                    {item.year}
                  </span>
                  <h4 className="text-sm font-black text-white mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-snug break-keep">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 지리산 연구소 & 생산 인프라 소개 */}
          <div className="mt-10 pt-8 border-t border-emerald-500/20 grid md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-[#0a2318] rounded-2xl border border-emerald-500/20">
              <span className="text-2xl block mb-1">🏭</span>
              <h5 className="font-bold text-white text-sm">제1·제2 스마트 공장</h5>
              <p className="text-[11px] text-slate-400 mt-1">창원시 의창구 대산면 최첨단 항온·항습 사육 시설</p>
            </div>
            <div className="p-4 bg-[#0a2318] rounded-2xl border border-emerald-500/20">
              <span className="text-2xl block mb-1">🏔️</span>
              <h5 className="font-bold text-white text-sm">지리산 품종개량 연구소</h5>
              <p className="text-[11px] text-slate-400 mt-1">청정 지리산에서 저온/고온 내성 우수 봉군 선발 육종</p>
            </div>
            <div className="p-4 bg-[#0a2318] rounded-2xl border border-emerald-500/20">
              <span className="text-2xl block mb-1">📜</span>
              <h5 className="font-bold text-white text-sm">특허 및 종자업 공인 등록</h5>
              <p className="text-[11px] text-slate-400 mt-1">국립종자원 정식 등록 및 화분매개 독자 특허 기술</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
