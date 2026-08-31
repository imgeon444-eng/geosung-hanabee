'use client';

import { useState } from 'react';

export default function CareGuideSection({ onOpenConsultation }) {
  const [activeTab, setActiveTab] = useState('steps'); // 'steps' | 'environment' | 'pesticide'

  return (
    <section id="guide" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#07130E] relative overflow-hidden border-b border-emerald-500/20">
      
      {/* 🔮 글로우 */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* 섹션 헤더 */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-black tracking-wide">
            <span>📖 거성 하나벌 필수 관리 매뉴얼</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            도착 즉시 시작하는 <span className="text-amber-400">3단계 설치 & 관리법</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed break-keep">
            수정벌의 건강과 45일간의 지속적인 수분 활력을 위해 꼭 지켜야 할 핵심 관리 수칙입니다.<br className="hidden sm:inline" />
            초보 농가도 쉽게 따라 할 수 있도록 정리했습니다.
          </p>
        </div>

        {/* 서브 탭 네비게이션 */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-[#05140d] p-1.5 rounded-2xl border border-emerald-500/30 gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('steps')}
              className={`px-4 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                activeTab === 'steps'
                  ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                  : 'text-slate-300 hover:text-white hover:bg-emerald-500/10'
              }`}
            >
              1. 도착 즉시 3단계 설치
            </button>
            <button
              onClick={() => setActiveTab('environment')}
              className={`px-4 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                activeTab === 'environment'
                  ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                  : 'text-slate-300 hover:text-white hover:bg-emerald-500/10'
              }`}
            >
              2. 최적 온습도 & 방사요령
            </button>
            <button
              onClick={() => setActiveTab('pesticide')}
              className={`px-4 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                activeTab === 'pesticide'
                  ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                  : 'text-slate-300 hover:text-white hover:bg-emerald-500/10'
              }`}
            >
              3. 농약 방제 시 안전수칙
            </button>
          </div>
        </div>

        {/* 탭 1: 핵심 3단계 설치 */}
        {activeTab === 'steps' && (
          <div className="grid md:grid-cols-3 gap-6 mb-12 animate-fade-in-up">
            
            {/* STEP 01 */}
            <div className="bg-[#071911] border-2 border-emerald-500/30 rounded-3xl p-6 sm:p-7 shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/5 rounded-full blur-2xl pointer-events-none"></div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black bg-amber-400 text-slate-950 px-3 py-1 rounded-full">
                    STEP 01
                  </span>
                  <span className="text-xs text-amber-300 font-bold">도착 직후 즉시!</span>
                </div>
                <div className="text-3xl mb-3">📦</div>
                <h3 className="text-xl font-black text-white mb-2">
                  택배 수령 직후 개봉 & 캡 열기
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  택배를 받으시면 박스 안에 방치하지 마시고 즉시 꺼내어 환기시켜 주세요.
                </p>

                <ul className="space-y-2.5 text-xs text-slate-200 bg-[#05140d] p-4 rounded-2xl border border-emerald-500/20">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">1.</span>
                    <span><strong>즉시 개봉</strong>: 수령 즉시 종이박스에서 플라스틱 벌통을 꺼냅니다.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">2.</span>
                    <span><strong>캡(뚜껑) 개방</strong>: 벌통을 살짝 들어내고 하단 설탕물통 뚜껑을 열어준 뒤 원위치합니다.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">3.</span>
                    <span><strong>안정화</strong>: 통풍이 잘되는 서늘한 곳에서 반나절~하루 동안 벌들을 안정시킵니다.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* STEP 02 */}
            <div className="bg-[#071911] border-2 border-emerald-500/30 rounded-3xl p-6 sm:p-7 shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/5 rounded-full blur-2xl pointer-events-none"></div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black bg-amber-400 text-slate-950 px-3 py-1 rounded-full">
                    STEP 02
                  </span>
                  <span className="text-xs text-amber-300 font-bold">다음 날 아침</span>
                </div>
                <div className="text-3xl mb-3">🏡</div>
                <h3 className="text-xl font-black text-white mb-2">
                  벌통 위치 선정 & 그늘막 설치
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  습도가 낮고 통풍이 잘되며 온도 유지가 용이한 장소를 선정합니다.
                </p>

                <ul className="space-y-2.5 text-xs text-slate-200 bg-[#05140d] p-4 rounded-2xl border border-emerald-500/20">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">1.</span>
                    <span><strong>설치 높이</strong>: 지면에서 약 30~50cm 높이(무릎 높이)의 컨테이너 박스 위에 놓습니다.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">2.</span>
                    <span><strong>방향</strong>: 햇빛이 잘 드는 동남쪽 방향을 향하도록 출입구를 배치합니다.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">3.</span>
                    <span><strong>그늘막 설치</strong>: 직사광선 과열을 막기 위해 벌통보다 큰 상자나 가림막으로 지붕을 만듭니다.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* STEP 03 */}
            <div className="bg-[#071911] border-2 border-amber-400/40 rounded-3xl p-6 sm:p-7 shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/10 rounded-full blur-2xl pointer-events-none"></div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black bg-amber-400 text-slate-950 px-3 py-1 rounded-full">
                    STEP 03
                  </span>
                  <span className="text-xs text-amber-300 font-bold">일출과 동시 개방</span>
                </div>
                <div className="text-3xl mb-3">🚪</div>
                <h3 className="text-xl font-black text-white mb-2">
                  출입문 개방 & 초기 유실 방지
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  아침 일출 시 출입문을 열어주고 2시간 동안 온실을 밀폐합니다.
                </p>

                <ul className="space-y-2.5 text-xs text-slate-200 bg-[#05140d] p-4 rounded-2xl border border-emerald-500/20">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">1.</span>
                    <span><strong>문 개방</strong>: 벌통 정면의 노란 손잡이를 <strong>오른쪽</strong>으로 밀어 개방합니다.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">2.</span>
                    <span><strong>유실 방지</strong>: 개방 후 <strong>첫 1~2시간 동안 환기창과 측창을 닫아</strong> 온실 밖 탈출을 막습니다.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">3.</span>
                    <span><strong>회수 시</strong>: 약제 살포 등으로 벌을 모을 때는 3~4시간 전 문을 <strong>왼쪽</strong>으로 밀어둡니다.</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        )}

        {/* 탭 2: 최적 환경 및 계절별 방사 요령 */}
        {activeTab === 'environment' && (
          <div className="space-y-8 mb-12 animate-fade-in-up">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-[#071911] border border-emerald-500/30 rounded-3xl p-6 text-center">
                <span className="text-3xl block mb-2">☀️</span>
                <span className="text-xs font-bold text-slate-400 uppercase">주간 적정 온도</span>
                <div className="text-3xl font-black text-amber-400 my-1">20 ~ 30℃</div>
                <p className="text-xs text-slate-300">최대 33℃ 이하 유지 권장 (고온 시 차광막 가동)</p>
              </div>

              <div className="bg-[#071911] border border-emerald-500/30 rounded-3xl p-6 text-center">
                <span className="text-3xl block mb-2">💧</span>
                <span className="text-xs font-bold text-slate-400 uppercase">평균 권장 습도</span>
                <div className="text-3xl font-black text-emerald-400 my-1">평균 70%</div>
                <p className="text-xs text-slate-300">최대 80% 이하 유지 (다습 시 통풍 환기)</p>
              </div>

              <div className="bg-[#071911] border border-emerald-500/30 rounded-3xl p-6 text-center">
                <span className="text-3xl block mb-2">🌙</span>
                <span className="text-xs font-bold text-slate-400 uppercase">야간 최저 온도</span>
                <div className="text-3xl font-black text-amber-400 my-1">11℃ 이상</div>
                <p className="text-xs text-slate-300">10℃ 이하 지속 시 수정율 저하 및 수명 단축</p>
              </div>
            </div>

            {/* 계절별 방사 요령 */}
            <div className="bg-[#071911] border-2 border-emerald-500/30 rounded-3xl p-6 sm:p-8">
              <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                <span>🗓️</span> 계절별 서양 뒤영벌 출입구 개방 타이밍
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-[#05140d] p-5 rounded-2xl border border-emerald-500/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-amber-300 text-sm">동절기 (11월 초 ~ 3월 말)</span>
                    <span className="text-[11px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded">보온 관리</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    외부보온(밀양식 덮개) 개방 ➔ 내부보온(보온커튼) 개방과 동시에 서양 뒤영벌 출입구를 개방합니다. 
                    (방사 후 첫 1시간은 환기창을 닫아두어 온도를 유지하세요.)
                  </p>
                </div>

                <div className="bg-[#05140d] p-5 rounded-2xl border border-emerald-500/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-emerald-300 text-sm">춘하절기 (4월 초 ~ 10월 말)</span>
                    <span className="text-[11px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">고온기 관리</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    일몰 후 어두워졌을 때 서양 뒤영벌 출입구를 개방합니다. 
                    (방사 첫째 날은 아침 환기를 1시간 정도 늦추어 벌들이 하우스 내 지형을 먼저 익히도록 합니다.)
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 탭 3: 농약 방제 시 4단계 안전 수칙 */}
        {activeTab === 'pesticide' && (
          <div className="bg-[#071911] border-2 border-rose-500/30 rounded-3xl p-6 sm:p-8 mb-12 animate-fade-in-up space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center text-2xl shrink-0">
                🚨
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  농약 살포 전 4단계 대피 수칙 (벌 폐사 방지 필수!)
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  농약 성분은 수정벌에 치명적일 수 있습니다. 방제 전 반드시 아래 절차를 준수해 주세요.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#05140d] p-4 rounded-2xl border border-rose-500/20 space-y-2">
                <span className="text-xs font-black bg-rose-500/20 text-rose-300 px-2.5 py-0.5 rounded-full">
                  1단계: 전날 낮 11시
                </span>
                <h4 className="font-bold text-white text-sm">벌통 회수 모드 전환</h4>
                <p className="text-xs text-slate-300">
                  출입구를 <strong>왼쪽</strong>으로 밀어 외출했던 벌들이 벌통 안으로 들어오기만 하도록 잠급니다.
                </p>
              </div>

              <div className="bg-[#05140d] p-4 rounded-2xl border border-rose-500/20 space-y-2">
                <span className="text-xs font-black bg-rose-500/20 text-rose-300 px-2.5 py-0.5 rounded-full">
                  2단계: 전날 저녁
                </span>
                <h4 className="font-bold text-white text-sm">안전 격리 & 먹이 급여</h4>
                <p className="text-xs text-slate-300">
                  벌통을 하우스 밖 안전한 장소로 옮긴 뒤, 동봉된 꽃가루(10~20알)를 급여합니다.
                </p>
              </div>

              <div className="bg-[#05140d] p-4 rounded-2xl border border-rose-500/20 space-y-2">
                <span className="text-xs font-black bg-rose-500/20 text-rose-300 px-2.5 py-0.5 rounded-full">
                  3단계: 방제 당일
                </span>
                <h4 className="font-bold text-white text-sm">벌통 없는 상태에서 살포</h4>
                <p className="text-xs text-slate-300">
                  하우스 내에 벌통이 완전히 없는 상태에서 계획된 약제를 꼼꼼하게 살포합니다.
                </p>
              </div>

              <div className="bg-[#05140d] p-4 rounded-2xl border border-rose-500/20 space-y-2">
                <span className="text-xs font-black bg-rose-500/20 text-rose-300 px-2.5 py-0.5 rounded-full">
                  4단계: 방제 후
                </span>
                <h4 className="font-bold text-white text-sm">충분한 환기 후 재투입</h4>
                <p className="text-xs text-slate-300">
                  약제 독성이 빠지도록 충분히 환기한 후 안전 확인 후 벌통을 다시 하우스에 설치합니다.
                </p>
              </div>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-rose-200 leading-relaxed">
                ⚠️ <strong>농약 방제 전 반드시 당사(055-294-4446)로 문의하세요.</strong> 약제 성분에 따라 수정벌을 다시 투입할 수 있는 안전 대기일수(1일~7일)가 상이합니다.
              </div>
              <a
                href="tel:0552944446"
                className="shrink-0 px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-black whitespace-nowrap"
              >
                📞 농약 잔류 문의 055-294-4446
              </a>
            </div>
          </div>
        )}

        {/* 다운로드 및 상담 버튼 */}
        <div className="text-center">
          <button
            onClick={onOpenConsultation}
            className="px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-base shadow-lg transition-all hover:scale-105"
          >
            🐝 하나벌 관리 전문가 1:1 상담받기
          </button>
        </div>

      </div>
    </section>
  );
}
