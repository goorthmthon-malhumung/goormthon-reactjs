import {
  DEFAULT_JOB_DETAIL_VIEW,
  useJobDetailView,
} from "@/features/jobs/api/useJobDetailView";
import { ROUTES } from "@/shared/config/routes";
import { QueryNotice } from "@/shared/ui/states/QueryNotice";
import { Box, HStack, Text, VStack } from "@vapor-ui/core";
import { GroupOutlineIcon } from "@vapor-ui/icons";
import { useNavigate } from "react-router-dom";

const JOB_ID = 1;
const FALLBACK_EXPERIENCE_ID = 1;
const HERO_HEIGHT_PX = 379;
const CONTENT_OVERLAP_PX = 29;
const CONTENT_SIDE_PADDING_PX = 24;
const CTA_BOTTOM_OFFSET_PX = 50.08;
const CTA_HEIGHT_PX = 58.923;
const TITLE_FONT =
  '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif';

const FIGMA_MENTOR_CARD_IMAGE =
  "https://www.figma.com/api/mcp/asset/3b96dd9e-019d-41df-96fb-49411b14e935";
const FIGMA_MENTOR_BADGE_ICON =
  "https://www.figma.com/api/mcp/asset/f8d9c380-c80d-4589-94cb-863f30b37c59";

const DEADLINE_LABEL = "D - 20";
const RESERVE_BUTTON_LABEL = "체험 예약하기";

const MENTOR_CARD_ITEMS = [
  {
    title: "김영숙 멘토",
    subtitleParts: ["68세", "45년 경력"],
    chipLabel: "제주특별자치도 무형문화재",
    chipWidth: "159.996px",
  },
  {
    title: "임지은 멘토",
    subtitleParts: ["72세", "45년 경력"],
    chipLabel: "해녀 기능 보유자",
    chipWidth: "110.996px",
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

function MentorChip({
  label,
  width,
}: {
  label: string;
  width: string;
}) {
  return (
    <Box
      $css={{
        width,
        height: "24px",
        borderRadius: "999px",
        backgroundColor: "#EEF9FB",
        paddingInline: "8px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
      }}
    >
      <HStack
        $css={{
          gap: "4px",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Box
          render={<img src={FIGMA_MENTOR_BADGE_ICON} alt="" aria-hidden="true" />}
          $css={{
            width: "11.996px",
            height: "11.996px",
            display: "block",
            flexShrink: 0,
          }}
        />
        <Text
          render={<span />}
          $css={{
            color: "#17A3BA",
            fontFamily: TITLE_FONT,
            fontSize: "12px",
            lineHeight: "18px",
            fontWeight: 500,
            letterSpacing: "0",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </Text>
      </HStack>
    </Box>
  );
}

function MentorCard({
  title,
  subtitleParts,
  chipLabel,
  chipWidth,
}: {
  title: string;
  subtitleParts: readonly string[];
  chipLabel: string;
  chipWidth: string;
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
        backgroundColor: "#FFFFFF",
      }}
    >
      <Box
        render={<img src={FIGMA_MENTOR_CARD_IMAGE} alt="" aria-hidden="true" />}
        $css={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      <Box
        $css={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(194,232,240,0) 15.734%, rgba(194,232,240,0.96) 87.413%)",
        }}
      />

      <VStack
        $css={{
          position: "absolute",
          left: "17px",
          bottom: "20px",
          width: "168px",
          gap: "8px",
          alignItems: "flex-start",
        }}
      >
        <VStack
          $css={{
            gap: "2px",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <Text
            render={<p />}
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
              width: "100%",
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
            {subtitleParts.map((part, index) => (
              <Text
                key={`${title}-${part}`}
                render={<span />}
                $css={{
                  color: "inherit",
                  fontFamily: TITLE_FONT,
                  fontSize: "14px",
                  lineHeight: "22px",
                  fontWeight: 500,
                  letterSpacing: "-0.1px",
                  whiteSpace: "nowrap",
                }}
              >
                {index > 0 ? `· ${part}` : part}
              </Text>
            ))}
          </HStack>
        </VStack>

        <MentorChip label={chipLabel} width={chipWidth} />
      </VStack>
    </Box>
  );
}

export function JobDetailPage() {
  const navigate = useNavigate();
  const jobQuery = useJobDetailView(JOB_ID);
  const job = jobQuery.data ?? DEFAULT_JOB_DETAIL_VIEW;
  const title = job.title;
  const introduction = job.introduction;
  const heroImageSrc = job.heroImageSrc;
  const skills = job.skills;
  const currentParticipants = job.currentParticipants;
  const maxParticipants = job.maxParticipants;
  const mentorName = job.mentorName;

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
                    {DEADLINE_LABEL}
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
                    width: "100%",
                    wordBreak: "keep-all",
                  }}
                >
                  {title}
                </Text>

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
                    {currentParticipants}/{maxParticipants}명
                  </Text>
                </HStack>
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

              <VStack
                $css={{
                  gap: "16px",
                }}
              >
                <SectionTitle>제주의 말을 돌보는 하루</SectionTitle>
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

              <VStack
                $css={{
                  gap: "16px",
                }}
              >
                <SectionTitle>배울 수 있는 기술</SectionTitle>
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

              <VStack
                $css={{
                  gap: "16px",
                }}
              >
                <SectionTitle>해녀 멘토분들을 만나보세요</SectionTitle>
                <Box
                  $css={{
                    width: "100%",
                    overflowX: "auto",
                    overflowY: "hidden",
                  }}
                >
                  <HStack
                    $css={{
                      gap: "10px",
                      width: "max-content",
                      paddingBottom: "4px",
                    }}
                  >
                    {MENTOR_CARD_ITEMS.map((item) => (
                      <MentorCard key={item.title} {...item} />
                    ))}
                  </HStack>
                </Box>
              </VStack>
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
                      experienceId: FALLBACK_EXPERIENCE_ID,
                      summaryTitle: title,
                      summaryMentor: mentorName,
                    },
                  })
                }
                disabled={jobQuery.isPending || jobQuery.isError}
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
              cursor: jobQuery.isPending || jobQuery.isError ? "not-allowed" : "pointer",
              opacity: jobQuery.isPending || jobQuery.isError ? 0.6 : 1,
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
