import { useQuery } from "@tanstack/react-query";
import mentorCardImage from "@/assets/matching/mentor-card.jpg";
import { type ApiResponse, customFetch } from "@/api/fetcher";
import {
  asObject,
  getNumber,
  getString,
  getStringArray,
} from "@/api/response-helpers";
import type { MentorCardProps } from "@/shared/ui/cards";

export type MatchingCategoryKey =
  | "haenyeo"
  | "stone"
  | "horse"
  | "tangerine"
  | "all";

export type MatchingJobListItem = {
  id: string;
  category: Exclude<MatchingCategoryKey, "all">;
  card: MentorCardProps;
};

type JobsPagePayload = ApiResponse<unknown>;

const DEFAULT_JOB_IMAGE_ALT = "직업 매칭 카드 대표 이미지";
const DEFAULT_BADGE_LABEL = "직업 매칭";
const DEFAULT_DESCRIPTION =
  "현재 등록된 직업 정보를 바탕으로 제주 전통 일거리를 확인할 수 있습니다.";
const DEFAULT_LOCATION = "제주도";
const DEFAULT_MENTOR_NAME = "멘토 정보 준비중";

function toRecordArray(source: unknown) {
  if (Array.isArray(source)) {
    return source;
  }

  const record = asObject(source);

  if (!record) {
    return [];
  }

  const candidateKeys = ["content", "items", "jobs", "results"];

  for (const key of candidateKeys) {
    const value = record[key];

    if (Array.isArray(value)) {
      return value;
    }
  }

  return [];
}

function inferCategory(source: unknown): Exclude<MatchingCategoryKey, "all"> {
  const seed = [
    getString(source, ["jobType"], ""),
    getString(source, ["title", "jobTitle"], ""),
    getString(source, ["location", "address"], ""),
    ...getStringArray(source, ["skills"], []),
  ]
    .join(" ")
    .toLowerCase();

  if (seed.includes("해녀")) {
    return "haenyeo";
  }

  if (seed.includes("돌담")) {
    return "stone";
  }

  if (seed.includes("목장") || seed.includes("말")) {
    return "horse";
  }

  if (seed.includes("감귤") || seed.includes("귤")) {
    return "tangerine";
  }

  return "haenyeo";
}

function buildMetaLabel(source: unknown) {
  const mentorName = getString(
    source,
    ["mentorName", "mentor", "name"],
    DEFAULT_MENTOR_NAME,
  );
  const workHours = getString(source, ["workHours"], "");

  return workHours ? `${mentorName} · ${workHours}` : mentorName;
}

function mapJobItem(source: unknown, index: number): MatchingJobListItem {
  const jobId = getNumber(source, ["id", "jobId"], index + 1);
  const title = getString(source, ["title", "jobTitle"], `직업 ${jobId}`);
  const description = getString(
    source,
    ["introduction", "description", "introduce"],
    DEFAULT_DESCRIPTION,
  );
  const location = getString(
    source,
    ["location", "address"],
    DEFAULT_LOCATION,
  );
  const tags = getStringArray(source, ["skills"], []);
  const imageSrc = getString(
    source,
    ["mainUrl", "photoUrl", "imageUrl", "thumbnailUrl"],
    mentorCardImage,
  );
  const badgeLabel = getString(
    source,
    ["jobType", "physicalLevel"],
    DEFAULT_BADGE_LABEL,
  );

  return {
    id: String(jobId),
    category: inferCategory(source),
    card: {
      to: `/jobs/${jobId}`,
      imageSrc,
      imageAlt: title || DEFAULT_JOB_IMAGE_ALT,
      badgeLabel,
      title,
      metaLabel: buildMetaLabel(source),
      description,
      location,
      tags: tags.length > 0 ? tags : [badgeLabel],
    },
  };
}

async function fetchMatchingJobList() {
  const response = await customFetch<JobsPagePayload>("/jobs", {
    params: {
      page: 0,
      size: 20,
      sort: ["id,desc"],
    },
  });

  return toRecordArray(response.data).map((item, index) => mapJobItem(item, index));
}

export function useMatchingJobListView() {
  return useQuery({
    queryKey: ["matching-jobs"],
    queryFn: fetchMatchingJobList,
    staleTime: 60_000,
  });
}
