import { isApiError } from "@/api/fetcher";
import { useMe } from "@/api/generated/user/user";
import { ROUTES } from "@/shared/config/routes";
import { asRecord } from "@/shared/lib/apiData";
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
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TAB_ACTIVE_COLOR = "var(--vapor-color-cyan-200, #84d2e2)";
const TAB_INACTIVE_COLOR = "var(--vapor-color-gray-200, #c6c6c6)";
const NAV_BACKGROUND_COLOR = "var(--app-color-navigation-background, #232323)";
const ICON_SIZE = 22;

type Tab = {
  id: "home" | "matching" | "management" | "my";
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
    route: ROUTES.mentorHome,
    ActiveIcon: HomeIcon,
    InactiveIcon: HomeOutlineIcon,
  },
  {
    id: "management" as const,
    label: "게시물",
    route: ROUTES.mentorPost,
    ActiveIcon: AssignmentIcon,
    InactiveIcon: AssignmentOutlineIcon,
  },
  {
    id: "my" as const,
    label: "MY",
    route: ROUTES.mentorMy,
    ActiveIcon: UserIcon,
    InactiveIcon: UserOutlineIcon,
  },
] satisfies ReadonlyArray<Tab>;

function getActiveId(
  pathname: string,
  isMentor: boolean,
): Tab["id"] {
  if (isMentor) {
    if (
      pathname === ROUTES.mentorMy ||
      pathname.startsWith(`${ROUTES.mentorMy}/`)
    ) {
      return "my";
    }

    if (
      pathname === ROUTES.mentorHome ||
      pathname.startsWith(`${ROUTES.mentorHome}/`)
    ) {
      return "home";
    }

    return "management";
  }

  if (
    pathname === ROUTES.my ||
    pathname.startsWith(`${ROUTES.my}/`)
  ) {
    return "my";
  }

  if (
    pathname === ROUTES.matching ||
    pathname.startsWith(`${ROUTES.matching}/`)
  ) {
    return "matching";
  }

  return "home";
}

export function BottomNavigation() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const meQuery = useMe({
    query: {
      staleTime: 60_000,
      retry: false,
    },
  });
  const profile = asRecord(meQuery.data?.data);
  const isMentor = profile?.isMentor === true;
  const tabs = isMentor ? MENTOR_TABS : MENTEE_TABS;
  const activeId = getActiveId(pathname, isMentor);

  useEffect(() => {
    if (!meQuery.isError || !isApiError(meQuery.error)) {
      return;
    }

    if (meQuery.error.status === 401 || meQuery.error.status === 403) {
      navigate(ROUTES.login, { replace: true });
    }
  }, [meQuery.error, meQuery.isError, navigate]);

  if (meQuery.isPending || meQuery.isError) {
    return null;
  }

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
