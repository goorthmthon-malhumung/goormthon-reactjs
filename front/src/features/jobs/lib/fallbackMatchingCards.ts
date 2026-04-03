import jobHorseDayImage from "@/assets/matching/mock/job-horse-day.jpg";
import jobRanchOperatorImage from "@/assets/matching/mock/job-ranch-operator.jpg";
import jobStoneMasterImage from "@/assets/matching/mock/job-stone-master.jpg";
import jobTangerineFarmImage from "@/assets/matching/mock/job-tangerine-farm.jpg";
import jobTraditionalCraftImage from "@/assets/matching/mock/job-traditional-craft.jpg";
import { ROUTES } from "@/shared/config/routes";
import type { MentorCardProps } from "@/shared/ui/cards";

export type MatchingFallbackCategory =
  | "haenyeo"
  | "stone"
  | "horse"
  | "tangerine";

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
  experienceId: number;
  title: string;
  introduction: string;
  mainUrl: string;
  skills: readonly string[];
  participantCount: number;
  maxParticipants: number;
  mentorName: string;
  jobType: string;
  workHours: string;
  physicalLevel: string;
};

export type MockExperienceDetail = MockReservationSummary & {
  slug: string;
  category: MatchingFallbackCategory;
  id: number;
  title: string;
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

const TODAY = new Date();

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

  return normalized ? `체험 운영 ${normalized}차` : "체험 운영 5년차";
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

const MATCHING_JOB_MOCKS: readonly MatchingJobMock[] = [
  {
    category: "haenyeo",
    card: {
      to: "/jobs/haenyeo",
      imageSrc: jobHorseDayImage,
      imageAlt: "제주의 말을 돌보는 하루",
      badgeLabel: "45년 이어온",
      title: "제주의 말을 돌보는 하루",
      metaLabel: buildMetaLabel("고정자 멘토", 20),
      description:
        "제주 초원에서 말 먹이 준비와 손질, 방목장 점검까지 직접 따라가며 목장 운영의 하루를 배워보는 직업 소개입니다.",
      location: "서귀포시 표선면",
      tags: ["먹이 준비", "말 손질", "방목장 관리"],
    },
    detail: {
      slug: "haenyeo",
      category: "haenyeo",
      experienceId: 101,
      title: "제주의 말을 돌보는 하루",
      introduction:
        "제주 초원에서 말을 돌보는 하루 일과를 따라가며 먹이 준비, 말 손질, 방목장 점검까지 직접 경험합니다. 현장에서 사용하는 도구와 관리 요령을 차근차근 배울 수 있게 구성한 시연용 직업 소개 데이터입니다.",
      mainUrl: jobHorseDayImage,
      skills: ["먹이 준비", "말 손질", "방목장 관리", "안전 수칙"],
      participantCount: 5,
      maxParticipants: 8,
      mentorName: "고정자 멘토",
      jobType: "45년 이어온",
      workHours: "오전 9:00 - 12:00",
      physicalLevel: "초보 가능",
      summaryTitle: "제주의 말을 돌보는 하루 체험",
      summaryMentor: "고정자 멘토",
      summaryImageSrc: jobHorseDayImage,
      unitPrice: 50000,
    },
  },
  {
    category: "stone",
    card: {
      to: "/jobs/stone",
      imageSrc: jobStoneMasterImage,
      imageAlt: "돌담 장인",
      badgeLabel: "25년 이어온",
      title: "돌담 장인",
      metaLabel: buildMetaLabel("강문석 장인", 12),
      description:
        "제주의 상징인 돌담을 쌓는 전통 기술을 배워보세요. 바람을 통과시키는 제주만의 독특한 쌓기 방식을 알려드립니다.",
      location: "제주시 한림읍",
      tags: ["돌 선별", "전통 쌓기", "현무암"],
    },
    detail: {
      slug: "stone",
      category: "stone",
      experienceId: 102,
      title: "돌담 장인",
      introduction:
        "제주 현무암의 결을 읽고 돌의 크기와 무게를 맞춰 안정적으로 쌓는 기본 기술을 소개합니다. 시연에서는 실제 공정 전체를 축약해 보여주되, 전통적인 돌담의 의미와 유지 관리 포인트까지 함께 설명합니다.",
      mainUrl: jobStoneMasterImage,
      skills: ["돌 선별", "쌓기 구조", "현장 정리", "안전 작업"],
      participantCount: 4,
      maxParticipants: 6,
      mentorName: "강문석 장인",
      jobType: "25년 이어온",
      workHours: "오후 1:00 - 4:00",
      physicalLevel: "중간 난이도",
      summaryTitle: "돌담 장인 체험",
      summaryMentor: "강문석 장인",
      summaryImageSrc: jobStoneMasterImage,
      unitPrice: 45000,
    },
  },
  {
    category: "horse",
    card: {
      to: "/jobs/horse",
      imageSrc: jobRanchOperatorImage,
      imageAlt: "말 농장 운영자",
      badgeLabel: "25년 이어온",
      title: "말 농장 운영자",
      metaLabel: buildMetaLabel("박준호 목장주", 6),
      description:
        "말의 컨디션을 살피고 승마 체험 준비를 돕는 목장 운영자의 하루를 따라가며 농장 현장의 흐름을 익힙니다.",
      location: "서귀포시 남원읍",
      tags: ["사육 관리", "체험 안내", "방문객 응대"],
    },
    detail: {
      slug: "horse",
      category: "horse",
      experienceId: 103,
      title: "말 농장 운영자",
      introduction:
        "말의 컨디션을 살피고 승마 체험 준비를 돕는 농장 운영자의 하루를 담았습니다. 목장 점검, 말과의 교감, 방문객 동선 관리까지 발표 시연에 맞게 흐름이 보이도록 구성한 mock 상세 데이터입니다.",
      mainUrl: jobRanchOperatorImage,
      skills: ["사육 관리", "방목장 운영", "체험 안내", "방문객 응대"],
      participantCount: 3,
      maxParticipants: 5,
      mentorName: "박준호 목장주",
      jobType: "25년 이어온",
      workHours: "오전 10:00 - 오후 1:00",
      physicalLevel: "초보 가능",
      summaryTitle: "말 농장 운영자 체험",
      summaryMentor: "박준호 목장주",
      summaryImageSrc: jobRanchOperatorImage,
      unitPrice: 55000,
    },
  },
  {
    category: "tangerine",
    card: {
      to: "/jobs/tangerine",
      imageSrc: jobTangerineFarmImage,
      imageAlt: "귤 농가",
      badgeLabel: "25년 이어온",
      title: "귤 농가",
      metaLabel: buildMetaLabel("이영자 농부", 10),
      description:
        "수확 시기 귤을 따고 선별하고 포장하는 과정을 통해 제주 감귤 농가가 운영되는 방식을 현장 중심으로 소개합니다.",
      location: "제주시 조천읍",
      tags: ["수확", "선별", "포장"],
    },
    detail: {
      slug: "tangerine",
      category: "tangerine",
      experienceId: 104,
      title: "귤 농가",
      introduction:
        "수확 시기에 맞춰 귤을 따고 분류하는 과정, 농장 내 이동 동선, 상품 포장 전 체크 포인트까지 한 번에 보여주는 시연용 농가 소개입니다. 현장 감각을 살릴 수 있도록 계절과 날씨에 따른 작업 차이도 함께 담았습니다.",
      mainUrl: jobTangerineFarmImage,
      skills: ["수확", "선별", "포장", "농장 운영"],
      participantCount: 6,
      maxParticipants: 10,
      mentorName: "이영자 농부",
      jobType: "25년 이어온",
      workHours: "오전 8:00 - 11:00",
      physicalLevel: "초보 가능",
      summaryTitle: "귤 농가 체험",
      summaryMentor: "이영자 농부",
      summaryImageSrc: jobTangerineFarmImage,
      unitPrice: 40000,
    },
  },
  {
    category: "stone",
    card: {
      to: "/jobs/traditional-craft",
      imageSrc: jobTraditionalCraftImage,
      imageAlt: "전통 공예",
      badgeLabel: "25년 이어온",
      title: "전통 공예",
      metaLabel: buildMetaLabel("오명수 공예가", 14),
      description:
        "재료 손질부터 엮기와 마감까지 제주 전통 공예 작업실의 하루를 따라가며 생활 공예 직업을 이해할 수 있도록 구성했습니다.",
      location: "제주시 한경면",
      tags: ["재료 손질", "엮기", "생활 공예"],
    },
    detail: {
      slug: "traditional-craft",
      category: "stone",
      experienceId: 105,
      title: "전통 공예",
      introduction:
        "대나무와 짚을 엮어 생활 도구를 만드는 전통 공예 작업실을 배경으로, 재료 손질부터 마감까지의 흐름을 소개합니다. 발표 시연에서는 손동작이 잘 보이도록 단계별 포인트와 완성품 예시를 중심으로 설명할 수 있게 구성했습니다.",
      mainUrl: jobTraditionalCraftImage,
      skills: ["재료 손질", "엮기", "마감", "생활 공예"],
      participantCount: 2,
      maxParticipants: 4,
      mentorName: "오명수 공예가",
      jobType: "25년 이어온",
      workHours: "오후 2:00 - 5:00",
      physicalLevel: "실내 체험",
      summaryTitle: "전통 공예 체험",
      summaryMentor: "오명수 공예가",
      summaryImageSrc: jobTraditionalCraftImage,
      unitPrice: 42000,
    },
  },
] as const;

const MATCHING_EXPERIENCE_MOCKS: readonly MatchingExperienceMock[] = [
  {
    category: "horse",
    card: {
      to: ROUTES.matchingDetail,
      imageSrc: jobRanchOperatorImage,
      imageAlt: "말 농장 하루 체험",
      badgeLabel: "8년 이어온",
      title: "말 농장 하루 체험",
      metaLabel: buildMetaLabel("박준호 목장주", 6),
      description:
        "먹이 주기와 마구간 정리, 말과의 교감까지 제주 목장의 하루를 가볍게 체험하는 프로그램입니다.",
      location: "서귀포시 남원읍",
      tags: ["먹이 주기", "마구간 정리", "산책"],
      state: buildMatchingDetailState(
        {
          slug: "horse-farm-day",
          category: "horse",
          id: 201,
          title: "말 농장 하루 체험",
          introduction:
            "제주 목장에서 실제로 진행되는 기본 돌봄 루틴을 따라가며 먹이 주기, 장비 정리, 말과 교감하는 시간을 경험합니다. 초보자도 참여할 수 있도록 안전 브리핑과 이동 동선을 포함한 시연용 mock 상세 데이터입니다.",
          photoUrl: jobRanchOperatorImage,
          mentorName: "박준호 목장주",
          experienceType: "체험",
          location: "서귀포시 남원읍",
          schedule: buildSchedule(6, "오후 1:00 - 4:00"),
          participantCount: 4,
          maxParticipants: 8,
          inclusions: ["장갑 제공", "먹이 체험", "사진 촬영"],
          requirements: ["편한 복장", "운동화 착용", "보호자 동반 가능"],
          summaryTitle: "말 농장 하루 체험",
          summaryMentor: "박준호 목장주",
          summaryImageSrc: jobRanchOperatorImage,
          unitPrice: 35000,
        },
        {
          badgeLabel: "8년 이어온",
          metaLabel: buildMetaLabel("박준호 목장주", 6),
        },
        [
          {
            src: jobRanchOperatorImage,
            alt: "말 농장 하루 체험 대표 이미지",
          },
          {
            src: jobHorseDayImage,
            alt: "말 먹이 주기와 방목장 체험 모습",
          },
        ],
        {
          startOffsetDays: 6,
          endOffsetDays: 20,
          timeLabel: "오후 1:00 - 4:00 (3시간)",
        },
      ),
    },
    detail: {
      slug: "horse-farm-day",
      category: "horse",
      id: 201,
      title: "말 농장 하루 체험",
      introduction:
        "제주 목장에서 실제로 진행되는 기본 돌봄 루틴을 따라가며 먹이 주기, 장비 정리, 말과 교감하는 시간을 경험합니다. 초보자도 참여할 수 있도록 안전 브리핑과 이동 동선을 포함한 시연용 mock 상세 데이터입니다.",
      photoUrl: jobRanchOperatorImage,
      mentorName: "박준호 목장주",
      experienceType: "체험",
      location: "서귀포시 남원읍",
      schedule: buildSchedule(6, "오후 1:00 - 4:00"),
      participantCount: 4,
      maxParticipants: 8,
      inclusions: ["장갑 제공", "먹이 체험", "사진 촬영"],
      requirements: ["편한 복장", "운동화 착용", "보호자 동반 가능"],
      summaryTitle: "말 농장 하루 체험",
      summaryMentor: "박준호 목장주",
      summaryImageSrc: jobRanchOperatorImage,
      unitPrice: 35000,
    },
  },
  {
    category: "tangerine",
    card: {
      to: ROUTES.matchingDetail,
      imageSrc: jobTangerineFarmImage,
      imageAlt: "귤 수확 체험",
      badgeLabel: "6년 이어온",
      title: "귤 수확 체험",
      metaLabel: buildMetaLabel("이영자 농부", 10),
      description:
        "수확과 선별, 포장까지 제주 감귤 농가의 하루를 직접 경험해보는 시즌형 체험 프로그램입니다.",
      location: "제주시 조천읍",
      tags: ["수확", "선별", "포장"],
      state: buildMatchingDetailState(
        {
          slug: "tangerine-harvest",
          category: "tangerine",
          id: 202,
          title: "귤 수확 체험",
          introduction:
            "제철 귤을 직접 따고 선별하는 과정을 통해 농가의 하루를 체험합니다. 수확 후 간단한 포장 체험과 농장 소개를 포함해, 발표 데모에서 흐름이 잘 보이도록 구성한 mock 데이터입니다.",
          photoUrl: jobTangerineFarmImage,
          mentorName: "이영자 농부",
          experienceType: "체험",
          location: "제주시 조천읍",
          schedule: buildSchedule(10, "오전 10:00 - 12:00"),
          participantCount: 6,
          maxParticipants: 10,
          inclusions: ["수확 바구니", "시식 귤", "포장 체험"],
          requirements: ["모자 착용 권장", "편한 복장", "우천 시 일정 변경 가능"],
          summaryTitle: "귤 수확 체험",
          summaryMentor: "이영자 농부",
          summaryImageSrc: jobTangerineFarmImage,
          unitPrice: 30000,
        },
        {
          badgeLabel: "6년 이어온",
          metaLabel: buildMetaLabel("이영자 농부", 10),
        },
        [
          {
            src: jobTangerineFarmImage,
            alt: "귤 수확 체험 대표 이미지",
          },
          {
            src: jobTangerineFarmImage,
            alt: "감귤 선별과 포장 체험 모습",
          },
        ],
        {
          startOffsetDays: 10,
          endOffsetDays: 24,
          timeLabel: "오전 10:00 - 12:00 (2시간)",
        },
      ),
    },
    detail: {
      slug: "tangerine-harvest",
      category: "tangerine",
      id: 202,
      title: "귤 수확 체험",
      introduction:
        "제철 귤을 직접 따고 선별하는 과정을 통해 농가의 하루를 체험합니다. 수확 후 간단한 포장 체험과 농장 소개를 포함해, 발표 데모에서 흐름이 잘 보이도록 구성한 mock 데이터입니다.",
      photoUrl: jobTangerineFarmImage,
      mentorName: "이영자 농부",
      experienceType: "체험",
      location: "제주시 조천읍",
      schedule: buildSchedule(10, "오전 10:00 - 12:00"),
      participantCount: 6,
      maxParticipants: 10,
      inclusions: ["수확 바구니", "시식 귤", "포장 체험"],
      requirements: ["모자 착용 권장", "편한 복장", "우천 시 일정 변경 가능"],
      summaryTitle: "귤 수확 체험",
      summaryMentor: "이영자 농부",
      summaryImageSrc: jobTangerineFarmImage,
      unitPrice: 30000,
    },
  },
  {
    category: "stone",
    card: {
      to: ROUTES.matchingDetail,
      imageSrc: jobTraditionalCraftImage,
      imageAlt: "전통 공예 공방 체험",
      badgeLabel: "10년 이어온",
      title: "전통 공예 공방 체험",
      metaLabel: buildMetaLabel("오명수 공예가", 14),
      description:
        "재료를 엮고 작은 생활 소품을 완성하는 제주 전통 공예 입문 체험입니다.",
      location: "제주시 한경면",
      tags: ["입문", "공예", "소품 만들기"],
      state: buildMatchingDetailState(
        {
          slug: "craft-workshop",
          category: "stone",
          id: 203,
          title: "전통 공예 공방 체험",
          introduction:
            "대나무와 천연 섬유를 활용해 작은 생활 소품을 직접 만드는 체험입니다. 재료 설명, 기본 엮기, 완성품 마감 순서로 구성되어 발표 시연에서 이해하기 쉽도록 정리된 mock 상세 데이터입니다.",
          photoUrl: jobTraditionalCraftImage,
          mentorName: "오명수 공예가",
          experienceType: "체험",
          location: "제주시 한경면",
          schedule: buildSchedule(14, "오후 2:00 - 5:00"),
          participantCount: 5,
          maxParticipants: 8,
          inclusions: ["재료 제공", "도구 대여", "완성품 포장"],
          requirements: ["실내화 착용", "초등학생 이상", "손 사용 가능"],
          summaryTitle: "전통 공예 공방 체험",
          summaryMentor: "오명수 공예가",
          summaryImageSrc: jobTraditionalCraftImage,
          unitPrice: 38000,
        },
        {
          badgeLabel: "10년 이어온",
          metaLabel: buildMetaLabel("오명수 공예가", 14),
        },
        [
          {
            src: jobTraditionalCraftImage,
            alt: "전통 공예 공방 체험 대표 이미지",
          },
          {
            src: jobStoneMasterImage,
            alt: "제주 전통 재료와 작업실 풍경",
          },
        ],
        {
          startOffsetDays: 14,
          endOffsetDays: 28,
          timeLabel: "오후 2:00 - 5:00 (3시간)",
        },
      ),
    },
    detail: {
      slug: "craft-workshop",
      category: "stone",
      id: 203,
      title: "전통 공예 공방 체험",
      introduction:
        "대나무와 천연 섬유를 활용해 작은 생활 소품을 직접 만드는 체험입니다. 재료 설명, 기본 엮기, 완성품 마감 순서로 구성되어 발표 시연에서 이해하기 쉽도록 정리된 mock 상세 데이터입니다.",
      photoUrl: jobTraditionalCraftImage,
      mentorName: "오명수 공예가",
      experienceType: "체험",
      location: "제주시 한경면",
      schedule: buildSchedule(14, "오후 2:00 - 5:00"),
      participantCount: 5,
      maxParticipants: 8,
      inclusions: ["재료 제공", "도구 대여", "완성품 포장"],
      requirements: ["실내화 착용", "초등학생 이상", "손 사용 가능"],
      summaryTitle: "전통 공예 공방 체험",
      summaryMentor: "오명수 공예가",
      summaryImageSrc: jobTraditionalCraftImage,
      unitPrice: 38000,
    },
  },
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

export const DEFAULT_MOCK_JOB_DETAIL = MATCHING_JOB_MOCKS[0].detail;
export const DEFAULT_MOCK_EXPERIENCE_DETAIL = MATCHING_EXPERIENCE_MOCKS[0].detail;

export function getMockJobDetailBySlug(slug?: string | null) {
  return MATCHING_JOB_MOCKS.find((item) => item.detail.slug === slug)?.detail;
}

export function getMockExperienceDetailBySlug(slug?: string | null) {
  return MATCHING_EXPERIENCE_MOCKS.find((item) => item.detail.slug === slug)?.detail;
}

export function getMockJobCardBySlug(slug?: string | null) {
  return MATCHING_JOB_MOCKS.find((item) => item.detail.slug === slug)?.card;
}

export function getMockExperienceCardBySlug(slug?: string | null) {
  return MATCHING_EXPERIENCE_MOCKS.find((item) => item.detail.slug === slug)?.card;
}

type MatchingDetailGalleryImage = {
  src: string;
  alt: string;
};

type MatchingDetailState = {
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
