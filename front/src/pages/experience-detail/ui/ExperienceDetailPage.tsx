import heroImage from "@/assets/experience-detail/hero.jpg";
import galleryBeachImage from "@/assets/experience-detail/gallery-beach.jpg";
import {
  DEFAULT_EXPERIENCE_DETAIL_VIEW,
  useExperienceDetailView,
} from "@/features/experiences/api/useExperienceDetailView";
import { ROUTES } from "@/shared/config/routes";
import { QueryNotice } from "@/shared/ui/states/QueryNotice";
import { Box, HStack, Text, VStack } from "@vapor-ui/core";
import {
  ChevronLeftOutlineIcon,
  LocationOutlineIcon,
  UserOutlineIcon,
} from "@vapor-ui/icons";
import { useNavigate } from "react-router-dom";

const PAGE_BG = "#FFFFFF";
const EXPERIENCE_ID = 1;
const TITLE_FONT =
  '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif';
const HERO_HEIGHT = "379px";
const HERO_OVERLAY_BOTTOM = "49px";
const CONTENT_SIDE_PADDING = "24px";
const CTA_HEIGHT = "58.923px";
const CTA_BOTTOM = "50.08px";

const MENTORS = [
  {
    imageSrc: heroImage,
    title: "김영숙 멘토",
    meta: "68세 · 45년 경력",
    badge: "제주특별자치도 무형문화재",
  },
  {
    imageSrc: galleryBeachImage,
    title: "임지은 멘토",
    meta: "72세 · 45년 경력",
    badge: "해녀 기능 보유자",
  },
] as const;

function SectionTitle({ children }: { children: string }) {
  return (
    <Text
      render={<h2 />}
      $css={{
        color: "#393939",
        fontFamily: TITLE_FONT,
        fontSize: "18px",
        lineHeight: "26px",
        fontWeight: 700,
        letterSpacing: "-0.1px",
      }}
    >
      {children}
    </Text>
  );
}

