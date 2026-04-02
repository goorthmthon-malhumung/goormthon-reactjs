import { Box, HStack, Text, VStack } from "@vapor-ui/core";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import backArrowIcon from "@/assets/job-detail/back.svg";
import ctaIcon from "@/assets/matching-detail/cta-icon.svg";
import checkIcon from "@/assets/matching-detail/check.svg";
import galleryBeachImage from "@/assets/matching-detail/gallery-beach.jpg";
import heroImage from "@/assets/matching-detail/hero.jpg";
import locationIcon from "@/assets/matching-detail/location.svg";
import { ROUTES } from "@/shared/config/routes";

const PAGE_BG = "#FFFFFF";
const CONTENT_BG = "var(--vapor-color-background-surface-200, #f7f7f7)";
const BORDER_COLOR = "#E1E1E1";
const PRIMARY_TEXT = "#0F172B";
const TITLE_TEXT = "#393939";
const SECONDARY_TEXT = "#767676";
const ACCENT = "#1CB3CB";
const HERO_HEIGHT = 379;
const HERO_OVERLAY_BOTTOM = 49;
const BOTTOM_BAR_HEIGHT = 89;
const BOTTOM_BUTTON_HEIGHT = 55.981;

const INCLUDED_ITEMS = [
  "해녀복 대여",
  "안전 장비",
  "해산물 시식",
  "사진 촬영 서비스",
] as const;

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
        border: `1px solid ${BORDER_COLOR}`,
        backgroundColor: "#FFFFFF",
        boxSizing: "border-box",
        ...$css,
      }}
    >
      {children}
    </Box>
  );
}

function BulletRow({ label }: { label: string }) {
  return (
    <HStack
      $css={{
        gap: "7.997px",
        alignItems: "center",
      }}
    >
      <Box
        render={<img src={checkIcon} alt="" aria-hidden="true" />}
        $css={{
          width: "19.993px",
          height: "19.993px",
          display: "block",
          flexShrink: 0,
        }}
      />
      <Text
        render={<p />}
        $css={{
          color: "#262626",
          fontSize: "14px",
          lineHeight: "22px",
          fontWeight: 400,
          letterSpacing: "-0.1px",
        }}
      >
        {label}
      </Text>
    </HStack>
  );
}

function GalleryImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <Box
      render={<img src={src} alt={alt} />}
      $css={{
        width: "148px",
        height: "160px",
        borderRadius: "14px",
        objectFit: "cover",
        display: "block",
        flexShrink: 0,
      }}
    />
  );
}

