import haenyeoMentorIcon from "@/shared/assets/haenyeoMentorIcon.svg";
import checkIcon from "@/shared/assets/checkIcon.svg";
import { ROUTES } from "@/shared/config/routes";
import { Box, Checkbox, HStack, Text, TextInput, VStack } from "@vapor-ui/core";
import {
  ChevronLeftOutlineIcon,
  ChevronRightOutlineIcon,
  CloseOutlineIcon,
} from "@vapor-ui/icons";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import {
  DayPicker,
  getDefaultClassNames,
  type ChevronProps,
  type DateRange,
} from "react-day-picker";
import { useNavigate, useSearchParams } from "react-router-dom";

const TOTAL_STEPS = 6;
const COMPLETE_STEP = TOTAL_STEPS + 1;

const STEP_TITLES: Record<number, string> = {
  1: "김영숙 해녀님,\n어떤 체험을 공유하실건가요?",
  2: "날짜를 선택해주세요",
  3: "시간을 선택해주세요",
  4: "장소를 입력해주세요",
  5: "참가비를 설정해주세요",
  6: "사진을 첨부해주세요",
};

const STEP_DESCRIPTIONS: Partial<Record<number, string>> = {
  6: "참가자분들이 참고할 수 있는 체험 사진이 있다면 올려주세요",
};

const ICON_SIZE = 90;
const BAR_HEIGHT = 4;
const ICON_OFFSET = 30;

