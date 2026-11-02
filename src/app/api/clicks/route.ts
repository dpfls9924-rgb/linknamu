import { NextResponse } from "next/server";
import { getClicksCollection } from "@/lib/mongodb";
import { links } from "@/lib/profile";

export const dynamic = "force-dynamic";

const NOT_CONFIGURED = { error: "MONGODB_URI가 설정되지 않았습니다." };
const SERVER_ERROR = { error: "클릭 수를 처리하지 못했습니다." };

export async function GET() {
  try {
    const clicks = await getClicksCollection();
    if (!clicks) return NextResponse.json(NOT_CONFIGURED, { status: 503 });

    const docs = await clicks.find().toArray();
    const counts = Object.fromEntries(docs.map((d) => [d._id, d.count]));
    return NextResponse.json({ counts });
  } catch (error) {
    console.error("클릭 수 조회 실패:", error);
    return NextResponse.json(SERVER_ERROR, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  const id = (body as { id?: unknown } | null)?.id;

  // 등록된 링크만 허용해 임의의 키가 DB에 쌓이지 않게 합니다.
  if (typeof id !== "string" || !links.some((link) => link.id === id)) {
    return NextResponse.json({ error: "알 수 없는 링크입니다." }, { status: 400 });
  }

  try {
    const clicks = await getClicksCollection();
    if (!clicks) return NextResponse.json(NOT_CONFIGURED, { status: 503 });

    await clicks.updateOne({ _id: id }, { $inc: { count: 1 } }, { upsert: true });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("클릭 수 저장 실패:", error);
    return NextResponse.json(SERVER_ERROR, { status: 500 });
  }
}
