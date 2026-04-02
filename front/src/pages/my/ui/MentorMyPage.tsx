import completedImageOne from "@/assets/my/completed-1.jpg";
import completedImageTwo from "@/assets/my/completed-2.jpg";
import {
  DEFAULT_SESSION_PROFILE,
  useSessionProfile,
} from "@/features/auth/api/useSessionProfile";
import { ROUTES } from "@/shared/config/routes";
import { ThumbnailCard, type ThumbnailCardProps } from "@/shared/ui/cards";
import haenyeoMentorIcon from "@/shared/assets/haenyeoMentorIcon.svg";
import { BottomNavigation } from "@/shared/ui/navigation/BottomNavigation";
import { QueryNotice } from "@/shared/ui/states/QueryNotice";
import { Box, Button, HStack, Text, VStack } from "@vapor-ui/core";
import { LocationOutlineIcon, TimeOutlineIcon } from "@vapor-ui/icons";

const PROFILE_BLOCK_WIDTH_PX = 358;

const COMPLETED_HISTORY_CARDS: ReadonlyArray<ThumbnailCardProps> = [
  {
    to: ROUTES.experienceDetail,
    imageSrc: completedImageOne,
    imageAlt: "제주의 돌을 쌓는 하루",
    badgeLabel: "25년 이어온",
    badgeTone: "cyan",
    title: "제주의 돌을 쌓는 하루",
    statusLabel: "강** 장인 · D-10",
    caption: "서귀포시 성산읍",
  },
  {
    to: ROUTES.experienceDetail,
    imageSrc: completedImageTwo,
    imageAlt: "금닝 해녀와 함께하는 하루",
    badgeLabel: "정부지원금 30만원",
    badgeTone: "orange",
    title: "금닝 해녀와 함께하는 하루",
    statusLabel: "김** 해녀 · D-10",
    caption: "제주시 구좌읍",
  },
  {
    to: ROUTES.experienceDetail,
    imageSrc: completedImageOne,
    imageAlt: "제주의 돌을 쌓는 하루",
    badgeLabel: "25년 이어온",
    badgeTone: "cyan",
    title: "제주의 돌을 쌓는 하루",
    statusLabel: "강** 장인 · D-10",
    caption: "서귀포시 성산읍",
  },
  {
    to: ROUTES.experienceDetail,
    imageSrc: completedImageTwo,
    imageAlt: "금닝 해녀와 함께하는 하루",
    badgeLabel: "정부지원금 30만원",
    badgeTone: "orange",
    title: "금닝 해녀와 함께하는 하루",
    statusLabel: "김** 해녀 · D-10",
    caption: "제주시 구좌읍",
  },
] as const;

