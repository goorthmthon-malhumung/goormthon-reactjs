import { Box, HStack, Text, VStack } from "@vapor-ui/core";
import {
  CalendarOutlineIcon,
  CheckCircleOutlineIcon,
  ChevronLeftOutlineIcon,
  GroupOutlineIcon,
  LocationOutlineIcon,
  TimeOutlineIcon,
} from "@vapor-ui/icons";
import type { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import galleryBeachImage from "@/assets/matching-detail/gallery-beach.jpg";
import heroImage from "@/assets/matching-detail/hero.jpg";
import { ROUTES } from "@/shared/config/routes";

const PAGE_BG = "#FFFFFF";
const CONTENT_BG = "var(--vapor-color-background-surface-200, #f7f7f7)";
const BORDER_COLOR = "#E1E1E1";
const PRIMARY_TEXT = "#0F172B";
const TITLE_TEXT = "#393939";
const SECONDARY_TEXT = "#767676";
const MUTED_TEXT = "#45556C";
const ACCENT = "#1CB3CB";
const HERO_BADGE_BG = "#EF6F25";
const HERO_HEIGHT = 379;
const HERO_OVERLAY_BOTTOM = 49;
const CONTENT_WIDTH_PX = 358;
const RESERVE_BUTTON_HEIGHT = 55.981;
const RESERVE_BUTTON_WIDTH = 119.328;
const TODAY = new Date();

function addDaysFromToday(days: number) {
  const date = new Date(TODAY);

  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + days);

  return date;
}

function formatKoreanDate(date: Date) {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}

function formatDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

type MatchingDetailGalleryImage = {
  src: string;
  alt: string;
};

type MatchingDetailContent = {
  kindLabel: string;
  heroImageSrc: string;
  heroImageAlt: string;
  deadlineLabel: string;
  title: string;
  participantLabel: string;
  mentorInitial: string;
  mentorName: string;
  mentorCareer: string;
  scheduleLabel: string;
  timeLabel: string;
  meetingPlace: string;
  description: string;
  includedItems: readonly string[];
  galleryImages: readonly MatchingDetailGalleryImage[];
  priceLabel: string;
  priceUnitLabel: string;
  reserveLabel: string;
  experienceId: number;
  unitPriceValue: number;
  availableFromDate: string;
  availableToDate: string;
};

export type MatchingDetailState = Partial<MatchingDetailContent>;

const DEFAULT_DETAIL_CONTENT: MatchingDetailContent = {
  kindLabel: "직업",
  heroImageSrc: heroImage,
  heroImageAlt: "바닷가에서 작업 중인 해녀들의 모습",
  deadlineLabel: "D-12",
  title: "금녕 해녀와 함께하는 전복따기",
  participantLabel: "5/8명",
  mentorInitial: "김",
  mentorName: "김영숙 해녀",
  mentorCareer: "해녀 45년차",
  scheduleLabel: `${formatKoreanDate(addDaysFromToday(12))} ~ ${formatKoreanDate(addDaysFromToday(42))}`,
  timeLabel: "오전 9:00 - 12:00 (3시간)",
  meetingPlace: "제주시 구좌읍 하도리",
  description:
    "45년 경력의 김영숙 해녀님과 함께하는 물질 체험입니다. 전통 해녀복을 입고 바다에 들어가 직접 해산물을 채취하며 제주 해녀 문화를 체험할 수 있습니다. 초보자도 안전하게 참여할 수 있도록 구명조끼와 안전 장비가 제공되며, 해녀님의 세심한 지도 아래 진행됩니다.",
  includedItems: [
    "해녀복 대여",
    "안전 장비",
    "해산물 시식",
    "사진 촬영 서비스",
  ],
  galleryImages: [
    {
      src: heroImage,
      alt: "해녀 체험 대표 사진",
    },
    {
      src: galleryBeachImage,
      alt: "체험 장소 바다 풍경",
    },
  ],
  priceLabel: "50,000원",
  priceUnitLabel: "/ 인",
  reserveLabel: "예약하기",
  experienceId: 1,
  unitPriceValue: 50000,
  availableFromDate: formatDateKey(addDaysFromToday(12)),
  availableToDate: formatDateKey(addDaysFromToday(42)),
};

