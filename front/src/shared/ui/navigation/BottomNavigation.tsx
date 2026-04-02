import { Box, Text } from "@vapor-ui/core";
import {
  AssignmentIcon,
  AssignmentOutlineIcon,
  GroupIcon,
  GroupOutlineIcon,
  HomeIcon,
  HomeOutlineIcon,
  UserIcon,
  UserOutlineIcon,
} from "@vapor-ui/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes";

const TAB_ACTIVE_COLOR = "var(--vapor-color-cyan-200, #84d2e2)";
const TAB_INACTIVE_COLOR = "var(--vapor-color-gray-200, #c6c6c6)";
const NAV_BACKGROUND_COLOR = "var(--app-color-navigation-background, #232323)";
const ICON_SIZE = 22;

type Tab = {
  id: string;
  label: string;
  route: string;
  ActiveIcon: typeof HomeIcon;
  InactiveIcon: typeof HomeOutlineIcon;
};

const MENTEE_TABS = [
  {
    id: "home" as const,
    label: "홈",
    route: ROUTES.home,
    ActiveIcon: HomeIcon,
    InactiveIcon: HomeOutlineIcon,
  },
  {
    id: "matching" as const,
    label: "매칭",
    route: ROUTES.matching,
    ActiveIcon: GroupIcon,
    InactiveIcon: GroupOutlineIcon,
  },
  {
    id: "my" as const,
    label: "MY",
    route: ROUTES.my,
    ActiveIcon: UserIcon,
    InactiveIcon: UserOutlineIcon,
  },
] satisfies ReadonlyArray<Tab>;

const MENTOR_TABS = [
  {
    id: "home" as const,
    label: "홈",
    route: ROUTES.home,
    ActiveIcon: HomeIcon,
    InactiveIcon: HomeOutlineIcon,
  },
  {
    id: "management" as const,
    label: "체험관리",
    route: ROUTES.home, // TODO: 체험관리 route 추가 후 교체
    ActiveIcon: AssignmentIcon,
    InactiveIcon: AssignmentOutlineIcon,
  },
  {
    id: "my" as const,
    label: "MY",
    route: ROUTES.my,
    ActiveIcon: UserIcon,
    InactiveIcon: UserOutlineIcon,
  },
] satisfies ReadonlyArray<Tab>;

type BottomNavigationProps = {
  isMentor?: boolean;
};

export function BottomNavigation({ isMentor = false }: BottomNavigationProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const tabs = isMentor ? MENTOR_TABS : MENTEE_TABS;

  const activeId =
    pathname === ROUTES.my || pathname.startsWith(`${ROUTES.my}/`)
      ? "my"
      : !isMentor &&
          (pathname === ROUTES.matching ||
            pathname.startsWith(`${ROUTES.matching}/`))
        ? "matching"
        : "home";

  return (
    <Box
      $css={{
        display: "flex",
        width: "100%",
        padding: "24px 30px 30px 30px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        borderRadius: "18px 18px 0 0",
        backgroundColor: NAV_BACKGROUND_COLOR,
        boxSizing: "border-box",
      }}
    >
      <Box
        $css={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "100px",
        }}
      >
        {tabs.map(({ id, label, route, ActiveIcon, InactiveIcon }) => {
          const isActive = activeId === id;
          const Icon = isActive ? ActiveIcon : InactiveIcon;
          return (
            <Box
              key={id}
              render={
                <button
                  type="button"
                  onClick={() => navigate(route)}
                  aria-label={label}
                  aria-current={isActive ? "page" : undefined}
                />
              }
              $css={{
                margin: 0,
                padding: 0,
                border: "none",
                backgroundColor: "transparent",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "3px",
                cursor: "pointer",
                color: isActive ? TAB_ACTIVE_COLOR : TAB_INACTIVE_COLOR,
              }}
            >
              <Icon size={ICON_SIZE} />
              <Text
                $css={{
                  color: "inherit",
                  fontSize: "12px",
                  lineHeight: "16px",
                  fontWeight: 500,
                }}
              >
                {label}
              </Text>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
