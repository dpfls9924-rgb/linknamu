"use client";

import { useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
import type { LinkItem } from "@/lib/profile";

export default function LinkList({ links }: { links: LinkItem[] }) {
  // null이면 집계를 불러오지 못한 상태이며, 이때는 횟수를 표시하지 않습니다.
  const [counts, setCounts] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/clicks", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (data) setCounts(data.counts);
      })
      .catch(() => {
        // 집계를 못 불러와도 링크는 그대로 쓸 수 있어야 합니다.
      });

    return () => controller.abort();
  }, []);

  function handleVisit(id: string) {
    // sendBeacon은 페이지를 벗어나는 중에도 요청이 끊기지 않습니다.
    const body = new Blob([JSON.stringify({ id })], {
      type: "application/json",
    });
    navigator.sendBeacon("/api/clicks", body);

    setCounts((prev) =>
      prev ? { ...prev, [id]: (prev[id] ?? 0) + 1 } : prev,
    );
  }

  return (
    <nav aria-label="링크 목록">
      <ul className="flex flex-col gap-5">
        {links.map((link) => (
          <li key={link.id}>
            <LinkCard
              link={link}
              count={counts ? (counts[link.id] ?? 0) : undefined}
              onVisit={handleVisit}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
