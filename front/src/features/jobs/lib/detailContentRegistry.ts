export const MATCHING_FALLBACK_CATEGORIES = [
  "haenyeo",
  "stone",
  "horse",
  "tangerine",
] as const;

export type MatchingFallbackCategory =
  (typeof MATCHING_FALLBACK_CATEGORIES)[number];

export type DetailMentorRosterEntry = {
  name: string;
  age: number;
  bio: string;
  location: string;
  tags: readonly string[];
  careerLabel?: string;
  highlightLabel?: string;
};

export type CategoryRouteDefinition = {
  category: MatchingFallbackCategory;
  categoryLabel: string;
  jobSlug: string;
  jobSlugAliases: readonly string[];
  experienceSlug: string;
  experienceSlugAliases: readonly string[];
};

export type CategoryExperienceContent = {
  category: MatchingFallbackCategory;
  categoryLabel: string;
  title: string;
  oneLineSummary: string;
  introduction: string;
  inclusions: readonly string[];
  requirements: readonly string[];
};

const CATEGORY_ROUTE_DEFINITIONS: Record<
  MatchingFallbackCategory,
  CategoryRouteDefinition
> = {
  haenyeo: {
    category: "haenyeo",
    categoryLabel: "해녀",
    jobSlug: "haenyeo",
    jobSlugAliases: [],
    experienceSlug: "haenyeo-diving",
    experienceSlugAliases: [],
  },
  stone: {
    category: "stone",
    categoryLabel: "돌담 장인",
    jobSlug: "stone",
    jobSlugAliases: ["traditional-craft"],
    experienceSlug: "stone-wall-workshop",
    experienceSlugAliases: ["craft-workshop"],
  },
  horse: {
    category: "horse",
    categoryLabel: "목장주",
    jobSlug: "horse",
    jobSlugAliases: [],
    experienceSlug: "horse-farm-day",
    experienceSlugAliases: [],
  },
  tangerine: {
    category: "tangerine",
    categoryLabel: "감귤 농가",
    jobSlug: "tangerine",
    jobSlugAliases: [],
    experienceSlug: "tangerine-harvest",
    experienceSlugAliases: [],
  },
};

const CATEGORY_EXPERIENCE_CONTENT: Record<
  MatchingFallbackCategory,
  CategoryExperienceContent
