import {
  Box,
  Card,
  Text,
  VStack,
} from "@vapor-ui/core";
import { Link } from "react-router-dom";
import {
  ThumbnailBadge,
  type ThumbnailBadgeTone,
} from "./ThumbnailBadge";

export type ThumbnailCardProps = {
  to: string;
  imageSrc?: string;
  imageAlt?: string;
  badgeLabel?: string;
  badgeTone?: ThumbnailBadgeTone;
  title: string;
  statusLabel?: string;
  caption?: string;
};

const SINGLE_LINE_ELLIPSIS_STYLES = {
  width: "100%",
  display: "block",
  minWidth: 0,
  maxWidth: "100%",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
} as const;

export function ThumbnailCard({
  to,
  imageSrc,
  imageAlt,
  badgeLabel,
  badgeTone = "orange",
  title,
  statusLabel,
  caption,
}: ThumbnailCardProps) {
  return (
    <Box
      render={<Link to={to} aria-label={`${title} 상세 보기`} />}
      $css={{
        display: "block",
        width: "100%",
        color: "inherit",
        textDecoration: "none",
      }}
    >
      <Card.Root
        $css={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          alignItems: "stretch",
          minWidth: 0,
          border: "none",
          boxShadow: "none",
          backgroundColor: "transparent",
        }}
      >
        <Box
          $css={{
            position: "relative",
            width: "100%",
            height: "130px",
            overflow: "hidden",
            borderRadius: "14px",
            border: "1px solid var(--vapor-color-gray-100, #E2E8F0)",
            backgroundColor: "var(--vapor-color-gray-000, #FFFFFF)",
          }}
        >
          <Box
            render={
              imageSrc ? <img src={imageSrc} alt={imageAlt ?? title} /> : <div aria-hidden="true" />
            }
            $css={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              background:
                imageSrc
                  ? undefined
                  : "linear-gradient(135deg, #EEF9FB 0%, #C2E8F0 100%)",
            }}
          />

          {badgeLabel ? <ThumbnailBadge label={badgeLabel} tone={badgeTone} /> : null}
        </Box>

        <Card.Body
          $css={{
            width: "100%",
            padding: 0,
            gap: "2px",
            minWidth: 0,
            alignItems: "stretch",
          }}
        >
          <VStack
            $css={{
              gap: "4px",
              width: "100%",
              minWidth: 0,
              alignItems: "stretch",
            }}
          >
            <Text
              render={<h3 />}
              typography="heading5"
              $css={{
                color: "#393939",
                ...SINGLE_LINE_ELLIPSIS_STYLES,
              }}
            >
              {title}
            </Text>
            {statusLabel ? (
              <Text
                typography="subtitle1"
                $css={{
                  color: "#4C4C4C",
                  ...SINGLE_LINE_ELLIPSIS_STYLES,
                }}
              >
                {statusLabel}
              </Text>
            ) : null}
          </VStack>

          {caption ? (
            <Text
              typography="body3"
              $css={{
                color: "#A3A3A3",
                ...SINGLE_LINE_ELLIPSIS_STYLES,
              }}
            >
              {caption}
            </Text>
          ) : null}
        </Card.Body>
      </Card.Root>
    </Box>
  );
}
