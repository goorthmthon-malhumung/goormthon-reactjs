import homeExperienceHaenyeoImage from "@/shared/assets/home/home-experience-haenyeo.jpg";
import homeExperienceMandarinImage from "@/shared/assets/home/home-experience-mandarin.jpg";
import homeExperienceStoneImage from "@/shared/assets/home/home-experience-stone.jpg";
import jobHorseDayImage from "@/assets/matching/mock/job-horse-day.jpg";
import jobRanchOperatorImage from "@/assets/matching/mock/job-ranch-operator.jpg";
import jobStoneMasterImage from "@/assets/matching/mock/job-stone-master.jpg";
import jobTangerineFarmImage from "@/assets/matching/mock/job-tangerine-farm.jpg";
import { getJobDetailRoute, getMatchingDetailRoute } from "@/shared/config/routes";
import type { MentorCardProps } from "@/shared/ui/cards";
import {
  getCanonicalExperienceSlug,
  getCanonicalJobSlug,
  getCategoryByExperienceSlug,
  getCategoryByJobSlug,
  getCategoryExperienceContent,
  getCategoryMentorRoster,
  type DetailMentorRosterEntry,
  type MatchingFallbackCategory,
} from "./detailContentRegistry";

export type { DetailMentorRosterEntry, MatchingFallbackCategory } from "./detailContentRegistry";

export type MatchingFallbackItem = {
  category: MatchingFallbackCategory;
  card: MentorCardProps;
};

export type MockReservationSummary = {
  summaryTitle: string;
  summaryMentor: string;
  summaryImageSrc: string;
  unitPrice: number;
};

export type MockJobDetail = MockReservationSummary & {
  slug: string;
  category: MatchingFallbackCategory;
  categoryLabel: string;
  experienceId: number;
  title: string;
  oneLineSummary: string;
  introduction: string;
  mainUrl: string;
  skills: readonly string[];
  participantCount: number;
  maxParticipants: number;
  mentorName: string;
  mentorRoster: readonly DetailMentorRosterEntry[];
  jobType: string;
  workHours: string;
  physicalLevel: string;
};

export type MockExperienceDetail = MockReservationSummary & {
  slug: string;
  category: MatchingFallbackCategory;
  categoryLabel: string;
  id: number;
  title: string;
  oneLineSummary: string;
  introduction: string;
  photoUrl: string;
  mentorName: string;
  experienceType: string;
  location: string;
  schedule: string;
  participantCount: number;
  maxParticipants: number;
  inclusions: readonly string[];
  requirements: readonly string[];
};

type MatchingJobMock = {
  category: MatchingFallbackCategory;
  card: MentorCardProps;
  detail: MockJobDetail;
};

type MatchingExperienceMock = {
  category: MatchingFallbackCategory;
  card: MentorCardProps;
  detail: MockExperienceDetail;
};

type MatchingDetailGalleryImage = {
  src: string;
  alt: string;
};

export type MatchingDetailState = {
  experienceSlug?: string;
  kindLabel?: string;
  heroImageSrc?: string;
  heroImageAlt?: string;
  deadlineLabel?: string;
  title?: string;
  participantLabel?: string;
  mentorInitial?: string;
  mentorName?: string;
  mentorCareer?: string;
  scheduleLabel?: string;
  timeLabel?: string;
  meetingPlace?: string;
  description?: string;
  includedItems?: readonly string[];
  requirements?: readonly string[];
  galleryImages?: readonly MatchingDetailGalleryImage[];
  priceLabel?: string;
  priceUnitLabel?: string;
  reserveLabel?: string;
  experienceId?: number;
  unitPriceValue?: number;
  availableFromDate?: string;
  availableToDate?: string;
};

type JobCardConfig = {
  imageSrc: string;
  imageAlt: string;
  badgeLabel: string;
  title: string;
  description: string;
  location: string;
  tags: readonly string[];
  participantCount: number;
  maxParticipants: number;
  workHours: string;
  physicalLevel: string;
  skills: readonly string[];
  unitPrice: number;
  deadlineDays: number;
  experienceId: number;
};

type ExperienceCardConfig = {
  imageSrc: string;
  imageAlt: string;
  badgeLabel: string;
  description: string;
  location: string;
  tags: readonly string[];
  participantCount: number;
  maxParticipants: number;
  unitPrice: number;
  deadlineDays: number;
  startOffsetDays: number;
  endOffsetDays: number;
  timeLabel: string;
  id: number;
  galleryImages: readonly MatchingDetailGalleryImage[];
};

