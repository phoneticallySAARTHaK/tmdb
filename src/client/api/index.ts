import { apiPaths } from "../../common";
import { Success, utils } from "../utils";

export namespace api {
  export const apiEndpoints = Object.fromEntries(
    Object.entries(apiPaths).map(([key, val]) => {
      return [key, `${location.origin}/api${val}`] as const;
    })
  ) as unknown as {
    [k in keyof typeof apiPaths]: `https://${string}/api${(typeof apiPaths)[k]}`;
  };

  export async function search(query: string) {
    const url = new URL(apiEndpoints.search);
    url.searchParams.set("q", query);

    return utils.fetch<SearchResponse>(url);
  }

  export type SearchResponse = Success & {
    page: number;
    total_pages: number;
    total_results: number;
    results: QueryResult[];
  };

  export type QueryResult = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  };
}
