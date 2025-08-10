import type { NextApiRequest, NextApiResponse } from 'next';
import { getClientWithSessionToken } from 'lib/graphql/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<undefined | string>,
) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const { name, currency } = req.body;

  if (!name || !currency) {
    return res.status(400).end('Bad Request');
  }

  try {
    const client = getClientWithSessionToken(req.cookies);

    // Add timeout protection for API calls
    const searchWithTimeout = Promise.race([
      client.searchProducts({
        searchTerm: name,
        currency,
      }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Search timeout')), 8000)
      )
    ]);

    const response = await searchWithTimeout as any;
    const products = response?.data?.products;

    if (products == null) {
      // Return empty results instead of 500 error
      console.warn('No products found for search:', name);
      return res.status(200).send(JSON.stringify({ products: [] }));
    }

    return res.status(200).send(JSON.stringify({ products }));
  } catch (error: any) {
    // Log error silently and return empty results instead of 500
    console.warn('Search products API error (returning empty results):', error?.message || 'Unknown error');
    return res.status(200).send(JSON.stringify({ products: [] }));
  }
}
