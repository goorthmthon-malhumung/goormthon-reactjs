import { Box, HStack, Text, VStack } from "@vapor-ui/core";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import backIcon from "@/assets/job-detail/back.svg";
import badgeIcon from "@/assets/job-detail/badge.svg";
import calendarIcon from "@/assets/job-detail/calendar.svg";
import clockIcon from "@/assets/job-detail/clock.svg";
import effortIcon from "@/assets/job-detail/effort.svg";
import heroImage from "@/assets/job-detail/hero.jpg";
import interestIcon from "@/assets/job-detail/interest.svg";
import locationIcon from "@/assets/job-detail/location.svg";
import shareIcon from "@/assets/job-detail/share.svg";
import { ROUTES } from "@/shared/config/routes";

const FRAME_WIDTH_PX = 390;
const HERO_TOP_PX = 0;
const HERO_HEIGHT_PX = 332;
const CONTENT_TOP_PX = 332;
const CONTENT_WIDTH_PX = 358;
const PAGE_BG = "#FFFFFF";
const TITLE_FONT =
  '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif';

const SKILLS = [
  "물질 기술",
  "해산물 채취",
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
        backgroundColor: "rgba(255,255,255,0.9)",
        display: "grid",
        placeItems: "center",
        cursor: "pointer",
        padding: "0",
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

function SectionCard({
  children,
  $css,
}: {
  children: ReactNode;
  $css?: Record<string, string | number>;
}) {
  return (
    <Box
      $css={{
        width: "100%",
        borderRadius: "16px",
        backgroundColor: "#FFFFFF",
        boxShadow:
          "0px 1px 3px 0px rgba(0,0,0,0.1), 0px 1px 2px 0px rgba(0,0,0,0.1)",
        ...$css,
      }}
    >
      {children}
    </Box>
  );
}

function SkillPill({ label }: { label: string }) {
  return (
    <Box
      $css={{
        height: "35.988px",
        borderRadius: "14px",
        backgroundColor: "#F0F9FF",
        paddingInline: "15.995px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        render={<span />}
        $css={{
          color: "#0069A8",
          fontFamily: TITLE_FONT,
          fontSize: "14px",
          lineHeight: "20px",
          fontWeight: 500,
          letterSpacing: "-0.1504px",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </Text>
    </Box>
  );
}

function BadgePill({ label }: { label: string }) {
  return (
    <Box
      $css={{
        height: "23.992px",
        borderRadius: "999px",
        backgroundColor: "#FFF7ED",
        display: "inline-flex",
        alignItems: "center",
        paddingInline: "11.996px",
        gap: "7.997px",
      }}
    >
      <Box
        render={<img src={badgeIcon} alt="" aria-hidden="true" />}
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
          color: "#CA3500",
          fontFamily: TITLE_FONT,
          fontSize: "12px",
          lineHeight: "16px",
          fontWeight: 500,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </Text>
    </Box>
  );
}

function InfoRow({
  iconSrc,
  title,
  value,
}: {
  iconSrc: string;
  title: string;
  value: string;
}) {
  return (
    <Box
      $css={{
        width: "100%",
        borderRadius: "14px",
        backgroundColor: "#F8FAFC",
        padding: "15.995px",
      }}
    >
      <VStack
        $css={{
          gap: "7.997px",
        }}
      >
        <HStack
          $css={{
            gap: "7.997px",
            alignItems: "center",
          }}
        >
          <Box
            render={<img src={iconSrc} alt="" aria-hidden="true" />}
            $css={{
              width: "19.993px",
              height: "19.993px",
              display: "block",
              flexShrink: 0,
            }}
          />
          <Text
            render={<h4 />}
            $css={{
              color: "#0F172B",
              fontFamily: TITLE_FONT,
              fontSize: "16px",
              lineHeight: "24px",
              fontWeight: 600,
              letterSpacing: "-0.3125px",
            }}
          >
            {title}
          </Text>
        </HStack>
        <Text
          render={<p />}
          $css={{
            color: "#45556C",
            fontFamily: TITLE_FONT,
            fontSize: "14px",
            lineHeight: "20px",
            fontWeight: 400,
            letterSpacing: "-0.1504px",
            whiteSpace: "nowrap",
          }}
        >
          {value}
        </Text>
      </VStack>
    </Box>
  );
}

function ActionButton({
  iconSrc,
  label,
  variant,
  onClick,
}: {
  iconSrc: string;
  label: string;
  variant: "filled" | "outline";
  onClick: () => void;
}) {
  const isFilled = variant === "filled";

  return (
    <Box
      render={<button type="button" onClick={onClick} />}
      $css={{
        flex: "1 1 0",
        minWidth: 0,
        height: "58.923px",
        borderRadius: "14px",
        border: isFilled ? "none" : "1.471px solid #E2E8F0",
        backgroundColor: isFilled ? "#1CB3CB" : "#FFFFFF",
        display: "grid",
        placeItems: "center",
        cursor: "pointer",
        position: "relative",
      }}
    >
      <Box
        render={<img src={iconSrc} alt="" aria-hidden="true" />}
        $css={{
          position: "absolute",
          left: "24.923px",
          width: "19.993px",
          height: "19.993px",
          display: "block",
        }}
      />
      <Text
        $css={{
          color: isFilled ? "#FFFFFF" : "#0F172B",
          fontFamily: TITLE_FONT,
          fontSize: "16px",
          lineHeight: "24px",
          fontWeight: 600,
          letterSpacing: "-0.3125px",
        }}
      >
        {label}
      </Text>
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
        width: "100%",
        minHeight: "100dvh",
        backgroundColor: PAGE_BG,
        display: "flex",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <Box
        $css={{
          position: "relative",
          width: `min(${FRAME_WIDTH_PX}px, 100vw)`,
          minHeight: "100dvh",
          backgroundColor: PAGE_BG,
          overflow: "hidden",
        }}
      >
        <HStack
          $css={{
            position: "absolute",
            top: "max(16px, calc(env(safe-area-inset-top) + 8px))",
            left: "16px",
            right: "16px",
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
        </HStack>

        <Box
          $css={{
            position: "absolute",
            inset: 0,
            overflowY: "auto",
          }}
        >
            <Box
              $css={{
                position: "relative",
                marginTop: `${HERO_TOP_PX}px`,
                width: "100%",
              height: `${HERO_HEIGHT_PX}px`,
              overflow: "hidden",
              backgroundColor: "#0B1020",
            }}
          >
            <Box
              render={<img src={heroImage} alt="" aria-hidden="true" />}
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
                  "linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.6) 100%)",
              }}
            />

            <VStack
              $css={{
                position: "absolute",
                left: "24px",
                right: "24px",
                top: "238px",
                gap: "8px",
              }}
            >
              <Text
                render={<h1 />}
                $css={{
                  color: "#FFFFFF",
                  fontFamily: TITLE_FONT,
                  fontSize: "30px",
                  lineHeight: "36px",
                  fontWeight: 700,
                  letterSpacing: "0.3955px",
                }}
              >
                해녀
              </Text>
              <HStack
                $css={{
                  gap: "3.999px",
                  alignItems: "center",
                }}
              >
                <Box
                  render={<img src={locationIcon} alt="" aria-hidden="true" />}
                  $css={{
                    width: "15.995px",
                    height: "15.995px",
                    display: "block",
                  }}
                />
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
                  제주시 구좌읍
                </Text>
              </HStack>
            </VStack>
          </Box>

          <VStack
            $css={{
              width: "100%",
              maxWidth: `${CONTENT_WIDTH_PX}px`,
              marginInline: "auto",
              gap: "23.992px",
              paddingInline: "15.995px",
              paddingTop: `${CONTENT_TOP_PX - HERO_TOP_PX - HERO_HEIGHT_PX + 23.992}px`,
              paddingBottom: "calc(148px + env(safe-area-inset-bottom))",
            }}
          >
            <SectionCard
              $css={{
                paddingTop: "23.992px",
                paddingInline: "23.992px",
                paddingBottom: "23.992px",
              }}
            >
              <VStack
                $css={{
                  gap: "11.996px",
                }}
              >
                <Text
                  render={<h2 />}
                  $css={{
                    color: "#0F172B",
                    fontFamily: TITLE_FONT,
                    fontSize: "18px",
                    lineHeight: "28px",
                    fontWeight: 700,
                    letterSpacing: "-0.4395px",
                  }}
                >
                  직업 소개
                </Text>
                <Text
                  render={<p />}
                  $css={{
                    color: "#45556C",
                    fontFamily: TITLE_FONT,
                    fontSize: "16px",
                    lineHeight: "26px",
                    fontWeight: 400,
                    letterSpacing: "-0.3125px",
                    maxWidth: "294px",
                  }}
                >
                  45년간 제주 바다를 지켜온 김영숙 해녀는 구좌읍 해녀회의
                  회장을 역임하며 해녀 문화의 계승에 힘써왔습니다. 전통적인
                  물질 기술부터 현대적인 안전 장비 활용법까지, 해녀로서 필요한
                  모든 것을 배울 수 있습니다. 바다와 더불어 살아가는 지혜와
                  해녀 공동체의 문화도 함께 경험하실 수 있습니다.
                </Text>
              </VStack>
            </SectionCard>

            <SectionCard
              $css={{
                paddingTop: "23.992px",
                paddingInline: "23.992px",
                paddingBottom: "23.992px",
              }}
            >
              <VStack
                $css={{
                  gap: "15.995px",
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
                      width: "63.99px",
                      height: "63.99px",
                      borderRadius: "999px",
                      backgroundColor: "#5D5D5D",
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Text
                      render={<span />}
                      $css={{
                        color: "#FFFFFF",
                        fontFamily: TITLE_FONT,
                        fontSize: "24px",
                        lineHeight: "32px",
                        fontWeight: 700,
                        letterSpacing: "0.0703px",
                      }}
                    >
                      김
                    </Text>
                  </Box>

                  <VStack
                    $css={{
                      gap: "0",
                      minWidth: 0,
                      flex: 1,
                    }}
                  >
                    <Text
                      render={<h3 />}
                      $css={{
                        color: "#0F172B",
                        fontFamily: TITLE_FONT,
                        fontSize: "20px",
                        lineHeight: "28px",
                        fontWeight: 700,
                        letterSpacing: "-0.4492px",
                      }}
                    >
                      김영숙 멘토
                    </Text>
                    <Text
                      render={<p />}
                      $css={{
                        color: "#45556C",
                        fontFamily: TITLE_FONT,
                        fontSize: "16px",
                        lineHeight: "24px",
                        fontWeight: 400,
                        letterSpacing: "-0.3125px",
                      }}
                    >
                      68세 · 45년 경력
                    </Text>
                  </VStack>
                </HStack>

                <HStack
                  $css={{
                    gap: "7.997px",
                    flexWrap: "wrap",
                  }}
                >
                  <BadgePill label="제주특별자치도 무형문화재" />
                  <BadgePill label="해녀 기능 보유자" />
                </HStack>
              </VStack>
            </SectionCard>

            <SectionCard
              $css={{
                paddingTop: "23.992px",
                paddingInline: "23.992px",
                paddingBottom: "23.992px",
              }}
            >
              <VStack
                $css={{
                  gap: "15.995px",
                }}
              >
                <Text
                  render={<h2 />}
                  $css={{
                    color: "#0F172B",
                    fontFamily: TITLE_FONT,
                    fontSize: "18px",
                    lineHeight: "28px",
                    fontWeight: 700,
                    letterSpacing: "-0.4395px",
                  }}
                >
                  배울 수 있는 기술
                </Text>

                <HStack
                  $css={{
                    gap: "7.997px",
                    flexWrap: "wrap",
                  }}
                >
                  {SKILLS.map((skill) => (
                    <SkillPill key={skill} label={skill} />
                  ))}
                </HStack>

                <VStack
                  $css={{
                    gap: "15.995px",
                  }}
                >
                  <InfoRow
                    iconSrc={clockIcon}
                    title="근무 시간"
                    value="오전 6시-10시 (물때에 따라 변동)"
                  />
                  <InfoRow iconSrc={effortIcon} title="체력 요구도" value="상" />
                </VStack>
              </VStack>
            </SectionCard>

            <HStack
              $css={{
                gap: "21px",
                alignItems: "center",
                width: "336px",
              }}
            >
              <Box
                $css={{
                  width: "98px",
                  height: "126px",
                  backgroundColor: "#D9D9D9",
                  flexShrink: 0,
                }}
              />
              <Box
                $css={{
                  width: "98px",
                  height: "126px",
                  backgroundColor: "#D9D9D9",
                  flexShrink: 0,
                }}
              />
              <Box
                $css={{
                  width: "98px",
                  height: "126px",
                  backgroundColor: "#D9D9D9",
                  flexShrink: 0,
                }}
              />
            </HStack>
          </VStack>
        </Box>

        <Box
          $css={{
            position: "absolute",
            left: "16px",
            right: "16px",
            bottom: "20px",
            zIndex: 20,
          }}
        >
          <HStack
            $css={{
              gap: "11.996px",
              alignItems: "center",
            }}
          >
            <ActionButton
              iconSrc={calendarIcon}
              label="체험 예약하기"
              variant="filled"
              onClick={() => navigate(ROUTES.reservation)}
            />
            <ActionButton
              iconSrc={interestIcon}
              label="관심 표현"
              variant="outline"
              onClick={() => {}}
            />
          </HStack>
        </Box>
      </Box>
    </Box>
  );
}

export default JobDetailPage;
