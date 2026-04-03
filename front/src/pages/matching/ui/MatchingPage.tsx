import {
  Box,
  Text,
  VStack,
} from "@vapor-ui/core";
import { ChevronLeftOutlineIcon } from "@vapor-ui/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useMatchingJobListView,
  type MatchingCategoryKey,
} from "@/features/jobs/api/useMatchingJobListView";
import {
  FALLBACK_MATCHING_EXPERIENCE_ITEMS,
  FALLBACK_MATCHING_JOB_ITEMS,
} from "@/features/jobs/lib/fallbackMatchingCards";
import { ROUTES } from "@/shared/config/routes";
import {
  getNumber,
  getRecordCollection,
  getString,
  getStringList,
} from "@/shared/lib/apiData";
import { MentorCard, type MentorCardProps } from "@/shared/ui/cards";
import { BottomNavigation } from "@/shared/ui/navigation/BottomNavigation";
import { QueryNotice } from "@/shared/ui/states/QueryNotice";

type MatchingKind = "job" | "experience";
type MatchingCategory = MatchingCategoryKey;

type CategoryOption = {
  value: MatchingCategory;
  label: string;
  emoji?: string;
};

const CATEGORY_OPTIONS: readonly CategoryOption[] = [
  { value: "all", label: "전체" },
  { value: "haenyeo", label: "해녀", emoji: "🤿" },
  { value: "stone", label: "돌담", emoji: "🧱" },
  { value: "horse", label: "말 농장", emoji: "🐴" },
  { value: "tangerine", label: "귤 농장", emoji: "🍊" },
] as const;

const MATCHING_PAGE_BG = "#F7F7F7";
const MATCHING_TOP_SURFACE_BG = "rgba(255, 255, 255, 0.9)";
const MATCHING_CONTENT_WIDTH_PX = 358;

function normalizeCategoryValue(value?: string) {
  return value
    ?.trim()
    .toLowerCase()
    .replaceAll("_", "")
    .replaceAll("-", "")
    .replaceAll(" ", "");
}

function matchesCategory(jobType: string | undefined, category: MatchingCategory) {
  if (category === "all") {
    return true;
  }

  const normalizedValue = normalizeCategoryValue(jobType);

  if (!normalizedValue) {
    return false;
  }

  const categoryMap: Record<Exclude<MatchingCategory, "all">, string[]> = {
    haenyeo: ["haenyeo", "해녀"],
    stone: ["stone", "doldam", "돌담"],
    horse: ["horse", "mokjang", "말농장", "목장"],
    tangerine: ["tangerine", "gamgyul", "귤농장", "감귤"],
  };

  return categoryMap[category].some((item) => normalizedValue.includes(item));
}

type MatchingChipProps = {
  selected: boolean;
  onClick: () => void;
  label: string;
  emoji?: string;
};

function MatchingChip({
  selected,
  onClick,
  label,
  emoji,
}: MatchingChipProps) {
  return (
    <Box
      render={<button type="button" onClick={onClick} />}
      $css={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: emoji ? "8px" : "0",
        height: "40px",
        minWidth: emoji ? "auto" : "62px",
        paddingLeft: emoji ? "16px" : "18px",
        paddingRight: emoji ? "16px" : "18px",
        border: "none",
        borderRadius: "999px",
        backgroundColor: selected ? "#262626" : "#F7F7F7",
        color: selected ? "#FFFFFF" : "#262626",
        cursor: "pointer",
        flexShrink: 0,
      }}
    >
      {emoji ? (
        <Text
          $css={{
            fontSize: "16px",
            lineHeight: "24px",
          }}
        >
          {emoji}
        </Text>
      ) : null}
      <Text
        typography="subtitle1"
        $css={{
          color: "inherit",
          fontWeight: 500,
          letterSpacing: emoji ? "-0.15px" : "-0.1px",
        }}
      >
        {label}
      </Text>
    </Box>
  );
}

