import { LitElement, html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import './signal-ecogaz-card-editor';

import { DOMAIN, VERSION, ecogazLevelInfo, dayLabelKey } from './const';
import { localize, pickLanguage, type SupportedLanguage, type TranslationKey } from './localize';
import { isAvailable } from './format';
import { cardStyles } from './styles';
import type { HomeAssistant, HassEntity, SignalEcogazCardConfig } from './types';

@customElement('signal-ecogaz-card')
export class SignalEcogazCard extends LitElement {
  static override styles = cardStyles;

  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _config!: SignalEcogazCardConfig;

  /** Entity states pushed by the `states` context; falls back to `hass.states`. */
  @state() private _states?: HomeAssistant['states'];

  private _unsubscribe?: () => void;

  static async getConfigElement(): Promise<HTMLElement> {
    return document.createElement('signal-ecogaz-card-editor');
  }

  static getStubConfig(
    _hass?: HomeAssistant,
    entities: string[] = [],
  ): SignalEcogazCardConfig {
    const ecogaz = (entities ?? []).filter((id) =>
      id.startsWith(`sensor.${DOMAIN}_`),
    );
    return {
      entities: ecogaz.length ? ecogaz : [`sensor.${DOMAIN}_level_in_0_days`],
      show_labels: true,
      compact: false,
    };
  }

  public setConfig(config: SignalEcogazCardConfig): void {
    if (!config) {
      throw new Error(localize(pickLanguage(this.hass), 'error.config_missing'));
    }
    this._config = { show_labels: true, compact: false, ...config };
  }

  public getCardSize(): number {
    return this._config.compact ? 2 : 6;
  }

  /**
   * Get the grid options for Lovelace card layout.
   * The card adapts to a 2-column grid by default, letting Home Assistant
   * size it appropriately within a view.
   * @returns Grid layout options
   */
  public getGridOptions(): { columns: number } {
    return { columns: 2 };
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._requestStatesContext();
  }

  public override disconnectedCallback(): void {
    this._unsubscribe?.();
    this._unsubscribe = undefined;
    super.disconnectedCallback();
  }

  private _requestStatesContext(): void {
    const event = new CustomEvent('context-request', {
      bubbles: true,
      composed: true,
    }) as CustomEvent & {
      context?: unknown;
      subscribe?: boolean;
      callback?: (
        states: HomeAssistant['states'],
        unsubscribe: () => void,
      ) => void;
    };
    event.context = 'states';
    event.subscribe = true;
    event.callback = (states, unsubscribe) => {
      this._unsubscribe = unsubscribe;
      this._states = states;
    };
    this.dispatchEvent(event);
  }

  protected override shouldUpdate(changed: PropertyValues): boolean {
    if (changed.has('_config')) {
      return true;
    }
    if (!this.hass) {
      return false;
    }
    if (!this._states) {
      return changed.has('hass') || changed.has('_states');
    }
    return changed.has('_states');
  }

  private get _stateMap(): Record<string, HassEntity> {
    return this._states ?? this.hass?.states ?? {};
  }

  private _lang(): SupportedLanguage {
    return pickLanguage(this.hass, this._config?.language);
  }

  private _t(key: TranslationKey, params?: Record<string, string | number>): string {
    return localize(this._lang(), key, params);
  }

  private _entity(entityId: string): HassEntity | undefined {
    return this._stateMap[entityId];
  }

  private _moreInfo(entityId?: string): void {
    if (!entityId) {
      return;
    }
    this.dispatchEvent(
      new CustomEvent('hass-more-info', {
        detail: { entityId },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _onClickableKey(event: KeyboardEvent, entityId?: string): void {
    if (!entityId) {
      return;
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this._moreInfo(entityId);
    }
  }

  protected override render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) {
      return nothing;
    }
    const entities = this._config.entities ?? [];
    if (!entities.length) {
      return html`
        <ha-card>
          <div class="error-text">${this._t('error.no_entities')}</div>
        </ha-card>
      `;
    }
    return html`
      <ha-card>
        <div class="card">
          <div class="header">
            <span class="name">
              ${this._config.title ?? this._t('card.default_title')}
            </span>
          </div>
          ${this._config.compact
            ? this._renderCompact(entities)
            : this._renderTiles(entities)}
        </div>
      </ha-card>
    `;
  }

  private _renderTiles(entities: string[]): TemplateResult {
    const tiles = entities.map((entityId, index) => {
      const entity = this._entity(entityId);
      const available = isAvailable(entity);
      const indice = available
        ? Number(entity!.attributes?.indice_de_couleur)
        : null;
      const info = ecogazLevelInfo(indice);
      return html`
        <div
          class="tile clickable"
          role="button"
          tabindex="0"
          @click=${() => this._moreInfo(entityId)}
          @keydown=${(e: KeyboardEvent) =>
            this._onClickableKey(e, entityId)}
        >
          <ha-icon class=${`tone-${info.tone}`} icon=${info.icon}></ha-icon>
          <div class="body">
            <span class="day">${this._t(dayLabelKey(index))}</span>
            <span class="value tone-${info.tone}">
              ${this._t(info.labelKey)}
            </span>
            ${available && this._config.show_labels
              ? html`<span class="caption">${entity!.state}</span>`
              : nothing}
          </div>
        </div>
      `;
    });
    return html`<div class="tiles">${tiles}</div>`;
  }

  private _renderCompact(entities: string[]): TemplateResult {
    const entity = this._entity(entities[0]);
    const available = isAvailable(entity);
    const indice = available
      ? Number(entity!.attributes?.indice_de_couleur)
      : null;
    const info = ecogazLevelInfo(indice);
    return html`
      <div class="compact">
        <ha-icon class=${`tone-${info.tone}`} icon=${info.icon}></ha-icon>
        <span class="value tone-${info.tone}">
          ${this._t(info.labelKey)}
        </span>
        <span class="caption">${this._t(dayLabelKey(0))}</span>
      </div>
    `;
  }
}

declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
      preview?: boolean;
      documentationURL?: string;
      getEntitySuggestion?: (
        hass: HomeAssistant,
        entityId: string,
      ) => { config: Record<string, unknown> } | null;
    }>;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'signal-ecogaz-card',
  name: 'Signal ÉcoGaz',
  description: 'Affiche le signal ÉcoGaz (RTE) jour par jour',
  preview: true,
  documentationURL: 'https://github.com/kamaradclimber/signal_ecogaz',
  getEntitySuggestion: (_hass: HomeAssistant, entityId: string) => {
    if (!entityId.startsWith(`sensor.${DOMAIN}_`)) {
      return null;
    }
    return { config: { type: 'custom:signal-ecogaz-card', entities: [entityId] } };
  },
});

console.info(
  `%c SIGNAL-ECOGAZ-CARD %c v${VERSION} `,
  'color:#fff;background:#ff6d00;font-weight:700;border-radius:4px 0 0 4px;',
  'color:#ff6d00;background:transparent;font-weight:700;border-radius:0 4px 4px 0;',
);
