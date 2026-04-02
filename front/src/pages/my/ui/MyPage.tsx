import { isApiError } from "@/api/fetcher";
import { getMeQueryKey, useLogout } from "@/api/generated/user/user";
import calendarIcon from "@/assets/my/calendar.svg";
import locationIcon from "@/assets/my/location.svg";
import profileAvatar from "@/assets/my/profile-avatar.jpg";
import statCompletedIcon from "@/assets/my/stat-completed.svg";
import statMatchingIcon from "@/assets/my/stat-matching.svg";
import { useSessionProfile } from "@/features/auth/api/useSessionProfile";
import {
  useMyCompletedExperienceHistory,
  useMyUpcomingExperienceReservations,
} from "@/features/experiences/api/useMyBookingViews";
import {
  asRecord,
  getNumber,
  getRecordCollection,
  getString,
} from "@/shared/lib/apiData";
import { ROUTES } from "@/shared/config/routes";
import { BottomNavigation } from "@/shared/ui/navigation/BottomNavigation";
import { QueryNotice } from "@/shared/ui/states/QueryNotice";
import { useQueryClient } from "@tanstack/react-query";
import { Box, HStack, Text, VStack } from "@vapor-ui/core";
import { ChevronRightOutlineIcon } from "@vapor-ui/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CONTENT_WIDTH_PX = 358;
const FONT_FAMILY =
  '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif';

type ProfileStatus = {
  tone: "error" | "loading";
  message: string;
  onRetry?: () => void;
};

type UpcomingKind = "job" | "experience";

type StatCardProps = {
  iconSrc: string;
  value: string;
  label: string;
};

type UpcomingReservation = {
  title: string;
  scheduleLabel: string;
  statusLabel?: string;
  participantLabel?: string;
};

type HistoryCardTone = "cyan" | "orange";

type HistoryItem = {
  imageSrc?: string;
  badgeLabel?: string;
  badgeTone?: HistoryCardTone;
  title: string;
  mentorLabel?: string;
  deadlineLabel?: string;
  location?: string;
};

