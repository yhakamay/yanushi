import { Video } from "./video";

export interface VideoResponse {
  videos: Video[];
  prevPageToken: string;
  nextPageToken: string;
}
