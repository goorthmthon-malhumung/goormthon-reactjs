import {
  useGetMyBookings,
  useGetMyCompletedBookings,
} from "@/api/generated/experience/experience";

export function useMyUpcomingExperienceReservations() {
  return useGetMyBookings({
    query: {
      staleTime: 60_000,
    },
  });
}

export function useMyCompletedExperienceHistory() {
  return useGetMyCompletedBookings({
    query: {
      staleTime: 60_000,
    },
  });
}
