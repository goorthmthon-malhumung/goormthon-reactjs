const SPEC_URL = import.meta.env.VITE_OPENAPI_SPEC_URL;
const FALLBACK_BASE_URL = SPEC_URL?.replace(/\/v3\/api-docs\/?$/, "") ?? "";
const RUNTIME_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? FALLBACK_BASE_URL;
// In the Vite dev server, route API calls through the local proxy so the browser
// treats the request as same-origin and accepts the session cookie.
const BASE_URL = (import.meta.env.DEV ? "/api" : RUNTIME_BASE_URL).replace(
  /\/$/,
  "",
);
const AUTH_ERROR_STATUSES = new Set([401, 403]);

type PrimitiveQueryValue = string | number | boolean | null | undefined | Date;
type QueryValue = PrimitiveQueryValue | PrimitiveQueryValue[];

export type ApiErrorResponse = {
  code: string;
  message: string;
};

export type ApiResponse<T> = {
  success: boolean;
  data: T | null;
  error: ApiErrorResponse | null;
};

export type BodyType<BodyData> = BodyData;
export type ErrorType<ErrorData> = ApiError<ErrorData>;

export type RequestConfig = Omit<RequestInit, "body"> & {
  body?: BodyInit | null;
  json?: unknown;
  params?: Record<string, QueryValue>;
  responseType?: "json" | "text" | "blob" | "arrayBuffer" | "formData";
};

export type ApiAuthErrorDetail = {
  code: string;
  message: string;
  status: number;
  url: string;
};

export const API_AUTH_ERROR_EVENT = "app:api-auth-error";

export class ApiError<ErrorData = ApiErrorResponse> extends Error {
  readonly status: number;
  readonly code: string;
  readonly payload: ErrorData | null;
  readonly url: string;

  constructor({
    code,
    message,
    payload,
    status,
    url,
  }: {
    code: string;
    message: string;
    payload: ErrorData | null;
    status: number;
    url: string;
  }) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.payload = payload;
    this.status = status;
    this.url = url;
  }
}

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isApiErrorResponse = (value: unknown): value is ApiErrorResponse =>
  isObject(value) &&
  typeof value.code === "string" &&
  typeof value.message === "string";

const isApiResponse = <T>(value: unknown): value is ApiResponse<T> =>
  isObject(value) &&
  typeof value.success === "boolean" &&
  "data" in value &&
  "error" in value;

const isBodyInit = (value: unknown): value is Exclude<BodyInit, ReadableStream> =>
  typeof value === "string" ||
  value instanceof Blob ||
  value instanceof FormData ||
  value instanceof URLSearchParams ||
  value instanceof ArrayBuffer ||
  ArrayBuffer.isView(value);

const buildUrl = (
  path: string,
  params?: Record<string, QueryValue>,
) => {
  const targetUrl = `${BASE_URL}${path}`;

  if (!params) {
    return targetUrl;
  }

  const searchParams = new URLSearchParams();

  const appendValue = (key: string, value: PrimitiveQueryValue) => {
    if (value === undefined) {
      return;
    }

    if (value === null) {
      searchParams.append(key, "null");
      return;
    }

    if (value instanceof Date) {
      searchParams.append(key, value.toISOString());
      return;
    }

    searchParams.append(key, String(value));
  };

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => appendValue(key, item));
      return;
    }

    appendValue(key, value);
  });

  const queryString = searchParams.toString();

  if (!queryString) {
    return targetUrl;
  }

  return `${targetUrl}${targetUrl.includes("?") ? "&" : "?"}${queryString}`;
};

const parseResponseBody = async (
  response: Response,
  responseType: RequestConfig["responseType"],
) => {
  if ([204, 205, 304].includes(response.status) || !response.body) {
    return null;
  }

  if (responseType === "blob") {
    return response.blob();
  }

  if (responseType === "text") {
    return response.text();
  }

  if (responseType === "arrayBuffer") {
    return response.arrayBuffer();
  }

  if (responseType === "formData") {
    return response.formData();
  }

  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
};

const normalizeApiError = (
  payload: unknown,
  response: Response,
  url: string,
) => {
  const fallback: ApiErrorResponse = {
    code: `HTTP_${response.status}`,
    message: response.statusText || "Request failed",
  };

  if (isApiResponse(payload) && isApiErrorResponse(payload.error)) {
    return new ApiError<ApiErrorResponse>({
      code: payload.error.code,
      message: payload.error.message,
      payload: payload.error,
      status: response.status,
      url,
    });
  }

  if (isApiErrorResponse(payload)) {
    return new ApiError<ApiErrorResponse>({
      code: payload.code,
      message: payload.message,
      payload,
      status: response.status,
      url,
    });
  }

  if (typeof payload === "string" && payload.trim()) {
    return new ApiError<ApiErrorResponse>({
      code: fallback.code,
      message: payload,
      payload: null,
      status: response.status,
      url,
    });
  }

  return new ApiError<ApiErrorResponse>({
    code: fallback.code,
    message: fallback.message,
    payload: null,
    status: response.status,
    url,
  });
};

const emitAuthError = (error: ApiError<ApiErrorResponse>) => {
  if (
    typeof window === "undefined" ||
    !AUTH_ERROR_STATUSES.has(error.status)
  ) {
    return;
  }

  const detail: ApiAuthErrorDetail = {
    code: error.code,
    message: error.message,
    status: error.status,
    url: error.url,
  };

  window.dispatchEvent(new CustomEvent<ApiAuthErrorDetail>(API_AUTH_ERROR_EVENT, {
    detail,
  }));
};

const toRequestBody = (
  body: BodyInit | null | undefined,
  json: unknown,
  headers: Headers,
) => {
  if (json !== undefined) {
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    return JSON.stringify(json);
  }

  if (body === undefined || body === null) {
    return undefined;
  }

  if (isBodyInit(body)) {
    return body;
  }

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  return JSON.stringify(body);
};

export const isApiError = <ErrorData = ApiErrorResponse>(
  error: unknown,
): error is ApiError<ErrorData> => error instanceof ApiError;

export const customFetch = async <T>(
  url: string,
  config: RequestConfig = {},
): Promise<T> => {
  const {
    body,
    json,
    params,
    responseType = "json",
    headers: rawHeaders,
    ...restConfig
  } = config;
  const targetUrl = buildUrl(url, params);
  const headers = new Headers(rawHeaders);

  if (responseType === "json" && !headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  const response = await fetch(targetUrl, {
    ...restConfig,
    body: toRequestBody(body, json, headers),
    credentials: "include",
    // credentials: restConfig.credentials ?? "include",
    headers,
  });

  const payload = await parseResponseBody(response, responseType);

  if (!response.ok) {
    const error = normalizeApiError(payload, response, targetUrl);
    emitAuthError(error);
    throw error;
  }

  if (isApiResponse<T>(payload)) {
    if (!payload.success) {
      const error = normalizeApiError(payload, response, targetUrl);
      emitAuthError(error);
      throw error;
    }
  }

  return payload as T;
};
