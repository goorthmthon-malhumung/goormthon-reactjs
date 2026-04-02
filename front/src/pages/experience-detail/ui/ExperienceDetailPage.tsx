import {
  Box,
  HStack,
  Text,
  VStack,
} from "@vapor-ui/core";
import {
  CalendarOutlineIcon,
  CheckCircleOutlineIcon,
  ChevronLeftOutlineIcon,
  InfoCircleOutlineIcon,
  LocationOutlineIcon,
  TimeOutlineIcon,
  UserOutlineIcon,
} from "@vapor-ui/icons";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import galleryBeachImage from "@/assets/experience-detail/gallery-beach.jpg";
import heroImage from "@/assets/experience-detail/hero.jpg";
import { ROUTES } from "@/shared/config/routes";

const PAGE_BG = "var(--vapor-color-background-surface-200, #f7f7f7)";
const CARD_BORDER = "0.735px solid var(--vapor-color-gray-100, #e1e1e1)";
const CONTENT_WIDTH_PX = 358;
const TITLE_FONT =
  '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif';
const HERO_TITLE =
  "금녕 해녀와 함께하는 전복따기금녕금녕 해녀와 함께하는 전복따기금녕";

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
        border: CARD_BORDER,
        backgroundColor: "#FFFFFF",
        boxSizing: "border-box",
        ...$css,
      }}
    >
      {children}
    </Box>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <HStack
      $css={{
        gap: "8px",
        alignItems: "center",
      }}
    >
      {icon}
      <HStack
        $css={{
          gap: "8px",
          alignItems: "center",
          flexWrap: "nowrap",
        }}
      >
        <Text
          render={<p />}
          $css={{
            color: "#393939",
            fontSize: "14px",
            lineHeight: "22px",
            fontWeight: 500,
            letterSpacing: "-0.1px",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </Text>
        <Text
          render={<p />}
          $css={{
            color: "#767676",
            fontSize: "14px",
            lineHeight: "22px",
            fontWeight: 400,
            letterSpacing: "-0.1px",
            whiteSpace: "nowrap",
          }}
        >
          {value}
        </Text>
      </HStack>
    </HStack>
  );
}

