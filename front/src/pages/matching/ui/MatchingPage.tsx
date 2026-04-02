import {
  Box,
  Text,
  VStack,
} from "@vapor-ui/core";
import { ChevronLeftOutlineIcon } from "@vapor-ui/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import mentorCardImage from "@/assets/matching/mentor-card.jpg";
import type { MatchingDetailState } from "@/pages/matching-detail";
import { ROUTES } from "@/shared/config/routes";
import { MentorCard, type MentorCardProps } from "@/shared/ui/cards";
import { BottomNavigation } from "@/shared/ui/navigation/BottomNavigation";

type MatchingKind = "job" | "experience";
type MatchingCategory = "all" | "haenyeo" | "stone" | "horse" | "tangerine";

type MatchingItem = {
  id: string;
  kind: MatchingKind;
  category: Exclude<MatchingCategory, "all">;
  card: MentorCardProps;
};

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
const MATCHING_DETAIL_SCHEDULE = "2026년 4월 15일 ~ 2026년 5월 15일";
const MATCHING_DETAIL_TIME = "오전 9:00 - 12:00 (3시간)";
const MATCHING_DETAIL_PARTICIPANTS = "5/8명";
const MATCHING_DETAIL_REQUIREMENTS = ["수영 가능자", "건강한 신체", "8세 이상"] as const;
const MATCHING_DETAIL_INCLUDED_ITEMS = [
  "해녀복 대여",
  "안전 장비",
  "해산물 시식",
  "사진 촬영 서비스",
] as const;

function normalizeDeadlineLabel(label: string) {
  const trimmed = label.trim();

  if (/^D-\d+$/i.test(trimmed)) {
    return trimmed.replace("D-", "D - ");
  }

  return trimmed;
}

function getMentorSummary(metaLabel: string) {
  const [mentorName = "김영숙 해녀", deadline = "D-20"] = metaLabel
    .split("·")
    .map((part) => part.trim());

  const mentorInitial =
    mentorName.replace(/[^0-9A-Za-z가-힣]/g, "").charAt(0) || "김";

  return {
    mentorInitial,
    mentorName,
    deadlineLabel: normalizeDeadlineLabel(deadline),
  };
}

function buildMatchingDetailState(item: MatchingItem): MatchingDetailState {
  const { mentorInitial, mentorName, deadlineLabel } = getMentorSummary(item.card.metaLabel);

  return {
    deadlineLabel,
    title: item.card.title,
    participantLabel: MATCHING_DETAIL_PARTICIPANTS,
    mentorInitial,
    mentorName,
    mentorCareer: item.card.badgeLabel.replace("이어온", "차"),
    scheduleLabel: MATCHING_DETAIL_SCHEDULE,
    timeLabel: MATCHING_DETAIL_TIME,
    meetingPlace: item.card.location,
    description: item.card.description,
    includedItems: MATCHING_DETAIL_INCLUDED_ITEMS,
    requirements: MATCHING_DETAIL_REQUIREMENTS,
  };
}

