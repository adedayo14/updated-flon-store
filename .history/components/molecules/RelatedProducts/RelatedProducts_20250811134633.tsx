import React, { useEffect, useState, useCallback } from 'react';
import useCurrency from 'stores/currency';
import useCartStore from 'stores/cart';
import { denullifyArray } from 'lib/utils/denullify';
import { mapProducts } from 'lib/utils/products';
import getGQLClient from 'lib/graphql/client';
import Button from 'components/atoms/Button';
import { BUTTON_TYPE, BUTTON_STYLE } from 'types/shared/button';
import Image from 'components/atoms/SafeImage';
import Price from 'components/atoms/Price';
import type { CartItemProps } from 'components/molecules/CartItem';

export interface RelatedProductsProps {
  cartItems: CartItemProps[];
  className?: string;
}

interface SimpleProduct {
  id: string;
  title: string;
  price: number;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  href: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ 
  cartItems, 
  className 
}) => {
  const [suggestedProducts, setSuggestedProducts] = useState<SimpleProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const activeCurrency = useCurrency((store) => store.currency);
  const addToCart = useCartStore((store) => store.addToCart);

  // Check if there's a floss refill in the cart
  const hasFlossRefill = cartItems.some(item => 
    item.title.toLowerCase().includes('floss') && 
    (item.title.toLowerCase().includes('refill') || item.title.toLowerCase().includes('replacement'))
  );

  // Check for other product categories that might have related items
  const getRelatedProductQuery = useCallback(() => {
    if (hasFlossRefill) {
      return 'floss'; // Search for floss products when there's a refill
    }
    
    // For other items, get similar products based on the first item's category
    if (cartItems.length > 0) {
      const firstItem = cartItems[0];
      // Extract potential category keywords from product title
      const title = firstItem.title.toLowerCase();
      
      if (title.includes('serum')) return 'serum';
      if (title.includes('cleanser') || title.includes('cleaning')) return 'cleanser';
      if (title.includes('moisturizer') || title.includes('moisturising')) return 'moisturizer';
      if (title.includes('oil')) return 'oil';
      if (title.includes('vitamin')) return 'vitamin';
      if (title.includes('supplement')) return 'supplement';
      
      // Default to general skincare/health products
      return 'skincare';
    }
    
    return '';
  }, [cartItems, hasFlossRefill]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (cartItems.length === 0) {
        setSuggestedProducts([]);
        return;
      }

      const searchQuery = getRelatedProductQuery();
      if (!searchQuery) return;

      setLoading(true);
      
      try {
        const client = getGQLClient();
        const response = await client.searchProducts({ 
          searchTerm: searchQuery, 
          currency: activeCurrency.code
        });
        
        const products = denullifyArray(response.data.products?.results || []);
        const mappedProducts = mapProducts(products);
        
        // Filter out products that are already in the cart
        const cartProductIds = cartItems.map(item => item.productId);
        const filteredProducts = mappedProducts.filter(product => 
          !cartProductIds.includes(product.id)
        );
        
        // Convert to simple product format
        const simpleProducts: SimpleProduct[] = filteredProducts.map(product => ({
          id: product.id,
          title: product.title,
          price: product.price || 0,
          image: {
            src: product.image.src,
            alt: product.image.alt,
            width: product.image.width,
            height: product.image.height,
          },
          href: product.href,
        }));
        
        setSuggestedProducts(simpleProducts.slice(0, hasFlossRefill ? 3 : 2));
      } catch (error) {
        console.error('Error fetching related products:', error);
        setSuggestedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [cartItems, hasFlossRefill, activeCurrency.code, getRelatedProductQuery]);

  const handleAddToCart = async (product: SimpleProduct) => {
    try {
      await addToCart({
        productId: product.id,
        quantity: 1,
      }, { showCartAfter: false }); // Don't close cart when adding
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  if (loading) {
    return (
      <div className={`p-4 ${className ?? ''}`}>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-dividers rounded w-1/2"></div>
          <div className="flex space-x-4">
            <div className="h-20 w-20 bg-dividers rounded"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-dividers rounded"></div>
              <div className="h-3 bg-dividers rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (suggestedProducts.length === 0) {
    return null;
  }

  return (
    <div className={`border-t border-dividers pt-4 ${className ?? ''}`}>
      <h4 className="font-semibold text-primary mb-4">
        {hasFlossRefill 
          ? 'Complete your floss collection'
          : 'You might also like'
        }
      </h4>
      
      <div className="space-y-4">
        {suggestedProducts.map((product) => (
          <div key={product.id} className="flex items-center space-x-4 p-3 bg-background-secondary rounded-lg">
            <div className="flex-shrink-0">
              <Image
                src={product.image.src}
                alt={product.image.alt}
                width={60}
                height={60}
                layout="fixed"
                className="rounded-lg object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h5 className="text-sm font-semibold text-primary truncate">
                {product.title}
              </h5>
              <p className="text-sm font-semibold text-primary">
                <Price price={product.price} />
              </p>
            </div>
            
            <Button
              elType={BUTTON_TYPE.BUTTON}
              buttonStyle={BUTTON_STYLE.PRIMARY}
              small
              onClick={() => handleAddToCart(product)}
              className="flex-shrink-0"
            >
              Add
            </Button>
          </div>
        ))}
      </div>
      
      {hasFlossRefill && (
        <p className="text-xs text-body mt-3">
          Complete your oral care routine with our range of floss products
        </p>
      )}
    </div>
  );
};

export default RelatedProducts;
