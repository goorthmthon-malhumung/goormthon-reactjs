import { ComponentsPage } from "@/pages/components/ui/ComponentsPage";
import { ExperienceDetailPage } from "@/pages/experience-detail";
import { HomePage } from "@/pages/home/ui/HomePage";
import { JobDetailPage } from "@/pages/job-detail";
import { LoginPage } from "@/pages/login/ui/LoginPage";
import { MatchingPage } from "@/pages/matching/ui/MatchingPage";
import { MatchingDetailPage } from "@/pages/matching-detail";
import { MentorPreviewPage } from "@/pages/mentor-preview/ui/MentorPreviewPage";
import { MyPage } from "@/pages/my";
import { NotFoundPage } from "@/pages/not-found/ui/NotFoundPage";
import { OnboardingPage } from "@/pages/onboarding/ui/OnboardingPage";
import { RegisterPage } from "@/pages/register/RegisterPage";
import { ReservationPage } from "@/pages/reservation";
import { TokensPage } from "@/pages/tokens/ui/TokensPage";
import { ROUTES } from "@/shared/config/routes";
import { RootErrorBoundary } from "@/shared/ui/errors/RootErrorBoundary";
import { AppLayout } from "@/shared/ui/layouts/AppLayout";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <AppLayout />,
    errorElement: <RootErrorBoundary />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ROUTES.matching.slice(1),
        element: <MatchingPage />,
      },
      {
        path: ROUTES.jobDetail.slice(1),
        element: <JobDetailPage />,
      },
      {
        path: ROUTES.matchingDetail.slice(1),
        element: <MatchingDetailPage />,
      },
      {
        path: ROUTES.experienceDetail.slice(1),
        element: <ExperienceDetailPage />,
      },
      {
        path: ROUTES.reservation.slice(1),
        element: <ReservationPage />,
      },
      {
        path: ROUTES.onboarding.slice(1),
        element: <OnboardingPage />,
      },
      {
        path: ROUTES.login.slice(1),
        element: <LoginPage />,
      },
      {
        path: ROUTES.my.slice(1),
        element: <MyPage />,
      },
      {
        path: ROUTES.register.slice(1),
        element: <RegisterPage />,
      },
      {
        path: ROUTES.components.slice(1),
        element: <ComponentsPage />,
      },
      {
        path: ROUTES.tokens.slice(1),
        element: <TokensPage />,
      },
      {
        path: ROUTES.mentorPreview.slice(1),
        element: <MentorPreviewPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
