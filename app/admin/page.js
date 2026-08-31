'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import HanabeeKanbanBoard from '../../components/admin/HanabeeKanbanBoard';
import HanabeeLeadTable from '../../components/admin/HanabeeLeadTable';
import HanabeeStatsWidget from '../../components/admin/HanabeeStatsWidget';
import HanabeeAddLeadModal from '../../components/admin/HanabeeAddLeadModal';
import { db } from '../../lib/firebase';
import { collection, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const INITIAL_SAMPLE_LEADS = [
  {
    id: 'lead_1',
    name: '김대산 (대산 토마토농장)',
    phone: '010-3841-9284',
    region: '경남 창원시 대산면',
    crop: '완숙토마토',
    area: '1,200평 (6동)',
    boxes: '3통',
    targetDate: '2026-09-05',
    status: '신규 접수',
    notes: '기존 호르몬 처리에서 하나벌로 전면 전환 희망. 9월 초 1화방 개화 시기 투입 요청.',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'lead_2',
    name: '박성호 (부여 햇살딸기)',
    phone: '010-5829-1940',
    region: '충남 부여군 규암면',
    crop: '딸기',
    area: '800평 (4동)',
    boxes: '2통',
    targetDate: '2026-09-10',
    status: '상담 진행중',
    notes: '동절기 저온기 대비 11월 추가 정기구독 문의. 견적서 발송 완료.',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: 'lead_3',
    name: '이정민 (영암 멜론작목반)',
    phone: '010-4710-8302',
    region: '전남 영암군',
    crop: '멜론/수박',
    area: '1,500평 (8동)',
    boxes: '4통',
    targetDate: '2026-09-03',
    status: '출하/배송 예정',
    notes: '우체국 특송 택배로 9월 2일 오전 출하 예정 (신선 피더 확인 완료).',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: 'lead_4',
    name: '최영환 (청송 사과농원)',
    phone: '010-9123-4455',
    region: '경북 청송군',
    crop: '사과/과수',
    area: '2,000평',
    boxes: '6통',
    targetDate: '2026-09-01',
    status: '완료',
    notes: '8월 30일 투입 완료. 현재 활발하게 수분 비행 중 확인.',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
];

export default function AdminDashboard() {
  const [leads, setLeads] = useState([]);
  const [activeTab, setActiveTab] = useState('kanban'); // 'kanban' | 'table' | 'stats'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    // 1. LocalStorage에서 기존 데이터 로드
    const localData = localStorage.getItem('hanabee_leads');
    if (localData) {
      try {
        const parsed = JSON.parse(localData);
        setLeads(parsed.length > 0 ? parsed : INITIAL_SAMPLE_LEADS);
      } catch (e) {
        setLeads(INITIAL_SAMPLE_LEADS);
      }
    } else {
      setLeads(INITIAL_SAMPLE_LEADS);
      localStorage.setItem('hanabee_leads', JSON.stringify(INITIAL_SAMPLE_LEADS));
    }

    // 2. Firebase 실시간 리스너 연동 (사용 가능한 경우)
    if (db) {
      try {
        const q = query(collection(db, 'hanabee_leads'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          if (!snapshot.empty) {
            const firestoreLeads = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setLeads(firestoreLeads);
            localStorage.setItem('hanabee_leads', JSON.stringify(firestoreLeads));
          }
        }, (error) => {
          console.warn('Firestore snapshot listener error (using local data)', error);
        });

        return () => unsubscribe();
      } catch (e) {
        console.warn('Firestore query error', e);
      }
    }
  }, []);

  const handleUpdateStatus = async (leadId, newStatus) => {
    const updated = leads.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l));
    setLeads(updated);
    localStorage.setItem('hanabee_leads', JSON.stringify(updated));

    // Firestore 업데이트 시도
    if (db) {
      try {
        await updateDoc(doc(db, 'hanabee_leads', leadId), { status: newStatus });
      } catch (e) {
        console.log('Local status updated');
      }
    }
  };

  const handleUpdateMemo = async (leadId, newMemo) => {
    const updated = leads.map((l) => (l.id === leadId ? { ...l, notes: newMemo, memo: newMemo } : l));
    setLeads(updated);
    localStorage.setItem('hanabee_leads', JSON.stringify(updated));

    if (db) {
      try {
        await updateDoc(doc(db, 'hanabee_leads', leadId), { notes: newMemo, memo: newMemo });
      } catch (e) {
        console.log('Local memo updated');
      }
    }
  };

  const handleDeleteLead = async (leadId) => {
    const updated = leads.filter((l) => l.id !== leadId);
    setLeads(updated);
    localStorage.setItem('hanabee_leads', JSON.stringify(updated));

    if (db) {
      try {
        await deleteDoc(doc(db, 'hanabee_leads', leadId));
      } catch (e) {
        console.log('Local lead deleted');
      }
    }
  };

  const handleAddLead = (newLead) => {
    const updated = [newLead, ...leads];
    setLeads(updated);
    localStorage.setItem('hanabee_leads', JSON.stringify(updated));
  };

  const handleLogout = () => {
    sessionStorage.removeItem('hanabee_admin_auth');
    router.push('/admin/login');
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-[#07130E] text-slate-100 p-4 sm:p-6 lg:p-8 font-sans selection:bg-[#F59E0B] selection:text-black relative overflow-x-hidden">
      
      {/* 🔮 상단 앰비언트 글로우 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[400px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-[1500px] mx-auto relative z-10 space-y-6">
        
        {/* 상단 통합 헤더 */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#071911] border border-emerald-500/30 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400 text-amber-300 text-2xl flex items-center justify-center shadow-md">
              🐝
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded uppercase tracking-wider">
                  ENTERPRISE CRM
                </span>
                <span className="text-xs text-emerald-400 font-bold">● 시스템 정상 가동</span>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight mt-0.5">
                거성 하나벌 농가 상담 & 주문 통합 관제
              </h1>
              <p className="text-xs text-slate-400">
                농업회사법인 (합)거성 · 실시간 접수 파이프라인 및 엑셀 출하 관리
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 active:scale-95"
            >
              <span>➕</span> <span>전화 주문 수기 등록</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="px-4 py-2.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/30 text-emerald-200 font-bold text-xs sm:text-sm transition-colors flex items-center gap-1"
            >
              <span>🌐</span> <span>홈페이지 보기</span>
            </Link>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 font-bold text-xs sm:text-sm transition-colors"
            >
              로그아웃
            </button>
          </div>
        </header>

        {/* 탭 네비게이션 */}
        <div className="flex items-center gap-2 bg-[#05140d] p-1.5 rounded-2xl border border-emerald-500/20 w-fit">
          <button
            onClick={() => setActiveTab('kanban')}
            className={`px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 ${
              activeTab === 'kanban'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-emerald-500/10'
            }`}
          >
            <span>📋 파이프라인 (칸반)</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-black/20 font-mono">
              {leads.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('table')}
            className={`px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 ${
              activeTab === 'table'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-emerald-500/10'
            }`}
          >
            <span>📊 전체 명단 & 엑셀 다운로드</span>
          </button>

          <button
            onClick={() => setActiveTab('stats')}
            className={`px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 ${
              activeTab === 'stats'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-emerald-500/10'
            }`}
          >
            <span>📈 작물별 통계 리포트</span>
          </button>
        </div>

        {/* 메인 탭 콘텐츠 */}
        <main className="animate-fade-in-up">
          {activeTab === 'kanban' && (
            <HanabeeKanbanBoard
              leads={leads}
              onUpdateStatus={handleUpdateStatus}
              onUpdateMemo={handleUpdateMemo}
              onDeleteLead={handleDeleteLead}
            />
          )}

          {activeTab === 'table' && (
            <HanabeeLeadTable
              leads={leads}
              onUpdateStatus={handleUpdateStatus}
              onDeleteLead={handleDeleteLead}
            />
          )}

          {activeTab === 'stats' && (
            <HanabeeStatsWidget leads={leads} />
          )}
        </main>

        {/* 수기 추가 모달 */}
        <HanabeeAddLeadModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddLead={handleAddLead}
        />

      </div>
    </div>
  );
}