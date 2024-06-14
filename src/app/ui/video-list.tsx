import { Video } from "@/interfaces/video";

export default async function VideoList() {
  const channelId = "UCNIQz7cSlRzPHuURqOCsF7A";
  const videos: Video[] = await fetchVideos(channelId);

  return (
    <ul className="flex flex-wrap gap-4 not-prose w-dvw">
      {videos.map((video) => (
        <li key={video.videoId}>
          <iframe
            height={180}
            width={320}
            src={`https://www.youtube.com/embed/${video.videoId}`}
            loading="lazy"
            title={video.title}
            allowFullScreen
            className="rounded-lg"
          ></iframe>
        </li>
      ))}
    </ul>
  );
}

async function fetchVideos(channelId: string): Promise<Video[]> {
  const res = await fetch(
    `${process.env.URL}/api/youtube?channelId=${channelId}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch videos");
  }

  return res.json();
}
