import React, { useEffect, useState, useCallback } from 'react';
import useCurrency from 'stores/currency';
import useCartStore from 'stores/cart';
import { denullifyArray } from 'lib/utils/denullify';
import { mapProducts } from 'lib/utils/products';
import getGQLClient from 'lib/graphql/client';
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
  const currency = useCurrency((store: any) => store.currency);
  const addToCart = useCartStore((store) => store.addToCart);

  // Check if there's a floss refill in the cart
  const hasFlossRefill = cartItems.some(item => 
    item.title.toLowerCase().includes('floss') && 
    (item.title.toLowerCase().includes('refill') || item.title.toLowerCase().includes('replacement'))
  );

  // Get search query for related products - prioritize same category as first item
  const getRelatedProductQuery = useCallback(() => {
    if (cartItems.length === 0) return '';
    
    const firstItem = cartItems[0];
    const title = firstItem.title.toLowerCase();
    
    // For floss refills, prioritize floss products
    if (hasFlossRefill) {
      return 'floss';
    }
    
    // Extract category keywords from the first item in cart for better matching
    if (title.includes('serum')) return 'serum';
    if (title.includes('cleanser') || title.includes('cleaning') || title.includes('wash')) return 'cleanser';
    if (title.includes('moisturizer') || title.includes('moisturising') || title.includes('cream')) return 'moisturizer';
    if (title.includes('oil') && !title.includes('toil')) return 'oil'; // avoid "toil" matches
    if (title.includes('toner') || title.includes('essence')) return 'toner';
    if (title.includes('mask') || title.includes('treatment')) return 'mask';
    if (title.includes('sunscreen') || title.includes('spf')) return 'sunscreen';
    if (title.includes('vitamin')) return 'vitamin';
    if (title.includes('supplement') || title.includes('capsule') || title.includes('tablet')) return 'supplement';
    if (title.includes('dental') || title.includes('tooth') || title.includes('oral') || title.includes('floss')) return 'oral care';
    if (title.includes('hair') || title.includes('shampoo') || title.includes('conditioner')) return 'hair';
    if (title.includes('body') && (title.includes('lotion') || title.includes('wash') || title.includes('cream'))) return 'body care';
    
    // Broader category fallbacks based on common skincare/health terms
    if (title.includes('anti') || title.includes('retinol') || title.includes('acid') || title.includes('peptide')) return 'skincare';
    if (title.includes('probiotic') || title.includes('wellness') || title.includes('health')) return 'health';
    
    // Default to skincare for beauty/cosmetic products
    return 'skincare';
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
          currency: currency.code
        });
        
        let products = denullifyArray(response.data.products?.results || []);
        
        // If no results found with specific search, try a broader search
        if (products.length === 0) {
          const broadResponse = await client.searchProducts({ 
            searchTerm: '', // Get all products
            currency: currency.code
          });
          products = denullifyArray(broadResponse.data.products?.results || []);
        }
        
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
        
        setSuggestedProducts(simpleProducts.slice(0, 3)); // Always show max 3 products
      } catch (error) {
        console.error('Error fetching related products:', error);
        setSuggestedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [cartItems, hasFlossRefill, currency.code, getRelatedProductQuery]);

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
      <div className={`border-t border-dividers pt-4 ${className ?? ''}`}>
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-dividers rounded w-1/3"></div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-3 p-3 bg-background-secondary rounded-lg">
              <div className="h-12 w-12 bg-dividers rounded"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-dividers rounded"></div>
                <div className="h-3 bg-dividers rounded w-1/2"></div>
              </div>
            </div>
          ))}
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
      
      <div className="space-y-3">
        {suggestedProducts.map((product) => (
          <div key={product.id} className="flex items-center space-x-3 p-3 bg-background-secondary rounded-lg">
            <div className="flex-shrink-0">
              <Image
                src={product.image.src}
                alt={product.image.alt}
                width={50}
                height={50}
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
            
            <button
              onClick={() => handleAddToCart(product)}
              className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors border-2 border-green-400 shadow-sm"
              aria-label={`Add ${product.title} to cart`}
            >
              +
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
