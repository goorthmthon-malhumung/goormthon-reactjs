import {
  Box,
  Card,
  Text,
  VStack,
} from "@vapor-ui/core";
import { Link } from "react-router-dom";

export type MentorCardProps = {
  to: string;
  state?: unknown;
  imageSrc?: string;
  imageAlt?: string;
  badgeLabel?: string;
  title: string;
  metaLabel?: string;
  description?: string;
  location?: string;
  tags?: readonly string[];
};

const SINGLE_LINE_ELLIPSIS_STYLES = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
} as const;

const DESCRIPTION_CLAMP_STYLES = {
  display: "-webkit-box",
  overflow: "hidden",
  textOverflow: "ellipsis",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
} as const;

const MENTOR_CARD_IMAGE_DIMENSIONS = {
  width: 356,
  height: 192,
} as const;

export function MentorCard({
  to,
  state,
  imageSrc,
  imageAlt,
  badgeLabel,
  title,
  metaLabel,
  description,
  location,
  tags,
}: MentorCardProps) {
  return (
    <Box
      render={<Link to={to} state={state} aria-label={`${title} 상세 보기`} />}
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
          minHeight: "405px",
          overflow: "hidden",
          borderRadius: "16px",
          border: "0.735px solid #E1E1E1",
          backgroundColor: "#FFFFFF",
          boxShadow: "none",
        }}
      >
        <Box
          $css={{
            position: "relative",
            aspectRatio: "356 / 192",
            overflow: "hidden",
            backgroundColor: "#D8E6EC",
          }}
        >
          <Box
            render={
              imageSrc ? (
                <img
                  src={imageSrc}
                  alt={imageAlt ?? title}
                  loading="lazy"
                  decoding="async"
                  width={MENTOR_CARD_IMAGE_DIMENSIONS.width}
                  height={MENTOR_CARD_IMAGE_DIMENSIONS.height}
                />
              ) : <div aria-hidden="true" />
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
          {badgeLabel ? (
            <Box
              $css={{
                position: "absolute",
                top: "12px",
                right: "12px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: "32px",
                paddingInline: "12px",
                borderRadius: "999px",
                backgroundColor: "#C2E8F0",
              }}
            >
              <Text
                typography="subtitle1"
                $css={{
                  color: "#0D8298",
                  fontWeight: 500,
                  letterSpacing: "-0.1px",
                }}
              >
                {badgeLabel}
              </Text>
            </Box>
          ) : null}
        </Box>

        <Card.Body
          $css={{
            padding: "20px",
          }}
        >
          <VStack
            $css={{
              gap: "12px",
              alignItems: "stretch",
            }}
          >
            <VStack
              $css={{
                gap: "14px",
                alignItems: "stretch",
              }}
            >
              <VStack
                $css={{
                  gap: "12px",
                  alignItems: "stretch",
                }}
              >
                <VStack
                  $css={{
                    gap: "4px",
                    alignItems: "stretch",
                  }}
                >
                  <Text
                    render={<h3 />}
                    typography="heading5"
                    $css={{
                      color: "#393939",
                      letterSpacing: "-0.1px",
                      ...SINGLE_LINE_ELLIPSIS_STYLES,
                    }}
                  >
                    {title}
                  </Text>
                  {metaLabel ? (
                    <Text
                      typography="subtitle1"
                      $css={{
                        color: "#767676",
                        letterSpacing: "-0.1px",
                        ...SINGLE_LINE_ELLIPSIS_STYLES,
                      }}
                    >
                      {metaLabel}
                    </Text>
                  ) : null}
                </VStack>

                {description ? (
                  <Text
                    typography="subtitle1"
                    $css={{
                      color: "#45556C",
                      letterSpacing: "-0.1px",
                      minHeight: "44px",
                      ...DESCRIPTION_CLAMP_STYLES,
                    }}
                  >
                    {description}
                  </Text>
                ) : null}
              </VStack>

              {location ? (
                <Text
                  typography="body3"
                  $css={{
                    color: "#A3A3A3",
                    letterSpacing: "-0.1px",
                    ...SINGLE_LINE_ELLIPSIS_STYLES,
                  }}
                >
                  {location}
                </Text>
              ) : null}
            </VStack>

            {tags && tags.length > 0 ? (
              <Box
                $css={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "4px",
                  alignItems: "center",
                }}
              >
                {tags.map((tag) => (
                  <Box
                    key={tag}
                    $css={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "3px 8px",
                      borderRadius: "999px",
                      backgroundColor: "#EEF9FB",
                    }}
                  >
                    <Text
                      typography="body3"
                      $css={{
                        color: "#17A3BA",
                        fontWeight: 500,
                      }}
                    >
                      {tag}
                    </Text>
                  </Box>
                ))}
              </Box>
            ) : null}
          </VStack>
        </Card.Body>
      </Card.Root>
    </Box>
  );
}
