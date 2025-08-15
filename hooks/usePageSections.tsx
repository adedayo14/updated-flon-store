import { ReactNode, useMemo } from 'react';
import {
  getComponentFromType,
  PageSection,
  PAGE_SECTION_COMPONENT,
} from 'lib/editor/sections';
import useLiveEditorUpdates from './useLiveEditorUpdates';

/**
 * Transforms the page sections array into a list of components
 * @param sections The array of page sections
 */
const usePageSections = (sections: PageSection[]): ReactNode[] => {
  const liveSections = useLiveEditorUpdates(sections);

  const pageSections = useMemo(() => {
    // 1) Remove any Reviews sections globally
    const withoutReviews = liveSections.filter(
      (s) => s.type !== PAGE_SECTION_COMPONENT.REVIEWS_SECTION,
    );

    // 2) Remove a trailing Divider (colored bar) at the end of the page
    const trimmed = [...withoutReviews];
    if (
      trimmed.length > 0 &&
      trimmed[trimmed.length - 1]?.type === PAGE_SECTION_COMPONENT.DIVIDER
    ) {
      trimmed.pop();
    }

  return trimmed.map((section) => {
      const { type, id, ...props } = section;

      const SectionComponent = getComponentFromType(type);

      if (!SectionComponent) return null;

  // Use a stable composite key to guarantee uniqueness across dynamic edits
  return <SectionComponent key={`${type}-${id}`} {...props} />;
    });
  }, [liveSections]);

  return pageSections;
};

export default usePageSections;
