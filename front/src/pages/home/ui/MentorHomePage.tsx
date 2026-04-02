import calendarIcon from "@/assets/my/calendar.svg";
import haenyeoMentorIcon from "@/shared/assets/haenyeoMentorIcon.svg";
import { ROUTES } from "@/shared/config/routes";
import { BottomNavigation } from "@/shared/ui/navigation/BottomNavigation";
import { Box, Button, HStack, Text, VStack } from "@vapor-ui/core";
import {
  CheckCircleOutlineIcon,
  ChevronRightOutlineIcon,
  GroupOutlineIcon,
  PlusOutlineIcon,
} from "@vapor-ui/icons";
import { useState } from "react";
import { Link } from "react-router-dom";

type SummaryCardProps = {
  count: string;
  label: string;
  icon: "group" | "calendar" | "check";
};

type MentorHomePageProps = {
  mentorName?: string | null;
};

const DEFAULT_MENTOR_NAME = "김영숙";

const SUMMARY_CARDS: ReadonlyArray<SummaryCardProps> = [
  {
    count: "1건",
    label: "오늘 일정",
    icon: "group",
  },
  {
    count: "3명",
    label: "신청자",
    icon: "calendar",
  },
  {
    count: "5회",
    label: "완료한 체험",
    icon: "check",
  },
];

type ScheduleItem = {
  id: number;
  kind: "직업" | "체험";
  title: string;
  date: string;
  currentCount: number;
  maxCount: number;
};

const MOCK_SCHEDULES: ReadonlyArray<ScheduleItem> = [
  {
    id: 1,
    kind: "체험",
    title: "해녀 물질 체험",
    date: "2026년 4월 15일 · 오전 9:00 - 12:00",
    currentCount: 8,
    maxCount: 10,
  },
  {
    id: 2,
    kind: "체험",
    title: "돌담 쌓기 체험",
    date: "2026년 4월 15일 · 오전 9:00 - 12:00",
    currentCount: 2,
    maxCount: 2,
  },
  {
    id: 3,
    kind: "직업",
    title: "해녀 직업 멘토링",
    date: "2026년 4월 16일 · 오전 10:00 - 12:00",
    currentCount: 1,
    maxCount: 3,
  },
];

