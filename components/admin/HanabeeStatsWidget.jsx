'use client';

export default function HanabeeStatsWidget({ leads }) {
  const totalCount = leads.length;
  const newCount = leads.filter((l) => (l.status || '신규 접수') === '신규 접수').length;
  const inProgressCount = leads.filter((l) => l.status === '상담 진행중' || l.status === '출하/배송 예정').length;
  const completedCount = leads.filter((l) => l.status === '완료').length;

  // 작물별 집계
  const cropCounts = leads.reduce((acc, lead) => {
    const crop = lead.crop || '기타';
    acc[crop] = (acc[crop] || 0) + 1;
    return acc;
  }, {});

  const sortedCrops = Object.entries(cropCounts).sort((a, b) => b[1] - a[1]);

  return (
    <div className="space-y-6">
      
      {/* 4대 주요 KPI 카드 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-[#071911] border border-emerald-500/20 rounded-2xl p-4 sm:p-5 shadow-lg">
          <span className="text-xs font-bold text-slate-400">총 누적 상담/예약</span>
          <div className="text-2xl sm:text-3xl font-black text-white mt-1">
            {totalCount} <span className="text-xs font-normal text-slate-400">건</span>
          </div>
          <span className="text-[11px] text-emerald-400 font-medium mt-1 block">
            전체 유입 농가 DB
          </span>
        </div>

        <div className="bg-[#071911] border border-amber-400/30 rounded-2xl p-4 sm:p-5 shadow-lg bg-amber-400/5">
          <span className="text-xs font-bold text-amber-300">신규 접수 (미확인)</span>
          <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-1">
            {newCount} <span className="text-xs font-normal text-slate-400">건</span>
          </div>
          <span className="text-[11px] text-amber-300/80 font-medium mt-1 block">
            즉시 전화 상담 필요
          </span>
        </div>

        <div className="bg-[#071911] border border-blue-500/20 rounded-2xl p-4 sm:p-5 shadow-lg">
          <span className="text-xs font-bold text-blue-300">상담 & 출하 진행중</span>
          <div className="text-2xl sm:text-3xl font-black text-blue-400 mt-1">
            {inProgressCount} <span className="text-xs font-normal text-slate-400">건</span>
          </div>
          <span className="text-[11px] text-blue-300/80 font-medium mt-1 block">
            일정 협의 및 포장 준비
          </span>
        </div>

        <div className="bg-[#071911] border border-emerald-500/20 rounded-2xl p-4 sm:p-5 shadow-lg">
          <span className="text-xs font-bold text-emerald-300">출하 완료 & 활력 가동</span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">
            {completedCount} <span className="text-xs font-normal text-slate-400">건</span>
          </div>
          <span className="text-[11px] text-emerald-300/80 font-medium mt-1 block">
            수분 활동 모니터링
          </span>
        </div>

      </div>

      {/* 작물별 비중 분포 막대 */}
      <div className="bg-[#071911] border border-emerald-500/20 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <h4 className="text-sm font-black text-white flex items-center justify-between">
          <span>🌾 접수 작물별 점유율 통계</span>
          <span className="text-xs font-normal text-slate-400">상위 요청 작물</span>
        </h4>

        {sortedCrops.length === 0 ? (
          <p className="text-xs text-slate-500 py-4 text-center">등록된 데이터가 없습니다.</p>
        ) : (
          <div className="space-y-3">
            {sortedCrops.map(([crop, count]) => {
              const percent = totalCount > 0 ? Math.round((count / totalCount) * 100) : 0;
              return (
                <div key={crop} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-200">{crop}</span>
                    <span className="text-amber-400">{count}건 ({percent}%)</span>
                  </div>
                  <div className="w-full h-2 bg-[#04100b] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
