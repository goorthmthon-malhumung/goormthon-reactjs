/// <reference types="node" />

import { config } from "dotenv";
import { defineConfig } from "orval";

config({ path: ".env.local" });

const DEFAULT_OPENAPI_SPEC_URL =
  "https://junhugaeapi.goorm.training/v3/api-docs";

const specUrl = process.env.VITE_OPENAPI_SPEC_URL ?? DEFAULT_OPENAPI_SPEC_URL;

export default defineConfig({
  api: {
    input: {
      target: specUrl,
      override: {
        transformer: "./src/api/orval/input-transformer.ts",
      },
    },
    output: {
      mode: "tags-split",
      target: "./src/api/generated/index.ts",
      schemas: "./src/api/generated/model",
      client: "react-query",
      clean: true,
      mock: false,
      tsconfig: "./tsconfig.json",
      // Keep generated paths relative. Runtime base URL is resolved in fetcher.ts.
      baseUrl: "",
      override: {
        fetch: {
          includeHttpResponseReturnType: false,
        },
        mutator: {
          path: "./src/api/fetcher.ts",
          name: "customFetch",
        },
      },
    },
  },
});
