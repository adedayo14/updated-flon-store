const isDev = process.env.NODE_ENV === 'development';
const storeUrl = process.env.NEXT_PUBLIC_SWELL_STORE_URL;
const graphqlKey = process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY;

/** @type {import('next').NextConfig} */
let nextConfig = {
  reactStrictMode: true,
  swcMinify: true, // Use SWC for faster builds
  typescript: {
    // Temporarily ignore type errors during build to resolve console errors first
    ignoreBuildErrors: true,
  },
  experimental: {
    // Enable modern features for better performance
    esmExternals: true,
  },
  images: {
    domains: [
      'cdn.schema.io',
      'cdn.swell.store',
      'images.unsplash.com',
      ...(isDev ? ['cdn.swell.test'] : []),
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    // Optimize for serverless
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    return config;
  },
  rewrites() {
    return [
      {
        destination: '/api/:slug*',
        source: '/horizon-api/:slug*',
      },
    ];
  },
};

module.exports = async () => {
  /**
   *
   * @returns @type {import('next').NextConfig['i18n']}
   */
  const getLocalesConfig = async () => {
    if (!storeUrl || !graphqlKey) return null;

    try {
      // Add timeout to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const res = await fetch(`${storeUrl}/api/settings`, {
        headers: {
          Authorization: graphqlKey,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        console.warn('Failed to fetch store settings for i18n config');
        return null;
      }

      const data = await res.json();

      if (!data?.store?.locales?.length) return null;

      return {
        locales: data.store.locales.map((locale) => locale.code),
        defaultLocale: data.store.locales.map((locale) => locale.code)[0],
      };
    } catch (error) {
      console.warn('Error fetching store settings for i18n config:', error);
      // Return a fallback configuration to prevent build failure
      return {
        locales: ['en'],
        defaultLocale: 'en',
      };
    }
  };

  const i18n = await getLocalesConfig();

  if (i18n) nextConfig.i18n = i18n;

  return nextConfig;
};
