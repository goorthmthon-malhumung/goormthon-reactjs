import { Box } from "@vapor-ui/core";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <Box
      className="app-shell"
      render={<main />}
      $css={{
        minHeight: "100dvh",
      }}
    >
      <Outlet />
    </Box>
  );
}
