'use client';

import Link from 'next/link';

export default function Footer({ onOpenConsultation }) {
  return (
    <footer className="bg-[#040e09] text-slate-400 border-t border-emerald-500/20 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          
          {/* 브랜드 & 법인 기본 정보 (5열) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-emerald-600 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-[#040e09] rounded-[10px] flex items-center justify-center text-lg">
                  🐝
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-white text-xl tracking-tight leading-none">
                  하나벌 <span className="text-xs text-amber-400 font-bold ml-1">HANABEE</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-bold mt-0.5">
                  농업회사법인 합자회사 거성
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md">
              1999년 연구를 시작으로 국내 최초 뒤영벌 대량사육에 성공한 대한민국 1위 화분매개 전문기업입니다. 
              최첨단 30만 봉군 스마트 생산 인프라와 지리산 연구소를 바탕으로 농가의 품질 향상과 풍년 수확을 책임집니다.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/no.1_hanabee"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#0a2318] border border-emerald-500/30 hover:border-amber-400 text-slate-300 hover:text-white flex items-center justify-center text-sm transition-all"
                title="인스타그램"
              >
                📸
              </a>
              <a
                href="https://www.youtube.com/@하나벌"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#0a2318] border border-emerald-500/30 hover:border-rose-400 text-slate-300 hover:text-white flex items-center justify-center text-sm transition-all"
                title="유튜브"
              >
                ▶️
              </a>
              <a
                href="https://pf.kakao.com/_xkxaxcfX/chat"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#FEE500] text-[#191600] flex items-center justify-center text-sm font-black transition-all hover:brightness-95"
                title="카카오톡"
              >
                💬
              </a>
            </div>
          </div>

          {/* 주요 메뉴 (3열) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-white text-xs font-black uppercase tracking-wider text-amber-400">
              Quick Menu
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <a href="#features" className="hover:text-amber-300 transition-colors">
                  ✨ 하나벌 7대 특장점 & 비교
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-amber-300 transition-colors">
                  🧮 맞춤 봉군 계산기
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-amber-300 transition-colors">
                  📦 제품 라인업 & 정기구독
                </a>
              </li>
              <li>
                <a href="#guide" className="hover:text-amber-300 transition-colors">
                  📖 3단계 설치·관리 가이드
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-amber-300 transition-colors">
                  🏛️ 26년 역사 & 지리산 연구소
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-amber-300 transition-colors">
                  ❓ 자주 묻는 질문 (FAQ)
                </a>
              </li>
            </ul>
          </div>

          {/* 고객센터 및 사업자 정보 (4열) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-white text-xs font-black uppercase tracking-wider text-amber-400">
              Customer Center
            </h4>
            <div className="space-y-1 text-xs">
              <p className="text-slate-400">전화 상담 직통</p>
              <a href="tel:0552944446" className="text-xl sm:text-2xl font-black text-amber-300 hover:underline block">
                055-294-4446
              </a>
              <p className="text-[11px] text-slate-400">
                운영 시간: 평일 08:30 ~ 17:30 (점심 12:30 ~ 13:30)
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenConsultation}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all shadow-md"
              >
                온라인 1:1 상담 예약 신청
              </button>
            </div>

            <div className="pt-1 flex items-center justify-between text-xs">
              <Link href="/admin" className="text-emerald-400 hover:underline font-bold text-[11px]">
                🔒 관리자 CRM 시스템
              </Link>
              <span className="text-[10px] text-slate-500">v2.6 Enterprise</span>
            </div>
          </div>

        </div>

        {/* 법인 상세 고지 사항 */}
        <div className="pt-8 border-t border-emerald-500/10 space-y-1.5 text-xs text-slate-400 leading-relaxed font-normal">
          <p>
            <strong>농업회사법인 합자회사 거성</strong> · 대표자: 권두재 · 사업자등록번호: 609-81-95545 · 통신판매업신고: 2026-창원의창-6063
          </p>
          <p>
            사업장 주소: 경상남도 창원시 의창구 대산면 북부로10번길 14-21 · 대표전화: 055-294-4446 · 이메일: daesanbul@gmail.com
          </p>
          <p className="pt-3 text-[11px] text-slate-500">
            © 2026 농업회사법인 합자회사 거성 (하나벌). All rights reserved. 온라인 주문 및 유선 상담을 통해 신선 배송됩니다.
          </p>
        </div>
      </div>
    </footer>
  );
}

