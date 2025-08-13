//components/molecules/ReviewFilters/ReviewFilters.tsx 
//for the filters on the product page.

import React, { useState, useEffect } from 'react';
import type { ReviewFiltersProps, ReviewFilters } from 'types/shared/reviews';

const ReviewFilters: React.FC<ReviewFiltersProps> = ({
  filters,
  onFiltersChange,
  className,
}) => {
  const [localFilters, setLocalFilters] = useState<ReviewFilters>(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = (key: keyof ReviewFilters, value: any) => {
    const newFilters = { 
      ...localFilters, 
      [key]: value,
      // Reset page to 1 when filters change (except when changing page itself)
      ...(key !== 'page' && { page: 1 })
    };
    console.log('ReviewFilters - Filter change:', { key, value, newFilters });
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  return (
    <div className={`flex items-center justify-between gap-4 flex-wrap ${className || ''}`}>
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Search */}
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search reviews"
            value={localFilters.search || ''}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-gray-400"
          />
          <button 
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={() => {
              // Trigger search on button click if needed
            }}
            title="Search reviews"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 19L14.65 14.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Rating Filter */}
        <div className="relative flex-shrink-0">
          <select
            value={localFilters.rating || ''}
            onChange={(e) => handleFilterChange('rating', e.target.value || undefined)}
            className="appearance-none pl-4 pr-10 py-2.5 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-gray-400 bg-white cursor-pointer"
            title="Filter by rating"
          >
            <option value="">RATING</option>
            <option value="5">5 stars</option>
            <option value="4">4 stars</option>
            <option value="3">3 stars</option>
            <option value="2">2 stars</option>
            <option value="1">1 star</option>
          </select>
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Sort By */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-sm font-medium">SORT BY:</span>
        <div className="relative">
          <select
            value={localFilters.sort_by || 'recent'}
            onChange={(e) => handleFilterChange('sort_by', e.target.value)}
            className="appearance-none pl-3 pr-8 py-1.5 text-sm focus:outline-none bg-transparent cursor-pointer"
            title="Sort reviews"
          >
            <option value="recent">Most Recent</option>
            <option value="rating_high">Highest Rating</option>
            <option value="rating_low">Lowest Rating</option>
          </select>
          <svg className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ReviewFilters;