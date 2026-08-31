'use client';

import { useState } from 'react';

const CROP_DATA = [
  {
    id: 'ripe-tomato',
    name: '완숙토마토',
    icon: '🍅',
    spec: '80~100마리',
    areaPerBox: 400, // 300~500평 기준
    minArea: 300,
    maxArea: 500,
    beesPerBox: '80~100마리',
    description: '과육 비대 및 착과율 급증, 공동과 및 기형과 발생률을 0%에 가깝게 낮춥니다.',
    keyBenefit: '화방 순서대로 고른 수정으로 생장조절 및 세력관리 용이',
    highlight: '수정율 증가로 낙화 피해 방지',
  },
  {
    id: 'cherry-tomato',
    name: '방울토마토',
    icon: '🍒',
    spec: '80~100마리',
    areaPerBox: 250, // 200~300평 기준
    minArea: 200,
    maxArea: 300,
    beesPerBox: '80~100마리',
    description: '꽃 수가 많은 방울토마토의 특성에 맞춰 신속하고 꼼꼼하게 수정합니다.',
    keyBenefit: '과육 당도(Brix) 대폭 증가 및 꼭지 신선도 유지',
    highlight: '바이트 마크(수정 흔적)로 수정 여부 즉시 육안 확인 가능',
  },
  {
    id: 'strawberry',
    name: '딸기',
    icon: '🍓',
    spec: '50~70마리',
    areaPerBox: 400, // 300~500평 기준
    minArea: 300,
    maxArea: 500,
    beesPerBox: '50~70마리',
    description: '저온기 하우스에서도 왕성한 화분 매개 활동으로 기형과를 방지합니다.',
    keyBenefit: '모양이 반듯한 특품 딸기 생산 비율 극대화',
    highlight: '호르몬 장애 없는 안전하고 친환경적인 수분',
  },
  {
    id: 'pepper',
    name: '고추 / 파프리카',
    icon: '🫑',
    spec: '150마리 이상',
    areaPerBox: 250, // 200~300평 기준
    minArea: 200,
    maxArea: 300,
    beesPerBox: '150마리 이상',
    description: '꽃가루가 풍부한 고추과 작물에 최적화된 강력한 뒤영벌 군집 투입.',
    keyBenefit: '착과 불량 및 조기 낙과 방지, 과육 두께 및 중량 증가',
    highlight: '노동력 80% 절감으로 시설 대형화 가능',
  },
  {
    id: 'melon',
    name: '멜론 / 수박 / 참외',
    icon: '🍈',
    spec: '150마리 이상',
    areaPerBox: 400, // 300~500평 기준
    minArea: 300,
    maxArea: 500,
    beesPerBox: '150마리 이상',
    description: '짧은 개화기에 일제히 개화하는 박과 작물의 특성에 맞춘 집중 수분.',
    keyBenefit: '네트 형성 완벽화 및 당도 균일화로 최고 등급 보장',
    highlight: '인공 수분 인건비 대비 비용 70% 이상 절감',
  },
  {
    id: 'blueberry',
    name: '블루베리',
    icon: '🫐',
    spec: '200마리 이상',
    areaPerBox: 250, // 200~300평 기준
    minArea: 200,
    maxArea: 300,
    beesPerBox: '200마리 이상',
    description: '종 모양의 깊은 블루베리 꽃 구조에 최적화된 긴 혀를 가진 서양 뒤영벌.',
    keyBenefit: '열매 크기 균일화, 종자 결실 증가로 과육 단단함 유지',
    highlight: '이른 봄 저온·흐린 날씨에도 활발한 비행 활동',
  },
  {
    id: 'apple',
    name: '과수 (사과·배·복숭아)',
    icon: '🍎',
    spec: '300마리 이상',
    areaPerBox: 250, // 200~300평 기준
    minArea: 200,
    maxArea: 300,
    beesPerBox: '300마리 이상',
    description: '야외 과수원 및 비가림 시설에서 대규모로 빠르게 개화하는 과수 수분.',
    keyBenefit: '정형과(예쁜 모양) 비율 대폭 향상, 씨방 완전 결실',
    highlight: '양봉 꿀벌 대비 저온/강풍 환경 활동 능력 2~3배 우수',
  },
];

