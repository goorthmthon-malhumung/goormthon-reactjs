import { useJobDetailView } from "@/features/jobs/api/useJobDetailView";
import mentorRosterCardImage from "@/assets/job-detail/mentor-roster-card.jpg";
import {
  getCategoryMentorRosterByJobSlug,
  type DetailMentorRosterEntry,
} from "@/features/jobs/lib/detailContentRegistry";
import {
  DEFAULT_MOCK_JOB_DETAIL,
  getMockJobDetailBySlug,
} from "@/features/jobs/lib/fallbackMatchingCards";
import { ROUTES } from "@/shared/config/routes";
import {
  asRecord,
  getNumber,
  getString,
  getStringList,
} from "@/shared/lib/apiData";
import { Box, HStack, Text, VStack } from "@vapor-ui/core";
import { LocationOutlineIcon } from "@vapor-ui/icons";
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

function MentorRosterCard({ mentor }: { mentor: DetailMentorRosterEntry }) {
  return (
    <Box
      $css={{
        width: "297px",
        height: "168px",
        position: "relative",
        overflow: "hidden",
        borderRadius: "16px",
        flex: "0 0 auto",
        backgroundColor: "#FFFFFF",
      }}
    >
      <Box
        render={
          <img
            src={mentorRosterCardImage}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            width={297}
            height={168}
          />
        }
        $css={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
          objectFit: "cover",
        }}
      />
      <Box
        $css={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(194,232,240,0) 15.73%, rgba(194,232,240,0.92) 87.41%)",
        }}
      />
      <VStack
        $css={{
          position: "absolute",
          left: "17px",
          right: "17px",
          bottom: "20px",
          gap: "8px",
          alignItems: "stretch",
        }}
      >
        <VStack
          $css={{
            gap: "2px",
            alignItems: "flex-start",
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
              width: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              wordBreak: "keep-all",
            }}
          >
            {mentor.name}
          </Text>
          <HStack
            $css={{
              alignItems: "center",
              gap: "4px",
              color: "#4C4C4C",
              width: "100%",
            }}
          >
            <Text
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
              {mentor.age}세
            </Text>
            {mentor.careerLabel ? (
              <>
                <Text
                  render={<span />}
                  $css={{
                    color: "inherit",
                    fontFamily: TITLE_FONT,
                    fontSize: "14px",
                    lineHeight: "22px",
                    fontWeight: 500,
                    letterSpacing: "-0.1px",
                  }}
                >
                  ·
                </Text>
                <Text
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
                  {mentor.careerLabel}
                </Text>
              </>
            ) : null}
          </HStack>
        </VStack>

        <Box
          $css={{
            width: "fit-content",
            maxWidth: "100%",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "999px",
            backgroundColor: "#EEF9FB",
            padding: "3px 8px",
            boxSizing: "border-box",
          }}
        >
          <HStack
            $css={{
              gap: "4px",
              alignItems: "center",
            }}
          >
            <LocationOutlineIcon size={12} color="#17A3BA" />
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
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {mentor.highlightLabel ?? mentor.location}
            </Text>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
}

export function JobDetailPage() {
  const navigate = useNavigate();
  const { jobSlug } = useParams();
  const parsedJobId = Number(jobSlug);
  const isNumericJobRoute = Number.isInteger(parsedJobId) && parsedJobId > 0;
  const jobId = isNumericJobRoute ? parsedJobId : DEFAULT_JOB_ID;
  const mockJobDetail =
    getMockJobDetailBySlug(jobSlug) ?? DEFAULT_MOCK_JOB_DETAIL;
  const jobQuery = useJobDetailView(jobId, isNumericJobRoute);
  const job = asRecord(jobQuery.data?.data);
  const experienceId =
    getNumber(job, "experienceId") ?? mockJobDetail.experienceId;
  const title = getString(job, "title") ?? mockJobDetail.title;
  const introduction =
    getString(job, "introduction") ?? mockJobDetail.introduction;
  const heroImageSrc = getString(job, "mainUrl") ?? mockJobDetail.mainUrl;
  const skills = getStringList(job, "skills");
  const resolvedSkills = skills.length > 0 ? skills : [...mockJobDetail.skills];
  const mentorName = getString(job, "mentorName") ?? mockJobDetail.mentorName;
  const jobType = getString(job, "jobType") ?? mockJobDetail.jobType;
  const workHours = getString(job, "workHours") ?? mockJobDetail.workHours;
  const physicalLevel =
    getString(job, "physicalLevel") ?? mockJobDetail.physicalLevel;
  const detailTags = [workHours, physicalLevel].filter(
    (value): value is string => Boolean(value),
  );
  const mentorRoster =
    getCategoryMentorRosterByJobSlug(jobSlug) ?? mockJobDetail.mentorRoster;

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
                render={
                  <img
                    src={heroImageSrc}
                    alt=""
                    aria-hidden="true"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                  />
                }
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

              {resolvedSkills.length > 0 ? (
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
                    {resolvedSkills.map((skill, index) => (
                      <SkillPill key={`${skill}-${index}`} label={skill} />
                    ))}
                  </Box>
                </VStack>
              ) : null}

              {mentorRoster.length > 0 ? (
                <VStack
                  $css={{
                    gap: "16px",
                  }}
                >
                  <SectionTitle>{`${mockJobDetail.categoryLabel} 멘토분들을 만나보세요`}</SectionTitle>
                  <Box
                    render={<div className="u-hide-scrollbar" />}
                    $css={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                      overflowX: "auto",
                      overflowY: "hidden",
                      scrollSnapType: "x mandatory",
                      paddingBottom: "4px",
                    }}
                  >
                    {mentorRoster.map((mentor) => (
                      <MentorRosterCard
                        key={`${mockJobDetail.slug}-${mentor.name}`}
                        mentor={mentor}
                      />
                    ))}
                  </Box>
                </VStack>
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
                      summaryImageSrc: heroImageSrc,
                      unitPrice: mockJobDetail.unitPrice,
                    },
                  })
                }
              />
            }
            $css={{
              width: "100%",
              height: `${CTA_HEIGHT_PX}px`,
              border: "none",
              borderRadius: "14px",
              backgroundColor: "var(--vapor-color-cyan-300)",
              color: "#FFFFFF",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
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
