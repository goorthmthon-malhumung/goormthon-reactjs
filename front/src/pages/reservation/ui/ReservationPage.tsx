import { Box, Text, VStack } from "@vapor-ui/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import backArrowIcon from "@/assets/reservation/back-arrow.svg";
import calendarIcon from "@/assets/reservation/calendar.svg";
import infoIcon from "@/assets/reservation/info.svg";
import peopleIcon from "@/assets/reservation/people.svg";
import summaryImage from "@/assets/reservation/summary-image.png";
import { ROUTES } from "@/shared/config/routes";

const PAGE_BACKGROUND = "var(--vapor-color-background-surface-200, #f7f7f7)";
const SURFACE_WHITE = "rgba(255, 255, 255, 0.9)";
const BORDER_COLOR = "#E1E1E1";
const PRIMARY_TEXT = "#0F172B";
const TITLE_TEXT = "#393939";
const SECONDARY_TEXT = "#767676";
const DARK_SURFACE = "#262626";
const CTA_BACKGROUND = "#C2E8F0";
const CARD_RADIUS = "16px";
const CTA_RADIUS = "14px";
const CONTENT_WIDTH = "358px";
const BUTTON_HEIGHT = "55.981px";
const SUMMARY_TITLE = "금녕 해녀와 함께하는 전복따기";
const SUMMARY_MENTOR = "김영숙 해녀";
const UNIT_PRICE = 50000;

function formatCurrency(amount: number) {
  return `${new Intl.NumberFormat("ko-KR").format(amount)}원`;
}

function SectionTitle({
  iconSrc,
  title,
}: {
  iconSrc: string;
  title: string;
}) {
  return (
    <Box
      $css={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <Box
        render={<img src={iconSrc} alt="" aria-hidden="true" />}
        $css={{
          width: "20px",
          height: "20px",
          display: "block",
          flexShrink: 0,
        }}
      />
      <Text
        render={<h2 />}
        $css={{
          color: TITLE_TEXT,
          fontFamily:
            '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif',
          fontSize: "18px",
          lineHeight: "26px",
          fontWeight: 700,
          letterSpacing: "-0.1px",
        }}
      >
        {title}
      </Text>
    </Box>
  );
}

function CounterButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <Box
      render={<button type="button" onClick={onClick} aria-label={label} />}
      $css={{
        width: "39.998px",
        height: "39.998px",
        border: "none",
        borderRadius: "999px",
        backgroundColor: "#F7F7F7",
        color: "#262626",
        display: "grid",
        placeItems: "center",
        cursor: "pointer",
        flexShrink: 0,
      }}
    >
      <Text
        $css={{
          color: "inherit",
          fontFamily: '"Inter", sans-serif',
          fontSize: "16px",
          lineHeight: "24px",
          fontWeight: 500,
          letterSpacing: "-0.3125px",
        }}
      >
        {label}
      </Text>
    </Box>
  );
}

function SelectButton() {
  return (
    <Box
      render={<button type="button" aria-label="날짜 선택" />}
      $css={{
        minWidth: "52px",
        height: "32px",
        paddingInline: "12px",
        borderRadius: "8px",
        border: "1px solid #C6C6C6",
        backgroundColor: "#FFFFFF",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        color: "#5D5D5D",
      }}
    >
      <Text
        $css={{
          color: "inherit",
          fontFamily:
            '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif',
          fontSize: "14px",
          lineHeight: "22px",
          fontWeight: 500,
          letterSpacing: "-0.1px",
        }}
      >
        선택
      </Text>
    </Box>
  );
}

