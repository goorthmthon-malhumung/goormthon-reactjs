import banner from "@/shared/assets/banner.png";
import haenyeoIcon from "@/shared/assets/haenyeoIcon.svg";
import homeExperienceHaenyeoImage from "@/shared/assets/home/home-experience-haenyeo.jpg";
import homeExperienceMandarinImage from "@/shared/assets/home/home-experience-mandarin.jpg";
import homeExperienceStoneImage from "@/shared/assets/home/home-experience-stone.jpg";
import homeJobHorseImage from "@/shared/assets/home/home-job-horse.jpg";
import homeJobStoneImage from "@/shared/assets/home/home-job-stone.jpg";
import horseIcon from "@/shared/assets/horseIcon.svg";
import logo from "@/shared/assets/logo.svg";
import mandarinIcon from "@/shared/assets/mandarinIcon.svg";
import stoneIcon from "@/shared/assets/stoneIcon.svg";
import { ROUTES } from "@/shared/config/routes";
import { ThumbnailCard, type ThumbnailCardProps } from "@/shared/ui/cards";
import { BottomNavigation } from "@/shared/ui/navigation/BottomNavigation";
import { Badge, Box, Text } from "@vapor-ui/core";
import { Link, useNavigate } from "react-router-dom";

const CATEGORY_ITEMS = [
  { iconSrc: haenyeoIcon, label: "해녀", to: "/jobs/haenyeo" },
  { iconSrc: stoneIcon, label: "돌담 장인", to: "/jobs/stone" },
  { iconSrc: mandarinIcon, label: "감귤 농사", to: "/jobs/tangerine" },
  { iconSrc: horseIcon, label: "목장주", to: "/jobs/horse" },
] as const;

const SMALL_EXPERIENCE_CARDS: ReadonlyArray<ThumbnailCardProps> = [
  {
    to: ROUTES.matchingDetail,
    imageSrc: homeExperienceHaenyeoImage,
    imageAlt: "금녕 해녀와 함께하는 전복따기",
    badgeLabel: "정부지원금 30만원",
    title: "금녕 해녀와 함께하는 전복따기",
    statusLabel: "김** 해녀 · D-10",
    caption: "제주시 구좌읍",
  },
  {
    to: ROUTES.matchingDetail,
    imageSrc: homeExperienceMandarinImage,
    imageAlt: "제주의 귤을 키우는 하루",
    badgeLabel: "정부지원금 30만원",
    title: "제주의 귤을 키우는 하루",
    statusLabel: "임** 농부 · D-20",
    caption: "서귀포시 남원읍",
  },
  {
    to: ROUTES.matchingDetail,
    imageSrc: homeExperienceStoneImage,
    imageAlt: "제주의 돌을 쌓는 하루",
    badgeLabel: "정부지원금 30만원",
    title: "제주의 돌을 쌓는 하루",
    statusLabel: "강** 장인 · D-10",
    caption: "서귀포시 성산읍",
  },
] as const;

const LARGE_EXPERIENCE_CARDS = [
  {
    to: ROUTES.jobDetail,
    imageSrc: homeJobHorseImage,
    imageAlt: "제주의 말을 돌보는 하루",
    title: "제주의 말을 돌보는 하루",
    deadline: "D-24",
    location: "제주시 구좌읍",
  },
  {
    to: ROUTES.jobDetail,
    imageSrc: homeJobStoneImage,
    imageAlt: "제주의 돌담을 이어가는 장인",
    title: "제주의 돌담을 이어가는 장인",
    deadline: "D-12",
    location: "서귀포시 성산읍",
  },
] as const;

type LargeExperienceCardProps = {
  to: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  deadline: string;
  location: string;
};

