import { Badge } from "@vapor-ui/core";

export type ThumbnailBadgeTone = "orange" | "cyan";

type ThumbnailBadgeProps = {
  label: string;
  tone?: ThumbnailBadgeTone;
};

const BADGE_TONE_STYLES: Record<ThumbnailBadgeTone, { bg: string; fg: string }> =
  {
    orange: {
      bg: "#FFD9C8",
      fg: "#CD4D0A",
    },
    cyan: {
      bg: "var(--vapor-color-cyan-100, #c2e8f0)",
      fg: "var(--vapor-color-cyan-500, #0d8298)",
    },
  };

export function ThumbnailBadge({ label, tone = "orange" }: ThumbnailBadgeProps) {
  const palette = BADGE_TONE_STYLES[tone];

  return (
    <Badge
      shape="pill"
      size="md"
      $css={{
        position: "absolute",
        top: "8px",
        right: "8px",
        backgroundColor: palette.bg,
        color: palette.fg,
        borderRadius: "999px",
        boxShadow: "none",
        fontWeight: 500,
      }}
    >
      {label}
    </Badge>
  );
}

