import { useExperienceDetailView } from "@/features/experiences/api/useExperienceDetailView";
import { ROUTES } from "@/shared/config/routes";
import {
  asRecord,
  getNumber,
  getString,
  getStringList,
} from "@/shared/lib/apiData";
import { QueryNotice } from "@/shared/ui/states/QueryNotice";
import { Box, HStack, Text, VStack } from "@vapor-ui/core";
import {
  ChevronLeftOutlineIcon,
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

function formatParticipantLabel(
  participantCount?: number,
  maxParticipants?: number,
) {
  if (
    typeof participantCount === "number" &&
    typeof maxParticipants === "number"
  ) {
    return `${participantCount}/${maxParticipants}명`;
  }

  if (typeof participantCount === "number") {
    return `${participantCount}명`;
  }

  if (typeof maxParticipants === "number") {
    return `정원 ${maxParticipants}명`;
  }

  return undefined;
}

export function ExperienceDetailPage() {
  const navigate = useNavigate();
  const experienceQuery = useExperienceDetailView(EXPERIENCE_ID);
  const experience = asRecord(experienceQuery.data?.data);
  const experienceId = getNumber(experience, "id") ?? EXPERIENCE_ID;
  const title = getString(experience, "title");
  const introduction = getString(experience, "introduction");
  const heroImageSrc = getString(experience, "photoUrl");
  const mentorName = getString(experience, "mentorName");
  const experienceType = getString(experience, "experienceType");
  const location = getString(experience, "location");
  const schedule = getString(experience, "schedule");
  const inclusions = getStringList(experience, "inclusions");
  const requirements = getStringList(experience, "requirements");
  const participantLabel = formatParticipantLabel(
    getNumber(experience, "participantCount"),
    getNumber(experience, "maxParticipants"),
  );
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
            {heroImageSrc ? (
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
            ) : null}
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
              {experienceType ? (
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
                    {experienceType}
                  </Text>
                </Box>
              ) : null}

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
                {title ?? ""}
              </Text>

              {participantLabel ? (
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
                    {participantLabel}
                  </Text>
                </HStack>
              ) : null}
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
                {introduction ? (
                  <VStack
                    $css={{
                      gap: "16px",
                    }}
                  >
                    <SectionTitle>체험 소개</SectionTitle>
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
                ) : null}

                {schedule ? (
                  <VStack
                    $css={{
                      gap: "16px",
                    }}
                  >
                    <SectionTitle>일정</SectionTitle>
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
                      {schedule}
                    </Text>
                  </VStack>
                ) : null}

                {location ? (
                  <VStack
                    $css={{
                      gap: "16px",
                    }}
                  >
                    <SectionTitle>장소</SectionTitle>
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
                      {location}
                    </Text>
                  </VStack>
                ) : null}

                {inclusions.length > 0 ? (
                  <VStack
                    $css={{
                      gap: "16px",
                    }}
                  >
                    <SectionTitle>포함 사항</SectionTitle>
                    <HStack
                      $css={{
                        gap: "8px",
                        flexWrap: "wrap",
                        alignItems: "center",
                      }}
                    >
                      {inclusions.map((item) => (
                        <SkillPill key={item} label={item} />
                      ))}
                    </HStack>
                  </VStack>
                ) : null}

                {requirements.length > 0 ? (
                  <VStack
                    $css={{
                      gap: "16px",
                    }}
                  >
                    <SectionTitle>참여 조건</SectionTitle>
                    <HStack
                      $css={{
                        gap: "8px",
                        flexWrap: "wrap",
                        alignItems: "center",
                      }}
                    >
                      {requirements.map((item) => (
                        <SkillPill key={item} label={item} />
                      ))}
                    </HStack>
                  </VStack>
                ) : null}

                {!pageStatus &&
                !introduction &&
                !schedule &&
                !location &&
                inclusions.length === 0 &&
                requirements.length === 0 ? (
                  <Box
                    $css={{
                      width: "100%",
                      borderRadius: "16px",
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
                        fontFamily: TITLE_FONT,
                        fontSize: "14px",
                        lineHeight: "22px",
                        fontWeight: 500,
                        letterSpacing: "-0.1px",
                      }}
                    >
                      서버 응답에 표시할 체험 상세 정보가 없습니다.
                    </Text>
                  </Box>
                ) : null}
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
                    summaryTitle: title ?? "",
                    summaryMentor: mentorName,
                  },
                })
              }
              disabled={experienceQuery.isPending}
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
            cursor: experienceQuery.isPending ? "not-allowed" : "pointer",
            opacity: experienceQuery.isPending ? 0.6 : 1,
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