function LargeExperienceCard({
  to,
  imageSrc,
  imageAlt,
  title,
  deadline,
  location,
}: LargeExperienceCardProps) {
  return (
    <Box
      render={<Link to={to} aria-label={`${title} 상세 보기`} />}
      $css={{
        width: "283px",
        height: "268px",
        flex: "0 0 auto",
        border: "1px solid var(--vapor-color-gray-100, #e1e1e1)",
        borderRadius: "14px",
        backgroundColor: "var(--vapor-color-gray-000, #ffffff)",
        overflow: "hidden",
        textDecoration: "none",
      }}
    >
      <Box
        $css={{
          position: "relative",
          height: "160px",
          overflow: "hidden",
        }}
      >
        <Box
          render={<img src={imageSrc} alt={imageAlt} />}
          $css={{
            width: "100%",
            height: "100%",
            display: "block",
            objectFit: "cover",
          }}
        />
        <Badge
          shape="pill"
          size="md"
          $css={{
            position: "absolute",
            top: "12px",
            right: "12px",
            backgroundColor: "var(--vapor-color-cyan-100, #c2e8f0)",
            color: "var(--vapor-color-cyan-500, #0d8298)",
            fontWeight: 500,
            boxShadow: "none",
          }}
        >
          45년 이어온
        </Badge>
      </Box>

      <Box
        $css={{
          height: "108px",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "2px",
        }}
      >
        <Box
          $css={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <Text
            $css={{
              fontSize: "18px",
              lineHeight: "26px",
              fontWeight: 700,
              letterSpacing: "-0.1px",
              color: "var(--vapor-color-gray-800, #393939)",
              display: "block",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {title}
          </Text>
          <Text
            $css={{
              fontSize: "14px",
              lineHeight: "22px",
              fontWeight: 500,
              letterSpacing: "-0.1px",
              color: "var(--vapor-color-gray-700, #4c4c4c)",
            }}
          >
            {deadline}
          </Text>
        </Box>

        <Text
          $css={{
            fontSize: "12px",
            lineHeight: "18px",
            fontWeight: 400,
            letterSpacing: "-0.1px",
            color: "var(--vapor-color-gray-300, #a3a3a3)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {location}
        </Text>
      </Box>
    </Box>
  );
}

export function HomePage() {
  const navigate = useNavigate();

  return (
    <Box
      render={<section />}
      $css={{
        width: "100%",
        height: "100dvh",
        minHeight: "100dvh",
        backgroundColor: "var(--vapor-color-background-surface-200, #f7f7f7)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Box
        $css={{
          width: "100%",
          boxSizing: "border-box",
          flexShrink: 0,
          backgroundColor: "var(--vapor-color-background-canvas, #ffffff)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingBlock: "28px",
        }}
      >
        <Box render={<img src={logo} alt="전허게" />} />
      </Box>

      <Box
        $css={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <Box
          $css={{
            backgroundColor: "var(--vapor-color-background-canvas, #ffffff)",
            paddingTop: "14px",
            paddingBottom: "28px",
            paddingInline: "16px",
          }}
        >
          <Box
            $css={{
              display: "flex",
              alignItems: "center",
              gap: "2px",
            }}
          >
            {CATEGORY_ITEMS.map((category) => (
              <Box
                key={category.label}
                render={
                  <button
                    type="button"
                    onClick={() => navigate(category.to)}
                    aria-label={`${category.label} 직업 상세 보기`}
                  />
                }
                $css={{
                  width: "88px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  margin: 0,
                  padding: 0,
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
              >
                <Box
                  $css={{
                    width: "100%",
                    height: "67px",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <Box
                    $css={{
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <Box
                      render={
                        <img src={category.iconSrc} alt="" aria-hidden="true" />
                      }
                      $css={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        display: "block",
                      }}
                    />
                  </Box>
                </Box>
                <Text
                  $css={{
                    width: "100%",
                    textAlign: "center",
                    fontSize: "16px",
                    lineHeight: "24px",
                    fontWeight: 500,
                    letterSpacing: "-0.1px",
                    color: "var(--vapor-color-gray-800, #393939)",
                  }}
                >
                  {category.label}
                </Text>
              </Box>
            ))}
          </Box>
        </Box>

        <Box
          $css={{
            width: "100%",
            height: "12px",
            backgroundColor: "var(--vapor-color-gray-050, #f7f7f7)",
          }}
        />

        <Box
          $css={{
            paddingTop: "42px",
            paddingInline: "16px",
            paddingBottom: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "54px",
          }}
        >
          <Box
            $css={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <Text
              render={<h2 />}
              $css={{
                paddingLeft: "4px",
                fontSize: "18px",
                lineHeight: "26px",
                fontWeight: 700,
                letterSpacing: "-0.1px",
                color: "var(--vapor-color-gray-800, #393939)",
              }}
            >
              제주의 삶을 경험해보세요, 혜택은 덤으로
            </Text>

            <Box
              $css={{
                display: "flex",
                gap: "10px",
                overflowX: "auto",
                overflowY: "hidden",
                scrollSnapType: "x mandatory",
                scrollBehavior: "smooth",
                overscrollBehaviorX: "contain",
                paddingBottom: "2px",
              }}
            >
              {SMALL_EXPERIENCE_CARDS.map((card) => (
                <Box
                  key={card.title}
                  $css={{
                    width: "165px",
                    flex: "0 0 auto",
                    scrollSnapAlign: "start",
                  }}
                >
                  <ThumbnailCard {...card} />
                </Box>
              ))}
            </Box>
          </Box>

          <Box
            $css={{
              width: "100%",
              height: "109px",
              flexShrink: 0,
              borderRadius: "16px",
              overflow: "hidden",
              backgroundColor: "var(--vapor-color-gray-000, #ffffff)",
            }}
          >
            <Box
              render={<img src={banner} alt="광고 배너" />}
              $css={{
                display: "block",
                width: "100%",
                height: "100%",
              }}
            />
          </Box>

          <Box
            $css={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <Text
              $css={{
                paddingLeft: "4px",
                fontSize: "18px",
                lineHeight: "26px",
                fontWeight: 700,
                letterSpacing: "-0.1px",
                color: "var(--vapor-color-gray-800, #393939)",
              }}
            >
              <Box
                render={<span />}
                $css={{
                  color: "var(--vapor-color-orange-400, #ef6f25)",
                }}
              >
                2030
              </Box>
              {"이 찾는 전통 직업"}
            </Text>

            <Box
              $css={{
                display: "flex",
                gap: "10px",
                overflowX: "auto",
              }}
            >
              {LARGE_EXPERIENCE_CARDS.map((card) => (
                <LargeExperienceCard
                  key={card.title}
                  to={card.to}
                  imageSrc={card.imageSrc}
                  imageAlt={card.imageAlt}
                  title={card.title}
                  deadline={card.deadline}
                  location={card.location}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        $css={{
          flexShrink: 0,
        }}
      >
        <BottomNavigation />
      </Box>
    </Box>
  );
}
