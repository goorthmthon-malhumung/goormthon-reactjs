import { useMe } from "@/api/generated/user/user";

export const DEFAULT_SESSION_PROFILE = {
  id: 0,
  name: "이지영",
  phone: "01039034750",
  location: "제주시",
  joinedLabel: "2026년 3월 가입",
  completedCount: 5,
  favoriteCount: 12,
  matchingCount: 3,
  isMentor: false,
} as const;

export function useSessionProfile() {
  return useMe({
    query: {
      staleTime: 60_000,
    },
  });
}
