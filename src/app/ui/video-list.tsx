import { VideoResponse } from "@/interfaces/video-response";
import Image from "next/image";
import Link from "next/link";

export default async function VideoList({ pageToken }: { pageToken?: string }) {
  const channelId = "UCNIQz7cSlRzPHuURqOCsF7A";
  const videoResponse = await fetchVideos(channelId, pageToken);
  const { videos, prevPageToken, nextPageToken } = videoResponse;

  return (
    <div className="flex flex-col not-prose w-full">
      <ul className="flex flex-wrap gap-x-4 gap-y-8 mb-8">
        {videos.map((video) => (
          <li key={video.videoId} className="flex flex-col w-80 group">
            <Link
              href={`https://www.youtube.com/watch?v=${video.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={video.thumbnailUrl}
                alt={video.title}
                width={320}
                height={180}
                className="rounded-lg mb-4 group-hover:brightness-75 group-hover:scale-105 transition ease-in-out duration-200"
              />
              <p className="group-hover:brightness-75 transition ease-in-out duration-200 line-clamp-2">
                {video.title}
              </p>
              <time className="text-xs text-gray-500 group-hover:brightness-90 transition ease-in-out duration-200">
                {formatPublishedAt(video.publishedAt)}
              </time>
            </Link>
          </li>
        ))}
      </ul>
      <div className="join grid grid-cols-2 self-center min-w-64">
        <Link
          className="join-item btn btn-outline"
          href={`?pageToken=${prevPageToken}`}
          {...(prevPageToken === undefined && { disabled: true })}
          aria-label="Previous page"
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
          aria-label="Next page"
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

function formatPublishedAt(publishedAt: string) {
  const now = new Date();
  const published = new Date(publishedAt);
  const diff = now.getTime() - published.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return `${seconds}秒前`;
  } else if (minutes < 60) {
    return `${minutes}分前`;
  } else if (hours < 24) {
    return `${hours}時間前`;
  } else if (days < 7) {
    return `${days}日前`;
  } else {
    return published.toLocaleDateString("ja-JP", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
}
