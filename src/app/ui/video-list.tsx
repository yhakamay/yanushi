import { VideoResponse } from "@/interfaces/video-response";
import Link from "next/link";

export default async function VideoList({ pageToken }: { pageToken?: string }) {
  const channelId = "UCNIQz7cSlRzPHuURqOCsF7A";
  const videoResponse = await fetchVideos(channelId, pageToken);
  const { videos, prevPageToken, nextPageToken } = videoResponse;

  return (
    <div className="flex flex-col not-prose w-full">
      <ul className="flex flex-wrap gap-4 mb-4">
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
      <div className="join grid grid-cols-2 self-center min-w-64">
        <Link
          className="join-item btn btn-outline"
          href={`?pageToken=${prevPageToken}`}
          {...(prevPageToken === undefined && { disabled: true })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
            />
          </svg>
        </Link>
        <Link
          className="join-item btn btn-outline"
          href={`?pageToken=${nextPageToken}`}
          {...(nextPageToken === undefined && { disabled: true })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}

async function fetchVideos(
  channelId: string,
  pageToken?: string
): Promise<VideoResponse> {
  const res = await fetch(
    `${process.env.URL}/api/youtube?channelId=${channelId}&pageToken=${
      pageToken ?? ""
    }`,
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
