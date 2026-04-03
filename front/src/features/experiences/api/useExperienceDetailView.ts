import { useGetExperienceDetail } from "@/api/generated/experience/experience";

export function useExperienceDetailView(experienceId: number, enabled = true) {
  return useGetExperienceDetail(experienceId, {
    query: {
      enabled,
      staleTime: 60_000,
    },
  });
}
