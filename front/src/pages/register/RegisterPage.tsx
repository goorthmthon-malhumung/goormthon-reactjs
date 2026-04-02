import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  Box,
  Button,
  Field,
  HStack,
  Select,
  Text,
  TextInput,
  VStack,
} from "@vapor-ui/core";
import { ChevronLeftOutlineIcon } from "@vapor-ui/icons";
import { ROUTES } from "@/shared/config/routes";

type RegisterStep = 0 | 1 | 2;
type RoleType = "mentor" | "successor" | null;

const JOB_OPTIONS = ["해녀", "돌담 장인", "감귤 농사", "목장주"] as const;
const PASSWORD_POLICY_TEXT = "8~16자, 영문, 특수문자 포함";

const INPUT_STYLES = {
  height: "48px",
  borderRadius: "8px",
  borderColor: "var(--vapor-color-border-normal, #e1e1e1)",
  backgroundColor: "var(--vapor-color-background-canvas, #ffffff)",
  paddingInline: "24px",
} as const;

const FIELD_LABEL_STYLES = {
  color: "var(--vapor-color-foreground-normal-100, #4c4c4c)",
  fontSize: "12px",
  lineHeight: "18px",
  fontWeight: 500,
  letterSpacing: "0",
} as const;

type StepHeaderProps = {
  title: string;
  subtitle: string;
};

function StepHeader({ title, subtitle }: StepHeaderProps) {
  return (
    <VStack
      $css={{
        gap: "4px",
        alignItems: "stretch",
        paddingLeft: "9px",
      }}
    >
      <Text
        render={<h1 />}
        typography="heading3"
        $css={{ color: "var(--vapor-color-gray-900, #0f172b)" }}
      >
        {title}
      </Text>
      <Text
        typography="body1"
        $css={{
          color: "var(--vapor-color-foreground-hint-100, #45556c)",
          whiteSpace: "nowrap",
        }}
      >
        {subtitle}
      </Text>
    </VStack>
  );
}

type RoleCardProps = {
  icon: string;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
};

function RoleCard({
  icon,
  title,
  description,
  selected,
  onClick,
}: RoleCardProps) {
  return (
    <Button
      type="button"
      variant="outline"
      colorPalette="secondary"
      onClick={onClick}
      $css={{
        width: "100%",
        height: "auto",
        minHeight: "106px",
        borderRadius: "14px",
        boxShadow: selected
          ? "inset 0 0 0 1px var(--vapor-color-cyan-300, #1cb3cb)"
          : "inset 0 0 0 1px var(--vapor-color-gray-100, #e2e8f0)",
        backgroundColor: selected
          ? "var(--vapor-color-cyan-050, #ddf2f7)"
          : "var(--vapor-color-background-surface-200, #f7f7f7)",
        paddingInline: "16px",
        paddingBlock: "24px",
        justifyContent: "flex-start",
        textAlign: "left",
        whiteSpace: "normal",
      }}
    >
      <HStack
        $css={{
          gap: "16px",
          alignItems: "center",
        }}
      >
        <Text
          $css={{
            fontSize: "30px",
            lineHeight: "36px",
          }}
        >
          {icon}
        </Text>
        <VStack
          $css={{
            gap: "4px",
            alignItems: "stretch",
            textAlign: "left",
            minWidth: 0,
          }}
        >
          <Text
            $css={{
              color: "var(--vapor-color-gray-900, #0f172b)",
              fontSize: "18px",
              lineHeight: "27px",
              fontWeight: 600,
              letterSpacing: "-0.44px",
            }}
          >
            {title}
          </Text>
          <Text
            $css={{
              color: "var(--vapor-color-foreground-hint-100, #45556c)",
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: 500,
              letterSpacing: "-0.15px",
            }}
          >
            {description}
          </Text>
        </VStack>
      </HStack>
    </Button>
  );
}

