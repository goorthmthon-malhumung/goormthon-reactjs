# 전허게

> 제주도의 숨겨진 이야기를 전허게에서 만나보세요.

제주 로컬 멘토와 방문자를 연결하는 매칭 플랫폼입니다.  
멘티는 제주 현지인의 경험을 탐색하고 멘토와 직접 매칭 및 예약할 수 있으며, 멘토는 자신의 이야기와 경험을 글로 공유할 수 있습니다.

---

## 주요 기능

| 기능 | 설명 |
|------|------|
| 온보딩 / 회원가입 | 역할(멘티·멘토) 선택 후 프로필 설정 |
| 홈 피드 | 제주 구인 정보 및 로컬 경험 카드 탐색 |
| 멘토 매칭 | 멘토 목록 조회, 매칭 요청 및 상세 확인 |
| 예약 | 멘토와의 만남 일정 예약 |
| 멘토 스토리 | 멘토가 직접 경험담 작성·미리보기·게시 |
| 마이페이지 | 멘티·멘토 역할별 내 활동 관리 |

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | React 19, TypeScript 5 |
| 빌드 도구 | Vite 5 |
| 라우팅 | React Router v7 |
| 서버 상태 | TanStack Query v5 |
| UI 컴포넌트 | Vapor UI (`@vapor-ui/core`, `@vapor-ui/icons`) |
| API 코드 생성 | Orval (OpenAPI → React Query 훅 자동 생성) |
| PWA | vite-plugin-pwa (오프라인 지원, 앱 설치) |
| 코드 품질 | ESLint, Prettier, TypeScript strict |
| 배포 | Vercel, GitHub Actions |

---

## 시작하기

### 요구 사항

- Node.js 20 이상
- npm 10 이상

### 설치

```bash
git clone https://github.com/<org>/goormthon-reactjs.git
cd goormthon-reactjs/front
npm ci
```

### 환경 변수 설정

```bash
cp .env.example .env.local
```

`.env.local` 파일을 열어 값을 채웁니다.

```dotenv
# 브라우저에서 사용하는 API 베이스 URL (슬래시 없이)
VITE_API_BASE_URL=https://junhugae.goorm.training/api

# Orval 코드 생성 시 사용하는 OpenAPI 스펙 URL
VITE_OPENAPI_SPEC_URL=https://junhugae.goorm.training/api/v3/api-docs
```

> `.env.local`은 `.gitignore`에 포함되어 있습니다. 실제 값을 커밋하지 마세요.

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 으로 접속합니다.  
`/api` 경로는 `VITE_API_BASE_URL`로 자동 프록시됩니다.

---

## 스크립트

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 실행 (Hot Reload) |
| `npm run build` | 프로덕션 빌드 (`dist/`) |
| `npm run preview` | 빌드 결과물 로컬 미리보기 |
| `npm run typecheck` | TypeScript 타입 검사 |
| `npm run lint` | ESLint 검사 (경고 0개 기준) |
| `npm run format` | Prettier 포맷 적용 |
| `npm run check` | typecheck + lint + build 통합 검증 |
| `npm run generate` | OpenAPI 스펙으로 API 훅 코드 재생성 |

---

## 배포 및 CI/CD

GitHub Actions + Vercel을 통해 자동 배포됩니다.

```
PR 오픈  →  [GitHub Actions]  npm run check  →  Vercel 프리뷰 배포
main 병합 →  [GitHub Actions]  npm run check  →  Vercel 프로덕션 배포
```

- **프리뷰 배포**: PR마다 고유한 Vercel URL 생성, Actions 요약에 링크 표시
- **프로덕션 배포**: `main` 브랜치 push 시 자동 실행
- `npm run check`(타입·린트·빌드) 실패 시 배포 차단

### 필요한 GitHub Secrets

| 시크릿 | 설명 |
|--------|------|
| `VERCEL_TOKEN` | Vercel 개인 액세스 토큰 |
| `VERCEL_ORG_ID` | Vercel 조직(팀) ID |
| `VERCEL_PROJECT_ID` | Vercel 프로젝트 ID |

---

## 프로젝트 구조

```
front/
├── src/
│   ├── api/          # Orval 생성 코드 및 커스텀 fetcher
│   ├── app/          # 앱 진입점, 라우터, 글로벌 프로바이더
│   ├── features/     # 도메인별 기능 모듈 (auth, experiences, jobs)
│   ├── pages/        # 라우트 단위 페이지 컴포넌트
│   └── shared/       # 공통 설정, 유틸리티, UI 컴포넌트
├── public/           # 정적 에셋
├── .env.example      # 환경 변수 템플릿
├── orval.config.ts   # API 코드 생성 설정
└── vite.config.ts    # Vite 및 PWA 설정
```
