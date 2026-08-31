'use client';

import { useState, useRef } from 'react';
import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function HeroVideoSection({ onOpenConsultation, onPrefillAndOpen }) {
  const [activeTab, setActiveTab] = useState('reserve'); // reserve | stats | trust
  const [quickForm, setQuickForm] = useState({
    name: '',
    phone: '',
    crop: '완숙토마토',
    area: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  const handleQuickSubmit = async (e) => {
    e.preventDefault();
    if (!quickForm.name || !quickForm.phone) {
      alert('성함과 연락처를 입력해 주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      const newLead = {
        id: 'lead_' + Date.now(),
        name: quickForm.name,
        phone: quickForm.phone,
        crop: quickForm.crop,
        area: quickForm.area ? `${quickForm.area}평` : '미입력',
        status: '신규 접수',
        memo: '메인 빠른 상담신청(하단 탭)을 통해 접수됨',
        createdAt: new Date().toISOString(),
      };

      // 1. LocalStorage 백업
      const existing = JSON.parse(localStorage.getItem('hanabee_leads') || '[]');
      localStorage.setItem('hanabee_leads', JSON.stringify([newLead, ...existing]));

      // 2. Firebase Firestore 실시간 클라우드 DB 저장
      try {
        if (db) {
          await addDoc(collection(db, 'hanabee_leads'), {
            ...newLead,
            timestamp: serverTimestamp(),
          });
        }
      } catch (dbErr) {
        console.warn('Firestore direct write', dbErr);
      }

      // 3. API 백엔드 호출 (이메일 발송 등)
      try {
        await fetch('/api/hanabee-consultation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newLead),
        });
      } catch (err) {
        console.log('API sync background');
      }

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setQuickForm({ name: '', phone: '', crop: '완숙토마토', area: '' });
      }, 4000);
    } catch (e) {
      alert('접수 중 오류가 발생했습니다. 전화(055-294-4446)로 문의해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#07130E]">
      
      {/* 🎬 1. 최상단: 시원하고 선명한 풀스크린 시네마틱 히어로 */}
      <div className="relative min-h-[92vh] flex flex-col items-center justify-between pt-32 pb-10 px-4 sm:px-6 lg:px-8">
        
        {/* 고화질 비디오 배경 (선명도 대폭 상향: opacity 88%, 부드러운 로드) */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#06150e]">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="auto"
            onLoadedData={() => setVideoLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              videoLoaded ? 'opacity-85 sm:opacity-90' : 'opacity-30'
            }`}
            src="/videos/hero.mp4"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          
          {/* 가독성을 살려주는 시네마틱 소프트 비네팅 (영상 색감 최대한 보존) */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#07130E]/80 via-transparent to-[#07130E] pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#07130E] via-[#07130E]/30 to-transparent pointer-events-none"></div>
          <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
        </div>

        {/* 🔊 비디오 소리 켜기/끄기 플로팅 버튼 */}
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? "소리 켜기" : "소리 끄기"}
          className="absolute top-28 right-6 z-20 hidden md:flex items-center gap-2 bg-black/60 hover:bg-black/85 text-white/90 border border-emerald-500/30 px-4 py-2 rounded-full text-xs font-bold backdrop-blur-md transition-all shadow-lg hover:scale-105"
        >
          <span>{isMuted ? '🔇 소리 켜기' : '🔊 소리 끄기'}</span>
        </button>

        {/* 🔮 중앙 앰비언트 글로우 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none z-0" />

        {/* 🌟 메인 헤드라인 (중앙 집중형으로 시야를 넓고 시원하게 연출) */}
        <div className="max-w-5xl mx-auto relative z-10 w-full text-center my-auto space-y-6">
          
          {/* 상단 서브 뱃지 */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#071911]/85 border border-emerald-400/40 text-emerald-300 text-xs sm:text-sm font-extrabold tracking-wide backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.6)] animate-fade-in-up">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400"></span>
            </span>
            <span>농업회사법인 (합)거성 · 국내 1위 화분매개 수정벌</span>
          </div>

          {/* 메인 타이틀 */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.12] drop-shadow-[0_8px_30px_rgba(0,0,0,0.9)] animate-fade-in-up">
            고품질 과실 수확의<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-200 drop-shadow-[0_0_45px_rgba(245,158,11,0.6)]">
              가장 확실한 파트너
            </span>{' '}
            <span className="text-emerald-400">거성 하나벌</span>
          </h1>

          {/* 깔끔한 서브 카피 */}
          <p className="text-slate-100 text-base sm:text-xl md:text-2xl font-medium leading-relaxed max-w-3xl mx-auto break-keep drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] px-4">
            국내 시장 <strong className="text-amber-300 font-extrabold">점유율 60% 1위</strong> · 
            26년 연구 노하우의 활력 넘치는 <strong className="text-white font-extrabold">서양 뒤영벌</strong>로 
            착과율 극대화와 농가 인건비 80% 절감을 실현합니다.
          </p>

          {/* 간결하고 직관적인 핵심 버튼 그룹 */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
            <button
              onClick={onOpenConsultation}
              className="h-14 sm:h-16 px-8 sm:px-10 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-base sm:text-lg shadow-[0_0_40px_rgba(245,158,11,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5"
            >
              <span>🐝 1:1 맞춤 상담 예약</span>
              <span className="text-xl">→</span>
            </button>

            <a
              href="#quick-dock"
              className="h-14 sm:h-16 px-7 rounded-2xl bg-black/60 hover:bg-black/80 border border-emerald-400/40 text-emerald-300 hover:text-white font-bold text-sm sm:text-base transition-all flex items-center gap-2 backdrop-blur-md shadow-lg"
            >
              <span>⚡ 빠른 견적 & 핵심 정보</span>
              <span className="text-amber-400">↓</span>
            </a>

            <a
              href="tel:0552944446"
              className="h-14 sm:h-16 px-7 rounded-2xl bg-[#092217]/80 hover:bg-[#0d2f21] border border-white/20 text-white font-bold text-sm sm:text-base transition-all flex items-center gap-2 backdrop-blur-md shadow-lg"
            >
              <span>📞 직통 055-294-4446</span>
            </a>
          </div>

        </div>

        {/* ⬇️ 하단 스크롤 안내 인디케이터 */}
        <div className="relative z-10 pt-4 text-center animate-bounce">
          <a href="#quick-dock" className="inline-flex flex-col items-center gap-1 text-slate-300/80 hover:text-amber-300 text-xs font-bold transition-colors">
            <span>아래로 스크롤하여 빠른 예약 & 정보 확인</span>
            <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>

      </div>

      {/* 🚀 2. 하단 와이드 탭 & 스마트 액션 도크 (넓고 시원하게 정돈된 하단 배치) */}
      <div id="quick-dock" className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-4">
        
        {/* 탭 네비게이션 버튼 바 */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6">
          <button
            onClick={() => setActiveTab('reserve')}
            className={`px-5 sm:px-7 py-3 rounded-2xl font-black text-sm sm:text-base transition-all flex items-center gap-2 shadow-md ${
              activeTab === 'reserve'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-[0_0_25px_rgba(245,158,11,0.4)] scale-105'
                : 'bg-[#0a2318]/80 text-slate-300 hover:text-white border border-emerald-500/20 backdrop-blur-md'
            }`}
          >
            <span>⚡ 1초 빠른 예약 & 상담</span>
          </button>

          <button
            onClick={() => setActiveTab('stats')}
            className={`px-5 sm:px-7 py-3 rounded-2xl font-black text-sm sm:text-base transition-all flex items-center gap-2 shadow-md ${
              activeTab === 'stats'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-[0_0_25px_rgba(245,158,11,0.4)] scale-105'
                : 'bg-[#0a2318]/80 text-slate-300 hover:text-white border border-emerald-500/20 backdrop-blur-md'
            }`}
          >
            <span>📊 26년 1위 신뢰 지표</span>
          </button>

          <button
            onClick={() => setActiveTab('trust')}
            className={`px-5 sm:px-7 py-3 rounded-2xl font-black text-sm sm:text-base transition-all flex items-center gap-2 shadow-md ${
              activeTab === 'trust'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-[0_0_25px_rgba(245,158,11,0.4)] scale-105'
                : 'bg-[#0a2318]/80 text-slate-300 hover:text-white border border-emerald-500/20 backdrop-blur-md'
            }`}
          >
            <span>🛡️ 전국 농가 안심 보증</span>
          </button>
        </div>

        {/* 탭 내용 영역 */}
        <div className="bg-[#092217]/90 backdrop-blur-2xl border-2 border-emerald-500/30 rounded-3xl p-6 sm:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.8)]">
          
          {/* TAB 1: 빠른 상담/예약 폼 */}
          {activeTab === 'reserve' && (
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-3">
                <div className="inline-block text-[11px] font-black tracking-widest uppercase text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded">
                  QUICK CONSULTATION
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  필요한 날짜에 맞춘<br />
                  <span className="text-amber-400">봉군 사전 예약 & 당일 배송</span>
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  재배 작물과 하우스 평수만 입력해 주시면, 최적의 봉군 수와 출하 일정을 전문 상담사가 10분 내로 친절히 안내해 드립니다.
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-xs text-emerald-300 font-bold">
                  <span className="px-3 py-1 bg-emerald-950/80 border border-emerald-500/30 rounded-lg">✓ 전국 산지 직송</span>
                  <span className="px-3 py-1 bg-emerald-950/80 border border-emerald-500/30 rounded-lg">✓ 폐사율 제로 특수 포장</span>
                  <span className="px-3 py-1 bg-emerald-950/80 border border-emerald-500/30 rounded-lg">✓ 1:1 맞춤 생육 케어</span>
                </div>
              </div>

              <div className="lg:col-span-7">
                {isSuccess ? (
                  <div className="py-12 text-center space-y-3 bg-[#061810] border border-amber-400/40 rounded-2xl p-6 animate-fade-in-up">
                    <div className="w-16 h-16 bg-amber-400/20 border border-amber-400 text-amber-300 text-3xl rounded-full flex items-center justify-center mx-auto">
                      ✓
                    </div>
                    <h4 className="text-2xl font-black text-white">상담 예약이 성공적으로 접수되었습니다!</h4>
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                      거성 하나벌 전문 상담사가 기재해주신 연락처로<br />
                      <strong className="text-amber-300">신속하고 정확한 맞춤 일정과 견적</strong>을 안내해 드리겠습니다.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleQuickSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#061810] border border-emerald-500/30 rounded-2xl p-5 sm:p-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        농가명 / 성함 <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={quickForm.name}
                        onChange={(e) => setQuickForm({ ...quickForm, name: e.target.value })}
                        placeholder="예: 홍길동 (대산농장)"
                        className="w-full bg-[#07130E] border border-emerald-500/30 focus:border-amber-400 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        연락처 (휴대폰) <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={quickForm.phone}
                        onChange={(e) => setQuickForm({ ...quickForm, phone: e.target.value })}
                        placeholder="예: 010-1234-5678"
                        className="w-full bg-[#07130E] border border-emerald-500/30 focus:border-amber-400 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        재배 작물
                      </label>
                      <select
                        value={quickForm.crop}
                        onChange={(e) => setQuickForm({ ...quickForm, crop: e.target.value })}
                        className="w-full bg-[#07130E] border border-emerald-500/30 focus:border-amber-400 rounded-xl px-3 py-3 text-white text-sm focus:outline-none transition-all"
                      >
                        <option value="완숙토마토">완숙토마토</option>
                        <option value="방울토마토">방울토마토</option>
                        <option value="딸기">딸기</option>
                        <option value="고추/파프리카">고추/파프리카</option>
                        <option value="멜론/수박">멜론/수박</option>
                        <option value="블루베리">블루베리</option>
                        <option value="사과/과수">사과/과수</option>
                        <option value="기타작물">기타 작물</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        하우스 면적 (평수)
                      </label>
                      <input
                        type="number"
                        value={quickForm.area}
                        onChange={(e) => setQuickForm({ ...quickForm, area: e.target.value })}
                        placeholder="예: 600"
                        className="w-full bg-[#07130E] border border-emerald-500/30 focus:border-amber-400 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none transition-all"
                      />
                    </div>

                    <div className="sm:col-span-2 pt-1 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <p className="text-[11px] text-slate-400">
                        🔒 개인정보는 상담 및 견적 안내 목적으로만 안전하게 사용됩니다.
                      </p>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm sm:text-base shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span className="inline-block animate-spin">⏳ 접수 중...</span>
                        ) : (
                          <>
                            <span>무료 상담 & 견적 신청하기</span>
                            <span className="text-lg">→</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: 26년 1위 신뢰 지표 */}
          {activeTab === 'stats' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-emerald-500/20">
              <div className="pt-3 md:pt-0 px-3">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-amber-400">1999~</div>
                <div className="text-sm sm:text-base font-bold text-white mt-2">26년 연구 노하우</div>
                <div className="text-xs text-slate-400 mt-1">국내 최초 뒤영벌 인공증식 성공</div>
              </div>
              <div className="pt-3 md:pt-0 px-3">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-amber-400">60% 이상</div>
                <div className="text-sm sm:text-base font-bold text-white mt-2">국내 시장 점유율 1위</div>
                <div className="text-xs text-slate-400 mt-1">전국 농가 수정벌 공급 독보적 1위</div>
              </div>
              <div className="pt-3 md:pt-0 px-3">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-amber-400">30만 봉군</div>
                <div className="text-sm sm:text-base font-bold text-white mt-2">국내 최대 생산 시설</div>
                <div className="text-xs text-slate-400 mt-1">제1공장·제2공장 & 지리산연구소</div>
              </div>
              <div className="pt-3 md:pt-0 px-3">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-emerald-400">40~45일</div>
                <div className="text-sm sm:text-base font-bold text-white mt-2">강력한 지속 활력</div>
                <div className="text-xs text-slate-400 mt-1">흐린 날·저온기에도 쉼 없는 비행</div>
              </div>
            </div>
          )}

          {/* TAB 3: 전국 농가 안심 보증 */}
          {activeTab === 'trust' && (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-[#061810] border border-emerald-500/30 rounded-2xl p-6 space-y-2">
                <div className="text-3xl">🚚</div>
                <h4 className="text-lg font-black text-white">전국 안전 직배송</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  자체 완충 충격흡수 박스와 온도 제어 포장으로 전국 어느 농장이든 스트레스 없는 생생한 봉군을 배송합니다.
                </p>
              </div>
              <div className="bg-[#061810] border border-emerald-500/30 rounded-2xl p-6 space-y-2">
                <div className="text-3xl">👨‍🌾</div>
                <h4 className="text-lg font-black text-white">26년 현장 수정 컨설팅</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  농약 살포 전후 대피 요령, 환기창 관리, 바이트마크 점검법 등 농가별 1:1 맞춤 기술 지도를 무상 지원합니다.
                </p>
              </div>
              <div className="bg-[#061810] border border-emerald-500/30 rounded-2xl p-6 space-y-2">
                <div className="text-3xl">💯</div>
                <h4 className="text-lg font-black text-white">품질 100% 안심 책임제</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  배송 중 이상이나 초기 활력 저하 발생 시 즉시 무상 교환 및 긴급 추가 봉군 출하를 원칙으로 합니다.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>

    </section>
  );
}
