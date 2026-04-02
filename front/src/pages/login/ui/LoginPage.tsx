import type { FormEvent } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Field,
  Form,
  HStack,
  Text,
  TextInput,
  VStack,
} from "@vapor-ui/core";
import { ChevronLeftOutlineIcon } from "@vapor-ui/icons";
import { ROUTES } from "@/shared/config/routes";

const FIELD_INPUT_STYLES = {
  height: "48px",
  borderRadius: "8px",
  borderColor: "var(--vapor-color-border-normal, #e1e1e1)",
  backgroundColor: "var(--vapor-color-background-canvas, #ffffff)",
  paddingInline: "24px",
} as const;

export function LoginPage() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const canSubmit = phone.trim().length > 0 && password.trim().length > 0;
  const disabled = !canSubmit;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Box
      render={<main />}
      $css={{
        width: "100%",
        minHeight: "100dvh",
        backgroundColor: "var(--vapor-color-background-surface-200, #f7f7f7)",
      }}
    >
      <VStack
        $css={{
          minHeight: "100dvh",
          alignItems: "stretch",
        }}
      >
        <HStack
          $css={{
            height: "56px",
            alignItems: "center",
          }}
        >
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            $css={{
              height: "40px",
              minHeight: "40px",
              color: "var(--vapor-color-gray-600, #5d5d5d)",
            }}
          >
            <HStack
              $css={{
                gap: "4px",
                alignItems: "center",
              }}
            >
              <ChevronLeftOutlineIcon size={20} aria-hidden="true" />
              <Text typography="heading6" $css={{ color: "inherit" }}>
                뒤로가기
              </Text>
            </HStack>
          </Button>
        </HStack>

        <Form
          noValidate
          onSubmit={handleSubmit}
          $css={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
            paddingInline: "16px",
          }}
        >
          <VStack
            $css={{
              gap: "72px",
              alignItems: "stretch",
              paddingTop: "32px",
            }}
          >
            <VStack
              $css={{
                gap: "4px",
                alignItems: "stretch",
              }}
            >
              <Text
                render={<h1 />}
                typography="heading3"
                $css={{ color: "var(--vapor-color-gray-900, #0f172b)" }}
              >
                로그인
              </Text>
              <Text
                typography="heading6"
                $css={{
                  color: "var(--vapor-color-foreground-hint-100, #45556c)",
                }}
              >
                제주의 전통을 이어갈 여정을 시작하세요
              </Text>
            </VStack>

            <VStack
              $css={{
                gap: "16px",
                alignItems: "stretch",
              }}
            >
              <Field.Root name="phone">
                <VStack
                  $css={{
                    gap: "8px",
                    alignItems: "stretch",
                  }}
                >
                  <Field.Label
                    $css={{
                      color:
                        "var(--vapor-color-foreground-normal-100, #4c4c4c)",
                      fontSize: "12px",
                      lineHeight: "18px",
                      fontWeight: 500,
                    }}
                  >
                    핸드폰 번호
                  </Field.Label>
                  <TextInput
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    placeholder="01012345678"
                    value={phone}
                    onValueChange={(value) =>
                      setPhone(value.replace(/[^0-9]/g, ""))
                    }
                    $css={FIELD_INPUT_STYLES}
                  />
                </VStack>
              </Field.Root>

              <Field.Root name="password">
                <VStack
                  $css={{
                    gap: "8px",
                    alignItems: "stretch",
                  }}
                >
                  <Field.Label
                    $css={{
                      color:
                        "var(--vapor-color-foreground-normal-100, #4c4c4c)",
                      fontSize: "12px",
                      lineHeight: "18px",
                      fontWeight: 500,
                    }}
                  >
                    비밀번호
                  </Field.Label>
                  <TextInput
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onValueChange={(value) => setPassword(value)}
                    $css={FIELD_INPUT_STYLES}
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
                    8~16자, 영문, 특수문자 포함
                  </Field.Description>
                </VStack>
              </Field.Root>
            </VStack>
          </VStack>

          <VStack
            $css={{
              marginTop: "auto",
              gap: "10px",
              alignItems: "stretch",
              paddingBottom: "59px",
            }}
          >
            <Button
              type="submit"
              variant="fill"
              colorPalette="primary"
              disabled={disabled}
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
                letterSpacing: "-0.3px",
                boxShadow: "none",
                border: "none",
                opacity: 1,
                cursor: disabled ? "not-allowed" : "pointer",
              }}
            >
              로그인
            </Button>
            <Button
              variant="outline"
              colorPalette="secondary"
              render={<Link to={ROUTES.register} />}
              $css={{
                width: "100%",
                height: "56px",
                minHeight: "56px",
                borderRadius: "14px",
                boxShadow:
                  "inset 0 0 0 1px var(--vapor-color-gray-700, #4c4c4c)",
                backgroundColor: "var(--vapor-color-gray-000, #ffffff)",
                color: "var(--vapor-color-gray-700, #4c4c4c)",
                fontSize: "16px",
                lineHeight: "24px",
                fontWeight: 600,
                letterSpacing: "-0.3px",
              }}
            >
              회원가입
            </Button>
          </VStack>
        </Form>
      </VStack>
    </Box>
  );
}