const MATCHING_ITEMS: readonly MatchingItem[] = [
  {
    id: "haenyeo-job-1",
    kind: "job",
    category: "haenyeo",
    card: {
      to: ROUTES.matchingDetail,
      imageSrc: mentorCardImage,
      imageAlt: "바닷가에서 작업 중인 해녀들",
      badgeLabel: "45년 이어온",
      title: "제주의 말을 돌보는 하루",
      metaLabel: "김** 해녀 · D-20",
      description:
        "제주 바다의 보물을 캐는 해녀의 삶을 배워보세요. 물질의 기술과 해산물에 대한 깊은 지식을 전수합니다.",
      location: "제주시 구좌읍",
      tags: ["물질", "해산물 채취", "바다 안전"],
    },
  },
  {
    id: "stone-job-1",
    kind: "job",
    category: "stone",
    card: {
      to: ROUTES.matchingDetail,
      imageSrc: mentorCardImage,
      imageAlt: "제주 바닷가에서 일하는 장인의 모습",
      badgeLabel: "25년 이어온",
      title: "돌담 장인",
      metaLabel: "김** 장인 · D-20",
      description:
        "제주의 상징인 돌담을 쌓는 전통 기술을 배워보세요. 바람을 통과시키는 제주만의 독특한 쌓기 방식을 배웁니다.",
      location: "제주시 구좌읍",
      tags: ["쌓기", "바람길 설계", "제주 돌"],
    },
  },
  {
    id: "horse-job-1",
    kind: "job",
    category: "horse",
    card: {
      to: ROUTES.matchingDetail,
      imageSrc: mentorCardImage,
      imageAlt: "제주 현장에서 활동 중인 직업 체험 장면",
      badgeLabel: "25년 이어온",
      title: "말 농장 운영자",
      metaLabel: "김** 농장주 · D-20",
      description:
        "제주의 전통 말농장 일을 실전 기술로 배워보세요. 사육과 관리부터 관광 연계 운영까지 함께 익힙니다.",
      location: "서귀포시 표선면",
      tags: ["사육", "목장 관리", "현장 운영"],
    },
  },
  {
    id: "tangerine-job-1",
    kind: "job",
    category: "tangerine",
    card: {
      to: ROUTES.matchingDetail,
      imageSrc: mentorCardImage,
      imageAlt: "제주 귤 농가의 수확 작업 장면",
      badgeLabel: "25년 이어온",
      title: "귤 농가",
      metaLabel: "김** 농부 · D-20",
      description:
        "사계절 내내 귤을 돌보는 제주 기술을 배워보세요. 가지치기와 수확, 판매까지 농가 운영의 흐름을 경험합니다.",
      location: "제주시 애월읍",
      tags: ["재배", "수확", "농가 운영"],
    },
  },
  {
    id: "stone-job-2",
    kind: "job",
    category: "stone",
    card: {
      to: ROUTES.matchingDetail,
      imageSrc: mentorCardImage,
      imageAlt: "제주 마을의 돌담과 장인 작업 장면",
      badgeLabel: "18년 이어온",
      title: "전통 공예",
      metaLabel: "김** 공예가 · D-12",
      description:
        "거친 재료를 다루는 제주식 손기술을 익혀보세요. 마을 풍경과 생활 공예가 만나는 과정을 가까이에서 배웁니다.",
      location: "제주시 한림읍",
      tags: ["공예", "수작업", "마을 기록"],
    },
  },
  {
    id: "haenyeo-job-2",
    kind: "job",
    category: "haenyeo",
    card: {
      to: ROUTES.matchingDetail,
      imageSrc: mentorCardImage,
      imageAlt: "해녀 공동체 활동 기록 장면",
      badgeLabel: "12년 이어온",
      title: "바다 안전 안내자",
      metaLabel: "김** 해녀 · D-8",
      description:
        "제주 바다에서 안전하게 일하는 법을 배워보세요. 현장 판단과 장비 사용, 공동체 규칙까지 함께 익힙니다.",
      location: "서귀포시 성산읍",
      tags: ["안전", "현장 판단", "공동체"],
    },
  },
  {
    id: "horse-exp-1",
    kind: "experience",
    category: "horse",
    card: {
      to: ROUTES.matchingDetail,
      imageSrc: mentorCardImage,
      imageAlt: "제주 말 농장 체험 장면",
      badgeLabel: "8년 이어온",
      title: "말 농장 하루 체험",
      metaLabel: "박** 운영자 · D-6",
      description:
        "제주 말의 일상을 가까이서 경험해보세요. 먹이 주기와 마구간 관리, 산책 코스 안내를 함께 체험합니다.",
      location: "서귀포시 남원읍",
      tags: ["체험", "먹이 주기", "산책"],
    },
  },
  {
    id: "tangerine-exp-1",
    kind: "experience",
    category: "tangerine",
    card: {
      to: ROUTES.matchingDetail,
      imageSrc: mentorCardImage,
      imageAlt: "귤 수확 체험 장면",
      badgeLabel: "6년 이어온",
      title: "귤 수확 체험",
      metaLabel: "이** 농부 · D-10",
      description:
        "계절에 맞는 귤밭 일과를 가볍게 체험해보세요. 수확과 선별, 포장까지 제주 농가의 하루를 함께합니다.",
      location: "제주시 조천읍",
      tags: ["수확", "선별", "포장"],
    },
  },
  {
    id: "stone-exp-1",
    kind: "experience",
    category: "stone",
    card: {
      to: ROUTES.matchingDetail,
      imageSrc: mentorCardImage,
      imageAlt: "돌담 쌓기 체험 장면",
      badgeLabel: "10년 이어온",
      title: "돌담 쌓기 입문",
      metaLabel: "오** 장인 · D-14",
      description:
        "제주 돌의 결을 읽고 작은 돌담을 직접 쌓아봅니다. 초보자도 따라갈 수 있게 손기술을 단계별로 체험합니다.",
      location: "제주시 한경면",
      tags: ["입문", "돌 고르기", "쌓기"],
    },
  },
] as const;

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

  const filteredItems = MATCHING_ITEMS.filter((item) => {
    if (item.kind !== selectedKind) {
      return false;
    }

    if (selectedCategory === "all") {
      return true;
    }

    return item.category === selectedCategory;
  });

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
              총 {filteredItems.length}개
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
            {filteredItems.map((item) => (
              <MentorCard
                key={item.id}
                {...item.card}
                to={ROUTES.matchingDetail}
                state={buildMatchingDetailState(item)}
              />
            ))}
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