> = {
  haenyeo: {
    category: "haenyeo",
    categoryLabel: "해녀",
    title: "해녀 체험",
    oneLineSummary: "제주 해녀님과 함께하는 전통 물질 체험입니다.",
    introduction:
      "제주 해녀님과 함께하는 전통 물질 체험입니다. 참가자는 실제 해녀복을 착용하고 바다에 들어가, 해녀님이 사용하는 채취 방식과 호흡법을 배우며 해산물을 직접 채취해보는 경험을 하게 됩니다. 단순한 체험이 아니라, 해녀가 바다와 공존하며 살아온 삶의 방식과 노동의 가치를 가까이에서 느낄 수 있습니다. 초보자도 참여할 수 있도록 구명조끼와 안전 장비가 제공되며, 전 과정은 해녀님의 지도와 안전 관리 하에 진행됩니다. 체험 이후에는 직접 채취한 해산물을 함께 나누며 제주 해녀 문화에 대한 이해를 더욱 깊게 할 수 있습니다.",
    inclusions: [
      "해녀복 대여",
      "구명조끼 및 안전 장비",
      "해녀 물질 기본 교육",
      "해녀 동행 체험 진행",
      "해산물 채취 체험",
      "채취 해산물 시식",
      "전문 안전요원 배치",
      "사진 촬영 서비스",
      "샤워 및 탈의 공간 제공",
      "제주 해녀 문화 설명",
    ],
    requirements: [
      "수영 가능자",
      "건강한 신체 (심혈관 질환 없음)",
      "8세 이상",
      "음주 상태 참여 불가",
      "임산부 참여 제한",
      "안전 교육 필수 이수",
      "현장 안전 지침 준수",
      "기상 상황에 따른 일정 변경 동의",
      "보호자 동의 (미성년자)",
      "책임 동의서 작성 필수",
    ],
  },
  stone: {
    category: "stone",
    categoryLabel: "돌담 장인",
    title: "돌담 장인 체험",
    oneLineSummary:
      "제주 돌담 장인과 함께 바람을 견디는 전통 돌담을 직접 쌓아보는 체험입니다.",
    introduction:
      "제주 돌담 장인과 함께 바람과 자연을 견디는 전통 돌담을 직접 쌓아보는 체험입니다. 참가자는 장인의 시연을 통해 제주 돌담의 구조와 원리를 배우고, 실제 돌을 하나하나 쌓으며 손으로 만드는 건축 기술을 경험하게 됩니다. 제주 돌담은 단순한 담장이 아니라 바람을 흘려보내고, 땅의 형태에 맞춰 쌓는 지혜가 담긴 구조물로, 이 체험을 통해 자연과 공존하는 제주만의 건축 철학을 이해할 수 있습니다. 장인의 지도 아래 안전하게 진행되며, 단순한 만들기를 넘어 오랜 시간 축적된 기술과 감각을 직접 느낄 수 있는 경험입니다.",
    inclusions: [
      "돌담 쌓기 기초 교육",
      "장인 직접 시연",
      "실습용 돌 및 도구 제공",
      "개인 실습 체험",
      "안전 장갑 및 보호 장비",
      "완성 작품 사진 촬영",
      "제주 돌담 역사 설명",
      "장인과 Q&A 시간",
      "간단 간식 제공",
      "체험 인증서 제공",
    ],
    requirements: [
      "기본 체력 보유자",
      "야외 활동 가능자",
      "10세 이상",
      "장시간 서 있기 가능",
      "손 사용 작업 가능자",
      "안전 수칙 준수",
      "작업 지시 따를 것",
      "임산부 참여 제한",
      "날씨 영향 동의",
      "책임 동의서 작성",
    ],
  },
  horse: {
    category: "horse",
    categoryLabel: "목장주",
    title: "목장주 체험",
    oneLineSummary:
      "제주 목장주와 함께 말을 돌보고 관리하는 일상을 경험하는 체험입니다.",
    introduction:
      "제주 목장주와 함께 말을 돌보고 관리하는 일상을 경험하는 체험입니다. 참가자는 말에게 먹이를 주고, 털을 정리하며 교감하는 과정을 통해 단순한 동물 체험이 아닌 목장 운영의 실제를 이해하게 됩니다. 또한 목장주의 설명을 통해 말 사육, 관리, 운영 방식 등 목장 산업 전반에 대한 이야기를 들을 수 있습니다. 일부 프로그램에서는 승마 체험도 함께 진행되어, 말과의 관계를 보다 깊게 경험할 수 있습니다. 이 체험은 자연 속에서 이루어지는 노동과 책임, 그리고 생명을 다루는 직업의 의미를 직접 느낄 수 있는 기회를 제공합니다.",
    inclusions: [
      "말 먹이주기 체험",
      "말 손질 및 관리 체험",
      "목장 운영 설명",
      "승마 체험 (선택)",
      "안전 장비 제공",
      "사진 촬영",
      "목장 투어",
      "전문가 지도",
      "휴식 공간 제공",
      "체험 인증서 제공",
    ],
    requirements: [
      "동물 알레르기 없는 자",
      "기본 체력 보유",
      "10세 이상",
      "안전 교육 필수",
      "동물 접촉 가능자",
      "안전 수칙 준수",
      "보호자 동의 (미성년자)",
      "임산부 제한",
      "위험 행동 금지",
      "책임 동의서 작성",
    ],
  },
  tangerine: {
    category: "tangerine",
    categoryLabel: "감귤 농가",
    title: "감귤 농가 체험",
    oneLineSummary:
      "감귤 수확부터 선별, 포장까지 제주 농가의 하루를 직접 경험하는 체험입니다.",
    introduction:
      "제주 감귤 농가에서 수확 시기에 맞춰 감귤을 직접 따고 선별하는 체험입니다. 참가자는 농부의 안내에 따라 감귤 따기와 선별, 포장 과정을 차례로 경험하며 계절에 따라 달라지는 재배와 관리의 흐름을 배우게 됩니다. 단순한 수확 체험을 넘어 제주 농업이 자연과 함께 운영되는 방식과 농부의 일상을 가까이에서 이해할 수 있으며, 현장에서 수확한 감귤을 시식하거나 일부를 가져갈 수 있어 제주 농가의 현실을 더욱 생생하게 느낄 수 있습니다.",
    inclusions: [
      "감귤 수확 체험",
      "선별 및 포장 체험",
      "농가 운영 설명",
      "작업 도구 제공",
      "수확 감귤 시식",
      "일정량 감귤 제공",
      "사진 촬영",
      "농부와 대화 시간",
      "휴식 공간 제공",
      "체험 인증 제공",
    ],
    requirements: [
      "야외 활동 가능자",
      "기본 체력 필요",
      "8세 이상",
      "농작업 참여 가능자",
      "장시간 이동 가능",
      "벌/곤충 알레르기 없는 자",
      "안전 지침 준수",
      "보호자 동의 (미성년자)",
      "날씨 영향 동의",
      "책임 동의서 작성",
    ],
  },
};