export default function CropColonyCalculator({ onPrefillAndOpen }) {
  const [selectedCropId, setSelectedCropId] = useState('ripe-tomato');
  const [area, setArea] = useState(600); // default 600평
  const [houseCount, setHouseCount] = useState(3); // 3동 (동당 200평)

  const selectedCrop = CROP_DATA.find((c) => c.id === selectedCropId) || CROP_DATA[0];

  // 봉군 수 계산: 올림 처리 (최소 1통)
  const recommendedBoxes = Math.max(1, Math.ceil(area / selectedCrop.areaPerBox));
  const minBoxes = Math.max(1, Math.floor(area / selectedCrop.maxArea));
  const maxBoxes = Math.max(1, Math.ceil(area / selectedCrop.minArea));

  const handleAreaChange = (val) => {
    const num = Math.max(50, Math.min(10000, Number(val) || 0));
    setArea(num);
    setHouseCount(Math.round((num / 200) * 10) / 10);
  };

  const handleHouseChange = (val) => {
    const num = Math.max(1, Math.min(50, Number(val) || 1));
    setHouseCount(num);
    setArea(num * 200);
  };

  const handleConsultationClick = () => {
    if (onPrefillAndOpen) {
      onPrefillAndOpen({
        crop: selectedCrop.name,
        area: `${area}평 (${houseCount}동)`,
        boxes: `${recommendedBoxes}통`,
      });
    }
  };

  return (
    <section id="calculator" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#081b13] relative overflow-hidden border-t border-b border-emerald-500/20">
      
      {/* 🔮 은은한 배경 효과 */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* 섹션 헤더 */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-black tracking-wide">
            <span>🧮 거성 하나벌 맞춤 시뮬레이터</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            우리 농장 <span className="text-amber-400">최적 봉군 규격 & 견적</span> 계산기
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed break-keep">
            26년간 축적된 수만 개 시설원예 농가 데이터와 거성 브로슈어 공인 규격을 기반으로<br className="hidden sm:inline" />
            재배 작물과 면적에 가장 최적화된 봉군 수량 및 투입 효과를 실시간으로 산출합니다.
          </p>
        </div>

        {/* 메인 계산기 인터랙티브 박스 */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* 좌측 1: 작물 선택 & 면적 슬라이더 (7열) */}
          <div className="lg:col-span-7 bg-[#071911] border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8">
            
            {/* STEP 1: 작물 선택 */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black text-amber-400 tracking-wider uppercase bg-amber-400/10 px-2.5 py-1 rounded-md">
                  STEP 01
                </span>
                <span className="text-xs text-slate-400 font-medium">재배 작물을 선택해 주세요</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white mb-4">
                1. 어떤 작물을 재배하시나요?
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                {CROP_DATA.map((crop) => {
                  const isSelected = crop.id === selectedCropId;
                  return (
                    <button
                      key={crop.id}
                      type="button"
                      onClick={() => setSelectedCropId(crop.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between min-h-[95px] ${
                        isSelected
                          ? 'bg-amber-400/15 border-amber-400 text-white shadow-[0_0_20px_rgba(245,158,11,0.25)] scale-[1.02]'
                          : 'bg-[#0a2318]/50 border-emerald-500/20 text-slate-300 hover:border-emerald-400/40 hover:bg-[#0a2318]'
                      }`}
                    >
                      <div className="text-2xl">{crop.icon}</div>
                      <div>
                        <div className={`font-black text-sm ${isSelected ? 'text-amber-300' : 'text-white'}`}>
                          {crop.name}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {crop.spec}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: 면적 및 동수 입력 */}
            <div className="pt-6 border-t border-emerald-500/20">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black text-amber-400 tracking-wider uppercase bg-amber-400/10 px-2.5 py-1 rounded-md">
                  STEP 02
                </span>
                <span className="text-xs text-slate-400 font-medium">실제 재배 면적 설정</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white mb-4">
                2. 하우스 면적(평수) 또는 동수를 입력하세요
              </h3>

              {/* 면적 & 동수 인풋 박스 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div className="bg-[#0a2318] p-4 rounded-2xl border border-emerald-500/30">
                  <label className="block text-xs font-bold text-slate-400 mb-1">
                    총 재배 면적 (평)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={area}
                      onChange={(e) => handleAreaChange(e.target.value)}
                      className="w-full bg-[#061810] border border-emerald-500/40 rounded-xl px-4 py-2.5 text-white font-black text-lg focus:outline-none focus:border-amber-400"
                    />
                    <span className="text-slate-300 font-bold text-sm shrink-0">평</span>
                  </div>
                </div>

                <div className="bg-[#0a2318] p-4 rounded-2xl border border-emerald-500/30">
                  <label className="block text-xs font-bold text-slate-400 mb-1">
                    하우스 동 수 (1동 ≈ 200평 기준)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="0.5"
                      value={houseCount}
                      onChange={(e) => handleHouseChange(e.target.value)}
                      className="w-full bg-[#061810] border border-emerald-500/40 rounded-xl px-4 py-2.5 text-white font-black text-lg focus:outline-none focus:border-amber-400"
                    />
                    <span className="text-slate-300 font-bold text-sm shrink-0">개 동</span>
                  </div>
                </div>
              </div>

              {/* 빠른 면적 선택 버튼 */}
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs text-slate-400 font-bold mr-1">빠른 선택:</span>
                {[200, 400, 600, 800, 1000, 1500, 2000].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => handleAreaChange(preset)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      area === preset
                        ? 'bg-amber-400 text-slate-950 border-amber-400'
                        : 'bg-[#061810] text-slate-300 border-emerald-500/30 hover:border-amber-400/50'
                    }`}
                  >
                    {preset}평
                  </button>
                ))}
              </div>

              {/* 면적 슬라이더 */}
              <div className="mt-6">
                <input
                  type="range"
                  min="100"
                  max="3000"
                  step="50"
                  value={area}
                  onChange={(e) => handleAreaChange(e.target.value)}
                  className="w-full h-2.5 bg-[#061810] rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
                  <span>100평</span>
                  <span>1,000평</span>
                  <span>2,000평</span>
                  <span>3,000평+</span>
                </div>
              </div>

            </div>

          </div>

          {/* 우측 2: 실시간 권장 규격 & 투입 리포트 결과 (5열) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#092b1c] to-[#071911] border-2 border-amber-400/50 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative">
            
            {/* 결과 뱃지 */}
            <div className="flex items-center justify-between pb-4 border-b border-emerald-500/20 mb-6">
              <div>
                <span className="text-[11px] font-black tracking-widest text-amber-300 uppercase bg-amber-400/20 px-2 py-0.5 rounded">
                  ANALYSIS RESULT
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                  {selectedCrop.name} 맞춤 처방
                </h3>
              </div>
              <div className="text-4xl">{selectedCrop.icon}</div>
            </div>

            {/* 권장 봉군 수량 하이라이트 박스 */}
            <div className="bg-[#05140d] border border-amber-400/30 rounded-2xl p-5 mb-6 text-center relative overflow-hidden">
              <div className="text-xs text-amber-400/90 font-bold mb-1">
                {area}평 ({houseCount}동) 기준 권장 봉군 수
              </div>
              <div className="text-4xl sm:text-5xl font-black text-white tracking-tight flex items-baseline justify-center gap-1.5">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-200">
                  {minBoxes === maxBoxes ? `${recommendedBoxes}통` : `${minBoxes} ~ ${maxBoxes}통`}
                </span>
                <span className="text-sm sm:text-base text-slate-300 font-semibold">(봉군)</span>
              </div>
              <p className="text-xs text-emerald-300 mt-2 font-medium">
                통당 규격: {selectedCrop.beesPerBox} 내외 (신선 출하)
              </p>
            </div>

            {/* 세부 처방 스펙 리스트 */}
            <div className="space-y-3 mb-6 text-sm">
              <div className="flex justify-between items-center py-2 border-b border-emerald-500/10">
                <span className="text-slate-400 font-medium">예상 수분 활동 기간</span>
                <span className="text-white font-bold">약 40 ~ 45일간 지속</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-emerald-500/10">
                <span className="text-slate-400 font-medium">1통당 적정 면적</span>
                <span className="text-white font-bold">{selectedCrop.minArea} ~ {selectedCrop.maxArea}평</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-emerald-500/10">
                <span className="text-slate-400 font-medium">권장 투입 환경</span>
                <span className="text-amber-300 font-bold">주간 20~30℃ / 야간 11℃ 이상</span>
              </div>
            </div>

            {/* 핵심 기대 효과 알림 박스 */}
            <div className="bg-emerald-950/60 border border-emerald-500/30 rounded-2xl p-4 mb-6 space-y-2">
              <div className="text-xs font-black text-emerald-300 flex items-center gap-1.5">
                <span>💡</span> <span>{selectedCrop.name} 재배 시 주요 기대 효과</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {selectedCrop.description}
              </p>
              <div className="text-[11px] text-amber-300 font-bold pt-1">
                ✓ {selectedCrop.highlight}
              </div>
            </div>

            {/* 주의사항 */}
            <div className="text-[11px] text-slate-400 space-y-1 mb-6 bg-[#061810] p-3 rounded-xl border border-emerald-500/20">
              <p>⚠️ <strong>호르몬 처리 농가</strong>: 처리 후 최소 3일 경과 후 수정벌을 투입해 주세요.</p>
              <p>⚠️ <strong>농약 살포 시</strong>: 사용 전 반드시 당사(055-294-4446)로 잔류 안전성을 확인하세요.</p>
            </div>

            {/* CTA 버튼 */}
            <button
              onClick={handleConsultationClick}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-base sm:text-lg shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:shadow-[0_0_40px_rgba(245,158,11,0.6)] transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95"
            >
              <span>이 조건({selectedCrop.name} {recommendedBoxes}통)으로 상담 예약</span>
              <span className="text-base font-bold">→</span>
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}
