import RichText from 'components/atoms/RichText';
import Tag from 'components/atoms/Tag';
import StarRatingDisplay from 'components/atoms/StarRatingDisplay';
import useProductRating from 'hooks/useProductRating';
import type { ReactNode } from 'react';

export interface ProductHeaderProps {
  title: string;
  subtitle: string;
  description: string;
  tag?: ReactNode;
  productId?: string;
  onReviewsClick?: () => void;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({
  title,
  subtitle,
  description,
  tag,
  productId,
  onReviewsClick,
}) => {
  const { averageRating, totalReviews, loading } = useProductRating(productId || '');

  return (
    <div>
      <h5 className="font-headings text-md font-semibold uppercase text-body">
        {subtitle}
      </h5>
      <h3 className="mt-2 font-headings text-5xl font-semibold text-primary">
        {title}
      </h3>
      
      {/* Star Rating Display */}
      {productId && !loading && (
        <div className="mt-3">
          <StarRatingDisplay
            rating={averageRating}
            totalReviews={totalReviews}
            onClick={onReviewsClick}
            size="medium"
          />
        </div>
      )}
      
      {tag && <Tag className="my-4">{tag}</Tag>}
      <div className={`text-sm text-body ${tag ? 'lg:mt-2' : 'mt-2 lg:mt-3'}`}>
        <RichText content={description} />
      </div>
    </div>
  );
};

export default ProductHeader;