type MatchingToggleButtonProps = {
  active: boolean;
  label: string;
  onClick: () => void;
};

function MatchingToggleButton({
  active,
  label,
  onClick,
}: MatchingToggleButtonProps) {
  return (
    <Box
      render={<button type="button" onClick={onClick} />}
      $css={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "52px",
        height: "32px",
        paddingInline: "12px",
        borderRadius: "8px",
        border: active ? "none" : "1px solid #C6C6C6",
        backgroundColor: active ? "#1CB3CB" : "#FFFFFF",
        color: active ? "#FFFFFF" : "#5D5D5D",
        cursor: "pointer",
      }}
    >
      <Text
        typography="subtitle1"
        $css={{
          color: "inherit",
          fontWeight: 500,
          letterSpacing: "-0.1px",
        }}
      >
        {label}
      </Text>
    </Box>
  );
}

function MatchingHeader({
  onBack,
}: {
  onBack: () => void;
}) {
  return (
    <Box
      $css={{
        backgroundColor: MATCHING_TOP_SURFACE_BG,
      }}
    >
      <Box
        $css={{
          paddingTop: "max(8px, env(safe-area-inset-top))",
          backgroundColor: MATCHING_TOP_SURFACE_BG,
        }}
      >
        <Box
          $css={{
            display: "grid",
            gridTemplateColumns: "40px 1fr 40px",
            alignItems: "center",
            height: "56px",
          }}
        >
          <Box
            render={<button type="button" onClick={onBack} aria-label="뒤로가기" />}
            $css={{
              width: "40px",
              height: "40px",
              display: "grid",
              placeItems: "center",
              border: "none",
              borderRadius: "999px",
              backgroundColor: MATCHING_TOP_SURFACE_BG,
              cursor: "pointer",
            }}
          >
            <ChevronLeftOutlineIcon
              size={20}
              color="var(--vapor-color-gray-900, #262626)"
            />
          </Box>
          <Text
            render={<h1 />}
            $css={{
              justifySelf: "center",
              color: "#0F172B",
              fontFamily:
                '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif',
              fontSize: "20px",
              lineHeight: "28px",
              fontWeight: 700,
              letterSpacing: "-0.45px",
            }}
          >
            매칭하기
          </Text>
          <Box $css={{ width: "40px", height: "40px" }} />
        </Box>
      </Box>
    </Box>
  );
}

