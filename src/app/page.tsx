import LinkList from "@/components/LinkList";
import ProfileHeader from "@/components/ProfileHeader";
import ThemeToggle from "@/components/ThemeToggle";
import { links, profile } from "@/lib/profile";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col gap-8 px-4 pb-12 pt-4 sm:pt-8">
      <div className="flex justify-end">
        <ThemeToggle />
      </div>
      <ProfileHeader {...profile} />
      <LinkList links={links} />
    </main>
  );
}