const TODAY = new Date();

const JOB_CARD_CONFIGS: Record<MatchingFallbackCategory, JobCardConfig> = {
  haenyeo: {
    imageSrc: homeExperienceHaenyeoImage,
    imageAlt: "해녀 체험",
    badgeLabel: "30년 넘게 이어온",
    title: "해녀",
    description:
      "숨비소리와 채취 기술, 바다와 공존하는 삶의 방식까지 제주 해녀 직업의 하루를 가까이에서 이해합니다.",
    location: "제주시 구좌읍",
    tags: ["물질", "해산물채취", "바다안전"],
    participantCount: 5,
    maxParticipants: 8,
    workHours: "오전 9:00 - 12:00",
    physicalLevel: "수영 가능자",
    skills: ["숨비소리", "채취 기본기", "안전 수칙", "해녀 문화"],
    unitPrice: 50000,
    deadlineDays: 12,
    experienceId: 101,
  },
  stone: {
    imageSrc: jobStoneMasterImage,
    imageAlt: "돌담 장인 체험",
    badgeLabel: "40년 넘게 이어온",
    title: "돌담 장인",
    description:
      "바람을 흘려보내는 제주 돌담의 구조와 현무암을 읽는 감각을 장인에게 직접 배우는 직업 소개입니다.",
    location: "제주시 애월읍",
    tags: ["돌담쌓기", "전통기술", "제주건축"],
    participantCount: 4,
    maxParticipants: 6,
    workHours: "오후 1:00 - 4:00",
    physicalLevel: "야외 작업 가능",
    skills: ["돌 선별", "전통 공법", "현장 정리", "안전 작업"],
    unitPrice: 45000,
    deadlineDays: 9,
    experienceId: 102,
  },
  horse: {
    imageSrc: jobRanchOperatorImage,
    imageAlt: "목장주 체험",
    badgeLabel: "20년 넘게 이어온",
    title: "목장주",
    description:
      "말을 돌보고 방문객 체험을 운영하는 목장주의 하루를 따라가며 제주 목장 산업의 흐름을 배웁니다.",
    location: "서귀포시 표선면",
    tags: ["말관리", "목장체험", "동물교감"],
    participantCount: 3,
    maxParticipants: 5,
    workHours: "오전 10:00 - 오후 1:00",
    physicalLevel: "기본 체력 필요",
    skills: ["사육 관리", "목장 운영", "승마 체험 안내", "방문객 응대"],
    unitPrice: 55000,
    deadlineDays: 6,
    experienceId: 103,
  },
  tangerine: {
    imageSrc: jobTangerineFarmImage,
    imageAlt: "감귤 농가 체험",
    badgeLabel: "20년 넘게 이어온",
    title: "감귤 농가",
    description:
      "수확과 선별, 포장까지 제주 감귤 농가의 하루를 따라가며 계절과 날씨에 따라 달라지는 농작업을 이해합니다.",
    location: "서귀포시 남원읍",
    tags: ["감귤수확", "농가체험", "선별작업"],
    participantCount: 6,
    maxParticipants: 10,
    workHours: "오전 8:00 - 11:00",
    physicalLevel: "야외 활동 가능",
    skills: ["수확", "선별", "포장", "농장 운영"],
    unitPrice: 40000,
    deadlineDays: 10,
    experienceId: 104,
  },
};

const EXPERIENCE_CARD_CONFIGS: Record<
  MatchingFallbackCategory,
  ExperienceCardConfig
