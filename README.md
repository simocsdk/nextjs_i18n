# nextjs_i18n

Questo progetto è configurato con Next.js 15 utilizzando l'App Router. L'internalizzazione (i18n) è gestita tramite una combinazione di `next-i18n-router` per il routing e `react-i18next` per la gestione delle traduzioni.

## Implementazione i18n

- **Configurazione:** La configurazione principale dell'i18n si trova in `i18nConfig.ts`, dove sono definiti i locale supportati (`it`, `en`) e il locale di default (`it`).
- **Middleware:** Il file `middleware.ts` utilizza `next-i18n-router` per intercettare le richieste e gestire il routing basato sul locale, aggiungendo il prefisso del locale all'URL (es. `/en/about`).
- **Caricamento Traduzioni:** La funzione `initTranslations` in `app/i18n.ts` è responsabile del caricamento asincrono dei file di traduzione (`.json`) dalla directory `locales` per un dato locale e namespace.
- **Provider Traduzioni:** Il componente client `components/TranslationsProvider.tsx` utilizza `react-i18next` per rendere disponibili le traduzioni caricate ai componenti figli tramite il contesto di React. Questo provider viene tipicamente utilizzato nei layout o nelle pagine che contengono componenti client che necessitano di traduzioni.
- **File di Traduzione:** I file di traduzione sono organizzati nella directory `locales`, con sottodirectory per ogni locale (es. `locales/it`, `locales/en`) e file `.json` per ogni namespace (es. `home.json`, `about.json`).

Questa configurazione garantisce che l'applicazione sia correttamente internalizzata, gestendo il routing per locale e fornendo un meccanismo efficiente per caricare e utilizzare le traduzioni nei componenti server e client.
