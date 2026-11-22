import type { HassEntity } from './types';

/** Numeric value of an entity, or null for un/available/not-a-number states. */
export function stateNumber(entity?: HassEntity | null): number | null {
  if (!entity) {
    return null;
  }
  const raw = entity.state;
  if (raw === '' || raw === 'unknown' || raw === 'unavailable') {
    return null;
  }
  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
}

/** Whether an entity exists and carries a usable state. */
export function isAvailable(entity?: HassEntity | null): boolean {
  return !!entity && entity.state !== 'unknown' && entity.state !== 'unavailable';
}

/** Whether a binary-ish entity is on. */
export function isOn(entity?: HassEntity | null): boolean {
  return entity?.state === 'on';
}

/**
 * Format a number for display. Returns an em dash for null/NaN so a missing
 * value never shows as "NaN" or "0".
 */
export function formatNumber(
  value: number | null,
  digits = 1,
  lang?: string,
): string {
  if (value === null || !Number.isFinite(value)) {
    return '—';
  }
  return value.toLocaleString(lang, {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  });
}
