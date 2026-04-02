import { useMe } from "@/api/generated/user/user";

export function useSessionProfile() {
  return useMe({
    query: {
      staleTime: 60_000,
    },
  });
}
