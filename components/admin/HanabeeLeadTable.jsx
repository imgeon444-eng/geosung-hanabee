'use client';

import { useState } from 'react';

export default function HanabeeLeadTable({ leads, onUpdateStatus, onDeleteLead }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [cropFilter, setCropFilter] = useState('ALL');

  // 필터링된 목록
  const filteredLeads = leads.filter((l) => {
    const matchSearch =
      (l.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (l.phone || '').includes(searchTerm) ||
      (l.region || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (l.notes || l.memo || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus = statusFilter === 'ALL' || (l.status || '신규 접수') === statusFilter;
    const matchCrop = cropFilter === 'ALL' || (l.crop || '') === cropFilter;

    return matchSearch && matchStatus && matchCrop;
  });

  // 엑셀(CSV) 다운로드 함수
  const exportToCSV = () => {
    if (leads.length === 0) {
      alert('다운로드할 데이터가 없습니다.');
      return;
    }

    const headers = ['접수일시', '농가명/성함', '연락처', '농장지역', '재배작물', '하우스면적', '봉군수량', '희망투입일', '진행상태', '상담메모'];
    
    const rows = filteredLeads.map((l) => [
      l.createdAt ? new Date(l.createdAt).toLocaleDateString('ko-KR') : '',
      `"${l.name || ''}"`,
      `"${l.phone || ''}"`,
      `"${l.region || ''}"`,
      `"${l.crop || ''}"`,
      `"${l.area || ''}"`,
      `"${l.boxes || ''}"`,
      `"${l.targetDate || ''}"`,
      `"${l.status || '신규 접수'}"`,
      `"${(l.notes || l.memo || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `거성하나벌_상담예약명단_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-[#071911] border border-emerald-500/20 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
      
      {/* 상단 검색 및 엑셀 다운로드 바 */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* 검색 인풋 & 필터 */}
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="relative min-w-[200px] flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="🔍 농가명, 전화번호, 지역, 메모 검색..."
              className="w-full bg-[#05140d] border border-emerald-500/30 rounded-xl px-4 py-2.5 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400 placeholder-slate-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#05140d] border border-emerald-500/30 rounded-xl px-3 py-2.5 text-white text-xs focus:outline-none focus:border-amber-400"
          >
            <option value="ALL">전체 상태 보기</option>
            <option value="신규 접수">신규 접수</option>
            <option value="상담 진행중">상담 진행중</option>
            <option value="출하/배송 예정">출하/배송 예정</option>
            <option value="완료">완료</option>
            <option value="취소/보류">취소/보류</option>
          </select>

          <select
            value={cropFilter}
            onChange={(e) => setCropFilter(e.target.value)}
            className="bg-[#05140d] border border-emerald-500/30 rounded-xl px-3 py-2.5 text-white text-xs focus:outline-none focus:border-amber-400"
          >
            <option value="ALL">전체 작물 보기</option>
            <option value="완숙토마토">완숙토마토</option>
            <option value="방울토마토">방울토마토</option>
            <option value="딸기">딸기</option>
            <option value="고추/파프리카">고추/파프리카</option>
            <option value="멜론/수박">멜론/수박</option>
            <option value="블루베리">블루베리</option>
            <option value="사과/과수">사과/과수</option>
          </select>
        </div>

        {/* 엑셀 다운로드 버튼 */}
        <button
          onClick={exportToCSV}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all whitespace-nowrap"
        >
          <span>📥</span> <span>엑셀(CSV) 다운로드 ({filteredLeads.length}건)</span>
        </button>

      </div>

      {/* 테이블 */}
      <div className="overflow-x-auto custom-scrollbar rounded-2xl border border-emerald-500/20">
        <table className="w-full text-left text-xs text-slate-300 min-w-[850px]">
          <thead className="bg-[#04100b] text-slate-400 font-bold border-b border-emerald-500/20">
            <tr>
              <th className="py-3 px-3">접수일</th>
              <th className="py-3 px-3">농가명/성함</th>
              <th className="py-3 px-3">연락처</th>
              <th className="py-3 px-3">지역</th>
              <th className="py-3 px-3">작물</th>
              <th className="py-3 px-3">면적</th>
              <th className="py-3 px-3">봉군수량</th>
              <th className="py-3 px-3">상태</th>
              <th className="py-3 px-3 max-w-[200px]">상담 메모</th>
              <th className="py-3 px-3 text-right">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-500/10 bg-[#061810]">
            {filteredLeads.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-12 text-center text-slate-500 text-sm">
                  검색 조건에 맞는 상담/예약 내역이 없습니다.
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-[#082216] transition-colors">
                  <td className="py-3 px-3 font-mono text-[11px] text-slate-400">
                    {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString('ko-KR').slice(2) : '-'}
                  </td>
                  <td className="py-3 px-3 font-bold text-white whitespace-nowrap">
                    {lead.name}
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <a
                      href={`tel:${lead.phone}`}
                      className="text-amber-300 hover:underline font-bold"
                    >
                      📞 {lead.phone}
                    </a>
                  </td>
                  <td className="py-3 px-3 text-slate-300 whitespace-nowrap">
                    {lead.region || '-'}
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold border border-emerald-500/30 text-[11px]">
                      {lead.crop || '토마토'}
                    </span>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    {lead.area || '-'}
                  </td>
                  <td className="py-3 px-3 font-bold text-amber-400 whitespace-nowrap">
                    {lead.boxes || '상담'}
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <select
                      value={lead.status || '신규 접수'}
                      onChange={(e) => onUpdateStatus(lead.id, e.target.value)}
                      className="bg-[#05140d] border border-emerald-500/30 text-slate-200 text-[11px] rounded-lg px-2 py-1 focus:outline-none"
                    >
                      <option value="신규 접수">신규 접수</option>
                      <option value="상담 진행중">상담 진행중</option>
                      <option value="출하/배송 예정">출하/배송 예정</option>
                      <option value="완료">완료</option>
                      <option value="취소/보류">취소/보류</option>
                    </select>
                  </td>
                  <td className="py-3 px-3 text-slate-300 text-[11px] max-w-[200px] truncate" title={lead.notes || lead.memo}>
                    {lead.notes || lead.memo || '-'}
                  </td>
                  <td className="py-3 px-3 text-right whitespace-nowrap">
                    <button
                      onClick={() => {
                        if (confirm(`'${lead.name}' 농가 상담 내역을 삭제하시겠습니까?`)) {
                          onDeleteLead(lead.id);
                        }
                      }}
                      className="text-slate-500 hover:text-rose-400 text-xs px-1.5 py-1"
                      title="삭제"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
