'use client';

import { useState } from 'react';

export default function HanabeeAddLeadModal({ isOpen, onClose, onAddLead }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    region: '',
    crop: '완숙토마토',
    area: '',
    boxes: '1통',
    targetDate: '',
    notes: '전화 상담을 통해 관리자가 수기 등록함',
    status: '신규 접수',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('성함과 연락처는 필수입니다.');
      return;
    }

    const newLead = {
      ...formData,
      id: 'lead_' + Date.now(),
      createdAt: new Date().toISOString(),
    };

    onAddLead(newLead);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in-up">
      <div className="relative w-full max-w-lg bg-[#071e14] border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white text-lg"
        >
          ✕
        </button>

        <h3 className="text-xl font-black text-white mb-1 flex items-center gap-2">
          <span>➕</span> 전화 주문 / 수기 상담 등록
        </h3>
        <p className="text-xs text-slate-400 mb-6">
          유선 전화로 접수된 농가 주문 및 상담 내역을 CRM에 등록합니다.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">농가명 / 성함 *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="예: 김영수 (밀양농장)"
                className="w-full bg-[#05140d] border border-emerald-500/30 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">연락처 *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="예: 010-9876-5432"
                className="w-full bg-[#05140d] border border-emerald-500/30 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">재배 작물</label>
              <select
                value={formData.crop}
                onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
                className="w-full bg-[#05140d] border border-emerald-500/30 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-400"
              >
                <option value="완숙토마토">완숙토마토</option>
                <option value="방울토마토">방울토마토</option>
                <option value="딸기">딸기</option>
                <option value="고추/파프리카">고추/파프리카</option>
                <option value="멜론/수박">멜론/수박</option>
                <option value="블루베리">블루베리</option>
                <option value="사과/과수">사과/과수</option>
                <option value="기타 작물">기타 작물</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">농장 소재지</label>
              <input
                type="text"
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                placeholder="예: 경남 밀양시 삼랑진읍"
                className="w-full bg-[#05140d] border border-emerald-500/30 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">면적</label>
              <input
                type="text"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                placeholder="예: 800평"
                className="w-full bg-[#05140d] border border-emerald-500/30 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">봉군 수량</label>
              <input
                type="text"
                value={formData.boxes}
                onChange={(e) => setFormData({ ...formData, boxes: e.target.value })}
                placeholder="예: 2통"
                className="w-full bg-[#05140d] border border-emerald-500/30 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">초기 상태</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-[#05140d] border border-emerald-500/30 rounded-xl px-2 py-2 text-white text-xs focus:outline-none focus:border-amber-400"
              >
                <option value="신규 접수">신규 접수</option>
                <option value="상담 진행중">상담 진행중</option>
                <option value="출하/배송 예정">출하/배송 예정</option>
                <option value="완료">완료</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">상담 메모</label>
            <textarea
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full bg-[#05140d] border border-emerald-500/30 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="pt-3 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-3 rounded-xl bg-slate-800 text-slate-300 font-bold text-sm hover:bg-slate-700"
            >
              취소
            </button>
            <button
              type="submit"
              className="w-2/3 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-md"
            >
              신규 등록 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
