'use client';

import { useState } from 'react';
import Navbar from '../components/home/Navbar';
import HeroVideoSection from '../components/home/HeroVideoSection';
import FeatureComparison from '../components/home/FeatureComparison';
import CropColonyCalculator from '../components/home/CropColonyCalculator';
import ProductLineup from '../components/home/ProductLineup';
import CareGuideSection from '../components/home/CareGuideSection';
import CompanyHistory from '../components/home/CompanyHistory';
import FaqSupport from '../components/home/FaqSupport';
import ConsultationModal from '../components/home/ConsultationModal';
import Footer from '../components/home/Footer';

export default function HanabeeLandingPage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [prefillData, setPrefillData] = useState(null);

  const openConsultation = () => {
    setPrefillData(null);
    setIsConsultationOpen(true);
  };

  const handlePrefillAndOpen = (data) => {
    setPrefillData(data);
    setIsConsultationOpen(true);
  };

  const closeConsultation = () => {
    setIsConsultationOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#07130E] text-slate-100 font-sans selection:bg-[#F59E0B] selection:text-black relative overflow-x-hidden">
      
      {/* 🧭 1. 상단 GNB 네비게이션 */}
      <Navbar onOpenConsultation={openConsultation} />

      {/* 🎬 2. 시네마틱 비디오 타이틀 히어로 & 빠른 견적 신청 */}
      <HeroVideoSection
        onOpenConsultation={openConsultation}
        onPrefillAndOpen={handlePrefillAndOpen}
      />

      {/* ✨ 3. 하나벌 7대 특장점 & 호르몬/양봉 1:1 비교 분석 */}
      <FeatureComparison onOpenConsultation={openConsultation} />

      {/* 🧮 4. 우리 농장 최적 봉군 규격 & 견적 계산기 */}
      <CropColonyCalculator onPrefillAndOpen={handlePrefillAndOpen} />

      {/* 📦 5. 제품 라인업 & 작기 맞춤 정기구독 */}
      <ProductLineup
        onOpenConsultation={openConsultation}
        onPrefillAndOpen={handlePrefillAndOpen}
      />

      {/* 📖 6. 도착 즉시 3단계 관리 & 최적 온습도/농약 대피 가이드 */}
      <CareGuideSection onOpenConsultation={openConsultation} />

      {/* 🏛️ 7. 26년의 역사, 권두재 대표 인사말 & 지리산 연구소 */}
      <CompanyHistory onOpenConsultation={openConsultation} />

      {/* ❓ 8. 자주 묻는 질문(FAQ) & 고객센터 지원 */}
      <FaqSupport onOpenConsultation={openConsultation} />

      {/* 📝 9. 1:1 맞춤 상담 및 봉군 예약 모달 */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={closeConsultation}
        prefillData={prefillData}
      />

      {/* 🏢 10. 엔터프라이즈 푸터 */}
      <Footer onOpenConsultation={openConsultation} />

    </div>
  );
}