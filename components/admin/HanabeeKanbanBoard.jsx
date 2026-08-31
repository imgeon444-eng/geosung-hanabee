'use client';

import { useState } from 'react';

const STATUS_COLUMNS = [
  { id: '신규 접수', label: '신규 접수 (미확인)', color: 'border-amber-400/60 text-amber-300 bg-amber-400/10' },
  { id: '상담 진행중', label: '상담 진행중', color: 'border-blue-400/60 text-blue-300 bg-blue-400/10' },
  { id: '출하/배송 예정', label: '출하/배송 예정', color: 'border-purple-400/60 text-purple-300 bg-purple-400/10' },
  { id: '완료', label: '완료 (수정중)', color: 'border-emerald-400/60 text-emerald-300 bg-emerald-400/10' },
  { id: '취소/보류', label: '취소 / 보류', color: 'border-slate-500/60 text-slate-400 bg-slate-500/10' },
];

export default function HanabeeKanbanBoard({ leads, onUpdateStatus, onUpdateMemo, onDeleteLead }) {
  const [editingMemoId, setEditingMemoId] = useState(null);
  const [tempMemo, setTempMemo] = useState('');

  const startEditMemo = (lead) => {
    setEditingMemoId(lead.id);
    setTempMemo(lead.notes || lead.memo || '');
  };

  const saveMemo = (leadId) => {
    onUpdateMemo(leadId, tempMemo);
    setEditingMemoId(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {STATUS_COLUMNS.map((col) => {
        const colLeads = leads.filter((l) => (l.status || '신규 접수') === col.id);

        return (
          <div
            key={col.id}
            className="bg-[#071911] border border-emerald-500/20 rounded-2xl p-3.5 flex flex-col min-h-[500px]"
          >
            {/* 컬럼 헤더 */}
            <div className={`flex items-center justify-between p-2.5 rounded-xl border mb-3 ${col.color}`}>
              <h4 className="font-black text-xs">{col.label}</h4>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-black/40">
                {colLeads.length}
              </span>
            </div>

            {/* 카드 목록 */}
            <div className="space-y-3 flex-1 overflow-y-auto custom-scrollbar pr-1">
              {colLeads.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-500 border border-dashed border-emerald-500/10 rounded-xl">
                  해당 단계 없음
                </div>
              ) : (
                colLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="bg-[#05140d] border border-emerald-500/30 hover:border-amber-400/50 rounded-2xl p-4 transition-all shadow-md space-y-3"
                  >
                    {/* 상단: 이름 & 작물 */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h5 className="font-black text-white text-sm">
                          {lead.name}
                        </h5>
                        <span className="text-[11px] text-slate-400">
                          {lead.region || '지역 미입력'}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-500/30 shrink-0">
                        {lead.crop || '토마토'}
                      </span>
                    </div>

                    {/* 면적 & 희망 봉군 수 */}
                    <div className="bg-[#081e14] p-2.5 rounded-xl border border-emerald-500/20 text-xs space-y-1">
                      <div className="flex justify-between text-slate-300">
                        <span>면적:</span>
                        <span className="font-bold text-white">{lead.area || '미입력'}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>봉군:</span>
                        <span className="font-black text-amber-300">{lead.boxes || '협의 필요'}</span>
                      </div>
                      {lead.targetDate && (
                        <div className="flex justify-between text-slate-400 text-[11px]">
                          <span>투입일:</span>
                          <span className="text-slate-200">{lead.targetDate}</span>
                        </div>
                      )}
                    </div>

                    {/* 전화걸기 & 연락처 */}
                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${lead.phone}`}
                        className="flex-1 py-1.5 px-3 rounded-xl bg-amber-400/15 hover:bg-amber-400/30 border border-amber-400/40 text-amber-300 text-xs font-black flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <span>📞</span> <span>{lead.phone}</span>
                      </a>
                    </div>

                    {/* 상담 메모 */}
                    <div className="text-xs">
                      {editingMemoId === lead.id ? (
                        <div className="space-y-1.5">
                          <textarea
                            rows={2}
                            value={tempMemo}
                            onChange={(e) => setTempMemo(e.target.value)}
                            className="w-full bg-[#030d08] border border-amber-400 rounded-lg p-2 text-xs text-white focus:outline-none"
                          />
                          <div className="flex gap-1 justify-end">
                            <button
                              onClick={() => setEditingMemoId(null)}
                              className="px-2 py-1 bg-slate-800 text-[10px] rounded text-slate-300"
                            >
                              취소
                            </button>
                            <button
                              onClick={() => saveMemo(lead.id)}
                              className="px-2 py-1 bg-amber-500 text-[10px] rounded text-slate-950 font-bold"
                            >
                              저장
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div
                          onClick={() => startEditMemo(lead)}
                          className="bg-[#030d08] p-2 rounded-lg border border-emerald-500/10 text-slate-300 text-[11px] cursor-pointer hover:border-amber-400/30 transition-colors"
                          title="클릭하여 메모 수정"
                        >
                          <span className="text-slate-500 font-bold block mb-0.5">📝 상담 메모 (클릭 수정):</span>
                          <p className="line-clamp-2">{lead.notes || lead.memo || '메모 없음'}</p>
                        </div>
                      )}
                    </div>

                    {/* 하단: 상태 변경 & 삭제 */}
                    <div className="pt-2 border-t border-emerald-500/10 flex items-center justify-between gap-1">
                      <select
                        value={lead.status || '신규 접수'}
                        onChange={(e) => onUpdateStatus(lead.id, e.target.value)}
                        className="bg-[#0a2318] border border-emerald-500/30 text-slate-200 text-[11px] rounded-lg px-2 py-1 focus:outline-none"
                      >
                        {STATUS_COLUMNS.map((sc) => (
                          <option key={sc.id} value={sc.id}>
                            → {sc.id}
                          </option>
                        ))}
                      </select>

                      <button
                        onClick={() => {
                          if (confirm(`'${lead.name}' 농가 상담 내역을 삭제하시겠습니까?`)) {
                            onDeleteLead(lead.id);
                          }
                        }}
                        className="text-slate-500 hover:text-rose-400 text-xs p-1"
                        title="삭제"
                      >
                        🗑️
                      </button>
                    </div>

                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