export function ReservationPage() {
  const navigate = useNavigate();
  const [participantCount, setParticipantCount] = useState(1);
  const totalPrice = UNIT_PRICE * participantCount;

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate(ROUTES.matching);
  };

  return (
    <Box
      $css={{
        position: "relative",
        width: "100%",
        // height: "100%",
        // minHeight: "100%",
        height: "100dvh",
        minHeight: "100dvh",
        backgroundColor: PAGE_BACKGROUND,
        overflow: "hidden",
      }}
    >
      <Box
        $css={{
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          zIndex: 2,
        }}
      >
        <Box
          $css={{
            width: "100%",
            height: "48px",
            backgroundColor: "#FFFFFF",
            opacity: 0.9,
          }}
        />

        <Box
          $css={{
            width: "100%",
            height: "56px",
            paddingInline: "16px",
            paddingBlock: "8px",
            backgroundColor: "#FFFFFF",
          }}
        >
          <Box
            $css={{
              display: "grid",
              gridTemplateColumns: "40px 1fr 40px",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <Box
              render={
                <button type="button" onClick={handleBack} aria-label="뒤로가기" />
              }
              $css={{
                width: "39.998px",
                height: "39.998px",
                border: "none",
                borderRadius: "999px",
                backgroundColor: SURFACE_WHITE,
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
              }}
            >
              <Box
                render={<img src={backArrowIcon} alt="" aria-hidden="true" />}
                $css={{
                  width: "19.993px",
                  height: "19.993px",
                  display: "block",
                }}
              />
            </Box>

            <Text
              render={<h1 />}
              $css={{
                justifySelf: "center",
                color: PRIMARY_TEXT,
                fontFamily:
                  '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif',
                fontSize: "20px",
                lineHeight: "30px",
                fontWeight: 700,
                letterSpacing: "-0.2px",
              }}
            >
              예약하기
            </Text>

            <Box $css={{ width: "40px", height: "40px" }} />
          </Box>
        </Box>
      </Box>

      <Box
        $css={{
          width: "100%",
          // height: "100%",
          height: "100dvh",
          overflowY: "auto",
        }}
      >
        <VStack
          $css={{
            width: "100%",
            maxWidth: CONTENT_WIDTH,
            marginInline: "auto",
            gap: "30px",
            paddingTop: "131px",
            paddingBottom: "calc(116px + env(safe-area-inset-bottom))",
          }}
        >
          <VStack
            $css={{
              width: "100%",
              gap: "12px",
            }}
          >
            <Box
              $css={{
                display: "flex",
                alignItems: "center",
                gap: "15.995px",
                width: "100%",
              }}
            >
              <Box
                render={
                  <img
                    src={summaryImage}
                    alt="금녕 해녀와 함께하는 전복따기 대표 이미지"
                  />
                }
                $css={{
                  width: "90px",
                  height: "90px",
                  borderRadius: CTA_RADIUS,
                  objectFit: "cover",
                  display: "block",
                  flexShrink: 0,
                  backgroundColor: "#E2E8F0",
                }}
              />

              <VStack
                $css={{
                  flex: 1,
                  minWidth: 0,
                  gap: "0",
                }}
              >
                <Text
                  render={<h2 />}
                  $css={{
                    color: TITLE_TEXT,
                    fontFamily:
                      '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif',
                    fontSize: "18px",
                    lineHeight: "26px",
                    fontWeight: 700,
                    letterSpacing: "-0.1px",
                  }}
                >
                  {SUMMARY_TITLE}
                </Text>
                <Text
                  render={<p />}
                  $css={{
                    color: SECONDARY_TEXT,
                    fontFamily:
                      '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif',
                    fontSize: "14px",
                    lineHeight: "22px",
                    fontWeight: 500,
                    letterSpacing: "-0.1px",
                  }}
                >
                  {SUMMARY_MENTOR}
                </Text>
              </VStack>
            </Box>

            <Box
              $css={{
                width: "100%",
                borderRadius: CARD_RADIUS,
                border: `1px solid ${BORDER_COLOR}`,
                backgroundColor: "#FFFFFF",
                padding: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
              }}
            >
              <SectionTitle iconSrc={calendarIcon} title="날짜" />
              <SelectButton />
            </Box>

            <Box
              $css={{
                width: "100%",
                minHeight: "131.979px",
                borderRadius: CARD_RADIUS,
                border: `1px solid ${BORDER_COLOR}`,
                backgroundColor: "#FFFFFF",
                padding: "23.992px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <SectionTitle iconSrc={peopleIcon} title="참가 인원" />

              <Box
                $css={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                }}
              >
                <Text
                  render={<p />}
                  $css={{
                    color: TITLE_TEXT,
                    fontFamily:
                      '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif',
                    fontSize: "16px",
                    lineHeight: "24px",
                    fontWeight: 500,
                    letterSpacing: "-0.1px",
                  }}
                >
                  인원 수
                </Text>

                <Box
                  $css={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15.995px",
                  }}
                >
                  <CounterButton
                    label="-"
                    onClick={() =>
                      setParticipantCount((current) => Math.max(1, current - 1))
                    }
                  />

                  <Text
                    render={<p />}
                    $css={{
                      minWidth: "32px",
                      textAlign: "center",
                      color: "#262626",
                      fontFamily: '"Inter", sans-serif',
                      fontSize: "20px",
                      lineHeight: "28px",
                      fontWeight: 700,
                      letterSpacing: "-0.4492px",
                    }}
                  >
                    {participantCount}
                  </Text>

                  <CounterButton
                    label="+"
                    onClick={() => setParticipantCount((current) => current + 1)}
                  />
                </Box>
              </Box>
            </Box>

            <Box
              $css={{
                width: "100%",
                borderRadius: CARD_RADIUS,
                backgroundColor: DARK_SURFACE,
                boxShadow:
                  "0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px 0px rgba(0, 0, 0, 0.1)",
                padding: "12px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                minHeight: "68px",
              }}
            >
              <Text
                render={<p />}
                $css={{
                  color: "#FFFFFF",
                  fontFamily:
                    '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif',
                  fontSize: "18px",
                  lineHeight: "26px",
                  fontWeight: 700,
                  letterSpacing: "-0.1px",
                }}
              >
                총 결제 금액
              </Text>

              <Text
                render={<p />}
                $css={{
                  color: "#FFFFFF",
                  fontFamily:
                    '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif',
                  fontSize: "24px",
                  lineHeight: "36px",
                  fontWeight: 700,
                  letterSpacing: "-0.3px",
                }}
              >
                {formatCurrency(totalPrice)}
              </Text>
            </Box>
          </VStack>

          <Box
            $css={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <Box
              render={<img src={infoIcon} alt="" aria-hidden="true" />}
              $css={{
                width: "19.993px",
                height: "19.993px",
                display: "block",
                flexShrink: 0,
              }}
            />
            <Text
              render={<p />}
              $css={{
                color: SECONDARY_TEXT,
                fontFamily:
                  '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif',
                fontSize: "14px",
                lineHeight: "22px",
                fontWeight: 500,
                letterSpacing: "-0.1px",
              }}
            >
              예약 후 24시간 이내에 취소하면 요금 전액 환불됩니다.
            </Text>
          </Box>
        </VStack>
      </Box>

      <Box
        $css={{
          position: "absolute",
          left: "16px",
          right: "16px",
          bottom: "20px",
          zIndex: 3,
        }}
      >
        <Box
          render={<button type="button" aria-label="다음" />}
          $css={{
            width: "100%",
            height: BUTTON_HEIGHT,
            border: "none",
            borderRadius: CTA_RADIUS,
            backgroundColor: CTA_BACKGROUND,
            color: "#FFFFFF",
            cursor: "pointer",
            display: "grid",
            placeItems: "center",
          }}
        >
          <Text
            $css={{
              color: "inherit",
              fontFamily:
                '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif',
              fontSize: "16px",
              lineHeight: "24px",
              fontWeight: 600,
              letterSpacing: "-0.3125px",
            }}
          >
            다음
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