export function MatchingDetailPage() {
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
        position: "relative",
        width: "100%",
        height: "100dvh",
        minHeight: "100dvh",
        backgroundColor: PAGE_BG,
        overflow: "hidden",
      }}
    >
      <Box
        render={<button type="button" onClick={handleBack} aria-label="뒤로가기" />}
        $css={{
          position: "absolute",
          top: "max(16px, calc(env(safe-area-inset-top) + 8px))",
          left: "16px",
          width: "39.998px",
          height: "39.998px",
          margin: 0,
          padding: 0,
          border: "none",
          borderRadius: "999px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          display: "grid",
          placeItems: "center",
          cursor: "pointer",
          zIndex: 10,
        }}
      >
        <Box
          render={<img src={backArrowIcon} alt="" aria-hidden="true" />}
          $css={{
            width: "19.993px",
            height: "19.993px",
            display: "block",
          }}
        />
      </Box>

      <Box
        $css={{
          position: "absolute",
          inset: 0,
          backgroundColor: PAGE_BG,
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <Box
          $css={{
            position: "relative",
            width: "100%",
            height: `${HERO_HEIGHT}px`,
            overflow: "hidden",
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
              objectPosition: "center center",
            }}
          />
          <Box
            $css={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.6) 100%)",
            }}
          />

          <VStack
            $css={{
              position: "absolute",
              left: "16px",
              right: "16px",
              bottom: `${HERO_OVERLAY_BOTTOM}px`,
              gap: "8px",
              zIndex: 2,
            }}
          >
            <Text
              render={<h1 />}
              $css={{
                color: "#FFFFFF",
                fontSize: "24px",
                lineHeight: "36px",
                fontWeight: 700,
                letterSpacing: "-0.3px",
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
                  flexShrink: 0,
                }}
              />
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
                제주시 구좌읍
              </Text>
            </HStack>
          </VStack>
        </Box>

        <Box
          $css={{
            backgroundColor: CONTENT_BG,
            paddingLeft: "15.51px",
            paddingRight: "15.51px",
            paddingTop: "20px",
            paddingBottom: `calc(${BOTTOM_BAR_HEIGHT + 32}px + env(safe-area-inset-bottom))`,
          }}
        >
          <VStack
            $css={{
              width: "100%",
              gap: "12px",
            }}
          >
            <SectionCard
              $css={{
                padding: "24px",
              }}
            >
              <Text
                render={<h2 />}
                $css={{
                  color: TITLE_TEXT,
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
                  marginTop: "11.996px",
                  color: SECONDARY_TEXT,
                  fontSize: "16px",
                  lineHeight: "24px",
                  fontWeight: 500,
                  letterSpacing: "-0.1px",
                }}
              >
                45년 경력의 김영숙 해녀님과 함께하는 물질 체험입니다. 전통 해녀복을 입고 바다에 들어가 직접 해산물을 채취하며 제주 해녀 문화를 체험할 수 있습니다. 초보자도 안전하게 참여할 수 있도록 구명조끼와 안전 장비가 제공되며, 해녀님의 세심한 지도 아래 진행됩니다.
              </Text>
            </SectionCard>

            {Array.from({ length: 2 }).map((_, index) => (
              <SectionCard
                key={`inclusion-${index}`}
                $css={{
                  paddingTop: "23.992px",
                  paddingLeft: "23.992px",
                  paddingRight: "23.992px",
                  paddingBottom: "23.992px",
                }}
              >
                <Text
                  render={<h2 />}
                  $css={{
                    color: TITLE_TEXT,
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
                  {INCLUDED_ITEMS.map((item) => (
                    <BulletRow key={item} label={item} />
                  ))}
                </VStack>
              </SectionCard>
            ))}

            <SectionCard
              $css={{
                paddingTop: "23.992px",
                paddingLeft: "23.992px",
                paddingRight: "23.992px",
                paddingBottom: "23.992px",
              }}
            >
              <Text
                render={<h2 />}
                $css={{
                  color: PRIMARY_TEXT,
                  fontSize: "18px",
                  lineHeight: "26px",
                  fontWeight: 700,
                  letterSpacing: "-0.4395px",
                  marginBottom: "16px",
                }}
              >
                체험 사진 <Box render={<span />} $css={{ color: ACCENT }}>2</Box>
              </Text>

              <HStack
                $css={{
                  gap: "16px",
                  alignItems: "flex-start",
                }}
              >
                <GalleryImage src={heroImage} alt="체험 대표 사진" />
                <GalleryImage src={galleryBeachImage} alt="체험 장소 사진" />
              </HStack>
            </SectionCard>
          </VStack>
        </Box>
      </Box>

      <Box
        $css={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 4,
        }}
      >
        <Box
          $css={{
            backgroundColor: "#FFFFFF",
            borderTop: "0.735px solid #E2E8F0",
            paddingTop: "16.73px",
            paddingLeft: "16px",
            paddingRight: "16px",
            paddingBottom: "max(16px, env(safe-area-inset-bottom))",
          }}
        >
          <Box
            render={<button type="button" onClick={() => navigate(ROUTES.reservation)} />}
            $css={{
              width: "100%",
              height: `${BOTTOM_BUTTON_HEIGHT}px`,
              border: "none",
              borderRadius: "14px",
              backgroundColor: ACCENT,
              color: "#FFFFFF",
              padding: 0,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <Box
              render={<img src={ctaIcon} alt="" aria-hidden="true" />}
              $css={{
                width: "19.993px",
                height: "19.993px",
                display: "block",
                flexShrink: 0,
              }}
            />
            <Text
              $css={{
                color: "inherit",
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
