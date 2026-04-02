import bottomNavigationSubtract from "@/shared/assets/bottomNavigationSubtract.svg";
import matchingIcon from "@/shared/assets/matchingIcon.svg";
import { Box, IconButton, Text } from "@vapor-ui/core";
import {
  HomeIcon,
  HomeOutlineIcon,
  UserIcon,
  UserOutlineIcon,
} from "@vapor-ui/icons";

export type BottomNavTab = "home" | "my";

const NAV_WIDTH_PX = 358;
const NAV_HEIGHT_PX = 80;
const NAV_TOP_OFFSET_PX = 20;
const TAB_ROW_WIDTH_PX = 240;

const TAB_ICON_SIZE_PX = 22;
const TAB_LABEL_GAP_PX = 3;
const TAB_LABEL_FONT_SIZE_PX = 12;
const TAB_LABEL_LINE_HEIGHT_PX = 16;
const CENTER_BUTTON_SIZE_PX = 60;
const CENTER_BUTTON_TOP_OFFSET_PX = -20;
const TAB_ACTIVE_COLOR = "var(--vapor-color-cyan-200, #84d2e2)";
const TAB_INACTIVE_COLOR = "var(--vapor-color-gray-200, #c6c6c6)";

type BottomNavigationProps = {
  activeTab: BottomNavTab;
  onTabChange: (tab: BottomNavTab) => void;
  onCenterClick?: () => void;
};

export function BottomNavigation({
  activeTab,
  onTabChange,
  onCenterClick,
}: BottomNavigationProps) {
  const isHomeActive = activeTab === "home";
  const isMyActive = activeTab === "my";

  const handleCenterClick = () => {
    if (onCenterClick) {
      onCenterClick();
      return;
    }

    onTabChange("home");
  };

  return (
    <Box
      $css={{
        position: "relative",
        width: "100%",
      }}
    >
      <Box
        $css={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: `${NAV_WIDTH_PX}px`,
          marginInline: "auto",
          height: `${NAV_HEIGHT_PX}px`,
          marginTop: `${NAV_TOP_OFFSET_PX}px`,
        }}
      >
        <Box
          render={
            <img
              src={bottomNavigationSubtract}
              alt=""
              aria-hidden="true"
            />
          }
          $css={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            display: "block",
            pointerEvents: "none",
          }}
        />

        <Box
          $css={{
            position: "relative",
            zIndex: 2,
            width: `${TAB_ROW_WIDTH_PX}px`,
            height: "100%",
            marginInline: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            render={
              <button
                type="button"
                onClick={() => onTabChange("home")}
                aria-label="home"
                aria-current={isHomeActive ? "page" : undefined}
              />
            }
            $css={{
              width: "22px",
              margin: "0",
              padding: "0",
              border: "none",
              backgroundColor: "transparent",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: `${TAB_LABEL_GAP_PX}px`,
              cursor: "pointer",
              color: isHomeActive ? TAB_ACTIVE_COLOR : TAB_INACTIVE_COLOR,
            }}
          >
            {isHomeActive ? (
              <HomeIcon size={TAB_ICON_SIZE_PX} />
            ) : (
              <HomeOutlineIcon size={TAB_ICON_SIZE_PX} />
            )}
            <Text
              $css={{
                color: "inherit",
                fontSize: `${TAB_LABEL_FONT_SIZE_PX}px`,
                lineHeight: `${TAB_LABEL_LINE_HEIGHT_PX}px`,
                fontWeight: 500,
              }}
            >
              {"\uD648"}
            </Text>
          </Box>

          <Box
            render={
              <button
                type="button"
                onClick={() => onTabChange("my")}
                aria-label="my"
                aria-current={isMyActive ? "page" : undefined}
              />
            }
            $css={{
              width: "22px",
              margin: "0",
              padding: "0",
              border: "none",
              backgroundColor: "transparent",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: `${TAB_LABEL_GAP_PX}px`,
              cursor: "pointer",
              color: isMyActive ? TAB_ACTIVE_COLOR : TAB_INACTIVE_COLOR,
            }}
          >
            {isMyActive ? (
              <UserIcon size={TAB_ICON_SIZE_PX} />
            ) : (
              <UserOutlineIcon size={TAB_ICON_SIZE_PX} />
            )}
            <Text
              $css={{
                color: "inherit",
                fontSize: `${TAB_LABEL_FONT_SIZE_PX}px`,
                lineHeight: `${TAB_LABEL_LINE_HEIGHT_PX}px`,
                fontWeight: 500,
              }}
            >
              MY
            </Text>
          </Box>
        </Box>
      </Box>

      <IconButton
        aria-label="start matching"
        onClick={handleCenterClick}
        shape="circle"
        variant="ghost"
        $css={{
          position: "absolute",
          top: `${CENTER_BUTTON_TOP_OFFSET_PX}px`,
          left: "50%",
          transform: "translateX(-50%)",
          width: `${CENTER_BUTTON_SIZE_PX}px`,
          height: `${CENTER_BUTTON_SIZE_PX}px`,
          minWidth: `${CENTER_BUTTON_SIZE_PX}px`,
          minHeight: `${CENTER_BUTTON_SIZE_PX}px`,
          padding: "0",
          backgroundColor: "transparent",
          zIndex: 3,
        }}
      >
        <img
          src={matchingIcon}
          alt=""
          aria-hidden="true"
          style={{
            display: "block",
            width: `${CENTER_BUTTON_SIZE_PX}px`,
            height: `${CENTER_BUTTON_SIZE_PX}px`,
          }}
        />
      </IconButton>
    </Box>
  );
}
