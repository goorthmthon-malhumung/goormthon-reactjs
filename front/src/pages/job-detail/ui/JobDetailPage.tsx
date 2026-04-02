import { useJobDetailView } from "@/features/jobs/api/useJobDetailView";
import { ROUTES } from "@/shared/config/routes";
import {
  asRecord,
  getNumber,
  getString,
  getStringList,
} from "@/shared/lib/apiData";
import { QueryNotice } from "@/shared/ui/states/QueryNotice";
import { Box, HStack, Text, VStack } from "@vapor-ui/core";
import { GroupOutlineIcon } from "@vapor-ui/icons";
import { useNavigate, useParams } from "react-router-dom";

const DEFAULT_JOB_ID = 1;
const HERO_HEIGHT_PX = 379;
const CONTENT_OVERLAP_PX = 29;
const CONTENT_SIDE_PADDING_PX = 24;
const CTA_BOTTOM_OFFSET_PX = 50.08;
const CTA_HEIGHT_PX = 58.923;
const TITLE_FONT =
  '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif';
const RESERVE_BUTTON_LABEL = "체험 예약하기";

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
        borderRadius: "999px",
        backgroundColor: "#EEF9FB",
        paddingInline: "12px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <Text
        render={<span />}
        $css={{
          color: "#0D8298",
          fontFamily: TITLE_FONT,
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

export function JobDetailPage() {
  const navigate = useNavigate();
  const { jobSlug } = useParams();
  const parsedJobId = Number(jobSlug);
  const jobId =
    Number.isInteger(parsedJobId) && parsedJobId > 0
      ? parsedJobId
      : DEFAULT_JOB_ID;
  const jobQuery = useJobDetailView(jobId);
  const job = asRecord(jobQuery.data?.data);
  const experienceId = getNumber(job, "experienceId");
  const title = getString(job, "title");
  const introduction = getString(job, "introduction");
  const heroImageSrc = getString(job, "mainUrl");
  const skills = getStringList(job, "skills");
  const participantLabel = formatParticipantLabel(
    getNumber(job, "participantCount"),
    getNumber(job, "maxParticipants"),
  );
  const mentorName = getString(job, "mentorName");
  const jobType = getString(job, "jobType");
  const workHours = getString(job, "workHours");
  const physicalLevel = getString(job, "physicalLevel");
  const detailTags = [workHours, physicalLevel].filter(
    (value): value is string => Boolean(value),
  );
  const canReserve =
    !jobQuery.isPending && typeof experienceId === "number";

  const pageStatus = jobQuery.isError
    ? {
        tone: "error" as const,
        message: jobQuery.error.message,
        onRetry: () => {
          void jobQuery.refetch();
        },
      }
    : jobQuery.isPending
      ? {
          tone: "loading" as const,
          message: "직업 정보를 불러오는 중입니다.",
        }
      : null;

  return (
    <Box
      render={<main />}
      $css={{
        width: "100%",
        height: "100dvh",
        minHeight: "100dvh",
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      <Box
        $css={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Box
          $css={{
            position: "absolute",
            inset: 0,
            overflowY: "auto",
            overflowX: "hidden",
            backgroundColor: "#FFFFFF",
          }}
        >
          <Box
            $css={{
              position: "relative",
              width: "100%",
              height: `${HERO_HEIGHT_PX}px`,
              overflow: "hidden",
              backgroundColor: "#0B1020",
            }}
          >
            {heroImageSrc ? (
              <Box
                render={<img src={heroImageSrc} alt="" aria-hidden="true" />}
                $css={{
                  position: "absolute",
                  inset: 0,
                  width: "127.31%",
                  height: "100%",
                  left: "-12.04%",
                  top: "-0.05%",
                  objectFit: "cover",
                }}
              />
            ) : null}

            <Box
              $css={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: "252px",
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)",
              }}
            />

            <Box
              $css={{
                position: "absolute",
                left: "16px",
                right: "16px",
                bottom: "49px",
              }}
            >
              <VStack
                $css={{
                  width: "100%",
                  maxWidth: "358px",
                  marginInline: "auto",
                  gap: "8px",
                  alignItems: "flex-start",
                }}
              >
                {jobType ? (
                  <Box
                    $css={{
                      height: "32px",
                      width: "fit-content",
                      borderRadius: "999px",
                      backgroundColor: "#EF6F25",
                      paddingInline: "12px",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      render={<span />}
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
                      {jobType}
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
                    width: "100%",
                    wordBreak: "keep-all",
                  }}
                >
                  {title ?? ""}
                </Text>

                {participantLabel ? (
                  <HStack
                    $css={{
                      gap: "3.999px",
                      alignItems: "center",
                    }}
                  >
                    <GroupOutlineIcon size={16} color="#FFFFFF" aria-hidden="true" />
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
          </Box>

          <Box
            $css={{
              position: "relative",
              marginTop: `-${CONTENT_OVERLAP_PX}px`,
              backgroundColor: "#FFFFFF",
              borderTopLeftRadius: "30px",
              borderTopRightRadius: "30px",
              paddingTop: "28px",
              paddingInline: `${CONTENT_SIDE_PADDING_PX}px`,
              paddingBottom: "calc(180px + env(safe-area-inset-bottom))",
            }}
          >
            <VStack
              $css={{
                width: "100%",
                gap: "24px",
              }}
            >
              {pageStatus ? (
                <QueryNotice
                  tone={pageStatus.tone}
                  message={pageStatus.message}
                  onRetry={pageStatus.onRetry}
                />
              ) : null}

              {detailTags.length > 0 ? (
                <VStack
                  $css={{
                    gap: "16px",
                  }}
                >
                  <SectionTitle>기본 정보</SectionTitle>
                  <Box
                    $css={{
                      display: "flex",
                      flexWrap: "wrap",
                      columnGap: "10px",
                      rowGap: "8px",
                      alignItems: "center",
                    }}
                  >
                    {detailTags.map((item) => (
                      <SkillPill key={item} label={item} />
                    ))}
                  </Box>
                </VStack>
              ) : null}

              {introduction ? (
                <VStack
                  $css={{
                    gap: "16px",
                  }}
                >
                  <SectionTitle>직업 소개</SectionTitle>
                  <Text
                    render={<p />}
                    $css={{
                      color: "#767676",
                      fontFamily: TITLE_FONT,
                      fontSize: "16px",
                      lineHeight: "24px",
                      fontWeight: 500,
                      letterSpacing: "-0.1px",
                      wordBreak: "keep-all",
                    }}
                  >
                    {introduction}
                  </Text>
                </VStack>
              ) : null}

              {skills.length > 0 ? (
                <VStack
                  $css={{
                    gap: "16px",
                  }}
                >
                  <SectionTitle>기술</SectionTitle>
                  <Box
                    $css={{
                      display: "flex",
                      flexWrap: "wrap",
                      columnGap: "10px",
                      rowGap: "8px",
                      alignItems: "center",
                    }}
                  >
                    {skills.map((skill, index) => (
                      <SkillPill key={`${skill}-${index}`} label={skill} />
                    ))}
                  </Box>
                </VStack>
              ) : null}

              {!pageStatus &&
              detailTags.length === 0 &&
              !introduction &&
              skills.length === 0 ? (
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
                    서버 응답에 표시할 직업 상세 정보가 없습니다.
                  </Text>
                </Box>
              ) : null}
            </VStack>
          </Box>
        </Box>

        <Box
          $css={{
            position: "absolute",
            left: "15.99px",
            right: "15.99px",
            bottom: `${CTA_BOTTOM_OFFSET_PX}px`,
            zIndex: 10,
          }}
        >
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
                disabled={!canReserve}
              />
            }
            $css={{
              width: "100%",
              height: `${CTA_HEIGHT_PX}px`,
              border: "none",
              borderRadius: "14px",
              backgroundColor: "#1CB3CB",
              color: "#FFFFFF",
              display: "grid",
              placeItems: "center",
              cursor: canReserve ? "pointer" : "not-allowed",
              opacity: canReserve ? 1 : 0.6,
              padding: 0,
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
              {RESERVE_BUTTON_LABEL}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default JobDetailPage;
