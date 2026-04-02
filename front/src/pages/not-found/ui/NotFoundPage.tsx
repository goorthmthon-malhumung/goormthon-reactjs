import { Link } from "react-router-dom";
import { Box, Button, Card, Text, VStack } from "@vapor-ui/core";
import { ROUTES } from "@/shared/config/routes";

export function NotFoundPage() {
  return (
    <Box
      render={<main />}
      $css={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "$400",
      }}
    >
      <Card.Root
        $css={{
          width: "min(520px, 100%)",
          boxShadow: "0 20px 40px rgba(15, 23, 42, 0.08)",
        }}
      >
        <Card.Body>
          <VStack
            $css={{
              gap: "$150",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Text typography="body3" foreground="primary-100">
              404
            </Text>
            <Text render={<h1 />} typography="heading3">
              Page not found
            </Text>
            <Text typography="body2" foreground="normal-100">
              The route exists in the app shell now, but this page has not been built
              yet.
            </Text>
            <Button nativeButton={false} render={<Link to={ROUTES.home} />}>
              Back to home
            </Button>
          </VStack>
        </Card.Body>
      </Card.Root>
    </Box>
  );
}
