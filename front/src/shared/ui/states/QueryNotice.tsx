import { Box, HStack, Text } from "@vapor-ui/core";

type QueryNoticeTone = "loading" | "error" | "success";

const TONE_STYLES: Record<
  QueryNoticeTone,
  {
    backgroundColor: string;
    borderColor: string;
    color: string;
  }
> = {
  loading: {
    backgroundColor: "#EFF6FF",
    borderColor: "#BFDBFE",
    color: "#1D4ED8",
  },
  error: {
    backgroundColor: "#FEF2F2",
    borderColor: "#FECACA",
    color: "#DC2626",
  },
  success: {
    backgroundColor: "#ECFDF5",
    borderColor: "#BBF7D0",
    color: "#15803D",
  },
};

export function QueryNotice({
  message,
  tone,
  onRetry,
}: {
  message: string;
  tone: QueryNoticeTone;
  onRetry?: () => void;
}) {
  const styles = TONE_STYLES[tone];

  return (
    <HStack
      $css={{
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "12px",
        padding: "12px 14px",
        borderRadius: "14px",
        border: `1px solid ${styles.borderColor}`,
        backgroundColor: styles.backgroundColor,
      }}
    >
      <Text
        render={<p />}
        $css={{
          color: styles.color,
          fontFamily:
            '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif',
          fontSize: "14px",
          lineHeight: "22px",
          fontWeight: 500,
          letterSpacing: "-0.1px",
        }}
      >
        {message}
      </Text>

      {tone === "error" && onRetry ? (
        <Box
          render={<button type="button" onClick={onRetry} />}
          $css={{
            border: "none",
            backgroundColor: "transparent",
            color: styles.color,
            cursor: "pointer",
            padding: 0,
            flexShrink: 0,
          }}
        >
          <Text
            render={<span />}
            $css={{
              color: "inherit",
              fontFamily:
                '"Inter", "Noto Sans KR", "Pretendard", "Apple SD Gothic Neo", sans-serif',
              fontSize: "13px",
              lineHeight: "20px",
              fontWeight: 600,
              letterSpacing: "-0.1px",
              whiteSpace: "nowrap",
            }}
          >
            다시 시도
          </Text>
        </Box>
      ) : null}
    </HStack>
  );
}
