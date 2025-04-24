# nextjs_i18n

This project is configured with Next.js 15 using the App Router. Internationalization (i18n) is managed through a combination of `next-i18n-router` for routing and `react-i18next` for translation management.

## i18n Implementation Details

- **Configuration:** The main i18n configuration is located in `i18nConfig.ts`, where supported locales (`it`, `en`) and the default locale (`it`) are defined.
- **Middleware:** The `middleware.ts` file uses `next-i18n-router` to intercept requests and handle locale-based routing, adding the locale prefix to the URL (e.g., `/en/about`).
- **Translation Loading:** The `initTranslations` asynchronous function in `app/i18n.ts` is responsible for asynchronously loading translation files (`.json`) from the `locales` directory for a given locale and namespace.
- **Translation Provider:** The `components/TranslationsProvider.tsx` client component uses `react-i18next` to make the loaded translations available to child components via React context. This provider is typically used in layouts or pages that contain client components requiring translations.
- **Translation Files:** Translation files are organized within the `locales` directory, with subdirectories for each locale (e.g., `locales/it`, `locales/en`) and `.json` files for each namespace (e.g., `home.json`, `about.json`, `menu.json`).

This setup ensures the application is correctly internationalized, handling locale routing and providing an efficient mechanism for loading and using translations in both server and client components.

### Using Translations in Server and Client Components

Managing translations in a Next.js application with the App Router and `react-i18next` requires a different approach depending on whether you are working with Server Components (like Pages and Layouts) or Client Components.

**1. Server Components (Pages and Layouts):**

*   In Server Components, you cannot use React hooks like `useTranslation`.
*   To load translations, use the asynchronous function `initTranslations` (defined in `app/i18n.ts`). This function takes the current `locale` (obtained from the page/layout `params`) and an array of required `namespaces`.
*   `initTranslations` returns an object containing the `t` function (to get translations) and the loaded `resources`.
*   It is crucial to load *all* namespaces required by the Server Component itself *and by all descendant Client Components* at this point.
*   The loaded `resources` are then passed to the `TranslationsProvider` Client Component.

Example (in a Server Component Layout or Page):

```typescript
import initTranslations from '@/app/i18n';
import TranslationsProvider from '@/components/TranslationsProvider';

// Include all namespaces needed for this component and its children
const i18nNamespaces = ['common', 'home', 'menu'];

export default async function MyServerComponent({ params: { locale } }) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
      {/* Use t() directly here for translations within the Server Component */}
      <h1>{t('common:pageTitle')}</h1>
      {/* Client Components that will use useTranslation */}
      <MyClientComponent />
    </TranslationsProvider>
  );
}
```

**2. Client Components:**

*   In Client Components, use the `useTranslation` hook provided by `react-i18next`.
*   This hook *requires* a `TranslationsProvider` to be present higher up in the component tree to supply the loaded translations.
*   `useTranslation` takes an array of `namespaces` that the Client Component needs as an argument. This does not load the namespaces but indicates which namespaces the component intends to use from the upstream provider.
*   The hook returns the `t` function and the `i18n` object.

Example (in a Client Component like `Navbar.tsx`):

```typescript
'use client';

import { useTranslation } from 'react-i18next';

export function MyClientComponent() {
  // Request 'menu' and 'common' namespaces from the upstream TranslationsProvider
  const { t } = useTranslation(['menu', 'common']);

  return (
    <nav>
      <a href="#">{t('menu:solutions')}</a>
      <a href="#">{t('menu:features')}</a>
    </nav>
  );
}
```

**In Summary:**

*   Load necessary namespaces in Server Components (Layouts/Pages) using `initTranslations` and pass them to the `TranslationsProvider`.
*   In Client Components, use `useTranslation` to access translations provided by the `TranslationsProvider`, specifying the namespaces that component will use.

This approach ensures translations are efficiently loaded server-side and made available to Client Components that need them, preventing hydration issues and ensuring translations are ready when Client Components mount.