function MetaItem({ iconSrc, label }: { iconSrc: string; label: string; }) {
  return (
    <HStack
      $css={{
        gap: "4px",
        alignItems: "center",
      }}
    >
      <Box
        render={<img src={iconSrc} alt="" aria-hidden="true" />}
        $css={{
          width: "15.995px",
          height: "15.995px",
          display: "block",
          flexShrink: 0,
        }}
      />
      <Text
        render={<p />}
        $css={{
          color: "#262626",
          fontFamily: FONT_FAMILY,
          fontSize: "14px",
          lineHeight: "20px",
          fontWeight: 400,
          letterSpacing: "-0.1504px",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </Text>
    </HStack>
  );
}

function StatCard({ iconSrc, value, label }: StatCardProps) {
  return (
    <Box
      $css={{
        flex: 1,
        minWidth: 0,
        height: "112px",
        borderRadius: "16px",
        backgroundColor: "#1CB3CB",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <VStack
        $css={{
          position: "absolute",
          left: "15.99px",
          top: "16px",
          gap: "8px",
          alignItems: "flex-start",
        }}
      >
        <Box
          render={<img src={iconSrc} alt="" aria-hidden="true" />}
          $css={{
            width: "20px",
            height: "20px",
            display: "block",
          }}
        />
        <VStack
          $css={{
            gap: "0",
            alignItems: "flex-start",
          }}
        >
          <Text
            render={<p />}
            $css={{
              color: "#FFFFFF",
              fontFamily: FONT_FAMILY,
              fontSize: "24px",
              lineHeight: "36px",
              fontWeight: 700,
              letterSpacing: "-0.3px",
            }}
          >
            {value}
          </Text>
          <Text
            render={<p />}
            $css={{
              color: "#EEF9FB",
              fontFamily: FONT_FAMILY,
              fontSize: "12px",
              lineHeight: "18px",
              fontWeight: 500,
              letterSpacing: "0",
            }}
          >
            {label}
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
}

function ToggleChip({
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
        height: "32px",
        paddingInline: "12px",
        borderRadius: "8px",
        border: active ? "none" : "1px solid #C6C6C6",
        backgroundColor: active ? "#262626" : "#FFFFFF",
        color: active ? "#FFFFFF" : "#5D5D5D",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      <Text
        $css={{
          color: "inherit",
          fontFamily: FONT_FAMILY,
          fontSize: "14px",
          lineHeight: "22px",
          fontWeight: 500,
          letterSpacing: "-0.1px",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </Text>
    </Box>
  );
}

function StatusBadge({ label }: { label: string; }) {
  return (
    <Box
      $css={{
        backgroundColor: "#F1FAE8",
        borderRadius: "10px",
        paddingInline: "2px",
        minWidth: "53px",
        height: "22px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <Text
        $css={{
          color: "#4C850E",
          fontFamily: FONT_FAMILY,
          fontSize: "12px",
          lineHeight: "18px",
          fontWeight: 500,
          letterSpacing: "0",
          textAlign: "center",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </Text>
    </Box>
  );
}

function UpcomingReservationCard({
  title,
  scheduleLabel,
  statusLabel,
  participantLabel,
}: UpcomingReservation) {
  return (
    <Box
      $css={{
        width: "100%",
        height: "119px",
        borderRadius: "14px",
        border: "1.18px solid #E2E8F0",
        backgroundColor: "#FFFFFF",
        padding: "15.99px",
        boxSizing: "border-box",
      }}
    >
      <HStack
        $css={{
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <VStack
          $css={{
            width: "calc(100% - 36px)",
            gap: "8px",
            alignItems: "flex-start",
          }}
        >
          <VStack
            $css={{
              width: "100%",
              gap: "2px",
              alignItems: "flex-start",
            }}
          >
            <Text
              render={<h3 />}
              $css={{
                color: "#262626",
                fontFamily: FONT_FAMILY,
                fontSize: "18px",
                lineHeight: "27px",
                fontWeight: 600,
                width: "100%",
              }}
            >
              {title}
            </Text>
            <Text
              render={<p />}
              $css={{
                color: "#4C4C4C",
                fontFamily: FONT_FAMILY,
                fontSize: "16px",
                lineHeight: "24px",
                fontWeight: 500,
                letterSpacing: "-0.1px",
                width: "100%",
                wordBreak: "keep-all",
              }}
            >
              {scheduleLabel}
            </Text>
          </VStack>

          <HStack
            $css={{
              gap: "8px",
              alignItems: "center",
              width: "100%",
            }}
          >
            {statusLabel ? <StatusBadge label={statusLabel} /> : null}
            {participantLabel ? (
              <Text
                render={<p />}
                $css={{
                  color: "#767676",
                  fontFamily: FONT_FAMILY,
                  fontSize: "14px",
                  lineHeight: "22px",
                  fontWeight: 500,
                  letterSpacing: "-0.1px",
                }}
              >
                {participantLabel}
              </Text>
            ) : null}
          </HStack>
        </VStack>

        <ChevronRightOutlineIcon size={20} color="#94A3B8" aria-hidden="true" />
      </HStack>
    </Box>
  );
}

function HistoryBadge({
  label,
  tone,
}: {
  label: string;
  tone: HistoryCardTone;
}) {
  const isCyan = tone === "cyan";

  return (
    <Box
      $css={{
        position: "absolute",
        top: "8px",
        right: isCyan ? "9px" : "8px",
        height: isCyan ? "32px" : "24px",
        paddingInline: isCyan ? "12px" : "8px",
        borderRadius: "999px",
        backgroundColor: isCyan ? "#C2E8F0" : "#FFD9C8",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        $css={{
          color: isCyan ? "#0D8298" : "#CD4D0A",
          fontFamily: FONT_FAMILY,
          fontSize: isCyan ? "14px" : "12px",
          lineHeight: isCyan ? "22px" : "18px",
          fontWeight: 500,
          letterSpacing: isCyan ? "-0.1px" : "0",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </Text>
    </Box>
  );
}

function HistoryCard({
  imageSrc,
  badgeLabel,
  badgeTone,
  title,
  mentorLabel,
  deadlineLabel,
  location,
}: HistoryItem) {
  return (
    <VStack
      $css={{
        width: "174px",
        gap: "16px",
        alignItems: "flex-start",
        flexShrink: 0,
      }}
    >
      <Box
        $css={{
          width: "100%",
          height: "130px",
          borderRadius: "14px",
          border: "1px solid #E1E1E1",
          overflow: "hidden",
          position: "relative",
          backgroundColor: "#F7F7F7",
        }}
      >
        <Box
          render={
            imageSrc ? <img src={imageSrc} alt="" aria-hidden="true" /> : <div aria-hidden="true" />
          }
          $css={{
            width: "100%",
            height: "100%",
            display: "block",
            objectFit: "cover",
            background:
              imageSrc
                ? undefined
                : "linear-gradient(135deg, #EEF9FB 0%, #C2E8F0 100%)",
          }}
        />
        {badgeLabel && badgeTone ? (
          <HistoryBadge label={badgeLabel} tone={badgeTone} />
        ) : null}
      </Box>

      <VStack
        $css={{
          width: "100%",
          gap: "2px",
          alignItems: "flex-start",
        }}
      >
        <VStack
          $css={{
            width: "100%",
            gap: "4px",
            alignItems: "flex-start",
          }}
        >
          <Text
            render={<h3 />}
            $css={{
              width: "100%",
              color: "#393939",
              fontFamily: FONT_FAMILY,
              fontSize: "18px",
              lineHeight: "26px",
              fontWeight: 700,
              letterSpacing: "-0.1px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {title}
          </Text>

          <HStack
            $css={{
              gap: "4px",
              alignItems: "center",
              color: "#4C4C4C",
            }}
          >
            {mentorLabel ? (
              <Text
                render={<span />}
                $css={{
                  color: "inherit",
                  fontFamily: FONT_FAMILY,
                  fontSize: "14px",
                  lineHeight: "22px",
                  fontWeight: 500,
                  letterSpacing: "-0.1px",
                  whiteSpace: "nowrap",
                }}
              >
                {mentorLabel}
              </Text>
            ) : null}
            {mentorLabel && deadlineLabel ? (
              <Text
                render={<span />}
                $css={{
                  color: "inherit",
                  fontFamily: FONT_FAMILY,
                  fontSize: "14px",
                  lineHeight: "22px",
                  fontWeight: 500,
                  letterSpacing: "-0.1px",
                  whiteSpace: "nowrap",
                }}
              >
                ·
              </Text>
            ) : null}
            {deadlineLabel ? (
              <Text
                render={<span />}
                $css={{
                  color: "inherit",
                  fontFamily: FONT_FAMILY,
                  fontSize: "14px",
                  lineHeight: "22px",
                  fontWeight: 500,
                  letterSpacing: "-0.1px",
                  whiteSpace: "nowrap",
                }}
              >
                {deadlineLabel}
              </Text>
            ) : null}
          </HStack>
        </VStack>

        {location ? (
          <Text
            render={<p />}
            $css={{
              color: "#A3A3A3",
              fontFamily: FONT_FAMILY,
              fontSize: "12px",
              lineHeight: "18px",
              fontWeight: 400,
              letterSpacing: "-0.1px",
            }}
          >
            {location}
          </Text>
        ) : null}
      </VStack>
    </VStack>
  );
}

function formatDateRange(startDate?: string, endDate?: string) {
  if (startDate && endDate && startDate !== endDate) {
    return `${startDate} ~ ${endDate}`;
  }

  return startDate ?? endDate ?? "";
}

function formatParticipantLabel(
  participantCount?: number,
  maxParticipants?: number,
) {
  if (
    typeof participantCount === "number" &&
    typeof maxParticipants === "number"
  ) {
    return `${participantCount}명/${maxParticipants}명`;
  }

  if (typeof participantCount === "number") {
    return `${participantCount}명`;
  }

  return undefined;
}

export function MyPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedUpcomingKind, setSelectedUpcomingKind] =
    useState<UpcomingKind>("job");
  const [logoutErrorMessage, setLogoutErrorMessage] = useState("");
  const profileQuery = useSessionProfile();
  const { mutate: logout, isPending: isLogoutPending } = useLogout();
  const upcomingExperienceQuery = useMyUpcomingExperienceReservations();
  const completedHistoryQuery = useMyCompletedExperienceHistory();
  const profile = asRecord(profileQuery.data?.data);
  const displayName = getString(profile, "name");
  const displayPhone = getString(profile, "phone");
  const displayLocation = getString(profile, "location");
  const joinedLabel =
    getString(profile, "joinedLabel") ?? getString(profile, "joinedAt");
  const completedCount = getNumber(profile, "completedCount");
  const matchingCount = getNumber(profile, "matchingCount");
  const profileStatus: ProfileStatus | null = profileQuery.isError
    ? {
      tone: "error",
      message: profileQuery.error.message,
      onRetry: () => {
        void profileQuery.refetch();
      },
    }
    : profileQuery.isPending && !profileQuery.data
      ? {
        tone: "loading",
        message: "회원 정보를 불러오는 중입니다.",
      }
      : null;
  const upcomingReservations: UpcomingReservation[] = getRecordCollection(
    upcomingExperienceQuery.data?.data,
  ).reduce<UpcomingReservation[]>((acc, item) => {
      const title = getString(item, "title");

      if (!title) {
        return acc;
      }

      acc.push({
        title,
        scheduleLabel:
          getString(item, "schedule") ??
          formatDateRange(getString(item, "startDate"), getString(item, "endDate")),
        statusLabel: getString(item, "status"),
        participantLabel: formatParticipantLabel(
          getNumber(item, "participantCount"),
          getNumber(item, "maxParticipants"),
        ),
      });

      return acc;
    }, []);
  const upcomingStatus =
    selectedUpcomingKind === "experience"
      ? upcomingExperienceQuery.isError
        ? {
          tone: "error" as const,
          message: upcomingExperienceQuery.error.message,
          onRetry: () => {
            void upcomingExperienceQuery.refetch();
          },
        }
        : upcomingExperienceQuery.isPending
          ? {
            tone: "loading" as const,
            message: "체험 예약 내역을 불러오는 중입니다.",
          }
          : null
      : null;
  const completedHistory: HistoryItem[] = getRecordCollection(
    completedHistoryQuery.data?.data,
  ).reduce<HistoryItem[]>((acc, item) => {
      const title = getString(item, "title");

      if (!title) {
        return acc;
      }

      acc.push({
        imageSrc: getString(item, "photoUrl"),
        badgeLabel: getString(item, "status"),
        title,
        mentorLabel: getString(item, "mentorName"),
        deadlineLabel:
          getString(item, "schedule") ??
          formatDateRange(getString(item, "startDate"), getString(item, "endDate")),
        location: getString(item, "location"),
      });

      return acc;
    }, []);
  const completedStatus = completedHistoryQuery.isError
    ? {
      tone: "error" as const,
      message: completedHistoryQuery.error.message,
      onRetry: () => {
        void completedHistoryQuery.refetch();
      },
    }
    : completedHistoryQuery.isPending
      ? {
        tone: "loading" as const,
        message: "완료 내역을 불러오는 중입니다.",
      }
      : null;
  const showProfileMeta = Boolean(displayLocation || joinedLabel);
  const showStats =
    typeof completedCount === "number" || typeof matchingCount === "number";
  const showUpcomingEmptyState =
    !upcomingStatus &&
    (selectedUpcomingKind === "job" || upcomingReservations.length === 0);
  const upcomingEmptyMessage =
    selectedUpcomingKind === "job"
      ? "직업 예약 API가 없어 표시할 수 없습니다."
      : "예약된 체험이 없습니다.";
  const showCompletedEmptyState =
    !completedStatus && completedHistory.length === 0;

  const handleLogout = () => {
    setLogoutErrorMessage("");

    logout(undefined, {
      onSuccess: () => {
        queryClient.removeQueries({
          queryKey: getMeQueryKey(),
          exact: true,
        });
        navigate(ROUTES.home, { replace: true });
      },
      onError: (error) => {
        if (
          isApiError(error) &&
          (error.status === 401 || error.status === 403)
        ) {
          queryClient.removeQueries({
            queryKey: getMeQueryKey(),
            exact: true,
          });
          navigate(ROUTES.home, { replace: true });
          return;
        }

        setLogoutErrorMessage(
          isApiError(error) ? error.message : "로그아웃에 실패했습니다.",
        );
      },
    });
  };

  return (
    <Box
      render={<main />}
      $css={{
        width: "100%",
        height: "100dvh",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      <Box
        $css={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          backgroundColor: "#FFFFFF",
        }}
      >
        <VStack
          $css={{
            width: "100%",
            maxWidth: `${CONTENT_WIDTH_PX}px`,
            marginInline: "auto",
            paddingTop: "max(30px, calc(env(safe-area-inset-top) + 8px))",
            paddingInline: "16px",
            paddingBottom: "32px",
            gap: "42px",
          }}
        >
          <VStack
            $css={{
              width: "100%",
              gap: "28px",
              alignItems: "flex-start",
            }}
          >
            <HStack
              $css={{
                width: "100%",
                gap: "28px",
                alignItems: "center",
              }}
            >
              <Box
                $css={{
                  width: "50px",
                  height: "50px",
                  padding: "2px",
                  borderRadius: "26px",
                  border: "1px solid #262626",
                  backgroundColor: "#FFFFFF",
                  boxSizing: "border-box",
                  flexShrink: 0,
                }}
              >
                <Box
                  $css={{
                    width: "46px",
                    height: "46px",
                    borderRadius: "999px",
                    overflow: "hidden",
                    backgroundColor: "#F4864F",
                  }}
                >
                  <Box
                    render={
                      <img src={profileAvatar} alt="프로필 사진" />
                    }
                    $css={{
                      width: "100%",
                      height: "100%",
                      display: "block",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </Box>

              <VStack
                $css={{
                  gap: "4px",
                  alignItems: "flex-start",
                  minWidth: 0,
                  flex: 1,
                }}
              >
                <VStack
                  $css={{
                    gap: "0",
                    alignItems: "flex-start",
                  }}
                >
                  <Text
                    render={<h1 />}
                    $css={{
                      color: "#393939",
                      fontFamily: FONT_FAMILY,
                      fontSize: "24px",
                      lineHeight: "36px",
                      fontWeight: 700,
                      letterSpacing: "-0.3px",
                    }}
                  >
                    {displayName ?? ""}
                  </Text>
                  {displayPhone ? (
                    <Text
                      render={<p />}
                      $css={{
                        color: "#393939",
                        fontFamily: FONT_FAMILY,
                        fontSize: "16px",
                        lineHeight: "24px",
                        fontWeight: 500,
                        letterSpacing: "-0.1px",
                      }}
                    >
                      {displayPhone}
                    </Text>
                  ) : null}
                </VStack>

                {showProfileMeta ? (
                  <HStack
                    $css={{
                      gap: "12px",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    {displayLocation ? (
                      <MetaItem iconSrc={locationIcon} label={displayLocation} />
                    ) : null}
                    {joinedLabel ? (
                      <MetaItem iconSrc={calendarIcon} label={joinedLabel} />
                    ) : null}
                  </HStack>
                ) : null}
              </VStack>
            </HStack>

            {profileStatus ? (
              <Box $css={{ width: "100%" }}>
                <QueryNotice
                  tone={profileStatus.tone}
                  message={profileStatus.message}
                  onRetry={profileStatus.onRetry}
                />
              </Box>
            ) : null}

            {logoutErrorMessage ? (
              <Box $css={{ width: "100%" }}>
                <QueryNotice
                  tone="error"
                  message={logoutErrorMessage}
                />
              </Box>
            ) : null}

            {showStats ? (
              <HStack
                $css={{
                  width: "100%",
                  gap: "6px",
                  alignItems: "center",
                }}
              >
                {typeof completedCount === "number" ? (
                  <StatCard
                    iconSrc={statCompletedIcon}
                    value={`${completedCount}회`}
                    label="완료한 체험"
                  />
                ) : null}
                {typeof matchingCount === "number" ? (
                  <StatCard
                    iconSrc={statMatchingIcon}
                    value={`${matchingCount}건`}
                    label="매칭 연결"
                  />
                ) : null}
              </HStack>
            ) : null}

            <Box
              render={
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLogoutPending}
                />
              }
              $css={{
                width: "100%",
                height: "48px",
                borderRadius: "8px",
                border: "1px solid #C6C6C6",
                background: "var(--vapor-color-cyan-300)",
                color: "#FFF",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: isLogoutPending ? "not-allowed" : "pointer",
                opacity: isLogoutPending ? 0.6 : 1,
              }}
            >
              <Text
                $css={{
                  color: "inherit",
                  fontFamily: FONT_FAMILY,
                  fontSize: "16px",
                  lineHeight: "24px",
                  fontWeight: 500,
                  letterSpacing: "-0.1px",
                }}
              >
                로그아웃
              </Text>
            </Box>
          </VStack>

          <VStack
            $css={{
              width: "100%",
              gap: "10px",
              alignItems: "flex-start",
            }}
          >
            <HStack
              $css={{
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                render={<h2 />}
                $css={{
                  color: "#393939",
                  fontFamily: FONT_FAMILY,
                  fontSize: "18px",
                  lineHeight: "26px",
                  fontWeight: 700,
                  letterSpacing: "-0.1px",
                }}
              >
                다가오는 예약
              </Text>

              <HStack
                $css={{
                  gap: "4px",
                  alignItems: "center",
                }}
              >
                <ToggleChip
                  active={selectedUpcomingKind === "job"}
                  label="직업"
                  onClick={() => setSelectedUpcomingKind("job")}
                />
                <ToggleChip
                  active={selectedUpcomingKind === "experience"}
                  label="체험"
                  onClick={() => setSelectedUpcomingKind("experience")}
                />
              </HStack>
            </HStack>

            <VStack
              $css={{
                width: "100%",
                gap: "11px",
              }}
            >
              {upcomingStatus ? (
                <QueryNotice
                  tone={upcomingStatus.tone}
                  message={upcomingStatus.message}
                  onRetry={upcomingStatus.onRetry}
                />
              ) : null}

              {showUpcomingEmptyState ? (
                <Box
                  $css={{
                    width: "100%",
                    borderRadius: "14px",
                    border: "1px solid #E2E8F0",
                    backgroundColor: "#FFFFFF",
                    padding: "16px",
                    boxSizing: "border-box",
                  }}
                >
                  <Text
                    render={<p />}
                    $css={{
                      color: "#767676",
                      fontFamily: FONT_FAMILY,
                      fontSize: "14px",
                      lineHeight: "22px",
                      fontWeight: 500,
                      letterSpacing: "-0.1px",
                    }}
                  >
                    {upcomingEmptyMessage}
                  </Text>
                </Box>
              ) : null}

              {!upcomingStatus && selectedUpcomingKind === "experience"
                ? upcomingReservations.map((item, index) => (
                  <UpcomingReservationCard
                    key={`${item.title}-${index}`}
                    title={item.title}
                    scheduleLabel={item.scheduleLabel}
                    statusLabel={item.statusLabel}
                    participantLabel={item.participantLabel}
                  />
                ))
                : null}
            </VStack>
          </VStack>

          <VStack
            $css={{
              width: "100%",
              gap: "16px",
              alignItems: "flex-start",
            }}
          >
            <Text
              render={<h2 />}
              $css={{
                color: "#393939",
                fontFamily: FONT_FAMILY,
                fontSize: "18px",
                lineHeight: "26px",
                fontWeight: 700,
                letterSpacing: "-0.1px",
              }}
            >
              완료 내역
            </Text>

            <HStack
              $css={{
                width: "100%",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "10px",
              }}
            >
              {completedStatus ? (
                <QueryNotice
                  tone={completedStatus.tone}
                  message={completedStatus.message}
                  onRetry={completedStatus.onRetry}
                />
              ) : showCompletedEmptyState ? (
                <Box
                  $css={{
                    width: "100%",
                    borderRadius: "14px",
                    border: "1px solid #E2E8F0",
                    backgroundColor: "#FFFFFF",
                    padding: "16px",
                    boxSizing: "border-box",
                  }}
                >
                  <Text
                    render={<p />}
                    $css={{
                      color: "#767676",
                      fontFamily: FONT_FAMILY,
                      fontSize: "14px",
                      lineHeight: "22px",
                      fontWeight: 500,
                      letterSpacing: "-0.1px",
                    }}
                  >
                    완료된 체험 내역이 없습니다.
                  </Text>
                </Box>
              ) : (
                completedHistory.map((item) => (
                  <HistoryCard
                    key={`${item.title}-${item.deadlineLabel ?? item.location ?? "history"}`}
                    {...item}
                  />
                ))
              )}
            </HStack>
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
