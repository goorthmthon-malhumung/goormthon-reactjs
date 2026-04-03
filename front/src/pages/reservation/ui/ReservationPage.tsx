import backArrowIcon from "@/assets/reservation/back-arrow.svg";
import { useCreateBooking } from "@/api/generated/experience/experience";
import calendarIcon from "@/assets/reservation/calendar.svg";
import infoIcon from "@/assets/reservation/info.svg";
import peopleIcon from "@/assets/reservation/people.svg";
import summaryImage from "@/assets/reservation/summary-image.png";
import { ROUTES } from "@/shared/config/routes";
import { Box, Text, VStack } from "@vapor-ui/core";
import {
  ChevronLeftOutlineIcon,
  ChevronRightOutlineIcon,
  CloseOutlineIcon,
} from "@vapor-ui/icons";
import {
  DayPicker,
  getDefaultClassNames,
  type ChevronProps,
  type DateRange,
} from "react-day-picker";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PAGE_BACKGROUND = "var(--vapor-color-background-surface-200, #f7f7f7)";
const SURFACE_WHITE = "rgba(255, 255, 255, 0.9)";
const BORDER_COLOR = "#E1E1E1";
const PRIMARY_TEXT = "#0F172B";
const TITLE_TEXT = "#393939";
const SECONDARY_TEXT = "#767676";
const DARK_SURFACE = "#262626";
const CTA_ACTIVE_BACKGROUND = "#1CB3CB";
const CTA_DISABLED_BACKGROUND = "#C2E8F0";
const CTA_SUCCESS_BACKGROUND = "#0D8298";
const DATE_PICKER_CONFIRM_BACKGROUND = "#1CB3CB";
const CARD_RADIUS = "16px";
const CTA_RADIUS = "14px";
const CONTENT_WIDTH = "358px";
const BUTTON_HEIGHT = "55.981px";
const DEFAULT_EXPERIENCE_ID = 1;
const SUMMARY_TITLE = "금녕 해녀와 함께하는 전복따기";
const SUMMARY_MENTOR = "김영숙 해녀";
const UNIT_PRICE = 50000;
const TODAY = new Date();
const CURRENT_MONTH_START = new Date(TODAY.getFullYear(), TODAY.getMonth(), 1);
const EVENT_DATES = [8, 14, 19, 30].map((day) =>
  createDateInCurrentMonth(day),
);
const ACCENT_DATE = TODAY;
const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const reservationDatePickerClassNames = {
  ...getDefaultClassNames(),
  root: "rdp reservation-date-picker",
  month: "rdp-month reservation-date-picker__month",
  month_caption: "rdp-month_caption reservation-date-picker__month-caption",
  caption_label: "rdp-caption_label reservation-date-picker__caption-label",
  nav: "rdp-nav reservation-date-picker__nav",
  button_previous:
    "rdp-button_previous reservation-date-picker__nav-button",
  button_next: "rdp-button_next reservation-date-picker__nav-button",
  month_grid: "rdp-month_grid reservation-date-picker__month-grid",
  weekdays: "rdp-weekdays reservation-date-picker__weekdays",
  weekday: "rdp-weekday reservation-date-picker__weekday",
  week: "rdp-week reservation-date-picker__week",
  weeks: "rdp-weeks reservation-date-picker__weeks",
  day: "rdp-day reservation-date-picker__day",
  day_button: "rdp-day_button reservation-date-picker__day-button",
  hidden: "rdp-hidden reservation-date-picker__hidden",
  outside: "rdp-outside reservation-date-picker__outside",
  today: "rdp-today reservation-date-picker__today",
  selected: "rdp-selected reservation-date-picker__selected",
  range_start: "rdp-range_start reservation-date-picker__range-start",
  range_middle: "rdp-range_middle reservation-date-picker__range-middle",
  range_end: "rdp-range_end reservation-date-picker__range-end",
};

function formatCurrency(amount: number) {
  return `${new Intl.NumberFormat("ko-KR").format(amount)}원`;
}

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
}

function formatApiDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function parseDateKey(dateKey?: string) {
  if (!dateKey) {
    return undefined;
  }

  const [year, month, day] = dateKey.split("-").map(Number);

  if (!year || !month || !day) {
    return undefined;
  }

  return new Date(year, month - 1, day);
}

