import {
  Badge,
  Box,
  Card,
  Text,
  VStack,
} from "@vapor-ui/core";
import { Link } from "react-router-dom";

export type ThumbnailCardProps = {
  to: string;
  imageSrc: string;
  imageAlt: string;
  badgeLabel: string;
  title: string;
  statusLabel: string;
  caption: string;
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
            render={<img src={imageSrc} alt={imageAlt} />}
            $css={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          <Badge
            shape="pill"
            size="md"
            colorPalette="warning"
            $css={{
              position: "absolute",
              top: "8px",
              right: "8px",
              backgroundColor: "#FFD9C8",
              color: "#CD4D0A",
              borderRadius: "999px",
              boxShadow: "none",
              fontWeight: 500,
            }}
          >
            {badgeLabel}
          </Badge>
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
            <Text
              typography="subtitle1"
              $css={{
                color: "#4C4C4C",
                ...SINGLE_LINE_ELLIPSIS_STYLES,
              }}
            >
              {statusLabel}
            </Text>
          </VStack>

          <Text
            typography="body3"
            $css={{
              color: "#A3A3A3",
              ...SINGLE_LINE_ELLIPSIS_STYLES,
            }}
          >
            {caption}
          </Text>
        </Card.Body>
      </Card.Root>
    </Box>
  );
}
