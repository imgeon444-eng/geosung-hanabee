'use client';

export default function FeatureComparison({ onOpenConsultation }) {
  const advantages = [
    {
      icon: '🍈',
      title: '과육 비대 & 당도 증가',
      desc: '자연 수분으로 씨방 전체가 고르게 수정되어 과육이 치밀해지고 고유의 당도(Brix)와 향미가 극대화됩니다.',
      category: '품질 극대화',
    },
    {
      icon: '✨',
      title: '기형과·공동과 발생률 급감',
      desc: '인공 호르몬 처리 시 발생하는 속 빈 열매(공동과)나 모양 뒤틀림을 방지하여 특품 출하율을 높입니다.',
      category: '상품성 향상',
    },
    {
      icon: '🌸',
      title: '수정율 증가 & 낙화 방지',
      desc: '꽃이 피자마자 즉시 수분이 이루어져 낙화 피해를 방지하고 꽃 하나하나 놓치지 않고 튼실하게 결실합니다.',
      category: '착과율 98%',
    },
    {
      icon: '⚖️',
      title: '과중 증가 & 수확량 극대화',
      desc: '종자 형성이 완전해져 과일 개당 무게가 15~25% 증가하며, 이는 농가의 총 매출 증가로 직결됩니다.',
      category: '수익성 증대',
    },
    {
      icon: '⏱️',
      title: '농가 노동력 80% 절감',
      desc: '매일 허리 숙여 일일이 호르몬제를 찍어 바르던 고된 작업에서 해방되어 시설 대형화 및 여유 농업이 가능합니다.',
      category: '인건비 절감',
    },
    {
      icon: '🛡️',
      title: '호르몬 장애 & 곰팡이병 예방',
      desc: '호르몬제 과다 사용으로 인한 잎마름, 생장 장애, 잿빛곰팡이병의 발생 원인을 원천 차단하는 친환경 농법입니다.',
      category: '친환경 무농약',
    },
    {
      icon: '🌿',
      title: '화방 순서별 균형 생장 조절',
      desc: '꽃이 피어나는 화방 순서대로 차례차례 수정하므로 작물의 영양 분배와 세력 관리가 매우 용이합니다.',
      category: '작물 세력 안정',
    },
  ];

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#07130E] relative overflow-hidden">
      
      {/* 🔮 센터 글로우 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-500/5 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* 섹션 헤더 */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-black tracking-wide">
            <span>✨ 왜 전국의 농가가 하나벌을 선택할까요?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            거성 하나벌이 약속하는 <span className="text-amber-400">7대 수정 혁신</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed break-keep">
            단순히 벌을 공급하는 것에 그치지 않습니다. 26년 역사와 국내 60% 이상을 점유한 거성의 순수 기술력으로<br className="hidden sm:inline" />
            농가의 수확량, 당도, 상품성을 한 단계 끌어올리는 실질적인 성공을 만듭니다.
          </p>
        </div>

        {/* 7대 장점 그리드 */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-20">
          {advantages.map((adv, idx) => (
            <div
              key={idx}
              className={`bg-[#071911] border border-emerald-500/20 hover:border-amber-400/40 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-[0_10px_30px_rgba(245,158,11,0.15)] flex flex-col justify-between group ${
                idx === 6 ? 'sm:col-span-2 lg:col-span-3 xl:col-span-1' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl p-2.5 bg-[#0a2318] rounded-2xl border border-emerald-500/20 group-hover:scale-110 transition-transform">
                    {adv.icon}
                  </span>
                  <span className="text-[11px] font-black text-amber-300 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                    {adv.category}
                  </span>
                </div>
                <h3 className="text-lg font-black text-white mb-2 group-hover:text-amber-300 transition-colors">
                  {adv.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed break-keep">
                  {adv.desc}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-emerald-500/10 text-[11px] text-emerald-400/80 font-bold flex items-center gap-1">
                <span>✓ 검증된 농가 수익 개선</span>
              </div>
            </div>
          ))}
        </div>

        {/* 3자 비교 테이블: 거성 뒤영벌 vs 호르몬 vs 일반 양봉 */}
        <div className="bg-[#071911] border-2 border-emerald-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-black text-amber-400 uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full">
              COMPARISON
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-2">
              수정 방식별 1:1 비교 분석
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              왜 호르몬 처리와 일반 꿀벌 대신 거성 뒤영벌을 써야 할까요?
            </p>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-xs sm:text-sm min-w-[650px]">
              <thead>
                <tr className="border-b border-emerald-500/20 text-slate-400 font-bold">
                  <th className="py-4 px-4">비교 항목</th>
                  <th className="py-4 px-4 bg-amber-400/10 text-amber-300 font-black rounded-t-2xl border-x border-t border-amber-400/30">
                    🐝 거성 하나벌 (서양뒤영벌)
                  </th>
                  <th className="py-4 px-4 text-slate-300">💉 인공 호르몬 처리 (토마토톤 등)</th>
                  <th className="py-4 px-4 text-slate-300">🍯 일반 양봉 (꿀벌)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-500/10">
                <tr>
                  <td className="py-4 px-4 font-bold text-slate-300">저온·흐린날 활동력</td>
                  <td className="py-4 px-4 bg-amber-400/5 text-amber-300 font-extrabold border-x border-amber-400/20">
                    ⭐ 6~8℃ 저온·흐린날도 왕성 활동
                  </td>
                  <td className="py-4 px-4 text-slate-400">수작업 필수 (기후 영향 없음)</td>
                  <td className="py-4 px-4 text-rose-400 font-semibold">14℃ 이하 / 흐린 날 활동 정지</td>
                </tr>

                <tr>
                  <td className="py-4 px-4 font-bold text-slate-300">농가 노동력 및 인건비</td>
                  <td className="py-4 px-4 bg-amber-400/5 text-amber-300 font-extrabold border-x border-amber-400/20">
                    ⭐ 벌통 거치 후 자동 수분 (80% 절감)
                  </td>
                  <td className="py-4 px-4 text-rose-400 font-semibold">매일 꽃마다 일일이 분무 (막대한 인건비)</td>
                  <td className="py-4 px-4 text-slate-400">사양 및 봉군 관리 수고 필요</td>
                </tr>

                <tr>
                  <td className="py-4 px-4 font-bold text-slate-300">과실 품질 (기형과·당도)</td>
                  <td className="py-4 px-4 bg-amber-400/5 text-amber-300 font-extrabold border-x border-amber-400/20">
                    ⭐ 고른 씨방 결실, 최고 당도, 기형과 0%
                  </td>
                  <td className="py-4 px-4 text-rose-400 font-semibold">농도 조절 실패 시 공동과/기형과 다발</td>
                  <td className="py-4 px-4 text-slate-400">특정 작물(토마토 등) 꽃가루 채취 기피</td>
                </tr>

                <tr>
                  <td className="py-4 px-4 font-bold text-slate-300">병해 및 작물 안전성</td>
                  <td className="py-4 px-4 bg-amber-400/5 text-amber-300 font-extrabold border-x border-amber-400/20">
                    ⭐ 호르몬 장애 없음, 100% 친환경
                  </td>
                  <td className="py-4 px-4 text-rose-400 font-semibold">약해 발생 및 잿빛곰팡이병 전염 위험</td>
                  <td className="py-4 px-4 text-slate-400">친환경이나 온실 탈출율 높음</td>
                </tr>

                <tr>
                  <td className="py-4 px-4 font-bold text-slate-300">수정 확인 용이성</td>
                  <td className="py-4 px-4 bg-amber-400/5 text-amber-300 font-extrabold border-x border-b border-amber-400/20 rounded-b-2xl">
                    ⭐ 바이트 마크(갈색 자국)로 즉시 확인
                  </td>
                  <td className="py-4 px-4 text-slate-400">착색제 사용 시 지저분함</td>
                  <td className="py-4 px-4 text-slate-400">육안 확인 어려움</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 🔍 바이트 마크(Bite Mark) 시각 안내 카드 */}
        <div className="bg-gradient-to-r from-emerald-950/60 via-[#071911] to-amber-950/30 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-400/20 border border-amber-400 text-amber-300 flex items-center justify-center text-3xl shrink-0">
            🔍
          </div>
          <div className="flex-1 space-y-1.5 text-center md:text-left">
            <div className="inline-block text-[11px] font-black text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded">
              전문가 TIP
            </div>
            <h4 className="text-lg sm:text-xl font-black text-white">
              수정 여부를 1초 만에 확인하는 '바이트 마크(Bite Mark)'
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              뒤영벌이 꽃을 쥐고 꽃가루를 모으기 위해 진동을 일으킬 때, 꽃잎에 작고 선명한 갈색 자국(Bite Mark)이 남습니다. 
              이 자국이 보이면 수정이 100% 완료된 것이므로, 농가에서는 육안으로 손쉽게 착과 성공 여부를 확인할 수 있습니다.
            </p>
          </div>
          <button
            onClick={onOpenConsultation}
            className="shrink-0 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-md transition-all whitespace-nowrap"
          >
            하나벌 도입 문의하기
          </button>
        </div>

      </div>
    </section>
  );
}
