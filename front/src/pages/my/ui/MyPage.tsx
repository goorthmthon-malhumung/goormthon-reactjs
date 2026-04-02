import type { ReactNode } from "react";
import { useEffect } from "react";
import { useLogout } from "@/api/generated/user/user";
import completedImageOne from "@/assets/my/completed-1.jpg";
import completedImageTwo from "@/assets/my/completed-2.jpg";
import starIcon from "@/assets/my/experiences-star.svg";
import profileAvatar from "@/assets/my/profile-avatar.jpg";
import statMatchingMedalIcon from "@/assets/my/stat-matching-medal.svg";
import {
  DEFAULT_SESSION_PROFILE,
  useSessionProfile,
} from "@/features/auth/api/useSessionProfile";
import { ROUTES } from "@/shared/config/routes";
import { BottomNavigation } from "@/shared/ui/navigation/BottomNavigation";
import { QueryNotice } from "@/shared/ui/states/QueryNotice";
import { useQueryClient } from "@tanstack/react-query";
import { Box, HStack, Text, VStack } from "@vapor-ui/core";
import {
  CalendarOutlineIcon,
  HeartOutlineIcon,
  LocationOutlineIcon,
} from "@vapor-ui/icons";
import { useNavigate } from "react-router-dom";

const PAGE_BG = "#F8FAFC";
const PROFILE_BG = "var(--vapor-color-cyan-200, #84d2e2)";
const SHADOW =
  "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.08)";
const CONTENT_WIDTH = "344.528px";

type ProfileStatus = {
  tone: "error" | "loading";
  message: string;
  onRetry?: () => void;
};

type StatCardProps = {
  icon: ReactNode;
  value: string;
  label: string;
};

function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <Box
      $css={{
        flex: 1,
        height: "111.974px",
        borderRadius: "14px",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: "15.995px",
        gap: "4px",
      }}
    >
      <Box
        $css={{
          width: "19.993px",
          height: "19.993px",
          color: "#FFFFFF",
          lineHeight: 0,
          display: "block",
        }}
      >
        {icon}
      </Box>
      <Text
        render={<p />}
        $css={{
          color: "#FFFFFF",
          fontFamily:
            '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif',
          fontSize: "24px",
          lineHeight: "32px",
          fontWeight: 700,
          letterSpacing: "0.0703px",
        }}
      >
        {value}
      </Text>
      <Text
        render={<p />}
        $css={{
          color: "rgba(255, 255, 255, 0.8)",
          fontFamily:
            '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif',
          fontSize: "12px",
          lineHeight: "16px",
          fontWeight: 400,
          letterSpacing: "-0.1504px",
        }}
      >
        {label}
      </Text>
    </Box>
  );
}

type ChipProps = {
  label: string;
  selected?: boolean;
  dashed?: boolean;
};

function Chip({ label, selected = false, dashed = false }: ChipProps) {
  return (
    <Box
      render={<button type="button" />}
      $css={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "38.929px",
        paddingInline: dashed ? "15.994px" : "15.994px",
        borderRadius: "14px",
        border: dashed ? "1.471px dashed #CAD5E2" : "none",
        backgroundColor: selected ? "#F0F9FF" : "#F0F9FF",
        color: selected ? "#0069A8" : "#0069A8",
        cursor: "pointer",
      }}
    >
      <Text
        $css={{
          color: "inherit",
          fontFamily:
            '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif',
          fontSize: "14px",
          lineHeight: "20px",
          fontWeight: 500,
          letterSpacing: "-0.1504px",
        }}
      >
        {label}
      </Text>
    </Box>
  );
}

type ReservationCardProps = {
  title: string;
  dateTime: string;
  location: string;
};