const reservationDatePickerClassNames = {
  ...getDefaultClassNames(),
  root: "rdp reservation-date-picker",
  month: "rdp-month reservation-date-picker__month",
  month_caption: "rdp-month_caption reservation-date-picker__month-caption",
  caption_label: "rdp-caption_label reservation-date-picker__caption-label",
  nav: "rdp-nav reservation-date-picker__nav",
  button_previous: "rdp-button_previous reservation-date-picker__nav-button",
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

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

function formatDateRange(range?: DateRange) {
  if (!range?.from) return "기간을 선택해주세요";
  if (!range.to) return `${formatDate(range.from)} ~`;
  return `${formatDate(range.from)} ~ ${formatDate(range.to)}`;
}

function cloneDateRange(range?: DateRange): DateRange | undefined {
  if (!range) return undefined;
  return {
    from: range.from ? new Date(range.from) : undefined,
    to: range.to ? new Date(range.to) : undefined,
  };
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

const INCLUSION_OPTIONS = [
  "해녀복 대여",
  "안전 장비",
  "해설사 식사",
  "사진 촬영 서비스",
];

const WHEEL_FOCUS_HEIGHT_PX = 76;
const WHEEL_ITEM_HEIGHT_PX = WHEEL_FOCUS_HEIGHT_PX;
const WHEEL_VISIBLE_ITEMS = 3;
const WHEEL_VIEWPORT_HEIGHT_PX = WHEEL_ITEM_HEIGHT_PX * WHEEL_VISIBLE_ITEMS;
const WHEEL_SIDE_PADDING_PX = WHEEL_ITEM_HEIGHT_PX;
const WHEEL_WIDTH_PX = 322;
const WHEEL_INNER_SIDE_PADDING_PX = 40;
const WHEEL_MERIDIEM_WIDTH_PX = 42;
const WHEEL_HOUR_WIDTH_PX = 48;
const WHEEL_MINUTE_WIDTH_PX = 52;
const WHEEL_COLUMN_GAP_PX = 50;

type TimeSelection = {
  meridiem: "오전" | "오후";
  hour: number;
  minute: number;
};

type MediaKind = "image" | "video";

type MediaPreviewItem = {
  id: string;
  file: File;
  kind: MediaKind;
  previewUrl: string;
};

function StepHeader({
  step,
  title,
  description,
}: {
  step: number;
  title: string;
  description?: string;
}) {
  return (
    <VStack
      $css={{
        alignItems: "flex-start",
        gap: "8px",
      }}
    >
      <Text
        $css={{
          color: "var(--vapor-color-orange-300)",
          fontFamily: "var(--vapor-typography-fontFamily-sans)",
          fontSize: "var(--vapor-typography-fontSize-200)",
          fontStyle: "normal",
          fontWeight: 700,
          lineHeight: "var(--vapor-typography-lineHeight-200)",
          letterSpacing: "var(--vapor-typography-letterSpacing-100)",
        }}
      >
        Step {step}.
      </Text>
      <Text
        render={<h2 />}
        $css={{
          color: "var(--vapor-color-gray-800, #393939)",
          fontFamily: "var(--vapor-typography-fontFamily-sans)",
          fontSize: "var(--vapor-typography-fontSize-200)",
          fontStyle: "normal",
          fontWeight: 700,
          lineHeight: "var(--vapor-typography-lineHeight-200)",
          letterSpacing: "var(--vapor-typography-letterSpacing-100)",
          whiteSpace: "pre-line",
        }}
      >
        {title}
      </Text>
      {description ? (
        <Text
          $css={{
            color: "var(--vapor-color-gray-300, #a3a3a3)",
            fontFamily: "var(--vapor-typography-fontFamily-sans)",
            fontSize: "var(--vapor-typography-fontSize-075)",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "var(--vapor-typography-lineHeight-075)",
            letterSpacing: "var(--vapor-typography-letterSpacing-100)",
          }}
        >
          {description}
        </Text>
      ) : null}
    </VStack>
  );
}

function TimeWheelColumn({
  items,
  columnWidthPx,
  selectedIndex,
  onChange,
}: {
  items: readonly string[];
  columnWidthPx: number;
  selectedIndex: number;
  onChange: (nextIndex: number) => void;
}) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const releaseTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const top = selectedIndex * WHEEL_ITEM_HEIGHT_PX;
    if (Math.abs(viewport.scrollTop - top) < 1) return;
    viewport.scrollTo({ top, behavior: "smooth" });
  }, [selectedIndex]);

  useEffect(() => {
    return () => {
      if (releaseTimerRef.current) {
        window.clearTimeout(releaseTimerRef.current);
      }
    };
  }, []);

  const settleSelection = () => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const nextIndex = Math.max(
      0,
      Math.min(
        items.length - 1,
        Math.round(viewport.scrollTop / WHEEL_ITEM_HEIGHT_PX),
      ),
    );
    onChange(nextIndex);
  };

  const handleScroll = () => {
    if (releaseTimerRef.current) {
      window.clearTimeout(releaseTimerRef.current);
    }
    releaseTimerRef.current = window.setTimeout(settleSelection, 90);
  };

  return (
    <Box
      ref={viewportRef}
      onScroll={handleScroll}
      $css={{
        width: `${columnWidthPx}px`,
        flex: "0 0 auto",
        height: `${WHEEL_VIEWPORT_HEIGHT_PX}px`,
        overflowY: "auto",
        scrollSnapType: "y mandatory",
      }}
    >
      <Box
        $css={{
          paddingBlock: `${WHEEL_SIDE_PADDING_PX}px`,
        }}
      >
        {items.map((item, index) => {
          const isSelected = index === selectedIndex;
          return (
            <Box
              key={`${item}-${index}`}
              $css={{
                height: `${WHEEL_ITEM_HEIGHT_PX}px`,
                scrollSnapAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                $css={{
                  color: isSelected
                    ? "var(--vapor-color-gray-800, #393939)"
                    : "var(--vapor-color-gray-400, #959595)",
                  fontFamily: "var(--vapor-typography-fontFamily-sans)",
                  fontSize: "var(--vapor-typography-fontSize-400)",
                  fontWeight: 700,
                  lineHeight: "var(--vapor-typography-lineHeight-400)",
                  letterSpacing: "var(--vapor-typography-letterSpacing-300)",
                  transition: "color 0.12s ease",
                  whiteSpace: "nowrap",
                }}
              >
                {item}
              </Text>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

type Step3ContentProps = {
  selectedTime: TimeSelection;
  onChangeTime: (next: TimeSelection) => void;
};

function Step3Content({ selectedTime, onChangeTime }: Step3ContentProps) {
  const meridiemItems = ["오전", "오후"] as const;
  const hourItems = Array.from(
    { length: 24 },
    (_, i) => `${String(i).padStart(2, "0")}시`,
  );
  const minuteItems = Array.from(
    { length: 6 },
    (_, i) => `${String(i * 10).padStart(2, "0")}분`,
  );

  const meridiemIndex = meridiemItems.indexOf(selectedTime.meridiem);
  const hourIndex = selectedTime.hour;
  const minuteIndex = Math.floor(selectedTime.minute / 10);

  return (
    <Box
      $css={{
        flex: 1,
        paddingInline: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "32px",
      }}
    >
      <StepHeader step={3} title={STEP_TITLES[3]} />

      <Box
        $css={{
          position: "relative",
          width: "100%",
          maxWidth: `${WHEEL_WIDTH_PX}px`,
          marginInline: "auto",
          marginTop: "8px",
        }}
      >
        <Box
          $css={{
            position: "absolute",
            left: "0",
            right: "0",
            top: `${WHEEL_SIDE_PADDING_PX}px`,
            height: `${WHEEL_FOCUS_HEIGHT_PX}px`,
            border: "3px solid var(--vapor-color-cyan-300, #1cb3cb)",
            borderRadius: "16px",
            pointerEvents: "none",
            boxSizing: "border-box",
            zIndex: 1,
          }}
        />

        <HStack
          $css={{
            width: "100%",
            paddingInline: `${WHEEL_INNER_SIDE_PADDING_PX}px`,
            boxSizing: "border-box",
            gap: `${WHEEL_COLUMN_GAP_PX}px`,
            alignItems: "stretch",
            justifyContent: "flex-start",
          }}
        >
          <TimeWheelColumn
            items={meridiemItems}
            columnWidthPx={WHEEL_MERIDIEM_WIDTH_PX}
            selectedIndex={Math.max(0, meridiemIndex)}
            onChange={(nextIndex) =>
              onChangeTime({
                ...selectedTime,
                meridiem: meridiemItems[nextIndex] ?? "오전",
              })
            }
          />
          <TimeWheelColumn
            items={hourItems}
            columnWidthPx={WHEEL_HOUR_WIDTH_PX}
            selectedIndex={Math.max(0, Math.min(23, hourIndex))}
            onChange={(nextIndex) =>
              onChangeTime({
                ...selectedTime,
                hour: nextIndex,
              })
            }
          />
          <TimeWheelColumn
            items={minuteItems}
            columnWidthPx={WHEEL_MINUTE_WIDTH_PX}
            selectedIndex={Math.max(
              0,
              Math.min(minuteItems.length - 1, minuteIndex),
            )}
            onChange={(nextIndex) =>
              onChangeTime({
                ...selectedTime,
                minute: nextIndex * 10,
              })
            }
          />
        </HStack>
      </Box>
    </Box>
  );
}

type Step4ContentProps = {
  locationValue: string;
  onChangeLocation: (value: string) => void;
};

function Step4Content({ locationValue, onChangeLocation }: Step4ContentProps) {
  return (
    <Box
      $css={{
        flex: 1,
        paddingInline: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "32px",
      }}
    >
      <StepHeader step={4} title={STEP_TITLES[4]} />

      <Box
        $css={{
          width: "100%",
          maxWidth: "358px",
          marginInline: "auto",
          marginTop: "8px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px",
          borderBottom: "1px solid var(--vapor-color-gray-200, #c6c6c6)",
          position: "relative",
          boxSizing: "border-box",
        }}
      >
        <TextInput
          value={locationValue}
          onValueChange={onChangeLocation}
          placeholder=""
          $css={{
            flex: 1,
            minWidth: 0,
            height: "40px",
            border: "none",
            boxShadow: "none",
            borderRadius: "0",
            backgroundColor: "transparent",
            padding: "0 0 0 2px",
            color: "var(--vapor-color-gray-900, #262626)",
            textAlign: "left",
            fontFamily: "var(--vapor-typography-fontFamily-sans)",
            fontSize: "var(--vapor-typography-fontSize-100)",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "var(--vapor-typography-lineHeight-100)",
            letterSpacing: "var(--vapor-typography-letterSpacing-100)",
          }}
        />
        {locationValue.trim().length === 0 ? (
          <Text
            $css={{
              position: "absolute",
              left: "12px",
              right: "10px",
              top: "10px",
              bottom: "10px",
              pointerEvents: "none",
              display: "flex",
              alignItems: "center",
              color: "var(--vapor-color-gray-200, #c6c6c6)",
              textAlign: "left",
              fontFamily: "var(--vapor-typography-fontFamily-sans)",
              fontSize: "var(--vapor-typography-fontSize-100)",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "var(--vapor-typography-lineHeight-100)",
              letterSpacing: "var(--vapor-typography-letterSpacing-100)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            예) 제주시 구좌읍 하도리 123, 해녀탈의장 옆
          </Text>
        ) : null}
      </Box>
    </Box>
  );
}

type Step5ContentProps = {
  feeValue: string;
  onChangeFee: (value: string) => void;
};

function Step5Content({ feeValue, onChangeFee }: Step5ContentProps) {
  return (
    <Box
      $css={{
        flex: 1,
        paddingInline: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "32px",
      }}
    >
      <StepHeader step={5} title={STEP_TITLES[5]} />

      <Box
        $css={{
          width: "100%",
          maxWidth: "358px",
          marginInline: "auto",
          marginTop: "8px",
          height: "60px",
          borderBottom: "1px solid var(--vapor-color-gray-200, #c6c6c6)",
          display: "flex",
          alignItems: "center",
          padding: "10px",
          boxSizing: "border-box",
          gap: "10px",
        }}
      >
        <TextInput
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={feeValue}
          onValueChange={(value) => onChangeFee(value.replace(/[^0-9]/g, ""))}
          $css={{
            flex: 1,
            minWidth: 0,
            height: "40px",
            border: "none",
            boxShadow: "none",
            borderRadius: "0",
            backgroundColor: "transparent",
            padding: "0 0 0 2px",
            textAlign: "right",
            color: "var(--vapor-color-gray-900, #262626)",
            fontFamily: "var(--vapor-typography-fontFamily-sans)",
            fontSize: "var(--vapor-typography-fontSize-300)",
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "var(--vapor-typography-lineHeight-300)",
            letterSpacing: "var(--vapor-typography-letterSpacing-200)",
          }}
        />
        <Box
          $css={{
            width: "39px",
            padding: "10px",
            boxSizing: "border-box",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <Text
            $css={{
              color: "var(--vapor-color-gray-900, #262626)",
              textAlign: "center",
              fontFamily: "var(--vapor-typography-fontFamily-sans)",
              fontSize: "var(--vapor-typography-fontSize-300)",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "var(--vapor-typography-lineHeight-300)",
              letterSpacing: "var(--vapor-typography-letterSpacing-200)",
              whiteSpace: "nowrap",
            }}
          >
            원
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

type Step6ContentProps = {
  mediaItems: readonly MediaPreviewItem[];
  onOpenPicker: () => void;
  onRemoveItem: (id: string) => void;
};

function Step6Content({
  mediaItems,
  onOpenPicker,
  onRemoveItem,
}: Step6ContentProps) {
  return (
    <Box
      $css={{
        flex: 1,
        paddingInline: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "32px",
      }}
    >
      <StepHeader
        step={6}
        title={STEP_TITLES[6]}
        description={STEP_DESCRIPTIONS[6]}
      />

      <Box
        render={<button type="button" onClick={onOpenPicker} />}
        $css={{
          width: "119.328px",
          height: "55.981px",
          marginTop: "8px",
          borderRadius: "14px",
          border: "none",
          backgroundColor: "var(--vapor-color-cyan-300, #1cb3cb)",
          color: "var(--vapor-color-white, #ffffff)",
          fontSize: "16px",
          lineHeight: "24px",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        사진 선택
      </Box>

      <Box
        $css={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "16px",
        }}
      >
        {Array.from({ length: 2 }, (_, index) => {
          const item = mediaItems[index];
          return (
            <Box
              key={item ? item.id : `empty-${index}`}
              $css={{
                position: "relative",
                width: "100%",
                aspectRatio: "1 / 1",
                borderRadius: "8px",
                border: "1px solid var(--vapor-color-gray-100, #e2e8f0)",
                backgroundColor: "var(--vapor-color-gray-050, #f7f7f7)",
                overflow: "hidden",
              }}
            >
              {item ? (
                <>
                  {item.kind === "image" ? (
                    <Box
                      render={
                        <img src={item.previewUrl} alt="" aria-hidden="true" />
                      }
                      $css={{
                        width: "100%",
                        height: "100%",
                        display: "block",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <Box
                      render={
                        <video
                          src={item.previewUrl}
                          muted
                          playsInline
                          controls={false}
                        />
                      }
                      $css={{
                        width: "100%",
                        height: "100%",
                        display: "block",
                        objectFit: "cover",
                        backgroundColor: "#111",
                      }}
                    />
                  )}
                  <Box
                    render={
                      <button
                        type="button"
                        aria-label="첨부 파일 삭제"
                        onClick={() => onRemoveItem(item.id)}
                      />
                    }
                    $css={{
                      position: "absolute",
                      top: "4px",
                      right: "4px",
                      width: "20px",
                      height: "20px",
                      border: "none",
                      borderRadius: "999px",
                      backgroundColor: "rgba(0, 0, 0, 0.72)",
                      color: "var(--vapor-color-white, #ffffff)",
                      display: "grid",
                      placeItems: "center",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    <CloseOutlineIcon size={14} />
                  </Box>
                </>
              ) : null}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

function StepBar({ step }: { step: number }) {
  return (
    <Box
      $css={{
        paddingInline: "16px",
        paddingTop: "12px",
        paddingBottom: "16px",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: `${ICON_OFFSET}px`,
      }}
    >
      <HStack $css={{ width: "100%", gap: "4px", alignItems: "center" }}>
        {Array.from({ length: TOTAL_STEPS }, (_, i) => {
          const isActive = i + 1 <= step;
          return (
            <Box
              key={i}
              $css={{
                flex: 1,
                height: `${BAR_HEIGHT}px`,
                borderRadius: "999px",
                backgroundColor: isActive
                  ? "var(--vapor-color-cyan-300)"
                  : "var(--vapor-color-gray-100)",
                transition: "background-color 0.2s",
              }}
            />
          );
        })}
      </HStack>

      <Box
        $css={{
          width: `${ICON_SIZE}px`,
          height: `${ICON_SIZE}px`,
          borderRadius: "999px",
          border: "2px solid var(--vapor-color-white)",
          overflow: "hidden",
          backgroundColor: "var(--vapor-color-orange-200)",
          visibility: step === 1 ? "visible" : "hidden",
        }}
      >
        <Box
          render={<img src={haenyeoMentorIcon} alt="직업 아이콘" />}
          $css={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </Box>
    </Box>
  );
}

function Step1Content({
  introValue,
  onChangeIntro,
}: {
  introValue: string;
  onChangeIntro: (value: string) => void;
}) {
  const [checked, setChecked] = useState<Record<string, boolean>>(
    Object.fromEntries(INCLUSION_OPTIONS.map((item) => [item, true])),
  );

  return (
    <Box
      $css={{
        flex: 1,
        overflowY: "auto",
        paddingInline: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <StepHeader step={1} title={STEP_TITLES[1]} />

      <Box
        $css={{
          borderRadius: "16px",
          border: "1px solid var(--vapor-color-gray-100)",
          backgroundColor: "var(--vapor-color-gray-050)",
          padding: "16px",
          boxSizing: "border-box",
        }}
      >
        <Box
          render={
            <textarea
              value={introValue}
              onChange={(event) => onChangeIntro(event.currentTarget.value)}
              placeholder={
                "예시) 안녕하세요. 제주 바다에서 오랫동안 물질을 해온 해녀입니다. 바다에 들어가 해산물을 채취하고, 해녀의 하루를 함께 경험하실 수 있습니다. 천천히 바다를 느끼며 편안하게 함께해보세요."
              }
            />
          }
          $css={{
            width: "100%",
            minHeight: "90px",
            border: "none",
            backgroundColor: "transparent",
            color: "var(--vapor-color-gray-400)",
            fontSize: "13px",
            lineHeight: "20px",
            resize: "none",
            outline: "none",
            fontFamily: "var(--vapor-typography-fontFamily-sans)",
            boxSizing: "border-box",
          }}
        />
      </Box>

      <Box
        $css={{
          borderRadius: "16px",
          border: "1px solid var(--vapor-color-gray-100)",
          backgroundColor: "var(--vapor-color-white)",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "0",
        }}
      >
        <Text
          $css={{
            color: "var(--vapor-color-gray-800)",
            fontSize: "16px",
            fontWeight: 700,
            lineHeight: "24px",
            marginBottom: "14px",
          }}
        >
          포함 사항
        </Text>

        <Box $css={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {INCLUSION_OPTIONS.map((item) => (
            <Box
              key={item}
              render={<label />}
              $css={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
              }}
            >
              <Checkbox.Root
                checked={checked[item]}
                onCheckedChange={(val) =>
                  setChecked((prev) => ({ ...prev, [item]: !!val }))
                }
                size="md"
                $css={{
                  borderRadius: "var(--vapor-size-borderRadius-200)",
                  flexShrink: 0,
                  ...(checked[item] && {
                    backgroundColor: "var(--vapor-color-cyan-400)",
                  }),
                }}
              >
                <Checkbox.IndicatorPrimitive />
              </Checkbox.Root>
              <Text
                $css={{
                  color: checked[item]
                    ? "var(--vapor-color-gray-900)"
                    : "var(--vapor-color-gray-400)",
                  fontSize: "14px",
                  lineHeight: "20px",
                  fontWeight: 500,
                  transition: "color 0.15s",
                }}
              >
                {item}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

type Step2ContentProps = {
  onOpenDatePicker: () => void;
  selectedRange?: DateRange;
};

function Step2Content({ onOpenDatePicker, selectedRange }: Step2ContentProps) {
  return (
    <Box
      $css={{
        flex: 1,
        paddingInline: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <VStack
        $css={{
          width: "100%",
          alignItems: "flex-start",
          gap: "8px",
        }}
      >
        <Text
          $css={{
            color: "var(--vapor-color-orange-300)",
            fontFamily: "var(--vapor-typography-fontFamily-sans)",
            fontSize: "var(--vapor-typography-fontSize-200)",
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "var(--vapor-typography-lineHeight-200)",
            letterSpacing: "var(--vapor-typography-letterSpacing-100)",
          }}
        >
          Step 2.
        </Text>

        <HStack
          $css={{
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <Text
            render={<h2 />}
            $css={{
              color: "var(--vapor-color-gray-800, #393939)",
              fontFamily: "var(--vapor-typography-fontFamily-sans)",
              fontSize: "var(--vapor-typography-fontSize-200)",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "var(--vapor-typography-lineHeight-200)",
              letterSpacing: "var(--vapor-typography-letterSpacing-100)",
              whiteSpace: "pre-line",
              flex: 1,
              minWidth: 0,
            }}
          >
            {STEP_TITLES[2]}
          </Text>

          <Box
            render={
              <button
                type="button"
                aria-label="날짜 선택"
                onClick={onOpenDatePicker}
              />
            }
            $css={{
              minWidth: "52px",
              width: "fit-content",
              height: "32px",
              paddingInline: "12px",
              borderRadius: "8px",
              border: "1px solid var(--vapor-color-gray-200)",
              backgroundColor: "var(--vapor-color-white)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <Text
              $css={{
                color: "var(--vapor-color-gray-600)",
                fontSize: "14px",
                lineHeight: "22px",
                fontWeight: 500,
              }}
            >
              선택
            </Text>
          </Box>
        </HStack>
      </VStack>

      {selectedRange?.from && (
        <Text
          $css={{
            color: "var(--vapor-color-gray-500)",
            fontSize: "14px",
            lineHeight: "22px",
            fontWeight: 500,
          }}
        >
          {formatDateRange(selectedRange)}
        </Text>
      )}
    </Box>
  );
}

type StepContentProps = {
  step: number;
  introValue: string;
  onChangeIntro: (value: string) => void;
  onOpenDatePicker: () => void;
  selectedRange?: DateRange;
  selectedTime: TimeSelection;
  onChangeTime: (next: TimeSelection) => void;
  locationValue: string;
  onChangeLocation: (value: string) => void;
  feeValue: string;
  onChangeFee: (value: string) => void;
  mediaItems: readonly MediaPreviewItem[];
  onOpenMediaPicker: () => void;
  onRemoveMediaItem: (id: string) => void;
};

function CompletionContent() {
  return (
    <Box
      $css={{
        flex: 1,
        paddingInline: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "36px",
      }}
    >
      <Text
        render={<h2 />}
        $css={{
          color: "var(--vapor-color-gray-800, #393939)",
          textAlign: "center",
          fontFamily: "var(--vapor-typography-fontFamily-sans)",
          fontSize: "var(--vapor-typography-fontSize-300)",
          fontStyle: "normal",
          fontWeight: 700,
          lineHeight: "var(--vapor-typography-lineHeight-300)",
          letterSpacing: "var(--vapor-typography-letterSpacing-200)",
        }}
      >
        글쓰기를 완료했어요
      </Text>

      <Box
        render={<img src={checkIcon} alt="완료 아이콘" />}
        $css={{
          width: "120px",
          height: "120px",
          display: "block",
          objectFit: "contain",
        }}
      />
    </Box>
  );
}

function StepContent({
  step,
  introValue,
  onChangeIntro,
  onOpenDatePicker,
  selectedRange,
  selectedTime,
  onChangeTime,
  locationValue,
  onChangeLocation,
  feeValue,
  onChangeFee,
  mediaItems,
  onOpenMediaPicker,
  onRemoveMediaItem,
}: StepContentProps) {
  if (step === 1)
    return <Step1Content introValue={introValue} onChangeIntro={onChangeIntro} />;
  if (step === 2)
    return (
      <Step2Content
        onOpenDatePicker={onOpenDatePicker}
        selectedRange={selectedRange}
      />
    );
  if (step === 3)
    return (
      <Step3Content selectedTime={selectedTime} onChangeTime={onChangeTime} />
    );
  if (step === 4)
    return (
      <Step4Content
        locationValue={locationValue}
        onChangeLocation={onChangeLocation}
      />
    );
  if (step === 5)
    return <Step5Content feeValue={feeValue} onChangeFee={onChangeFee} />;
  if (step === 6)
    return (
      <Step6Content
        mediaItems={mediaItems}
        onOpenPicker={onOpenMediaPicker}
        onRemoveItem={onRemoveMediaItem}
      />
    );
  if (step === COMPLETE_STEP) return <CompletionContent />;

  return (
    <Box
      $css={{
        flex: 1,
        paddingInline: "16px",
      }}
    >
      <StepHeader
        step={step}
        title={STEP_TITLES[step]}
        description={STEP_DESCRIPTIONS[step]}
      />
    </Box>
  );
}

function BottomButton({
  step,
  disabled,
  onNext,
  onPrev,
}: {
  step: number;
  disabled: boolean;
  onNext: () => void;
  onPrev: () => void;
}) {
  return (
    <Box
      $css={{
        display: "flex",
        gap: "8px",
        paddingInline: "16px",
        paddingBottom: "24px",
        paddingTop: "12px",
        flexShrink: 0,
      }}
    >
      <Box
        render={<button type="button" onClick={onNext} disabled={disabled} />}
        $css={{
          flex: 1,
          height: "52px",
          borderRadius: "14px",
          border: "none",
          backgroundColor: disabled
            ? "var(--vapor-color-cyan-200, #84d2e2)"
            : "var(--vapor-color-cyan-300, #1cb3cb)",
          color: "var(--vapor-color-white)",
          fontSize: "16px",
          fontWeight: 600,
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        {step === COMPLETE_STEP
          ? "게시글 확인하러 가기"
          : step === TOTAL_STEPS
            ? "완료"
            : "다음"}
      </Box>
    </Box>
  );
}

export function MentorWritePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();
  const [draftRange, setDraftRange] = useState<DateRange | undefined>();
  const [introValue, setIntroValue] = useState("");
  const [selectedTime, setSelectedTime] = useState<TimeSelection>({
    meridiem: "오후",
    hour: 14,
    minute: 0,
  });
  const [locationValue, setLocationValue] = useState("");
  const [feeValue, setFeeValue] = useState("");
  const [mediaItems, setMediaItems] = useState<MediaPreviewItem[]>([]);
  const mediaItemsRef = useRef<MediaPreviewItem[]>([]);
  const filePickerRef = useRef<HTMLInputElement | null>(null);
  const [displayMonth, setDisplayMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const step = Math.min(
    Math.max(Number(searchParams.get("step") ?? "1"), 1),
    COMPLETE_STEP,
  );

  const goToStep = (next: number) => setSearchParams({ step: String(next) });
  const canProceed =
    step === 1
      ? introValue.trim().length > 0
      : step === 2
        ? Boolean(selectedRange?.from)
        : step === 3
          ? true
          : step === 4
            ? locationValue.trim().length > 0
            : step === 5
              ? feeValue.trim().length > 0
              : step === 6
                ? mediaItems.length > 0
                : true;

  const handleNext = () => {
    if (!canProceed) return;
    if (step === TOTAL_STEPS) {
      goToStep(COMPLETE_STEP);
    } else if (step === COMPLETE_STEP) {
      navigate(ROUTES.matchingDetail, { replace: true });
    } else {
      goToStep(step + 1);
    }
  };
  const handlePrev = () => goToStep(step - 1);
  const handleBack = () => {
    if (step === 1) {
      navigate(ROUTES.mentorHome);
    } else if (step === COMPLETE_STEP) {
      goToStep(TOTAL_STEPS);
    } else {
      goToStep(step - 1);
    }
  };

  const handleOpenDatePicker = () => {
    setDraftRange(cloneDateRange(selectedRange));
    setIsDatePickerOpen(true);
  };
  const handleCloseDatePicker = () => {
    setDraftRange(cloneDateRange(selectedRange));
    setIsDatePickerOpen(false);
  };
  const handleConfirmDatePicker = () => {
    if (!draftRange?.from || !draftRange.to) return;
    setSelectedRange(cloneDateRange(draftRange));
    setIsDatePickerOpen(false);
    if (step < 3) {
      goToStep(3);
    }
  };

  const hasCompleteDraftRange = Boolean(draftRange?.from && draftRange?.to);

  const handleOpenMediaPicker = () => {
    filePickerRef.current?.click();
  };

  const handleRemoveMediaItem = (id: string) => {
    setMediaItems((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target) {
        URL.revokeObjectURL(target.previewUrl);
      }
      return prev.filter((item) => item.id !== id);
    });
  };

  const handlePickMedia = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) return;

    setMediaItems((prev) => {
      const imageCount = prev.filter((item) => item.kind === "image").length;
      const videoCount = prev.filter((item) => item.kind === "video").length;

      let nextImageCount = imageCount;
      let nextVideoCount = videoCount;
      const nextItems = [...prev];

      for (const file of files) {
        if (nextItems.length >= 2) break;

        const isImage = file.type.startsWith("image/");
        const isVideo = file.type.startsWith("video/");

        if (isImage) {
          if (nextImageCount >= 2) continue;
          nextImageCount += 1;
          nextItems.push({
            id: `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2)}`,
            file,
            kind: "image",
            previewUrl: URL.createObjectURL(file),
          });
          continue;
        }

        if (isVideo) {
          if (nextVideoCount >= 2) continue;
          nextVideoCount += 1;
          nextItems.push({
            id: `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2)}`,
            file,
            kind: "video",
            previewUrl: URL.createObjectURL(file),
          });
        }
      }

      return nextItems;
    });

    event.currentTarget.value = "";
  };

  useEffect(() => {
    mediaItemsRef.current = mediaItems;
  }, [mediaItems]);

  useEffect(() => {
    return () => {
      mediaItemsRef.current.forEach((item) =>
        URL.revokeObjectURL(item.previewUrl),
      );
    };
  }, []);

  return (
    <Box
      $css={{
        position: "relative",
        width: "100%",
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "var(--vapor-color-white)",
        overflow: "hidden",
      }}
    >
      <Box
        $css={{
          display: "flex",
          alignItems: "center",
          paddingInline: "4px",
          paddingTop: "8px",
          flexShrink: 0,
        }}
      >
        <Box
          render={
            <button type="button" onClick={handleBack} aria-label="뒤로가기" />
          }
          $css={{
            display: "grid",
            placeItems: "center",
            width: "44px",
            height: "44px",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          <ChevronLeftOutlineIcon
            size={24}
            color="var(--vapor-color-gray-800)"
          />
        </Box>
      </Box>

      {step <= TOTAL_STEPS ? <StepBar step={step} /> : null}
      <Box
        render={
          <input
            ref={filePickerRef}
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handlePickMedia}
          />
        }
        $css={{ display: "none" }}
      />
      <StepContent
        step={step}
        introValue={introValue}
        onChangeIntro={setIntroValue}
        onOpenDatePicker={handleOpenDatePicker}
        selectedRange={selectedRange}
        selectedTime={selectedTime}
        onChangeTime={setSelectedTime}
        locationValue={locationValue}
        onChangeLocation={setLocationValue}
        feeValue={feeValue}
        onChangeFee={setFeeValue}
        mediaItems={mediaItems}
        onOpenMediaPicker={handleOpenMediaPicker}
        onRemoveMediaItem={handleRemoveMediaItem}
      />
      <BottomButton
        step={step}
        disabled={!canProceed}
        onNext={handleNext}
        onPrev={handlePrev}
      />

      {isDatePickerOpen && (
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
                aria-label="선택"
                onClick={handleCloseDatePicker}
              />
            }
            $css={{
              position: "absolute",
              inset: "0",
              border: "none",
              backgroundColor: "rgba(0,0,0,0.5)",
              cursor: "pointer",
            }}
          />

          <Box
            role="dialog"
            aria-modal="true"
            $css={{
              position: "absolute",
              top: "76px",
              left: "0",
              right: "0",
              bottom: "0",
              backgroundColor: "var(--vapor-color-white)",
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
                  paddingInline: "16px",
                  boxSizing: "border-box",
                  paddingTop: "90px",
                  paddingBottom: "calc(120px + env(safe-area-inset-bottom))",
                  gap: "32px",
                }}
              >
                <Text
                  render={<h2 />}
                  $css={{
                    color: "var(--vapor-color-gray-800)",
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
                    classNames={reservationDatePickerClassNames}
                    components={{ Chevron: CalendarChevron }}
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
                  backgroundColor: "var(--vapor-color-white)",
                  borderTop: "1px solid var(--vapor-color-gray-100)",
                  paddingTop: "16px",
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
                    minHeight: "56px",
                  }}
                >
                  <VStack $css={{ gap: "2px", flex: 1, minWidth: 0 }}>
                    <Text
                      $css={{
                        color: "var(--vapor-color-gray-500)",
                        fontSize: "13px",
                        lineHeight: "20px",
                        fontWeight: 500,
                      }}
                    >
                      기간
                    </Text>
                    <Text
                      $css={{
                        color: "var(--vapor-color-gray-900)",
                        fontSize: "15px",
                        lineHeight: "22px",
                        fontWeight: 500,
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
                        aria-label="선택"
                      />
                    }
                    $css={{
                      width: "120px",
                      height: "52px",
                      border: "none",
                      borderRadius: "14px",
                      backgroundColor: "var(--vapor-color-cyan-300)",
                      color: "var(--vapor-color-white)",
                      display: "grid",
                      placeItems: "center",
                      cursor: hasCompleteDraftRange ? "pointer" : "not-allowed",
                      opacity: hasCompleteDraftRange ? 1 : 0.5,
                      flexShrink: 0,
                      fontSize: "15px",
                      fontWeight: 600,
                    }}
                  >
                    선택
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}


