# [거성 하나벌 & 전체 프로젝트 절대 보안 지침]

## 🚨 최우선 절대 규칙 (CRITICAL ZERO-TOLERANCE RULES)
### 1. GitHub 인증 정보 및 자격 증명(Credential/Token) 보존 절대 원칙
- **절대 금지 명령어**: `cmdkey /delete:*`, `git config --global --unset credential.helper` 등.
- **기본 회사 GitHub 계정**: `imgeon444-eng`

### 2. Firebase 프로젝트 연결 사전 확인 의무 원칙
- 새 프로젝트 및 데이터베이스 연동 시, 기존 Firebase 키를 임의로 자동 등록하는 것을 엄격히 금지함.
- 반드시 사전 확인 질문 수행:
  1. **"새로운 독립 Firebase 프로젝트를 생성하여 연결할까요?"**
  2. **"기존 Firebase 프로젝트 중 특정 프로젝트에 새 컬렉션으로 추가할까요?"**
- 대표님의 선택과 지시에 따라 안전하게 연결 진행.
