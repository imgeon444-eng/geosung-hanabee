'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar({ onOpenConsultation }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#071911]/90 backdrop-blur-xl border-b border-emerald-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.7)] py-2.5'
          : 'bg-gradient-to-b from-[#07130E]/90 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* 브랜드 로고 */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-emerald-600 p-0.5 shadow-[0_0_20px_rgba(245,158,11,0.4)] group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
            <div className="w-full h-full bg-[#071911] rounded-[14px] flex items-center justify-center">
              <span className="text-xl">🐝</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-black tracking-tight text-white text-xl sm:text-2xl leading-none">
                하나벌
              </span>
              <span className="text-[10px] bg-amber-400/20 border border-amber-400/40 text-amber-300 font-extrabold px-1.5 py-0.5 rounded-md">
                국내 1위
              </span>
            </div>
            <span className="text-[10px] text-emerald-300/80 font-bold tracking-wider mt-0.5">
              농업회사법인 (합)거성 · 26년 역사
            </span>
          </div>
        </Link>

        {/* 데스크톱 메뉴 */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#0a2318]/70 border border-emerald-500/20 px-4 py-1.5 rounded-full backdrop-blur-md">
          <a
            href="#features"
            className="text-xs xl:text-sm font-bold text-slate-200 hover:text-amber-400 px-3 py-2 rounded-full hover:bg-emerald-500/10 transition-colors"
          >
            ✨ 7대 특장점
          </a>
          <a
            href="#calculator"
            className="text-xs xl:text-sm font-bold text-amber-300 hover:text-amber-200 px-3 py-2 rounded-full hover:bg-amber-400/10 transition-colors"
          >
            🧮 맞춤 봉군 계산기
          </a>
          <a
            href="#products"
            className="text-xs xl:text-sm font-bold text-slate-200 hover:text-amber-400 px-3 py-2 rounded-full hover:bg-emerald-500/10 transition-colors"
          >
            📦 제품&정기구독
          </a>
          <a
            href="#guide"
            className="text-xs xl:text-sm font-bold text-slate-200 hover:text-amber-400 px-3 py-2 rounded-full hover:bg-emerald-500/10 transition-colors"
          >
            📖 3단계 관리법
          </a>
          <a
            href="#about"
            className="text-xs xl:text-sm font-bold text-slate-200 hover:text-amber-400 px-3 py-2 rounded-full hover:bg-emerald-500/10 transition-colors"
          >
            🏛️ 회사 연혁·연구소
          </a>
          <a
            href="#faq"
            className="text-xs xl:text-sm font-bold text-slate-200 hover:text-amber-400 px-3 py-2 rounded-full hover:bg-emerald-500/10 transition-colors"
          >
            ❓ FAQ
          </a>
        </nav>

        {/* 우측 전화 / 카톡 / 상담 CTA / 어드민 */}
        <div className="hidden sm:flex items-center gap-2 lg:gap-3">
          <a
            href="tel:0552944446"
            className="flex items-center gap-1.5 text-xs lg:text-sm font-extrabold text-amber-300 hover:text-amber-200 bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 px-3.5 py-2 rounded-xl transition-all"
            title="고객센터 직통 전화"
          >
            <span className="text-sm">📞</span>
            <span>055-294-4446</span>
          </a>

          <a
            href="https://pf.kakao.com/_xkxaxcfX/chat"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1 text-xs font-black bg-[#FEE500] text-[#191600] px-3 py-2 rounded-xl hover:brightness-95 transition-all"
          >
            <span>💬 카톡상담</span>
          </a>

          <button
            onClick={onOpenConsultation}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs lg:text-sm font-black px-4 lg:px-5 py-2 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all hover:scale-105 active:scale-95"
          >
            상담·예약 신청
          </button>

          <Link
            href="/admin"
            className="bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 hover:text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors"
            title="관리자 CRM"
          >
            🔒 관리자
          </Link>
        </div>

        {/* 모바일 햄버거 & 빠른 액션 */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={onOpenConsultation}
            className="bg-amber-500 text-slate-950 text-xs font-black px-3 py-2 rounded-xl shadow-md"
          >
            상담예약
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white focus:outline-none bg-emerald-950/60 border border-emerald-500/30 rounded-xl"
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#071911]/95 border-b border-emerald-500/30 backdrop-blur-2xl px-5 py-5 space-y-3 animate-fade-in-up">
          <div className="flex flex-col space-y-2">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-4 rounded-xl bg-emerald-950/40 text-slate-200 font-bold text-sm border border-emerald-500/20"
            >
              ✨ 하나벌 7대 특장점
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-4 rounded-xl bg-amber-500/10 text-amber-300 font-bold text-sm border border-amber-500/30"
            >
              🧮 맞춤 봉군 계산기 (견적 산출)
            </a>
            <a
              href="#products"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-4 rounded-xl bg-emerald-950/40 text-slate-200 font-bold text-sm border border-emerald-500/20"
            >
              📦 제품 라인업 & 정기구독
            </a>
            <a
              href="#guide"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-4 rounded-xl bg-emerald-950/40 text-slate-200 font-bold text-sm border border-emerald-500/20"
            >
              📖 도착 즉시 3단계 관리법
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-4 rounded-xl bg-emerald-950/40 text-slate-200 font-bold text-sm border border-emerald-500/20"
            >
              🏛️ 26년 역사 & 지리산 연구소
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-4 rounded-xl bg-emerald-950/40 text-slate-200 font-bold text-sm border border-emerald-500/20"
            >
              ❓ 자주 묻는 질문 (FAQ)
            </a>
          </div>

          <div className="pt-3 border-t border-emerald-500/20 flex flex-col gap-2">
            <div className="flex gap-2">
              <a
                href="tel:0552944446"
                className="flex-1 text-center py-2.5 rounded-xl bg-amber-500 text-slate-950 font-black text-sm"
              >
                📞 전화 055-294-4446
              </a>
              <a
                href="https://pf.kakao.com/_xkxaxcfX/chat"
                target="_blank"
                rel="noopener noreferrer"
                className="text-center py-2.5 px-4 rounded-xl bg-[#FEE500] text-[#191600] font-black text-sm"
              >
                카톡
              </a>
            </div>
            <div className="flex justify-between items-center px-1 pt-1">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs text-emerald-400 font-bold hover:underline"
              >
                🔒 관리자 CRM 시스템
              </Link>
              <span className="text-[11px] text-slate-400">평일 08:30 ~ 17:30</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

