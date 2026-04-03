import { useGetJob } from "@/api/generated/job/job";

export function useJobDetailView(jobId: number, enabled = true) {
  return useGetJob(jobId, {
    query: {
      enabled,
      staleTime: 60_000,
    },
  });
}
