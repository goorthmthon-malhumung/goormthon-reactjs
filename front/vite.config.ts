import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import { VitePWA } from "vite-plugin-pwa";

const API_PROXY_PREFIX = "/api";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiBaseUrl =
    env.VITE_API_BASE_URL ??
    env.VITE_OPENAPI_SPEC_URL?.replace(/\/v3\/api-docs\/?$/, "") ??
    "";

  let apiProxy:
    | {
        target: string;
        changeOrigin: boolean;
        rewrite: (path: string) => string;
      }
    | undefined;

  if (apiBaseUrl) {
    const upstreamUrl = new URL(apiBaseUrl);
    const upstreamBasePath = upstreamUrl.pathname.replace(/\/$/, "");

    apiProxy = {
      target: upstreamUrl.origin,
      changeOrigin: true,
      rewrite: (path) => {
        const proxiedPath = path.replace(
          new RegExp(`^${API_PROXY_PREFIX}`),
          "",
        );

        if (!proxiedPath) {
          return upstreamBasePath || "/";
        }

        return `${upstreamBasePath}${proxiedPath}`;
      },
    };
  }

  return {
    plugins: [
      react(),
      VitePWA({
        registerType: "autoUpdate",
        devOptions: {
          enabled: true,
        },
        includeAssets: ["favicon.ico", "appIcon.png"],
        manifest: {
          name: "전허게",
          short_name: "전허게",
          lang: "ko-KR",
          description: "제주도의 숨겨진 이야기를 전허게에서 만나보세요.",
          start_url: "/onboarding",
          display: "standalone",
          background_color: "#ffffff",
          theme_color: "#000000",
          icons: [
            {
              src: "appIcon.png",
              sizes: "any",
              type: "image/png",
            },
          ],
        },
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: apiProxy
      ? {
          proxy: {
            [API_PROXY_PREFIX]: apiProxy,
          },
        }
      : undefined,
  };
});
