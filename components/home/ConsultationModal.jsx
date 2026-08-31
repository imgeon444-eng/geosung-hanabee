'use client';

import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function ConsultationModal({ isOpen, onClose, prefillData }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    region: '',
    crop: '완숙토마토',
    area: '',
    boxes: '',
    targetDate: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (prefillData) {
      setFormData((prev) => ({
        ...prev,
        crop: prefillData.crop || prev.crop,
        area: prefillData.area || prev.area,
        boxes: prefillData.boxes || prev.boxes,
      }));
    }
  }, [prefillData]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('성함과 연락처를 입력해 주세요.');
      return;
    }

    setIsSubmitting(true);
    const newLead = {
      id: 'lead_' + Date.now(),
      name: formData.name,
      phone: formData.phone,
      region: formData.region || '미입력',
      crop: formData.crop,
      area: formData.area || '미입력',
      boxes: formData.boxes || '상담 후 결정',
      targetDate: formData.targetDate || '협의 필요',
      notes: formData.notes || '',
      status: '신규 접수',
      source: '홈페이지 상담/예약 모달',
      createdAt: new Date().toISOString(),
    };

    // 1. LocalStorage 저장 (오프라인/에러 방지 백업)
    try {
      const existing = JSON.parse(localStorage.getItem('hanabee_leads') || '[]');
      localStorage.setItem('hanabee_leads', JSON.stringify([newLead, ...existing]));
    } catch (err) {
      console.error('LocalStorage error', err);
    }

    // 2. Firebase Firestore 저장
    try {
      if (db) {
        await addDoc(collection(db, 'hanabee_leads'), {
          ...newLead,
          timestamp: serverTimestamp(),
        });
      }
    } catch (err) {
      console.warn('Firestore sync failed, local saved', err);
    }

    // 3. API 백엔드 호출
    try {
      await fetch('/api/hanabee-consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLead),
      });
    } catch (err) {
      console.log('Background API call');
    }

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleModalClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in-up">
      <div className="relative w-full max-w-xl bg-[#071e14] border-2 border-amber-400/50 rounded-3xl p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.9)] my-8 text-slate-100">
        
        {/* 닫기 버튼 */}
        <button
          onClick={handleModalClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/30 text-slate-300 hover:text-white flex items-center justify-center text-lg transition-colors"
        >
          ✕
        </button>

        {isSuccess ? (
          <div className="py-12 text-center space-y-4 animate-fade-in-up">
            <div className="w-20 h-20 bg-amber-400/20 border-2 border-amber-400 text-amber-300 text-4xl rounded-full flex items-center justify-center mx-auto animate-bounce">
              ✓
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              상담 및 봉군 예약이 접수되었습니다!
            </h3>
            <p className="text-sm sm:text-base text-slate-300 max-w-md mx-auto leading-relaxed">
              거성 하나벌 전문 상담원이 기재해 주신 연락처(<strong className="text-amber-300">{formData.phone}</strong>)로 신속히 연락드려 작물 맞춤 출하 일정을 안내해 드리겠습니다.
            </p>
            <div className="p-4 bg-[#05140d] rounded-2xl border border-emerald-500/20 text-xs text-slate-400 max-w-sm mx-auto">
              급한 배송이나 긴급 문의는 고객센터 <strong className="text-white">055-294-4446</strong>으로 전화 주시면 즉시 연결됩니다.
            </div>
            <div className="pt-4">
              <button
                onClick={handleModalClose}
                className="px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-sm transition-all shadow-md"
              >
                확인 완료
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* 모달 헤더 */}
            <div className="mb-6 border-b border-emerald-500/20 pb-4">
              <span className="text-[11px] font-black text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md uppercase tracking-wider">
                1:1 CUSTOM CONSULTATION
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-2">
                거성 하나벌 맞춤 상담 & 예약 신청
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                농장 정보와 재배 작물을 남겨주시면, 최적의 봉군 투입 계획과 견적을 안내해 드립니다.
              </p>
            </div>

            {/* 폼 */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    신청자 성함 / 농가명 <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="예: 홍길동 (대산농장)"
                    className="w-full bg-[#05140d] border border-emerald-500/30 focus:border-amber-400 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    휴대폰 연락처 <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="예: 010-1234-5678"
                    className="w-full bg-[#05140d] border border-emerald-500/30 focus:border-amber-400 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    농장 소재지 (시/군)
                  </label>
                  <input
                    type="text"
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    placeholder="예: 경남 창원시, 충남 부여군"
                    className="w-full bg-[#05140d] border border-emerald-500/30 focus:border-amber-400 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    재배 작물
                  </label>
                  <select
                    value={formData.crop}
                    onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
                    className="w-full bg-[#05140d] border border-emerald-500/30 focus:border-amber-400 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none transition-colors"
                  >
                    <option value="완숙토마토">완숙토마토</option>
                    <option value="방울토마토">방울토마토</option>
                    <option value="딸기">딸기</option>
                    <option value="고추/파프리카">고추/파프리카</option>
                    <option value="멜론/수박">멜론/수박</option>
                    <option value="블루베리">블루베리</option>
                    <option value="사과/과수">사과/과수</option>
                    <option value="인공수분 꽃가루">인공수분용 명품 꽃가루</option>
                    <option value="기타 작물">기타 작물</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    하우스 면적
                  </label>
                  <input
                    type="text"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    placeholder="예: 600평 (3동)"
                    className="w-full bg-[#05140d] border border-emerald-500/30 focus:border-amber-400 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    필요 봉군 수량
                  </label>
                  <input
                    type="text"
                    value={formData.boxes}
                    onChange={(e) => setFormData({ ...formData, boxes: e.target.value })}
                    placeholder="예: 2통"
                    className="w-full bg-[#05140d] border border-emerald-500/30 focus:border-amber-400 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    희망 투입일
                  </label>
                  <input
                    type="date"
                    value={formData.targetDate}
                    onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                    className="w-full bg-[#05140d] border border-emerald-500/30 focus:border-amber-400 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  문의 사항 및 특이사항
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="예: 이전 작기에서 호르몬 장해가 심해 뒤영벌로 교체하려 합니다. 출하 가능 일자 확인 부탁드립니다."
                  className="w-full bg-[#05140d] border border-emerald-500/30 focus:border-amber-400 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none transition-colors"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-base shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95"
                >
                  {isSubmitting ? (
                    <span>⏳ 상담 정보 전송 중...</span>
                  ) : (
                    <span>🐝 무료 상담 및 봉군 예약 신청하기</span>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>🔒 개인정보는 예약 안내용으로만 안전하게 관리됩니다.</span>
                <a href="tel:0552944446" className="text-amber-400 font-bold hover:underline">
                  전화 상담 055-294-4446
                </a>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
