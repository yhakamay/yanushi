import { Suspense } from "react";
import VideoList from "./ui/video-list";
import VideoListSkeleton from "./ui/video-list-skeleton";

export default async function Home() {
  return (
    <main className="min-h-screen p-8 lg:p-12 overflow-x-hidden">
      <article className="prose">
        <h1>やぬし</h1>
        <section>
          <h2>最近の動画</h2>
          <Suspense fallback={<VideoListSkeleton />}>
            <VideoList />
          </Suspense>
        </section>
      </article>
    </main>
  );
}