export function MentorMyPage() {
  const profileQuery = useSessionProfile();
  const profile = profileQuery.data ?? DEFAULT_SESSION_PROFILE;
  const profileStatus =
    profileQuery.isError && !profileQuery.data
      ? {
          tone: "error" as const,
          message: profileQuery.error.message,
          onRetry: () => {
            void profileQuery.refetch();
          },
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
        backgroundColor: "var(--vapor-color-background-surface-200, #f7f7f7)",
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
        }}
      >
        <VStack
          $css={{
            alignItems: "center",
            gap: "28px",
            paddingTop: "max(30px, calc(env(safe-area-inset-top) + 8px))",
            paddingBottom: "24px",
          }}
        >
          <VStack
            $css={{
              width: "100%",
              maxWidth: `${PROFILE_BLOCK_WIDTH_PX}px`,
              alignItems: "flex-start",
              gap: "20px",
              boxSizing: "border-box",
            }}
          >
            <HStack
              $css={{
                gap: "28px",
                alignItems: "flex-start",
                paddingLeft: "4px",
              }}
            >
              <Box
                $css={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "26px",
                  border: "1px solid var(--vapor-color-gray-900, #262626)",
                  backgroundColor: "var(--vapor-color-gray-000, #ffffff)",
                  padding: "2px",
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
                    backgroundColor: "var(--vapor-color-orange-300, #f4864f)",
                  }}
                >
                  <Box
                    render={<img src={haenyeoMentorIcon} alt="멘토 프로필" />}
                    $css={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </Box>
              </Box>

              <VStack
                $css={{
                  width: "186.955px",
                  alignItems: "flex-start",
                  gap: "4px",
                }}
              >
                <VStack
                  $css={{
                    alignItems: "flex-start",
                    gap: "0",
                  }}
                >
                  <Text
                    render={<h1 />}
                    $css={{
                      color: "var(--vapor-color-gray-800, #393939)",
                      fontFamily: "var(--vapor-typography-fontFamily-sans)",
                      fontSize: "var(--vapor-typography-fontSize-400)",
                      fontStyle: "normal",
                      fontWeight: 700,
                      lineHeight: "var(--vapor-typography-lineHeight-400)",
                      letterSpacing:
                        "var(--vapor-typography-letterSpacing-300)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {profile.displayName}
                  </Text>
                  <Text
                    render={<p />}
                    $css={{
                      color: "var(--vapor-color-gray-800, #393939)",
                      fontFamily: "var(--vapor-typography-fontFamily-sans)",
                      fontSize: "var(--vapor-typography-fontSize-100)",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "var(--vapor-typography-lineHeight-100)",
                      letterSpacing:
                        "var(--vapor-typography-letterSpacing-100)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {profile.displayEmail}
                  </Text>
                </VStack>

                <HStack
                  $css={{
                    width: "100%",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <HStack
                    $css={{
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <LocationOutlineIcon
                      size={16}
                      color="var(--vapor-color-gray-900, #262626)"
                      aria-hidden="true"
                    />
                    <Text
                      render={<p />}
                      $css={{
                        color: "var(--vapor-color-gray-900, #262626)",
                        fontFamily:
                          '"Inter", "Noto Sans KR", "Pretendard", sans-serif',
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "20px",
                        letterSpacing: "-0.1504px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {profile.displayLocation}
                    </Text>
                  </HStack>

                  <HStack
                    $css={{
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <TimeOutlineIcon
                      size={16}
                      color="var(--vapor-color-gray-900, #262626)"
                      aria-hidden="true"
                    />
                    <Text
                      render={<p />}
                      $css={{
                        color: "var(--vapor-color-gray-900, #262626)",
                        fontFamily:
                          '"Inter", "Noto Sans KR", "Pretendard", sans-serif',
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "20px",
                        letterSpacing: "-0.1504px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {profile.joinedLabel}
                    </Text>
                  </HStack>
                </HStack>
              </VStack>
            </HStack>

            <Button
              size="lg"
              $css={{
                width: "100%",
                height: "48px",
                paddingInline: "var(--vapor-size-space-300)",
                justifyContent: "center",
                alignItems: "center",
                gap: "var(--vapor-button-gap, 6px)",
                borderRadius: "var(--vapor-size-borderRadius-300)",
                border: "1px solid var(--vapor-color-gray-200, #c6c6c6)",
                backgroundColor: "var(--vapor-color-gray-050, #f7f7f7)",
                color: "var(--vapor-color-gray-800, #393939)",
                fontFamily: "var(--vapor-typography-fontFamily-sans)",
                fontSize: "var(--vapor-typography-fontSize-100)",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "var(--vapor-typography-lineHeight-100)",
                letterSpacing: "var(--vapor-typography-letterSpacing-100)",
              }}
            >
              프로필 수정
            </Button>
          </VStack>

          {profileStatus ? (
            <Box
              $css={{
                width: "100%",
                maxWidth: `${PROFILE_BLOCK_WIDTH_PX}px`,
              }}
            >
              <QueryNotice
                tone={profileStatus.tone}
                message={profileStatus.message}
                onRetry={profileStatus.onRetry}
              />
            </Box>
          ) : null}

          <VStack
            $css={{
              width: "100%",
              maxWidth: `${PROFILE_BLOCK_WIDTH_PX}px`,
              alignItems: "flex-start",
              gap: "16px",
              boxSizing: "border-box",
            }}
          >
            <Text
              render={<h2 />}
              $css={{
                color: "var(--vapor-color-gray-900, #262626)",
                fontFamily: "var(--vapor-typography-fontFamily-sans)",
                fontSize: "32px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "48px",
                letterSpacing: "-0.5px",
              }}
            >
              완료 내역
            </Text>

            <Box
              $css={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "16px",
              }}
            >
              {COMPLETED_HISTORY_CARDS.map((card, index) => (
                <Box
                  key={`${card.title}-${index}`}
                  $css={{
                    width: "100%",
                  }}
                >
                  <ThumbnailCard {...card} />
                </Box>
              ))}
            </Box>
          </VStack>
        </VStack>
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
