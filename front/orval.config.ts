/// <reference types="node" />

import { defineConfig } from "orval";

const LOCAL_OPENAPI_SPEC_PATH = "./api.json";

export default defineConfig({
  api: {
    input: {
      target: LOCAL_OPENAPI_SPEC_PATH,
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
