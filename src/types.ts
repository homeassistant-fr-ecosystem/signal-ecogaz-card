/**
 * Minimal typings for the parts of the Home Assistant frontend this card uses.
 * The card is loaded by Home Assistant; `hass` is injected by the dashboard at runtime.
 */

export interface HassEntityAttributes {
  friendly_name?: string;
  icon?: string;
  unit_of_measurement?: string;
  indice_de_couleur?: number;
  timestamp?: string;
  [key: string]: unknown;
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: HassEntityAttributes;
  last_changed: string;
  last_updated: string;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  language: string;
  locale?: { language: string; number_format?: string; time_format?: string };
  callService(
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
    target?: { entity_id?: string | string[] },
  ): Promise<unknown>;
  formatEntityState?(stateObj: HassEntity): string;
  formatEntityName?(stateObj: HassEntity): string;
}

export interface SignalEcogazCardConfig {
  type?: string;
  entities?: string[];
  title?: string;
  show_labels?: boolean;
  compact?: boolean;
  language?: string;
  [key: string]: unknown;
}
