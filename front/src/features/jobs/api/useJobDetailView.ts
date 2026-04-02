import { useGetJob } from "@/api/generated/job/job";

export function useJobDetailView(jobId: number) {
  return useGetJob(jobId, {
    query: {
      staleTime: 60_000,
    },
  });
}
