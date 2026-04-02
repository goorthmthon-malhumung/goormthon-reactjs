import {
  Box,
  Button,
  Text,
  VStack,
} from "@vapor-ui/core";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes";
import { OnboardingArtwork } from "./OnboardingArtwork";

export function OnboardingPage() {
  return (
    <Box
      $css={{
        position: "relative",
        height: "100dvh",
        minHeight: "100dvh",
        overflow: "hidden",
        background: "linear-gradient(180deg, #060715 0%, #00032A 100%)",
      }}
    >
      <OnboardingArtwork />

      <VStack
        $css={{
          height: "100dvh",
          minHeight: "100dvh",
          position: "relative",
          zIndex: 1,
          paddingLeft: "39px",
          paddingRight: "39px",
          paddingTop: "max(84px, env(safe-area-inset-top))",
          paddingBottom: "max(78px, env(safe-area-inset-bottom))",
          justifyContent: "space-between",
        }}
      >
        <Box />

        <VStack
          $css={{
            width: "100%",
            alignItems: "center",
            gap: "10px",
            textAlign: "center",
            marginTop: "-48px",
          }}
        >
          <Text
            render={<h1 />}
            $css={{
              fontFamily:
                '"EF_jejudoldam", "Pretendard", "Apple SD Gothic Neo", sans-serif',
              fontSize: "100px",
              lineHeight: "106px",
              letterSpacing: "-1.6636px",
              color: "#FFFFFF",
              fontWeight: 400,
              whiteSpace: "nowrap",
            }}
          >
            전허게
          </Text>
          <Text
            $css={{
              color: "#FFFFFF",
              fontFamily:
                '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif',
              fontSize: "16px",
              lineHeight: "26px",
              fontWeight: 400,
              letterSpacing: "-0.3125px",
            }}
          >
            체험에서 전수까지, 제주를 잇다
          </Text>
        </VStack>

        <VStack
          $css={{
            width: "100%",
            gap: "16px",
          }}
        >
          <Button
            render={<Link to={ROUTES.home} />}
            $css={{
              width: "100%",
              height: "55.981px",
              borderRadius: "999px",
              border: "none",
              backgroundColor: "#1CB3CB",
              color: "#FFFFFF",
              fontFamily:
                '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif',
              fontSize: "16px",
              fontWeight: 600,
              lineHeight: "24px",
              letterSpacing: "-0.3125px",
              boxShadow: "none",
              justifyContent: "center",
            }}
          >
            시작하기
          </Button>
          <Button
            render={<Link to={ROUTES.login} />}
            $css={{
              width: "100%",
              height: "58.923px",
              paddingInline: "33.471px",
              paddingBlock: "17.471px",
              borderRadius: "999px",
              borderColor: "#E2E8F0",
              borderStyle: "solid",
              borderWidth: "1.471px",
              backgroundColor: "#FFFFFF",
              color: "#0F172B",
              fontFamily:
                '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif',
              fontSize: "16px",
              fontWeight: 600,
              lineHeight: "24px",
              letterSpacing: "-0.3125px",
              justifyContent: "center",
              boxShadow: "none",
            }}
          >
            로그인
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
}
