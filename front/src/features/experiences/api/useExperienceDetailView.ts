import { useGetExperienceDetail } from "@/api/generated/experience/experience";

export function useExperienceDetailView(experienceId: number) {
  return useGetExperienceDetail(experienceId, {
    query: {
      staleTime: 60_000,
    },
  });
}
