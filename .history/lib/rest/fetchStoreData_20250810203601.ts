// We have some requests that currently are not fully implemented in GraphQL API
// so we're using fetch to the REST storefront API in the meanwhile

const authorization = `Basic ${Buffer.from(
  process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY ?? '',
).toString('base64')}`;

const query =
  process.env.NEXT_PUBLIC_SWELL_EDITOR === 'true' ? '$preview=true' : '';

export const fetchStoreData = async (endpoint: string, locale = '') => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // Reduced from 15s to 10s for faster build failures

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SWELL_STORE_URL}${endpoint}?${encodeURI(query)}`,
      {
        headers: {
          authorization,
          'content-type': 'application/json',
          'x-locale': locale,
        },
        signal: controller.signal,
      },
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    console.warn('Store data fetch failed:', (error as Error)?.message || 'Unknown error');
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timed out');
    }
    throw error;
  }
};

export const fetchQuizData = (id: string, locale: string) =>
  fetchStoreData(`/api/content/quizzes/${id}/`, locale);

export const fetchPageData = (slug: string, locale: string) =>
  fetchStoreData(`/api/content/pages/${slug}/`, locale);
