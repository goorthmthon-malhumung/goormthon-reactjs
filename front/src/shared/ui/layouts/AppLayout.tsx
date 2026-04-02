import { Box } from "@vapor-ui/core";
import { Outlet } from "react-router-dom";

const DESIGN_WIDTH_PX = 390;
// const DESIGN_HEIGHT_PX = 844;

export function AppLayout() {
  return (
    <Box
      $css={{
        minHeight: "100dvh",
        backgroundColor: "transparent",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Box
        render={<main />}
        $css={{
          width: `min(${DESIGN_WIDTH_PX}px, 100vw)`,
          // height: `min(${DESIGN_HEIGHT_PX}px, 100dvh)`,
          height: "100dvh",
          background:
            "linear-gradient(to bottom, var(--vapor-color-background-base-white) 0 48px, var(--vapor-color-background-surface-200) 48px calc(100% - 34px), var(--vapor-color-background-base-white) calc(100% - 34px) 100%)",
          boxSizing: "border-box",
          paddingTop: "48px",
          paddingBottom: "34px",
        }}
      >
        <Box
          $css={{
            width: "100%",
            height: "100%",
            backgroundColor: "var(--vapor-color-background-surface-200)",
            overflow: "auto",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
