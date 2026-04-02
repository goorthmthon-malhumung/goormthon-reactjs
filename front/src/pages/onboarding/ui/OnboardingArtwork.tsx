import { Box } from "@vapor-ui/core";
import gogglesMaskImageUrl from "@/assets/onboarding/goggles-mask.svg";
import gogglesImageUrl from "@/assets/onboarding/goggles.svg";
import snorkelImageUrl from "@/assets/onboarding/snorkel.svg";
import starImageUrl from "@/assets/onboarding/star.svg";
import stoneImageUrl from "@/assets/onboarding/stone.svg";
import tangerineImageUrl from "@/assets/onboarding/tangerine.svg";

function OnboardingGoggles() {
  return (
    <Box
      $css={{
        position: "absolute",
        left: "34px",
        top: "96px",
        width: "111px",
        height: "90px",
        opacity: 0.92,
        filter: "blur(2px)",
      }}
    >
      <Box
        render={<img src={snorkelImageUrl} alt="" />}
        aria-hidden="true"
        $css={{
          position: "absolute",
          top: "20px",
          left: "67px",
          width: "18px",
          height: "52px",
          display: "block",
          transform: "rotate(18deg)",
          transformOrigin: "center",
          opacity: 0.75,
        }}
      />
      <Box
        render={<img src={gogglesImageUrl} alt="" />}
        aria-hidden="true"
        $css={{
          position: "absolute",
          top: "34px",
          left: "0",
          width: "82px",
          height: "44px",
          display: "block",
          transform: "rotate(18deg)",
          transformOrigin: "center",
          opacity: 0.85,
        }}
      />
      <Box
        render={
          <div
            style={{
              position: "absolute",
              top: "30px",
              left: "3px",
              width: "9px",
              height: "51px",
              backgroundColor: "#83F0FF",
              transform: "rotate(52deg)",
              transformOrigin: "center",
              opacity: 0.28,
              WebkitMaskImage: `url(${gogglesMaskImageUrl})`,
              maskImage: `url(${gogglesMaskImageUrl})`,
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "-2px 2px",
              maskPosition: "-2px 2px",
              WebkitMaskSize: "78px 40px",
              maskSize: "78px 40px",
            }}
          />
        }
      />
    </Box>
  );
}

function OnboardingStone() {
  return (
    <Box
      $css={{
        position: "absolute",
        left: "-30px",
        bottom: "248px",
        width: "128px",
        height: "98px",
        opacity: 0.78,
      }}
    >
      <Box
        render={<img src={stoneImageUrl} alt="" />}
        aria-hidden="true"
        $css={{
          width: "100%",
          height: "100%",
          display: "block",
          transform: "rotate(-16deg)",
          transformOrigin: "center",
        }}
      />
    </Box>
  );
}

function OnboardingTangerine() {
  return (
    <Box
      $css={{
        position: "absolute",
        right: "39px",
        top: "138px",
        width: "74px",
        height: "76px",
      }}
    >
      <Box
        render={<img src={tangerineImageUrl} alt="" />}
        aria-hidden="true"
        $css={{
          width: "100%",
          height: "100%",
          display: "block",
          transform: "rotate(-23deg)",
          transformOrigin: "center",
        }}
      />
    </Box>
  );
}

function OnboardingStar() {
  return (
    <Box
      $css={{
        position: "absolute",
        right: "118px",
        top: "130px",
        width: "35px",
        height: "35px",
      }}
    >
      <Box
        render={<img src={starImageUrl} alt="" />}
        aria-hidden="true"
        $css={{
          width: "100%",
          height: "100%",
          display: "block",
          transform: "rotate(-23deg)",
          transformOrigin: "center",
        }}
      />
    </Box>
  );
}

function DecorationDot({
  top,
  left,
  right,
  bottom,
  size,
  opacity = 0.34,
}: {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  size: string;
  opacity?: number;
}) {
  return (
    <Box
      $css={{
        position: "absolute",
        top,
        left,
        right,
        bottom,
        width: size,
        height: size,
        borderRadius: "999px",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.1)",
        opacity,
      }}
    />
  );
}

function BottomGlow() {
  return (
    <Box
      $css={{
        position: "absolute",
        right: "-48px",
        bottom: "-18px",
        width: "176px",
        height: "126px",
        borderRadius: "999px",
        background:
          "radial-gradient(circle at 35% 35%, rgba(118, 89, 255, 0.55) 0%, rgba(60, 78, 255, 0.18) 38%, rgba(1, 3, 42, 0) 78%)",
        filter: "blur(16px)",
        opacity: 0.85,
      }}
    />
  );
}

export function OnboardingArtwork() {
  return (
    <Box
      aria-hidden="true"
      $css={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
      }}
    >
      <OnboardingGoggles />
      <OnboardingStar />
      <OnboardingTangerine />
      <OnboardingStone />
      <BottomGlow />

      <DecorationDot top="77px" left="57px" size="8px" opacity={0.48} />
      <DecorationDot top="236px" left="217px" size="14px" opacity={0.24} />
      <DecorationDot top="280px" left="40px" size="8px" opacity={0.36} />
      <DecorationDot top="364px" left="220px" size="14px" opacity={0.16} />
      <DecorationDot top="497px" right="24px" size="8px" opacity={0.42} />
      <DecorationDot top="561px" left="162px" size="8px" opacity={0.46} />
      <DecorationDot top="578px" right="62px" size="14px" opacity={0.56} />
      <DecorationDot bottom="241px" left="31px" size="14px" opacity={0.52} />
      <DecorationDot bottom="145px" right="17px" size="8px" opacity={0.28} />
    </Box>
  );
}
