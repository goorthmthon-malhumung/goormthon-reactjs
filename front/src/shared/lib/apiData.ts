export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function asRecord(value: unknown): Record<string, unknown> | null {
  return isRecord(value) ? value : null;
}

export function getRecordCollection(value: unknown): Record<string, unknown>[] {
  if (Array.isArray(value)) {
    return value.filter(isRecord);
  }

  const record = asRecord(value);

  if (!record || !Array.isArray(record.content)) {
    return [];
  }

  return record.content.filter(isRecord);
}

export function getString(
  record: Record<string, unknown> | null,
  key: string,
): string | undefined {
  const value = record?.[key];

  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : undefined;
}

export function getNumber(
  record: Record<string, unknown> | null,
  key: string,
): number | undefined {
  const value = record?.[key];

  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

export function getStringList(
  record: Record<string, unknown> | null,
  key: string,
): string[] {
  const value = record?.[key];

  if (Array.isArray(value)) {
    return value.filter((item): item is string => {
      return typeof item === "string" && item.trim().length > 0;
    });
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }

  return [];
}
