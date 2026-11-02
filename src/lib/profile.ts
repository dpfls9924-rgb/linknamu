export type LinkItem = {
  /** 클릭 수를 저장할 때 키로 쓰이므로, 한 번 정하면 바꾸지 마세요. */
  id: string;
  title: string;
  description?: string;
  url: string;
};

// 아래 값은 예시입니다. 본인의 정보로 바꿔서 사용하세요.
export const profile = {
  name: "홍길동",
  bio: "내 모든 링크를 한 곳에 모았습니다",
  avatarUrl: "/avatar.svg",
};

export const links: LinkItem[] = [
  {
    id: "instagram",
    title: "Instagram",
    description: "일상과 작업물",
    url: "https://www.instagram.com",
  },
  {
    id: "github",
    title: "GitHub",
    description: "개발 프로젝트",
    url: "https://github.com",
  },
  {
    id: "blog",
    title: "블로그",
    description: "글과 기록",
    url: "https://velog.io",
  },
  {
    id: "youtube",
    title: "YouTube",
    description: "영상 콘텐츠",
    url: "https://www.youtube.com",
  },
];
