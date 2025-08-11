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

  // Check if washcloth would be a good suggestion
  const shouldPromoteWashcloth = cartItems.some(item => {
    const title = item.title.toLowerCase();
    return title.includes('shaving') || title.includes('soap') || title.includes('dental') || 
           title.includes('menstrual') || title.includes('eco') || title.includes('bamboo');
  });

  // Get search query for related products - using actual FLON categories
  const getRelatedProductQuery = useCallback(() => {
    if (cartItems.length === 0) return '';
    
    const firstItem = cartItems[0];
    const title = firstItem.title.toLowerCase();
    
    // DENTAL category - always include washcloth as complementary
    if (title.includes('floss') || title.includes('dental') || title.includes('toothbrush') || title.includes('tooth')) {
      return 'washcloth sisal soap dental';
    }
    
    // SHAVING category - washcloth pairs well with shaving
    if (title.includes('razor') || title.includes('shaving') || title.includes('blade')) {
      return 'washcloth sisal soap shaving';
    }
    
    // BATH & BODY category - washcloth is core to this category
    if (title.includes('shea butter') || title.includes('makeup remover') || title.includes('bamboo') || 
        title.includes('pads') || title.includes('washcloth') || title.includes('sisal') || title.includes('soap')) {
      return 'washcloth sisal soap bath body';
    }
    
    // MENSTRUAL CUPS category - washcloth for hygiene
    if (title.includes('menstrual') || title.includes('cup') || title.includes('period')) {
      return 'washcloth sisal soap menstrual';
    }
    
    // GIFTS category - washcloth as eco-friendly gift
    if (title.includes('gift') || title.includes('eco') || title.includes('bottle') || title.includes('wrap')) {
      return 'washcloth sisal soap gifts eco';
    }
    
    // Default fallback - always include washcloth
    return 'washcloth sisal soap eco sustainable';
  }, [cartItems]);

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
        
        // Prioritize washcloth products - move them to the front
        const washclothProducts = simpleProducts.filter(product => 
          product.title.toLowerCase().includes('washcloth') || 
          product.title.toLowerCase().includes('sisal')
        );
        const otherProducts = simpleProducts.filter(product => 
          !product.title.toLowerCase().includes('washcloth') && 
          !product.title.toLowerCase().includes('sisal')
        );
        
        // Combine with washcloth products first, then others
        const prioritizedProducts = [...washclothProducts, ...otherProducts];
        
        setSuggestedProducts(prioritizedProducts.slice(0, 3)); // Always show max 3 products
      } catch (error) {
        console.error('Error fetching related products:', error);
        setSuggestedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [cartItems, currency.code, getRelatedProductQuery]);

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
      <div className={`${className ?? ''}`}>
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-dividers rounded w-1/3"></div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl border border-solid border-outline px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-dividers rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-dividers rounded"></div>
                  <div className="h-3 bg-dividers rounded w-1/2"></div>
                </div>
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
    <div className={`${className ?? ''}`}>
      <h4 className="font-headings text-sm font-semibold text-primary mb-4">
        RECOMMENDED FOR YOU
      </h4>
      
      <div className="space-y-3">
        {suggestedProducts.map((product) => (
          <div key={product.id} className="rounded-2xl border border-solid border-outline px-4 py-3">
            <div className="flex items-center gap-3">
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
                <h5 className="font-headings text-sm font-semibold text-primary truncate">
                  {product.title}
                </h5>
                <p className="text-sm font-semibold text-primary">
                  <Price price={product.price} />
                </p>
              </div>
              
              <button
                onClick={() => handleAddToCart(product)}
                className="flex-shrink-0 w-8 h-8 bg-orange-500 text-teal-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors border-2 border-teal-500 shadow-sm font-bold text-lg"
                aria-label={`Add ${product.title} to cart`}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
