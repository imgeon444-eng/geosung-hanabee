import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { db } from '../../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, phone, crop, area, boxes, targetDate, region, notes } = data;

    // 1. Firestore DB에 서버 사이드 저장 시도
    try {
      if (db) {
        await addDoc(collection(db, 'hanabee_leads'), {
          name: name || '무명',
          phone: phone || '미입력',
          crop: crop || '완숙토마토',
          area: area || '미입력',
          boxes: boxes || '상담 후 결정',
          targetDate: targetDate || '협의 필요',
          region: region || '미입력',
          notes: notes || '',
          status: '신규 접수',
          createdAt: new Date().toISOString(),
          timestamp: serverTimestamp(),
        });
      }
    } catch (dbErr) {
      console.warn('Server Firestore sync error (continuing):', dbErr);
    }

    // 2. 이메일 알림 발송 시도 (환경변수 세팅된 경우)
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PW) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: { 
            user: process.env.GMAIL_USER, 
            pass: process.env.GMAIL_APP_PW 
          }
        });

        const mailOptions = {
          from: `"거성 하나벌 시스템" <${process.env.GMAIL_USER}>`,
          to: process.env.ADMIN_NOTIFY_EMAIL || 'daesanbul@gmail.com',
          subject: `🐝 [하나벌 상담/예약 접수] ${name} 농가 (${crop}, ${boxes || '봉군 문의'})`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #10b981; border-radius: 12px; overflow: hidden; background-color: #071911; color: #f1f5f9;">
              <div style="background-color: #0d4a36; padding: 20px; text-align: center; border-bottom: 2px solid #f59e0b;">
                <h2 style="margin: 0; color: #fbbf24;">🐝 거성 하나벌 신규 상담/예약 접수</h2>
              </div>
              <div style="padding: 25px; line-height: 1.6;">
                <p><strong>농가명 / 성함:</strong> ${name}</p>
                <p><strong>연락처:</strong> <a href="tel:${phone}" style="color: #fbbf24; font-weight: bold; font-size: 16px;">${phone}</a></p>
                <p><strong>재배 작물:</strong> <span style="color: #34d399; font-weight: bold;">${crop}</span></p>
                <p><strong>농장 면적:</strong> ${area || '미입력'}</p>
                <p><strong>희망 봉군 수량:</strong> ${boxes || '상담 후 결정'}</p>
                <p><strong>희망 투입일:</strong> ${targetDate || '협의 필요'}</p>
                <p><strong>농장 소재지:</strong> ${region || '미입력'}</p>
                <div style="margin-top: 20px; padding: 15px; background-color: #04100b; border-radius: 8px; border: 1px solid #064e3b;">
                  <p style="margin: 0; font-size: 12px; color: #94a3b8; margin-bottom: 5px;">농가 문의 및 특이사항:</p>
                  <p style="margin: 0; font-size: 14px; color: #e2e8f0;">${notes || '특이사항 없음'}</p>
                </div>
              </div>
            </div>
          `
        };

        await transporter.sendMail(mailOptions);
      } catch (mailErr) {
        console.warn('Mail send failed (continuing):', mailErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: '하나벌 상담 예약이 정상 접수되었습니다.',
    });
  } catch (error) {
    console.error('Consultation API error:', error);
    return NextResponse.json({ success: false, error: '서버 에러' }, { status: 500 });
  }
}
