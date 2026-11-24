# Contribuer à signal-ecogaz-card

Merci de votre intérêt pour contribuer à ce projet ! Voici les lignes directrices pour participer.

## Démarrage rapide

1. Forkez le dépôt
2. Clonez votre fork : `git clone https://github.com/<votre-utilisateur>/signal-ecogaz-card.git`
3. Installez les dépendances : `npm install`
4. Créez une branche : `git checkout -b ma-fonctionnalité`

## Scripts disponibles

```bash
npm run build      # Construit la carte (rollup)
npm run lint       # Vérifie le code (eslint)
npm run typecheck  # Vérifie les types TypeScript
npm run test       # Lance les tests (vitest)
```

## Standards de code

- Le code est écrit en TypeScript et suit les règles ESLint configurées
- Les fichiers de tests se trouvent dans le dossier `test/`
- Les translations se trouvent dans `src/locales/`

## Pull Requests

1. Assurez-vous que les tests passent : `npm test`
2. Vérifiez le lint : `npm run lint`
3. Vérifiez les types : `npm run typecheck`
4. Construisez la carte : `npm run build`
5. Ouvrez une PR vers la branche `main`

## Signalement de bugs

Ouvrez une issue sur GitHub en décrivant :
- La version de la carte et de Home Assistant
- Les étapes pour reproduire le problème
- Le comportement attendu vs le comportement observé

## Licence

En contribuant, vous acceptez que vos contributions soient sous licence MIT.
