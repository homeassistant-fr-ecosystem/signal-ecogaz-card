import { describe, expect, test } from 'vitest';
import { ecogazLevelInfo, ECOGAZ_LEVELS, ECOGAZ_LEVEL_UNKNOWN } from '../src/const';

describe('ecogazLevelInfo', () => {
  test('returns the correct info for each level', () => {
    expect(ecogazLevelInfo(1)).toEqual(ECOGAZ_LEVELS[1]);
    expect(ecogazLevelInfo(2)).toEqual(ECOGAZ_LEVELS[2]);
    expect(ecogazLevelInfo(3)).toEqual(ECOGAZ_LEVELS[3]);
    expect(ecogazLevelInfo(4)).toEqual(ECOGAZ_LEVELS[4]);
  });

  test('returns unknown for null level', () => {
    expect(ecogazLevelInfo(null)).toEqual(ECOGAZ_LEVEL_UNKNOWN);
  });

  test('returns unknown for out-of-range level', () => {
    expect(ecogazLevelInfo(99)).toEqual(ECOGAZ_LEVEL_UNKNOWN);
  });

  test('has correct tones', () => {
    expect(ECOGAZ_LEVELS[1].tone).toBe('ok');
    expect(ECOGAZ_LEVELS[2].tone).toBe('warn');
    expect(ECOGAZ_LEVELS[3].tone).toBe('alarm');
    expect(ECOGAZ_LEVELS[4].tone).toBe('alarm');
    expect(ECOGAZ_LEVEL_UNKNOWN.tone).toBe('unknown');
  });
});
