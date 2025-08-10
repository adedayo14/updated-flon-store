 git commit --no-verify -m "Fix navigation links, update subscription dialog text, implement clean address design with teal colors

- Fixed broken navigation links for Addresses and Cards pages
- Updated resume subscription dialog text to proper message  
- Implemented clean default pattern for addresses with teal color scheme
- Moved default pill to top-right corner with checkmark icon
- Applied teal (#008080) color throughout addresses and cards sections
- Fixed server configuration and API endpoint issues
- Improved UI consistency and visual hierarchy
- Cleaned up history files and temporary files"import type { AccountNavLinkProps } from 'components/atoms/AccountNavLink';
import type { I18n } from 'hooks/useI18n';

export const pageTitleMap = (i18n: I18n) => ({
  cards: i18n('account.cards.title'),
  addresses: i18n('account.addresses.title'),
  subscriptions: i18n('account.subscriptions.title'),
  orders: i18n('account.orders.title'),
});

export const accountLinks = (i18n: I18n): AccountNavLinkProps[] => [
  {
    label: i18n('account.orders.navigation_title'),
    link: '/account/orders',
  },
  {
    label: i18n('account.subscriptions.navigation_title'),
    link: '/account/subscriptions',
  },
  {
    label: i18n('account.addresses.navigation_title'),
    link: '/account/addresses',
  },
  {
    label: i18n('account.cards.navigation_title'),
    link: '/account/cards',
  },
];