function Footer({
  buttonLabel,
  disabled,
  onClick,
  compact = false,
}: {
  buttonLabel: string;
  disabled: boolean;
  onClick: () => void;
  compact?: boolean;
}) {
  return (
    <VStack
      $css={{
        paddingTop: compact ? "12px" : "24px",
        gap: compact ? "16px" : "24px",
        alignItems: "stretch",
        paddingBottom: "59px",
      }}
    >
      <Button
        type="button"
        disabled={disabled}
        onClick={onClick}
        $css={{
          width: "100%",
          height: "56px",
          minHeight: "56px",
          borderRadius: "14px",
          backgroundColor: disabled
            ? "var(--vapor-color-cyan-200, #84d2e2)"
            : "var(--vapor-color-cyan-300, #1cb3cb)",
          color: "var(--vapor-color-white, #ffffff)",
          fontSize: "16px",
          lineHeight: "24px",
          fontWeight: 600,
          letterSpacing: "-0.31px",
          boxShadow: "none",
          border: "none",
          opacity: 1,
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        {buttonLabel}
      </Button>

      <Text
        $css={{
          textAlign: "center",
          color: "var(--vapor-color-gray-800, #393939)",
          fontSize: "16px",
          lineHeight: "24px",
          fontWeight: 500,
          letterSpacing: "-0.1px",
        }}
      >
        {"이미 계정이 있으신가요? "}
        <Link
          to={ROUTES.login}
          style={{
            color: "var(--vapor-color-cyan-300, #17a3ba)",
            textDecoration: "none",
          }}
        >
          로그인
        </Link>
      </Text>
    </VStack>
  );
}

export function RegisterPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const stepParam = searchParams.get("step");
  const step: RegisterStep =
    stepParam === "1" || stepParam === "2"
      ? (Number(stepParam) as RegisterStep)
      : 0;
  const [role, setRole] = useState<RoleType>(null);
  const [job, setJob] = useState<string | null>(null);
  const [career, setCareer] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const hasPasswordConfirm = passwordConfirm.trim().length > 0;
  const isPasswordMatched = password === passwordConfirm;
  const isInfoStep = step === 2;

  const canProceed =
    step === 0
      ? role !== null
      : step === 1
        ? Boolean(job) && career.trim().length > 0
        : name.trim().length > 0 &&
          phone.trim().length > 0 &&
          password.trim().length > 0 &&
          passwordConfirm.trim().length > 0 &&
          isPasswordMatched;

  const setStep = (nextStep: RegisterStep) => {
    const nextParams = new URLSearchParams(searchParams);
    if (nextStep === 0) {
      nextParams.delete("step");
    } else {
      nextParams.set("step", String(nextStep));
    }
    setSearchParams(nextParams, { replace: true });
  };

  const handleNext = () => {
    if (!canProceed) {
      return;
    }

    if (step === 2) {
      sessionStorage.setItem("app:isLoggedIn", "true");
      navigate(ROUTES.home, { replace: true });
      return;
    }

    if (step === 0) {
      setStep(role === "successor" ? 2 : 1);
      return;
    }

    setStep(2);
  };

  const handleBack = () => {
    if (step === 0) {
      navigate(-1);
      return;
    }

    if (step === 2 && role === "successor") {
      setStep(0);
      return;
    }

    setStep((step - 1) as RegisterStep);
  };

  const renderStepContent = () => {
    if (step === 0) {
      return (
        <VStack
          $css={{
            gap: "16px",
            alignItems: "stretch",
            marginTop: "84px",
          }}
        >
          <RoleCard
            icon="👨‍🌾"
            title="멘토 (전통 직업 종사자)"
            description="전통 기술과 지식을 후대에 전수하고 싶어요"
            selected={role === "mentor"}
            onClick={() => setRole("mentor")}
          />
          <RoleCard
            icon="🌱"
            title="후계자 지망생 (청년)"
            description="제주 전통 직업을 배우고 계승하고 싶어요"
            selected={role === "successor"}
            onClick={() => setRole("successor")}
          />
        </VStack>
      );
    }

    if (step === 1) {
      return (
        <VStack
          $css={{
            gap: "16px",
            alignItems: "stretch",
            marginTop: "66px",
          }}
        >
          <Field.Root name="job">
            <VStack $css={{ gap: "8px", alignItems: "stretch" }}>
              <Field.Label $css={FIELD_LABEL_STYLES}>직업</Field.Label>
              <Select.Root
                value={job}
                onValueChange={(value) => setJob(value ? String(value) : null)}
                placeholder="직업을 선택해주세요"
              >
                <Select.Trigger
                  $css={{
                    height: "48px",
                    borderRadius: "8px",
                    borderColor: "var(--vapor-color-border-normal, #e1e1e1)",
                    backgroundColor:
                      "var(--vapor-color-background-canvas, #ffffff)",
                    paddingInline: "24px",
                    justifyContent: "space-between",
                  }}
                >
                  <Select.ValuePrimitive />
                </Select.Trigger>
                <Select.Popup>
                  {JOB_OPTIONS.map((option) => (
                    <Select.Item key={option} value={option}>
                      {option}
                    </Select.Item>
                  ))}
                </Select.Popup>
              </Select.Root>
            </VStack>
          </Field.Root>

          <Field.Root name="career">
            <VStack $css={{ gap: "8px", alignItems: "stretch" }}>
              <Field.Label $css={FIELD_LABEL_STYLES}>경력</Field.Label>
              <TextInput
                type="tel"
                inputMode="numeric"
                placeholder="숫자만 입력해주세요"
                value={career}
                onValueChange={(value) =>
                  setCareer(value.replace(/[^0-9]/g, ""))
                }
                $css={INPUT_STYLES}
              />
            </VStack>
          </Field.Root>
        </VStack>
      );
    }

    return (
      <VStack
        $css={{
          gap: "12px",
          alignItems: "stretch",
          marginTop: "28px",
        }}
      >
        <Field.Root name="name">
          <VStack $css={{ gap: "8px", alignItems: "stretch" }}>
            <Field.Label $css={FIELD_LABEL_STYLES}>이름</Field.Label>
            <TextInput
              value={name}
              placeholder="이름을 입력해주세요"
              onValueChange={(value) => setName(value)}
              $css={INPUT_STYLES}
            />
          </VStack>
        </Field.Root>

        <Field.Root name="phone">
          <VStack $css={{ gap: "8px", alignItems: "stretch" }}>
            <Field.Label $css={FIELD_LABEL_STYLES}>핸드폰 번호</Field.Label>
            <TextInput
              type="tel"
              inputMode="numeric"
              placeholder="01012345678"
              value={phone}
              onValueChange={(value) => setPhone(value.replace(/[^0-9]/g, ""))}
              $css={INPUT_STYLES}
            />
          </VStack>
        </Field.Root>

        <Field.Root name="password">
          <VStack $css={{ gap: "8px", alignItems: "stretch" }}>
            <Field.Label $css={FIELD_LABEL_STYLES}>비밀번호</Field.Label>
            <TextInput
              type="password"
              value={password}
              placeholder="비밀번호를 입력해주세요"
              onValueChange={(value) => setPassword(value)}
              $css={INPUT_STYLES}
            />
            <Field.Description
              $css={{
                paddingLeft: "4px",
                color: "var(--vapor-color-foreground-hint-100, #5d5d5d)",
                fontSize: "14px",
                lineHeight: "22px",
                fontWeight: 400,
              }}
            >
              {PASSWORD_POLICY_TEXT}
            </Field.Description>
          </VStack>
        </Field.Root>

        <Field.Root name="passwordConfirm">
          <VStack $css={{ gap: "8px", alignItems: "stretch" }}>
            <Field.Label $css={FIELD_LABEL_STYLES}>비밀번호 확인</Field.Label>
            <TextInput
              type="password"
              value={passwordConfirm}
              placeholder="비밀번호를 다시 입력해주세요"
              onValueChange={(value) => setPasswordConfirm(value)}
              $css={INPUT_STYLES}
            />
            {hasPasswordConfirm ? (
              <Field.Description
                $css={{
                  paddingLeft: "4px",
                  color: isPasswordMatched
                    ? "var(--vapor-color-green-500, #008160)"
                    : "var(--vapor-color-red-500, #d4333f)",
                  fontSize: "14px",
                  lineHeight: "22px",
                  fontWeight: 400,
                }}
              >
                {isPasswordMatched ? "일치합니다." : "불일치합니다."}
              </Field.Description>
            ) : null}
          </VStack>
        </Field.Root>
      </VStack>
    );
  };

  return (
    <Box
      render={<main />}
      $css={{
        width: "100%",
        height: "100dvh",
        minHeight: "100dvh",
        overflow: "hidden",
        backgroundColor: "var(--vapor-color-background-surface-200, #f7f7f7)",
      }}
    >
      <VStack
        $css={{
          height: "100dvh",
          minHeight: "100dvh",
          overflow: "hidden",
          alignItems: "stretch",
        }}
      >
        <HStack
          $css={{
            height: "56px",
            alignItems: "center",
            backgroundColor: "var(--vapor-color-background-surface-200, #f7f7f7)",
            paddingInline: "16px",
          }}
        >
          <Button
            type="button"
            variant="ghost"
            onClick={handleBack}
            $css={{
              width: "40px",
              minWidth: "40px",
              height: "40px",
              minHeight: "40px",
              borderRadius: "9999px",
              padding: "0",
              color: "var(--vapor-color-gray-900, #0f172b)",
            }}
          >
            <ChevronLeftOutlineIcon size={20} aria-hidden="true" />
          </Button>
        </HStack>

        <VStack
          $css={{
            flex: 1,
            minHeight: 0,
            alignItems: "stretch",
          }}
        >
          <Box
            $css={{
              flex: 1,
              minHeight: 0,
              overflow: "hidden",
            }}
          >
            <VStack
              $css={{
                alignItems: "stretch",
                paddingInline: "16px",
                paddingTop: isInfoStep ? "24px" : "32px",
                paddingBottom: isInfoStep ? "8px" : "16px",
              }}
            >
              {step === 0 ? (
                <StepHeader
                  title="역할 선택"
                  subtitle="플랫폼에서 어떤 역할로 참여하시겠어요?"
                />
              ) : step === 1 ? (
                <StepHeader
                  title="직업과 경력"
                  subtitle="직업과 경력을 선택해주세요"
                />
              ) : (
                <StepHeader
                  title="정보 입력"
                  subtitle="회원가입을 위한 정보를 입력하세요"
                />
              )}

              {renderStepContent()}
            </VStack>
          </Box>

          <Box $css={{ paddingInline: "16px" }}>
            <Footer
              buttonLabel={step === 2 ? "회원가입 완료" : "다음"}
              disabled={!canProceed}
              onClick={handleNext}
              compact={isInfoStep}
            />
          </Box>
        </VStack>
      </VStack>
    </Box>
  );
}
