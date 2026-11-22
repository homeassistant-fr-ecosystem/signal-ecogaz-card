import type { TranslationKey } from './localize';

export const DOMAIN = 'signal_ecogaz';

export const VERSION = '0.1.0';

export const DEFAULT_ENTITIES: readonly string[] = [
  'sensor.signal_ecogaz_level_in_0_days',
  'sensor.signal_ecogaz_level_in_1_days',
  'sensor.signal_ecogaz_level_in_2_days',
  'sensor.signal_ecogaz_level_in_3_days',
  'sensor.signal_ecogaz_level_in_4_days',
];

export type EcogazTone = 'ok' | 'warn' | 'alarm' | 'unknown';

export interface EcogazLevelInfo {
  labelKey: TranslationKey;
  icon: string;
  tone: EcogazTone;
}

export const ECOGAZ_LEVELS: Record<number, EcogazLevelInfo> = {
  1: { labelKey: 'level.normal', icon: 'mdi:check-circle', tone: 'ok' },
  2: { labelKey: 'level.high', icon: 'mdi:alert', tone: 'warn' },
  3: { labelKey: 'level.tight', icon: 'mdi:power-plug-off', tone: 'alarm' },
  4: { labelKey: 'level.critical', icon: 'mdi:power-plug-off', tone: 'alarm' },
};

export const ECOGAZ_LEVEL_UNKNOWN: EcogazLevelInfo = {
  labelKey: 'level.unknown',
  icon: 'mdi:progress-question',
  tone: 'unknown',
};

export function ecogazLevelInfo(level: number | null): EcogazLevelInfo {
  if (level === null || !(level in ECOGAZ_LEVELS)) {
    return ECOGAZ_LEVEL_UNKNOWN;
  }
  return ECOGAZ_LEVELS[level];
}

export const DAY_LABEL_KEYS: readonly TranslationKey[] = [
  'day.today',
  'day.tomorrow',
  'day.in_two_days',
  'day.in_three_days',
  'day.in_four_days',
];

export function dayLabelKey(index: number): TranslationKey {
  return DAY_LABEL_KEYS[index] ?? 'day.unknown_day';
}
