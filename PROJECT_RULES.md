# [거성 하나벌 & 전체 프로젝트 절대 보안 지침]

## 🚨 최우선 절대 금지 규칙 (CRITICAL ZERO-TOLERANCE RULE)
### 1. GitHub 인증 정보 및 자격 증명(Credential/Token) 보존 절대 원칙
- **절대 금지 명령어**:
  - `cmdkey /delete:*` (Windows 자격 증명 삭제 명령어 일체 실행 금지)
  - `git config --global --unset credential.helper`
  - GitHub 계정/인증/토큰을 리셋하거나 초기화하는 모든 종류의 터미널 명령어 실행 금지.
- **기본 회사 GitHub 계정**:
  - 계정명: `imgeon444-eng`
  - 이메일: `imgeon444-eng@users.noreply.github.com` (또는 `imgeon444@gmail.com`)
  - 모든 프로젝트의 GitHub 원격 주소는 반드시 `https://github.com/imgeon444-eng/[프로젝트명].git` 형태로 연결되어야 함.
- **배포 및 푸시 오류 발생 시 프로토콜**:
  - 오류가 발생하더라도 기존 컴퓨터의 인증/자격증명은 100% 보존해야 함.
  - 저장소 이름(URL) 오타 확인, 커밋 상태 확인 등 소프트웨어 레벨의 점검만 수행할 것.

---

## 2. 프로젝트 아키텍처 및 작업 원칙
- 프로젝트명: 거성 하나벌 (geosung-hanabee)
- 프레임워크: Next.js 15 (App Router), React 19, Tailwind CSS
- 백엔드/DB: Firebase Firestore
- 관리자 패스워드: `hanabee2026` 또는 `1234`
