# 링크나무

내 모든 링크를 한 페이지에 모아두고, 하나의 URL로 공유하는 서비스입니다.

## 시작하기

```bash
npm install
cp .env.example .env.local   # MONGODB_URI 값을 채웁니다
npm run dev
```

브라우저에서 <http://localhost:3000> 을 엽니다.

`MONGODB_URI`가 없어도 페이지와 링크는 정상 동작하며, 클릭 수만 기록되지 않습니다.

## 내 정보로 바꾸기

- 이름, 소개, 링크: `src/lib/profile.ts`
- 프로필 사진: `public/` 폴더에 이미지를 넣고 `avatarUrl`을 수정

링크의 `id`는 클릭 수를 저장하는 키이므로, 바꾸면 기존 집계와 이어지지 않습니다.

## 배포

Vercel에 배포할 때 프로젝트 환경 변수에 `MONGODB_URI`, `MONGODB_DB`를 등록합니다.