> = {
  haenyeo: {
    imageSrc: homeExperienceHaenyeoImage,
    imageAlt: "해녀 체험",
    badgeLabel: "30년 넘게 이어온",
    description:
      "실제 해녀복을 입고 해녀님과 함께 바다에 들어가 채취 방식과 호흡법을 배우는 전통 물질 체험입니다.",
    location: "제주시 구좌읍",
    tags: ["물질", "채취", "바다안전"],
    participantCount: 5,
    maxParticipants: 8,
    unitPrice: 50000,
    deadlineDays: 12,
    startOffsetDays: 12,
    endOffsetDays: 24,
    timeLabel: "오전 9:00 - 12:00 (3시간)",
    id: 201,
    galleryImages: [
      {
        src: homeExperienceHaenyeoImage,
        alt: "해녀 체험 대표 이미지",
      },
      {
        src: homeExperienceHaenyeoImage,
        alt: "바다에서 진행되는 해녀 체험 모습",
      },
    ],
  },
  stone: {
    imageSrc: homeExperienceStoneImage,
    imageAlt: "돌담 장인 체험",
    badgeLabel: "40년 넘게 이어온",
    description:
      "장인의 시연을 보고 직접 돌을 쌓으며 제주 돌담의 구조와 철학을 손으로 익히는 체험입니다.",
    location: "제주시 애월읍",
    tags: ["돌담", "현무암", "실습"],
    participantCount: 4,
    maxParticipants: 6,
    unitPrice: 45000,
    deadlineDays: 9,
    startOffsetDays: 9,
    endOffsetDays: 23,
    timeLabel: "오후 1:00 - 4:00 (3시간)",
    id: 202,
    galleryImages: [
      {
        src: homeExperienceStoneImage,
        alt: "돌담 장인 체험 대표 이미지",
      },
      {
        src: jobStoneMasterImage,
        alt: "현무암과 돌담 시연 장면",
      },
    ],
  },
  horse: {
    imageSrc: jobHorseDayImage,
    imageAlt: "목장주 체험",
    badgeLabel: "20년 넘게 이어온",
    description:
      "먹이 주기와 말 손질, 목장 운영 설명을 함께 들으며 말을 돌보는 목장주의 일상을 경험합니다.",
    location: "서귀포시 표선면",
    tags: ["말관리", "먹이주기", "승마체험"],
    participantCount: 4,
    maxParticipants: 8,
    unitPrice: 55000,
    deadlineDays: 6,
    startOffsetDays: 6,
    endOffsetDays: 20,
    timeLabel: "오후 1:00 - 4:00 (3시간)",
    id: 203,
    galleryImages: [
      {
        src: jobHorseDayImage,
        alt: "목장주 체험 대표 이미지",
      },
      {
        src: jobRanchOperatorImage,
        alt: "말 손질과 목장 투어 장면",
      },
    ],
  },
  tangerine: {
    imageSrc: homeExperienceMandarinImage,
    imageAlt: "감귤 농가 체험",
    badgeLabel: "20년 넘게 이어온",
    description:
      "감귤 따기부터 선별, 포장까지 제주 농가의 일과를 직접 따라가며 계절 농업을 체험합니다.",
    location: "서귀포시 남원읍",
    tags: ["감귤수확", "선별", "포장"],
    participantCount: 6,
    maxParticipants: 10,
    unitPrice: 40000,
    deadlineDays: 10,
    startOffsetDays: 10,
    endOffsetDays: 24,
    timeLabel: "오전 10:00 - 12:00 (2시간)",
    id: 204,
    galleryImages: [
      {
        src: homeExperienceMandarinImage,
        alt: "감귤 농가 체험 대표 이미지",
      },
      {
        src: jobTangerineFarmImage,
        alt: "감귤 선별과 포장 체험 장면",
      },
    ],
  },
};

function formatParticipantLabel(
  participantCount: number,
  maxParticipants: number,
) {
  return `${participantCount}/${maxParticipants}명`;
}

function formatPriceLabel(unitPrice: number) {
  return `${new Intl.NumberFormat("ko-KR").format(unitPrice)}원`;
}

function addDaysFromToday(days: number) {
  const date = new Date(TODAY);

  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + days);

  return date;
}

function formatKoreanDate(date: Date) {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}

function formatDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function buildDeadlineLabel(days: number) {
  return `D-${days}`;
}

function buildMetaLabel(name: string, days: number) {
  return `${name} · ${buildDeadlineLabel(days)}`;
}

function buildSchedule(days: number, timeLabel: string) {
  return `${formatKoreanDate(addDaysFromToday(days))} · ${timeLabel}`;
}

function getDeadlineLabel(metaLabel?: string) {
  const deadline = metaLabel
    ?.split("·")
    .map((value) => value.trim())
    .find((value) => value.startsWith("D-") || value.startsWith("D -"));

  return deadline ?? "D-7";
}

function getMentorInitial(name: string) {
  return name.trim().charAt(0) || "제";
}

function formatCareerLabel(badgeLabel?: string) {
  const normalized = badgeLabel
    ?.replace(" 이어온", "")
    .replace("이어온", "")
    .trim();

  return normalized ? `체험 운영 ${normalized}` : "체험 운영 5년차";
}

