import backIcon from "@/assets/job-detail/back.svg";
import shareIcon from "@/assets/job-detail/share.svg";
import { ROUTES } from "@/shared/config/routes";
import { Box, HStack, Text, VStack } from "@vapor-ui/core";
import { UserOutlineIcon } from "@vapor-ui/icons";
import { useNavigate } from "react-router-dom";

const HERO_HEIGHT_PX = 379;
const SHEET_TOP_PX = 350;
const CONTENT_SIDE_PADDING_PX = 24;
const TITLE_FONT =
  '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif';

const FIGMA_HERO_IMAGE =
  "https://www.figma.com/api/mcp/asset/f41730c6-3372-4d0f-8089-4f8826f7de9d";
const FIGMA_MENTOR_CARD_IMAGE =
  "https://www.figma.com/api/mcp/asset/d9b1e0a7-96b6-4483-9318-38501fc7314f";
const FIGMA_MENTOR_BADGE_ICON =
  "https://www.figma.com/api/mcp/asset/6777bff0-eb49-4c65-a319-bf0e829217cf";

const SKILLS = [
  "물질 기술",
  "해산물 채취",
  "바다 안전",
  "바다 안전",
  "물때 판단",
  "장비 관리",
] as const;

function TopCircleButton({
  iconSrc,
  ariaLabel,
  onClick,
}: {
  iconSrc: string;
  ariaLabel: string;
  onClick: () => void;
}) {
  return (
    <Box
      render={<button type="button" onClick={onClick} aria-label={ariaLabel} />}
      $css={{
        width: "39.998px",
        height: "39.998px",
        border: "none",
        borderRadius: "999px",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        display: "grid",
        placeItems: "center",
        cursor: "pointer",
        padding: 0,
      }}
    >
      <Box
        render={<img src={iconSrc} alt="" aria-hidden="true" />}
        $css={{
          width: "19.993px",
          height: "19.993px",
          display: "block",
        }}
      />
    </Box>
  );
}

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

function MentorChip({ label }: { label: string }) {
  return (
    <Box
      $css={{
        height: "32px",
        borderRadius: "999px",
        backgroundColor: "#EEF9FB",
        paddingInline: "12px",
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        width: "fit-content",
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
    </Box>
  );
}

function MentorCard({
  title,
  subtitle,
  chipLabel,
}: {
  title: string;
  subtitle: string;
  chipLabel: string;
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
        scrollSnapAlign: "start",
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
          objectPosition: "center center",
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
        }}
      >
        <VStack
          $css={{
            gap: "2px",
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
            {subtitle}
          </Text>
        </VStack>

        <MentorChip label={chipLabel} />
      </VStack>
    </Box>
  );
}

export function JobDetailPage() {
  const navigate = useNavigate();

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
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      <Box
        $css={{
          position: "relative",
          minHeight: "100dvh",
          backgroundColor: "#FFFFFF",
          overflow: "hidden",
        }}
      >
        <Box
          $css={{
            position: "absolute",
            top: "max(16px, calc(env(safe-area-inset-top) + 8px))",
            left: "16px",
            right: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <TopCircleButton
            iconSrc={backIcon}
            ariaLabel="뒤로가기"
            onClick={handleBack}
          />
          <TopCircleButton
            iconSrc={shareIcon}
            ariaLabel="공유하기"
            onClick={() => {}}
          />
        </Box>

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
              height: `${HERO_HEIGHT_PX}px`,
              overflow: "hidden",
              backgroundColor: "#0B1020",
            }}
          >
            <Box
              render={<img src={FIGMA_HERO_IMAGE} alt="" aria-hidden="true" />}
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
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)",
              }}
            />

            <VStack
              $css={{
                position: "absolute",
                left: "16px",
                right: "16px",
                bottom: "49px",
                gap: "8px",
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
                금녕 해녀와 함께하는 전복따기금녕금녕 해녀와 함께하는 전복따기금녕
              </Text>

              <HStack
                $css={{
                  gap: "3.999px",
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
                  5/8명
                </Text>
              </HStack>
            </VStack>
          </Box>

          <Box
            $css={{
              position: "absolute",
              left: 0,
              right: 0,
              top: `${SHEET_TOP_PX}px`,
              bottom: 0,
              backgroundColor: "#FFFFFF",
              borderTopLeftRadius: "30px",
              borderTopRightRadius: "30px",
              overflow: "hidden",
            }}
          >
            <Box
              $css={{
                position: "absolute",
                inset: 0,
                overflowY: "auto",
                overflowX: "hidden",
                paddingTop: "28px",
                paddingBottom: "calc(180px + env(safe-area-inset-bottom))",
              }}
            >
              <VStack
                $css={{
                  width: "100%",
                  gap: "24px",
                  paddingInline: `${CONTENT_SIDE_PADDING_PX}px`,
                }}
              >
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
                    45년 경력의 김영숙 해녀님과 함께하는 물질 체험입니다. 전통 해녀복을 입고 바다에 들어가 직접 해산물을 채취하며 제주 해녀 문화를 체험할 수 있습니다. 초보자도 안전하게 참여할 수 있도록 구명조끼와 안전 장비가 제공되며, 해녀님의 세심한 지도 아래 진행됩니다.
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
                    }}
                  >
                    {SKILLS.map((skill) => (
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
                      <MentorCard
                        title="김영숙 멘토"
                        subtitle="68세 · 45년 경력"
                        chipLabel="제주특별자치도 무형문화재"
                      />
                      <MentorCard
                        title="임지은 멘토"
                        subtitle="72세 · 45년 경력"
                        chipLabel="해녀 기능 보유자"
                      />
                    </HStack>
                  </Box>
                </VStack>
              </VStack>
            </Box>
          </Box>
        </Box>

        <Box
          $css={{
            position: "absolute",
            left: "15.99px",
            right: "15.99px",
            bottom: "50.08px",
            zIndex: 20,
          }}
        >
          <Box
            render={<button type="button" onClick={() => navigate(ROUTES.reservation)} />}
            $css={{
              width: "100%",
              height: "58.923px",
              border: "none",
              borderRadius: "14px",
              backgroundColor: "#1CB3CB",
              color: "#FFFFFF",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
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
    </Box>
  );
}

export default JobDetailPage;