function formatDateRange(range?: DateRange) {
  if (!range?.from) {
    return "기간을 선택해주세요";
  }

  if (!range.to) {
    return `${formatDate(range.from)} ~`;
  }

  return `${formatDate(range.from)} ~ ${formatDate(range.to)}`;
}

function getReservationDurationDays(range?: DateRange) {
  if (!range?.from || !range.to) {
    return 0;
  }

  const startDate = new Date(range.from);
  const endDate = new Date(range.to);

  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  return Math.floor((endDate.getTime() - startDate.getTime()) / 86_400_000) + 1;
}

function cloneDateRange(range?: DateRange): DateRange | undefined {
  if (!range) {
    return undefined;
  }

  return {
    from: range.from ? new Date(range.from) : undefined,
    to: range.to ? new Date(range.to) : undefined,
  };
}

function getMonthStart(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function createDateInCurrentMonth(day: number) {
  const lastDateOfMonth = new Date(
    TODAY.getFullYear(),
    TODAY.getMonth() + 1,
    0,
  ).getDate();

  return new Date(TODAY.getFullYear(), TODAY.getMonth(), Math.min(day, lastDateOfMonth));
}

function formatMonthCaption(date: Date) {
  return `${date.getMonth() + 1}월`;
}

function CalendarChevron({ orientation = "right", disabled }: ChevronProps) {
  const Icon =
    orientation === "left" ? ChevronLeftOutlineIcon : ChevronRightOutlineIcon;

  return (
    <span
      style={{
        color: disabled ? "#C6C6C6" : "#121212",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Icon />
    </span>
  );
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

function SelectButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <Box
      render={
        <button type="button" aria-label="날짜 선택" onClick={onClick} />
      }
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
  const location = useLocation();
  const routeState = (location.state as
    | {
        experienceId?: number;
        summaryTitle?: string;
        summaryMentor?: string;
        summaryImageSrc?: string;
        unitPrice?: number;
        availableFromDate?: string;
        availableToDate?: string;
      }
    | null) ?? null;
  const [participantCount, setParticipantCount] = useState(1);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();
  const [draftRange, setDraftRange] = useState<DateRange | undefined>();
  const [displayMonth, setDisplayMonth] = useState(CURRENT_MONTH_START);
  const bookingMutation = useCreateBooking();
  const availableFromDate = parseDateKey(routeState?.availableFromDate);
  const availableToDate = parseDateKey(routeState?.availableToDate);
  const unitPrice = routeState?.unitPrice ?? UNIT_PRICE;
  const reservationDays = getReservationDurationDays(selectedRange);
  const totalPrice = unitPrice * participantCount * reservationDays;
  const priceBreakdownLabel =
    reservationDays > 0
      ? `${formatCurrency(unitPrice)} x ${participantCount}명 x ${reservationDays}일`
      : `${formatCurrency(unitPrice)} x ${participantCount}명 x 기간`;
  const hasCompleteDraftRange = Boolean(draftRange?.from && draftRange.to);
  const canSubmitBooking = Boolean(selectedRange?.from && selectedRange.to);
  const isBookingDisabled =
    !canSubmitBooking || bookingMutation.isPending || bookingMutation.isSuccess;
  const bookingStatusMessage = bookingMutation.isError
    ? bookingMutation.error.message
    : bookingMutation.isSuccess
      ? "체험 예약 요청이 완료되었습니다."
      : null;
  const bookingButtonBackground = bookingMutation.isSuccess
    ? CTA_SUCCESS_BACKGROUND
    : isBookingDisabled
      ? CTA_DISABLED_BACKGROUND
      : CTA_ACTIVE_BACKGROUND;

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate(ROUTES.matching);
  };

  const handleOpenDatePicker = () => {
    const initialRange = cloneDateRange(selectedRange);

    setDraftRange(initialRange);
    setDisplayMonth(
      getMonthStart(
        initialRange?.from ?? availableFromDate ?? CURRENT_MONTH_START,
      ),
    );
    setIsDatePickerOpen(true);
  };

  const handleCloseDatePicker = () => {
    setDraftRange(cloneDateRange(selectedRange));
    setIsDatePickerOpen(false);
  };

  const handleConfirmDatePicker = () => {
    if (!hasCompleteDraftRange) {
      return;
    }

    setSelectedRange(cloneDateRange(draftRange));
    setIsDatePickerOpen(false);
  };

  const handleCreateBooking = () => {
    if (!selectedRange?.from || !selectedRange.to) {
      return;
    }

    bookingMutation.mutate({
      data: {
        experienceId: routeState?.experienceId ?? DEFAULT_EXPERIENCE_ID,
        startDate: formatApiDate(selectedRange.from),
        endDate: formatApiDate(selectedRange.to),
      },
    });
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
        {/* <Box
          $css={{
            width: "100%",
            height: "48px",
            backgroundColor: "#FFFFFF",
            opacity: 0.9,
          }}
        /> */}

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
          overflowY: isDatePickerOpen ? "hidden" : "auto",
        }}
      >
        <VStack
          $css={{
            width: "100%",
            maxWidth: CONTENT_WIDTH,
            marginInline: "auto",
            gap: "30px",
            // paddingTop: "131px",
            paddingTop: "calc(48px + 56px + env(safe-area-inset-top))",
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
                    src={routeState?.summaryImageSrc ?? summaryImage}
                    alt={`${routeState?.summaryTitle ?? SUMMARY_TITLE} 대표 이미지`}
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
                  {routeState?.summaryTitle ?? SUMMARY_TITLE}
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
                  {routeState?.summaryMentor ?? SUMMARY_MENTOR}
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
              <Box
                $css={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                {selectedRange?.from && selectedRange.to ? (
                  <Text
                    render={<p />}
                    $css={{
                      color: SECONDARY_TEXT,
                      fontFamily:
                        '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif',
                      fontSize: "13px",
                      lineHeight: "20px",
                      fontWeight: 500,
                      letterSpacing: "-0.1px",
                      whiteSpace: "nowrap",
                    }}
                    >
                      {formatDateRange(selectedRange)}
                    </Text>
                  ) : null}

                <SelectButton onClick={handleOpenDatePicker} />
              </Box>
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

              <VStack
                $css={{
                  gap: "2px",
                  alignItems: "flex-end",
                }}
              >
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
                <Text
                  render={<p />}
                  $css={{
                    color: "rgba(255, 255, 255, 0.72)",
                    fontFamily:
                      '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif',
                    fontSize: "12px",
                    lineHeight: "18px",
                    fontWeight: 500,
                    letterSpacing: "-0.1px",
                  }}
                >
                  {priceBreakdownLabel}
                </Text>
              </VStack>
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
        {bookingStatusMessage ? (
          <Text
            render={<p />}
            $css={{
              color: bookingMutation.isError ? "#DC2626" : "#0D8298",
              fontFamily:
                '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif',
              fontSize: "14px",
              lineHeight: "22px",
              fontWeight: 500,
              letterSpacing: "-0.1px",
              marginBottom: "8px",
            }}
          >
            {bookingStatusMessage}
          </Text>
        ) : null}
        <Box
          render={
            <button
              type="button"
              aria-label="다음"
              onClick={handleCreateBooking}
              disabled={isBookingDisabled}
            />
          }
          $css={{
            width: "100%",
            height: BUTTON_HEIGHT,
            border: "none",
            borderRadius: CTA_RADIUS,
            backgroundColor: bookingButtonBackground,
            color: "#FFFFFF",
            cursor: isBookingDisabled ? "not-allowed" : "pointer",
            opacity: 1,
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
            {bookingMutation.isPending
              ? "예약 중..."
              : bookingMutation.isSuccess
                ? "예약 완료"
                : "다음"}
          </Text>
        </Box>
      </Box>

      {isDatePickerOpen ? (
        <Box
          $css={{
            position: "absolute",
            inset: "0",
            zIndex: 10,
          }}
        >
          <Box
            render={
              <button
                type="button"
                aria-label="날짜 선택 닫기"
                onClick={handleCloseDatePicker}
              />
            }
            $css={{
              position: "absolute",
              inset: "0",
              border: "none",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              cursor: "pointer",
            }}
          />

          <Box
            role="dialog"
            aria-modal="true"
            aria-labelledby="reservation-date-picker-title"
            $css={{
              position: "absolute",
              top: "76px",
              left: "0",
              right: "0",
              bottom: "0",
              backgroundColor: "#FFFFFF",
              borderTopLeftRadius: "24px",
              borderTopRightRadius: "24px",
              overflow: "hidden",
            }}
          >
            <Box
              $css={{
                position: "relative",
                width: "100%",
                height: "100%",
              }}
            >
              <Box
                render={
                  <button
                    type="button"
                    onClick={handleCloseDatePicker}
                    aria-label="닫기"
                  />
                }
                $css={{
                  position: "absolute",
                  top: "22px",
                  right: "20px",
                  width: "24px",
                  height: "24px",
                  border: "none",
                  backgroundColor: "transparent",
                  color: "#121212",
                  display: "grid",
                  placeItems: "center",
                  cursor: "pointer",
                  zIndex: 1,
                }}
              >
                <CloseOutlineIcon />
              </Box>

              <VStack
                $css={{
                  width: "100%",
                  maxWidth: "351px",
                  marginInline: "auto",
                  paddingTop: "90px",
                  paddingBottom: "calc(120px + env(safe-area-inset-bottom))",
                  gap: "32px",
                }}
              >
                <Text
                  id="reservation-date-picker-title"
                  render={<h2 />}
                  $css={{
                    color: TITLE_TEXT,
                    fontFamily:
                      '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif',
                    fontSize: "24px",
                    lineHeight: "36px",
                    fontWeight: 700,
                    letterSpacing: "-0.3px",
                  }}
                >
                  날짜를 선택해주세요.
                </Text>

                <Box $css={{ width: "100%" }}>
                  <DayPicker
                    mode="range"
                    month={displayMonth}
                    onMonthChange={setDisplayMonth}
                    selected={draftRange}
                    onSelect={setDraftRange}
                    disabled={[
                      ...(availableFromDate ? [{ before: availableFromDate }] : []),
                      ...(availableToDate ? [{ after: availableToDate }] : []),
                    ]}
                    classNames={reservationDatePickerClassNames}
                    components={{
                      Chevron: CalendarChevron,
                    }}
                    modifiers={{
                      eventDay: EVENT_DATES,
                      accentDay: ACCENT_DATE,
                      holiday: { dayOfWeek: [0, 6] },
                    }}
                    modifiersClassNames={{
                      eventDay: "reservation-date-picker__day--event",
                      accentDay: "reservation-date-picker__day--accent",
                      holiday: "reservation-date-picker__day--holiday",
                    }}
                    formatters={{
                      formatCaption: formatMonthCaption,
                      formatWeekdayName: (date) =>
                        WEEKDAY_LABELS[date.getDay()] ?? "",
                    }}
                    showOutsideDays={false}
                    fixedWeeks={false}
                  />
                </Box>
              </VStack>

              <Box
                $css={{
                  position: "absolute",
                  left: "0",
                  right: "0",
                  bottom: "0",
                  backgroundColor: "#FFFFFF",
                  borderTop: "0.735px solid #E2E8F0",
                  paddingTop: "16.73px",
                  paddingInline: "16px",
                  paddingBottom: "max(16px, env(safe-area-inset-bottom))",
                }}
              >
                <Box
                  $css={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "16px",
                    minHeight: "55.981px",
                  }}
                >
                  <VStack
                    $css={{
                      gap: "4px",
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    <Text
                      render={<p />}
                      $css={{
                        color: "#45556C",
                        fontFamily:
                          '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif',
                        fontSize: "14px",
                        lineHeight: "22px",
                        fontWeight: 500,
                        letterSpacing: "-0.1px",
                      }}
                    >
                      기간
                    </Text>
                    <Text
                      render={<p />}
                      $css={{
                        color: PRIMARY_TEXT,
                        fontFamily:
                          '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif',
                        fontSize: "16px",
                        lineHeight: "24px",
                        fontWeight: 500,
                        letterSpacing: "-0.1px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {formatDateRange(draftRange)}
                    </Text>
                  </VStack>

                  <Box
                    render={
                      <button
                        type="button"
                        onClick={handleConfirmDatePicker}
                        disabled={!hasCompleteDraftRange}
                        aria-label="선택 완료"
                      />
                    }
                    $css={{
                      width: "119.328px",
                      height: BUTTON_HEIGHT,
                      border: "none",
                      borderRadius: CTA_RADIUS,
                      backgroundColor: DATE_PICKER_CONFIRM_BACKGROUND,
                      color: "#FFFFFF",
                      display: "grid",
                      placeItems: "center",
                      cursor: hasCompleteDraftRange ? "pointer" : "not-allowed",
                      opacity: hasCompleteDraftRange ? 1 : 0.5,
                      flexShrink: 0,
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
                      선택 완료
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : null}
    </Box>
  );
}