const CATEGORY_MENTOR_ROSTERS: Record<
  MatchingFallbackCategory,
  readonly DetailMentorRosterEntry[]
> = {
  haenyeo: [
    {
      name: "김영숙 멘토",
      age: 68,
      bio: "30년 넘게 바다에서 물질해온 해녀입니다. 숨비소리부터 해산물 채취까지 실제 해녀의 삶을 전해드립니다.",
      location: "제주시 구좌읍",
      tags: ["물질", "해산물채취", "바다안전"],
      careerLabel: "45년 경력",
      highlightLabel: "제주특별자치도 무형문화재",
    },
    {
      name: "고순자 멘토",
      age: 72,
      bio: "어릴 때부터 물질을 배워온 해녀로, 계절에 따라 달라지는 바다의 흐름과 해산물 이야기를 들려드립니다.",
      location: "서귀포시 성산읍",
      tags: ["해녀생활", "바다지식", "전통기술"],
      careerLabel: "45년 경력",
      highlightLabel: "해녀 기능 보유자",
    },
    {
      name: "양미자 멘토",
      age: 65,
      bio: "초보자도 안전하게 물질을 체험할 수 있도록 지도하며, 해녀 공동체 문화도 함께 소개합니다.",
      location: "제주시 한림읍",
      tags: ["물질체험", "해녀문화", "안전교육"],
      careerLabel: "38년 경력",
      highlightLabel: "현장 체험 지도자",
    },
    {
      name: "이정희 멘토",
      age: 70,
      bio: "평생 바다에서 살아온 경험을 바탕으로 해녀의 삶과 자연과 공존하는 방식을 알려드립니다.",
      location: "서귀포시 표선면",
      tags: ["바다삶", "해녀정신", "자연공존"],
      careerLabel: "47년 경력",
      highlightLabel: "제주 해녀 문화 해설",
    },
  ],
  stone: [
    {
      name: "오상철 멘토",
      age: 67,
      bio: "제주 돌담을 40년 넘게 쌓아온 장인으로, 바람을 견디는 돌쌓기 기술을 직접 알려드립니다.",
      location: "제주시 애월읍",
      tags: ["돌담쌓기", "전통기술", "제주건축"],
    },
    {
      name: "강두식 멘토",
      age: 73,
      bio: "돌의 모양과 방향을 읽어 담을 쌓는 제주식 기술을 전수하며, 실제 작업 방식 그대로 체험할 수 있습니다.",
      location: "서귀포시 안덕면",
      tags: ["장인기술", "돌선별", "전통공법"],
    },
    {
      name: "문창수 멘토",
      age: 64,
      bio: "돌담 보수 작업을 전문으로 하며, 무너지지 않는 담을 만드는 원리를 쉽게 설명해드립니다.",
      location: "제주시 조천읍",
      tags: ["돌담보수", "실습체험", "건축원리"],
    },
    {
      name: "박영길 멘토",
      age: 69,
      bio: "제주 자연과 어우러지는 돌담의 의미와 함께 장인의 노하우를 직접 체험할 수 있습니다.",
      location: "서귀포시 대정읍",
      tags: ["제주돌담", "자연건축", "장인정신"],
    },
  ],
  horse: [
    {
      name: "김성훈 멘토",
      age: 63,
      bio: "말을 직접 키우고 관리하는 목장주로, 먹이주기부터 관리까지 실제 목장 운영을 체험할 수 있습니다.",
      location: "서귀포시 표선면",
      tags: ["말관리", "목장체험", "동물교감"],
    },
    {
      name: "박준호 멘토",
      age: 59,
      bio: "말 사육과 승마 체험을 함께 운영하며, 제주 말 산업에 대해 쉽게 설명해드립니다.",
      location: "제주시 애월읍",
      tags: ["승마체험", "말산업", "목장운영"],
    },
    {
      name: "이은정 멘토",
      age: 55,
      bio: "가족 단위 목장을 운영하며, 초보자도 쉽게 참여할 수 있는 체험 프로그램을 진행합니다.",
      location: "서귀포시 안덕면",
      tags: ["가족체험", "말돌봄", "초보가능"],
    },
    {
      name: "고재석 멘토",
      age: 68,
      bio: "오랜 경험을 바탕으로 말과 교감하는 방법과 목장의 하루를 직접 보여드립니다.",
      location: "제주시 구좌읍",
      tags: ["말교감", "목장일상", "전통목장"],
    },
  ],
  tangerine: [
    {
      name: "김태현 멘토",
      age: 61,
      bio: "20년째 감귤 농사를 짓고 있으며, 수확부터 선별까지 실제 농가의 하루를 함께 경험할 수 있습니다.",
      location: "서귀포시 남원읍",
      tags: ["감귤수확", "농가체험", "선별작업"],
    },
    {
      name: "이경숙 멘토",
      age: 66,
      bio: "감귤 재배의 계절별 관리 방법과 농부의 일상을 직접 보여드립니다.",
      location: "제주시 조천읍",
      tags: ["감귤재배", "농업기초", "계절작업"],
    },
    {
      name: "강민수 멘토",
      age: 58,
      bio: "청년 농업인으로, 기존 농업과 새로운 방식의 농가 운영을 함께 소개합니다.",
      location: "서귀포시 표선면",
      tags: ["청년농부", "농업창업", "스마트농업"],
    },
    {
      name: "오영자 멘토",
      age: 70,
      bio: "오랜 경험을 바탕으로 감귤 농사의 노하우와 실제 수익 구조까지 솔직하게 알려드립니다.",
      location: "제주시 한림읍",
      tags: ["농사노하우", "감귤유통", "현실농업"],
    },
  ],
};

