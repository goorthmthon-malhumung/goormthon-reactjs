type UnknownRecord = Record<string, unknown>;

export const asObject = (value: unknown): UnknownRecord | null => {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return null;
  }

  return value as UnknownRecord;
};

const getValue = (source: unknown, keys: string[]) => {
  const record = asObject(source);

  if (!record) {
    return undefined;
  }

  for (const key of keys) {
    if (key in record) {
      return record[key];
    }
  }

  return undefined;
};

export const getString = (
  source: unknown,
  keys: string[],
  fallback = "",
) => {
  const value = getValue(source, keys);

  if (typeof value === "string" && value.trim()) {
    return value;
  }

  return fallback;
};

export const getNumber = (
  source: unknown,
  keys: string[],
  fallback: number,
) => {
  const value = getValue(source, keys);

  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);

    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return fallback;
};

export const getStringArray = (
  source: unknown,
  keys: string[],
  fallback: readonly string[] = [],
) => {
  const value = getValue(source, keys);

  if (Array.isArray(value)) {
    const strings = value.filter(
      (item): item is string => typeof item === "string" && item.trim().length > 0,
    );

    if (strings.length > 0) {
      return strings;
    }
  }

  if (typeof value === "string" && value.trim()) {
    const strings = value
      .split(/[,\n]/)
      .map((item) => item.trim())
      .filter(Boolean);

    if (strings.length > 0) {
      return strings;
    }
  }

  return [...fallback];
};
