import type { LinkItem } from "@/lib/profile";

type LinkCardProps = {
  link: LinkItem;
  count?: number;
  onVisit: (id: string) => void;
};

export default function LinkCard({ link, count, onVisit }: LinkCardProps) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => onVisit(link.id)}
      onAuxClick={(event) => {
        // 마우스 휠 클릭으로 새 탭에서 연 경우도 집계합니다.
        if (event.button === 1) onVisit(link.id);
      }}
      className="flex min-h-16 items-center justify-between gap-4 rounded-2xl border border-border bg-card px-5 py-3 transition hover:-translate-y-0.5 hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <span className="min-w-0">
        <span className="block truncate font-semibold">{link.title}</span>
        {link.description && (
          <span className="block truncate text-sm text-muted">
            {link.description}
          </span>
        )}
      </span>
      {count !== undefined && (
        <span className="shrink-0 text-xs tabular-nums text-muted">
          {count.toLocaleString("ko-KR")}회
        </span>
      )}
    </a>
  );
}