function getScheduleParts(schedule: string) {
  const [scheduleLabel, timeLabel] = schedule
    .split("·")
    .map((value) => value.trim());

  return {
    scheduleLabel: scheduleLabel || schedule,
    timeLabel: timeLabel || "오전 10:00 - 12:00",
  };
}

function buildMatchingDetailState(
  detail: MockExperienceDetail,
  card: Pick<MentorCardProps, "metaLabel" | "badgeLabel">,
  galleryImages: readonly MatchingDetailGalleryImage[],
  options: {
    startOffsetDays: number;
    endOffsetDays: number;
    timeLabel?: string;
  },
) {
  const { timeLabel: scheduleTimeLabel } = getScheduleParts(detail.schedule);
  const availableFrom = addDaysFromToday(options.startOffsetDays);
  const availableTo = addDaysFromToday(options.endOffsetDays);

  return {
    experienceSlug: detail.slug,
    kindLabel: "체험",
    heroImageSrc: detail.photoUrl,
    heroImageAlt: `${detail.title} 대표 이미지`,
    deadlineLabel: getDeadlineLabel(card.metaLabel),
    title: detail.title,
    participantLabel: formatParticipantLabel(
      detail.participantCount,
      detail.maxParticipants,
    ),
    mentorInitial: getMentorInitial(detail.mentorName),
    mentorName: detail.mentorName,
    mentorCareer: formatCareerLabel(card.badgeLabel),
    scheduleLabel: `${formatKoreanDate(availableFrom)} ~ ${formatKoreanDate(availableTo)}`,
    timeLabel: options.timeLabel ?? scheduleTimeLabel,
    meetingPlace: detail.location,
    description: detail.introduction,
    includedItems: detail.inclusions,
    requirements: detail.requirements,
    galleryImages,
    priceLabel: formatPriceLabel(detail.unitPrice),
    priceUnitLabel: "/ 인",
    reserveLabel: "예약하기",
    experienceId: detail.id,
    unitPriceValue: detail.unitPrice,
    availableFromDate: formatDateKey(availableFrom),
    availableToDate: formatDateKey(availableTo),
  } satisfies MatchingDetailState;
}

function buildJobMock(category: MatchingFallbackCategory): MatchingJobMock {
  const mentorRoster = getCategoryMentorRoster(category);
  const experienceContent = getCategoryExperienceContent(category);
  const config = JOB_CARD_CONFIGS[category];
  const canonicalJobSlug = getCanonicalJobSlug(category);
  const leadMentor = mentorRoster[0];

  return {
    category,
    card: {
      to: getJobDetailRoute(canonicalJobSlug),
      imageSrc: config.imageSrc,
      imageAlt: config.imageAlt,
      badgeLabel: config.badgeLabel,
      title: config.title,
      metaLabel: buildMetaLabel(leadMentor.name, config.deadlineDays),
      description: config.description,
      location: config.location,
      tags: config.tags,
    },
    detail: {
      slug: canonicalJobSlug,
      category,
      categoryLabel: experienceContent.categoryLabel,
      experienceId: config.experienceId,
      title: config.title,
      oneLineSummary: experienceContent.oneLineSummary,
      introduction: config.description,
      mainUrl: config.imageSrc,
      skills: config.skills,
      participantCount: config.participantCount,
      maxParticipants: config.maxParticipants,
      mentorName: leadMentor.name,
      mentorRoster,
      jobType: config.badgeLabel,
      workHours: config.workHours,
      physicalLevel: config.physicalLevel,
      summaryTitle: `${config.title} 체험`,
      summaryMentor: leadMentor.name,
      summaryImageSrc: config.imageSrc,
      unitPrice: config.unitPrice,
    },
  };
}

