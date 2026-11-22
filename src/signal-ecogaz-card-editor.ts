import { LitElement, css, html, nothing, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { localize, pickLanguage, type SupportedLanguage, type TranslationKey } from './localize';
import type { HomeAssistant, SignalEcogazCardConfig } from './types';

@customElement('signal-ecogaz-card-editor')
export class SignalEcogazCardEditor extends LitElement {
  static override styles = css`
    .form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 8px 0;
    }
    .field {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    label.title {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--secondary-text-color);
    }
    input[type='text'],
    input[type='number'] {
      font: inherit;
      padding: 10px 12px;
      border-radius: 8px;
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.2));
      background: var(--card-background-color);
      color: var(--primary-text-color);
    }
    .switch-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .checkbox-row {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 6px 0;
    }
    .checkbox-row input {
      accent-color: var(--primary-color);
      width: 18px;
      height: 18px;
    }
    .entities-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 8px;
      margin-top: 4px;
    }
    .entities-list input[type='text'] {
      width: 100%;
    }
    .hint {
      font-size: 0.78rem;
      color: var(--secondary-text-color);
    }
  `;

  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: SignalEcogazCardConfig;

  public setConfig(config: SignalEcogazCardConfig): void {
    this._config = config;
  }

  private get _lang(): SupportedLanguage {
    return pickLanguage(this.hass, this._config?.language);
  }

  private _t(key: TranslationKey): string {
    return localize(this._lang, key);
  }

  private _nameFor(id: string): string {
    const state = this.hass?.states[id];
    if (state && this.hass && typeof this.hass.formatEntityName === 'function') {
      const formatted = this.hass.formatEntityName(state);
      if (formatted) {
        return formatted;
      }
    }
    return state?.attributes.friendly_name ?? id;
  }

  /** Ecogaz entity candidates: every signal_ecogaz sensor the frontend knows about. */
  private get _entityOptions(): { id: string; name: string }[] {
    const hass = this.hass;
    if (!hass?.states) {
      return [];
    }
    return Object.keys(hass.states)
      .filter((id) => id.startsWith('sensor.signal_ecogaz_'))
      .map((id) => ({ id, name: this._nameFor(id) }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  private _update(patch: Partial<SignalEcogazCardConfig>): void {
    if (!this._config) {
      return;
    }
    const config: SignalEcogazCardConfig = { ...this._config, ...patch };
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _toggleEntity(entityId: string, checked: boolean): void {
    const current = this._config?.entities ?? [];
    const next = checked
      ? [...new Set([...current, entityId])]
      : current.filter((id) => id !== entityId);
    this._update({ entities: next });
  }

  protected override render(): TemplateResult | typeof nothing {
    if (!this._config) {
      return nothing;
    }
    const configured = this._config.entities ?? [];
    return html`
      <div class="form">
        <div class="field">
          <label class="title">${this._t('editor.entities')}</label>
          <div class="entities-list">
            ${this._entityOptions.map(
              (o) => html`
                <div class="checkbox-row">
                  <input
                    id=${`entity-${o.id}`}
                    type="checkbox"
                    .checked=${configured.includes(o.id)}
                    @change=${(ev: Event) =>
                      this._toggleEntity(o.id, (ev.target as HTMLInputElement).checked)}
                  />
                  <label for=${`entity-${o.id}`}>${o.name}</label>
                </div>
              `,
            )}
          </div>
          <span class="hint">${this._t('editor.entities_hint')}</span>
        </div>

        <div class="field">
          <label class="title">${this._t('editor.title')}</label>
          <input
            type="text"
            .value=${this._config.title ?? ''}
            placeholder=${this._t('editor.title_placeholder')}
            @input=${(ev: Event) =>
              this._update({ title: (ev.target as HTMLInputElement).value })}
          />
        </div>

        <div class="switch-row">
          <input
            id="show-labels"
            type="checkbox"
            .checked=${this._config.show_labels !== false}
            @change=${(ev: Event) =>
              this._update({
                show_labels: (ev.target as HTMLInputElement).checked,
              })}
          />
          <label for="show-labels">${this._t('editor.show_labels')}</label>
          <span class="hint">${this._t('editor.show_labels_hint')}</span>
        </div>

        <div class="switch-row">
          <input
            id="compact"
            type="checkbox"
            .checked=${this._config.compact === true}
            @change=${(ev: Event) =>
              this._update({
                compact: (ev.target as HTMLInputElement).checked,
              })}
          />
          <label for="compact">${this._t('editor.compact')}</label>
          <span class="hint">${this._t('editor.compact_hint')}</span>
        </div>

        <div class="field">
          <label class="title">${this._t('editor.language')}</label>
          <input
            type="text"
            .value=${this._config.language ?? ''}
            placeholder="en"
            @input=${(ev: Event) =>
              this._update({ language: (ev.target as HTMLInputElement).value || undefined })}
          />
          <span class="hint">${this._t('editor.language_hint')}</span>
        </div>
      </div>
    `;
  }
}