function ScheduleCard({
  title,
  date,
  currentCount,
  maxCount,
}: Omit<ScheduleItem, "id">) {
  return (
    <Box
      $css={{
        display: "flex",
        padding: "17px 24px 19px 17px",
        alignItems: "center",
        alignSelf: "stretch",
        borderRadius: "14px",
        border: "1.18px solid #E2E8F0",
        backgroundColor: "var(--vapor-color-gray-000, #ffffff)",
        boxSizing: "border-box",
      }}
    >
      <VStack
        $css={{
          flex: 1,
          alignItems: "flex-start",
          gap: "6px",
        }}
      >
        <Text
          $css={{
            color: "var(--vapor-color-gray-900)",
            fontFamily: "Inter",
            fontSize: "18px",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "27px",
          }}
        >
          {title}
        </Text>
        <Text
          $css={{
            color: "var(--vapor-color-gray-700)",
            fontFamily: "var(--vapor-typography-fontFamily-sans)",
            fontSize: "var(--vapor-typography-fontSize-100)",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "var(--vapor-typography-lineHeight-100)",
            letterSpacing: "var(--vapor-typography-letterSpacing-100)",
          }}
        >
          {date}
        </Text>
        <Box
          $css={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <Box
            $css={{
              padding: "2px 8px",
              borderRadius: "4px",
              backgroundColor: "var(--vapor-color-cyan-050, #ddf2f7)",
            }}
          >
            <Text
              $css={{
                color: "var(--vapor-color-cyan-600)",
                textAlign: "center",
                fontFamily: "var(--vapor-typography-fontFamily-sans)",
                fontSize: "var(--vapor-typography-fontSize-050)",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "var(--vapor-typography-lineHeight-050)",
                letterSpacing: "var(--vapor-typography-letterSpacing-000)",
              }}
            >
              참가 인원
            </Text>
          </Box>
          <Text
            $css={{
              color: "var(--vapor-color-gray-500)",
              fontFamily: "var(--vapor-typography-fontFamily-sans)",
              fontSize: "var(--vapor-typography-fontSize-075)",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "var(--vapor-typography-lineHeight-075)",
              letterSpacing: "var(--vapor-typography-letterSpacing-100)",
            }}
          >
            {currentCount}명/{maxCount}명
          </Text>
        </Box>
      </VStack>
      <ChevronRightOutlineIcon
        size={20}
        color="var(--vapor-color-gray-300, #a3a3a3)"
        aria-hidden="true"
      />
    </Box>
  );
}

function SummaryCard({ count, label, icon }: SummaryCardProps) {
  return (
    <Box
      $css={{
        display: "flex",
        flex: 1,
        padding: "16px 16px 14px 16px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "4px",
        borderRadius: "16px",
        background: "var(--vapor-color-cyan-300)",
        boxSizing: "border-box",
      }}
    >
      <Box
        $css={{
          height: "20px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {icon === "group" ? (
          <GroupOutlineIcon
            size={20}
            color="var(--vapor-color-white, #ffffff)"
            aria-hidden="true"
          />
        ) : icon === "check" ? (
          <CheckCircleOutlineIcon
            size={20}
            color="var(--vapor-color-cyan-050, #ddf2f7)"
            aria-hidden="true"
          />
        ) : (
          <Box
            render={<img src={calendarIcon} alt="" aria-hidden="true" />}
            $css={{
              width: "20px",
              height: "20px",
              display: "block",
            }}
          />
        )}
      </Box>

      <Text
        render={<p />}
        $css={{
          color: "#FFF",
          fontFamily: "var(--vapor-typography-fontFamily-sans)",
          fontSize: "var(--vapor-typography-fontSize-400)",
          fontStyle: "normal",
          fontWeight: 700,
          lineHeight: "var(--vapor-typography-lineHeight-400)",
          letterSpacing: "var(--vapor-typography-letterSpacing-300)",
          whiteSpace: "nowrap",
        }}
      >
        {count}
      </Text>

      <Text
        render={<p />}
        $css={{
          color: "var(--vapor-color-cyan-050, #ddf2f7)",
          fontFamily: "var(--vapor-typography-fontFamily-sans)",
          fontSize: "var(--vapor-typography-fontSize-050)",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "var(--vapor-typography-lineHeight-050)",
          letterSpacing: "var(--vapor-typography-letterSpacing-000)",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </Text>
    </Box>
  );
}

export function MentorHomePage({ mentorName }: MentorHomePageProps) {
  const [activeFilter, setActiveFilter] = useState<"직업" | "체험">("직업");

  const displayName =
    typeof mentorName === "string" && mentorName.trim().length > 0
      ? mentorName.trim()
      : DEFAULT_MENTOR_NAME;

  return (
    <Box
      render={<section />}
      $css={{
        width: "100%",
        height: "100dvh",
        minHeight: "100dvh",
        position: "relative",
        backgroundColor: "var(--vapor-color-background-surface-200, #f7f7f7)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Box
        $css={{
          flexShrink: 0,
          backgroundColor: "var(--vapor-color-cyan-200, #84d2e2)",
          borderBottomLeftRadius: "24px",
          borderBottomRightRadius: "24px",
          paddingTop: "28px",
          paddingBottom: "18px",
          paddingInline: "16px",
        }}
      >
        <VStack
          $css={{
            alignItems: "stretch",
            gap: "18px",
          }}
        >
          <VStack
            $css={{
              alignItems: "stretch",
              gap: "4px",
            }}
          >
            <Box>
              <Box
                render={<img src={haenyeoMentorIcon} alt="해녀 멘토 프로필" />}
                $css={{
                  width: "46px",
                  height: "46px",
                  borderRadius: "999px",
                  display: "block",
                  objectFit: "cover",
                  backgroundColor: "var(--vapor-color-cyan-700, #005468)",
                }}
              />
            </Box>

            <Text
              render={<h1 />}
              $css={{
                color: "var(--vapor-color-gray-800, #393939)",
                fontSize: "24px",
                lineHeight: "36px",
                fontWeight: 700,
                letterSpacing: "-0.3px",
              }}
            >
              {displayName} 선생님,
              <br />
              일정을 확인해보세요.
            </Text>
          </VStack>

          <HStack
            $css={{
              gap: "6px",
              alignItems: "stretch",
            }}
          >
            {SUMMARY_CARDS.map((card) => (
              <SummaryCard
                key={card.label}
                count={card.count}
                label={card.label}
                icon={card.icon}
              />
            ))}
          </HStack>
        </VStack>
      </Box>

      <Box
        $css={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
        }}
      >
        <Box
          $css={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "16px",
            paddingInline: "16px",
            paddingTop: "28px",
            boxSizing: "border-box",
          }}
        >
          <Text
            $css={{
              flex: 1,
              fontSize: "18px",
              lineHeight: "26px",
              fontWeight: 700,
              letterSpacing: "-0.1px",
              color: "var(--vapor-color-gray-800, #393939)",
            }}
          >
            예정된 일정
          </Text>
          <HStack
            $css={{
              gap: "4px",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            {(["직업", "체험"] as const).map((label) => {
              const isActive = activeFilter === label;
              return (
                <Button
                  key={label}
                  size="md"
                  onClick={() => setActiveFilter(label)}
                  $css={{
                    display: "flex",
                    minWidth: "49px",
                    height: "var(--vapor-size-dimension-400)",
                    padding: "0 var(--vapor-size-space-150)",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "var(--vapor-button-gap)",
                    borderRadius: "var(--vapor-size-borderRadius-300)",
                    border: isActive
                      ? "1px solid var(--vapor-color-gray-900, #262626)"
                      : "1px solid var(--vapor-color-gray-200, #c6c6c6)",
                    background: isActive
                      ? "var(--vapor-color-gray-900, #262626)"
                      : "var(--vapor-color-background-normal, #ffffff)",
                    color: isActive
                      ? "var(--vapor-color-gray-000, #ffffff)"
                      : "var(--vapor-color-gray-600, #5d5d5d)",
                    fontFamily: "var(--vapor-typography-fontFamily-sans)",
                    fontSize: "var(--vapor-typography-fontSize-075)",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "var(--vapor-typography-lineHeight-075)",
                    letterSpacing: "var(--vapor-typography-letterSpacing-100)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {label}
                </Button>
              );
            })}
          </HStack>
        </Box>

        <VStack
          $css={{
            alignItems: "stretch",
            gap: "12px",
            paddingInline: "16px",
            paddingTop: "12px",
            paddingBottom: "132px",
          }}
        >
          {MOCK_SCHEDULES.filter((item) => item.kind === activeFilter).map((item) => (
            <ScheduleCard
              key={item.id}
              title={item.title}
              date={item.date}
              currentCount={item.currentCount}
              maxCount={item.maxCount}
            />
          ))}
        </VStack>
      </Box>

      <Box
        $css={{
          position: "absolute",
          right: "16px",
          bottom: "108px",
          zIndex: 2,
        }}
      >
        <Button
          nativeButton={false}
          render={<Link to={ROUTES.mentorWrite} />}
          size="md"
          $css={{
            display: "flex",
            width: "101px",
            height: "48px",
            padding: "0 14px",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            borderRadius: "28px",
            background: "var(--vapor-color-cyan-300, #1cb3cb)",
            color: "var(--vapor-color-foreground-button-primary, #ffffff)",
            fontFamily: "var(--vapor-typography-fontFamily-sans)",
            fontSize: "var(--vapor-typography-fontSize-200)",
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "var(--vapor-typography-lineHeight-200)",
            letterSpacing: "var(--vapor-typography-letterSpacing-100)",
            whiteSpace: "nowrap",
          }}
        >
          <PlusOutlineIcon
            size={24}
            color="var(--vapor-color-foreground-button-primary, #ffffff)"
          />
          글쓰기
        </Button>
      </Box>

      <Box
        $css={{
          flexShrink: 0,
        }}
      >
        <BottomNavigation isMentor />
      </Box>
    </Box>
  );
}