function RequirementRow({ children }: { children: string }) {
  return (
    <HStack
      $css={{
        gap: "12px",
        alignItems: "center",
      }}
    >
      <Box
        $css={{
          width: "5.998px",
          height: "5.998px",
          borderRadius: "999px",
          backgroundColor: "#767676",
          flexShrink: 0,
        }}
      />
      <Text
        render={<p />}
        $css={{
          color: "#393939",
          fontSize: "14px",
          lineHeight: "20px",
          fontWeight: 400,
          letterSpacing: "-0.1504px",
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </Text>
    </HStack>
  );
}

function IncludedRow({ children }: { children: string }) {
  return (
    <HStack
      $css={{
        gap: "8px",
        alignItems: "center",
      }}
    >
      <CheckCircleOutlineIcon size={20} color="#1CB3CB" />
      <Text
        render={<p />}
        $css={{
          color: "#262626",
          fontSize: "14px",
          lineHeight: "22px",
          fontWeight: 400,
          letterSpacing: "-0.1px",
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </Text>
    </HStack>
  );
}

export function ExperienceDetailPage() {
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
      $css={{
        width: "100%",
        // minHeight: "100%",
        height: "100dvh",
        minHeight: "100dvh",
        backgroundColor: PAGE_BG,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        $css={{
          width: "100%",
          height: "100dvh",
          overflowY: "auto",
        }}
      >
        <Box
          $css={{
            position: "relative",
            height: "379px",
            overflow: "hidden",
            backgroundColor: "#0B1020",
          }}
        >
          <Box
            render={<img src={heroImage} alt="" />}
            aria-hidden="true"
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
                "linear-gradient(180deg, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0.6) 100%)",
            }}
          />

          <Box
            $css={{
              position: "absolute",
              top: "8px",
              left: "16px",
            }}
          >
            <Box
              render={<button type="button" onClick={handleBack} aria-label="뒤로가기" />}
              $css={{
                width: "40px",
                height: "40px",
                border: "none",
                borderRadius: "999px",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
              }}
            >
              <ChevronLeftOutlineIcon size={20} color="#0F172B" />
            </Box>
          </Box>

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
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: "32px",
                paddingInline: "12px",
                borderRadius: "999px",
                backgroundColor: "#EF6F25",
                width: "fit-content",
              }}
            >
              <Text
                render={<p />}
                $css={{
                  color: "#FFF6F1",
                  fontSize: "14px",
                  lineHeight: "22px",
                  fontWeight: 500,
                  letterSpacing: "-0.1px",
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
              {HERO_TITLE}
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

        <VStack
          $css={{
            width: "100%",
            maxWidth: `${CONTENT_WIDTH_PX}px`,
            marginInline: "auto",
            gap: "24px",
            marginTop: "20px",
            paddingBottom: "calc(148px + env(safe-area-inset-bottom))",
          }}
        >
        <SectionCard
          $css={{
            paddingTop: "19.993px",
            paddingInline: "19.993px",
          }}
        >
          <HStack
            $css={{
              gap: "15.995px",
              alignItems: "center",
              paddingBottom: "19.993px",
            }}
          >
            <Box
              $css={{
                width: "47.995px",
                height: "47.995px",
                borderRadius: "999px",
                backgroundColor: "#5D5D5D",
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
              }}
            >
              <Text
                render={<p />}
                $css={{
                  color: "#FFFFFF",
                  fontFamily: TITLE_FONT,
                  fontSize: "18px",
                  lineHeight: "28px",
                  fontWeight: 700,
                  letterSpacing: "-0.4395px",
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
                render={<h2 />}
                $css={{
                  color: "#0F172B",
                  fontFamily: TITLE_FONT,
                  fontSize: "18px",
                  lineHeight: "27px",
                  fontWeight: 600,
                  letterSpacing: "-0.4395px",
                }}
              >
                김영숙 해녀
              </Text>
              <Text
                render={<p />}
                $css={{
                  color: "#45556C",
                  fontSize: "14px",
                  lineHeight: "20px",
                  fontWeight: 400,
                  letterSpacing: "-0.1504px",
                }}
              >
                해녀 45년차
              </Text>
            </VStack>
          </HStack>

          <VStack
            $css={{
              gap: "12px",
              paddingLeft: "4px",
              paddingBottom: "19.993px",
            }}
          >
            <DetailRow
              icon={<CalendarOutlineIcon size={20} color="#EF6F25" />}
              label="날짜"
              value="2026년 4월 15일"
            />
            <DetailRow
              icon={<TimeOutlineIcon size={20} color="#EF6F25" />}
              label="시간"
              value="오전 9:00 - 12:00 (3시간)"
            />
            <DetailRow
              icon={<LocationOutlineIcon size={20} color="#EF6F25" />}
              label="장소"
              value="제주시 구좌읍 하도리"
            />
          </VStack>
        </SectionCard>

        <SectionCard
          $css={{
            padding: "24px",
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
              marginTop: "12px",
              color: "#767676",
              fontSize: "16px",
              lineHeight: "24px",
              fontWeight: 500,
              letterSpacing: "-0.1px",
            }}
          >
            45년 경력의 김영숙 해녀님과 함께하는 물질 체험입니다. 전통 해녀복을 입고 바다에 들어가 직접 해산물을 채취하며 제주 해녀 문화를 체험할 수 있습니다. 초보자도 안전하게 참여할 수 있도록 구명조끼와 안전 장비가 제공되며, 해녀님의 세심한 지도 아래 진행됩니다.
          </Text>
        </SectionCard>

        <SectionCard
          $css={{
            paddingTop: "23.992px",
            paddingInline: "23.992px",
            paddingBottom: "23.992px",
          }}
        >
          <Text
            render={<h2 />}
            $css={{
              color: "#0F172B",
              fontFamily: TITLE_FONT,
              fontSize: "18px",
              lineHeight: "26px",
              fontWeight: 700,
              letterSpacing: "-0.1px",
              marginBottom: "15.995px",
            }}
          >
            포함 사항
          </Text>

          <VStack
            $css={{
              gap: "12px",
            }}
          >
            <IncludedRow>해녀복 대여</IncludedRow>
            <IncludedRow>안전 장비</IncludedRow>
            <IncludedRow>해산물 시식</IncludedRow>
            <IncludedRow>사진 촬영 서비스</IncludedRow>
          </VStack>
        </SectionCard>

        <SectionCard
          $css={{
            paddingTop: "24.727px",
            paddingInline: "24.727px",
            paddingBottom: "24px",
            backgroundColor: "#FFF7E7",
            border: "0.735px solid #FEE685",
          }}
        >
          <HStack
            $css={{
              gap: "6px",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <Text
              render={<h2 />}
              $css={{
                color: "#393939",
                fontFamily: TITLE_FONT,
                fontSize: "18px",
                lineHeight: "28px",
                fontWeight: 700,
                letterSpacing: "-0.4395px",
              }}
            >
              참가 요건
            </Text>
            <InfoCircleOutlineIcon size={20} color="#393939" />
          </HStack>

          <VStack
            $css={{
              gap: "12px",
            }}
          >
            <RequirementRow>수영 가능자</RequirementRow>
            <RequirementRow>건강한 신체</RequirementRow>
            <RequirementRow>8세 이상</RequirementRow>
          </VStack>
        </SectionCard>

        <SectionCard
          $css={{
            paddingTop: "23.992px",
            paddingInline: "23.992px",
            paddingBottom: "23.992px",
          }}
        >
          <Text
            render={<h2 />}
            $css={{
              color: "#0F172B",
              fontFamily: TITLE_FONT,
              fontSize: "18px",
              lineHeight: "26px",
              fontWeight: 700,
              letterSpacing: "-0.4395px",
              marginBottom: "16px",
            }}
          >
            체험 사진
          </Text>

          <HStack
            $css={{
              gap: "16px",
              alignItems: "flex-start",
            }}
          >
            <Box
              render={<img src={heroImage} alt="체험 대표 사진" />}
              $css={{
                width: "148px",
                height: "160px",
                borderRadius: "14px",
                objectFit: "cover",
                display: "block",
              }}
            />
            <Box
              render={<img src={galleryBeachImage} alt="체험 장소 사진" />}
              $css={{
                width: "148px",
                height: "160px",
                borderRadius: "14px",
                objectFit: "cover",
                display: "block",
              }}
            />
          </HStack>
        </SectionCard>
        </VStack>
      </Box>

      <Box
        $css={{
          // position: "sticky",
          // bottom: 0,
          position: "absolute",
          left: "0",
          right: "0",
          bottom: "20px",
          zIndex: 20,
          // marginTop: "-89px",
        }}
      >
        <Box
          $css={{
            backgroundColor: "#FFFFFF",
            borderTop: "0.735px solid #E2E8F0",
            paddingTop: "16.73px",
            paddingInline: "16px",
            paddingBottom: "16px",
            boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.08)",
          }}
        >
          <HStack
            $css={{
              justifyContent: "space-between",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <VStack
              $css={{
                gap: "4px",
              }}
            >
              <Text
                render={<p />}
                $css={{
                  color: "#45556C",
                  fontSize: "14px",
                  lineHeight: "22px",
                  fontWeight: 500,
                  letterSpacing: "-0.1px",
                }}
              >
                체험 비용
              </Text>
              <Box
                render={<p />}
                $css={{
                  fontSize: 0,
                  lineHeight: 0,
                  whiteSpace: "nowrap",
                }}
              >
                <Box
                  render={<span />}
                  $css={{
                    fontFamily: TITLE_FONT,
                    fontSize: "24px",
                    lineHeight: "36px",
                    fontWeight: 700,
                    color: "#0F172B",
                    letterSpacing: "-0.3px",
                  }}
                >
                  ₩50,000
                </Box>
                <Box
                  render={<span />}
                  $css={{
                    fontFamily: TITLE_FONT,
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 400,
                    color: "#45556C",
                    letterSpacing: "-0.1504px",
                  }}
                >
                  {" / 인"}
                </Box>
              </Box>
            </VStack>

            <Box
              render={
                <button
                  type="button"
                  onClick={() => navigate(ROUTES.reservation)}
                />
              }
              $css={{
                width: "119.328px",
                height: "55.981px",
                border: "none",
                borderRadius: "14px",
                backgroundColor: "#1CB3CB",
                color: "#FFFFFF",
                fontSize: "16px",
                lineHeight: "24px",
                fontWeight: 600,
                letterSpacing: "-0.3125px",
                cursor: "pointer",
              }}
            >
              예약하기
            </Box>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
}