export function MatchingPage() {
  const navigate = useNavigate();
  const [selectedKind, setSelectedKind] = useState<MatchingKind>("job");
  const [selectedCategory, setSelectedCategory] = useState<MatchingCategory>("all");
  const jobListQuery = useMatchingJobListView();
  const apiJobItems = getRecordCollection(jobListQuery.data?.data)
    .filter((item) => matchesCategory(getString(item, "jobType"), selectedCategory))
    .map((item) => {
      const id = getNumber(item, "id");
      const title = getString(item, "title") ?? "";
      const metaLabel = [
        getString(item, "workHours"),
        getString(item, "physicalLevel"),
      ]
        .filter((value): value is string => Boolean(value))
        .join(" · ");

      return {
        to: typeof id === "number" ? `/jobs/${id}` : ROUTES.matching,
        imageSrc: getString(item, "mainUrl"),
        imageAlt: title ? `${title} 이미지` : "직업 이미지",
        badgeLabel: getString(item, "jobType"),
        title,
        metaLabel: metaLabel || undefined,
        description: getString(item, "introduction"),
        location: getString(item, "location"),
        tags: getStringList(item, "skills"),
      } satisfies MentorCardProps;
    });
  const fallbackJobItems = FALLBACK_MATCHING_JOB_ITEMS
    .filter((item) => selectedCategory === "all" || item.category === selectedCategory)
    .map((item) => item.card);
  const fallbackExperienceItems = FALLBACK_MATCHING_EXPERIENCE_ITEMS
    .filter((item) => selectedCategory === "all" || item.category === selectedCategory)
    .map((item) => item.card);
  const visibleItems = selectedKind === "job"
    ? (apiJobItems.length > 0 ? apiJobItems : fallbackJobItems)
    : fallbackExperienceItems;

  const listStatus = selectedKind === "job"
    ? jobListQuery.isError && fallbackJobItems.length === 0
      ? {
        tone: "error" as const,
        message: jobListQuery.error.message,
        onRetry: () => {
          void jobListQuery.refetch();
        },
      }
      : null
    : null;

  const totalCount = visibleItems.length;
  const emptyMessage = selectedKind === "job"
    ? "등록된 직업 매칭이 없습니다."
    : "등록된 체험 매칭이 없습니다.";
  const showEmptyState = !listStatus && totalCount === 0;
  const totalLabel = `총 ${totalCount}개`;

  const renderCards = () =>
    visibleItems.map((item) => (
      <MentorCard
        key={`${item.to}-${item.title}`}
        {...item}
      />
    ));

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate(ROUTES.home);
  };

  return (
    <Box
      $css={{
        width: "100%",
        height: "100dvh",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: MATCHING_PAGE_BG,
        overflow: "hidden",
      }}
    >
      <MatchingHeader onBack={handleBack} />

      <Box
        $css={{
          backgroundColor: MATCHING_TOP_SURFACE_BG,
          paddingTop: "16px",
          paddingBottom: "16px",
        }}
      >
        <Box
          render={<div className="u-hide-scrollbar" />}
          $css={{
            display: "flex",
            gap: "8px",
            overflowX: "auto",
            paddingInline: "16px",
          }}
        >
          {CATEGORY_OPTIONS.map((option) => (
            <MatchingChip
              key={option.value}
              selected={selectedCategory === option.value}
              onClick={() => setSelectedCategory(option.value)}
              label={option.label}
              emoji={option.emoji}
            />
          ))}
        </Box>
      </Box>

      <Box
        $css={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          backgroundColor: MATCHING_PAGE_BG,
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <VStack
          $css={{
            width: "100%",
            maxWidth: `${MATCHING_CONTENT_WIDTH_PX}px`,
            marginInline: "auto",
            gap: "16px",
            paddingTop: "24px",
            paddingBottom: "24px",
          }}
        >
          <Box
            $css={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
            }}
          >
            <Text
              render={<p />}
              typography="body2"
              $css={{
                color: "#393939",
                fontWeight: 400,
                letterSpacing: "-0.1px",
              }}
            >
              {totalLabel}
            </Text>

            <Box
              $css={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <MatchingToggleButton
                active={selectedKind === "job"}
                label="직업"
                onClick={() => setSelectedKind("job")}
              />
              <MatchingToggleButton
                active={selectedKind === "experience"}
                label="체험"
                onClick={() => setSelectedKind("experience")}
              />
            </Box>
          </Box>

          <VStack
            $css={{
              gap: "16px",
            }}
          >
            {listStatus ? (
              <QueryNotice
                tone={listStatus.tone}
                message={listStatus.message}
                onRetry={listStatus.onRetry}
              />
            ) : null}

            {showEmptyState ? (
              <Box
                $css={{
                  width: "100%",
                  borderRadius: "16px",
                  border: "1px solid #E2E8F0",
                  backgroundColor: "#FFFFFF",
                  padding: "20px",
                  boxSizing: "border-box",
                }}
              >
                <Text
                  render={<p />}
                  $css={{
                    color: "#767676",
                    fontSize: "14px",
                    lineHeight: "22px",
                    fontWeight: 500,
                    letterSpacing: "-0.1px",
                  }}
                >
                  {emptyMessage}
                </Text>
              </Box>
            ) : null}

            {!showEmptyState ? renderCards() : null}
          </VStack>
        </VStack>
      </Box>

      <Box
        $css={{
          flexShrink: 0,
        }}
      >
        <BottomNavigation />
      </Box>
    </Box>
  );
}