function SectionCard({
  children,
  backgroundColor = "#FFFFFF",
  borderColor = BORDER_COLOR,
  padding = "24px",
}: {
  children: ReactNode;
  backgroundColor?: string;
  borderColor?: string;
  padding?: string;
}) {
  return (
    <Box
      $css={{
        width: "100%",
        borderRadius: "16px",
        border: `1px solid ${borderColor}`,
        backgroundColor,
        padding,
        boxSizing: "border-box",
      }}
    >
      {children}
    </Box>
  );
}

function DetailInfoRow({
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
      <Box
        $css={{
          width: "19.993px",
          height: "19.993px",
          display: "grid",
          placeItems: "center",
          color: "#EF6F25",
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>

      <HStack
        $css={{
          gap: "8px",
          alignItems: "center",
          flexWrap: "wrap",
          minWidth: 0,
        }}
      >
        <Text
          typography="subtitle1"
          $css={{
            color: TITLE_TEXT,
            fontWeight: 500,
            letterSpacing: "-0.1px",
          }}
        >
          {label}
        </Text>
        <Text
          typography="body2"
          $css={{
            color: SECONDARY_TEXT,
            letterSpacing: "-0.1px",
          }}
        >
          {value}
        </Text>
      </HStack>
    </HStack>
  );
}

function MentorSummaryCard({
  initial,
  name,
  career,
}: {
  initial: string;
  name: string;
  career: string;
}) {
  return (
    <SectionCard backgroundColor={CONTENT_BG} padding="19.993px">
      <HStack
        $css={{
          gap: "15.995px",
          alignItems: "center",
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
            render={<span />}
            $css={{
              color: "#FFFFFF",
              fontSize: "18px",
              lineHeight: "28px",
              fontWeight: 700,
              letterSpacing: "-0.4395px",
            }}
          >
            {initial}
          </Text>
        </Box>

        <VStack
          $css={{
            gap: "0",
            alignItems: "flex-start",
            minWidth: 0,
          }}
        >
          <Text
            render={<h2 />}
            $css={{
              color: PRIMARY_TEXT,
              fontSize: "18px",
              lineHeight: "27px",
              fontWeight: 600,
              letterSpacing: "-0.4395px",
            }}
          >
            {name}
          </Text>
          <Text
            render={<p />}
            $css={{
              color: MUTED_TEXT,
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: 400,
              letterSpacing: "-0.1504px",
            }}
          >
            {career}
          </Text>
        </VStack>
      </HStack>
    </SectionCard>
  );
}

function InclusionRow({ label }: { label: string }) {
  return (
    <HStack
      $css={{
        gap: "7.997px",
        alignItems: "center",
      }}
    >
      <CheckCircleOutlineIcon size={16} color={ACCENT} aria-hidden="true" />
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

function GalleryImage({ src, alt }: MatchingDetailGalleryImage) {
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
  const { state } = useLocation();

  const detail: MatchingDetailContent = {
    ...DEFAULT_DETAIL_CONTENT,
    ...((state as MatchingDetailState | null) ?? {}),
  };

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
        height: "100dvh",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: PAGE_BG,
        overflow: "hidden",
      }}
    >
      <Box
        $css={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          overflowX: "hidden",
          backgroundColor: CONTENT_BG,
        }}
      >
        <Box
          $css={{
            position: "relative",
            width: "100%",
            height: `${HERO_HEIGHT}px`,
            overflow: "hidden",
            backgroundColor: "#D8E6EC",
          }}
        >
          <Box
            render={<img src={detail.heroImageSrc} alt={detail.heroImageAlt} />}
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

          <Box
            render={
              <button
                type="button"
                onClick={handleBack}
                aria-label="뒤로가기"
              />
            }
            $css={{
              position: "absolute",
              top: "max(56px, calc(env(safe-area-inset-top) + 8px))",
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
              color: PRIMARY_TEXT,
              cursor: "pointer",
              zIndex: 2,
            }}
          >
            <ChevronLeftOutlineIcon
              size={20}
              color={PRIMARY_TEXT}
              aria-hidden="true"
            />
          </Box>

          <Box
            $css={{
              position: "absolute",
              left: "16px",
              right: "16px",
              bottom: `${HERO_OVERLAY_BOTTOM}px`,
              zIndex: 2,
            }}
          >
            <VStack
              $css={{
                width: "100%",
                maxWidth: `${CONTENT_WIDTH_PX}px`,
                marginInline: "auto",
                gap: "8px",
                alignItems: "flex-start",
              }}
            >
              <HStack
                $css={{
                  gap: "8px",
                  alignItems: "center",
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
                    backgroundColor: ACCENT,
                  }}
                >
                  <Text
                    typography="subtitle1"
                    $css={{
                      color: "#FFF6F1",
                      fontWeight: 500,
                      letterSpacing: "-0.1px",
                    }}
                  >
                    {detail.kindLabel}
                  </Text>
                </Box>

                <Box
                  $css={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "32px",
                    paddingInline: "12px",
                    borderRadius: "999px",
                    backgroundColor: HERO_BADGE_BG,
                  }}
                >
                  <Text
                    typography="subtitle1"
                    $css={{
                      color: "#FFF6F1",
                      fontWeight: 500,
                      letterSpacing: "-0.1px",
                    }}
                  >
                    {detail.deadlineLabel}
                  </Text>
                </Box>
              </HStack>

              <Text
                render={
                  <h1
                    style={{
                      display: "-webkit-box",
                      overflow: "hidden",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                      wordBreak: "keep-all",
                    }}
                  />
                }
                $css={{
                  width: "100%",
                  color: "#FFFFFF",
                  fontSize: "24px",
                  lineHeight: "36px",
                  fontWeight: 700,
                  letterSpacing: "-0.3px",
                }}
              >
                {detail.title}
              </Text>

              <HStack
                $css={{
                  gap: "3.999px",
                  alignItems: "center",
                }}
              >
                <GroupOutlineIcon
                  size={16}
                  color="#FFFFFF"
                  aria-hidden="true"
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
                  {detail.participantLabel}
                </Text>
              </HStack>
            </VStack>
          </Box>
        </Box>

        <Box
          $css={{
            backgroundColor: CONTENT_BG,
            paddingTop: "20px",
            paddingInline: "16px",
            paddingBottom: "24px",
          }}
        >
          <VStack
            $css={{
              width: "100%",
              maxWidth: `${CONTENT_WIDTH_PX}px`,
              marginInline: "auto",
              gap: "30px",
            }}
          >
            <VStack
              $css={{
                width: "100%",
                gap: "24px",
                alignItems: "stretch",
              }}
            >
              <MentorSummaryCard
                initial={detail.mentorInitial}
                name={detail.mentorName}
                career={detail.mentorCareer}
              />

              <VStack
                $css={{
                  gap: "12px",
                  paddingLeft: "4px",
                }}
              >
                <DetailInfoRow
                  icon={
                    <CalendarOutlineIcon
                      size={20}
                      color="#EF6F25"
                      aria-hidden="true"
                    />
                  }
                  label="날짜"
                  value={detail.scheduleLabel}
                />
                <DetailInfoRow
                  icon={
                    <TimeOutlineIcon
                      size={20}
                      color="#EF6F25"
                      aria-hidden="true"
                    />
                  }
                  label="시간"
                  value={detail.timeLabel}
                />
                <DetailInfoRow
                  icon={
                    <LocationOutlineIcon
                      size={20}
                      color="#EF6F25"
                      aria-hidden="true"
                    />
                  }
                  label="장소"
                  value={detail.meetingPlace}
                />
              </VStack>
            </VStack>

            <VStack
              $css={{
                width: "100%",
                gap: "12px",
                alignItems: "stretch",
              }}
            >
              <SectionCard>
                <VStack
                  $css={{
                    gap: "11.996px",
                    alignItems: "stretch",
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
                    {detail.title}
                  </Text>
                  <Text
                    render={<p />}
                    $css={{
                      color: SECONDARY_TEXT,
                      fontSize: "16px",
                      lineHeight: "24px",
                      fontWeight: 500,
                      letterSpacing: "-0.1px",
                      wordBreak: "keep-all",
                    }}
                  >
                    {detail.description}
                  </Text>
                </VStack>
              </SectionCard>

              <SectionCard>
                <VStack
                  $css={{
                    gap: "15.995px",
                    alignItems: "stretch",
                  }}
                >
                  <Text
                    render={<h2 />}
                    $css={{
                      color: PRIMARY_TEXT,
                      fontSize: "18px",
                      lineHeight: "26px",
                      fontWeight: 700,
                      letterSpacing: "-0.1px",
                    }}
                  >
                    포함 사항
                  </Text>

                  <VStack
                    $css={{
                      gap: "12px",
                    }}
                  >
                    {detail.includedItems.map((item) => (
                      <InclusionRow key={item} label={item} />
                    ))}
                  </VStack>
                </VStack>
              </SectionCard>

              <SectionCard>
                <VStack
                  $css={{
                    gap: "16px",
                    alignItems: "stretch",
                  }}
                >
                  <Text
                    render={<h2 />}
                    $css={{
                      color: PRIMARY_TEXT,
                      fontSize: "18px",
                      lineHeight: "28px",
                      fontWeight: 700,
                      letterSpacing: "-0.4395px",
                    }}
                  >
                    체험 사진{" "}
                    <Box render={<span />} $css={{ color: ACCENT }}>
                      2
                    </Box>
                  </Text>

                  <HStack
                    $css={{
                      gap: "16px",
                      alignItems: "flex-start",
                      overflowX: "auto",
                    }}
                  >
                    {detail.galleryImages.map((image) => (
                      <GalleryImage key={image.alt} {...image} />
                    ))}
                  </HStack>
                </VStack>
              </SectionCard>
            </VStack>
          </VStack>
        </Box>
      </Box>

      <Box
        $css={{
          flexShrink: 0,
          backgroundColor: "#FFFFFF",
          borderTop: "0.735px solid #E2E8F0",
          paddingTop: "16.73px",
          paddingInline: "16px",
          paddingBottom: "max(16px, env(safe-area-inset-bottom))",
        }}
      >
        <HStack
          $css={{
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <VStack
            $css={{
              gap: "0",
              alignItems: "flex-start",
              minWidth: 0,
              flex: 1,
            }}
          >
            <Text
              render={<p />}
              $css={{
                color: MUTED_TEXT,
                fontSize: "14px",
                lineHeight: "20px",
                fontWeight: 500,
                letterSpacing: "-0.1px",
              }}
            >
              체험 비용
            </Text>
            <HStack
              $css={{
                gap: "4px",
                alignItems: "baseline",
              }}
            >
              <Text
                render={<p />}
                $css={{
                  color: PRIMARY_TEXT,
                  fontSize: "24px",
                  lineHeight: "36px",
                  fontWeight: 700,
                  letterSpacing: "-0.3px",
                }}
              >
                {detail.priceLabel}
              </Text>
              <Text
                render={<p />}
                $css={{
                  color: MUTED_TEXT,
                  fontSize: "14px",
                  lineHeight: "22px",
                  fontWeight: 500,
                  letterSpacing: "-0.1px",
                }}
              >
                {detail.priceUnitLabel}
              </Text>
            </HStack>
          </VStack>

          <Box
            render={
              <button
                type="button"
                onClick={() =>
                  navigate(ROUTES.reservation, {
                    state: {
                      experienceId: detail.experienceId,
                      summaryTitle: detail.title,
                      summaryMentor: detail.mentorName,
                      summaryImageSrc: detail.heroImageSrc,
                      unitPrice: detail.unitPriceValue,
                      availableFromDate: detail.availableFromDate,
                      availableToDate: detail.availableToDate,
                    },
                  })
                }
              />
            }
            $css={{
              width: `${RESERVE_BUTTON_WIDTH}px`,
              height: `${RESERVE_BUTTON_HEIGHT}px`,
              border: "none",
              borderRadius: "14px",
              backgroundColor: ACCENT,
              color: "#FFFFFF",
              padding: 0,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Text
              $css={{
                color: "inherit",
                fontSize: "16px",
                lineHeight: "24px",
                fontWeight: 600,
                letterSpacing: "-0.3125px",
              }}
            >
              {detail.reserveLabel}
            </Text>
          </Box>
        </HStack>
      </Box>
    </Box>
  );
}