function ReservationCard({ title, dateTime, location }: ReservationCardProps) {
  return (
    <Box
      $css={{
        width: "100%",
        borderRadius: "14px",
        border: "0.735px solid #E2E8F0",
        backgroundColor: "#FFFFFF",
        paddingTop: "16.73px",
        paddingRight: "16.73px",
        paddingBottom: "0.735px",
        paddingLeft: "16.73px",
      }}
    >
      <HStack
        $css={{
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "12px",
        }}
      >
        <Text
          render={<h3 />}
          $css={{
            color: "#0F172B",
            fontFamily:
              '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif',
            fontSize: "18px",
            lineHeight: "27px",
            fontWeight: 600,
            letterSpacing: "-0.4395px",
          }}
        >
          {title}
        </Text>

        <Box
          $css={{
            height: "23.992px",
            paddingInline: "8px",
            borderRadius: "999px",
            backgroundColor: "#F0FDF4",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Text
            $css={{
              color: "#008236",
              fontFamily:
                '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif',
              fontSize: "12px",
              lineHeight: "16px",
              fontWeight: 500,
              letterSpacing: "-0.1504px",
            }}
          >
            예약확정
          </Text>
        </Box>
      </HStack>

      <VStack
        $css={{
          gap: "4px",
          marginTop: "7.997px",
          paddingBottom: "0.735px",
        }}
      >
        <HStack
          $css={{
            gap: "7.997px",
            alignItems: "center",
          }}
        >
          <CalendarOutlineIcon size={16} color="#45556C" aria-hidden="true" />
          <Text
            render={<p />}
            $css={{
              color: "#45556C",
              fontFamily:
                '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif',
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: 400,
              letterSpacing: "-0.1504px",
            }}
          >
            {dateTime}
          </Text>
        </HStack>

        <HStack
          $css={{
            gap: "7.997px",
            alignItems: "center",
          }}
        >
          <LocationOutlineIcon size={16} color="#45556C" aria-hidden="true" />
          <Text
            render={<p />}
            $css={{
              color: "#45556C",
              fontFamily:
                '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif',
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: 400,
              letterSpacing: "-0.1504px",
            }}
          >
            {location}
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
}

type CompletedCardProps = {
  imageSrc: string;
  title: string;
  mentor: string;
  date: string;
};

function CompletedCard({ imageSrc, title, mentor, date }: CompletedCardProps) {
  return (
    <Box
      $css={{
        width: "140.803px",
        borderRadius: "14px",
        border: "0.735px solid #E2E8F0",
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      <Box
        $css={{
          position: "relative",
          height: "127.991px",
          overflow: "hidden",
        }}
      >
        <Box
          render={<img src={imageSrc} alt="" aria-hidden="true" />}
          $css={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        <Box
          $css={{
            position: "absolute",
            top: "8px",
            right: "8px",
            height: "31.989px",
            minWidth: "44.686px",
            borderRadius: "999px",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            display: "inline-flex",
            alignItems: "center",
            gap: "3.999px",
            paddingLeft: "7.997px",
            paddingRight: "7.997px",
          }}
        >
          <Box
            render={<img src={starIcon} alt="" aria-hidden="true" />}
            $css={{
              width: "16.914px",
              height: "23.992px",
              display: "block",
              flexShrink: 0,
            }}
          />
          <Text
            $css={{
              color: "#0F172B",
              fontFamily:
                '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif',
              fontSize: "12px",
              lineHeight: "16px",
              fontWeight: 600,
            }}
          >
            5
          </Text>
        </Box>
      </Box>

      <VStack
        $css={{
          gap: "3.999px",
          paddingTop: "11.996px",
          paddingInline: "11.996px",
          paddingBottom: "11.996px",
        }}
      >
        <Text
          render={<h3 />}
          $css={{
            color: "#0F172B",
            fontFamily:
              '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif',
            fontSize: "14px",
            lineHeight: "20px",
            fontWeight: 600,
            letterSpacing: "-0.1504px",
          }}
        >
          {title}
        </Text>
        <Text
          render={<p />}
          $css={{
            color: "#45556C",
            fontFamily:
              '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif',
            fontSize: "12px",
            lineHeight: "16px",
            fontWeight: 400,
            letterSpacing: "-0.1504px",
          }}
        >
          {mentor}
        </Text>
        <Text
          render={<p />}
          $css={{
            color: "#62748E",
            fontFamily:
              '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif',
            fontSize: "12px",
            lineHeight: "16px",
            fontWeight: 400,
            letterSpacing: "-0.1504px",
          }}
        >
          {date}
        </Text>
      </VStack>
    </Box>
  );
}

function InterestFieldCard() {
  return (
    <Box
      $css={{
        width: "100%",
        borderRadius: "16px",
        backgroundColor: "#FFFFFF",
        boxShadow: SHADOW,
        paddingTop: "23.992px",
        paddingInline: "23.992px",
        paddingBottom: "23.992px",
      }}
    >
      <Text
        render={<h2 />}
        $css={{
          color: "#0F172B",
          fontFamily:
            '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif',
          fontSize: "18px",
          lineHeight: "28px",
          fontWeight: 700,
          letterSpacing: "-0.4395px",
          marginBottom: "15.995px",
        }}
      >
        관심 분야
      </Text>

      <HStack
        $css={{
          gap: "7.997px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Chip label="해녀" selected />
        <Chip label="귤 농가" selected />
        <Chip label="+ 추가" dashed />
      </HStack>
    </Box>
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
  const displayName = profile.displayName;
  const displayEmail = profile.displayEmail;
  const displayLocation = profile.displayLocation;
  const joinedLabel = profile.joinedLabel;
  const completedCount = String(profile.completedCount);
  const favoriteCount = String(profile.favoriteCount);
  const matchingCount = String(profile.matchingCount);
  const profileStatus: ProfileStatus | null = logoutMutation.isError
    ? {
        tone: "error" as const,
        message: logoutMutation.error.message,
      }
    : profileQuery.isPending && !profileQuery.data
      ? {
          tone: "loading" as const,
          message: "회원 정보를 불러오는 중입니다.",
        }
      : null;

  return (
    <Box
      render={<main />}
      $css={{
        width: "100%",
        height: "100dvh",
        minHeight: "100dvh",
        backgroundColor: PAGE_BG,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Box
        $css={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          backgroundColor: PAGE_BG,
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <Box
          $css={{
            backgroundColor: PROFILE_BG,
            paddingTop: "max(47.995px, calc(env(safe-area-inset-top) + 16px))",
            paddingBottom: "124px",
          }}
        >
          <VStack
            $css={{
              width: "100%",
              maxWidth: CONTENT_WIDTH,
              marginInline: "auto",
              gap: "23.992px",
              paddingInline: "15.995px",
            }}
          >
            <HStack
              $css={{
                gap: "15.995px",
                alignItems: "center",
              }}
            >
              <Box
                $css={{
                  width: "95.991px",
                  height: "95.991px",
                  borderRadius: "16px",
                  border: "3.677px solid #FFFFFF",
                  boxShadow:
                    "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)",
                  overflow: "hidden",
                  flexShrink: 0,
                  backgroundColor: "#FFFFFF",
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
                  gap: "0",
                  minWidth: 0,
                  flex: 1,
                }}
              >
                <Text
                  render={<h1 />}
                  $css={{
                    color: "#FFFFFF",
                    fontFamily:
                      '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif',
                    fontSize: "24px",
                    lineHeight: "32px",
                    fontWeight: 700,
                    letterSpacing: "0.0703px",
                  }}
                >
                  {displayName}
                </Text>
                <Text
                  render={<p />}
                  $css={{
                    color: "rgba(255, 255, 255, 0.8)",
                    fontFamily:
                      '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif',
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 400,
                    letterSpacing: "-0.1504px",
                  }}
                >
                  {displayEmail}
                </Text>

                <HStack
                  $css={{
                    gap: "7.997px",
                    alignItems: "center",
                    marginTop: "3.999px",
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
                {profileStatus ? (
                  <Box
                    $css={{
                      width: "100%",
                      marginTop: "11.996px",
                    }}
                  >
                    <QueryNotice
                      tone={profileStatus.tone}
                      message={profileStatus.message}
                      onRetry={profileStatus.onRetry}
                    />
                  </Box>
                ) : null}
              </VStack>
            </HStack>

            <HStack
              $css={{
                gap: "11.996px",
              }}
            >
              <StatCard
                icon={
                  <CalendarOutlineIcon
                    size={20}
                    color="#FFFFFF"
                    aria-hidden="true"
                  />
                }
                value={completedCount}
                label="완료한 체험"
              />
              <StatCard
                icon={
                  <HeartOutlineIcon
                    size={20}
                    color="#FFFFFF"
                    aria-hidden="true"
                  />
                }
                value={favoriteCount}
                label="관심 직업"
              />
              <StatCard
                icon={
                  <img
                    src={statMatchingMedalIcon}
                    alt=""
                    aria-hidden="true"
                    style={{ width: "100%", height: "100%", display: "block" }}
                  />
                }
                value={matchingCount}
                label="매칭 연결"
              />
            </HStack>
          </VStack>
        </Box>

        <Box
          $css={{
            width: "100%",
            maxWidth: CONTENT_WIDTH,
            marginInline: "auto",
            paddingInline: "15.995px",
            marginTop: "-96px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <InterestFieldCard />
        </Box>

        <VStack
          $css={{
            width: "100%",
            maxWidth: CONTENT_WIDTH,
            marginInline: "auto",
            gap: "23.992px",
            paddingInline: "15.995px",
            marginTop: "23.992px",
            paddingBottom: "24px",
          }}
        >
          <Box
            $css={{
              width: "100%",
              borderRadius: "16px",
              backgroundColor: "#FFFFFF",
              boxShadow: SHADOW,
              paddingTop: "23.992px",
              paddingInline: "23.992px",
              paddingBottom: "23.992px",
            }}
          >
            <HStack
              $css={{
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15.995px",
              }}
            >
              <Text
                render={<h2 />}
                $css={{
                  color: "#0F172B",
                  fontFamily:
                    '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif',
                  fontSize: "18px",
                  lineHeight: "28px",
                  fontWeight: 700,
                  letterSpacing: "-0.4395px",
                }}
              >
                다가오는 예약
              </Text>
              <Box
                render={<button type="button" />}
                $css={{
                  border: "none",
                  backgroundColor: "transparent",
                  padding: "0",
                  color: "#0084D1",
                  cursor: "pointer",
                }}
              >
                <Text
                  $css={{
                    color: "inherit",
                    fontFamily:
                      '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif',
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 500,
                    letterSpacing: "-0.1504px",
                  }}
                >
                  전체보기
                </Text>
              </Box>
            </HStack>

            <VStack
              $css={{
                gap: "11.996px",
              }}
            >
              <ReservationCard
                title="해녀 물질 체험"
                dateTime="2026년 4월 15일 오전 9:00"
                location="제주시 구좌읍"
              />
              <ReservationCard
                title="귤 수확 체험"
                dateTime="2026년 4월 22일 오후 1:00"
                location="서귀포시 남원읍"
              />
            </VStack>
          </Box>

          <Box
            $css={{
              width: "100%",
              borderRadius: "16px",
              backgroundColor: "#FFFFFF",
              boxShadow: SHADOW,
              paddingTop: "23.992px",
              paddingInline: "23.992px",
              paddingBottom: "23.992px",
            }}
          >
            <Text
              render={<h2 />}
              $css={{
                color: "#0F172B",
                fontFamily:
                  '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif',
                fontSize: "18px",
                lineHeight: "28px",
                fontWeight: 700,
                letterSpacing: "-0.4395px",
                marginBottom: "15.995px",
              }}
            >
              완료한 체험
            </Text>

            <HStack
              $css={{
                gap: "11.996px",
                alignItems: "flex-start",
              }}
            >
              <CompletedCard
                imageSrc={completedImageOne}
                title="돌담 쌓기 체험"
                mentor="박철수 멘토"
                date="2026년 3월 28일"
              />
              <CompletedCard
                imageSrc={completedImageTwo}
                title="말 농장 체험"
                mentor="이순이 멘토"
                date="2026년 3월 20일"
              />
            </HStack>
          </Box>

          <Box
            render={
              <button
                type="button"
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
              />
            }
            $css={{
              width: "100%",
              height: "58.923px",
              borderRadius: "14px",
              border: "1.471px solid #E2E8F0",
              backgroundColor: "#FFFFFF",
              color: logoutMutation.isPending ? "#94A3B8" : "#314158",
              cursor: logoutMutation.isPending ? "not-allowed" : "pointer",
            }}
          >
            <Text
              $css={{
                color: "inherit",
                fontFamily:
                  '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif',
                fontSize: "16px",
                lineHeight: "24px",
                fontWeight: 600,
                letterSpacing: "-0.3125px",
              }}
            >
              {logoutMutation.isPending ? "로그아웃 중..." : "로그아웃"}
            </Text>
          </Box>
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
