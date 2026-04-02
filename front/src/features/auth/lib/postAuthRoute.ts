import type { QueryClient } from "@tanstack/react-query";
import { getMeQueryKey, me } from "@/api/generated/user/user";
import { ROUTES } from "@/shared/config/routes";
import { asRecord } from "@/shared/lib/apiData";

export async function resolvePostAuthRoute(
  queryClient: QueryClient,
  fallbackIsMentor = false,
) {
  try {
    const response = await me();
    queryClient.setQueryData(getMeQueryKey(), response);

    const profile = asRecord(response.data);

    return profile?.isMentor === true ? ROUTES.mentorHome : ROUTES.home;
  } catch {
    return fallbackIsMentor ? ROUTES.mentorHome : ROUTES.home;
  }
}
