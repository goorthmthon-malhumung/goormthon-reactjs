import { customFetch } from "@/api/fetcher";
import type { ApiResponseObject } from "@/api/generated/model/apiResponseObject";
import { useQuery } from "@tanstack/react-query";

export type MatchingCategoryKey =
  | "haenyeo"
  | "stone"
  | "horse"
  | "tangerine"
  | "all";

export function useMatchingJobListView() {
  return useQuery({
    queryKey: ["/jobs", { page: 0, size: 20, sort: ["id,desc"] }],
    queryFn: () =>
      customFetch<ApiResponseObject>("/jobs", {
        method: "GET",
        params: {
          page: 0,
          size: 20,
          sort: ["id,desc"],
        },
      }),
    staleTime: 60_000,
  });
}
