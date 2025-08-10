import cookie from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getClientWithSessionToken } from 'lib/graphql/client';
import { denullifyArray } from 'lib/utils/denullify';
import { getCartItems } from 'lib/utils/cart';
import type { CartData, CartItemInput } from 'types/shared/cart';
import { sameSiteSettings } from 'utils/editor';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CartData>,
) {
  if (req.method && !['GET', 'PUT'].includes(req.method)) {
    return res.status(405).end('Method Not Allowed');
  }

  // Add caching headers for GET requests
  if (req.method === 'GET') {
    res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=60');
  }

  const client = getClientWithSessionToken(req.cookies);

  try {
    if (req.method === 'PUT') {
      const cartItemInput = req.body as CartItemInput;

      if (!cartItemInput?.productId || !cartItemInput?.quantity) {
        return res.status(400).end('Bad Request');
      }

      // Add timeout protection
      const addToCartPromise = Promise.race([
        client.addToCart({ cartItemInput }),
        new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error('Add to cart timeout')), 8000)
        )
      ]);

      const response = await addToCartPromise;
      const { addCartItem: cart } = response.data;

      if (!cart) {
        console.warn('Cart operation failed, returning empty cart');
        return res.status(200).json({
          data: {
            total: 0,
            items: [],
            checkoutUrl: '#',
          },
        });
      }

      const sessionToken = response.headers.get('X-Session');
      if (sessionToken) {
        res.setHeader(
          'Set-Cookie',
          cookie.serialize('sessionToken', sessionToken, {
            maxAge: 60 * 60 * 24 * 7,
            httpOnly: true,
            path: '/',
            ...sameSiteSettings,
          }),
        );
      }

      const cartItems = denullifyArray(getCartItems(cart));

      return res.status(200).json({
        data: {
          total: cart.grandTotal ?? 0,
          items: cartItems,
          checkoutUrl: cart.checkoutUrl ?? '#',
        },
      });
    } else if (req.method === 'GET') {
      // Add timeout protection
      const getCartPromise = Promise.race([
        client.getCart(),
        new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error('Get cart timeout')), 8000)
        )
      ]);

      const response = await getCartPromise;
      const { cart } = response.data;

      if (!cart) {
        console.warn('Cart not found, returning empty cart');
        return res.status(200).json({
          data: {
            total: 0,
            items: [],
            checkoutUrl: '#',
          },
        });
      }

      const sessionToken = response.headers.get('X-Session');
      if (sessionToken) {
        res.setHeader(
          'Set-Cookie',
          cookie.serialize('sessionToken', sessionToken, {
            maxAge: 60 * 60 * 24 * 7,
            httpOnly: true,
            path: '/',
            ...sameSiteSettings,
          }),
        );
      }

      const cartItems = denullifyArray(getCartItems(cart));

      return res.status(200).json({
        data: {
          total: cart.grandTotal ?? 0,
          items: cartItems,
          checkoutUrl: cart.checkoutUrl ?? '#',
        },
      });
    }
  } catch (error: any) {
    console.warn('Cart API error, returning empty cart:', error?.message || 'Unknown error');
    return res.status(200).json({
      data: {
        total: 0,
        items: [],
        checkoutUrl: '#',
      },
    });
  }
}
