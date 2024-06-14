import { Suspense } from "react";
import VideoList from "./ui/video-list";
import VideoListSkeleton from "./ui/video-list-skeleton";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    pageToken?: string;
  };
}) {
  const pageToken = searchParams?.pageToken ?? undefined;

  return (
    <main className="min-h-screen p-8 lg:p-12 overflow-x-hidden">
      <Link href="/">
        <h1 className="text-4xl font-bold mb-8">やぬし</h1>
      </Link>
      <section>
        <h2 className="text-3xl font-semibold mb-4">最近の動画</h2>
        <Suspense fallback={<VideoListSkeleton />}>
          <VideoList pageToken={pageToken} />
        </Suspense>
      </section>
    </main>
  );
}
