const MATCHING_DETAIL_EXPERIENCE_QUERY_KEY = "experienceSlug";
const MATCHING_DETAIL_CATEGORY_QUERY_KEY = "category";

export const ROUTES = {
  home: "/",
  mentorHome: "/mentor/home",
  matching: "/matching",
  jobDetail: "/jobs/haenyeo",
  jobDetailPattern: "/jobs/:jobSlug",
  matchingDetail: "/matching/detail",
  matchingDetailPattern: "/matching/detail",
  experienceDetail: "/experiences/horse-farm-day",
  experienceDetailPattern: "/experiences/:experienceSlug",
  reservation: "/reservation",
  onboarding: "/onboarding",
  register: "/register",
  login: "/login",
  my: "/my",
  mentorMy: "/mentor/my",
  mentorPost: "/mentor/post",
  components: "/components",
  mentorPreview: "/mentors/stone-master",
  tokens: "/tokens",
  mentorWrite: "/mentor/write",
} as const;

export type MatchingDetailRouteParams = {
  experienceSlug?: string | null;
  category?: string | null;
};

function sanitizeRouteSegment(slug: string) {
  return encodeURIComponent(slug.trim());
}

function buildSearchParams(params: MatchingDetailRouteParams) {
  const searchParams = new URLSearchParams();

  if (params.experienceSlug) {
    searchParams.set(
      MATCHING_DETAIL_EXPERIENCE_QUERY_KEY,
      params.experienceSlug,
    );
  }

  if (params.category) {
    searchParams.set(MATCHING_DETAIL_CATEGORY_QUERY_KEY, params.category);
  }

  const serialized = searchParams.toString();

  return serialized ? `?${serialized}` : "";
}

export function getJobDetailRoute(jobSlug: string) {
  return `/jobs/${sanitizeRouteSegment(jobSlug)}`;
}

export function getExperienceDetailRoute(experienceSlug: string) {
  return `/experiences/${sanitizeRouteSegment(experienceSlug)}`;
}

export function getMatchingDetailRoute(params: MatchingDetailRouteParams = {}) {
  return `${ROUTES.matchingDetail}${buildSearchParams(params)}`;
}

export function parseMatchingDetailRouteSearch(search: string) {
  const searchParams = new URLSearchParams(search);

  return {
    experienceSlug:
      searchParams.get(MATCHING_DETAIL_EXPERIENCE_QUERY_KEY) ?? undefined,
    category: searchParams.get(MATCHING_DETAIL_CATEGORY_QUERY_KEY) ?? undefined,
  } satisfies MatchingDetailRouteParams;
}
