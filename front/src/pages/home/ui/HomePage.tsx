import adImage from "@/shared/assets/ad.png";
import haenyeoIcon from "@/shared/assets/haenyeoIcon.svg";
import horseIcon from "@/shared/assets/horseIcon.svg";
import logo from "@/shared/assets/logo.svg";
import mandarinIcon from "@/shared/assets/mandarinIcon.svg";
import stoneIcon from "@/shared/assets/stoneIcon.svg";
import { ROUTES } from "@/shared/config/routes";
import { ThumbnailCard, type ThumbnailCardProps } from "@/shared/ui/cards";
import {
  BottomNavigation,
  type BottomNavTab,
} from "@/shared/ui/navigation/BottomNavigation";
import { Badge, Box, Text } from "@vapor-ui/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SMALL_CARD_IMAGE_URL =
  "https://www.figma.com/api/mcp/asset/acf1766d-7833-45cb-9d64-368c486a2af0";
const LARGE_CARD_IMAGE_URL =
  "https://www.figma.com/api/mcp/asset/fb990819-5353-4633-a2d6-b7a342cb57f7";

const CATEGORY_ITEMS = [
  { iconSrc: haenyeoIcon, label: "해녀" },
  { iconSrc: stoneIcon, label: "돌담 장인" },
  { iconSrc: mandarinIcon, label: "감귤 농사" },
  { iconSrc: horseIcon, label: "목장주" },
] as const;

const SMALL_EXPERIENCE_CARDS: ReadonlyArray<ThumbnailCardProps> = [
  {
    to: "/tokens",
    imageSrc: SMALL_CARD_IMAGE_URL,
    imageAlt: "귤나무에 물을 주는 하루",
    badgeLabel: "정착지원금 30만원",
    title: "귤나무에 물을 주는 하루",
    statusLabel: "김** 해녀 · D-10",
    caption: "제주도 구좌읍",
  },
  {
    to: "/tokens",
    imageSrc: SMALL_CARD_IMAGE_URL,
    imageAlt: "제주도 귤을 수확하는 하루",
    badgeLabel: "정착지원금 30만원",
    title: "제주도 귤을 수확하는 하루",
    statusLabel: "임** 농부 · D-20",
    caption: "서귀포시 효돈동",
  },
  {
    to: "/tokens",
    imageSrc: SMALL_CARD_IMAGE_URL,
    imageAlt: "제주도 밭을 일구는 하루",
    badgeLabel: "정착지원금 30만원",
    title: "제주도 밭을 일구는 하루",
    statusLabel: "강** 장인 · D-10",
    caption: "서귀포시 성산읍",
  },
] as const;

const LARGE_EXPERIENCE_CARDS = [
  {
    title: "제주도 마을을 돌아보는 하루",
    deadline: "D-24",
    location: "제주도 구좌읍",
  },
  {
    title: "제주도 돌담을 쌓아가는 장인",
    deadline: "D-12",
    location: "서귀포시 성산읍",
  },
] as const;

type LargeExperienceCardProps = {
  title: string;
  deadline: string;
  location: string;
};

function LargeExperienceCard({
  title,
  deadline,
  location,
}: LargeExperienceCardProps) {
  return (
    <Box
      $css={{
        width: "283px",
        height: "268px",
        flex: "0 0 auto",
        border: "1px solid var(--vapor-color-gray-100, #e1e1e1)",
        borderRadius: "14px",
        backgroundColor: "var(--vapor-color-gray-000, #ffffff)",
        overflow: "hidden",
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
          render={<img src={LARGE_CARD_IMAGE_URL} alt="" aria-hidden="true" />}
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
  const [activeTab, setActiveTab] = useState<BottomNavTab>("home");

  const handleBottomTabChange = (tab: BottomNavTab) => {
    setActiveTab(tab);

    if (tab === "home") {
      navigate(ROUTES.home);
      return;
    }

    navigate(ROUTES.my);
  };

  return (
    <Box
      render={<section />}
      $css={{
        width: "100%",
        // height: "100%",
        height: "100dvh",
        minHeight: "100dvh",
        backgroundColor: "var(--vapor-color-background-surface-200, #f7f7f7)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        $css={{
          width: "100%",
          boxSizing: "border-box",
          height: "48px",
          backgroundColor: "var(--vapor-color-background-canvas, #ffffff)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box render={<img src={logo} alt="전허게" />} />
      </Box>

      <Box
        $css={{
          flex: 1,
          overflowY: "auto",
          paddingTop: "28px",
          paddingBottom: "calc(140px + env(safe-area-inset-bottom))",
          display: "flex",
          flexDirection: "column",
          gap: "42px",
          paddingInline: "16px",
        }}
      >
        <Box
          $css={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Text
            render={<h2 />}
            $css={{
              fontSize: "18px",
              lineHeight: "26px",
              fontWeight: 700,
              letterSpacing: "-0.1px",
              color: "var(--vapor-color-gray-800, #393939)",
            }}
          >
            어떤 제주를 경험해볼까요?
          </Text>

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
                $css={{
                  width: "88px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
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
            height: "80px",
            minHeight: "80px",
            flexShrink: 0,
            borderRadius: "16px",
            overflow: "hidden",
            backgroundColor: "var(--vapor-color-gray-000, #ffffff)",
          }}
        >
          <Box
            render={<img src={adImage} alt="광고 배너" />}
            $css={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover",
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
                title={card.title}
                deadline={card.deadline}
                location={card.location}
              />
            ))}
          </Box>
        </Box>
      </Box>

      <Box
        $css={{
          position: "absolute",
          left: "0",
          right: "0",
          // bottom: "0",
          bottom: "20px",
          paddingInline: "16px",
        }}
      >
        <BottomNavigation
          activeTab={activeTab}
          onTabChange={handleBottomTabChange}
          onCenterClick={() => navigate(ROUTES.matching)}
        />
      </Box>
    </Box>
  );
}
