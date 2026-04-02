import type { ReactNode } from "react";
import { useEffect } from "react";
import { useLogout } from "@/api/generated/user/user";
import completedImageOne from "@/assets/my/completed-1.jpg";
import completedImageTwo from "@/assets/my/completed-2.jpg";
import calendarIcon from "@/assets/my/calendar.svg";
import locationIcon from "@/assets/my/location.svg";
import profileAvatar from "@/assets/my/profile-avatar.jpg";
import statCompletedIcon from "@/assets/my/stat-completed.svg";
import statMatchingIcon from "@/assets/my/stat-matching.svg";
import {
  DEFAULT_SESSION_PROFILE,
  useSessionProfile,
} from "@/features/auth/api/useSessionProfile";
import { BottomNavigation } from "@/shared/ui/navigation/BottomNavigation";
import { QueryNotice } from "@/shared/ui/states/QueryNotice";
import { Box, HStack, Text, VStack } from "@vapor-ui/core";
import { ChevronRightOutlineIcon } from "@vapor-ui/icons";

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

function StatusBadge({ label }: { label: string }) {
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
}: Omit<UpcomingReservation, "id" | "kind">) {
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
            <StatusBadge label={statusLabel} />
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
          render={<img src={imageSrc} alt="" aria-hidden="true" />}
          $css={{
            width: "100%",
            height: "100%",
            display: "block",
            objectFit: "cover",
          }}
        />
        <HistoryBadge label={badgeLabel} tone={badgeTone} />
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
          </HStack>
        </VStack>

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
      </VStack>
    </VStack>
  );
}

export function MyPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const profileQuery = useSessionProfile();
  const logoutMutation = useLogout({
    mutation: {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["/users/me"],
        });
        navigate(ROUTES.onboarding, { replace: true });
      },
    },
  });
  useEffect(() => {
    if (profileQuery.data?.isMentor) {
      navigate(ROUTES.mentorMy, { replace: true });
    }
  }, [profileQuery.data, navigate]);

  const profile = profileQuery.data ?? DEFAULT_SESSION_PROFILE;
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

  const upcomingReservations = UPCOMING_RESERVATIONS.filter(
    (item) => item.kind === selectedUpcomingKind,
  );

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
                  render={<img src={profileAvatar} alt="이지영 프로필 사진" />}
                  $css={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                    objectFit: "cover",
                  }}
                />
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
                    {profile.displayName}
                  </Text>
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
                    {profile.displayEmail}
                  </Text>
                </VStack>

                <HStack
                  $css={{
                    gap: "12px",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Box
                    $css={{
                      width: "15.995px",
                      height: "15.995px",
                      color: "#FFFFFF",
                      display: "block",
                    }}
                  >
                    <LocationOutlineIcon
                      size={16}
                      color="#FFFFFF"
                      aria-hidden="true"
                    />
                  </Box>
                  <Text
                    render={<p />}
                    $css={{
                      color: "#FFFFFF",
                      fontFamily:
                        '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif',
                      fontSize: "14px",
                      lineHeight: "20px",
                      fontWeight: 400,
                    }}
                  >
                    {displayLocation}
                  </Text>
                  <Text
                    render={<span />}
                    $css={{
                      color: "rgba(255, 255, 255, 0.6)",
                      fontSize: "14px",
                      lineHeight: "20px",
                    }}
                  >
                    ·
                  </Text>
                  <Box
                    $css={{
                      width: "15.995px",
                      height: "15.995px",
                      color: "#FFFFFF",
                      display: "block",
                    }}
                  >
                    <CalendarOutlineIcon
                      size={16}
                      color="#FFFFFF"
                      aria-hidden="true"
                    />
                  </Box>
                  <Text
                    render={<p />}
                    $css={{
                      color: "#FFFFFF",
                      fontFamily:
                        '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif',
                      fontSize: "14px",
                      lineHeight: "20px",
                      fontWeight: 400,
                    }}
                  >
                    {joinedLabel}
                  </Text>
                </HStack>
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

            <HStack
              $css={{
                width: "100%",
                gap: "6px",
                alignItems: "center",
              }}
            >
              <StatCard
                iconSrc={statCompletedIcon}
                value={`${profile.completedCount}회`}
                label="완료한 체험"
              />
              <StatCard
                iconSrc={statMatchingIcon}
                value={`${profile.matchingCount}건`}
                label="매칭 연결"
              />
            </HStack>

            <Box
              render={<button type="button" />}
              $css={{
                width: "100%",
                height: "48px",
                borderRadius: "8px",
                border: "1px solid #C6C6C6",
                backgroundColor: "#F7F7F7",
                color: "#393939",
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
                  fontSize: "16px",
                  lineHeight: "24px",
                  fontWeight: 500,
                  letterSpacing: "-0.1px",
                }}
              >
                프로필 수정
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
              {upcomingReservations.map((item) => (
                <UpcomingReservationCard
                  key={item.id}
                  title={item.title}
                  scheduleLabel={item.scheduleLabel}
                  statusLabel={item.statusLabel}
                  participantLabel={item.participantLabel}
                />
              ))}
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
              {HISTORY_ITEMS.map((item) => (
                <HistoryCard key={item.id} {...item} />
              ))}
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
