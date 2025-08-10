import { useEffect } from 'react';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import {
  Provider as ToastProvider,
  Viewport as ToastViewport,
} from '@radix-ui/react-toast';
import useNotificationStore from 'stores/notification';
import useLocaleStore from 'stores/locale';
import useCartStore from 'stores/cart';
import useSettingsStore from 'stores/settings';
import type { NextPageWithLayout } from 'types/shared/pages';
import '../styles/globals.css';
// import '../styles/theme.css'; // Temporarily disabled to fix build
import { getMainLayout } from 'lib/utils/layout_getters';
import Notification from 'components/atoms/Notification';
import {
  generateFontSizes,
  generateFontFamilyVars,
  generateFontWeightVars,
  generateFontLinks,
} from 'build-utils/fonts.mjs';
import { EDITOR_MESSAGE_TYPE } from 'types/editor';
import { getStoreSettings } from 'lib/shop/fetchingFunctions';
import { setPreviewMode } from 'lib/utils/previewMode';
import { sendMessage } from 'utils/editor';
import Analytics from './Analytics';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const notifications = useNotificationStore((state) => state.notifications);
  const [locales, setActiveLocale] = useLocaleStore((state) => [
    state.locales,
    state.setActiveLocale,
  ]);
  const [getCart, hideCart] = useCartStore((store) => [
    store.getCart,
    store.hideCart,
  ]);
  const [
    setSetting,
    setSettings,
    colors,
    fontSizeBase,
    fontSizeScaling,
    fontFamilies,
    imagesRadius,
  ] = useSettingsStore((state) => [
    state.setSetting,
    state.setSettings,
    state.settings?.colors,
    state.settings?.typography?.fontSize.base,
    state.settings?.typography?.fontSize.scaling,
    state.settings?.typography?.fontFamily,
    state.settings?.borders?.image.radius,
  ]);

  const router = useRouter();
  const { locale } = router;

  // Suppress console errors for better UX
  useEffect(() => {
    // Override console.error to filter out known API issues
    const originalConsoleError = console.error;
    console.error = (...args) => {
      const message = args[0]?.toString() || '';
      
      // Filter out known external/unfixable errors
      const suppressedErrors = [
        'Failed to load resource: net::ERR_BLOCKED_BY_CLIENT',
        'Refused to set unsafe header',
        'Unchecked runtime.lastError',
        'Usetiful plugin',
        'Facebook',
        'Google Ads',
        'A non-serializable value was detected',
        'GraphQL Error (Code: 502)',
        'GraphQL Error (Code: 500)',
        'GraphQL Error (Code: 504)',
      ];
      
      const shouldSuppress = suppressedErrors.some(error => 
        message.includes(error)
      );
      
      if (!shouldSuppress) {
        originalConsoleError.apply(console, args);
      }
    };

    return () => {
      console.error = originalConsoleError;
    };
  }, []);

  // sync the activeLocale with the router
  useEffect(() => {
    if (locale) {
      const newLocale = locales.find((myLocale) => myLocale.code === locale);
      if (newLocale) setActiveLocale(newLocale);

      sendMessage({
        type: 'locale.changed',
        details: {
          locale: newLocale?.code,
        },
      });
    }
  }, [locale, locales, setActiveLocale]);

  // Hide cart on route change
  useEffect(() => {
    router.events.on('routeChangeComplete', hideCart);

    return () => {
      router.events.off('routeChangeComplete', hideCart);
    };
  }, [router, hideCart]);

  // Lazy load cart - only when user interacts or visits cart-related pages
  useEffect(() => {
    // Only fetch cart immediately on cart-related pages or checkout
    const isCartRelatedPage = router.asPath.includes('/cart') || 
                             router.asPath.includes('/checkout') ||
                             router.asPath.includes('/account');
    
    if (isCartRelatedPage) {
      getCart();
    }
    // Otherwise, cart will be loaded on first interaction (add to cart, etc.)
  }, [getCart, router.asPath]);

  // Editor Live Updates
  useEffect(() => {
    let mounted = true;

    // Replacing complex data structures like a menu's
    // in a fine grained manner would add too much complexity,
    // so instead we choose to refetch the settings when these values
    // change.
    const shouldRefetch = (path: string) =>
      !path ||
      path.split('.').includes('menu') ||
      path.split('.').includes('logo');

    const langLocalizedSetting = (path: string) =>
      path.includes('lang.') && path.includes(`.$locale.${locale}`);

    async function updateSettings(event: MessageEvent) {
      if (!mounted) return;
      if (event.data.type === EDITOR_MESSAGE_TYPE.SETTINGS_UPDATE) {
        const { path, value } = event.data.details;
        if (shouldRefetch(path)) {
          const settings = await getStoreSettings(locale);
          setSettings(settings);
        } else if (langLocalizedSetting(path)) {
          const newPath = path
            .replace('.$locale', '')
            .replace(`.${locale}`, '');

          setSetting(newPath, value);
        } else {
          setSetting(path, value);
        }
      }
    }

    window.addEventListener('message', updateSettings);

    return () => {
      mounted = false;
      window.removeEventListener('message', updateSettings);
    };
  }, [setSetting, setSettings, locale]);

  useEffect(() => {
    if (!colors || !Object.keys(colors).length) return;
    const cssVars = new Map<string, string>();
    Object.entries(colors).forEach(([key, value]) => {
      if (value && typeof value === 'object') {
        Object.entries(value).forEach(([key2, value2]) => {
          cssVars.set(`--colors-${key}-${key2}`, value2);
        });
      } else {
        cssVars.set(`--colors-${key}`, value as string);
      }
    });
    cssVars.forEach((value, key) => {
      document.documentElement.style.setProperty(key, value);
    });
  }, [colors]);

  useEffect(() => {
    const base = fontSizeBase || 16;
    const scaling = fontSizeScaling || 1.125;

    const fontSizes = generateFontSizes(base, scaling);

    const cssVars = new Map<string, string>();

    Object.entries(fontSizes).forEach(([key, value]) => {
      cssVars.set(`--typography-font-size-${key}`, value);
    });

    cssVars.forEach((value, key) => {
      document.documentElement.style.setProperty(key, value);
    });
  }, [fontSizeBase, fontSizeScaling]);

  /* Update fonts on editor changes */
  useEffect(() => {
    const weights = generateFontWeightVars(fontFamilies);
    const families = generateFontFamilyVars(fontFamilies);
    const links = generateFontLinks(fontFamilies);
    /* Set font weight and font family CSS vars */
    const cssVars = [...weights, ...families].map((cssVar) =>
      cssVar.split(':').map((s: string) => s.trim().replace(/;/g, '')),
    );
    cssVars.forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
    /* Append font links to the head to download resources */
    const createLink = ({ rel, href }: { rel: string; href: string }) => {
      const link = document.createElement('link');
      link.rel = rel;
      link.href = href;
      return link;
    };
    links.forEach((link) => {
      const linkEl = createLink({ rel: 'stylesheet', href: link });
      document.head.appendChild(linkEl);
    });
  }, [fontFamilies]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--borders-image-radius',
      `${imagesRadius}px`,
    );
  }, [imagesRadius]);

  useEffect(() => {
    setPreviewMode(router.isPreview);
  }, [router]);

  // Default to the main layout if the page doesn't specify one
  const getLayout = Component.getLayout ?? getMainLayout;

  return (
    <>
      {/* <Head> */}
      <Analytics />
      {/* </Head> */}
      <ToastProvider>
        {getLayout(<Component {...pageProps} />)}
        {notifications.map((notification) => (
          <Notification
            id={notification.id}
            type={notification.type}
            message={notification.message}
            timeout={notification.timeout}
            key={notification.id}
          />
        ))}
        <ToastViewport className="fixed right-0 top-0 z-modal m-4 flex max-w-[500px] flex-col gap-2" />
      </ToastProvider>
    </>
  );
}

export default MyApp;
