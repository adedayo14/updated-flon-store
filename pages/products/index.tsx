import Head from 'next/head';
import { getProductListingData } from 'lib/shop/fetchingFunctions';
import type { GetStaticProps, NextPage } from 'next';
import type { ProductsLayoutProps } from 'components/layouts/ProductsLayout';
import ProductsLayout from 'components/layouts/ProductsLayout';
import { withMainLayout } from 'lib/utils/fetch_decorators';

const propsCallback: GetStaticProps<
  Omit<ProductsLayoutProps, 'products' | 'productCount'>
> = async (context) => {
  try {
    const { locale } = context;
    const data = await getProductListingData();

    return {
      props: {
        ...data,
        ...(locale ? { locale } : {}),
      },
      revalidate: 3600, // Cache for 1 hour - perfect for small stores with 15-20 products
    };
  } catch (error) {
    console.error('Error fetching product listing data:', error);
    // Return minimal fallback data
    return {
      props: {
        categories: [],
        settings: {
          showProductsPrice: true,
          showProductsDescription: true,
          showFeaturedCategories: false,
          productsPerRow: 4,
          enableQuickAdd: true,
        },
        attributeFilters: [],
        ...(context.locale ? { locale: context.locale } : {}),
      },
      revalidate: 60, // Retry more frequently if there's an error
    };
  }
};

export const getStaticProps = withMainLayout(propsCallback);

const ProductsPage: NextPage<ProductsLayoutProps> = (props) => (
  <div>
    <Head>
      <title>All products - FLON</title>
    </Head>

    <ProductsLayout {...props} breadcrumbText="All products" />
  </div>
);

export default ProductsPage;