function SkillPill({ label }: { label: string }) {
  return (
    <Box
      $css={{
        height: "32px",
        paddingInline: "12px",
        borderRadius: "999px",
        backgroundColor: "var(--vapor-color-cyan-050, #eef9fb)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        render={<span />}
        $css={{
          color: "var(--vapor-color-cyan-400, #17a3ba)",
          fontFamily: TITLE_FONT,
          fontSize: "12px",
          lineHeight: "18px",
          fontWeight: 500,
          letterSpacing: "0px",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </Text>
    </Box>
  );
}

function MentorCard({
  imageSrc,
  title,
  meta,
  badge,
}: {
  imageSrc: string;
  title: string;
  meta: string;
  badge: string;
}) {
  return (
    <Box
      $css={{
        position: "relative",
        width: "297px",
        height: "168px",
        borderRadius: "16px",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      <Box
        render={<img src={imageSrc} alt="" aria-hidden="true" />}
        $css={{
          position: "absolute",
          inset: 0,
          width: "127.31%",
          height: "100%",
          left: "-12.04%",
          top: "-0.05%",
          objectFit: "cover",
          display: "block",
        }}
      />
      <Box
        $css={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(194, 232, 240, 0) 15.734%, rgba(194, 232, 240, 0.88) 87.413%)",
        }}
      />

      <VStack
        $css={{
          position: "absolute",
          left: "17px",
          right: "141px",
          bottom: "20px",
          gap: "8px",
          zIndex: 1,
        }}
      >
        <VStack
          $css={{
            gap: "2px",
          }}
        >
          <Text
            render={<h3 />}
            $css={{
              color: "#393939",
              fontFamily: TITLE_FONT,
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
          <Text
            render={<p />}
            $css={{
              color: "#4C4C4C",
              fontFamily: TITLE_FONT,
              fontSize: "14px",
              lineHeight: "22px",
              fontWeight: 500,
              letterSpacing: "-0.1px",
              whiteSpace: "nowrap",
            }}
          >
            {meta}
          </Text>
        </VStack>

        <Box
          $css={{
            width: "fit-content",
            borderRadius: "999px",
            backgroundColor: "var(--vapor-color-cyan-050, #eef9fb)",
            paddingInline: "8px",
            paddingBlock: "3px",
          }}
        >
          <HStack
            $css={{
              gap: "4px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LocationOutlineIcon size={12} color="#17A3BA" />
            <Text
              render={<span />}
              $css={{
                color: "var(--vapor-color-cyan-400, #17a3ba)",
                fontFamily: TITLE_FONT,
                fontSize: "12px",
                lineHeight: "18px",
                fontWeight: 500,
                letterSpacing: "0px",
                whiteSpace: "nowrap",
              }}
            >
              {badge}
            </Text>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
}

export function ExperienceDetailPage() {
  const navigate = useNavigate();
  const experienceQuery = useExperienceDetailView(EXPERIENCE_ID);
  const experience = experienceQuery.data ?? DEFAULT_EXPERIENCE_DETAIL_VIEW;
  const experienceId = experience.experienceId;
  const title = experience.title;
  const introduction = experience.introduction;
  const heroImageSrc = experience.heroImageSrc;
  const skills = experience.skills;
  const currentParticipants = experience.currentParticipants;
  const maxParticipants = experience.maxParticipants;
  const mentorName = experience.mentorName;
  const pageStatus = experienceQuery.isError
    ? {
        tone: "error" as const,
        message: experienceQuery.error.message,
        onRetry: () => {
          void experienceQuery.refetch();
        },
      }
    : experienceQuery.isPending
      ? {
          tone: "loading" as const,
          message: "체험 정보를 불러오는 중입니다.",
        }
      : null;

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate(ROUTES.matching);
  };

  return (
    <Box
      render={<main />}
      $css={{
        backgroundColor: PAGE_BG,
        overflow: "hidden",
      }}
    >
      <Box
        $css={{
          position: "absolute",
          inset: 0,
          minHeight: "100dvh",
          backgroundColor: PAGE_BG,
          overflow: "hidden",
        }}
      >
        <Box
          $css={{
            position: "absolute",
            inset: 0,
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <Box
            $css={{
              position: "relative",
              width: "100%",
              height: HERO_HEIGHT,
              overflow: "hidden",
              backgroundColor: "#0B1020",
            }}
          >
            <Box
              render={<img src={heroImageSrc} alt="" />}
              aria-hidden="true"
              $css={{
                position: "absolute",
                inset: 0,
                width: "127.31%",
                height: "100%",
                left: "-12.04%",
                top: "-0.05%",
                objectFit: "cover",
                display: "block",
              }}
            />
            <Box
              $css={{
                position: "absolute",
                left: 0,
                right: 0,
                top: "127px",
                height: "252px",
                background:
                  "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%)",
              }}
            />

            <Box
              render={
                <button type="button" onClick={handleBack} aria-label="뒤로가기" />
              }
              $css={{
                position: "absolute",
                top: "8px",
                left: "16px",
                width: "39.998px",
                height: "39.998px",
                border: "none",
                borderRadius: "999px",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
                zIndex: 2,
              }}
            >
              <ChevronLeftOutlineIcon size={20} color="#0F172B" />
            </Box>

            <VStack
              $css={{
                position: "absolute",
                left: "16px",
                right: "16px",
                bottom: HERO_OVERLAY_BOTTOM,
                gap: "8px",
                zIndex: 1,
              }}
            >
              <Box
                $css={{
                  width: "fit-content",
                  height: "32px",
                  paddingInline: "12px",
                  borderRadius: "999px",
                  backgroundColor: "#EF6F25",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  render={<p />}
                  $css={{
                    color: "#FFF6F1",
                    fontFamily: TITLE_FONT,
                    fontSize: "14px",
                    lineHeight: "22px",
                    fontWeight: 500,
                    letterSpacing: "-0.1px",
                    whiteSpace: "nowrap",
                  }}
                >
                  D - 20
                </Text>
              </Box>

              <Text
                render={
                  <h1
                    style={{
                      display: "-webkit-box",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                    }}
                  />
                }
                $css={{
                  color: "#FFFFFF",
                  fontFamily: TITLE_FONT,
                  fontSize: "24px",
                  lineHeight: "36px",
                  fontWeight: 700,
                  letterSpacing: "-0.3px",
                }}
              >
                  {title}
              </Text>

              <HStack
                $css={{
                  gap: "4px",
                  alignItems: "center",
                }}
              >
                <UserOutlineIcon size={16} color="#FFFFFF" />
                <Text
                  render={<p />}
                  $css={{
                    color: "#FFFFFF",
                    fontFamily: TITLE_FONT,
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 400,
                    letterSpacing: "-0.1504px",
                  }}
                >
                  {currentParticipants}/{maxParticipants}명
                </Text>
              </HStack>
            </VStack>
          </Box>

          <Box
            $css={{
              position: "relative",
              width: "100%",
              marginTop: "-29px",
            }}
          >
            <Box
              $css={{
                backgroundColor: "#FFFFFF",
                borderTopLeftRadius: "30px",
                borderTopRightRadius: "30px",
                minHeight: "780px",
                paddingTop: "28px",
                paddingBottom: "calc(180px + env(safe-area-inset-bottom))",
              }}
            >
              <VStack
                $css={{
                  width: "100%",
                  gap: "24px",
                  paddingInline: CONTENT_SIDE_PADDING,
                }}
              >
                {pageStatus ? (
                  <QueryNotice
                    tone={pageStatus.tone}
                    message={pageStatus.message}
                    onRetry={pageStatus.onRetry}
                  />
                ) : null}
                <VStack
                  $css={{
                    gap: "16px",
                  }}
                >
                  <Text
                    render={<h2 />}
                    $css={{
                      color: "#393939",
                      fontFamily: TITLE_FONT,
                      fontSize: "18px",
                      lineHeight: "26px",
                      fontWeight: 700,
                      letterSpacing: "-0.1px",
                    }}
                  >
                    제주의 말을 돌보는 하루
                  </Text>
                  <Text
                    render={<p />}
                    $css={{
                      color: "#767676",
                      fontFamily: TITLE_FONT,
                      fontSize: "16px",
                      lineHeight: "24px",
                      fontWeight: 500,
                      letterSpacing: "-0.1px",
                    }}
                  >
                    {introduction}
                  </Text>
                </VStack>

                <VStack
                  $css={{
                    gap: "16px",
                  }}
                >
                  <SectionTitle>배울 수 있는 기술</SectionTitle>
                  <HStack
                    $css={{
                      gap: "8px",
                      flexWrap: "wrap",
                      alignItems: "center",
                    }}
                  >
                    {skills.map((skill) => (
                      <SkillPill key={skill} label={skill} />
                    ))}
                  </HStack>
                </VStack>

                <VStack
                  $css={{
                    gap: "16px",
                  }}
                >
                  <SectionTitle>해녀 멘토분들을 만나보세요</SectionTitle>
                  <HStack
                    $css={{
                      gap: "10px",
                      alignItems: "center",
                      overflowX: "auto",
                      overflowY: "hidden",
                      paddingBottom: "2px",
                    }}
                  >
                    {MENTORS.map((mentor) => (
                      <MentorCard
                        key={mentor.title}
                        imageSrc={mentor.imageSrc}
                        title={mentor.title}
                        meta={mentor.meta}
                        badge={mentor.badge}
                      />
                    ))}
                  </HStack>
                </VStack>
              </VStack>
            </Box>
          </Box>
        </Box>

        <Box
          render={
            <button
              type="button"
              onClick={() =>
                navigate(ROUTES.reservation, {
                  state: {
                    experienceId,
                    summaryTitle: title,
                    summaryMentor: mentorName,
                  },
                })
              }
              disabled={experienceQuery.isPending || experienceQuery.isError}
            />
          }
          $css={{
            position: "absolute",
            left: "15.99px",
            right: "15.99px",
            bottom: CTA_BOTTOM,
            height: CTA_HEIGHT,
            border: "none",
            borderRadius: "14px",
            backgroundColor: "#1CB3CB",
            color: "#FFFFFF",
            cursor:
              experienceQuery.isPending || experienceQuery.isError
                ? "not-allowed"
                : "pointer",
            opacity:
              experienceQuery.isPending || experienceQuery.isError ? 0.6 : 1,
            zIndex: 5,
            display: "grid",
            placeItems: "center",
          }}
        >
          <Text
            $css={{
              color: "inherit",
              fontFamily: TITLE_FONT,
              fontSize: "16px",
              lineHeight: "24px",
              fontWeight: 600,
              letterSpacing: "-0.3125px",
            }}
          >
            체험 예약하기
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
