import Image from "next/image";

type ProfileHeaderProps = {
  name: string;
  bio: string;
  avatarUrl: string;
};

export default function ProfileHeader({
  name,
  bio,
  avatarUrl,
}: ProfileHeaderProps) {
  return (
    <header className="flex flex-col items-center gap-3 text-center">
      <Image
        src={avatarUrl}
        alt={`${name} 프로필 사진`}
        width={128}
        height={128}
        priority
        unoptimized
        className="h-32 w-32 rounded-full object-cover ring-2 ring-border"
      />
      <h1 className="text-2xl font-bold">{name}</h1>
      <p className="text-sm text-muted">{bio}</p>
    </header>
  );
}