function buildExperienceMock(
  category: MatchingFallbackCategory,
): MatchingExperienceMock {
  const mentorRoster = getCategoryMentorRoster(category);
  const experienceContent = getCategoryExperienceContent(category);
  const config = EXPERIENCE_CARD_CONFIGS[category];
  const canonicalExperienceSlug = getCanonicalExperienceSlug(category);
  const leadMentor = mentorRoster[0];

  const detail: MockExperienceDetail = {
    slug: canonicalExperienceSlug,
    category,
    categoryLabel: experienceContent.categoryLabel,
    id: config.id,
    title: experienceContent.title,
    oneLineSummary: experienceContent.oneLineSummary,
    introduction: experienceContent.introduction,
    photoUrl: config.imageSrc,
    mentorName: leadMentor.name,
    experienceType: experienceContent.title,
    location: config.location,
    schedule: buildSchedule(config.startOffsetDays, config.timeLabel),
    participantCount: config.participantCount,
    maxParticipants: config.maxParticipants,
    inclusions: experienceContent.inclusions,
    requirements: experienceContent.requirements,
    summaryTitle: experienceContent.title,
    summaryMentor: leadMentor.name,
    summaryImageSrc: config.imageSrc,
    unitPrice: config.unitPrice,
  };

  return {
    category,
    card: {
      to: getMatchingDetailRoute({
        experienceSlug: canonicalExperienceSlug,
        category,
      }),
      imageSrc: config.imageSrc,
      imageAlt: config.imageAlt,
      badgeLabel: config.badgeLabel,
      title: experienceContent.title,
      metaLabel: buildMetaLabel(leadMentor.name, config.deadlineDays),
      description: config.description,
      location: config.location,
      tags: config.tags,
      state: buildMatchingDetailState(
        detail,
        {
          badgeLabel: config.badgeLabel,
          metaLabel: buildMetaLabel(leadMentor.name, config.deadlineDays),
        },
        config.galleryImages,
        {
          startOffsetDays: config.startOffsetDays,
          endOffsetDays: config.endOffsetDays,
          timeLabel: config.timeLabel,
        },
      ),
    },
    detail,
  };
}

const MATCHING_JOB_MOCKS = [
  buildJobMock("haenyeo"),
  buildJobMock("stone"),
  buildJobMock("horse"),
  buildJobMock("tangerine"),
] as const;

const MATCHING_EXPERIENCE_MOCKS = [
  buildExperienceMock("haenyeo"),
  buildExperienceMock("stone"),
  buildExperienceMock("horse"),
  buildExperienceMock("tangerine"),
] as const;

export const FALLBACK_MATCHING_JOB_ITEMS: readonly MatchingFallbackItem[] =
  MATCHING_JOB_MOCKS.map(({ category, card }) => ({
    category,
    card,
  }));

export const FALLBACK_MATCHING_EXPERIENCE_ITEMS: readonly MatchingFallbackItem[] =
  MATCHING_EXPERIENCE_MOCKS.map(({ category, card }) => ({
    category,
    card,
  }));

export const DEFAULT_MOCK_JOB_DETAIL =
  MATCHING_JOB_MOCKS.find((item) => item.category === "haenyeo")?.detail ??
  MATCHING_JOB_MOCKS[0].detail;
export const DEFAULT_MOCK_EXPERIENCE_DETAIL =
  MATCHING_EXPERIENCE_MOCKS.find((item) => item.category === "horse")?.detail ??
  MATCHING_EXPERIENCE_MOCKS[0].detail;
export const DEFAULT_MOCK_MATCHING_DETAIL_STATE =
  (MATCHING_EXPERIENCE_MOCKS.find((item) => item.category === "horse")?.card
    .state as MatchingDetailState | undefined) ??
  (MATCHING_EXPERIENCE_MOCKS[0].card.state as MatchingDetailState | undefined) ??
  {};

export function getMockJobDetailBySlug(slug?: string | null) {
  const category = getCategoryByJobSlug(slug);

  return category
    ? MATCHING_JOB_MOCKS.find((item) => item.category === category)?.detail
    : undefined;
}

export function getMockExperienceDetailBySlug(slug?: string | null) {
  const category = getCategoryByExperienceSlug(slug);

  return category
    ? MATCHING_EXPERIENCE_MOCKS.find((item) => item.category === category)?.detail
    : undefined;
}

export function getMockJobCardBySlug(slug?: string | null) {
  const category = getCategoryByJobSlug(slug);

  return category
    ? MATCHING_JOB_MOCKS.find((item) => item.category === category)?.card
    : undefined;
}

export function getMockExperienceCardBySlug(slug?: string | null) {
  const category = getCategoryByExperienceSlug(slug);

  return category
    ? MATCHING_EXPERIENCE_MOCKS.find((item) => item.category === category)?.card
    : undefined;
}

export function getMockMatchingDetailStateBySlug(slug?: string | null) {
  const category = getCategoryByExperienceSlug(slug);

  return category
    ? (MATCHING_EXPERIENCE_MOCKS.find((item) => item.category === category)?.card
        .state as MatchingDetailState | undefined)
    : undefined;
}
