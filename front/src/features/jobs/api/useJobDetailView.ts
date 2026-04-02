import { getNumber, getString, getStringArray } from "@/api/response-helpers";
import { useGetJob } from "@/api/generated/job/job";

const DEFAULT_TITLE =
  "금녕 해녀와 함께하는 전복따기금녕금녕 해녀와 함께하는 전복따기금녕";
const DEFAULT_INTRODUCTION =
  "45년 경력의 김영숙 해녀님과 함께하는 물질 체험입니다. 전통 해녀복을 입고 바다에 들어가 직접 해산물을 채취하며 제주 해녀 문화를 체험할 수 있습니다. 초보자도 안전하게 참여할 수 있도록 구명조끼와 안전 장비가 제공되며, 해녀님의 세심한 지도 아래 진행됩니다.";
const DEFAULT_HERO_IMAGE =
  "https://www.figma.com/api/mcp/asset/f41730c6-3372-4d0f-8089-4f8826f7de9d";
const DEFAULT_SKILLS = [
  "물질 기술",
  "해산물 채취",
  "바다 안전",
  "바다 안전",
  "물때 판단",
  "장비 관리",
] as const;

export type JobDetailView = {
  jobId: number;
  experienceId: number;
  title: string;
  introduction: string;
  heroImageSrc: string;
  skills: string[];
  currentParticipants: number;
  maxParticipants: number;
  mentorName: string;
};

export const DEFAULT_JOB_DETAIL_VIEW: JobDetailView = {
  jobId: 1,
  experienceId: 1,
  title: DEFAULT_TITLE,
  introduction: DEFAULT_INTRODUCTION,
  heroImageSrc: DEFAULT_HERO_IMAGE,
  skills: [...DEFAULT_SKILLS],
  currentParticipants: 5,
  maxParticipants: 8,
  mentorName: "김영숙 해녀",
};

function mapJobDetail(source: unknown, fallbackId: number): JobDetailView {
  return {
    jobId: getNumber(source, ["id", "jobId"], fallbackId),
    experienceId: getNumber(
      source,
      ["experienceId", "linkedExperienceId"],
      DEFAULT_JOB_DETAIL_VIEW.experienceId,
    ),
    title: getString(source, ["title", "jobTitle"], DEFAULT_JOB_DETAIL_VIEW.title),
    introduction: getString(
      source,
      ["introduction", "description", "introduce"],
      DEFAULT_JOB_DETAIL_VIEW.introduction,
    ),
    heroImageSrc: getString(
      source,
      ["mainUrl", "photoUrl", "imageUrl", "thumbnailUrl"],
      DEFAULT_JOB_DETAIL_VIEW.heroImageSrc,
    ),
    skills: getStringArray(source, ["skills"], DEFAULT_JOB_DETAIL_VIEW.skills),
    currentParticipants: getNumber(
      source,
      ["participantCount", "currentParticipants", "reservedCount"],
      DEFAULT_JOB_DETAIL_VIEW.currentParticipants,
    ),
    maxParticipants: getNumber(
      source,
      ["maxParticipants", "capacity"],
      DEFAULT_JOB_DETAIL_VIEW.maxParticipants,
    ),
    mentorName: getString(
      source,
      ["mentorName", "mentor", "name"],
      DEFAULT_JOB_DETAIL_VIEW.mentorName,
    ),
  };
}

export function useJobDetailView(jobId: number) {
  return useGetJob<JobDetailView>(jobId, {
    query: {
      staleTime: 60_000,
      select: (response) => mapJobDetail(response.data, jobId),
    },
  });
}
