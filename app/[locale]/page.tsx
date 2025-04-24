import initTranslations from '../i18n';
import TranslationsProvider from '@/components/TranslationsProvider';

// Define namespaces needed for this page
const i18nNamespaces = ['home', 'common']; // Aggiunto 'common' per elementi condivisi (es. testo navbar)

// Questo è un Server Component
export default async function Home(props: { params: { locale: string } }) {
  const { locale } = await props.params;
  // Inizializza le traduzioni per il rendering lato server
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
              {t('header')}
            </h1>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {t('common:greeting')}
              </a>
              <a href="/about" className="text-sm/6 font-semibold text-gray-900">
                {t('page2')} <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </TranslationsProvider>
  );
}
