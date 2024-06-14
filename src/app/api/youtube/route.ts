import { Video } from "@/interfaces/video";
import { google } from "googleapis";
import { NextResponse } from "next/server";

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_DATA_API_KEY,
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const channelId = searchParams.get("channelId");

  if (!channelId) {
    return NextResponse.json(
      { error: "The channelId parameter is required" },
      { status: 400 }
    );
  }

  try {
    const channelResponse = await youtube.channels.list({
      part: ["contentDetails"],
      id: [channelId],
    });

    const uploadsPlaylistId =
      channelResponse.data.items?.[0]?.contentDetails?.relatedPlaylists
        ?.uploads;

    if (!uploadsPlaylistId) {
      return NextResponse.json(
        { error: "Uploads playlist not found" },
        { status: 404 }
      );
    }

    const playlistResponse = await youtube.playlistItems.list({
      part: ["snippet"],
      playlistId: uploadsPlaylistId,
      maxResults: 4,
    });

    const videos: Video[] =
      playlistResponse.data.items?.map((item) => ({
        title: item.snippet?.title ?? "",
        videoId: item.snippet?.resourceId?.videoId ?? "",
        publishedAt: item.snippet?.publishedAt ?? "",
      })) ?? [];

    return NextResponse.json(videos);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
