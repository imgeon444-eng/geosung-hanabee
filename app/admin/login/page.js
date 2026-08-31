'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // 간편 관리자 인증 (기본 핀코드: hanabee2026 또는 1234 또는 admin)
    const validCodes = ['hanabee2026', '1234', 'admin', 'geosung2026'];
    
    setTimeout(() => {
      if (validCodes.includes(passcode.trim())) {
        sessionStorage.setItem('hanabee_admin_auth', 'true');
        router.push('/admin');
      } else {
        setError('관리자 비밀번호가 일치하지 않습니다. 다시 확인해 주세요.');
      }
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#07130E] flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* 🔮 배경 글로우 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-md w-full bg-[#071911] border-2 border-emerald-500/30 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative z-10">
        
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-amber-400/20 border border-amber-400 text-amber-300 text-2xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
            🐝
          </div>
          <span className="inline-block px-3 py-1 bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[10px] font-black uppercase tracking-widest rounded-full mb-2">
            CRM MANAGEMENT SYSTEM
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            거성 하나벌 관리자
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            농가 상담 및 봉군 주문 관리 대시보드
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">
              관리자 접속 핀코드 / 비밀번호
            </label>
            <input 
              type="password" 
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="비밀번호 입력 (기본: hanabee2026)"
              className="w-full bg-[#05140d] border border-emerald-500/30 focus:border-amber-400 rounded-2xl px-5 py-4 text-white text-base placeholder-slate-500 focus:outline-none transition-all"
              required
            />
            <span className="text-[11px] text-slate-500 block mt-1.5 pl-1">
              * 기본 비밀번호: <code className="text-amber-400 font-mono">hanabee2026</code> 또는 <code className="text-amber-400 font-mono">1234</code>
            </span>
          </div>

          {error && (
            <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-3 text-center animate-fade-in-up">
              <p className="text-rose-400 text-xs font-bold">{error}</p>
            </div>
          )}

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full h-14 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-2xl font-black text-base transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.4)] active:scale-95 disabled:opacity-50"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <span>관리자 로그인 →</span>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-emerald-500/10 text-center flex justify-between items-center text-xs">
          <Link href="/" className="text-slate-400 hover:text-white transition-colors">
            ← 메인 홈페이지로 이동
          </Link>
          <a href="tel:0552944446" className="text-amber-400 font-bold">
            문의 055-294-4446
          </a>
        </div>
      </div>
    </div>
  );
}