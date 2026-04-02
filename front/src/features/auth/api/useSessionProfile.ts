import { getNumber, getString } from "@/api/response-helpers";
import { useMe } from "@/api/generated/user/user";

export type SessionProfileView = {
  memberId: number;
  displayName: string;
  displayEmail: string;
  displayLocation: string;
  joinedLabel: string;
  completedCount: number;
  favoriteCount: number;
  matchingCount: number;
};

export const DEFAULT_SESSION_PROFILE: SessionProfileView = {
  memberId: 0,
  displayName: "이지영",
  displayEmail: "jiyoung@example.com",
  displayLocation: "제주시",
  joinedLabel: "2026년 3월 가입",
  completedCount: 5,
  favoriteCount: 12,
  matchingCount: 3,
};

function formatJoinedLabel(rawValue: string) {
  if (!rawValue) {
    return DEFAULT_SESSION_PROFILE.joinedLabel;
  }

  const parsedDate = new Date(rawValue);

  if (Number.isNaN(parsedDate.getTime())) {
    return rawValue;
  }

  return `${parsedDate.getFullYear()}년 ${parsedDate.getMonth() + 1}월 가입`;
}

function mapSessionProfile(source: unknown): SessionProfileView {
  return {
    memberId: getNumber(source, ["id", "memberId", "userId"], 0),
    displayName: getString(
      source,
      ["name", "nickname"],
      DEFAULT_SESSION_PROFILE.displayName,
    ),
    displayEmail: getString(
      source,
      ["email", "phone"],
      DEFAULT_SESSION_PROFILE.displayEmail,
    ),
    displayLocation: getString(
      source,
      ["location", "address"],
      DEFAULT_SESSION_PROFILE.displayLocation,
    ),
    joinedLabel: formatJoinedLabel(
      getString(source, ["joinedAt", "createdAt", "joinDate"], ""),
    ),
    completedCount: getNumber(
      source,
      ["completedCount", "completedExperiences"],
      DEFAULT_SESSION_PROFILE.completedCount,
    ),
    favoriteCount: getNumber(
      source,
      ["favoriteCount", "favoriteJobs"],
      DEFAULT_SESSION_PROFILE.favoriteCount,
    ),
    matchingCount: getNumber(
      source,
      ["matchingCount", "matchedCount"],
      DEFAULT_SESSION_PROFILE.matchingCount,
    ),
  };
}

export function useSessionProfile() {
  return useMe<SessionProfileView>({
    query: {
      staleTime: 60_000,
      select: (response) => mapSessionProfile(response.data),
    },
  });
}
