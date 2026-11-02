import { MongoClient } from "mongodb";

export type ClickDoc = { _id: string; count: number };

// 개발 서버의 핫 리로드나 서버리스 재호출에도 연결을 재사용합니다.
const globalForMongo = globalThis as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

/** MONGODB_URI가 없으면 null을 반환합니다. */
export async function getClicksCollection() {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;

  if (!globalForMongo._mongoClientPromise) {
    globalForMongo._mongoClientPromise = new MongoClient(uri)
      .connect()
      .catch((error) => {
        // 실패한 연결을 캐시하면 이후 요청이 재시도하지 못합니다.
        globalForMongo._mongoClientPromise = undefined;
        throw error;
      });
  }

  const client = await globalForMongo._mongoClientPromise;
  return client
    .db(process.env.MONGODB_DB ?? "linknamu")
    .collection<ClickDoc>("clicks");
}
