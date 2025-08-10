import cookie from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getClientWithSessionToken } from 'lib/graphql/client';
import { denullifyArray } from 'lib/utils/denullify';
import { getCartItems } from 'lib/utils/cart';
import type { CartData } from 'types/shared/cart';
import { sameSiteSettings } from 'utils/editor';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CartData>,
) {
  if (req.method && !['PUT', 'DELETE'].includes(req.method)) {
    return res.status(405).end('Method Not Allowed');
  }

  const client = getClientWithSessionToken(req.cookies);

  try {
    if (req.method === 'PUT') {
      const { itemId, input } = req.body;

      if (!itemId || !input) {
        return res.status(400).end('Bad Request');
      }

      // Add timeout protection
      const updatePromise = Promise.race([
        client.updateCartItem({ input, itemId }),
        new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error('Update cart item timeout')), 8000)
        )
      ]);

      const response = await updatePromise;
      const { updateCartItem: cart } = response.data;

      if (!cart) {
        console.warn('Cart item update failed, returning empty cart');
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
    } else if (req.method === 'DELETE') {
      const { itemId } = req.body;

      if (!itemId) {
        return res.status(400).end('Bad Request');
      }

      // Add timeout protection
      const deletePromise = Promise.race([
        client.deleteCartItem({ itemId }),
        new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error('Delete cart item timeout')), 8000)
        )
      ]);

      const response = await deletePromise;
      const { deleteCartItem: cart } = response.data;

      if (!cart) {
        console.warn('Cart item deletion failed, returning empty cart');
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
    console.warn('Cart items API error, returning empty cart:', error?.message || 'Unknown error');
    return res.status(200).json({
      data: {
        total: 0,
        items: [],
        checkoutUrl: '#',
      },
    });
  }
}