function findCategoryBySlug(
  slug: string | null | undefined,
  key: "jobSlug" | "experienceSlug",
) {
  if (!slug) {
    return undefined;
  }

  return MATCHING_FALLBACK_CATEGORIES.find((category) => {
    const definition = CATEGORY_ROUTE_DEFINITIONS[category];
    const aliases =
      key === "jobSlug"
        ? definition.jobSlugAliases
        : definition.experienceSlugAliases;

    return definition[key] === slug || aliases.includes(slug);
  });
}

export function getCategoryRouteDefinition(
  category: MatchingFallbackCategory,
): CategoryRouteDefinition {
  return CATEGORY_ROUTE_DEFINITIONS[category];
}

export function getCanonicalJobSlug(category: MatchingFallbackCategory) {
  return CATEGORY_ROUTE_DEFINITIONS[category].jobSlug;
}

export function getCanonicalExperienceSlug(category: MatchingFallbackCategory) {
  return CATEGORY_ROUTE_DEFINITIONS[category].experienceSlug;
}

export function getCategoryByJobSlug(slug?: string | null) {
  return findCategoryBySlug(slug, "jobSlug");
}

export function getCategoryByExperienceSlug(slug?: string | null) {
  return findCategoryBySlug(slug, "experienceSlug");
}

export function getCategoryExperienceContent(category: MatchingFallbackCategory) {
  return CATEGORY_EXPERIENCE_CONTENT[category];
}

export function getCategoryExperienceContentBySlug(slug?: string | null) {
  const category = getCategoryByExperienceSlug(slug);

  return category ? CATEGORY_EXPERIENCE_CONTENT[category] : undefined;
}

export function getCategoryMentorRoster(category: MatchingFallbackCategory) {
  return CATEGORY_MENTOR_ROSTERS[category];
}

export function getCategoryMentorRosterByJobSlug(slug?: string | null) {
  const category = getCategoryByJobSlug(slug);

  return category ? CATEGORY_MENTOR_ROSTERS[category] : undefined;
}
