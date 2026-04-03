import { useMatchingJobListView } from "@/features/jobs/api/useMatchingJobListView";
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
import { Box, Text, VStack } from "@vapor-ui/core";
import { ChevronLeftOutlineIcon } from "@vapor-ui/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type MatchingKind = "job" | "experience";

const CONTENT_WIDTH_PX = 358;
const TOP_SURFACE_BG = "rgba(255, 255, 255, 0.9)";

function ToggleButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
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

function MentorPostHeader({ onBack }: { onBack: () => void }) {
  return (
    <Box
      $css={{
        backgroundColor: TOP_SURFACE_BG,
      }}
    >
      <Box
        $css={{
          paddingTop: "max(8px, env(safe-area-inset-top))",
          backgroundColor: TOP_SURFACE_BG,
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
              backgroundColor: TOP_SURFACE_BG,
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
            내 게시물 보기
          </Text>
          <Box $css={{ width: "40px", height: "40px" }} />
        </Box>
      </Box>
    </Box>
  );
}

export function MentorPostPage() {
  const navigate = useNavigate();
  const [selectedKind, setSelectedKind] = useState<MatchingKind>("job");
  const jobListQuery = useMatchingJobListView();
  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate(ROUTES.home);
  };

  const apiJobCards: MentorCardProps[] = getRecordCollection(jobListQuery.data?.data).map((item) => {
    const id = getNumber(item, "id");
    const title = getString(item, "title") ?? "";
    const metaLabel = [
      getString(item, "workHours"),
      getString(item, "physicalLevel"),
    ]
      .filter((value): value is string => Boolean(value))
      .join(" · ");

    return {
      to: typeof id === "number" ? `/jobs/${id}` : ROUTES.mentorPost,
      imageSrc: getString(item, "mainUrl"),
      imageAlt: title ? `${title} 이미지` : "직업 이미지",
      badgeLabel: getString(item, "jobType"),
      title,
      metaLabel: metaLabel || undefined,
      description: getString(item, "introduction"),
      location: getString(item, "location"),
      tags: getStringList(item, "skills"),
    };
  });
  const fallbackJobCards = FALLBACK_MATCHING_JOB_ITEMS.map((item) => item.card);
  const fallbackExperienceCards = FALLBACK_MATCHING_EXPERIENCE_ITEMS.map(
    (item) => item.card,
  );
  const cards = selectedKind === "job"
    ? (apiJobCards.length > 0 ? apiJobCards : fallbackJobCards)
    : fallbackExperienceCards;

  const listStatus =
    selectedKind === "job"
      ? jobListQuery.isError && fallbackJobCards.length === 0
        ? {
            tone: "error" as const,
            message: jobListQuery.error.message,
            onRetry: () => {
              void jobListQuery.refetch();
            },
          }
        : null
      : null;

  const showEmptyState = !listStatus && cards.length === 0;
  const totalLabel = `총 ${cards.length}개`;

  return (
    <Box
      render={<section />}
      $css={{
        width: "100%",
        height: "100dvh",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#F7F7F7",
        overflow: "hidden",
      }}
    >
      <MentorPostHeader onBack={handleBack} />

      <Box
        $css={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          backgroundColor: "#F7F7F7",
        }}
      >
        <VStack
          $css={{
            width: "100%",
            maxWidth: `${CONTENT_WIDTH_PX}px`,
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
              <ToggleButton
                active={selectedKind === "job"}
                label="직업"
                onClick={() => setSelectedKind("job")}
              />
              <ToggleButton
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
                  등록된 게시글이 없습니다.
                </Text>
              </Box>
            ) : null}

            {!listStatus &&
              cards.map((card: MentorCardProps, index: number) => (
                <MentorCard key={`${card.title}-${index}`} {...card} />
              ))}
          </VStack>
        </VStack>
      </Box>

      <Box $css={{ flexShrink: 0 }}>
        <BottomNavigation />
      </Box>
    </Box>
  );
}
