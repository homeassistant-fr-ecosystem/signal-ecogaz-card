import { css } from 'lit';

export const cardStyles = css`
  :host {
    display: block;
  }

  ha-card {
    overflow: hidden;
  }

  .card {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 4px;
  }

  .header .name {
    font-size: 1.15rem;
    font-weight: 600;
    color: var(--primary-text-color);
  }

  /* ---------- tiles (expanded view) ---------- */
  .tiles {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 10px;
  }

  .tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 12px;
    border-radius: 12px;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
    cursor: pointer;
    transition: background 0.15s ease;
  }

  .tile:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.08));
  }

  .tile:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }

  .tile ha-icon {
    --mdc-icon-size: 36px;
    flex: none;
  }

  .tile ha-icon.tone-ok {
    color: var(--success-color, #43a047);
  }

  .tile ha-icon.tone-warn {
    color: var(--warning-color, #ffa600);
  }

  .tile ha-icon.tone-alarm {
    color: var(--error-color, #db4437);
  }

  .tile ha-icon.tone-unknown {
    color: var(--secondary-text-color);
  }

  .tile .day {
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--secondary-text-color);
    text-align: center;
  }

  .tile .value {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--primary-text-color);
    text-align: center;
  }

  .tile .value.tone-ok {
    color: var(--success-color, #43a047);
  }

  .tile .value.tone-warn {
    color: var(--warning-color, #ffa600);
  }

  .tile .value.tone-alarm {
    color: var(--error-color, #db4437);
  }

  .tile .value.tone-unknown {
    color: var(--secondary-text-color);
  }

  .tile .caption {
    font-size: 0.75rem;
    color: var(--secondary-text-color);
    text-align: center;
    margin-top: 4px;
  }

  /* ---------- compact view ---------- */
  .compact {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 16px;
    border-radius: 12px;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
  }

  .compact ha-icon {
    --mdc-icon-size: 28px;
    flex: none;
  }

  .compact ha-icon.tone-ok {
    color: var(--success-color, #43a047);
  }

  .compact ha-icon.tone-warn {
    color: var(--warning-color, #ffa600);
  }

  .compact ha-icon.tone-alarm {
    color: var(--error-color, #db4437);
  }

  .compact ha-icon.tone-unknown {
    color: var(--secondary-text-color);
  }

  .compact .value {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--primary-text-color);
  }

  .compact .value.tone-ok {
    color: var(--success-color, #43a047);
  }

  .compact .value.tone-warn {
    color: var(--warning-color, #ffa600);
  }

  .compact .value.tone-alarm {
    color: var(--error-color, #db4437);
  }

  .compact .value.tone-unknown {
    color: var(--secondary-text-color);
  }

  .compact .caption {
    font-size: 0.85rem;
    color: var(--secondary-text-color);
  }

  /* ---------- misc ---------- */
  .muted {
    color: var(--secondary-text-color);
  }

  .error-text {
    color: var(--error-color, #db4437);
    font-size: 0.9rem;
    padding: 16px;
  }

  @media (prefers-reduced-motion: reduce) {
    .tile {
      transition: none;
    }
  }
`;
