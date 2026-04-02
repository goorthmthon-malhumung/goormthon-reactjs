import { getNumber, getString, getStringArray } from "@/api/response-helpers";
import { useGetExperienceDetail } from "@/api/generated/experience/experience";
import heroImage from "@/assets/experience-detail/hero.jpg";

const DEFAULT_TITLE =
  "금녕 해녀와 함께하는 전복따기금녕금녕 해녀와 함께하는 전복따기금녕";
const DEFAULT_INTRODUCTION =
  "45년 경력의 김영숙 해녀님과 함께하는 물질 체험입니다. 전통 해녀복을 입고 바다에 들어가 직접 해산물을 채취하며 제주 해녀 문화를 체험할 수 있습니다. 초보자도 안전하게 참여할 수 있도록 구명조끼와 안전 장비가 제공되며, 해녀님의 세심한 지도 아래 진행됩니다.";
const DEFAULT_SKILLS = [
  "물질 기술",
  "해산물 채취",
  "바다 안전",
  "바다 안전",
  "물때 판단",
  "장비 관리",
] as const;

export type ExperienceDetailView = {
  experienceId: number;
  title: string;
  introduction: string;
  heroImageSrc: string;
  skills: string[];
  currentParticipants: number;
  maxParticipants: number;
  mentorName: string;
};

export const DEFAULT_EXPERIENCE_DETAIL_VIEW: ExperienceDetailView = {
  experienceId: 1,
  title: DEFAULT_TITLE,
  introduction: DEFAULT_INTRODUCTION,
  heroImageSrc: heroImage,
  skills: [...DEFAULT_SKILLS],
  currentParticipants: 5,
  maxParticipants: 8,
  mentorName: "김영숙 해녀",
};

function mapExperienceDetail(
  source: unknown,
  fallbackId: number,
): ExperienceDetailView {
  return {
    experienceId: getNumber(source, ["id", "experienceId"], fallbackId),
    title: getString(
      source,
      ["title", "experienceTitle"],
      DEFAULT_EXPERIENCE_DETAIL_VIEW.title,
    ),
    introduction: getString(
      source,
      ["introduction", "description"],
      DEFAULT_EXPERIENCE_DETAIL_VIEW.introduction,
    ),
    heroImageSrc: getString(
      source,
      ["photoUrl", "imageUrl", "thumbnailUrl"],
      DEFAULT_EXPERIENCE_DETAIL_VIEW.heroImageSrc,
    ),
    skills: getStringArray(
      source,
      ["skills"],
      DEFAULT_EXPERIENCE_DETAIL_VIEW.skills,
    ),
    currentParticipants: getNumber(
      source,
      ["participantCount", "currentParticipants", "reservedCount"],
      DEFAULT_EXPERIENCE_DETAIL_VIEW.currentParticipants,
    ),
    maxParticipants: getNumber(
      source,
      ["maxParticipants", "capacity"],
      DEFAULT_EXPERIENCE_DETAIL_VIEW.maxParticipants,
    ),
    mentorName: getString(
      source,
      ["mentorName", "mentor", "name"],
      DEFAULT_EXPERIENCE_DETAIL_VIEW.mentorName,
    ),
  };
}

export function useExperienceDetailView(experienceId: number) {
  return useGetExperienceDetail<ExperienceDetailView>(experienceId, {
    query: {
      staleTime: 60_000,
      select: (response) => mapExperienceDetail(response.data, experienceId),
    },
  });
}
