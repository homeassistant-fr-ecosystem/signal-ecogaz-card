# Signal ÉcoGaz Card

A Lovelace card for the Home Assistant integration
[signal_ecogaz](https://github.com/kamaradclimber/signal_ecogaz): it shows the
RTE ÉcoGaz signal (gas supply risk level) day by day, from today to D+4.

**English** · [Français](docs/fr/README.md)

The integration exposes one `sensor` per forecast day. This card displays each
day with a colour-coded level (normal / high / tight / critical) and an icon.

<p align="center">
  <img src="docs/images/card-preview.svg" alt="Schematic illustration of the Signal ÉcoGaz Card" width="400">
</p>

*Schematic illustration, not a screenshot: the card follows your Home Assistant theme and language.*

## Features

- **One tile per forecast day**: today, tomorrow, D+2, D+3, D+4.
- **Colour-coded level**: green / amber / orange / red, using Home Assistant theme colours.
- **Clickable tiles**: open the entity's more-info dialog.
- **Compact mode**: show only today's level on a single line.
- **Visual editor**: configure entities, title, labels and compact mode from the UI.
- **Robust**: missing or unavailable entities are shown gracefully.

## Installation

### Via HACS (recommended)

1. HACS → **Dashboards** → ⋮ → **Custom repositories**.
2. Add `https://github.com/homeassistant-fr-ecosystem/signal-ecogaz-card` with
   category **Lovelace / Dashboard**.
3. Search for **Signal ÉcoGaz Card** and install it.
4. The resource is added automatically. Otherwise, add it manually:
   `/hacsfiles/signal-ecogaz-card/signal-ecogaz-card.js`, type **JavaScript module**.

### Manual installation

1. Copy `dist/signal-ecogaz-card.js` into `<config>/www/`.
2. Settings → **Dashboards** → ⋮ → **Resources** → **Add**:
   URL `/local/signal-ecogaz-card.js`, type **JavaScript module**.
3. Reload the page (Ctrl+F5).

## Adding to a dashboard

### Visual UI editor (recommended)

1. Open your dashboard and click ⋮ → **Edit dashboard**.
2. Click **+ ADD CARD**.
3. Scroll to the **Custom** section and select **Signal ÉcoGaz Card**.
4. Pick the entities you want (by default all five forecast sensors) and set
   the options you want (title, labels, compact mode, language).
5. Click **SAVE**.

### YAML configuration

Alternatively, add the card directly in the dashboard's YAML editor:

```yaml
type: custom:signal-ecogaz-card
entities:
  - sensor.signal_ecogaz_level_in_0_days
  - sensor.signal_ecogaz_level_in_1_days
  - sensor.signal_ecogaz_level_in_2_days
  - sensor.signal_ecogaz_level_in_3_days
  - sensor.signal_ecogaz_level_in_4_days
title: Signal ÉcoGaz
```

## Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | `string` | **Required** | `custom:signal-ecogaz-card` |
| `entities` | `string[]` | all five sensors | The `signal_ecogaz` sensor entities to display. |
| `title` | `string` | "Signal ÉcoGaz" | Title shown at the top of the card. |
| `show_labels` | `bool` | `true` | Show the full text label under each level. |
| `compact` | `bool` | `false` | Show only today's level on a single line. |
| `language` | `string` | HA locale | Force the card language (`en`, `fr`). |

## Example usage

### Default view (all days, expanded)

```yaml
type: custom:signal-ecogaz-card
title: Signal ÉcoGaz
```

### Compact view (today only)

```yaml
type: custom:signal-ecogaz-card
title: ÉcoGaz aujourd'hui
compact: true
entities:
  - sensor.signal_ecogaz_level_in_0_days
show_labels: false
```

## Development

```bash
npm install
npm run build     # produces dist/signal-ecogaz-card.js
npm test          # unit tests (Vitest)
npm run typecheck # TypeScript check
npm run lint      # ESLint (src and test)
npm run watch     # continuous build
```

During development, point the Lovelace resource at `dist/signal-ecogaz-card.js`.

## License

MIT — see [LICENSE](LICENSE).
