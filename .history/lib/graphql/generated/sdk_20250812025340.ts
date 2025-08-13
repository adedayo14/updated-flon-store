import type { GraphQLClient } from 'graphql-request';
import type * as Dom from 'graphql-request/dist/types.dom';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSON: any;
  SafeNumber: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  addAccountAddress?: Maybe<SwellAccountAddress>;
  addAccountCard?: Maybe<SwellAccountCard>;
  addCartItem?: Maybe<SwellCart>;
  addSubscriptionItem?: Maybe<SwellSubscriptionItem>;
  applyCoupon?: Maybe<SwellCart>;
  applyGiftcard?: Maybe<SwellCart>;
  createAccount?: Maybe<SwellAccount>;
  createSubscription?: Maybe<SwellSubscription>;
  deleteAccountAddress?: Maybe<SwellAccountAddress>;
  deleteAccountCard?: Maybe<SwellAccountCard>;
  deleteCartItem?: Maybe<SwellCart>;
  deleteSubscriptionItem?: Maybe<SwellSubscriptionItem>;
  loginAccount?: Maybe<SuccessfulResponse>;
  logoutAccount?: Maybe<SuccessfulResponse>;
  recoverAccount?: Maybe<SuccessfulResponse>;
  removeCoupon?: Maybe<SwellCart>;
  removeGiftcard?: Maybe<SwellCart>;
  sendAccountRecovery?: Maybe<SuccessfulResponse>;
  submitCartOrder?: Maybe<SwellOrder>;
  updateAccount?: Maybe<SwellAccount>;
  updateAccountAddress?: Maybe<SwellAccountAddress>;
  updateAccountCard?: Maybe<SwellAccountCard>;
  updateCart?: Maybe<SwellCart>;
  updateCartItem?: Maybe<SwellCart>;
  updateSession?: Maybe<Session>;
  updateSubscription?: Maybe<SwellSubscription>;
  updateSubscriptionItem?: Maybe<SwellSubscriptionItem>;
};


export type MutationAddAccountAddressArgs = {
  input?: InputMaybe<SwellAccountAddressInput>;
};


export type MutationAddAccountCardArgs = {
  input?: InputMaybe<SwellAccountCardInput>;
};


export type MutationAddCartItemArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
  input?: InputMaybe<SwellCartItemInput>;
};


export type MutationAddSubscriptionItemArgs = {
  input?: InputMaybe<SwellSubscriptionItemInput>;
  subscriptionId?: InputMaybe<Scalars['String']>;
};


export type MutationApplyCouponArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
  code?: InputMaybe<Scalars['String']>;
};


export type MutationApplyGiftcardArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
  code?: InputMaybe<Scalars['String']>;
};


export type MutationCreateAccountArgs = {
  input?: InputMaybe<SwellAccountInput>;
};


export type MutationCreateSubscriptionArgs = {
  input?: InputMaybe<SwellSubscriptionInput>;
};


export type MutationDeleteAccountAddressArgs = {
  addressId?: InputMaybe<Scalars['String']>;
};


export type MutationDeleteAccountCardArgs = {
  cardId?: InputMaybe<Scalars['String']>;
};


export type MutationDeleteCartItemArgs = {
  itemId?: InputMaybe<Scalars['String']>;
};


export type MutationDeleteSubscriptionItemArgs = {
  itemId?: InputMaybe<Scalars['String']>;
  subscriptionId?: InputMaybe<Scalars['String']>;
};


export type MutationLoginAccountArgs = {
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  passwordToken?: InputMaybe<Scalars['String']>;
};


export type MutationRecoverAccountArgs = {
  password?: InputMaybe<Scalars['String']>;
  passwordResetKey?: InputMaybe<Scalars['String']>;
};


export type MutationRemoveGiftcardArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
  giftcardId?: InputMaybe<Scalars['String']>;
};


export type MutationSendAccountRecoveryArgs = {
  email?: InputMaybe<Scalars['String']>;
  passwordResetUrl?: InputMaybe<Scalars['String']>;
};


export type MutationSubmitCartOrderArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateAccountArgs = {
  input?: InputMaybe<SwellAccountInput>;
};


export type MutationUpdateAccountAddressArgs = {
  addressId?: InputMaybe<Scalars['String']>;
  input?: InputMaybe<SwellAccountAddressInput>;
};


export type MutationUpdateAccountCardArgs = {
  cardId?: InputMaybe<Scalars['String']>;
  input?: InputMaybe<SwellAccountCardInput>;
};


export type MutationUpdateCartArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
  input?: InputMaybe<SwellCartInput>;
};


export type MutationUpdateCartItemArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
  input?: InputMaybe<SwellCartItemInput>;
  itemId?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateSessionArgs = {
  input?: InputMaybe<SwellSessionInput>;
};


export type MutationUpdateSubscriptionArgs = {
  id?: InputMaybe<Scalars['String']>;
  input?: InputMaybe<SwellSubscriptionInput>;
};


export type MutationUpdateSubscriptionItemArgs = {
  input?: InputMaybe<SwellSubscriptionItemInput>;
  itemId?: InputMaybe<Scalars['String']>;
  subscriptionId?: InputMaybe<Scalars['String']>;
};

export type Page = {
  __typename?: 'Page';
  end?: Maybe<Scalars['Int']>;
  number?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
};

export type ProductPricing = {
  accountId?: InputMaybe<Scalars['String']>;
  quantity?: InputMaybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  account?: Maybe<SwellAccount>;
  attributeById?: Maybe<SwellAttribute>;
  attributes?: Maybe<SwellAttributes>;
  cart?: Maybe<SwellCart>;
  categories?: Maybe<SwellCategories>;
  categoryById?: Maybe<SwellCategory>;
  categoryBySlug?: Maybe<SwellCategory>;
  contentBlogById?: Maybe<SwellContentBlog>;
  contentBlogBySlug?: Maybe<SwellContentBlog>;
  contentBlogCategories?: Maybe<SwellContentBlogCategories>;
  contentBlogCategoryById?: Maybe<SwellContentBlogCategory>;
  contentBlogCategoryBySlug?: Maybe<SwellContentBlogCategory>;
  contentBlogs?: Maybe<SwellContentBlogs>;
  contentPageById?: Maybe<SwellContentPage>;
  contentPageBySlug?: Maybe<SwellContentPage>;
  contentPages?: Maybe<SwellContentPages>;
  menuSettings?: Maybe<SwellSettingsMenus>;
  orderById?: Maybe<SwellOrder>;
  orderByNumber?: Maybe<SwellOrder>;
  orders?: Maybe<SwellOrders>;
  paymentSettings?: Maybe<SwellSettingsPayments>;
  productById?: Maybe<SwellProduct>;
  productBySlug?: Maybe<SwellProduct>;
  products?: Maybe<SwellProducts>;
  session?: Maybe<Session>;
  storeSettings?: Maybe<SwellSettings>;
  subscriptionById?: Maybe<SwellSubscription>;
  subscriptionSettings?: Maybe<SwellSettingsSubscriptions>;
  subscriptions?: Maybe<SwellSubscriptions>;
};


export type QueryAccountArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
};


export type QueryAttributeByIdArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};


export type QueryAttributesArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<Scalars['JSON']>;
};


export type QueryCartArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
};


export type QueryCategoriesArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<Scalars['JSON']>;
};


export type QueryCategoryByIdArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};


export type QueryCategoryBySlugArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryContentBlogByIdArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
  _preview?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['String']>;
};


export type QueryContentBlogBySlugArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
  _preview?: InputMaybe<Scalars['Boolean']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryContentBlogCategoriesArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
  _preview?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<Scalars['JSON']>;
};


export type QueryContentBlogCategoryByIdArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
  _preview?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['String']>;
};


export type QueryContentBlogCategoryBySlugArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
  _preview?: InputMaybe<Scalars['Boolean']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryContentBlogsArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
  _preview?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<Scalars['JSON']>;
};


export type QueryContentPageByIdArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
  _preview?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['String']>;
};


export type QueryContentPageBySlugArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
  _preview?: InputMaybe<Scalars['Boolean']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryContentPagesArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
  _preview?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<Scalars['JSON']>;
};


export type QueryMenuSettingsArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
};


export type QueryOrderByIdArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};


export type QueryOrderByNumberArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
  number?: InputMaybe<Scalars['String']>;
};


export type QueryOrdersArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<Scalars['JSON']>;
};


export type QueryPaymentSettingsArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
};


export type QueryProductByIdArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
  _pricing?: InputMaybe<ProductPricing>;
  categories?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  category?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};


export type QueryProductBySlugArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
  _pricing?: InputMaybe<ProductPricing>;
  categories?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  category?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryProductsArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
  _pricing?: InputMaybe<ProductPricing>;
  categories?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  category?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<Scalars['JSON']>;
};


export type QueryStoreSettingsArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
};


export type QuerySubscriptionByIdArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};


export type QuerySubscriptionSettingsArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
};


export type QuerySubscriptionsArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type Session = {
  __typename?: 'Session';
  accountId?: Maybe<Scalars['String']>;
  cartId?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  publicKey?: Maybe<Scalars['String']>;
};

export type SuccessfulResponse = {
  __typename?: 'SuccessfulResponse';
  success?: Maybe<Scalars['Boolean']>;
};

/** Account */
export type SwellAccount = {
  __typename?: 'SwellAccount';
  /** Stored addresses used by an account */
  addresses?: Maybe<SwellAccountsAddresses>;
  balance?: Maybe<Scalars['SafeNumber']>;
  /** Default account billing information */
  billing?: Maybe<SwellAccountBilling>;
  /** Stored credit cards used by an account */
  cards?: Maybe<SwellAccountsCards>;
  dateCreated?: Maybe<Scalars['DateTime']>;
  dateFirstOrder?: Maybe<Scalars['DateTime']>;
  dateLastOrder?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  emailOptin?: Maybe<Scalars['Boolean']>;
  firstName?: Maybe<Scalars['String']>;
  group?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['JSON']>;
  /** Account Name */
  name?: Maybe<Scalars['String']>;
  orderCount?: Maybe<Scalars['Int']>;
  orderValue?: Maybe<Scalars['SafeNumber']>;
  orders?: Maybe<Array<Maybe<SwellOrder>>>;
  phone?: Maybe<Scalars['String']>;
  /** Default account shipping information */
  shipping?: Maybe<SwellAccountShipping>;
  subscriptions?: Maybe<Array<Maybe<SwellSubscription>>>;
  /** Account Type */
  type?: Maybe<Scalars['String']>;
  vatNumber?: Maybe<Scalars['String']>;
};


/** Account */
export type SwellAccountOrdersArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
};


/** Account */
export type SwellAccountSubscriptionsArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
};

/** Stored addresses used by an account */
export type SwellAccountAddress = {
  __typename?: 'SwellAccountAddress';
  active?: Maybe<Scalars['Boolean']>;
  /** Address Line 1 */
  address1?: Maybe<Scalars['String']>;
  /** Address Line 2 */
  address2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  dateCreated?: Maybe<Scalars['DateTime']>;
  dateUpdated?: Maybe<Scalars['DateTime']>;
  fingerprint?: Maybe<Scalars['String']>;
  /** First Name */
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  /** Last Name */
  lastName?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  parent?: Maybe<SwellAccount>;
  parentId?: Maybe<Scalars['ID']>;
  /** Phone Number */
  phone?: Maybe<Scalars['String']>;
  /** State/Province */
  state?: Maybe<Scalars['String']>;
  /** Zip/Postal Code */
  zip?: Maybe<Scalars['String']>;
};


/** Stored addresses used by an account */
export type SwellAccountAddressParentArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
};

export type SwellAccountAddressInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  address1?: InputMaybe<Scalars['String']>;
  address2?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  dateCreated?: InputMaybe<Scalars['DateTime']>;
  dateUpdated?: InputMaybe<Scalars['DateTime']>;
  fingerprint?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  lastName?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  parentId?: InputMaybe<Scalars['ID']>;
  phone?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  zip?: InputMaybe<Scalars['String']>;
};

/** Default account billing information */
export type SwellAccountBilling = {
  __typename?: 'SwellAccountBilling';
  accountCardId?: Maybe<Scalars['ID']>;
  /** Address Line 1 */
  address1?: Maybe<Scalars['String']>;
  /** Address Line 2 */
  address2?: Maybe<Scalars['String']>;
  /** Payment Card */
  card?: Maybe<SwellAccountBillingCard>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  /** Billing First Name */
  firstName?: Maybe<Scalars['String']>;
  /** Billing Last Name */
  lastName?: Maybe<Scalars['String']>;
  /** Payment Method */
  method?: Maybe<Scalars['String']>;
  /** Billing Name */
  name?: Maybe<Scalars['String']>;
  /** Phone Number */
  phone?: Maybe<Scalars['String']>;
  /** State/Province */
  state?: Maybe<Scalars['String']>;
  /** Zip/Postal Code */
  zip?: Maybe<Scalars['String']>;
};

/** Payment Card */
export type SwellAccountBillingCard = {
  __typename?: 'SwellAccountBillingCard';
  addressCheck?: Maybe<Scalars['String']>;
  brand?: Maybe<Scalars['String']>;
  cvcCheck?: Maybe<Scalars['String']>;
  displayBrand?: Maybe<Scalars['String']>;
  expMonth?: Maybe<Scalars['Int']>;
  expYear?: Maybe<Scalars['Int']>;
  gateway?: Maybe<Scalars['String']>;
  last4?: Maybe<Scalars['String']>;
  test?: Maybe<Scalars['Boolean']>;
  token?: Maybe<Scalars['String']>;
  zipCheck?: Maybe<Scalars['String']>;
};

export type SwellAccountBillingCardInput = {
  addressCheck?: InputMaybe<Scalars['String']>;
  brand?: InputMaybe<Scalars['String']>;
  cvcCheck?: InputMaybe<Scalars['String']>;
  displayBrand?: InputMaybe<Scalars['String']>;
  expMonth?: InputMaybe<Scalars['Int']>;
  expYear?: InputMaybe<Scalars['Int']>;
  gateway?: InputMaybe<Scalars['String']>;
  last4?: InputMaybe<Scalars['String']>;
  test?: InputMaybe<Scalars['Boolean']>;
  token?: InputMaybe<Scalars['String']>;
  zipCheck?: InputMaybe<Scalars['String']>;
};

export type SwellAccountBillingInput = {
  accountCardId?: InputMaybe<Scalars['ID']>;
  address1?: InputMaybe<Scalars['String']>;
  address2?: InputMaybe<Scalars['String']>;
  card?: InputMaybe<SwellAccountBillingCardInput>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  method?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  zip?: InputMaybe<Scalars['String']>;
};

/** Stored credit cards used by an account */
export type SwellAccountCard = {
  __typename?: 'SwellAccountCard';
  active?: Maybe<Scalars['Boolean']>;
  addressCheck?: Maybe<Scalars['String']>;
  billing?: Maybe<SwellAccountCardBilling>;
  brand?: Maybe<Scalars['String']>;
  cvcCheck?: Maybe<Scalars['String']>;
  dateCreated?: Maybe<Scalars['DateTime']>;
  dateUpdated?: Maybe<Scalars['DateTime']>;
  displayBrand?: Maybe<Scalars['String']>;
  expMonth?: Maybe<Scalars['Int']>;
  expYear?: Maybe<Scalars['Int']>;
  fingerprint?: Maybe<Scalars['String']>;
  gateway?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  /** Last 4 Digits */
  last4?: Maybe<Scalars['String']>;
  parent?: Maybe<SwellAccount>;
  parentId?: Maybe<Scalars['ID']>;
  test?: Maybe<Scalars['Boolean']>;
  token?: Maybe<Scalars['String']>;
  zipCheck?: Maybe<Scalars['String']>;
};


/** Stored credit cards used by an account */
export type SwellAccountCardParentArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
};

export type SwellAccountCardBilling = {
  __typename?: 'SwellAccountCardBilling';
  /** Address Line 1 */
  address1?: Maybe<Scalars['String']>;
  /** Address Line 2 */
  address2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  /** Billing Company Name */
  company?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  /** Billing Email */
  email?: Maybe<Scalars['String']>;
  /** Billing First Name */
  firstName?: Maybe<Scalars['String']>;
  /** Billing Last Name */
  lastName?: Maybe<Scalars['String']>;
  /** Billing Name */
  name?: Maybe<Scalars['String']>;
  /** Phone Number */
  phone?: Maybe<Scalars['String']>;
  /** State/Province */
  state?: Maybe<Scalars['String']>;
  vatNumber?: Maybe<Scalars['String']>;
  /** Zip/Postal Code */
  zip?: Maybe<Scalars['String']>;
};

export type SwellAccountCardBillingInput = {
  address1?: InputMaybe<Scalars['String']>;
  address2?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  company?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  vatNumber?: InputMaybe<Scalars['String']>;
  zip?: InputMaybe<Scalars['String']>;
};

export type SwellAccountCardInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  addressCheck?: InputMaybe<Scalars['String']>;
  billing?: InputMaybe<SwellAccountCardBillingInput>;
  brand?: InputMaybe<Scalars['String']>;
  cvcCheck?: InputMaybe<Scalars['String']>;
  dateCreated?: InputMaybe<Scalars['DateTime']>;
  dateUpdated?: InputMaybe<Scalars['DateTime']>;
  displayBrand?: InputMaybe<Scalars['String']>;
  expMonth?: InputMaybe<Scalars['Int']>;
  expYear?: InputMaybe<Scalars['Int']>;
  fingerprint?: InputMaybe<Scalars['String']>;
  gateway?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  last4?: InputMaybe<Scalars['String']>;
  parentId?: InputMaybe<Scalars['ID']>;
  test?: InputMaybe<Scalars['Boolean']>;
  token?: InputMaybe<Scalars['String']>;
  zipCheck?: InputMaybe<Scalars['String']>;
};

export type SwellAccountInput = {
  addresses?: InputMaybe<Array<InputMaybe<SwellAccountAddressInput>>>;
  billing?: InputMaybe<SwellAccountBillingInput>;
  cards?: InputMaybe<Array<InputMaybe<SwellAccountCardInput>>>;
  email?: InputMaybe<Scalars['String']>;
  emailOptin?: InputMaybe<Scalars['Boolean']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  metadata?: InputMaybe<Scalars['JSON']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  passwordResetKey?: InputMaybe<Scalars['String']>;
  passwordResetUrl?: InputMaybe<Scalars['String']>;
  passwordToken?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  shipping?: InputMaybe<SwellAccountShippingInput>;
  type?: InputMaybe<Scalars['String']>;
  vatNumber?: InputMaybe<Scalars['String']>;
};

/** Default account shipping information */
export type SwellAccountShipping = {
  __typename?: 'SwellAccountShipping';
  accountAddressId?: Maybe<Scalars['ID']>;
  /** Address Line 1 */
  address1?: Maybe<Scalars['String']>;
  /** Address Line 2 */
  address2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  /** Shipping First Name */
  firstName?: Maybe<Scalars['String']>;
  /** Shipping Last Name */
  lastName?: Maybe<Scalars['String']>;
  /** Shipping Name */
  name?: Maybe<Scalars['String']>;
  /** Phone Number */
  phone?: Maybe<Scalars['String']>;
  /** State/Province */
  state?: Maybe<Scalars['String']>;
  /** Zip/Postal Code */
  zip?: Maybe<Scalars['String']>;
};

export type SwellAccountShippingInput = {
  accountAddressId?: InputMaybe<Scalars['ID']>;
  address1?: InputMaybe<Scalars['String']>;
  address2?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  zip?: InputMaybe<Scalars['String']>;
};

export type SwellAccountsAddresses = {
  __typename?: 'SwellAccountsAddresses';
  count?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  pageCount?: Maybe<Scalars['Int']>;
  pages?: Maybe<Array<Maybe<Page>>>;
  results?: Maybe<Array<Maybe<SwellAccountAddress>>>;
};

export type SwellAccountsCards = {
  __typename?: 'SwellAccountsCards';
  count?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  pageCount?: Maybe<Scalars['Int']>;
  pages?: Maybe<Array<Maybe<Page>>>;
  results?: Maybe<Array<Maybe<SwellAccountCard>>>;
};

/** Attribute */
export type SwellAttribute = {
  __typename?: 'SwellAttribute';
  /** Default value used when entering a value for the attribute. */
  default?: Maybe<Scalars['JSON']>;
  /** Indicates if the category is available in the storefront category page filters. */
  filterable?: Maybe<Scalars['Boolean']>;
  /** When attribute `type=image` is indicated, the attribute contains multiple images. */
  multi?: Maybe<Scalars['Boolean']>;
  /** A human-friendly name for the attribute. */
  name?: Maybe<Scalars['String']>;
  /** Indicates if this attribute is searchable on the backend. */
  searchable?: Maybe<Scalars['Boolean']>;
  /** Input type used when entering a value for the attribute. */
  type?: Maybe<Scalars['String']>;
  /** List of the attribute's associated select options used with attribute `type` of `checkbox`, `radio`, or `select`. */
  values?: Maybe<Array<Maybe<Scalars['JSON']>>>;
  /** Indicates the attribute is visible to customers. */
  visible?: Maybe<Scalars['Boolean']>;
};

export type SwellAttributes = {
  __typename?: 'SwellAttributes';
  count?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  pageCount?: Maybe<Scalars['Int']>;
  pages?: Maybe<Array<Maybe<Page>>>;
  results?: Maybe<Array<Maybe<SwellAttribute>>>;
};

/** Cart */
export type SwellCart = {
  __typename?: 'SwellCart';
  /** Indicates the cart was abandoned after 3 hours of inactivity. After being marked as abandoned, this field is automatically set back to `false` after an update to items, billing, or shipping info. */
  abandoned?: Maybe<Scalars['Boolean']>;
  /** Number of abandoned cart notifications sent to the customer. */
  abandonedNotifications?: Maybe<Scalars['Int']>;
  account?: Maybe<SwellAccount>;
  /** Amount of customer's account credit applied for initial payment, if applicable. */
  accountCreditAmount?: Maybe<Scalars['SafeNumber']>;
  /** Indicates the customer's account credit is applied to the initial payment. */
  accountCreditApplied?: Maybe<Scalars['Boolean']>;
  /** ID of the customer's account. */
  accountId?: Maybe<Scalars['ID']>;
  /** Indicates the customer chose to save shipping and billing information to their account when submitting the order. */
  accountInfoSaved?: Maybe<Scalars['Boolean']>;
  /** Indicates the customer was logged into their account when placing the order. */
  accountLoggedIn?: Maybe<Scalars['Boolean']>;
  authTotal?: Maybe<Scalars['SafeNumber']>;
  /** The customer's billing details. Defaults to `account.billing`. Updating billing will also update the corresponding account billing object. */
  billing?: Maybe<SwellCartBilling>;
  captureTotal?: Maybe<Scalars['SafeNumber']>;
  /** Customer-facing unique identifier for the cart used in URLs and for abandoned cart recovery. */
  checkoutId?: Maybe<Scalars['String']>;
  /** URL to checkout for the cart, set automatically when the cart has at least `items`, `shipping`, or `billing` details set. Can also be set explicitly when creating or updating the cart for custom checkouts. */
  checkoutUrl?: Maybe<Scalars['String']>;
  /** Customer notes provided when placing the order, if any. */
  comments?: Maybe<Scalars['String']>;
  coupon?: Maybe<SwellCartCoupon>;
  /** Coupon code applied to the cart. */
  couponCode?: Maybe<Scalars['String']>;
  /** ID of the coupon applied to the cart. */
  couponId?: Maybe<Scalars['ID']>;
  currency?: Maybe<Scalars['String']>;
  /** Currency percentage used in calculating the fixed amount. */
  currencyRate?: Maybe<Scalars['SafeNumber']>;
  /** Date the cart was or will be marked as abandoned. */
  dateAbandoned?: Maybe<Scalars['DateTime']>;
  /** Next date the cart will be marked as abandoned when using a series of abandoned cart recovery notices (advanced cart recovery). */
  dateAbandonedNext?: Maybe<Scalars['DateTime']>;
  dateCreated?: Maybe<Scalars['DateTime']>;
  /** Total discount amount. */
  discountTotal?: Maybe<Scalars['SafeNumber']>;
  /** List of discounts applied to the cart. */
  discounts?: Maybe<Array<Maybe<SwellCartDiscount>>>;
  /** Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html) representing the user's preferred display currency, if applicable. */
  displayCurrency?: Maybe<Scalars['String']>;
  /** Locale code representing the user's preferred display locale, if applicable. */
  displayLocale?: Maybe<Scalars['String']>;
  /** Indicates the order is intended as a gift for the recipient. */
  gift?: Maybe<Scalars['Boolean']>;
  /** Optional message to include with the order when shipping to the recipient. */
  giftMessage?: Maybe<Scalars['String']>;
  /** Indicates the cart has at least one line item with     `delivery=giftcard`. */
  giftcardDelivery?: Maybe<Scalars['Boolean']>;
  /** Total payment amount applied to the order from `giftcards`. */
  giftcardTotal?: Maybe<Scalars['SafeNumber']>;
  /** List of gift cards applied to the cart. */
  giftcards?: Maybe<Array<Maybe<SwellCartGiftcard>>>;
  /** Grand total including items, shipping, and taxes. */
  grandTotal?: Maybe<Scalars['SafeNumber']>;
  /** Indicates the customer was not logged in when placing the order. */
  guest?: Maybe<Scalars['Boolean']>;
  /** Total discount applied to line items. */
  itemDiscount?: Maybe<Scalars['SafeNumber']>;
  /** Total quantity of all line items. */
  itemQuantity?: Maybe<Scalars['Int']>;
  /** Total shipping weight of all line items. */
  itemShipmentWeight?: Maybe<Scalars['SafeNumber']>;
  /** Total taxes applied to line items. */
  itemTax?: Maybe<Scalars['SafeNumber']>;
  /** Indicates line item prices include taxes. */
  itemTaxIncluded?: Maybe<Scalars['Boolean']>;
  /** List of line items describing the products ordered. */
  items?: Maybe<Array<Maybe<SwellCartItem>>>;
  /** Arbitrary data, typically set in a checkout flow to store custom values. See Frontend API for more details. */
  metadata?: Maybe<Scalars['JSON']>;
  order?: Maybe<SwellOrder>;
  /** ID of the the converted order, if applicable. */
  orderId?: Maybe<Scalars['ID']>;
  /** List of promotion IDs applied to the cart. */
  promotionIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
  promotions?: Maybe<SwellCartsPromotions>;
  /** List of purchase link errors applied to the cart. Added when clicking on the purchase link, if any resources are blocking the creation of the cart. */
  purchaseLinksErrors?: Maybe<Array<Maybe<SwellCartPurchaseLinksError>>>;
  /** Indicates the cart was recovered and converted to an order after being abandoned. */
  recovered?: Maybe<Scalars['Boolean']>;
  /** Indicates the cart has at least one line item with   `delivery=shipment`. */
  shipmentDelivery?: Maybe<Scalars['Boolean']>;
  /** Shipping discount applied by coupons, promotions, or custom logic. */
  shipmentDiscount?: Maybe<Scalars['SafeNumber']>;
  /** Total shipping price before discounts. */
  shipmentPrice?: Maybe<Scalars['SafeNumber']>;
  /** Object describing the shipping services and rates available for the cart. Shipping `country` must be set before retrieving shipping rates. */
  shipmentRating?: Maybe<SwellCartShipmentRating>;
  /** Shipping tax amount, if applicable. */
  shipmentTax?: Maybe<Scalars['SafeNumber']>;
  /** Indicates shipping total includes taxes, if applicable. */
  shipmentTaxIncluded?: Maybe<Scalars['Boolean']>;
  /** Total shipping price after discounts. */
  shipmentTotal?: Maybe<Scalars['SafeNumber']>;
  /** The customer's shipping details. Defaults to `account.shipping`. Updating shipping will also update the corresponding account shipping object. */
  shipping?: Maybe<SwellCartShipping>;
  /** Sum of all line items before discounts, taxes and shipping. */
  subTotal?: Maybe<Scalars['SafeNumber']>;
  subscription?: Maybe<SwellSubscription>;
  /** Indicates the cart has at least one line item with `delivery=subscription`. */
  subscriptionDelivery?: Maybe<Scalars['Boolean']>;
  /** Total with shipping and item taxes included. Allows for an alternate display style, as normally `sub_total` and `tax_total` are shown separately. */
  taxIncludedTotal?: Maybe<Scalars['SafeNumber']>;
  /** Total tax amount applied to the cart including line items and shipping. */
  taxTotal?: Maybe<Scalars['SafeNumber']>;
  /** List of taxes applied to the cart. */
  taxes?: Maybe<Array<Maybe<SwellCartTax>>>;
  /** Indicates the order is tax-exempt. Taxes will not be calculated or applied when true. */
  taxesFixed?: Maybe<Scalars['Boolean']>;
  /** Indicates the cart was made in test mode. */
  test?: Maybe<Scalars['Boolean']>;
  trial?: Maybe<Scalars['Boolean']>;
  trialAuthTotal?: Maybe<Scalars['SafeNumber']>;
  trialGrandTotal?: Maybe<Scalars['SafeNumber']>;
  trialItemDiscount?: Maybe<Scalars['SafeNumber']>;
  trialItemTax?: Maybe<Scalars['SafeNumber']>;
  trialSubTotal?: Maybe<Scalars['SafeNumber']>;
  trialTaxIncludedTotal?: Maybe<Scalars['SafeNumber']>;
};


/** Cart */
export type SwellCartAccountArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
};


/** Cart */
export type SwellCartOrderArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
};


/** Cart */
export type SwellCartSubscriptionArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
};

/** The customer's billing details. Defaults to `account.billing`. Updating billing will also update the corresponding account billing object. */
export type SwellCartBilling = {
  __typename?: 'SwellCartBilling';
  accountCardId?: Maybe<Scalars['ID']>;
  /** Address Line 1 */
  address1?: Maybe<Scalars['String']>;
  /** Address Line 2 */
  address2?: Maybe<Scalars['String']>;
  affirm?: Maybe<SwellCartBillingAffirm>;
  amazon?: Maybe<SwellCartBillingAmazon>;
  apple?: Maybe<SwellCartBillingApple>;
  bancontact?: Maybe<SwellCartBillingBancontact>;
  /** Payment Card */
  card?: Maybe<SwellCartBillingCard>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  /** Default Billing */
  default?: Maybe<Scalars['Boolean']>;
  /** Billing First Name */
  firstName?: Maybe<Scalars['String']>;
  google?: Maybe<SwellCartBillingGoogle>;
  ideal?: Maybe<SwellCartBillingIdeal>;
  intent?: Maybe<Scalars['JSON']>;
  klarna?: Maybe<SwellCartBillingKlarna>;
  /** Billing Last Name */
  lastName?: Maybe<Scalars['String']>;
  /** Payment Method */
  method?: Maybe<Scalars['String']>;
  /** Billing Name */
  name?: Maybe<Scalars['String']>;
  paypal?: Maybe<SwellCartBillingPaypal>;
  /** Phone Number */
  phone?: Maybe<Scalars['String']>;
  resolve?: Maybe<SwellCartBillingResolve>;
  /** State/Province */
  state?: Maybe<Scalars['String']>;
  /** Zip/Postal Code */
  zip?: Maybe<Scalars['String']>;
};

export type SwellCartBillingAffirm = {
  __typename?: 'SwellCartBillingAffirm';
  checkoutToken?: Maybe<Scalars['String']>;
};

export type SwellCartBillingAffirmInput = {
  checkoutToken?: InputMaybe<Scalars['String']>;
};

export type SwellCartBillingAmazon = {
  __typename?: 'SwellCartBillingAmazon';
  accessToken?: Maybe<Scalars['String']>;
  checkoutSessionId?: Maybe<Scalars['String']>;
  orderReferenceId?: Maybe<Scalars['String']>;
};

export type SwellCartBillingAmazonInput = {
  accessToken?: InputMaybe<Scalars['String']>;
  checkoutSessionId?: InputMaybe<Scalars['String']>;
  orderReferenceId?: InputMaybe<Scalars['String']>;
};

export type SwellCartBillingApple = {
  __typename?: 'SwellCartBillingApple';
  gateway?: Maybe<Scalars['String']>;
  nonce?: Maybe<Scalars['String']>;
};

export type SwellCartBillingAppleInput = {
  gateway?: InputMaybe<Scalars['String']>;
  nonce?: InputMaybe<Scalars['String']>;
};

export type SwellCartBillingBancontact = {
  __typename?: 'SwellCartBillingBancontact';
  source?: Maybe<Scalars['String']>;
};

export type SwellCartBillingBancontactInput = {
  source?: InputMaybe<Scalars['String']>;
};

/** Payment Card */
export type SwellCartBillingCard = {
  __typename?: 'SwellCartBillingCard';
  addressCheck?: Maybe<Scalars['String']>;
  brand?: Maybe<Scalars['String']>;
  cvcCheck?: Maybe<Scalars['String']>;
  displayBrand?: Maybe<Scalars['String']>;
  expMonth?: Maybe<Scalars['Int']>;
  expYear?: Maybe<Scalars['Int']>;
  gateway?: Maybe<Scalars['String']>;
  last4?: Maybe<Scalars['String']>;
  test?: Maybe<Scalars['Boolean']>;
  token?: Maybe<Scalars['String']>;
  zipCheck?: Maybe<Scalars['String']>;
};

export type SwellCartBillingCardInput = {
  addressCheck?: InputMaybe<Scalars['String']>;
  brand?: InputMaybe<Scalars['String']>;
  cvcCheck?: InputMaybe<Scalars['String']>;
  displayBrand?: InputMaybe<Scalars['String']>;
  expMonth?: InputMaybe<Scalars['Int']>;
  expYear?: InputMaybe<Scalars['Int']>;
  gateway?: InputMaybe<Scalars['String']>;
  last4?: InputMaybe<Scalars['String']>;
  test?: InputMaybe<Scalars['Boolean']>;
  token?: InputMaybe<Scalars['String']>;
  zipCheck?: InputMaybe<Scalars['String']>;
};

export type SwellCartBillingGoogle = {
  __typename?: 'SwellCartBillingGoogle';
  gateway?: Maybe<Scalars['String']>;
  nonce?: Maybe<Scalars['String']>;
};

export type SwellCartBillingGoogleInput = {
  gateway?: InputMaybe<Scalars['String']>;
  nonce?: InputMaybe<Scalars['String']>;
};

export type SwellCartBillingIdeal = {
  __typename?: 'SwellCartBillingIdeal';
  token?: Maybe<Scalars['String']>;
};

export type SwellCartBillingIdealInput = {
  token?: InputMaybe<Scalars['String']>;
};

export type SwellCartBillingInput = {
  accountCardId?: InputMaybe<Scalars['ID']>;
  address1?: InputMaybe<Scalars['String']>;
  address2?: InputMaybe<Scalars['String']>;
  affirm?: InputMaybe<SwellCartBillingAffirmInput>;
  amazon?: InputMaybe<SwellCartBillingAmazonInput>;
  apple?: InputMaybe<SwellCartBillingAppleInput>;
  bancontact?: InputMaybe<SwellCartBillingBancontactInput>;
  card?: InputMaybe<SwellCartBillingCardInput>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  default?: InputMaybe<Scalars['Boolean']>;
  firstName?: InputMaybe<Scalars['String']>;
  google?: InputMaybe<SwellCartBillingGoogleInput>;
  ideal?: InputMaybe<SwellCartBillingIdealInput>;
  intent?: InputMaybe<Scalars['JSON']>;
  klarna?: InputMaybe<SwellCartBillingKlarnaInput>;
  lastName?: InputMaybe<Scalars['String']>;
  method?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  paypal?: InputMaybe<SwellCartBillingPaypalInput>;
  phone?: InputMaybe<Scalars['String']>;
  resolve?: InputMaybe<SwellCartBillingResolveInput>;
  state?: InputMaybe<Scalars['String']>;
  zip?: InputMaybe<Scalars['String']>;
};

export type SwellCartBillingKlarna = {
  __typename?: 'SwellCartBillingKlarna';
  source?: Maybe<Scalars['String']>;
};

export type SwellCartBillingKlarnaInput = {
  source?: InputMaybe<Scalars['String']>;
};

export type SwellCartBillingPaypal = {
  __typename?: 'SwellCartBillingPaypal';
  authorizationId?: Maybe<Scalars['String']>;
  nonce?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['String']>;
  payerId?: Maybe<Scalars['String']>;
  paymentId?: Maybe<Scalars['String']>;
};

export type SwellCartBillingPaypalInput = {
  authorizationId?: InputMaybe<Scalars['String']>;
  nonce?: InputMaybe<Scalars['String']>;
  orderId?: InputMaybe<Scalars['String']>;
  payerId?: InputMaybe<Scalars['String']>;
  paymentId?: InputMaybe<Scalars['String']>;
};

export type SwellCartBillingResolve = {
  __typename?: 'SwellCartBillingResolve';
  chargeId?: Maybe<Scalars['String']>;
};

export type SwellCartBillingResolveInput = {
  chargeId?: InputMaybe<Scalars['String']>;
};

export type SwellCartCoupon = {
  __typename?: 'SwellCartCoupon';
  /** A brief description of the coupon, as it may be displayed to customers. */
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  /** A short descriptive name of the coupon. */
  name?: Maybe<Scalars['String']>;
};

/** List of discounts applied to the cart. */
export type SwellCartDiscount = {
  __typename?: 'SwellCartDiscount';
  amount?: Maybe<Scalars['SafeNumber']>;
  id?: Maybe<Scalars['String']>;
  rule?: Maybe<Scalars['JSON']>;
  /** References the related discount source object (e.g., promotion or coupon) */
  sourceId?: Maybe<Scalars['ID']>;
  type?: Maybe<Scalars['String']>;
};

/** List of gift cards applied to the cart. */
export type SwellCartGiftcard = {
  __typename?: 'SwellCartGiftcard';
  /** Amount of gift card credit to spend for automatic payment */
  amount?: Maybe<Scalars['SafeNumber']>;
  code?: Maybe<Scalars['String']>;
  codeFormatted?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  last4?: Maybe<Scalars['String']>;
};

export type SwellCartInput = {
  billing?: InputMaybe<SwellCartBillingInput>;
  comments?: InputMaybe<Scalars['String']>;
  couponCode?: InputMaybe<Scalars['String']>;
  items?: InputMaybe<Array<InputMaybe<SwellCartItemInput>>>;
  metadata?: InputMaybe<Scalars['JSON']>;
  shipmentRating?: InputMaybe<SwellCartShipmentRatingInput>;
  shipping?: InputMaybe<SwellCartShippingInput>;
};

/** List of line items describing the products ordered. */
export type SwellCartItem = {
  __typename?: 'SwellCartItem';
  bundleItems?: Maybe<Array<Maybe<SwellCartItemBundleItem>>>;
  /** Discount Amount */
  discountEach?: Maybe<Scalars['SafeNumber']>;
  discountTotal?: Maybe<Scalars['SafeNumber']>;
  id?: Maybe<Scalars['ID']>;
  metadata?: Maybe<Scalars['JSON']>;
  options?: Maybe<Array<Maybe<SwellCartItemOption>>>;
  origPrice?: Maybe<Scalars['SafeNumber']>;
  price?: Maybe<Scalars['SafeNumber']>;
  priceTotal?: Maybe<Scalars['SafeNumber']>;
  product?: Maybe<SwellProduct>;
  productId?: Maybe<Scalars['ID']>;
  purchaseOption?: Maybe<SwellCartItemPurchaseOption>;
  quantity?: Maybe<Scalars['Int']>;
  shipmentWeight?: Maybe<Scalars['SafeNumber']>;
  /** Tax Amount */
  taxEach?: Maybe<Scalars['SafeNumber']>;
  taxTotal?: Maybe<Scalars['SafeNumber']>;
  taxes?: Maybe<Array<Maybe<SwellCartItemTax>>>;
  variant?: Maybe<SwellProductVariant>;
  variantId?: Maybe<Scalars['ID']>;
};

export type SwellCartItemBundleItem = {
  __typename?: 'SwellCartItemBundleItem';
  id?: Maybe<Scalars['ID']>;
  options?: Maybe<Array<Maybe<SwellCartItemBundleItemOption>>>;
  product?: Maybe<SwellProduct>;
  productId?: Maybe<Scalars['ID']>;
  quantity?: Maybe<Scalars['Int']>;
  /** Bundled Quantity */
  quantityTotal?: Maybe<Scalars['Int']>;
  variant?: Maybe<SwellProductVariant>;
  variantId?: Maybe<Scalars['ID']>;
};

export type SwellCartItemBundleItemInput = {
  id?: InputMaybe<Scalars['ID']>;
  options?: InputMaybe<Array<InputMaybe<SwellCartItemBundleItemOptionInput>>>;
  productId?: InputMaybe<Scalars['ID']>;
  quantity?: InputMaybe<Scalars['Int']>;
  quantityTotal?: InputMaybe<Scalars['Int']>;
  variantId?: InputMaybe<Scalars['ID']>;
};

export type SwellCartItemBundleItemOption = {
  __typename?: 'SwellCartItemBundleItemOption';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['SafeNumber']>;
  shipmentWeight?: Maybe<Scalars['SafeNumber']>;
  value?: Maybe<Scalars['String']>;
  valueId?: Maybe<Scalars['ID']>;
  variant?: Maybe<Scalars['Boolean']>;
};

export type SwellCartItemBundleItemOptionInput = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['SafeNumber']>;
  shipmentWeight?: InputMaybe<Scalars['SafeNumber']>;
  value?: InputMaybe<Scalars['String']>;
  valueId?: InputMaybe<Scalars['ID']>;
  variant?: InputMaybe<Scalars['Boolean']>;
};

export type SwellCartItemInput = {
  bundleItems?: InputMaybe<Array<InputMaybe<SwellCartItemBundleItemInput>>>;
  id?: InputMaybe<Scalars['ID']>;
  metadata?: InputMaybe<Scalars['JSON']>;
  options?: InputMaybe<Array<InputMaybe<SwellCartItemOptionInput>>>;
  productId?: InputMaybe<Scalars['ID']>;
  purchaseOption?: InputMaybe<SwellCartItemPurchaseOptionInput>;
  quantity?: InputMaybe<Scalars['Int']>;
  variantId?: InputMaybe<Scalars['ID']>;
};

export type SwellCartItemOption = {
  __typename?: 'SwellCartItemOption';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['SafeNumber']>;
  shipmentWeight?: Maybe<Scalars['SafeNumber']>;
  value?: Maybe<Scalars['String']>;
  valueId?: Maybe<Scalars['ID']>;
  variant?: Maybe<Scalars['Boolean']>;
};

export type SwellCartItemOptionInput = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['SafeNumber']>;
  shipmentWeight?: InputMaybe<Scalars['SafeNumber']>;
  value?: InputMaybe<Scalars['String']>;
  valueId?: InputMaybe<Scalars['ID']>;
  variant?: InputMaybe<Scalars['Boolean']>;
};

export type SwellCartItemPurchaseOption = {
  __typename?: 'SwellCartItemPurchaseOption';
  authAmount?: Maybe<Scalars['SafeNumber']>;
  billingSchedule?: Maybe<SwellCartItemPurchaseOptionBillingSchedule>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  orderSchedule?: Maybe<SwellCartItemPurchaseOptionOrderSchedule>;
  planDescription?: Maybe<Scalars['String']>;
  planId?: Maybe<Scalars['ID']>;
  planName?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['SafeNumber']>;
  trialDays?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
};

export type SwellCartItemPurchaseOptionBillingSchedule = {
  __typename?: 'SwellCartItemPurchaseOptionBillingSchedule';
  interval?: Maybe<Scalars['String']>;
  intervalCount?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  trialDays?: Maybe<Scalars['Int']>;
};

export type SwellCartItemPurchaseOptionInput = {
  planDescription?: InputMaybe<Scalars['String']>;
  planId?: InputMaybe<Scalars['ID']>;
  planName?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type SwellCartItemPurchaseOptionOrderSchedule = {
  __typename?: 'SwellCartItemPurchaseOptionOrderSchedule';
  interval?: Maybe<Scalars['String']>;
  intervalCount?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type SwellCartItemTax = {
  __typename?: 'SwellCartItemTax';
  amount?: Maybe<Scalars['SafeNumber']>;
  id?: Maybe<Scalars['String']>;
};

export type SwellCartPromotion = {
  __typename?: 'SwellCartPromotion';
  /** Date the promo ends and is no longer available. When defined, the promo will not be applied after this date. */
  dateEnd?: Maybe<Scalars['DateTime']>;
  /** Date the promo is first available. When defined, the promo will not be valid until after this date and before `date_end`. */
  dateStart?: Maybe<Scalars['DateTime']>;
  /** A brief description of the promo, as it may be displayed to customers. */
  description?: Maybe<Scalars['String']>;
  /** A short descriptive name of the promo. */
  name?: Maybe<Scalars['String']>;
};

/** List of purchase link errors applied to the cart. Added when clicking on the purchase link, if any resources are blocking the creation of the cart. */
export type SwellCartPurchaseLinksError = {
  __typename?: 'SwellCartPurchaseLinksError';
  error?: Maybe<SwellCartPurchaseLinksErrorError>;
  id?: Maybe<Scalars['ID']>;
  purchaseLinkId?: Maybe<Scalars['String']>;
};

export type SwellCartPurchaseLinksErrorError = {
  __typename?: 'SwellCartPurchaseLinksErrorError';
  code?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  resource?: Maybe<SwellCartPurchaseLinksErrorErrorResource>;
};

export type SwellCartPurchaseLinksErrorErrorResource = {
  __typename?: 'SwellCartPurchaseLinksErrorErrorResource';
  id?: Maybe<Scalars['ID']>;
  model?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

/** Object describing the shipping services and rates available for the cart. Shipping `country` must be set before retrieving shipping rates. */
export type SwellCartShipmentRating = {
  __typename?: 'SwellCartShipmentRating';
  dateCreated?: Maybe<Scalars['DateTime']>;
  errors?: Maybe<Array<Maybe<SwellCartShipmentRatingError>>>;
  md5?: Maybe<Scalars['String']>;
  services?: Maybe<Array<Maybe<SwellCartShipmentRatingService>>>;
};

export type SwellCartShipmentRatingError = {
  __typename?: 'SwellCartShipmentRatingError';
  code?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type SwellCartShipmentRatingErrorInput = {
  code?: InputMaybe<Scalars['String']>;
  message?: InputMaybe<Scalars['String']>;
};

export type SwellCartShipmentRatingInput = {
  dateCreated?: InputMaybe<Scalars['DateTime']>;
  errors?: InputMaybe<Array<InputMaybe<SwellCartShipmentRatingErrorInput>>>;
  md5?: InputMaybe<Scalars['String']>;
  services?: InputMaybe<Array<InputMaybe<SwellCartShipmentRatingServiceInput>>>;
};

export type SwellCartShipmentRatingService = {
  __typename?: 'SwellCartShipmentRatingService';
  carrier?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  pickup?: Maybe<Scalars['Boolean']>;
  price?: Maybe<Scalars['SafeNumber']>;
  taxCode?: Maybe<Scalars['String']>;
};

export type SwellCartShipmentRatingServiceInput = {
  carrier?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  pickup?: InputMaybe<Scalars['Boolean']>;
  price?: InputMaybe<Scalars['SafeNumber']>;
  taxCode?: InputMaybe<Scalars['String']>;
};

/** The customer's shipping details. Defaults to `account.shipping`. Updating shipping will also update the corresponding account shipping object. */
export type SwellCartShipping = {
  __typename?: 'SwellCartShipping';
  accountAddressId?: Maybe<Scalars['ID']>;
  /** Address Line 1 */
  address1?: Maybe<Scalars['String']>;
  /** Address Line 2 */
  address2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  /** Default Shipping */
  default?: Maybe<Scalars['Boolean']>;
  /** Shipping First Name */
  firstName?: Maybe<Scalars['String']>;
  /** Shipping Last Name */
  lastName?: Maybe<Scalars['String']>;
  /** Shipping Name */
  name?: Maybe<Scalars['String']>;
  /** Phone Number */
  phone?: Maybe<Scalars['String']>;
  pickup?: Maybe<Scalars['Boolean']>;
  /** Shipping Price */
  price?: Maybe<Scalars['SafeNumber']>;
  /** Shipping Service ID */
  service?: Maybe<Scalars['String']>;
  /** Shipping Service Name */
  serviceName?: Maybe<Scalars['String']>;
  /** State/Province */
  state?: Maybe<Scalars['String']>;
  /** Zip/Postal Code */
  zip?: Maybe<Scalars['String']>;
};

export type SwellCartShippingInput = {
  accountAddressId?: InputMaybe<Scalars['ID']>;
  address1?: InputMaybe<Scalars['String']>;
  address2?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  default?: InputMaybe<Scalars['Boolean']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  pickup?: InputMaybe<Scalars['Boolean']>;
  price?: InputMaybe<Scalars['SafeNumber']>;
  service?: InputMaybe<Scalars['String']>;
  serviceName?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  zip?: InputMaybe<Scalars['String']>;
};

/** List of taxes applied to the cart. */
export type SwellCartTax = {
  __typename?: 'SwellCartTax';
  amount?: Maybe<Scalars['SafeNumber']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  priority?: Maybe<Scalars['Int']>;
  rate?: Maybe<Scalars['SafeNumber']>;
  shipping?: Maybe<Scalars['Boolean']>;
};

export type SwellCartsPromotions = {
  __typename?: 'SwellCartsPromotions';
  count?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  pageCount?: Maybe<Scalars['Int']>;
  pages?: Maybe<Array<Maybe<Page>>>;
  results?: Maybe<Array<Maybe<SwellCartPromotion>>>;
};

export type SwellCategories = {
  __typename?: 'SwellCategories';
  count?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  pageCount?: Maybe<Scalars['Int']>;
  pages?: Maybe<Array<Maybe<Page>>>;
  results?: Maybe<Array<Maybe<SwellCategory>>>;
};

/** Category */
export type SwellCategory = {
  __typename?: 'SwellCategory';
  children?: Maybe<Array<Maybe<SwellCategory>>>;
  content?: Maybe<SwellCategoryContent>;
  /** A long-form description of the category. Can contain HTML or other markup languages. */
  description?: Maybe<Scalars['String']>;
  /** Image depicting the category. */
  image?: Maybe<SwellCategoryImage>;
  /** List of images depicting the category. */
  images?: Maybe<Array<Maybe<SwellCategoryImage>>>;
  /** Page description used for search engine optimization purposes. */
  metaDescription?: Maybe<Scalars['String']>;
  /** Page keywords used for search engine optimization purposes. */
  metaKeywords?: Maybe<Scalars['String']>;
  /** Page title used to override product name in storefronts. */
  metaTitle?: Maybe<Scalars['String']>;
  /** A human-friendly name for the category. */
  name?: Maybe<Scalars['String']>;
  parent?: Maybe<SwellCategory>;
  /** ID of the parent category, if applicable. */
  parentId?: Maybe<Scalars['ID']>;
  products?: Maybe<Array<Maybe<SwellProduct>>>;
  /** Unique identifier typically used in URLs. Defaults to `name` converted to lowercase and hyphenated. If the category has a parent, the default slug will be prefixed with the parent slug. Maximum length of 1,000 characters. */
  slug?: Maybe<Scalars['String']>;
  /** Position of the category in a list. */
  sort?: Maybe<Scalars['Int']>;
  /** Default product sorting applied when retrieving products using the `category` or `categories` filter. Can be one of `popularity`, `price_asc`, `price_desc`, `date_asc`, `date_desc`. If not specified, products are sorted by their manually defined `sort` value. */
  sorting?: Maybe<Scalars['String']>;
  /** ID of an alternate theme template used to render this category in a storefront, if applicable. */
  themeTemplate?: Maybe<Scalars['String']>;
  top?: Maybe<SwellCategory>;
  /** ID of the top level category in the hierarchy. */
  topId?: Maybe<Scalars['ID']>;
};


/** Category */
export type SwellCategoryChildrenArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
};


/** Category */
export type SwellCategoryParentArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
};


/** Category */
export type SwellCategoryProductsArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
};


/** Category */
export type SwellCategoryTopArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
};

export type SwellCategoryContent = {
  __typename?: 'SwellCategoryContent';
  enableQuickAdd?: Maybe<Scalars['Boolean']>;
  featuredCategories?: Maybe<Array<Maybe<SwellCategoryContentFeaturedCategory>>>;
  productsPerRow?: Maybe<Scalars['String']>;
  showFeaturedCategories?: Maybe<Scalars['Boolean']>;
  showProductsDescription?: Maybe<Scalars['Boolean']>;
  showProductsPrice?: Maybe<Scalars['Boolean']>;
};

export type SwellCategoryContentFeaturedCategory = {
  __typename?: 'SwellCategoryContentFeaturedCategory';
  category?: Maybe<SwellCategory>;
  categoryId?: Maybe<Scalars['ID']>;
  id?: Maybe<Scalars['ID']>;
};


export type SwellCategoryContentFeaturedCategoryCategoryArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
};

/** List of images depicting the category. */
export type SwellCategoryImage = {
  __typename?: 'SwellCategoryImage';
  caption?: Maybe<Scalars['String']>;
  file?: Maybe<SwellCategoryImageFile>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type SwellCategoryImageFile = {
  __typename?: 'SwellCategoryImageFile';
  contentType?: Maybe<Scalars['String']>;
  data?: Maybe<Scalars['JSON']>;
  dateUploaded?: Maybe<Scalars['DateTime']>;
  filename?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  length?: Maybe<Scalars['Int']>;
  md5?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['JSON']>;
  private?: Maybe<Scalars['Boolean']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
};

/** Blog */
export type SwellContentBlog = {
  __typename?: 'SwellContentBlog';
  authorId?: Maybe<Scalars['ID']>;
  categoryId?: Maybe<Scalars['ID']>;
  content?: Maybe<Scalars['String']>;
  dateCreated?: Maybe<Scalars['DateTime']>;
  /** Publish Date */
  datePublished?: Maybe<Scalars['DateTime']>;
  dateUpdated?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['ID']>;
  image?: Maybe<SwellContentBlogImage>;
  metaDescription?: Maybe<Scalars['String']>;
  metaKeywords?: Maybe<Scalars['String']>;
  /** Page Title */
  metaTitle?: Maybe<Scalars['String']>;
  published?: Maybe<Scalars['Boolean']>;
  slug?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** ID of an alternate theme template used to render this blog in a storefront, if applicable. */
  themeTemplate?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type SwellContentBlogCategories = {
  __typename?: 'SwellContentBlogCategories';
  count?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  pageCount?: Maybe<Scalars['Int']>;
  pages?: Maybe<Array<Maybe<Page>>>;
  results?: Maybe<Array<Maybe<SwellContentBlogCategory>>>;
};

/** Blog category */
export type SwellContentBlogCategory = {
  __typename?: 'SwellContentBlogCategory';
  dateCreated?: Maybe<Scalars['DateTime']>;
  dateUpdated?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['ID']>;
  metaDescription?: Maybe<Scalars['String']>;
  metaKeywords?: Maybe<Scalars['String']>;
  /** Page Title */
  metaTitle?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type SwellContentBlogImage = {
  __typename?: 'SwellContentBlogImage';
  file?: Maybe<SwellContentBlogImageFile>;
};

export type SwellContentBlogImageFile = {
  __typename?: 'SwellContentBlogImageFile';
  contentType?: Maybe<Scalars['String']>;
  data?: Maybe<Scalars['JSON']>;
  dateUploaded?: Maybe<Scalars['DateTime']>;
  filename?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  length?: Maybe<Scalars['Int']>;
  md5?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['JSON']>;
  private?: Maybe<Scalars['Boolean']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
};

export type SwellContentBlogs = {
  __typename?: 'SwellContentBlogs';
  count?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  pageCount?: Maybe<Scalars['Int']>;
  pages?: Maybe<Array<Maybe<Page>>>;
  results?: Maybe<Array<Maybe<SwellContentBlog>>>;
};

/** Page */
export type SwellContentPage = {
  __typename?: 'SwellContentPage';
  content?: Maybe<Scalars['String']>;
  dateCreated?: Maybe<Scalars['DateTime']>;
  datePublished?: Maybe<Scalars['DateTime']>;
  dateUpdated?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['ID']>;
  metaDescription?: Maybe<Scalars['String']>;
  metaKeywords?: Maybe<Scalars['String']>;
  metaTitle?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  published?: Maybe<Scalars['Boolean']>;
  sections?: Maybe<Array<Maybe<SwellContentPageSections>>>;
  slug?: Maybe<Scalars['String']>;
  /** ID of an alternate theme template used to render this page in a storefront, if applicable. */
  themeTemplate?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type SwellContentPageSectionCategoriesPreview = {
  __typename?: 'SwellContentPageSectionCategoriesPreview';
  backgroundColor?: Maybe<Scalars['String']>;
  categories?: Maybe<SwellContentPageSectionCategoriesPreviewCategories>;
  columns?: Maybe<Scalars['Int']>;
  horizontalSpacing?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  imageLayout?: Maybe<Scalars['String']>;
  showCategoryDescription?: Maybe<Scalars['Boolean']>;
  type?: Maybe<Scalars['String']>;
  verticalSpacing?: Maybe<Scalars['String']>;
};

export type SwellContentPageSectionCategoriesPreviewCategories = {
  __typename?: 'SwellContentPageSectionCategoriesPreviewCategories';
  count?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  pageCount?: Maybe<Scalars['Int']>;
  pages?: Maybe<Array<Maybe<Page>>>;
  results?: Maybe<Array<Maybe<SwellContentPageSectionCategoriesPreviewCategory>>>;
};

export type SwellContentPageSectionCategoriesPreviewCategory = {
  __typename?: 'SwellContentPageSectionCategoriesPreviewCategory';
  category?: Maybe<SwellCategory>;
  categoryId?: Maybe<Scalars['String']>;
};


export type SwellContentPageSectionCategoriesPreviewCategoryCategoryArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
};

export type SwellContentPageSectionDivider = {
  __typename?: 'SwellContentPageSectionDivider';
  backgroundColor?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  type?: Maybe<Scalars['String']>;
  verticalSpacing?: Maybe<Scalars['String']>;
};

export type SwellContentPageSectionFlonSection = {
  __typename?: 'SwellContentPageSectionFlonSection';
  backgroundColor?: Maybe<Scalars['String']>;
  backgroundImage?: Maybe<Scalars['JSON']>;
  description?: Maybe<Scalars['String']>;
  horizontalBackgroundAlignment?: Maybe<Scalars['String']>;
  horizontalContentAlignment?: Maybe<Scalars['String']>;
  horizontalSpacing?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  links?: Maybe<SwellContentPageSectionFlonSectionLinks>;
  overlayOpacity?: Maybe<Scalars['Int']>;
  textColor?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  verticalBackgroundAlignment?: Maybe<Scalars['String']>;
  verticalContentAlignment?: Maybe<Scalars['String']>;
  verticalSpacing?: Maybe<Scalars['String']>;
};

export type SwellContentPageSectionFlonSectionLink = {
  __typename?: 'SwellContentPageSectionFlonSectionLink';
  label?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  style?: Maybe<Scalars['String']>;
};

export type SwellContentPageSectionFlonSectionLinks = {
  __typename?: 'SwellContentPageSectionFlonSectionLinks';
  count?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  pageCount?: Maybe<Scalars['Int']>;
  pages?: Maybe<Array<Maybe<Page>>>;
  results?: Maybe<Array<Maybe<SwellContentPageSectionFlonSectionLink>>>;
};

export type SwellContentPageSectionFullWidthMedium = {
  __typename?: 'SwellContentPageSectionFullWidthMedium';
  backgroundColor?: Maybe<Scalars['String']>;
  backgroundImage?: Maybe<Scalars['JSON']>;
  description?: Maybe<Scalars['String']>;
  horizontalBackgroundAlignment?: Maybe<Scalars['String']>;
  horizontalContentAlignment?: Maybe<Scalars['String']>;
  horizontalSpacing?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  links?: Maybe<SwellContentPageSectionFullWidthMediumLinks>;
  overlayOpacity?: Maybe<Scalars['Int']>;
  textColor?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  verticalBackgroundAlignment?: Maybe<Scalars['String']>;
  verticalContentAlignment?: Maybe<Scalars['String']>;
  verticalSpacing?: Maybe<Scalars['String']>;
};

export type SwellContentPageSectionFullWidthMediumLink = {
  __typename?: 'SwellContentPageSectionFullWidthMediumLink';
  label?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  style?: Maybe<Scalars['String']>;
};

export type SwellContentPageSectionFullWidthMediumLinks = {
  __typename?: 'SwellContentPageSectionFullWidthMediumLinks';
  count?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  pageCount?: Maybe<Scalars['Int']>;
  pages?: Maybe<Array<Maybe<Page>>>;
  results?: Maybe<Array<Maybe<SwellContentPageSectionFullWidthMediumLink>>>;
};

export type SwellContentPageSectionHeadingWithText = {
  __typename?: 'SwellContentPageSectionHeadingWithText';
  backgroundColor?: Maybe<Scalars['String']>;
  backgroundImage?: Maybe<Scalars['JSON']>;
  description?: Maybe<Scalars['String']>;
  horizontalBackgroundPosition?: Maybe<Scalars['String']>;
  horizontalSpacing?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  label?: Maybe<Scalars['String']>;
  overlayOpacity?: Maybe<Scalars['Int']>;
  textAlignment?: Maybe<Scalars['String']>;
  textColor?: Maybe<Scalars['String']>;
  textLayout?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  titleAlignment?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  verticalBackgroundPosition?: Maybe<Scalars['String']>;
  verticalSpacing?: Maybe<Scalars['String']>;
};

export type SwellContentPageSectionMultipleFeature = {
  __typename?: 'SwellContentPageSectionMultipleFeature';
  backgroundColor?: Maybe<Scalars['String']>;
  buttonLabel?: Maybe<Scalars['String']>;
  buttonLink?: Maybe<Scalars['String']>;
  buttonStyle?: Maybe<Scalars['String']>;
  buttons?: Maybe<SwellContentPageSectionMultipleFeatureButtons>;
  contentAlignment?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  features?: Maybe<SwellContentPageSectionMultipleFeatureFeatures>;
  horizontalBackgroundAlignment?: Maybe<Scalars['String']>;
  horizontalContentAlignment?: Maybe<Scalars['String']>;
  horizontalSpacing?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  image?: Maybe<Scalars['JSON']>;
  links?: Maybe<SwellContentPageSectionMultipleFeatureLinks>;
  overlayOpacity?: Maybe<Scalars['Int']>;
  textColor?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  verticalBackgroundAlignment?: Maybe<Scalars['String']>;
  verticalSpacing?: Maybe<Scalars['String']>;
};

export type SwellContentPageSectionMultipleFeatureButton = {
  __typename?: 'SwellContentPageSectionMultipleFeatureButton';
  label?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  style?: Maybe<Scalars['String']>;
};

export type SwellContentPageSectionMultipleFeatureButtons = {
  __typename?: 'SwellContentPageSectionMultipleFeatureButtons';
  count?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  pageCount?: Maybe<Scalars['Int']>;
  pages?: Maybe<Array<Maybe<Page>>>;
  results?: Maybe<Array<Maybe<SwellContentPageSectionMultipleFeatureButton>>>;
};

export type SwellContentPageSectionMultipleFeatureFeature = {
  __typename?: 'SwellContentPageSectionMultipleFeatureFeature';
  contentAlignment?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['JSON']>;
  title?: Maybe<Scalars['String']>;
};

export type SwellContentPageSectionMultipleFeatureFeatures = {
  __typename?: 'SwellContentPageSectionMultipleFeatureFeatures';
  count?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  pageCount?: Maybe<Scalars['Int']>;
  pages?: Maybe<Array<Maybe<Page>>>;
  results?: Maybe<Array<Maybe<SwellContentPageSectionMultipleFeatureFeature>>>;
};

export type SwellContentPageSectionMultipleFeatureLink = {
  __typename?: 'SwellContentPageSectionMultipleFeatureLink';
  label?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  style?: Maybe<Scalars['String']>;
};

export type SwellContentPageSectionMultipleFeatureLinks = {
  __typename?: 'SwellContentPageSectionMultipleFeatureLinks';
  count?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  pageCount?: Maybe<Scalars['Int']>;
  pages?: Maybe<Array<Maybe<Page>>>;
  results?: Maybe<Array<Maybe<SwellContentPageSectionMultipleFeatureLink>>>;
};

export type SwellContentPageSectionMultiplePanel = {
  __typename?: 'SwellContentPageSectionMultiplePanel';
  backgroundColor?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  features?: Maybe<SwellContentPageSectionMultiplePanelFeatures>;
  horizontalContentAlignment?: Maybe<Scalars['String']>;
  horizontalSpacing?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  panels?: Maybe<Array<Maybe<SwellContentPageSectionMultiplePanelPanels>>>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  verticalContentAlignment?: Maybe<Scalars['String']>;
  verticalSpacing?: Maybe<Scalars['String']>;
};

export type SwellContentPageSectionMultiplePanelFeature = {
  __typename?: 'SwellContentPageSectionMultiplePanelFeature';
  contentAlignment?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['JSON']>;
  title?: Maybe<Scalars['String']>;
};

export type SwellContentPageSectionMultiplePanelFeatures = {
  __typename?: 'SwellContentPageSectionMultiplePanelFeatures';
  count?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  pageCount?: Maybe<Scalars['Int']>;
  pages?: Maybe<Array<Maybe<Page>>>;
  results?: Maybe<Array<Maybe<SwellContentPageSectionMultiplePanelFeature>>>;
};

export type SwellContentPageSectionMultiplePanelPanelImage = {
  __typename?: 'SwellContentPageSectionMultiplePanelPanelImage';
  image?: Maybe<Scalars['JSON']>;
  type?: Maybe<Scalars['String']>;
};

export type SwellContentPageSectionMultiplePanelPanelText = {
  __typename?: 'SwellContentPageSectionMultiplePanelPanelText';
  backgroundColor?: Maybe<Scalars['String']>;
  backgroundImage?: Maybe<Scalars['JSON']>;
  contentGap?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  horizontalBackgroundAlignment?: Maybe<Scalars['String']>;
  horizontalSpacing?: Maybe<Scalars['String']>;
  imageScaling?: Maybe<Scalars['String']>;
  links?: Maybe<SwellContentPageSectionMultiplePanelPanelTextLinks>;
  overlayOpacity?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  verticalBackgroundAlignment?: Maybe<Scalars['String']>;
  verticalSpacing?: Maybe<Scalars['String']>;
};

export type SwellContentPageSectionMultiplePanelPanelTextLink = {
  __typename?: 'SwellContentPageSectionMultiplePanelPanelTextLink';
  label?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  style?: Maybe<Scalars['String']>;
};

export type SwellContentPageSectionMultiplePanelPanelTextLinks = {
  __typename?: 'SwellContentPageSectionMultiplePanelPanelTextLinks';
  count?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  pageCount?: Maybe<Scalars['Int']>;
  pages?: Maybe<Array<Maybe<Page>>>;
  results?: Maybe<Array<Maybe<SwellContentPageSectionMultiplePanelPanelTextLink>>>;
};

export type SwellContentPageSectionMultiplePanelPanels = SwellContentPageSectionMultiplePanelPanelImage | SwellContentPageSectionMultiplePanelPanelText;

export type SwellContentPageSectionProductsPreview = {
  __typename?: 'SwellContentPageSectionProductsPreview';
  category?: Maybe<SwellCategory>;
  categoryId?: Maybe<Scalars['String']>;
  horizontalSpacing?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  productsPerRow?: Maybe<Scalars['String']>;
  showProductDescription?: Maybe<Scalars['Boolean']>;
  showProductPrice?: Maybe<Scalars['Boolean']>;
  type?: Maybe<Scalars['String']>;
  verticalSpacing?: Maybe<Scalars['String']>;
};


export type SwellContentPageSectionProductsPreviewCategoryArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
};

export type SwellContentPageSectionReview = {
  __typename?: 'SwellContentPageSectionReview';
  contentAlignment?: Maybe<Scalars['String']>;
  horizontalSpacing?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  reviews?: Maybe<SwellContentPageSectionReviewReviews>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  verticalSpacing?: Maybe<Scalars['String']>;
};

export type SwellContentPageSectionReviewReview = {
  __typename?: 'SwellContentPageSectionReviewReview';
  comment?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['String']>;
  rating?: Maybe<Scalars['Int']>;
  userImage?: Maybe<Scalars['JSON']>;
  userLocation?: Maybe<Scalars['String']>;
  userName?: Maybe<Scalars['String']>;
};

export type SwellContentPageSectionReviewReviews = {
  __typename?: 'SwellContentPageSectionReviewReviews';
  count?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  pageCount?: Maybe<Scalars['Int']>;
  pages?: Maybe<Array<Maybe<Page>>>;
  results?: Maybe<Array<Maybe<SwellContentPageSectionReviewReview>>>;
};

export type SwellContentPageSections = SwellContentPageSectionCategoriesPreview | SwellContentPageSectionDivider | SwellContentPageSectionFlonSection | SwellContentPageSectionFullWidthMedium | SwellContentPageSectionHeadingWithText | SwellContentPageSectionMultipleFeature | SwellContentPageSectionMultiplePanel | SwellContentPageSectionProductsPreview | SwellContentPageSectionReview;

export type SwellContentPages = {
  __typename?: 'SwellContentPages';
  count?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  pageCount?: Maybe<Scalars['Int']>;
  pages?: Maybe<Array<Maybe<Page>>>;
  results?: Maybe<Array<Maybe<SwellContentPage>>>;
};

/** Order */
export type SwellOrder = {
  __typename?: 'SwellOrder';
  account?: Maybe<SwellAccount>;
  /** Amount of customer's account credit applied for initial payment, if applicable. */
  accountCreditAmount?: Maybe<Scalars['SafeNumber']>;
  /** Indicates the customer’s account credit is applied when submitting the order. */
  accountCreditApplied?: Maybe<Scalars['Boolean']>;
  /** The `id` of the customer's account. During checkout, customer accounts without a password are designated as `guest=true`. */
  accountId?: Maybe<Scalars['ID']>;
  /** Indicates the customer chose to save shipping and billing information to their account when submitting the order. */
  accountInfoSaved?: Maybe<Scalars['Boolean']>;
  /** Indicates the customer was logged into their account when placing the order. */
  accountLoggedIn?: Maybe<Scalars['Boolean']>;
  authorizedPayment?: Maybe<SwellPayment>;
  /** The id of an authorized payment. When "Require payment authorization" is enabled in payment settings, the order will be rejected if initial payment fails. */
  authorizedPaymentId?: Maybe<Scalars['String']>;
  /** The customer's billing details. Defaults to `account.billing`. Updating billing will also update the corresponding account billing object. */
  billing?: Maybe<SwellOrderBilling>;
  /** Indicates the order was completely canceled. */
  canceled?: Maybe<Scalars['Boolean']>;
  /** Customer notes provided when placing the order, if any. */
  comments?: Maybe<Scalars['String']>;
  coupon?: Maybe<SwellOrderCoupon>;
  /** Coupon code applied to the order. */
  couponCode?: Maybe<Scalars['String']>;
  /** ID of the coupon applied to the order. */
  couponId?: Maybe<Scalars['ID']>;
  currency?: Maybe<Scalars['String']>;
  /** The store’s base currency. */
  currencyBase?: Maybe<Scalars['String']>;
  /** Currency percentage used in calculating the fixed amount. */
  currencyRate?: Maybe<Scalars['SafeNumber']>;
  dateCreated?: Maybe<Scalars['DateTime']>;
  /** Indicates the order was completely fulfilled. Always `true` when `delivery_marked=true`, otherwise depends on the sum of `shipments`, `giftcards`, and `subscriptions`. */
  delivered?: Maybe<Scalars['Boolean']>;
  /** Total discount amount. */
  discountTotal?: Maybe<Scalars['SafeNumber']>;
  /** List of discounts applied to the order. */
  discounts?: Maybe<Array<Maybe<SwellOrderDiscount>>>;
  /** Indicates the order is intended as a gift for the recipient. */
  gift?: Maybe<Scalars['Boolean']>;
  /** Optional message to include with the order when shipping to the recipient. */
  giftMessage?: Maybe<Scalars['String']>;
  /** Indicates the order has at least one line item with `delivery=giftcard`. */
  giftcardDelivery?: Maybe<Scalars['Boolean']>;
  /** Total payment amount applied to the order from `giftcards`. */
  giftcardTotal?: Maybe<Scalars['SafeNumber']>;
  /** List of gift cards applied to the order. */
  giftcards?: Maybe<Array<Maybe<SwellOrderGiftcard>>>;
  /** Grand total including items, shipping and taxes. */
  grandTotal?: Maybe<Scalars['SafeNumber']>;
  /** Indicates the customer was not logged in when placing the order. */
  guest?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['ID']>;
  /** Total discount applied to line items. */
  itemDiscount?: Maybe<Scalars['SafeNumber']>;
  /** Total quantity of all line items. */
  itemQuantity?: Maybe<Scalars['Int']>;
  /** Total quantity of cancelable items on the order. */
  itemQuantityCancelable?: Maybe<Scalars['Int']>;
  /** Total quantity of line items canceled. */
  itemQuantityCanceled?: Maybe<Scalars['Int']>;
  /** Total quantity of line items that can be credited. */
  itemQuantityCreditable?: Maybe<Scalars['Int']>;
  /** Total quantity of items credited on the order. */
  itemQuantityCredited?: Maybe<Scalars['Int']>;
  /** Total quantity of line items that can be fulfilled. */
  itemQuantityDeliverable?: Maybe<Scalars['Int']>;
  /** Total quantity of line items that have been fulfilled. */
  itemQuantityDelivered?: Maybe<Scalars['Int']>;
  /** Total quantity of line items that can be fulfilled by gift card. Applies when `item.delivery=giftcard`. */
  itemQuantityGiftcardDeliverable?: Maybe<Scalars['Int']>;
  /** Total quantity of items eligible for invoicing on the order. */
  itemQuantityInvoiceable?: Maybe<Scalars['Int']>;
  /** Total quantity of items invoiced on the order. */
  itemQuantityInvoiced?: Maybe<Scalars['Int']>;
  /** Total quantity of line items that can still be returned. */
  itemQuantityReturnable?: Maybe<Scalars['Int']>;
  /** Total quantity of line items that have been returned. */
  itemQuantityReturned?: Maybe<Scalars['Int']>;
  /** Total quantity of line items that can be fulfilled by shipment. Applies when `item.delivery=shipment`. */
  itemQuantityShipmentDeliverable?: Maybe<Scalars['Int']>;
  /** Total quantity of line items that can be fulfilled by subscription. Applies when `item.delivery=subscription`. */
  itemQuantitySubscriptionDeliverable?: Maybe<Scalars['Int']>;
  /** Total shipping weight of all line items. */
  itemShipmentWeight?: Maybe<Scalars['SafeNumber']>;
  /** Total taxes applied to line items. */
  itemTax?: Maybe<Scalars['SafeNumber']>;
  /** Indicates line item prices include taxes. */
  itemTaxIncluded?: Maybe<Scalars['Boolean']>;
  /** List of line items describing the products ordered. */
  items?: Maybe<Array<Maybe<SwellOrderItem>>>;
  /** Arbitrary data, typically set in a checkout flow to store custom values. See Frontend API for details. */
  metadata?: Maybe<Scalars['JSON']>;
  /** Unique incremental order number, assigned automatically using a format configured in general settings. */
  number?: Maybe<Scalars['String']>;
  /** Indicates the order was paid in full. Always `true` when `payment_marked=true`, otherwise depends on the sum of `payments`. */
  paid?: Maybe<Scalars['Boolean']>;
  /** Balance of payments. A negative number indicates payment is owed, a positive balance indicates a refund is due, and a zero balance indicates fully paid. */
  paymentBalance?: Maybe<Scalars['SafeNumber']>;
  /** Sum of payments applied to the order, not including refunds. */
  paymentTotal?: Maybe<Scalars['SafeNumber']>;
  payments?: Maybe<SwellOrdersPayments>;
  /** List of promotion IDs applied to the order. */
  promotionIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
  promotions?: Maybe<SwellOrdersPromotions>;
  /** Sum of refunds on payments applied to the order. */
  refundTotal?: Maybe<Scalars['SafeNumber']>;
  /** Expandable list of refunds issued for the payment. */
  refunds?: Maybe<SwellOrdersRefunds>;
  /** Indicates the order has at least one line item with `delivery=shipment`. */
  shipmentDelivery?: Maybe<Scalars['Boolean']>;
  /** Shipping discount applied by coupons, promotions, or custom logic. */
  shipmentDiscount?: Maybe<Scalars['SafeNumber']>;
  /** Total shipping price before discounts. */
  shipmentPrice?: Maybe<Scalars['SafeNumber']>;
  /** Object describing the shipping services and rates available for the order. Shipping `country` must be set before retrieving shipping rates. */
  shipmentRating?: Maybe<SwellOrderShipmentRating>;
  /** Shipping tax amount, if applicable. */
  shipmentTax?: Maybe<Scalars['SafeNumber']>;
  /** Indicates shipping total includes taxes, if applicable. */
  shipmentTaxIncluded?: Maybe<Scalars['Boolean']>;
  /** Total shipping price including taxes and discount. Allows for an alternate display style as normally `shipment_total` and `tax_total` are shown separately. */
  shipmentTaxIncludedTotal?: Maybe<Scalars['SafeNumber']>;
  /** Total shipping price after discounts. */
  shipmentTotal?: Maybe<Scalars['SafeNumber']>;
  /** Total shipping price for items credited on the order. */
  shipmentTotalCredited?: Maybe<Scalars['SafeNumber']>;
  /** Total shipping price for items invoiced on the order. */
  shipmentTotalInvoiced?: Maybe<Scalars['SafeNumber']>;
  shipments?: Maybe<SwellOrdersShipments>;
  /** The customer's shipping details. Defaults to `account.shipping`. Updating shipping will also update the corresponding account shipping object. */
  shipping?: Maybe<SwellOrderShipping>;
  /** Current status of the order. Can be `pending`, `draft`, `payment_pending`, `delivery_pending`, `hold`, `complete`, or `canceled`. */
  status?: Maybe<Scalars['String']>;
  /** Sum of all line items before discounts, taxes and shipping. */
  subTotal?: Maybe<Scalars['SafeNumber']>;
  subscription?: Maybe<SwellSubscription>;
  /** Indicates the order has at least one line item with `delivery=subscription`. */
  subscriptionDelivery?: Maybe<Scalars['Boolean']>;
  /** Total of taxes applied separately from line items. */
  taxIncludedTotal?: Maybe<Scalars['SafeNumber']>;
  /** Total tax amount applied to the order including line items and shipping. */
  taxTotal?: Maybe<Scalars['SafeNumber']>;
  /** List of taxes applied to the order. */
  taxes?: Maybe<Array<Maybe<SwellOrderTax>>>;
  /** Indicates the order is tax-exempt. Taxes will not be calculated or applied when true. */
  taxesFixed?: Maybe<Scalars['Boolean']>;
};


/** Order */
export type SwellOrderAccountArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
};


/** Order */
export type SwellOrderAuthorizedPaymentArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
};


/** Order */
export type SwellOrderSubscriptionArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
};

/** The customer's billing details. Defaults to `account.billing`. Updating billing will also update the corresponding account billing object. */
export type SwellOrderBilling = {
  __typename?: 'SwellOrderBilling';
  accountCardId?: Maybe<Scalars['ID']>;
  /** Address Line 1 */
  address1?: Maybe<Scalars['String']>;
  /** Address Line 2 */
  address2?: Maybe<Scalars['String']>;
  affirm?: Maybe<SwellOrderBillingAffirm>;
  amazon?: Maybe<SwellOrderBillingAmazon>;
  apple?: Maybe<SwellOrderBillingApple>;
  bancontact?: Maybe<SwellOrderBillingBancontact>;
  /** Payment Card */
  card?: Maybe<SwellOrderBillingCard>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  /** Default Billing */
  default?: Maybe<Scalars['Boolean']>;
  /** Billing First Name */
  firstName?: Maybe<Scalars['String']>;
  google?: Maybe<SwellOrderBillingGoogle>;
  ideal?: Maybe<SwellOrderBillingIdeal>;
  /** Payment Instructions */
  instructions?: Maybe<Scalars['String']>;
  intent?: Maybe<Scalars['JSON']>;
  klarna?: Maybe<SwellOrderBillingKlarna>;
  /** Billing Last Name */
  lastName?: Maybe<Scalars['String']>;
  /** Payment Method */
  method?: Maybe<Scalars['String']>;
  /** Billing Name */
  name?: Maybe<Scalars['String']>;
  paypal?: Maybe<SwellOrderBillingPaypal>;
  /** Phone Number */
  phone?: Maybe<Scalars['String']>;
  resolve?: Maybe<SwellOrderBillingResolve>;
  /** State/Province */
  state?: Maybe<Scalars['String']>;
  /** Zip/Postal Code */
  zip?: Maybe<Scalars['String']>;
};

export type SwellOrderBillingAffirm = {
  __typename?: 'SwellOrderBillingAffirm';
  checkoutToken?: Maybe<Scalars['String']>;
};

export type SwellOrderBillingAmazon = {
  __typename?: 'SwellOrderBillingAmazon';
  accessToken?: Maybe<Scalars['String']>;
  checkoutSessionId?: Maybe<Scalars['String']>;
  orderReferenceId?: Maybe<Scalars['String']>;
};

export type SwellOrderBillingApple = {
  __typename?: 'SwellOrderBillingApple';
  gateway?: Maybe<Scalars['String']>;
  nonce?: Maybe<Scalars['String']>;
};

export type SwellOrderBillingBancontact = {
  __typename?: 'SwellOrderBillingBancontact';
  source?: Maybe<Scalars['String']>;
};

/** Payment Card */
export type SwellOrderBillingCard = {
  __typename?: 'SwellOrderBillingCard';
  addressCheck?: Maybe<Scalars['String']>;
  brand?: Maybe<Scalars['String']>;
  cvcCheck?: Maybe<Scalars['String']>;
  displayBrand?: Maybe<Scalars['String']>;
  expMonth?: Maybe<Scalars['Int']>;
  expYear?: Maybe<Scalars['Int']>;
  gateway?: Maybe<Scalars['String']>;
  last4?: Maybe<Scalars['String']>;
  test?: Maybe<Scalars['Boolean']>;
  token?: Maybe<Scalars['String']>;
  zipCheck?: Maybe<Scalars['String']>;
};

export type SwellOrderBillingGoogle = {
  __typename?: 'SwellOrderBillingGoogle';
  gateway?: Maybe<Scalars['String']>;
  nonce?: Maybe<Scalars['String']>;
};

export type SwellOrderBillingIdeal = {
  __typename?: 'SwellOrderBillingIdeal';
  token?: Maybe<Scalars['String']>;
};

export type SwellOrderBillingKlarna = {
  __typename?: 'SwellOrderBillingKlarna';
  source?: Maybe<Scalars['String']>;
};

export type SwellOrderBillingPaypal = {
  __typename?: 'SwellOrderBillingPaypal';
  authorizationId?: Maybe<Scalars['String']>;
  nonce?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['String']>;
  payerId?: Maybe<Scalars['String']>;
  paymentId?: Maybe<Scalars['String']>;
};

export type SwellOrderBillingResolve = {
  __typename?: 'SwellOrderBillingResolve';
  chargeId?: Maybe<Scalars['String']>;
};

export type SwellOrderCoupon = {
  __typename?: 'SwellOrderCoupon';
  /** A brief description of the coupon, as it may be displayed to customers. */
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  /** A short descriptive name of the coupon. */
  name?: Maybe<Scalars['String']>;
};

/** List of discounts applied to the order. */
export type SwellOrderDiscount = {
  __typename?: 'SwellOrderDiscount';
  amount?: Maybe<Scalars['SafeNumber']>;
  id?: Maybe<Scalars['String']>;
  rule?: Maybe<Scalars['JSON']>;
  /** References the related discount source object (e.g., promotion or coupon) */
  sourceId?: Maybe<Scalars['ID']>;
  type?: Maybe<Scalars['String']>;
};

/** List of gift cards applied to the order. */
export type SwellOrderGiftcard = {
  __typename?: 'SwellOrderGiftcard';
  /** Amount of gift card credit to spend for automatic payment */
  amount?: Maybe<Scalars['SafeNumber']>;
  code?: Maybe<Scalars['String']>;
  codeFormatted?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  last4?: Maybe<Scalars['String']>;
};

/** List of line items describing the products ordered. */
export type SwellOrderItem = {
  __typename?: 'SwellOrderItem';
  bundleItems?: Maybe<Array<Maybe<SwellOrderItemBundleItem>>>;
  /** Discount Amount */
  discountEach?: Maybe<Scalars['SafeNumber']>;
  discountTotal?: Maybe<Scalars['SafeNumber']>;
  id?: Maybe<Scalars['ID']>;
  metadata?: Maybe<Scalars['JSON']>;
  options?: Maybe<Array<Maybe<SwellOrderItemOption>>>;
  price?: Maybe<Scalars['SafeNumber']>;
  priceTotal?: Maybe<Scalars['SafeNumber']>;
  product?: Maybe<SwellProduct>;
  productId?: Maybe<Scalars['ID']>;
  purchaseOption?: Maybe<SwellOrderItemPurchaseOption>;
  quantity?: Maybe<Scalars['Int']>;
  quantityCancelable?: Maybe<Scalars['Int']>;
  quantityCanceled?: Maybe<Scalars['Int']>;
  quantityConsumed?: Maybe<Scalars['Int']>;
  quantityCreditable?: Maybe<Scalars['Int']>;
  quantityCredited?: Maybe<Scalars['Int']>;
  quantityDeliverable?: Maybe<Scalars['Int']>;
  quantityDelivered?: Maybe<Scalars['Int']>;
  quantityGiftcardDeliverable?: Maybe<Scalars['Int']>;
  quantityInvoiceable?: Maybe<Scalars['Int']>;
  quantityInvoiced?: Maybe<Scalars['Int']>;
  quantityRestocked?: Maybe<Scalars['Int']>;
  quantityReturnable?: Maybe<Scalars['Int']>;
  quantityReturned?: Maybe<Scalars['Int']>;
  quantityShipmentDeliverable?: Maybe<Scalars['Int']>;
  quantitySubscriptionDeliverable?: Maybe<Scalars['Int']>;
  quantitySubscriptionDelivered?: Maybe<Scalars['Int']>;
  quantityTotal?: Maybe<Scalars['Int']>;
  shipmentWeight?: Maybe<Scalars['SafeNumber']>;
  /** Tax Amount */
  taxEach?: Maybe<Scalars['SafeNumber']>;
  taxTotal?: Maybe<Scalars['SafeNumber']>;
  taxes?: Maybe<Array<Maybe<SwellOrderItemTax>>>;
  variant?: Maybe<SwellProductVariant>;
  variantId?: Maybe<Scalars['ID']>;
};

export type SwellOrderItemBundleItem = {
  __typename?: 'SwellOrderItemBundleItem';
  id?: Maybe<Scalars['ID']>;
  options?: Maybe<Array<Maybe<SwellOrderItemBundleItemOption>>>;
  product?: Maybe<SwellProduct>;
  productId?: Maybe<Scalars['ID']>;
  quantity?: Maybe<Scalars['Int']>;
  quantityCancelable?: Maybe<Scalars['Int']>;
  quantityCanceled?: Maybe<Scalars['Int']>;
  quantityConsumed?: Maybe<Scalars['Int']>;
  quantityDeliverable?: Maybe<Scalars['Int']>;
  quantityDelivered?: Maybe<Scalars['Int']>;
  quantityGiftcardDeliverable?: Maybe<Scalars['Int']>;
  quantityRestocked?: Maybe<Scalars['Int']>;
  quantityReturnable?: Maybe<Scalars['Int']>;
  quantityReturned?: Maybe<Scalars['Int']>;
  quantityShipmentDeliverable?: Maybe<Scalars['Int']>;
  quantityShipmentDelivered?: Maybe<Scalars['Int']>;
  quantityTotal?: Maybe<Scalars['Int']>;
  variant?: Maybe<SwellProductVariant>;
  variantId?: Maybe<Scalars['ID']>;
};

export type SwellOrderItemBundleItemOption = {
  __typename?: 'SwellOrderItemBundleItemOption';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['SafeNumber']>;
  shipmentWeight?: Maybe<Scalars['SafeNumber']>;
  subscription?: Maybe<Scalars['Boolean']>;
  value?: Maybe<Scalars['String']>;
  valueId?: Maybe<Scalars['ID']>;
  variant?: Maybe<Scalars['Boolean']>;
};

export type SwellOrderItemOption = {
  __typename?: 'SwellOrderItemOption';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['SafeNumber']>;
  shipmentWeight?: Maybe<Scalars['SafeNumber']>;
  subscription?: Maybe<Scalars['Boolean']>;
  value?: Maybe<Scalars['String']>;
  valueId?: Maybe<Scalars['ID']>;
  variant?: Maybe<Scalars['Boolean']>;
};

export type SwellOrderItemPurchaseOption = {
  __typename?: 'SwellOrderItemPurchaseOption';
  billingSchedule?: Maybe<SwellOrderItemPurchaseOptionBillingSchedule>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  orderSchedule?: Maybe<SwellOrderItemPurchaseOptionOrderSchedule>;
  planDescription?: Maybe<Scalars['String']>;
  planId?: Maybe<Scalars['ID']>;
  planName?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['SafeNumber']>;
  type?: Maybe<Scalars['String']>;
};

export type SwellOrderItemPurchaseOptionBillingSchedule = {
  __typename?: 'SwellOrderItemPurchaseOptionBillingSchedule';
  interval?: Maybe<Scalars['String']>;
  intervalCount?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  trialDays?: Maybe<Scalars['Int']>;
};

export type SwellOrderItemPurchaseOptionOrderSchedule = {
  __typename?: 'SwellOrderItemPurchaseOptionOrderSchedule';
  interval?: Maybe<Scalars['String']>;
  intervalCount?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type SwellOrderItemTax = {
  __typename?: 'SwellOrderItemTax';
  amount?: Maybe<Scalars['SafeNumber']>;
  id?: Maybe<Scalars['String']>;
};

export type SwellOrderPayment = {
  __typename?: 'SwellOrderPayment';
  /** Payment amount denominated in `currency`. Minimum of 0.01 */
  amount?: Maybe<Scalars['SafeNumber']>;
  /** Remaining amount that can be refunded. */
  amountRefundable?: Maybe<Scalars['SafeNumber']>;
  /** Amount of the payment that has been refunded. */
  amountRefunded?: Maybe<Scalars['SafeNumber']>;
  /** Indicates the payment was authorized before being captured. */
  authorized?: Maybe<Scalars['Boolean']>;
  /** Indicates the payment has been captured. */
  captured?: Maybe<Scalars['Boolean']>;
  /** Credit card details used to make the payment, if applicable. */
  card?: Maybe<SwellOrderPaymentCard>;
  currency?: Maybe<Scalars['String']>;
  /** Currency percentage used in calculating the fixed amount. */
  currencyRate?: Maybe<Scalars['SafeNumber']>;
  dateCreated?: Maybe<Scalars['DateTime']>;
  /** ID of the payment gateway that was used to process the payment. */
  gateway?: Maybe<Scalars['String']>;
  /** Method of payment. Can be `card`, `account`, `amazon`, `paypal` or any one of the manual methods defined in payment settings. */
  method?: Maybe<Scalars['String']>;
  /** Unique incremental payment number assigned automatically. */
  number?: Maybe<Scalars['String']>;
  /** Status of the payment. Can be `pending`, which is awaiting async processing, `error`, `success` or `authorized`. */
  status?: Maybe<Scalars['String']>;
  /** Indicates the payment was successful. When an error occurs with a payment gateway, this status will be `false` and `error` field will be populated. */
  success?: Maybe<Scalars['Boolean']>;
};

/** Credit card details used to make the payment, if applicable. */
export type SwellOrderPaymentCard = {
  __typename?: 'SwellOrderPaymentCard';
  addressCheck?: Maybe<Scalars['String']>;
  brand?: Maybe<Scalars['String']>;
  cvcCheck?: Maybe<Scalars['String']>;
  displayBrand?: Maybe<Scalars['String']>;
  expMonth?: Maybe<Scalars['Int']>;
  expYear?: Maybe<Scalars['Int']>;
  last4?: Maybe<Scalars['String']>;
  test?: Maybe<Scalars['Boolean']>;
  token?: Maybe<Scalars['String']>;
  zipCheck?: Maybe<Scalars['String']>;
};

export type SwellOrderPromotion = {
  __typename?: 'SwellOrderPromotion';
  /** Date the promo ends and is no longer available. When defined, the promo will not be applied after this date. */
  dateEnd?: Maybe<Scalars['DateTime']>;
  /** Date the promo is first available. When defined, the promo will not be valid until after this date and before `date_end`. */
  dateStart?: Maybe<Scalars['DateTime']>;
  /** A brief description of the promo, as it may be displayed to customers. */
  description?: Maybe<Scalars['String']>;
  /** A short descriptive name of the promo. */
  name?: Maybe<Scalars['String']>;
};

/** Expandable list of refunds issued for the payment. */
export type SwellOrderRefund = {
  __typename?: 'SwellOrderRefund';
  amount?: Maybe<Scalars['SafeNumber']>;
  currency?: Maybe<Scalars['String']>;
  currencyRate?: Maybe<Scalars['SafeNumber']>;
  dateCreated?: Maybe<Scalars['DateTime']>;
  method?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  /** Indicates the refund was successfully processed */
  success?: Maybe<Scalars['Boolean']>;
};

export type SwellOrderShipment = {
  __typename?: 'SwellOrderShipment';
  /** Indicates the shipment was canceled. */
  canceled?: Maybe<Scalars['Boolean']>;
  /** The id of a third-party carrier offering the service, if applicable. */
  carrier?: Maybe<Scalars['String']>;
  /** Name of a third-party carrier offering the service, if applicable. */
  carrierName?: Maybe<Scalars['String']>;
  dateCreated?: Maybe<Scalars['DateTime']>;
  /** Date the expected shipment is meant to arrive at the destination, if applicable. */
  dateEstimated?: Maybe<Scalars['DateTime']>;
  /** The customer's shipping address. */
  destination?: Maybe<SwellOrderShipmentDestination>;
  /** List of line items describing the products shipped. */
  items?: Maybe<Array<Maybe<SwellOrderShipmentItem>>>;
  /** Unique incremental shipment number, assigned automatically. */
  number?: Maybe<Scalars['String']>;
  /** The shipment origin location. */
  origin?: Maybe<SwellOrderShipmentOrigin>;
  /** The id of a shipping service as configured in shipment settings. */
  service?: Maybe<Scalars['String']>;
  /** Name of the shipping service. */
  serviceName?: Maybe<Scalars['String']>;
  /** Tracking code used to identify the shipment, if applicable. */
  trackingCode?: Maybe<Scalars['String']>;
};

/** The customer's shipping address. */
export type SwellOrderShipmentDestination = {
  __typename?: 'SwellOrderShipmentDestination';
  address1?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
};

/** List of line items describing the products shipped. */
export type SwellOrderShipmentItem = {
  __typename?: 'SwellOrderShipmentItem';
  bundleItemId?: Maybe<Scalars['ID']>;
  id?: Maybe<Scalars['ID']>;
  options?: Maybe<Array<Maybe<SwellOrderShipmentItemOption>>>;
  orderItemId?: Maybe<Scalars['ID']>;
  product?: Maybe<SwellProduct>;
  productId?: Maybe<Scalars['ID']>;
  quantity?: Maybe<Scalars['Int']>;
  variantId?: Maybe<Scalars['ID']>;
};


/** List of line items describing the products shipped. */
export type SwellOrderShipmentItemProductArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
};

export type SwellOrderShipmentItemOption = {
  __typename?: 'SwellOrderShipmentItemOption';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** The shipment origin location. */
export type SwellOrderShipmentOrigin = {
  __typename?: 'SwellOrderShipmentOrigin';
  location?: Maybe<Scalars['String']>;
};

/** Object describing the shipping services and rates available for the order. Shipping `country` must be set before retrieving shipping rates. */
export type SwellOrderShipmentRating = {
  __typename?: 'SwellOrderShipmentRating';
  dateCreated?: Maybe<Scalars['DateTime']>;
  errors?: Maybe<Array<Maybe<SwellOrderShipmentRatingError>>>;
  fingerprint?: Maybe<Scalars['String']>;
  services?: Maybe<Array<Maybe<SwellOrderShipmentRatingService>>>;
};

export type SwellOrderShipmentRatingError = {
  __typename?: 'SwellOrderShipmentRatingError';
  code?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type SwellOrderShipmentRatingService = {
  __typename?: 'SwellOrderShipmentRatingService';
  carrier?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  pickup?: Maybe<Scalars['Boolean']>;
  price?: Maybe<Scalars['SafeNumber']>;
  taxCode?: Maybe<Scalars['String']>;
};

/** The customer's shipping details. Defaults to `account.shipping`. Updating shipping will also update the corresponding account shipping object. */
export type SwellOrderShipping = {
  __typename?: 'SwellOrderShipping';
  accountAddressId?: Maybe<Scalars['ID']>;
  /** Address Line 1 */
  address1?: Maybe<Scalars['String']>;
  /** Address Line 2 */
  address2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  /** Default Shipping */
  default?: Maybe<Scalars['Boolean']>;
  /** Shipping First Name */
  firstName?: Maybe<Scalars['String']>;
  /** Shipping Last Name */
  lastName?: Maybe<Scalars['String']>;
  /** Shipping Name */
  name?: Maybe<Scalars['String']>;
  /** Phone Number */
  phone?: Maybe<Scalars['String']>;
  pickup?: Maybe<Scalars['Boolean']>;
  /** Shipping Price */
  price?: Maybe<Scalars['SafeNumber']>;
  /** Shipping Service ID */
  service?: Maybe<Scalars['String']>;
  /** Shipping Service Name */
  serviceName?: Maybe<Scalars['String']>;
  /** State/Province */
  state?: Maybe<Scalars['String']>;
  /** Zip/Postal Code */
  zip?: Maybe<Scalars['String']>;
};

/** List of taxes applied to the order. */
export type SwellOrderTax = {
  __typename?: 'SwellOrderTax';
  amount?: Maybe<Scalars['SafeNumber']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  priority?: Maybe<Scalars['Int']>;
  rate?: Maybe<Scalars['SafeNumber']>;
  shipping?: Maybe<Scalars['Boolean']>;
};

export type SwellOrders = {
  __typename?: 'SwellOrders';
  count?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  pageCount?: Maybe<Scalars['Int']>;
  pages?: Maybe<Array<Maybe<Page>>>;
  results?: Maybe<Array<Maybe<SwellOrder>>>;
};

export type SwellOrdersPayments = {
  __typename?: 'SwellOrdersPayments';
  count?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  pageCount?: Maybe<Scalars['Int']>;
  pages?: Maybe<Array<Maybe<Page>>>;
  results?: Maybe<Array<Maybe<SwellOrderPayment>>>;
};

export type SwellOrdersPromotions = {
  __typename?: 'SwellOrdersPromotions';
  count?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  pageCount?: Maybe<Scalars['Int']>;
  pages?: Maybe<Array<Maybe<Page>>>;
  results?: Maybe<Array<Maybe<SwellOrderPromotion>>>;
};

export type SwellOrdersRefunds = {
  __typename?: 'SwellOrdersRefunds';
  count?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  pageCount?: Maybe<Scalars['Int']>;
  pages?: Maybe<Array<Maybe<Page>>>;
  results?: Maybe<Array<Maybe<SwellOrderRefund>>>;
};

export type SwellOrdersShipments = {
  __typename?: 'SwellOrdersShipments';
  count?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  pageCount?: Maybe<Scalars['Int']>;
  pages?: Maybe<Array<Maybe<Page>>>;
  results?: Maybe<Array<Maybe<SwellOrderShipment>>>;
};

/** Payment */
export type SwellPayment = {
  __typename?: 'SwellPayment';
  /** Payment amount denominated in `currency`. Minimum of 0.01 */
  amount?: Maybe<Scalars['SafeNumber']>;
  /** Remaining amount that can be refunded. */
  amountRefundable?: Maybe<Scalars['SafeNumber']>;
  /** Amount of the payment that has been refunded. */
  amountRefunded?: Maybe<Scalars['SafeNumber']>;
  /** Credit card details used to make the payment, if applicable. */
  card?: Maybe<SwellPaymentCard>;
  currency?: Maybe<Scalars['String']>;
  /** Currency percentage used in calculating the fixed amount. */
  currencyRate?: Maybe<Scalars['SafeNumber']>;
  /** ID of the payment gateway that was used to process the payment. */
  gateway?: Maybe<Scalars['String']>;
  /** Method of payment. Can be `card`, `account`, `amazon`, `paypal` or any one of the manual methods defined in payment settings. */
  method?: Maybe<Scalars['String']>;
  /** Unique incremental payment number assigned automatically. */
  number?: Maybe<Scalars['String']>;
  /** External identifier returned by a payment gateway, if applicable. */
  transactionId?: Maybe<Scalars['String']>;
};

/** Credit card details used to make the payment, if applicable. */
export type SwellPaymentCard = {
  __typename?: 'SwellPaymentCard';
  token?: Maybe<Scalars['String']>;
};

/** Product */
export type SwellProduct = {
  __typename?: 'SwellProduct';
  /** An object containing custom attribute key/value pairs. */
  attributes?: Maybe<Scalars['JSON']>;
  /** Indicates whether the product is a bundle of other products. */
  bundle?: Maybe<Scalars['Boolean']>;
  /** List of products sold as a bundle. Applicable only when `bundle=true`. */
  bundleItems?: Maybe<Array<Maybe<SwellProductBundleItem>>>;
  categories?: Maybe<Array<Maybe<SwellCategory>>>;
  content?: Maybe<SwellProductContent>;
  /** List of products to display as cross-sells on a shopping cart page. */
  crossSells?: Maybe<Array<Maybe<SwellProductCrossSell>>>;
  currency?: Maybe<Scalars['String']>;
  /**
   * Method of fulfillment automatically assigned based on `type`:
   *
   * * `shipment` means the product will be physically shipped to a customer.
   * * `subscription` means the product will be fulfilled as a subscription when an order is placed. `giftcard` delivery means the product will be fulfilled as a gift card when an order is placed.
   * * `null` means the product will not be fulfilled by one of the above methods.
   *
   * _Note: A bundle has its child products fulfilled individually; each product in the bundle must have its own fulfillment method._
   */
  delivery?: Maybe<Scalars['String']>;
  /** A long-form description of the product. May contain HTML or other markup languages. */
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  /** List of images depicting the bundle. */
  images?: Maybe<Array<Maybe<SwellProductImage>>>;
  /** Page description used for search engine optimization purposes. */
  metaDescription?: Maybe<Scalars['String']>;
  /** Page title used to override product name in storefronts. */
  metaTitle?: Maybe<Scalars['String']>;
  /** Human-friendly name of the product. */
  name?: Maybe<Scalars['String']>;
  /** Options that allow for variations of the base product. If the option is part of a variant or `required=true`, an option value must be set for the product to be added to a cart. */
  options?: Maybe<Array<Maybe<SwellProductOption>>>;
  /** Reflects the non-sale price of the product */
  origPrice?: Maybe<Scalars['SafeNumber']>;
  /** List price used when `sale=false` or `sale_price` is not defined. This value is intended for use via the frontend. See the `purchase_options` array to manage a product's price. */
  price?: Maybe<Scalars['SafeNumber']>;
  /** Price rules determined by cart quantity or customer account group. Overrides `price` and `sale_price` when conditions match. */
  prices?: Maybe<Array<Maybe<SwellProductPrice>>>;
  /** Configuration of one or more purchase options for the product. Can be `standard` for one-time purchases or `subscription` for a subscription plan. Products can support both purchase options simultaneously. */
  purchaseOptions?: Maybe<SwellProductPurchaseOptions>;
  /** Indicates whether the product is on sale. If `true`, the `sale_price` will be used by default when the product is added to a cart. */
  sale?: Maybe<Scalars['Boolean']>;
  /** Sale price used to override list price when `sale=true`. */
  salePrice?: Maybe<Scalars['SafeNumber']>;
  /** Stock keeping unit (SKU) used to track inventory in a warehouse. */
  sku?: Maybe<Scalars['String']>;
  /** Lowercase, hyphenated identifier typically used in URLs. When creating a product, a `slug `will be generated automatically from the `name`. Maximum length of 1,000 characters. */
  slug?: Maybe<Scalars['String']>;
  /** Expandable list of stock adjustments for the product. */
  stock?: Maybe<SwellProductsStocks>;
  /** Quantity of the product currently in stock (including all variants), based on the sum of the stock entries. */
  stockLevel?: Maybe<Scalars['Int']>;
  /** Indicates whether the product's stock is purchasable. */
  stockPurchasable?: Maybe<Scalars['Boolean']>;
  /** String indicating the product's stock status for the purpose of ordering. When `stock_purchasable=true`, an order can be placed for this product regardless of current stock status. Otherwise an order submission will be blocked unless stock status is `available`, `preorder`, or `backorder`. */
  stockStatus?: Maybe<Scalars['String']>;
  /** Indicates whether the product has stock tracking enabled. */
  stockTracking?: Maybe<Scalars['Boolean']>;
  /** Array of searchable tags to aid in search discoverability. */
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** ID of an alternate theme template used to render this product in a storefront, if applicable. */
  themeTemplate?: Maybe<Scalars['String']>;
  /** Implies the ordering and fulfillment options available for the product. Can be `standard`, `subscription`, `bundle`, or `giftcard`. A `standard` product is a physical item that will be shipped to a customer. */
  type?: Maybe<Scalars['String']>;
  /** List of products to display as up-sells on a product detail page. */
  upSells?: Maybe<Array<Maybe<SwellProductUpSell>>>;
  /** Expandable list of variants representing unique variations of the product. Each variant is a combination of one or more `options`. For example, Size and Color. */
  variants?: Maybe<SwellProductsVariants>;
};


/** Product */
export type SwellProductCategoriesArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
};

/** List of products sold as a bundle. Applicable only when `bundle=true`. */
export type SwellProductBundleItem = {
  __typename?: 'SwellProductBundleItem';
  id?: Maybe<Scalars['ID']>;
  product?: Maybe<SwellProduct>;
  productId?: Maybe<Scalars['ID']>;
  productName?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['Int']>;
  variant?: Maybe<SwellProductVariant>;
  variantId?: Maybe<Scalars['ID']>;
};


/** List of products sold as a bundle. Applicable only when `bundle=true`. */
export type SwellProductBundleItemProductArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
};

export type SwellProductContent = {
  __typename?: 'SwellProductContent';
  calloutDescription?: Maybe<Scalars['String']>;
  calloutTitle?: Maybe<Scalars['String']>;
  enableProductCounter?: Maybe<Scalars['Boolean']>;
  expandableDetails?: Maybe<Array<Maybe<SwellProductContentExpandableDetail>>>;
  layoutOptions?: Maybe<Scalars['String']>;
  lowStockIndicator?: Maybe<Scalars['Int']>;
  productHighlights?: Maybe<Array<Maybe<SwellProductContentProductHighlight>>>;
  showStockLevels?: Maybe<Scalars['Boolean']>;
};

export type SwellProductContentExpandableDetail = {
  __typename?: 'SwellProductContentExpandableDetail';
  details?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  label?: Maybe<Scalars['String']>;
};

export type SwellProductContentProductHighlight = {
  __typename?: 'SwellProductContentProductHighlight';
  customIcon?: Maybe<SwellProductContentProductHighlightCustomIcon>;
  icon?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  label?: Maybe<Scalars['String']>;
};

export type SwellProductContentProductHighlightCustomIcon = {
  __typename?: 'SwellProductContentProductHighlightCustomIcon';
  contentType?: Maybe<Scalars['String']>;
  data?: Maybe<Scalars['JSON']>;
  dateUploaded?: Maybe<Scalars['DateTime']>;
  filename?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  length?: Maybe<Scalars['Int']>;
  md5?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['JSON']>;
  private?: Maybe<Scalars['Boolean']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
};

/** List of products to display as cross-sells on a shopping cart page. */
export type SwellProductCrossSell = {
  __typename?: 'SwellProductCrossSell';
  discountAmount?: Maybe<Scalars['SafeNumber']>;
  discountPercent?: Maybe<Scalars['SafeNumber']>;
  discountType?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  product?: Maybe<SwellProduct>;
  productId?: Maybe<Scalars['ID']>;
};


/** List of products to display as cross-sells on a shopping cart page. */
export type SwellProductCrossSellProductArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
};

/** List of images depicting the bundle. */
export type SwellProductImage = {
  __typename?: 'SwellProductImage';
  caption?: Maybe<Scalars['String']>;
  file?: Maybe<SwellProductImageFile>;
  id?: Maybe<Scalars['ID']>;
};

export type SwellProductImageFile = {
  __typename?: 'SwellProductImageFile';
  height?: Maybe<Scalars['Int']>;
  md5?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
};

/** Options that allow for variations of the base product. If the option is part of a variant or `required=true`, an option value must be set for the product to be added to a cart. */
export type SwellProductOption = {
  __typename?: 'SwellProductOption';
  active?: Maybe<Scalars['Boolean']>;
  attributeId?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  inputHint?: Maybe<Scalars['String']>;
  inputMulti?: Maybe<Scalars['Boolean']>;
  inputType?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['ID']>;
  parentValueIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
  price?: Maybe<Scalars['SafeNumber']>;
  /** Indicates the option requires a value */
  required?: Maybe<Scalars['Boolean']>;
  subscription?: Maybe<Scalars['Boolean']>;
  /** List of values for this option */
  values?: Maybe<Array<Maybe<SwellProductOptionValue>>>;
  /** Indicates the option is an aspect of variants */
  variant?: Maybe<Scalars['Boolean']>;
};

/** List of values for this option */
export type SwellProductOptionValue = {
  __typename?: 'SwellProductOptionValue';
  color?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  image?: Maybe<SwellProductOptionValueImage>;
  images?: Maybe<Array<Maybe<SwellProductOptionValueImage>>>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['SafeNumber']>;
  /** Shipment weight added if the option value is selected */
  shipmentWeight?: Maybe<Scalars['SafeNumber']>;
  subscriptionInterval?: Maybe<Scalars['String']>;
  subscriptionIntervalCount?: Maybe<Scalars['Int']>;
  subscriptionTrialDays?: Maybe<Scalars['Int']>;
};

export type SwellProductOptionValueImage = {
  __typename?: 'SwellProductOptionValueImage';
  caption?: Maybe<Scalars['String']>;
  contentType?: Maybe<Scalars['String']>;
  data?: Maybe<Scalars['JSON']>;
  dateUploaded?: Maybe<Scalars['DateTime']>;
  file?: Maybe<SwellProductOptionValueImageFile>;
  filename?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  length?: Maybe<Scalars['Int']>;
  md5?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['JSON']>;
  private?: Maybe<Scalars['Boolean']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
};

export type SwellProductOptionValueImageFile = {
  __typename?: 'SwellProductOptionValueImageFile';
  contentType?: Maybe<Scalars['String']>;
  data?: Maybe<Scalars['JSON']>;
  dateUploaded?: Maybe<Scalars['DateTime']>;
  filename?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  length?: Maybe<Scalars['Int']>;
  md5?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['JSON']>;
  private?: Maybe<Scalars['Boolean']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
};

/** Price rules determined by cart quantity or customer account group. Overrides `price` and `sale_price` when conditions match. */
export type SwellProductPrice = {
  __typename?: 'SwellProductPrice';
  accountGroup?: Maybe<Scalars['String']>;
  discountPercent?: Maybe<Scalars['SafeNumber']>;
  price?: Maybe<Scalars['SafeNumber']>;
  quantityMax?: Maybe<Scalars['Int']>;
  quantityMin?: Maybe<Scalars['Int']>;
};

/** Configuration of one or more purchase options for the product. Can be `standard` for one-time purchases or `subscription` for a subscription plan. Products can support both purchase options simultaneously. */
export type SwellProductPurchaseOptions = {
  __typename?: 'SwellProductPurchaseOptions';
  standard?: Maybe<SwellProductPurchaseOptionsStandard>;
  subscription?: Maybe<SwellProductPurchaseOptionsSubscription>;
  trial?: Maybe<SwellProductPurchaseOptionsTrial>;
};

export type SwellProductPurchaseOptionsStandard = {
  __typename?: 'SwellProductPurchaseOptionsStandard';
  accountGroups?: Maybe<Array<Maybe<Scalars['JSON']>>>;
  active?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  origPrice?: Maybe<Scalars['SafeNumber']>;
  price?: Maybe<Scalars['SafeNumber']>;
  prices?: Maybe<Array<Maybe<SwellProductPurchaseOptionsStandardPrice>>>;
  sale?: Maybe<Scalars['Boolean']>;
  salePrice?: Maybe<Scalars['SafeNumber']>;
};

export type SwellProductPurchaseOptionsStandardPrice = {
  __typename?: 'SwellProductPurchaseOptionsStandardPrice';
  accountGroup?: Maybe<Scalars['String']>;
  discountPercent?: Maybe<Scalars['SafeNumber']>;
  price?: Maybe<Scalars['SafeNumber']>;
  quantityMax?: Maybe<Scalars['Int']>;
  quantityMin?: Maybe<Scalars['Int']>;
};

export type SwellProductPurchaseOptionsSubscription = {
  __typename?: 'SwellProductPurchaseOptionsSubscription';
  accountGroups?: Maybe<Array<Maybe<Scalars['JSON']>>>;
  active?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  plans?: Maybe<Array<Maybe<SwellProductPurchaseOptionsSubscriptionPlan>>>;
};

export type SwellProductPurchaseOptionsSubscriptionPlan = {
  __typename?: 'SwellProductPurchaseOptionsSubscriptionPlan';
  active?: Maybe<Scalars['Boolean']>;
  billingSchedule?: Maybe<SwellProductPurchaseOptionsSubscriptionPlanBillingSchedule>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  orderSchedule?: Maybe<SwellProductPurchaseOptionsSubscriptionPlanOrderSchedule>;
  price?: Maybe<Scalars['SafeNumber']>;
};

export type SwellProductPurchaseOptionsSubscriptionPlanBillingSchedule = {
  __typename?: 'SwellProductPurchaseOptionsSubscriptionPlanBillingSchedule';
  interval?: Maybe<Scalars['String']>;
  intervalCount?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  trialDays?: Maybe<Scalars['Int']>;
};

export type SwellProductPurchaseOptionsSubscriptionPlanOrderSchedule = {
  __typename?: 'SwellProductPurchaseOptionsSubscriptionPlanOrderSchedule';
  interval?: Maybe<Scalars['String']>;
  intervalCount?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type SwellProductPurchaseOptionsTrial = {
  __typename?: 'SwellProductPurchaseOptionsTrial';
  active?: Maybe<Scalars['Boolean']>;
  authAmount?: Maybe<Scalars['SafeNumber']>;
  id?: Maybe<Scalars['ID']>;
  price?: Maybe<Scalars['SafeNumber']>;
  prices?: Maybe<Array<Maybe<SwellProductPurchaseOptionsTrialPrice>>>;
  trialDays?: Maybe<Scalars['Int']>;
};

export type SwellProductPurchaseOptionsTrialPrice = {
  __typename?: 'SwellProductPurchaseOptionsTrialPrice';
  accountGroup?: Maybe<Scalars['String']>;
  authAmount?: Maybe<Scalars['SafeNumber']>;
  price?: Maybe<Scalars['SafeNumber']>;
  trialDays?: Maybe<Scalars['Int']>;
};

/** List of products to display as up-sells on a product detail page. */
export type SwellProductUpSell = {
  __typename?: 'SwellProductUpSell';
  product?: Maybe<SwellProduct>;
  productId?: Maybe<Scalars['ID']>;
};


/** List of products to display as up-sells on a product detail page. */
export type SwellProductUpSellProductArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
};

/** Expandable list of variants representing unique variations of the product. Each variant is a combination of one or more `options`. For example, Size and Color. */
export type SwellProductVariant = {
  __typename?: 'SwellProductVariant';
  attributes?: Maybe<Scalars['JSON']>;
  currency?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  images?: Maybe<Array<Maybe<SwellProductVariantImage>>>;
  name?: Maybe<Scalars['String']>;
  optionValueIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
  origPrice?: Maybe<Scalars['SafeNumber']>;
  price?: Maybe<Scalars['SafeNumber']>;
  prices?: Maybe<Array<Maybe<SwellProductVariantPrice>>>;
  purchaseOptions?: Maybe<SwellProductVariantPurchaseOptions>;
  /** SKU */
  sku?: Maybe<Scalars['String']>;
  stockLevel?: Maybe<Scalars['Int']>;
};

export type SwellProductVariantImage = {
  __typename?: 'SwellProductVariantImage';
  caption?: Maybe<Scalars['String']>;
  file?: Maybe<SwellProductVariantImageFile>;
  id?: Maybe<Scalars['ID']>;
};

export type SwellProductVariantImageFile = {
  __typename?: 'SwellProductVariantImageFile';
  height?: Maybe<Scalars['Int']>;
  md5?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
};

export type SwellProductVariantPrice = {
  __typename?: 'SwellProductVariantPrice';
  accountGroup?: Maybe<Scalars['String']>;
  discountPercent?: Maybe<Scalars['SafeNumber']>;
  price?: Maybe<Scalars['SafeNumber']>;
  quantityMax?: Maybe<Scalars['Int']>;
  quantityMin?: Maybe<Scalars['Int']>;
};

export type SwellProductVariantPurchaseOptions = {
  __typename?: 'SwellProductVariantPurchaseOptions';
  standard?: Maybe<SwellProductVariantPurchaseOptionsStandard>;
};

export type SwellProductVariantPurchaseOptionsStandard = {
  __typename?: 'SwellProductVariantPurchaseOptionsStandard';
  origPrice?: Maybe<Scalars['SafeNumber']>;
  price?: Maybe<Scalars['SafeNumber']>;
  prices?: Maybe<Array<Maybe<SwellProductVariantPurchaseOptionsStandardPrice>>>;
  sale?: Maybe<Scalars['Boolean']>;
  salePrice?: Maybe<Scalars['SafeNumber']>;
};

export type SwellProductVariantPurchaseOptionsStandardPrice = {
  __typename?: 'SwellProductVariantPurchaseOptionsStandardPrice';
  accountGroup?: Maybe<Scalars['String']>;
  discountPercent?: Maybe<Scalars['SafeNumber']>;
  price?: Maybe<Scalars['SafeNumber']>;
  quantityMax?: Maybe<Scalars['Int']>;
  quantityMin?: Maybe<Scalars['Int']>;
};

export type SwellProducts = {
  __typename?: 'SwellProducts';
  count?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  pageCount?: Maybe<Scalars['Int']>;
  pages?: Maybe<Array<Maybe<Page>>>;
  results?: Maybe<Array<Maybe<SwellProduct>>>;
};

export type SwellProductsStocks = {
  __typename?: 'SwellProductsStocks';
  count?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  pageCount?: Maybe<Scalars['Int']>;
  pages?: Maybe<Array<Maybe<Page>>>;
};

export type SwellProductsVariants = {
  __typename?: 'SwellProductsVariants';
  count?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  pageCount?: Maybe<Scalars['Int']>;
  pages?: Maybe<Array<Maybe<Page>>>;
  results?: Maybe<Array<Maybe<SwellProductVariant>>>;
};

export type SwellSessionInput = {
  currency?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
};

export type SwellSettings = {
  __typename?: 'SwellSettings';
  store?: Maybe<SwellSettingsStore>;
  values?: Maybe<Scalars['JSON']>;
};

export type SwellSettingsMenus = {
  __typename?: 'SwellSettingsMenus';
  sections?: Maybe<Array<Maybe<SwellSettingsMenusSection>>>;
};

export type SwellSettingsMenusSection = {
  __typename?: 'SwellSettingsMenusSection';
  id?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<Scalars['JSON']>>>;
  name?: Maybe<Scalars['String']>;
  themeId?: Maybe<Scalars['String']>;
  themeMenuId?: Maybe<Scalars['String']>;
};

export type SwellSettingsPayments = {
  __typename?: 'SwellSettingsPayments';
  methods?: Maybe<Scalars['JSON']>;
};

export type SwellSettingsStore = {
  __typename?: 'SwellSettingsStore';
  analyticsScripts?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  currencies?: Maybe<Array<Maybe<SwellSettingsStoreCurrency>>>;
  currency?: Maybe<Scalars['String']>;
  facebookPixelId?: Maybe<Scalars['String']>;
  homePage?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  locales?: Maybe<Array<Maybe<SwellSettingsStoreLocale>>>;
  name?: Maybe<Scalars['String']>;
  publicKey?: Maybe<Scalars['String']>;
  supportEmail?: Maybe<Scalars['String']>;
  supportPhone?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type SwellSettingsStoreCurrency = {
  __typename?: 'SwellSettingsStoreCurrency';
  code?: Maybe<Scalars['String']>;
  decimals?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  priced?: Maybe<Scalars['Boolean']>;
  rate?: Maybe<Scalars['SafeNumber']>;
  symbol?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type SwellSettingsStoreLocale = {
  __typename?: 'SwellSettingsStoreLocale';
  code?: Maybe<Scalars['String']>;
  fallback?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type SwellSettingsSubscriptions = {
  __typename?: 'SwellSettingsSubscriptions';
  features?: Maybe<Scalars['JSON']>;
  pauseNextSkipThreshold?: Maybe<Scalars['Int']>;
};

/** Subscription */
export type SwellSubscription = {
  __typename?: 'SwellSubscription';
  account?: Maybe<SwellAccount>;
  /** ID of the subscribed customer's account. */
  accountId?: Maybe<Scalars['ID']>;
  /** Indicates the subscription is currently active. */
  active?: Maybe<Scalars['Boolean']>;
  /** Subscription billing details. */
  billing?: Maybe<SwellSubscriptionBilling>;
  /** Billing schedule for subscription plan. */
  billingSchedule?: Maybe<SwellSubscriptionBillingSchedule>;
  /** Determines whether a canceled subscription will be de-activated immediately (false) or at the end of the billing period (true). */
  cancelAtEnd?: Maybe<Scalars['Boolean']>;
  /** Indicates intent to cancel the subscription immediately or in the future, depending on cancelation policy. */
  canceled?: Maybe<Scalars['Boolean']>;
  content?: Maybe<SwellSubscriptionContent>;
  /** Coupon code applied to the subscription. See coupons for details. */
  couponCode?: Maybe<Scalars['String']>;
  /** ID of the coupon applied to the subscription. */
  couponId?: Maybe<Scalars['ID']>;
  currency?: Maybe<Scalars['String']>;
  /** Currency rate used in calculating the fixed amount. */
  currencyRate?: Maybe<Scalars['SafeNumber']>;
  /** Date when subscription was canceled or will be canceled. */
  dateCanceled?: Maybe<Scalars['DateTime']>;
  dateCreated?: Maybe<Scalars['DateTime']>;
  /** End date for the subscription order period. */
  dateOrderPeriodEnd?: Maybe<Scalars['DateTime']>;
  /** Date the subscription was unpaused, if applicable. */
  datePauseEnd?: Maybe<Scalars['DateTime']>;
  /** Date the subscription was paused, if applicable. */
  datePaused?: Maybe<Scalars['DateTime']>;
  /** When automated payment has failed, this is the date when the system will automatically retry. */
  datePaymentRetry?: Maybe<Scalars['DateTime']>;
  /** End date of the current billing period. */
  datePeriodEnd?: Maybe<Scalars['DateTime']>;
  /** Start date of the current billing period. */
  datePeriodStart?: Maybe<Scalars['DateTime']>;
  /** Date the trial period did end in the past or will end in the future. Changing this value can be used to update the billing period of a subscription with or without a trial. For example, to set the monthly billing date to the 1st of the month, update `date_trial_end `to the first of the next month. */
  dateTrialEnd?: Maybe<Scalars['DateTime']>;
  /** Date the trial period started, if applicable. */
  dateTrialStart?: Maybe<Scalars['DateTime']>;
  dateUpdated?: Maybe<Scalars['DateTime']>;
  /** Total discount amount. */
  discountTotal?: Maybe<Scalars['SafeNumber']>;
  /** List of all discounts applied to the subscription. */
  discounts?: Maybe<Array<Maybe<SwellSubscriptionDiscount>>>;
  /** Grand total of the next invoice including line items and taxes. */
  grandTotal?: Maybe<Scalars['SafeNumber']>;
  id?: Maybe<Scalars['ID']>;
  interval?: Maybe<Scalars['String']>;
  intervalCount?: Maybe<Scalars['Int']>;
  /** Amount invoiced for the last billing period. */
  invoiceTotal?: Maybe<Scalars['SafeNumber']>;
  /** Total discount applied to line items. */
  itemDiscount?: Maybe<Scalars['SafeNumber']>;
  /** Total taxes applied to line items. */
  itemTax?: Maybe<Scalars['SafeNumber']>;
  /** Amount invoiced for the last billing period. */
  itemTotal?: Maybe<Scalars['SafeNumber']>;
  /** List of invoice line items added to the subscription. Recurring items are charged repeatedly, otherwise they are charged on the next invoice and then removed from the subscription. */
  items?: Maybe<Array<Maybe<SwellSubscriptionItem>>>;
  /** The order number for the subscription, based on the store order number format. */
  number?: Maybe<Scalars['String']>;
  /** Plan options matching one or more of `product.options`. When setting this value, specify either option `id` or `name` (case-insensitive) to identify the option. */
  options?: Maybe<Array<Maybe<SwellSubscriptionOption>>>;
  /** ID of the order that originated the subscription, if applicable. */
  orderId?: Maybe<Scalars['ID']>;
  /** Order schedule for the subscription plan. */
  orderSchedule?: Maybe<SwellSubscriptionOrderSchedule>;
  orders?: Maybe<SwellOrders>;
  /** Indicates the last invoice was fully paid. */
  paid?: Maybe<Scalars['Boolean']>;
  /** Indicates whether or not a subscription is paused. */
  paused?: Maybe<Scalars['Boolean']>;
  /** Balance of payments on the invoice for the last billing period. A negative number indicates payment is owed, while a positive balance indicates refund is due. Zero balance indicates the invoice was fully paid. */
  paymentBalance?: Maybe<Scalars['SafeNumber']>;
  /** Total amount of payments for the last billing period. */
  paymentTotal?: Maybe<Scalars['SafeNumber']>;
  payments?: Maybe<Array<Maybe<SwellPayment>>>;
  /** ID of the subscription plan. */
  planId?: Maybe<Scalars['ID']>;
  /** Name of the subscription plan. */
  planName?: Maybe<Scalars['String']>;
  /** Price of the plan. Plan price can be overridden when creating or updating a subscription. */
  price?: Maybe<Scalars['SafeNumber']>;
  /** Total price of the plan (`price * quantity`). */
  priceTotal?: Maybe<Scalars['SafeNumber']>;
  product?: Maybe<SwellProduct>;
  /** Total discount amount of the subscription plan, divided by quantity. */
  productDiscountEach?: Maybe<Scalars['SafeNumber']>;
  /** Total discount applied to the subscription plan. */
  productDiscountTotal?: Maybe<Scalars['SafeNumber']>;
  /** List of discounts applied to the subscription plan by coupons. */
  productDiscounts?: Maybe<Array<Maybe<SwellSubscriptionProductDiscount>>>;
  /** ID of the subscription plan product. */
  productId?: Maybe<Scalars['ID']>;
  /** Total tax amount of the subscription plan, divided by quantity. */
  productTaxEach?: Maybe<Scalars['SafeNumber']>;
  /** Total tax applied to the subscription plan. */
  productTaxTotal?: Maybe<Scalars['SafeNumber']>;
  /** Quantity of the plan to charge. */
  quantity?: Maybe<Scalars['Int']>;
  /** Total recurring discount applied to the subscription including line items. */
  recurringDiscountTotal?: Maybe<Scalars['SafeNumber']>;
  /** Total discount applied to recurring line items. */
  recurringItemDiscount?: Maybe<Scalars['SafeNumber']>;
  /** Total taxes applied to recurring line items. */
  recurringItemTax?: Maybe<Scalars['SafeNumber']>;
  /** Sum of all recurring line items before discounts and taxes. */
  recurringItemTotal?: Maybe<Scalars['SafeNumber']>;
  /** Total of taxes applied separately from the subscription plan and recurring line items. */
  recurringTaxIncludedTotal?: Maybe<Scalars['SafeNumber']>;
  /** Total taxes applied to the subscription including recurring line items. */
  recurringTaxTotal?: Maybe<Scalars['SafeNumber']>;
  /** Recurring total of the subscription including line items and taxes. */
  recurringTotal?: Maybe<Scalars['SafeNumber']>;
  /** Total amount of refunds for the last billing period. */
  refundTotal?: Maybe<Scalars['SafeNumber']>;
  /** Total shipping price after discounts. */
  shipmentTotal?: Maybe<Scalars['SafeNumber']>;
  /** Subscription shipping details. */
  shipping?: Maybe<SwellSubscriptionShipping>;
  /** Current status of the subscription. Can be `pending`, `active`, `trial`, `pastdue`, `unpaid`, `canceled`, or `paid`. */
  status?: Maybe<Scalars['String']>;
  /** Sum of all line items before discounts and taxes. */
  subTotal?: Maybe<Scalars['SafeNumber']>;
  /** Indicates the subscription plan price includes taxes. */
  taxIncluded?: Maybe<Scalars['Boolean']>;
  /** Total of taxes applied separately from the subscription plan and line items. */
  taxIncludedTotal?: Maybe<Scalars['SafeNumber']>;
  /** Total taxes applied to the subscription including line items. */
  taxTotal?: Maybe<Scalars['SafeNumber']>;
  /** List of taxes applied to the subscription. */
  taxes?: Maybe<Array<Maybe<SwellSubscriptionTax>>>;
  /** When true, taxes are not applied to the subscription. When false, taxes are calculated and applied to the subscription. */
  taxesFixed?: Maybe<Scalars['Boolean']>;
  /** Indicates the subscription is in a trial period and the first invoice will be issued on `date_trial_end`. */
  trial?: Maybe<Scalars['Boolean']>;
  trialDays?: Maybe<Scalars['Int']>;
  /** Indicates the last invoice was marked as unpaid. This occurs automatically after all payment attempts are exhausted, as configured in subscription settings. */
  unpaid?: Maybe<Scalars['Boolean']>;
  variant?: Maybe<SwellProductVariant>;
  /** ID of the subscription plan variant, if applicable. */
  variantId?: Maybe<Scalars['ID']>;
};


/** Subscription */
export type SwellSubscriptionAccountArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
};


/** Subscription */
export type SwellSubscriptionOrdersArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<Scalars['JSON']>;
};


/** Subscription */
export type SwellSubscriptionPaymentsArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
};

/** Subscription billing details. */
export type SwellSubscriptionBilling = {
  __typename?: 'SwellSubscriptionBilling';
  accountCardId?: Maybe<Scalars['ID']>;
  address1?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  card?: Maybe<SwellSubscriptionBillingCard>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  default?: Maybe<Scalars['Boolean']>;
  firstName?: Maybe<Scalars['String']>;
  intent?: Maybe<Scalars['JSON']>;
  lastName?: Maybe<Scalars['String']>;
  method?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  useAccount?: Maybe<Scalars['Boolean']>;
  zip?: Maybe<Scalars['String']>;
};

export type SwellSubscriptionBillingCard = {
  __typename?: 'SwellSubscriptionBillingCard';
  addressCheck?: Maybe<Scalars['String']>;
  brand?: Maybe<Scalars['String']>;
  cvcCheck?: Maybe<Scalars['String']>;
  displayBrand?: Maybe<Scalars['String']>;
  expMonth?: Maybe<Scalars['Int']>;
  expYear?: Maybe<Scalars['Int']>;
  gateway?: Maybe<Scalars['String']>;
  last4?: Maybe<Scalars['String']>;
  test?: Maybe<Scalars['Boolean']>;
  token?: Maybe<Scalars['String']>;
  zipCheck?: Maybe<Scalars['String']>;
};

export type SwellSubscriptionBillingCardInput = {
  addressCheck?: InputMaybe<Scalars['String']>;
  brand?: InputMaybe<Scalars['String']>;
  cvcCheck?: InputMaybe<Scalars['String']>;
  displayBrand?: InputMaybe<Scalars['String']>;
  expMonth?: InputMaybe<Scalars['Int']>;
  expYear?: InputMaybe<Scalars['Int']>;
  gateway?: InputMaybe<Scalars['String']>;
  last4?: InputMaybe<Scalars['String']>;
  test?: InputMaybe<Scalars['Boolean']>;
  token?: InputMaybe<Scalars['String']>;
  zipCheck?: InputMaybe<Scalars['String']>;
};

export type SwellSubscriptionBillingInput = {
  accountCardId?: InputMaybe<Scalars['ID']>;
  address1?: InputMaybe<Scalars['String']>;
  address2?: InputMaybe<Scalars['String']>;
  card?: InputMaybe<SwellSubscriptionBillingCardInput>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  default?: InputMaybe<Scalars['Boolean']>;
  firstName?: InputMaybe<Scalars['String']>;
  intent?: InputMaybe<Scalars['JSON']>;
  lastName?: InputMaybe<Scalars['String']>;
  method?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  useAccount?: InputMaybe<Scalars['Boolean']>;
  zip?: InputMaybe<Scalars['String']>;
};

/** Billing schedule for subscription plan. */
export type SwellSubscriptionBillingSchedule = {
  __typename?: 'SwellSubscriptionBillingSchedule';
  dateLimitEnd?: Maybe<Scalars['DateTime']>;
  interval?: Maybe<Scalars['String']>;
  intervalCount?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  limitCurrent?: Maybe<Scalars['Int']>;
  trialDays?: Maybe<Scalars['Int']>;
};

export type SwellSubscriptionBillingScheduleInput = {
  dateLimitEnd?: InputMaybe<Scalars['DateTime']>;
  interval?: InputMaybe<Scalars['String']>;
  intervalCount?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  limitCurrent?: InputMaybe<Scalars['Int']>;
  trialDays?: InputMaybe<Scalars['Int']>;
};

export type SwellSubscriptionContent = {
  __typename?: 'SwellSubscriptionContent';
  dateOrderPeriodStart?: Maybe<Scalars['DateTime']>;
};

/** List of all discounts applied to the subscription. */
export type SwellSubscriptionDiscount = {
  __typename?: 'SwellSubscriptionDiscount';
  amount?: Maybe<Scalars['SafeNumber']>;
  id?: Maybe<Scalars['String']>;
  rule?: Maybe<Scalars['JSON']>;
  /** References the related discount source object (e.g., promotion or coupon) */
  sourceId?: Maybe<Scalars['ID']>;
  type?: Maybe<Scalars['String']>;
};

export type SwellSubscriptionInput = {
  billing?: InputMaybe<SwellSubscriptionBillingInput>;
  billingSchedule?: InputMaybe<SwellSubscriptionBillingScheduleInput>;
  cancelAtEnd?: InputMaybe<Scalars['Boolean']>;
  canceled?: InputMaybe<Scalars['Boolean']>;
  couponCode?: InputMaybe<Scalars['String']>;
  datePauseEnd?: InputMaybe<Scalars['DateTime']>;
  items?: InputMaybe<Array<InputMaybe<SwellSubscriptionItemInput>>>;
  options?: InputMaybe<Array<InputMaybe<SwellSubscriptionOptionInput>>>;
  paused?: InputMaybe<Scalars['Boolean']>;
  planId?: InputMaybe<Scalars['ID']>;
  productId?: InputMaybe<Scalars['ID']>;
  quantity?: InputMaybe<Scalars['Int']>;
  shipping?: InputMaybe<SwellSubscriptionShippingInput>;
  variantId?: InputMaybe<Scalars['ID']>;
};

/** List of invoice line items added to the subscription. Recurring items are charged repeatedly, otherwise they are charged on the next invoice and then removed from the subscription. */
export type SwellSubscriptionItem = {
  __typename?: 'SwellSubscriptionItem';
  bundleItems?: Maybe<Array<Maybe<SwellSubscriptionItemBundleItem>>>;
  discountEach?: Maybe<Scalars['SafeNumber']>;
  discountTotal?: Maybe<Scalars['SafeNumber']>;
  id?: Maybe<Scalars['ID']>;
  options?: Maybe<Array<Maybe<SwellSubscriptionItemOption>>>;
  price?: Maybe<Scalars['SafeNumber']>;
  priceTotal?: Maybe<Scalars['SafeNumber']>;
  product?: Maybe<SwellProduct>;
  productId?: Maybe<Scalars['ID']>;
  quantity?: Maybe<Scalars['Int']>;
  taxEach?: Maybe<Scalars['SafeNumber']>;
  taxTotal?: Maybe<Scalars['SafeNumber']>;
  taxes?: Maybe<Array<Maybe<SwellSubscriptionItemTax>>>;
  variantId?: Maybe<Scalars['ID']>;
};


/** List of invoice line items added to the subscription. Recurring items are charged repeatedly, otherwise they are charged on the next invoice and then removed from the subscription. */
export type SwellSubscriptionItemProductArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
};

export type SwellSubscriptionItemBundleItem = {
  __typename?: 'SwellSubscriptionItemBundleItem';
  id?: Maybe<Scalars['ID']>;
  product?: Maybe<SwellProduct>;
  productId?: Maybe<Scalars['ID']>;
  quantity?: Maybe<Scalars['Int']>;
  quantityTotal?: Maybe<Scalars['Int']>;
  variantId?: Maybe<Scalars['ID']>;
};


export type SwellSubscriptionItemBundleItemProductArgs = {
  _currency?: InputMaybe<Scalars['String']>;
  _locale?: InputMaybe<Scalars['String']>;
};

export type SwellSubscriptionItemInput = {
  id?: InputMaybe<Scalars['ID']>;
  options?: InputMaybe<Array<InputMaybe<SwellSubscriptionItemOptionInput>>>;
  productId?: InputMaybe<Scalars['ID']>;
  quantity?: InputMaybe<Scalars['Int']>;
  variantId?: InputMaybe<Scalars['ID']>;
};

export type SwellSubscriptionItemOption = {
  __typename?: 'SwellSubscriptionItemOption';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['SafeNumber']>;
  shipmentWeight?: Maybe<Scalars['SafeNumber']>;
  value?: Maybe<Scalars['String']>;
  valueId?: Maybe<Scalars['ID']>;
  variant?: Maybe<Scalars['Boolean']>;
};

export type SwellSubscriptionItemOptionInput = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['SafeNumber']>;
  shipmentWeight?: InputMaybe<Scalars['SafeNumber']>;
  value?: InputMaybe<Scalars['String']>;
  valueId?: InputMaybe<Scalars['ID']>;
  variant?: InputMaybe<Scalars['Boolean']>;
};

export type SwellSubscriptionItemTax = {
  __typename?: 'SwellSubscriptionItemTax';
  amount?: Maybe<Scalars['SafeNumber']>;
  id?: Maybe<Scalars['String']>;
};

/** Plan options matching one or more of `product.options`. When setting this value, specify either option `id` or `name` (case-insensitive) to identify the option. */
export type SwellSubscriptionOption = {
  __typename?: 'SwellSubscriptionOption';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['SafeNumber']>;
  shipmentWeight?: Maybe<Scalars['SafeNumber']>;
  value?: Maybe<Scalars['String']>;
  valueId?: Maybe<Scalars['ID']>;
  variant?: Maybe<Scalars['Boolean']>;
};

export type SwellSubscriptionOptionInput = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['SafeNumber']>;
  shipmentWeight?: InputMaybe<Scalars['SafeNumber']>;
  value?: InputMaybe<Scalars['String']>;
  valueId?: InputMaybe<Scalars['ID']>;
  variant?: InputMaybe<Scalars['Boolean']>;
};

/** Order schedule for the subscription plan. */
export type SwellSubscriptionOrderSchedule = {
  __typename?: 'SwellSubscriptionOrderSchedule';
  dateLimitEnd?: Maybe<Scalars['DateTime']>;
  interval?: Maybe<Scalars['String']>;
  intervalCount?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  limitCurrent?: Maybe<Scalars['Int']>;
};

/** List of discounts applied to the subscription plan by coupons. */
export type SwellSubscriptionProductDiscount = {
  __typename?: 'SwellSubscriptionProductDiscount';
  amount?: Maybe<Scalars['SafeNumber']>;
  id?: Maybe<Scalars['String']>;
};

/** Subscription shipping details. */
export type SwellSubscriptionShipping = {
  __typename?: 'SwellSubscriptionShipping';
  accountAddressId?: Maybe<Scalars['ID']>;
  address1?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  default?: Maybe<Scalars['Boolean']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  pickup?: Maybe<Scalars['Boolean']>;
  price?: Maybe<Scalars['SafeNumber']>;
  service?: Maybe<Scalars['String']>;
  serviceName?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  useAccount?: Maybe<Scalars['Boolean']>;
  zip?: Maybe<Scalars['String']>;
};

export type SwellSubscriptionShippingInput = {
  accountAddressId?: InputMaybe<Scalars['ID']>;
  address1?: InputMaybe<Scalars['String']>;
  address2?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  default?: InputMaybe<Scalars['Boolean']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  pickup?: InputMaybe<Scalars['Boolean']>;
  price?: InputMaybe<Scalars['SafeNumber']>;
  service?: InputMaybe<Scalars['String']>;
  serviceName?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  useAccount?: InputMaybe<Scalars['Boolean']>;
  zip?: InputMaybe<Scalars['String']>;
};

/** List of taxes applied to the subscription. */
export type SwellSubscriptionTax = {
  __typename?: 'SwellSubscriptionTax';
  amount?: Maybe<Scalars['SafeNumber']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  priority?: Maybe<Scalars['Int']>;
  rate?: Maybe<Scalars['SafeNumber']>;
};

export type SwellSubscriptions = {
  __typename?: 'SwellSubscriptions';
  count?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  pageCount?: Maybe<Scalars['Int']>;
  pages?: Maybe<Array<Maybe<Page>>>;
  results?: Maybe<Array<Maybe<SwellSubscription>>>;
};

export type LoginMutationVariables = Exact<{
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
}>;


export type LoginMutation = { __typename?: 'Mutation', loginAccount?: { __typename: 'SuccessfulResponse' } | null };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logoutAccount?: { __typename?: 'SuccessfulResponse', success?: boolean | null } | null };

export type SignupMutationVariables = Exact<{
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
}>;


export type SignupMutation = { __typename?: 'Mutation', createAccount?: { __typename?: 'SwellAccount', email?: string | null } | null };

export type CheckTokenValidityQueryVariables = Exact<{ [key: string]: never; }>;


export type CheckTokenValidityQuery = { __typename?: 'Query', session?: { __typename?: 'Session', accountId?: string | null } | null };

export type SendResetPasswordMailMutationVariables = Exact<{
  email?: InputMaybe<Scalars['String']>;
  passwordResetUrl?: InputMaybe<Scalars['String']>;
}>;


export type SendResetPasswordMailMutation = { __typename?: 'Mutation', sendAccountRecovery?: { __typename?: 'SuccessfulResponse', success?: boolean | null } | null };

export type ResetPasswordMutationVariables = Exact<{
  password?: InputMaybe<Scalars['String']>;
  passwordResetKey?: InputMaybe<Scalars['String']>;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', recoverAccount?: { __typename?: 'SuccessfulResponse', success?: boolean | null } | null };

export type GetAccountDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAccountDetailsQuery = { __typename?: 'Query', account?: { __typename?: 'SwellAccount', name?: string | null, email?: string | null } | null };

export type AddToCartMutationVariables = Exact<{
  cartItemInput?: InputMaybe<SwellCartItemInput>;
}>;


export type AddToCartMutation = { __typename?: 'Mutation', addCartItem?: { __typename?: 'SwellCart', checkoutId?: string | null, checkoutUrl?: string | null, grandTotal?: any | null, items?: Array<{ __typename?: 'SwellCartItem', id?: string | null, quantity?: number | null, price?: any | null, priceTotal?: any | null, discountTotal?: any | null, discountEach?: any | null, taxTotal?: any | null, productId?: string | null, variantId?: string | null, purchaseOption?: { __typename?: 'SwellCartItemPurchaseOption', type?: string | null, planId?: string | null, planName?: string | null, billingSchedule?: { __typename?: 'SwellCartItemPurchaseOptionBillingSchedule', interval?: string | null, intervalCount?: number | null, trialDays?: number | null } | null, orderSchedule?: { __typename?: 'SwellCartItemPurchaseOptionOrderSchedule', interval?: string | null, intervalCount?: number | null } | null } | null, options?: Array<{ __typename?: 'SwellCartItemOption', id?: string | null, name?: string | null, value?: string | null, valueId?: string | null, variant?: boolean | null, price?: any | null } | null> | null, taxes?: Array<{ __typename?: 'SwellCartItemTax', id?: string | null, amount?: any | null } | null> | null, product?: { __typename?: 'SwellProduct', id?: string | null, name?: string | null, slug?: string | null, stockTracking?: boolean | null, stockPurchasable?: boolean | null, stockLevel?: number | null, images?: Array<{ __typename?: 'SwellProductImage', id?: string | null, caption?: string | null, file?: { __typename?: 'SwellProductImageFile', url?: string | null, width?: number | null, height?: number | null } | null } | null> | null } | null, variant?: { __typename?: 'SwellProductVariant', name?: string | null, price?: any | null, stockLevel?: number | null, currency?: string | null, purchaseOptions?: { __typename?: 'SwellProductVariantPurchaseOptions', standard?: { __typename?: 'SwellProductVariantPurchaseOptionsStandard', price?: any | null } | null } | null, images?: Array<{ __typename?: 'SwellProductVariantImage', id?: string | null, caption?: string | null, file?: { __typename?: 'SwellProductVariantImageFile', url?: string | null, width?: number | null, height?: number | null } | null } | null> | null } | null } | null> | null } | null };

export type UpdateCartItemMutationVariables = Exact<{
  itemId?: InputMaybe<Scalars['String']>;
  input?: InputMaybe<SwellCartItemInput>;
}>;


export type UpdateCartItemMutation = { __typename?: 'Mutation', updateCartItem?: { __typename?: 'SwellCart', checkoutUrl?: string | null, grandTotal?: any | null, items?: Array<{ __typename?: 'SwellCartItem', id?: string | null, quantity?: number | null, price?: any | null, priceTotal?: any | null, discountTotal?: any | null, discountEach?: any | null, taxTotal?: any | null, productId?: string | null, variantId?: string | null, purchaseOption?: { __typename?: 'SwellCartItemPurchaseOption', type?: string | null, planId?: string | null, planName?: string | null, billingSchedule?: { __typename?: 'SwellCartItemPurchaseOptionBillingSchedule', interval?: string | null, intervalCount?: number | null, trialDays?: number | null } | null, orderSchedule?: { __typename?: 'SwellCartItemPurchaseOptionOrderSchedule', interval?: string | null, intervalCount?: number | null } | null } | null, options?: Array<{ __typename?: 'SwellCartItemOption', id?: string | null, name?: string | null, value?: string | null, valueId?: string | null, variant?: boolean | null, price?: any | null } | null> | null, taxes?: Array<{ __typename?: 'SwellCartItemTax', id?: string | null, amount?: any | null } | null> | null, product?: { __typename?: 'SwellProduct', id?: string | null, name?: string | null, slug?: string | null, stockTracking?: boolean | null, stockPurchasable?: boolean | null, stockLevel?: number | null, images?: Array<{ __typename?: 'SwellProductImage', id?: string | null, caption?: string | null, file?: { __typename?: 'SwellProductImageFile', url?: string | null, width?: number | null, height?: number | null } | null } | null> | null } | null, variant?: { __typename?: 'SwellProductVariant', name?: string | null, price?: any | null, stockLevel?: number | null, currency?: string | null, purchaseOptions?: { __typename?: 'SwellProductVariantPurchaseOptions', standard?: { __typename?: 'SwellProductVariantPurchaseOptionsStandard', price?: any | null } | null } | null, images?: Array<{ __typename?: 'SwellProductVariantImage', id?: string | null, caption?: string | null, file?: { __typename?: 'SwellProductVariantImageFile', url?: string | null, width?: number | null, height?: number | null } | null } | null> | null } | null } | null> | null } | null };

export type DeleteCartItemMutationVariables = Exact<{
  itemId?: InputMaybe<Scalars['String']>;
}>;


export type DeleteCartItemMutation = { __typename?: 'Mutation', deleteCartItem?: { __typename?: 'SwellCart', checkoutUrl?: string | null, grandTotal?: any | null, items?: Array<{ __typename?: 'SwellCartItem', id?: string | null, quantity?: number | null, price?: any | null, priceTotal?: any | null, discountTotal?: any | null, discountEach?: any | null, taxTotal?: any | null, productId?: string | null, variantId?: string | null, purchaseOption?: { __typename?: 'SwellCartItemPurchaseOption', type?: string | null, planId?: string | null, planName?: string | null, billingSchedule?: { __typename?: 'SwellCartItemPurchaseOptionBillingSchedule', interval?: string | null, intervalCount?: number | null, trialDays?: number | null } | null, orderSchedule?: { __typename?: 'SwellCartItemPurchaseOptionOrderSchedule', interval?: string | null, intervalCount?: number | null } | null } | null, options?: Array<{ __typename?: 'SwellCartItemOption', id?: string | null, name?: string | null, value?: string | null, valueId?: string | null, variant?: boolean | null, price?: any | null } | null> | null, taxes?: Array<{ __typename?: 'SwellCartItemTax', id?: string | null, amount?: any | null } | null> | null, product?: { __typename?: 'SwellProduct', id?: string | null, name?: string | null, slug?: string | null, stockTracking?: boolean | null, stockPurchasable?: boolean | null, stockLevel?: number | null, images?: Array<{ __typename?: 'SwellProductImage', id?: string | null, caption?: string | null, file?: { __typename?: 'SwellProductImageFile', url?: string | null, width?: number | null, height?: number | null } | null } | null> | null } | null, variant?: { __typename?: 'SwellProductVariant', name?: string | null, price?: any | null, stockLevel?: number | null, currency?: string | null, purchaseOptions?: { __typename?: 'SwellProductVariantPurchaseOptions', standard?: { __typename?: 'SwellProductVariantPurchaseOptionsStandard', price?: any | null } | null } | null, images?: Array<{ __typename?: 'SwellProductVariantImage', id?: string | null, caption?: string | null, file?: { __typename?: 'SwellProductVariantImageFile', url?: string | null, width?: number | null, height?: number | null } | null } | null> | null } | null } | null> | null } | null };

export type GetCartQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCartQuery = { __typename?: 'Query', cart?: { __typename?: 'SwellCart', checkoutUrl?: string | null, grandTotal?: any | null, items?: Array<{ __typename?: 'SwellCartItem', id?: string | null, quantity?: number | null, price?: any | null, priceTotal?: any | null, discountTotal?: any | null, discountEach?: any | null, taxTotal?: any | null, productId?: string | null, variantId?: string | null, purchaseOption?: { __typename?: 'SwellCartItemPurchaseOption', type?: string | null, planId?: string | null, planName?: string | null, billingSchedule?: { __typename?: 'SwellCartItemPurchaseOptionBillingSchedule', interval?: string | null, intervalCount?: number | null, trialDays?: number | null } | null, orderSchedule?: { __typename?: 'SwellCartItemPurchaseOptionOrderSchedule', interval?: string | null, intervalCount?: number | null } | null } | null, options?: Array<{ __typename?: 'SwellCartItemOption', id?: string | null, name?: string | null, value?: string | null, valueId?: string | null, variant?: boolean | null, price?: any | null } | null> | null, taxes?: Array<{ __typename?: 'SwellCartItemTax', id?: string | null, amount?: any | null } | null> | null, product?: { __typename?: 'SwellProduct', id?: string | null, name?: string | null, slug?: string | null, stockTracking?: boolean | null, stockPurchasable?: boolean | null, stockLevel?: number | null, images?: Array<{ __typename?: 'SwellProductImage', id?: string | null, caption?: string | null, file?: { __typename?: 'SwellProductImageFile', url?: string | null, width?: number | null, height?: number | null } | null } | null> | null } | null, variant?: { __typename?: 'SwellProductVariant', name?: string | null, price?: any | null, stockLevel?: number | null, currency?: string | null, purchaseOptions?: { __typename?: 'SwellProductVariantPurchaseOptions', standard?: { __typename?: 'SwellProductVariantPurchaseOptionsStandard', price?: any | null } | null } | null, images?: Array<{ __typename?: 'SwellProductVariantImage', id?: string | null, caption?: string | null, file?: { __typename?: 'SwellProductVariantImageFile', url?: string | null, width?: number | null, height?: number | null } | null } | null> | null } | null } | null> | null } | null };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', categories?: { __typename?: 'SwellCategories', results?: Array<{ __typename?: 'SwellCategory', name?: string | null, slug?: string | null, images?: Array<{ __typename?: 'SwellCategoryImage', id?: string | null, caption?: string | null, file?: { __typename?: 'SwellCategoryImageFile', url?: string | null, width?: number | null, height?: number | null } | null } | null> | null, content?: { __typename?: 'SwellCategoryContent', showProductsPrice?: boolean | null, showProductsDescription?: boolean | null, showFeaturedCategories?: boolean | null, productsPerRow?: string | null, enableQuickAdd?: boolean | null, featuredCategories?: Array<{ __typename?: 'SwellCategoryContentFeaturedCategory', category?: { __typename?: 'SwellCategory', slug?: string | null, name?: string | null, description?: string | null, images?: Array<{ __typename?: 'SwellCategoryImage', caption?: string | null, id?: string | null, file?: { __typename?: 'SwellCategoryImageFile', url?: string | null, width?: number | null, height?: number | null } | null } | null> | null } | null } | null> | null } | null } | null> | null } | null };

export type GetCategoryPathsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoryPathsQuery = { __typename?: 'Query', categories?: { __typename?: 'SwellCategories', results?: Array<{ __typename?: 'SwellCategory', slug?: string | null } | null> | null } | null };

export type GetCategoryQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']>;
}>;


export type GetCategoryQuery = { __typename?: 'Query', categoryBySlug?: { __typename?: 'SwellCategory', name?: string | null, slug?: string | null, description?: string | null, metaKeywords?: string | null, metaDescription?: string | null, products?: Array<{ __typename?: 'SwellProduct', id?: string | null, name?: string | null, description?: string | null, slug?: string | null, price?: any | null, currency?: string | null, images?: Array<{ __typename?: 'SwellProductImage', caption?: string | null, file?: { __typename?: 'SwellProductImageFile', width?: number | null, height?: number | null, url?: string | null } | null } | null> | null, options?: Array<{ __typename?: 'SwellProductOption', id?: string | null, attributeId?: string | null, name?: string | null, inputType?: string | null, active?: boolean | null, required?: boolean | null, variant?: boolean | null, values?: Array<{ __typename?: 'SwellProductOptionValue', id?: string | null, name?: string | null, price?: any | null, description?: string | null } | null> | null } | null> | null, purchaseOptions?: { __typename?: 'SwellProductPurchaseOptions', standard?: { __typename?: 'SwellProductPurchaseOptionsStandard', price?: any | null, sale?: boolean | null, salePrice?: any | null } | null, subscription?: { __typename?: 'SwellProductPurchaseOptionsSubscription', active?: boolean | null } | null } | null, variants?: { __typename?: 'SwellProductsVariants', results?: Array<{ __typename?: 'SwellProductVariant', name?: string | null, price?: any | null, optionValueIds?: Array<string | null> | null, stockLevel?: number | null, currency?: string | null, prices?: Array<{ __typename?: 'SwellProductVariantPrice', price?: any | null, discountPercent?: any | null, quantityMin?: number | null, quantityMax?: number | null, accountGroup?: string | null } | null> | null, images?: Array<{ __typename?: 'SwellProductVariantImage', id?: string | null, caption?: string | null, file?: { __typename?: 'SwellProductVariantImageFile', url?: string | null, width?: number | null, height?: number | null } | null } | null> | null, purchaseOptions?: { __typename?: 'SwellProductVariantPurchaseOptions', standard?: { __typename?: 'SwellProductVariantPurchaseOptionsStandard', price?: any | null, sale?: boolean | null, salePrice?: any | null, prices?: Array<{ __typename?: 'SwellProductVariantPurchaseOptionsStandardPrice', price?: any | null, discountPercent?: any | null, quantityMin?: number | null, quantityMax?: number | null, accountGroup?: string | null } | null> | null } | null } | null } | null> | null } | null } | null> | null } | null };

export type GetFeaturedCategoryQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']>;
}>;


export type GetFeaturedCategoryQuery = { __typename?: 'Query', categoryBySlug?: { __typename?: 'SwellCategory', name?: string | null, description?: string | null, slug?: string | null, images?: Array<{ __typename?: 'SwellCategoryImage', caption?: string | null, file?: { __typename?: 'SwellCategoryImageFile', url?: string | null, width?: number | null, height?: number | null } | null } | null> | null } | null };

export type GetFilteredProductsQueryVariables = Exact<{
  filter?: InputMaybe<Scalars['JSON']>;
}>;


export type GetFilteredProductsQuery = { __typename?: 'Query', products?: { __typename?: 'SwellProducts', count?: number | null, results?: Array<{ __typename?: 'SwellProduct', id?: string | null, name?: string | null, description?: string | null, slug?: string | null, price?: any | null, currency?: string | null, attributes?: any | null, categories?: Array<{ __typename?: 'SwellCategory', name?: string | null, slug?: string | null } | null> | null, images?: Array<{ __typename?: 'SwellProductImage', caption?: string | null, file?: { __typename?: 'SwellProductImageFile', width?: number | null, height?: number | null, url?: string | null } | null } | null> | null, options?: Array<{ __typename?: 'SwellProductOption', id?: string | null, attributeId?: string | null, name?: string | null, inputType?: string | null, active?: boolean | null, required?: boolean | null, variant?: boolean | null, values?: Array<{ __typename?: 'SwellProductOptionValue', id?: string | null, name?: string | null, price?: any | null, description?: string | null } | null> | null } | null> | null, purchaseOptions?: { __typename?: 'SwellProductPurchaseOptions', standard?: { __typename?: 'SwellProductPurchaseOptionsStandard', price?: any | null, sale?: boolean | null, salePrice?: any | null } | null, subscription?: { __typename?: 'SwellProductPurchaseOptionsSubscription', active?: boolean | null } | null } | null, variants?: { __typename?: 'SwellProductsVariants', results?: Array<{ __typename?: 'SwellProductVariant', name?: string | null, price?: any | null, optionValueIds?: Array<string | null> | null, stockLevel?: number | null, currency?: string | null, prices?: Array<{ __typename?: 'SwellProductVariantPrice', price?: any | null, discountPercent?: any | null, quantityMin?: number | null, quantityMax?: number | null, accountGroup?: string | null } | null> | null, images?: Array<{ __typename?: 'SwellProductVariantImage', id?: string | null, caption?: string | null, file?: { __typename?: 'SwellProductVariantImageFile', url?: string | null, width?: number | null, height?: number | null } | null } | null> | null, purchaseOptions?: { __typename?: 'SwellProductVariantPurchaseOptions', standard?: { __typename?: 'SwellProductVariantPurchaseOptionsStandard', price?: any | null, sale?: boolean | null, salePrice?: any | null, prices?: Array<{ __typename?: 'SwellProductVariantPurchaseOptionsStandardPrice', price?: any | null, discountPercent?: any | null, quantityMin?: number | null, quantityMax?: number | null, accountGroup?: string | null } | null> | null } | null } | null } | null> | null } | null } | null> | null } | null };

export type GetCategoryInCurrencyQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
}>;


export type GetCategoryInCurrencyQuery = { __typename?: 'Query', categoryBySlug?: { __typename?: 'SwellCategory', products?: Array<{ __typename?: 'SwellProduct', id?: string | null, price?: any | null, currency?: string | null } | null> | null } | null };

export type GetCategorySlugsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategorySlugsQuery = { __typename?: 'Query', categories?: { __typename?: 'SwellCategories', results?: Array<{ __typename?: 'SwellCategory', slug?: string | null } | null> | null } | null };

export type GetCategoryPreviewDataQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']>;
}>;


export type GetCategoryPreviewDataQuery = { __typename?: 'Query', categoryBySlug?: { __typename?: 'SwellCategory', name?: string | null, description?: string | null, slug?: string | null, images?: Array<{ __typename?: 'SwellCategoryImage', caption?: string | null, file?: { __typename?: 'SwellCategoryImageFile', url?: string | null, width?: number | null, height?: number | null } | null } | null> | null } | null };

export type GetCategoryWithProductSlugsQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']>;
}>;


export type GetCategoryWithProductSlugsQuery = { __typename?: 'Query', categoryBySlug?: { __typename?: 'SwellCategory', slug?: string | null, products?: Array<{ __typename?: 'SwellProduct', slug?: string | null } | null> | null } | null };

export type GetContentPagesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetContentPagesQuery = { __typename?: 'Query', contentPages?: { __typename?: 'SwellContentPages', results?: Array<{ __typename?: 'SwellContentPage', slug?: string | null, published?: boolean | null } | null> | null } | null };

export type GetOrdersQueryVariables = Exact<{
  currency?: InputMaybe<Scalars['String']>;
}>;


export type GetOrdersQuery = { __typename?: 'Query', orders?: { __typename?: 'SwellOrders', results?: Array<{ __typename?: 'SwellOrder', status?: string | null, id?: string | null, number?: string | null, dateCreated?: any | null, itemQuantity?: number | null, currency?: string | null, grandTotal?: any | null, subTotal?: any | null, items?: Array<{ __typename?: 'SwellOrderItem', product?: { __typename?: 'SwellProduct', images?: Array<{ __typename?: 'SwellProductImage', id?: string | null, caption?: string | null, file?: { __typename?: 'SwellProductImageFile', url?: string | null, width?: number | null, height?: number | null } | null } | null> | null } | null } | null> | null } | null> | null } | null };

export type GetOrderByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
}>;


export type GetOrderByIdQuery = { __typename?: 'Query', orderById?: { __typename?: 'SwellOrder', status?: string | null, id?: string | null, number?: string | null, dateCreated?: any | null, itemQuantity?: number | null, currency?: string | null, grandTotal?: any | null, subTotal?: any | null, shipmentTotal?: any | null, discountTotal?: any | null, taxTotal?: any | null, comments?: string | null, items?: Array<{ __typename?: 'SwellOrderItem', quantity?: number | null, priceTotal?: any | null, purchaseOption?: { __typename?: 'SwellOrderItemPurchaseOption', billingSchedule?: { __typename?: 'SwellOrderItemPurchaseOptionBillingSchedule', interval?: string | null, intervalCount?: number | null } | null } | null, product?: { __typename?: 'SwellProduct', name?: string | null, slug?: string | null, images?: Array<{ __typename?: 'SwellProductImage', id?: string | null, caption?: string | null, file?: { __typename?: 'SwellProductImageFile', url?: string | null, width?: number | null, height?: number | null } | null } | null> | null } | null, options?: Array<{ __typename?: 'SwellOrderItemOption', value?: string | null } | null> | null } | null> | null, refunds?: { __typename?: 'SwellOrdersRefunds', results?: Array<{ __typename?: 'SwellOrderRefund', amount?: any | null, currency?: string | null } | null> | null } | null, shipping?: { __typename?: 'SwellOrderShipping', name?: string | null, address1?: string | null, address2?: string | null, city?: string | null, state?: string | null, country?: string | null, zip?: string | null, phone?: string | null, serviceName?: string | null, price?: any | null } | null, billing?: { __typename?: 'SwellOrderBilling', name?: string | null, address1?: string | null, address2?: string | null, city?: string | null, state?: string | null, country?: string | null, zip?: string | null, method?: string | null, card?: { __typename?: 'SwellOrderBillingCard', brand?: string | null, last4?: string | null, expMonth?: number | null, expYear?: number | null } | null } | null } | null };

export type GetProductsPaginatedQueryVariables = Exact<{
  currency?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<Scalars['JSON']>;
}>;


export type GetProductsPaginatedQuery = { __typename?: 'Query', products?: { __typename?: 'SwellProducts', count?: number | null, page?: number | null, results?: Array<{ __typename?: 'SwellProduct', id?: string | null, name?: string | null, description?: string | null, slug?: string | null, price?: any | null, sale?: boolean | null, salePrice?: any | null, origPrice?: any | null, currency?: string | null, categories?: Array<{ __typename?: 'SwellCategory', name?: string | null, slug?: string | null } | null> | null, images?: Array<{ __typename?: 'SwellProductImage', caption?: string | null, file?: { __typename?: 'SwellProductImageFile', width?: number | null, height?: number | null, url?: string | null } | null } | null> | null, purchaseOptions?: { __typename?: 'SwellProductPurchaseOptions', standard?: { __typename?: 'SwellProductPurchaseOptionsStandard', price?: any | null, sale?: boolean | null, salePrice?: any | null, origPrice?: any | null } | null } | null, variants?: { __typename?: 'SwellProductsVariants', results?: Array<{ __typename?: 'SwellProductVariant', id?: string | null, name?: string | null, price?: any | null, origPrice?: any | null, optionValueIds?: Array<string | null> | null, images?: Array<{ __typename?: 'SwellProductVariantImage', caption?: string | null, file?: { __typename?: 'SwellProductVariantImageFile', width?: number | null, height?: number | null, url?: string | null } | null } | null> | null } | null> | null } | null } | null> | null } | null };

export type GetProductsCountQueryVariables = Exact<{
  currency?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<Scalars['JSON']>;
}>;


export type GetProductsCountQuery = { __typename?: 'Query', products?: { __typename?: 'SwellProducts', count?: number | null } | null };

export type GetProductFiltersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductFiltersQuery = { __typename?: 'Query', attributes?: { __typename?: 'SwellAttributes', results?: Array<{ __typename?: 'SwellAttribute', name?: string | null, type?: string | null, values?: Array<any | null> | null } | null> | null } | null, categories?: { __typename?: 'SwellCategories', results?: Array<{ __typename?: 'SwellCategory', name?: string | null, slug?: string | null, description?: string | null } | null> | null } | null };

export type GetAllProductsOptimizedQueryVariables = Exact<{
  currency?: InputMaybe<Scalars['String']>;
}>;


export type GetAllProductsOptimizedQuery = { __typename?: 'Query', products?: { __typename?: 'SwellProducts', count?: number | null, results?: Array<{ __typename?: 'SwellProduct', id?: string | null, name?: string | null, description?: string | null, slug?: string | null, price?: any | null, sale?: boolean | null, salePrice?: any | null, origPrice?: any | null, currency?: string | null, categories?: Array<{ __typename?: 'SwellCategory', name?: string | null, slug?: string | null } | null> | null, images?: Array<{ __typename?: 'SwellProductImage', caption?: string | null, file?: { __typename?: 'SwellProductImageFile', width?: number | null, height?: number | null, url?: string | null } | null } | null> | null, purchaseOptions?: { __typename?: 'SwellProductPurchaseOptions', standard?: { __typename?: 'SwellProductPurchaseOptionsStandard', price?: any | null, sale?: boolean | null, salePrice?: any | null, origPrice?: any | null } | null } | null } | null> | null } | null };

export type GetAllProductsQueryVariables = Exact<{
  currency?: InputMaybe<Scalars['String']>;
}>;


export type GetAllProductsQuery = { __typename?: 'Query', products?: { __typename?: 'SwellProducts', count?: number | null, results?: Array<{ __typename?: 'SwellProduct', id?: string | null, name?: string | null, description?: string | null, slug?: string | null, price?: any | null, sale?: boolean | null, salePrice?: any | null, origPrice?: any | null, currency?: string | null, attributes?: any | null, categories?: Array<{ __typename?: 'SwellCategory', name?: string | null, slug?: string | null } | null> | null, images?: Array<{ __typename?: 'SwellProductImage', caption?: string | null, file?: { __typename?: 'SwellProductImageFile', width?: number | null, height?: number | null, url?: string | null } | null } | null> | null, options?: Array<{ __typename?: 'SwellProductOption', id?: string | null, attributeId?: string | null, name?: string | null, inputType?: string | null, active?: boolean | null, required?: boolean | null, variant?: boolean | null, values?: Array<{ __typename?: 'SwellProductOptionValue', id?: string | null, name?: string | null, price?: any | null, description?: string | null } | null> | null } | null> | null, purchaseOptions?: { __typename?: 'SwellProductPurchaseOptions', standard?: { __typename?: 'SwellProductPurchaseOptionsStandard', price?: any | null, sale?: boolean | null, salePrice?: any | null, origPrice?: any | null } | null, subscription?: { __typename?: 'SwellProductPurchaseOptionsSubscription', active?: boolean | null } | null } | null, variants?: { __typename?: 'SwellProductsVariants', results?: Array<{ __typename?: 'SwellProductVariant', name?: string | null, price?: any | null, origPrice?: any | null, optionValueIds?: Array<string | null> | null, stockLevel?: number | null, currency?: string | null, prices?: Array<{ __typename?: 'SwellProductVariantPrice', price?: any | null, discountPercent?: any | null, quantityMin?: number | null, quantityMax?: number | null, accountGroup?: string | null } | null> | null, images?: Array<{ __typename?: 'SwellProductVariantImage', id?: string | null, caption?: string | null, file?: { __typename?: 'SwellProductVariantImageFile', url?: string | null, width?: number | null, height?: number | null } | null } | null> | null, purchaseOptions?: { __typename?: 'SwellProductVariantPurchaseOptions', standard?: { __typename?: 'SwellProductVariantPurchaseOptionsStandard', price?: any | null, sale?: boolean | null, salePrice?: any | null, origPrice?: any | null, prices?: Array<{ __typename?: 'SwellProductVariantPurchaseOptionsStandardPrice', price?: any | null, discountPercent?: any | null, quantityMin?: number | null, quantityMax?: number | null, accountGroup?: string | null } | null> | null } | null } | null } | null> | null } | null } | null> | null } | null };

export type GetProductsPricesInCurrencyQueryVariables = Exact<{
  currency?: InputMaybe<Scalars['String']>;
}>;


export type GetProductsPricesInCurrencyQuery = { __typename?: 'Query', products?: { __typename?: 'SwellProducts', results?: Array<{ __typename?: 'SwellProduct', id?: string | null, price?: any | null, sale?: boolean | null, origPrice?: any | null, currency?: string | null } | null> | null } | null };

export type GetProductQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
}>;


export type GetProductQuery = { __typename?: 'Query', productBySlug?: { __typename?: 'SwellProduct', slug?: string | null, id?: string | null, name?: string | null, description?: string | null, currency?: string | null, metaTitle?: string | null, metaDescription?: string | null, price?: any | null, sale?: boolean | null, origPrice?: any | null, stockLevel?: number | null, stockStatus?: string | null, stockTracking?: boolean | null, stockPurchasable?: boolean | null, images?: Array<{ __typename?: 'SwellProductImage', id?: string | null, caption?: string | null, file?: { __typename?: 'SwellProductImageFile', url?: string | null, width?: number | null, height?: number | null } | null } | null> | null, categories?: Array<{ __typename?: 'SwellCategory', name?: string | null, slug?: string | null } | null> | null, options?: Array<{ __typename?: 'SwellProductOption', id?: string | null, attributeId?: string | null, name?: string | null, description?: string | null, inputType?: string | null, active?: boolean | null, required?: boolean | null, variant?: boolean | null, parentId?: string | null, parentValueIds?: Array<string | null> | null, inputHint?: string | null, values?: Array<{ __typename?: 'SwellProductOptionValue', id?: string | null, name?: string | null, price?: any | null } | null> | null } | null> | null, purchaseOptions?: { __typename?: 'SwellProductPurchaseOptions', standard?: { __typename?: 'SwellProductPurchaseOptionsStandard', price?: any | null, sale?: boolean | null, salePrice?: any | null, origPrice?: any | null } | null, subscription?: { __typename?: 'SwellProductPurchaseOptionsSubscription', plans?: Array<{ __typename?: 'SwellProductPurchaseOptionsSubscriptionPlan', id?: string | null, name?: string | null, price?: any | null, billingSchedule?: { __typename?: 'SwellProductPurchaseOptionsSubscriptionPlanBillingSchedule', interval?: string | null, intervalCount?: number | null, trialDays?: number | null } | null, orderSchedule?: { __typename?: 'SwellProductPurchaseOptionsSubscriptionPlanOrderSchedule', interval?: string | null, intervalCount?: number | null } | null } | null> | null } | null } | null, upSells?: Array<{ __typename?: 'SwellProductUpSell', product?: { __typename?: 'SwellProduct', id?: string | null, name?: string | null, description?: string | null, slug?: string | null, price?: any | null, sale?: boolean | null, origPrice?: any | null, currency?: string | null, images?: Array<{ __typename?: 'SwellProductImage', caption?: string | null, file?: { __typename?: 'SwellProductImageFile', url?: string | null, width?: number | null, height?: number | null } | null } | null> | null, options?: Array<{ __typename?: 'SwellProductOption', id?: string | null, attributeId?: string | null, name?: string | null, inputType?: string | null, active?: boolean | null, required?: boolean | null, variant?: boolean | null, values?: Array<{ __typename?: 'SwellProductOptionValue', id?: string | null, name?: string | null, price?: any | null } | null> | null } | null> | null, purchaseOptions?: { __typename?: 'SwellProductPurchaseOptions', standard?: { __typename?: 'SwellProductPurchaseOptionsStandard', price?: any | null, sale?: boolean | null, salePrice?: any | null, origPrice?: any | null } | null, subscription?: { __typename?: 'SwellProductPurchaseOptionsSubscription', plans?: Array<{ __typename?: 'SwellProductPurchaseOptionsSubscriptionPlan', id?: string | null } | null> | null } | null } | null, variants?: { __typename?: 'SwellProductsVariants', results?: Array<{ __typename?: 'SwellProductVariant', name?: string | null, price?: any | null, origPrice?: any | null, optionValueIds?: Array<string | null> | null, stockLevel?: number | null, currency?: string | null, prices?: Array<{ __typename?: 'SwellProductVariantPrice', price?: any | null, discountPercent?: any | null, quantityMin?: number | null, quantityMax?: number | null, accountGroup?: string | null } | null> | null, images?: Array<{ __typename?: 'SwellProductVariantImage', id?: string | null, caption?: string | null, file?: { __typename?: 'SwellProductVariantImageFile', url?: string | null, width?: number | null, height?: number | null } | null } | null> | null, purchaseOptions?: { __typename?: 'SwellProductVariantPurchaseOptions', standard?: { __typename?: 'SwellProductVariantPurchaseOptionsStandard', price?: any | null, sale?: boolean | null, salePrice?: any | null, origPrice?: any | null, prices?: Array<{ __typename?: 'SwellProductVariantPurchaseOptionsStandardPrice', price?: any | null, discountPercent?: any | null, quantityMin?: number | null, quantityMax?: number | null, accountGroup?: string | null } | null> | null } | null } | null } | null> | null } | null } | null } | null> | null, crossSells?: Array<{ __typename?: 'SwellProductCrossSell', discountType?: string | null, discountAmount?: any | null, discountPercent?: any | null, product?: { __typename?: 'SwellProduct', id?: string | null, name?: string | null, slug?: string | null, currency?: string | null, price?: any | null, origPrice?: any | null, sale?: boolean | null, images?: Array<{ __typename?: 'SwellProductImage', caption?: string | null, file?: { __typename?: 'SwellProductImageFile', url?: string | null, width?: number | null, height?: number | null } | null } | null> | null } | null } | null> | null, content?: { __typename?: 'SwellProductContent', layoutOptions?: string | null, showStockLevels?: boolean | null, lowStockIndicator?: number | null, calloutTitle?: string | null, calloutDescription?: string | null, enableProductCounter?: boolean | null, productHighlights?: Array<{ __typename?: 'SwellProductContentProductHighlight', id?: string | null, icon?: string | null, label?: string | null, customIcon?: { __typename?: 'SwellProductContentProductHighlightCustomIcon', url?: string | null, width?: number | null, height?: number | null } | null } | null> | null, expandableDetails?: Array<{ __typename?: 'SwellProductContentExpandableDetail', id?: string | null, details?: string | null, label?: string | null } | null> | null } | null, variants?: { __typename?: 'SwellProductsVariants', results?: Array<{ __typename?: 'SwellProductVariant', name?: string | null, price?: any | null, origPrice?: any | null, optionValueIds?: Array<string | null> | null, stockLevel?: number | null, currency?: string | null, prices?: Array<{ __typename?: 'SwellProductVariantPrice', price?: any | null, discountPercent?: any | null, quantityMin?: number | null, quantityMax?: number | null, accountGroup?: string | null } | null> | null, images?: Array<{ __typename?: 'SwellProductVariantImage', id?: string | null, caption?: string | null, file?: { __typename?: 'SwellProductVariantImageFile', url?: string | null, width?: number | null, height?: number | null } | null } | null> | null, purchaseOptions?: { __typename?: 'SwellProductVariantPurchaseOptions', standard?: { __typename?: 'SwellProductVariantPurchaseOptionsStandard', price?: any | null, sale?: boolean | null, salePrice?: any | null, origPrice?: any | null, prices?: Array<{ __typename?: 'SwellProductVariantPurchaseOptionsStandardPrice', price?: any | null, discountPercent?: any | null, quantityMin?: number | null, quantityMax?: number | null, accountGroup?: string | null } | null> | null } | null } | null } | null> | null } | null } | null };

export type GetProductPricesInCurrencyQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
}>;


export type GetProductPricesInCurrencyQuery = { __typename?: 'Query', productBySlug?: { __typename?: 'SwellProduct', id?: string | null, price?: any | null, sale?: boolean | null, origPrice?: any | null, currency?: string | null, options?: Array<{ __typename?: 'SwellProductOption', id?: string | null, values?: Array<{ __typename?: 'SwellProductOptionValue', id?: string | null, price?: any | null } | null> | null } | null> | null, purchaseOptions?: { __typename?: 'SwellProductPurchaseOptions', standard?: { __typename?: 'SwellProductPurchaseOptionsStandard', price?: any | null, sale?: boolean | null, salePrice?: any | null, origPrice?: any | null } | null, subscription?: { __typename?: 'SwellProductPurchaseOptionsSubscription', plans?: Array<{ __typename?: 'SwellProductPurchaseOptionsSubscriptionPlan', id?: string | null, price?: any | null } | null> | null } | null } | null, upSells?: Array<{ __typename?: 'SwellProductUpSell', product?: { __typename?: 'SwellProduct', id?: string | null, price?: any | null, sale?: boolean | null, origPrice?: any | null, currency?: string | null, options?: Array<{ __typename?: 'SwellProductOption', id?: string | null, attributeId?: string | null, name?: string | null, inputType?: string | null, active?: boolean | null, required?: boolean | null, variant?: boolean | null, values?: Array<{ __typename?: 'SwellProductOptionValue', id?: string | null, name?: string | null, price?: any | null } | null> | null } | null> | null, purchaseOptions?: { __typename?: 'SwellProductPurchaseOptions', standard?: { __typename?: 'SwellProductPurchaseOptionsStandard', price?: any | null, sale?: boolean | null, salePrice?: any | null, origPrice?: any | null } | null, subscription?: { __typename?: 'SwellProductPurchaseOptionsSubscription', plans?: Array<{ __typename?: 'SwellProductPurchaseOptionsSubscriptionPlan', id?: string | null } | null> | null } | null } | null, variants?: { __typename?: 'SwellProductsVariants', results?: Array<{ __typename?: 'SwellProductVariant', name?: string | null, price?: any | null, origPrice?: any | null, optionValueIds?: Array<string | null> | null, stockLevel?: number | null, currency?: string | null, prices?: Array<{ __typename?: 'SwellProductVariantPrice', price?: any | null, discountPercent?: any | null, quantityMin?: number | null, quantityMax?: number | null, accountGroup?: string | null } | null> | null, images?: Array<{ __typename?: 'SwellProductVariantImage', id?: string | null, caption?: string | null, file?: { __typename?: 'SwellProductVariantImageFile', url?: string | null, width?: number | null, height?: number | null } | null } | null> | null, purchaseOptions?: { __typename?: 'SwellProductVariantPurchaseOptions', standard?: { __typename?: 'SwellProductVariantPurchaseOptionsStandard', price?: any | null, sale?: boolean | null, salePrice?: any | null, origPrice?: any | null, prices?: Array<{ __typename?: 'SwellProductVariantPurchaseOptionsStandardPrice', price?: any | null, discountPercent?: any | null, quantityMin?: number | null, quantityMax?: number | null, accountGroup?: string | null } | null> | null } | null } | null } | null> | null } | null } | null } | null> | null, crossSells?: Array<{ __typename?: 'SwellProductCrossSell', product?: { __typename?: 'SwellProduct', id?: string | null, currency?: string | null, price?: any | null, sale?: boolean | null, origPrice?: any | null } | null } | null> | null, variants?: { __typename?: 'SwellProductsVariants', results?: Array<{ __typename?: 'SwellProductVariant', price?: any | null, origPrice?: any | null, currency?: string | null, purchaseOptions?: { __typename?: 'SwellProductVariantPurchaseOptions', standard?: { __typename?: 'SwellProductVariantPurchaseOptionsStandard', price?: any | null, sale?: boolean | null, salePrice?: any | null, origPrice?: any | null, prices?: Array<{ __typename?: 'SwellProductVariantPurchaseOptionsStandardPrice', price?: any | null } | null> | null } | null } | null } | null> | null } | null } | null };

export type GetProductSlugsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductSlugsQuery = { __typename?: 'Query', products?: { __typename?: 'SwellProducts', results?: Array<{ __typename?: 'SwellProduct', slug?: string | null } | null> | null } | null };

export type SearchProductsQueryVariables = Exact<{
  searchTerm?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
}>;


export type SearchProductsQuery = { __typename?: 'Query', products?: { __typename?: 'SwellProducts', results?: Array<{ __typename?: 'SwellProduct', id?: string | null, name?: string | null, currency?: string | null, description?: string | null, slug?: string | null, price?: any | null, sale?: boolean | null, origPrice?: any | null, images?: Array<{ __typename?: 'SwellProductImage', caption?: string | null, file?: { __typename?: 'SwellProductImageFile', width?: number | null, height?: number | null, url?: string | null } | null } | null> | null, variants?: { __typename?: 'SwellProductsVariants', results?: Array<{ __typename?: 'SwellProductVariant', name?: string | null, id?: string | null } | null> | null } | null, options?: Array<{ __typename?: 'SwellProductOption', name?: string | null } | null> | null } | null> | null } | null };

export type GetFilteredSortedProductsQueryVariables = Exact<{
  filter?: InputMaybe<Scalars['JSON']>;
  sort?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type GetFilteredSortedProductsQuery = { __typename?: 'Query', products?: { __typename?: 'SwellProducts', results?: Array<{ __typename?: 'SwellProduct', slug?: string | null } | null> | null } | null };

export type AddInvoiceItemFirstProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type AddInvoiceItemFirstProductsQuery = { __typename?: 'Query', products?: { __typename?: 'SwellProducts', results?: Array<{ __typename?: 'SwellProduct', id?: string | null, name?: string | null, price?: any | null, images?: Array<{ __typename?: 'SwellProductImage', file?: { __typename?: 'SwellProductImageFile', url?: string | null } | null } | null> | null, variants?: { __typename?: 'SwellProductsVariants', results?: Array<{ __typename?: 'SwellProductVariant', name?: string | null, id?: string | null } | null> | null } | null, options?: Array<{ __typename?: 'SwellProductOption', name?: string | null } | null> | null } | null> | null } | null };

export type GetStoreSettingsQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['String']>;
}>;


export type GetStoreSettingsQuery = { __typename?: 'Query', storeSettings?: { __typename?: 'SwellSettings', values?: any | null, store?: { __typename?: 'SwellSettingsStore', name?: string | null, homePage?: string | null, currency?: string | null, locale?: string | null, currencies?: Array<{ __typename?: 'SwellSettingsStoreCurrency', code?: string | null, name?: string | null, rate?: any | null, symbol?: string | null, decimals?: number | null, priced?: boolean | null, type?: string | null } | null> | null, locales?: Array<{ __typename?: 'SwellSettingsStoreLocale', name?: string | null, code?: string | null, fallback?: string | null } | null> | null } | null } | null };

export type GetStoreUrlQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStoreUrlQuery = { __typename?: 'Query', storeSettings?: { __typename?: 'SwellSettings', store?: { __typename?: 'SwellSettingsStore', url?: string | null } | null } | null };

export type GetMenusQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMenusQuery = { __typename?: 'Query', menuSettings?: { __typename?: 'SwellSettingsMenus', sections?: Array<{ __typename?: 'SwellSettingsMenusSection', id?: string | null, name?: string | null, items?: Array<any | null> | null } | null> | null } | null };

export type GetSubscriptionByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetSubscriptionByIdQuery = { __typename?: 'Query', subscriptionById?: { __typename?: 'SwellSubscription', id?: string | null, planId?: string | null, productId?: string | null, status?: string | null, dateCreated?: any | null, datePeriodEnd?: any | null, dateOrderPeriodEnd?: any | null, price?: any | null, quantity?: number | null, trial?: boolean | null, dateTrialEnd?: any | null, subTotal?: any | null, discountTotal?: any | null, taxTotal?: any | null, grandTotal?: any | null, currency?: string | null, items?: Array<{ __typename?: 'SwellSubscriptionItem', priceTotal?: any | null, quantity?: number | null, id?: string | null, product?: { __typename?: 'SwellProduct', id?: string | null, name?: string | null, images?: Array<{ __typename?: 'SwellProductImage', caption?: string | null, file?: { __typename?: 'SwellProductImageFile', width?: number | null, height?: number | null, url?: string | null } | null } | null> | null } | null } | null> | null, product?: { __typename?: 'SwellProduct', name?: string | null, slug?: string | null, images?: Array<{ __typename?: 'SwellProductImage', caption?: string | null, file?: { __typename?: 'SwellProductImageFile', width?: number | null, height?: number | null, url?: string | null } | null } | null> | null } | null, variant?: { __typename?: 'SwellProductVariant', name?: string | null, id?: string | null } | null, options?: Array<{ __typename?: 'SwellSubscriptionOption', value?: string | null } | null> | null, shipping?: { __typename?: 'SwellSubscriptionShipping', name?: string | null, address1?: string | null, address2?: string | null, city?: string | null, state?: string | null, country?: string | null, zip?: string | null, phone?: string | null, service?: string | null, serviceName?: string | null, price?: any | null } | null, billing?: { __typename?: 'SwellSubscriptionBilling', name?: string | null, address1?: string | null, address2?: string | null, city?: string | null, state?: string | null, country?: string | null, zip?: string | null, method?: string | null, card?: { __typename?: 'SwellSubscriptionBillingCard', brand?: string | null, last4?: string | null, expMonth?: number | null, expYear?: number | null } | null } | null, billingSchedule?: { __typename?: 'SwellSubscriptionBillingSchedule', interval?: string | null, intervalCount?: number | null, limit?: number | null, limitCurrent?: number | null } | null, orderSchedule?: { __typename?: 'SwellSubscriptionOrderSchedule', interval?: string | null, intervalCount?: number | null, limit?: number | null, limitCurrent?: number | null } | null } | null };

export type GetSubscriptionsQueryVariables = Exact<{
  currency?: InputMaybe<Scalars['String']>;
}>;


export type GetSubscriptionsQuery = { __typename?: 'Query', subscriptions?: { __typename?: 'SwellSubscriptions', results?: Array<{ __typename?: 'SwellSubscription', id?: string | null, status?: string | null, datePeriodEnd?: any | null, dateOrderPeriodEnd?: any | null, recurringTotal?: any | null, product?: { __typename?: 'SwellProduct', name?: string | null, images?: Array<{ __typename?: 'SwellProductImage', id?: string | null, caption?: string | null, file?: { __typename?: 'SwellProductImageFile', url?: string | null, width?: number | null, height?: number | null } | null } | null> | null } | null, billingSchedule?: { __typename?: 'SwellSubscriptionBillingSchedule', interval?: string | null, intervalCount?: number | null, trialDays?: number | null } | null, orderSchedule?: { __typename?: 'SwellSubscriptionOrderSchedule', interval?: string | null, intervalCount?: number | null } | null } | null> | null } | null };

export type CancelSubscriptionMutationVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
}>;


export type CancelSubscriptionMutation = { __typename?: 'Mutation', updateSubscription?: { __typename?: 'SwellSubscription', canceled?: boolean | null } | null };

export type PauseSubscriptionMutationVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['Boolean']>;
  resumeAt?: InputMaybe<Scalars['DateTime']>;
}>;


export type PauseSubscriptionMutation = { __typename?: 'Mutation', updateSubscription?: { __typename?: 'SwellSubscription', paused?: boolean | null } | null };

export type DeleteSubscriptionItemMutationVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
  itemId?: InputMaybe<Scalars['String']>;
}>;


export type DeleteSubscriptionItemMutation = { __typename?: 'Mutation', deleteSubscriptionItem?: { __typename?: 'SwellSubscriptionItem', quantity?: number | null, priceTotal?: any | null, product?: { __typename?: 'SwellProduct', name?: string | null, id?: string | null, price?: any | null } | null } | null };

export type AddSubscriptionItemMutationVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
  itemId?: InputMaybe<Scalars['ID']>;
  quantity?: InputMaybe<Scalars['Int']>;
}>;


export type AddSubscriptionItemMutation = { __typename?: 'Mutation', addSubscriptionItem?: { __typename?: 'SwellSubscriptionItem', quantity?: number | null, priceTotal?: any | null, product?: { __typename?: 'SwellProduct', name?: string | null, id?: string | null, price?: any | null } | null } | null };

export type ReplaceSubscriptionProductMutationVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
  productId?: InputMaybe<Scalars['ID']>;
  variantId?: InputMaybe<Scalars['ID']>;
  qty?: InputMaybe<Scalars['Int']>;
  interval?: InputMaybe<Scalars['String']>;
  intervalCount?: InputMaybe<Scalars['Int']>;
}>;


export type ReplaceSubscriptionProductMutation = { __typename?: 'Mutation', updateSubscription?: { __typename?: 'SwellSubscription', quantity?: number | null, trial?: boolean | null, grandTotal?: any | null, product?: { __typename?: 'SwellProduct', name?: string | null, id?: string | null, price?: any | null } | null } | null };

export type ReplaceSubscriptionProductDetailsMutationVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
  variantId?: InputMaybe<Scalars['ID']>;
  qty?: InputMaybe<Scalars['Int']>;
  interval?: InputMaybe<Scalars['String']>;
  intervalCount?: InputMaybe<Scalars['Int']>;
}>;


export type ReplaceSubscriptionProductDetailsMutation = { __typename?: 'Mutation', updateSubscription?: { __typename?: 'SwellSubscription', quantity?: number | null, trial?: boolean | null, grandTotal?: any | null, product?: { __typename?: 'SwellProduct', name?: string | null, id?: string | null, price?: any | null } | null } | null };


export const LoginDocument = `
    mutation login($email: String, $password: String) {
  loginAccount(email: $email, password: $password) {
    __typename
  }
}
    `;
export const LogoutDocument = `
    mutation logout {
  logoutAccount {
    success
  }
}
    `;
export const SignupDocument = `
    mutation signup($email: String, $password: String, $firstName: String, $lastName: String) {
  createAccount(
    input: {firstName: $firstName, lastName: $lastName, email: $email, password: $password}
  ) {
    email
  }
}
    `;
export const CheckTokenValidityDocument = `
    query checkTokenValidity {
  session {
    accountId
  }
}
    `;
export const SendResetPasswordMailDocument = `
    mutation sendResetPasswordMail($email: String, $passwordResetUrl: String) {
  sendAccountRecovery(email: $email, passwordResetUrl: $passwordResetUrl) {
    success
  }
}
    `;
export const ResetPasswordDocument = `
    mutation resetPassword($password: String, $passwordResetKey: String) {
  recoverAccount(password: $password, passwordResetKey: $passwordResetKey) {
    success
  }
}
    `;
export const GetAccountDetailsDocument = `
    query getAccountDetails {
  account {
    name
    email
  }
}
    `;
export const AddToCartDocument = `
    mutation addToCart($cartItemInput: SwellCartItemInput) {
  addCartItem(input: $cartItemInput) {
    checkoutId
    checkoutUrl
    grandTotal
    items {
      id
      quantity
      price
      priceTotal
      purchaseOption {
        type
        planId
        planName
        billingSchedule {
          interval
          intervalCount
          trialDays
        }
        orderSchedule {
          interval
          intervalCount
        }
      }
      options {
        id
        name
        value
        valueId
        variant
        price
      }
      discountTotal
      discountEach
      taxes {
        id
        amount
      }
      taxTotal
      productId
      variantId
      product {
        id
        name
        slug
        stockTracking
        stockPurchasable
        stockLevel
        images {
          id
          caption
          file {
            url
            width
            height
          }
        }
      }
      variant {
        name
        price
        stockLevel
        purchaseOptions {
          standard {
            price
          }
        }
        currency
        images {
          id
          caption
          file {
            url
            width
            height
          }
        }
      }
    }
  }
}
    `;
export const UpdateCartItemDocument = `
    mutation updateCartItem($itemId: String, $input: SwellCartItemInput) {
  updateCartItem(itemId: $itemId, input: $input) {
    checkoutUrl
    grandTotal
    items {
      id
      quantity
      price
      priceTotal
      purchaseOption {
        type
        planId
        planName
        billingSchedule {
          interval
          intervalCount
          trialDays
        }
        orderSchedule {
          interval
          intervalCount
        }
      }
      options {
        id
        name
        value
        valueId
        variant
        price
      }
      discountTotal
      discountEach
      taxes {
        id
        amount
      }
      taxTotal
      productId
      variantId
      product {
        id
        name
        slug
        stockTracking
        stockPurchasable
        stockLevel
        images {
          id
          caption
          file {
            url
            width
            height
          }
        }
      }
      variant {
        name
        price
        stockLevel
        purchaseOptions {
          standard {
            price
          }
        }
        currency
        images {
          id
          caption
          file {
            url
            width
            height
          }
        }
      }
    }
  }
}
    `;
export const DeleteCartItemDocument = `
    mutation deleteCartItem($itemId: String) {
  deleteCartItem(itemId: $itemId) {
    checkoutUrl
    grandTotal
    items {
      id
      quantity
      price
      priceTotal
      purchaseOption {
        type
        planId
        planName
        billingSchedule {
          interval
          intervalCount
          trialDays
        }
        orderSchedule {
          interval
          intervalCount
        }
      }
      options {
        id
        name
        value
        valueId
        variant
        price
      }
      discountTotal
      discountEach
      taxes {
        id
        amount
      }
      taxTotal
      productId
      variantId
      product {
        id
        name
        slug
        stockTracking
        stockPurchasable
        stockLevel
        images {
          id
          caption
          file {
            url
            width
            height
          }
        }
      }
      variant {
        name
        price
        stockLevel
        purchaseOptions {
          standard {
            price
          }
        }
        currency
        images {
          id
          caption
          file {
            url
            width
            height
          }
        }
      }
    }
  }
}
    `;
export const GetCartDocument = `
    query getCart {
  cart {
    checkoutUrl
    grandTotal
    items {
      id
      quantity
      price
      priceTotal
      purchaseOption {
        type
        planId
        planName
        billingSchedule {
          interval
          intervalCount
          trialDays
        }
        orderSchedule {
          interval
          intervalCount
        }
      }
      options {
        id
        name
        value
        valueId
        variant
        price
      }
      discountTotal
      discountEach
      taxes {
        id
        amount
      }
      taxTotal
      productId
      variantId
      product {
        id
        name
        slug
        stockTracking
        stockPurchasable
        stockLevel
        images {
          id
          caption
          file {
            url
            width
            height
          }
        }
      }
      variant {
        name
        price
        stockLevel
        purchaseOptions {
          standard {
            price
          }
        }
        currency
        images {
          id
          caption
          file {
            url
            width
            height
          }
        }
      }
    }
  }
}
    `;
export const GetCategoriesDocument = `
    query getCategories {
  categories {
    results {
      name
      slug
      images {
        id
        caption
        file {
          url
          width
          height
        }
      }
      content {
        showProductsPrice
        showProductsDescription
        showFeaturedCategories
        productsPerRow
        enableQuickAdd
        featuredCategories {
          category {
            slug
            name
            description
            images {
              caption
              file {
                url
                width
                height
              }
              id
            }
          }
        }
      }
    }
  }
}
    `;
export const GetCategoryPathsDocument = `
    query getCategoryPaths {
  categories {
    results {
      slug
    }
  }
}
    `;
export const GetCategoryDocument = `
    query getCategory($slug: String) {
  categoryBySlug(slug: $slug) {
    name
    slug
    description
    metaKeywords
    metaDescription
    products {
      id
      name
      description
      slug
      price
      currency
      images {
        caption
        file {
          width
          height
          url
        }
      }
      options {
        id
        attributeId
        name
        inputType
        active
        required
        variant
        values {
          id
          name
          price
          description
        }
      }
      purchaseOptions {
        standard {
          price
          sale
          salePrice
        }
        subscription {
          active
        }
      }
      variants {
        results {
          name
          price
          prices {
            price
            discountPercent
            quantityMin
            quantityMax
            accountGroup
          }
          images {
            id
            caption
            file {
              url
              width
              height
            }
          }
          optionValueIds
          purchaseOptions {
            standard {
              price
              sale
              salePrice
              prices {
                price
                discountPercent
                quantityMin
                quantityMax
                accountGroup
              }
            }
          }
          stockLevel
          currency
        }
      }
    }
  }
}
    `;
export const GetFeaturedCategoryDocument = `
    query getFeaturedCategory($slug: String) {
  categoryBySlug(slug: $slug) {
    name
    description
    slug
    images {
      caption
      file {
        url
        width
        height
      }
    }
  }
}
    `;
export const GetFilteredProductsDocument = `
    query getFilteredProducts($filter: JSON) {
  products(limit: 20, where: $filter) {
    count
    results {
      id
      name
      description
      slug
      price
      currency
      attributes
      categories {
        name
        slug
      }
      images {
        caption
        file {
          width
          height
          url
        }
      }
      categories {
        slug
      }
      options {
        id
        attributeId
        name
        inputType
        active
        required
        variant
        values {
          id
          name
          price
          description
        }
      }
      purchaseOptions {
        standard {
          price
          sale
          salePrice
        }
        subscription {
          active
        }
      }
      variants {
        results {
          name
          price
          prices {
            price
            discountPercent
            quantityMin
            quantityMax
            accountGroup
          }
          images {
            id
            caption
            file {
              url
              width
              height
            }
          }
          optionValueIds
          purchaseOptions {
            standard {
              price
              sale
              salePrice
              prices {
                price
                discountPercent
                quantityMin
                quantityMax
                accountGroup
              }
            }
          }
          stockLevel
          currency
        }
      }
    }
  }
}
    `;
export const GetCategoryInCurrencyDocument = `
    query getCategoryInCurrency($slug: String, $currency: String) {
  categoryBySlug(slug: $slug, _currency: $currency) {
    products {
      id
      price
      currency
    }
  }
}
    `;
export const GetCategorySlugsDocument = `
    query getCategorySlugs {
  categories {
    results {
      slug
    }
  }
}
    `;
export const GetCategoryPreviewDataDocument = `
    query getCategoryPreviewData($slug: String) {
  categoryBySlug(slug: $slug) {
    name
    description
    slug
    images {
      caption
      file {
        url
        width
        height
      }
    }
  }
}
    `;
export const GetCategoryWithProductSlugsDocument = `
    query getCategoryWithProductSlugs($slug: String) {
  categoryBySlug(slug: $slug) {
    slug
    products {
      slug
    }
  }
}
    `;
export const GetContentPagesDocument = `
    query getContentPages {
  contentPages {
    results {
      slug
      published
    }
  }
}
    `;
export const GetOrdersDocument = `
    query getOrders($currency: String) {
  orders(_currency: $currency) {
    results {
      status
      id
      number
      dateCreated
      itemQuantity
      currency
      grandTotal
      subTotal
      items {
        product {
          images {
            id
            caption
            file {
              url
              width
              height
            }
          }
        }
      }
    }
  }
}
    `;
export const GetOrderByIdDocument = `
    query getOrderById($id: String) {
  orderById(id: $id) {
    status
    id
    number
    dateCreated
    itemQuantity
    currency
    grandTotal
    subTotal
    shipmentTotal
    subTotal
    discountTotal
    taxTotal
    items {
      purchaseOption {
        billingSchedule {
          interval
          intervalCount
        }
      }
      product {
        name
        slug
        images {
          id
          caption
          file {
            url
            width
            height
          }
        }
      }
      quantity
      options {
        value
      }
      priceTotal
    }
    refunds {
      results {
        amount
        currency
      }
    }
    shipping {
      name
      address1
      address2
      city
      state
      country
      zip
      phone
      serviceName
      price
    }
    billing {
      name
      address1
      address2
      city
      state
      country
      zip
      method
      card {
        brand
        last4
        expMonth
        expYear
      }
    }
    comments
  }
}
    `;
export const GetProductsPaginatedDocument = `
    query getProductsPaginated($currency: String, $limit: Int, $page: Int, $sort: String, $where: JSON) {
  products(
    _currency: $currency
    limit: $limit
    page: $page
    sort: $sort
    where: $where
  ) {
    count
    page
    results {
      id
      name
      description
      slug
      price
      sale
      salePrice
      origPrice
      currency
      categories {
        name
        slug
      }
      images {
        caption
        file {
          width
          height
          url
        }
      }
      purchaseOptions {
        standard {
          price
          sale
          salePrice
          origPrice
        }
      }
      variants {
        results {
          id
          name
          price
          origPrice
          optionValueIds
          images {
            caption
            file {
              width
              height
              url
            }
          }
        }
      }
    }
  }
}
    `;
export const GetProductsCountDocument = `
    query getProductsCount($currency: String, $where: JSON) {
  products(_currency: $currency, where: $where, limit: 1) {
    count
  }
}
    `;
export const GetProductFiltersDocument = `
    query getProductFilters {
  attributes(where: {filterable: true}) {
    results {
      name
      type
      values
    }
  }
  categories(limit: 100) {
    results {
      name
      slug
      description
    }
  }
}
    `;
export const GetAllProductsOptimizedDocument = `
    query getAllProductsOptimized($currency: String) {
  products(_currency: $currency, limit: 25) {
    count
    results {
      id
      name
      description
      slug
      price
      sale
      salePrice
      origPrice
      currency
      categories {
        name
        slug
      }
      images {
        caption
        file {
          width
          height
          url
        }
      }
      purchaseOptions {
        standard {
          price
          sale
          salePrice
          origPrice
        }
      }
    }
  }
}
    `;
export const GetAllProductsDocument = `
    query getAllProducts($currency: String) {
  products(_currency: $currency) {
    count
    results {
      id
      name
      description
      slug
      price
      sale
      salePrice
      origPrice
      currency
      attributes
      categories {
        name
        slug
      }
      images {
        caption
        file {
          width
          height
          url
        }
      }
      options {
        id
        attributeId
        name
        inputType
        active
        required
        variant
        values {
          id
          name
          price
          description
        }
      }
      purchaseOptions {
        standard {
          price
          sale
          salePrice
          origPrice
        }
        subscription {
          active
        }
      }
      variants {
        results {
          name
          price
          origPrice
          prices {
            price
            discountPercent
            quantityMin
            quantityMax
            accountGroup
          }
          images {
            id
            caption
            file {
              url
              width
              height
            }
          }
          optionValueIds
          purchaseOptions {
            standard {
              price
              sale
              salePrice
              origPrice
              prices {
                price
                discountPercent
                quantityMin
                quantityMax
                accountGroup
              }
            }
          }
          stockLevel
          currency
        }
      }
    }
  }
}
    `;
export const GetProductsPricesInCurrencyDocument = `
    query getProductsPricesInCurrency($currency: String) {
  products(limit: 20, _currency: $currency) {
    results {
      id
      price
      sale
      origPrice
      currency
    }
  }
}
    `;
export const GetProductDocument = `
    query getProduct($slug: String, $currency: String, $locale: String) {
  productBySlug(slug: $slug, _currency: $currency, _locale: $locale) {
    slug
    id
    name
    description
    currency
    metaTitle
    metaDescription
    price
    sale
    origPrice
    images {
      id
      caption
      file {
        url
        width
        height
      }
    }
    categories {
      name
      slug
    }
    options {
      id
      attributeId
      name
      description
      inputType
      active
      required
      variant
      parentId
      parentValueIds
      inputHint
      values {
        id
        name
        price
      }
    }
    purchaseOptions {
      standard {
        price
        sale
        salePrice
        origPrice
      }
      subscription {
        plans {
          id
          name
          price
          billingSchedule {
            interval
            intervalCount
            trialDays
          }
          orderSchedule {
            interval
            intervalCount
          }
        }
      }
    }
    upSells {
      product {
        id
        name
        description
        slug
        price
        sale
        origPrice
        currency
        images {
          caption
          file {
            url
            width
            height
          }
        }
        options {
          id
          attributeId
          name
          inputType
          active
          required
          variant
          values {
            id
            name
            price
          }
        }
        purchaseOptions {
          standard {
            price
            sale
            salePrice
            origPrice
          }
          subscription {
            plans {
              id
            }
          }
        }
        variants {
          results {
            name
            price
            origPrice
            prices {
              price
              discountPercent
              quantityMin
              quantityMax
              accountGroup
            }
            images {
              id
              caption
              file {
                url
                width
                height
              }
            }
            optionValueIds
            purchaseOptions {
              standard {
                price
                sale
                salePrice
                origPrice
                prices {
                  price
                  discountPercent
                  quantityMin
                  quantityMax
                  accountGroup
                }
              }
            }
            stockLevel
            currency
          }
        }
      }
    }
    crossSells {
      discountType
      discountAmount
      discountPercent
      product {
        id
        name
        slug
        currency
        price
        origPrice
        sale
        images {
          caption
          file {
            url
            width
            height
          }
        }
      }
    }
    content {
      productHighlights {
        id
        icon
        label
        customIcon {
          url
          width
          height
        }
      }
      expandableDetails {
        id
        details
        label
      }
      layoutOptions
      showStockLevels
      lowStockIndicator
      calloutTitle
      calloutDescription
      enableProductCounter
    }
    stockLevel
    stockStatus
    stockTracking
    stockPurchasable
    variants {
      results {
        name
        price
        origPrice
        prices {
          price
          discountPercent
          quantityMin
          quantityMax
          accountGroup
        }
        images {
          id
          caption
          file {
            url
            width
            height
          }
        }
        optionValueIds
        purchaseOptions {
          standard {
            price
            sale
            salePrice
            origPrice
            prices {
              price
              discountPercent
              quantityMin
              quantityMax
              accountGroup
            }
          }
        }
        stockLevel
        currency
      }
    }
  }
}
    `;
export const GetProductPricesInCurrencyDocument = `
    query getProductPricesInCurrency($slug: String, $currency: String) {
  productBySlug(slug: $slug, _currency: $currency) {
    id
    price
    sale
    origPrice
    currency
    options {
      id
      values {
        id
        price
      }
    }
    purchaseOptions {
      standard {
        price
        sale
        salePrice
        origPrice
      }
      subscription {
        plans {
          id
          price
        }
      }
    }
    upSells {
      product {
        id
        price
        sale
        origPrice
        currency
        options {
          id
          attributeId
          name
          inputType
          active
          required
          variant
          values {
            id
            name
            price
          }
        }
        purchaseOptions {
          standard {
            price
            sale
            salePrice
            origPrice
          }
          subscription {
            plans {
              id
            }
          }
        }
        variants {
          results {
            name
            price
            origPrice
            prices {
              price
              discountPercent
              quantityMin
              quantityMax
              accountGroup
            }
            images {
              id
              caption
              file {
                url
                width
                height
              }
            }
            optionValueIds
            purchaseOptions {
              standard {
                price
                sale
                salePrice
                origPrice
                prices {
                  price
                  discountPercent
                  quantityMin
                  quantityMax
                  accountGroup
                }
              }
            }
            stockLevel
            currency
          }
        }
      }
    }
    crossSells {
      product {
        id
        currency
        price
        sale
        origPrice
      }
    }
    variants {
      results {
        price
        origPrice
        currency
        purchaseOptions {
          standard {
            price
            sale
            salePrice
            origPrice
            prices {
              price
            }
          }
        }
      }
    }
  }
}
    `;
export const GetProductSlugsDocument = `
    query getProductSlugs {
  products {
    results {
      slug
    }
  }
}
    `;
export const SearchProductsDocument = `
    query searchProducts($searchTerm: String, $currency: String) {
  products(search: $searchTerm, _currency: $currency) {
    results {
      id
      name
      currency
      description
      slug
      price
      sale
      origPrice
      images {
        caption
        file {
          width
          height
          url
        }
      }
      variants {
        results {
          name
          id
        }
      }
      options {
        name
      }
    }
  }
}
    `;
export const GetFilteredSortedProductsDocument = `
    query getFilteredSortedProducts($filter: JSON, $sort: String, $limit: Int = 20) {
  products(where: $filter, sort: $sort, limit: $limit) {
    results {
      slug
    }
  }
}
    `;
export const AddInvoiceItemFirstProductsDocument = `
    query addInvoiceItemFirstProducts {
  products(limit: 10, page: 1) {
    results {
      id
      name
      price
      images {
        file {
          url
        }
      }
      variants {
        results {
          name
          id
        }
      }
      options {
        name
      }
    }
  }
}
    `;
export const GetStoreSettingsDocument = `
    query getStoreSettings($locale: String) {
  storeSettings(_locale: $locale) {
    store {
      name
      homePage
      currency
      currencies {
        code
        name
        rate
        symbol
        decimals
        priced
        type
      }
      locale
      locales {
        name
        code
        fallback
      }
    }
    values
  }
}
    `;
export const GetStoreUrlDocument = `
    query getStoreUrl {
  storeSettings {
    store {
      url
    }
  }
}
    `;
export const GetMenusDocument = `
    query getMenus {
  menuSettings {
    sections {
      id
      name
      items
    }
  }
}
    `;
export const GetSubscriptionByIdDocument = `
    query getSubscriptionById($id: String!) {
  subscriptionById(id: $id) {
    id
    planId
    productId
    status
    dateCreated
    datePeriodEnd
    dateOrderPeriodEnd
    price
    quantity
    trial
    dateTrialEnd
    items {
      product {
        id
        name
        images {
          caption
          file {
            width
            height
            url
          }
        }
      }
      priceTotal
      quantity
      id
    }
    product {
      name
      slug
      images {
        caption
        file {
          width
          height
          url
        }
      }
    }
    variant {
      name
      id
    }
    options {
      value
    }
    subTotal
    discountTotal
    taxTotal
    grandTotal
    currency
    shipping {
      name
      address1
      address2
      city
      state
      country
      zip
      phone
      service
      serviceName
      price
    }
    billing {
      name
      address1
      address2
      city
      state
      country
      zip
      method
      card {
        brand
        last4
        expMonth
        expYear
      }
    }
    billingSchedule {
      interval
      intervalCount
      limit
      limitCurrent
    }
    orderSchedule {
      interval
      intervalCount
      limit
      limitCurrent
    }
  }
}
    `;
export const GetSubscriptionsDocument = `
    query getSubscriptions($currency: String) {
  subscriptions(_currency: $currency) {
    results {
      id
      status
      datePeriodEnd
      dateOrderPeriodEnd
      product {
        name
        images {
          id
          caption
          file {
            url
            width
            height
          }
        }
      }
      billingSchedule {
        interval
        intervalCount
        trialDays
      }
      orderSchedule {
        interval
        intervalCount
      }
      recurringTotal
    }
  }
}
    `;
export const CancelSubscriptionDocument = `
    mutation cancelSubscription($id: String) {
  updateSubscription(id: $id, input: {canceled: true}) {
    canceled
  }
}
    `;
export const PauseSubscriptionDocument = `
    mutation pauseSubscription($id: String, $status: Boolean, $resumeAt: DateTime) {
  updateSubscription(id: $id, input: {paused: $status, datePauseEnd: $resumeAt}) {
    paused
  }
}
    `;
export const DeleteSubscriptionItemDocument = `
    mutation deleteSubscriptionItem($id: String, $itemId: String) {
  deleteSubscriptionItem(subscriptionId: $id, itemId: $itemId) {
    product {
      name
      id
      price
    }
    quantity
    priceTotal
  }
}
    `;
export const AddSubscriptionItemDocument = `
    mutation addSubscriptionItem($id: String, $itemId: ID, $quantity: Int) {
  addSubscriptionItem(
    subscriptionId: $id
    input: {productId: $itemId, quantity: $quantity}
  ) {
    product {
      name
      id
      price
    }
    quantity
    priceTotal
  }
}
    `;
export const ReplaceSubscriptionProductDocument = `
    mutation replaceSubscriptionProduct($id: String, $productId: ID, $variantId: ID, $qty: Int, $interval: String, $intervalCount: Int) {
  updateSubscription(
    id: $id
    input: {variantId: $variantId, productId: $productId, quantity: $qty, options: null, billingSchedule: {interval: $interval, intervalCount: $intervalCount}}
  ) {
    product {
      name
      id
      price
    }
    quantity
    trial
    grandTotal
  }
}
    `;
export const ReplaceSubscriptionProductDetailsDocument = `
    mutation replaceSubscriptionProductDetails($id: String, $variantId: ID, $qty: Int, $interval: String, $intervalCount: Int) {
  updateSubscription(
    id: $id
    input: {variantId: $variantId, quantity: $qty, options: null, billingSchedule: {interval: $interval, intervalCount: $intervalCount}}
  ) {
    product {
      name
      id
      price
    }
    quantity
    trial
    grandTotal
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    login(variables?: LoginMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: LoginMutation; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<LoginMutation>(LoginDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'login', 'mutation');
    },
    logout(variables?: LogoutMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: LogoutMutation; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<LogoutMutation>(LogoutDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'logout', 'mutation');
    },
    signup(variables?: SignupMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: SignupMutation; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<SignupMutation>(SignupDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'signup', 'mutation');
    },
    checkTokenValidity(variables?: CheckTokenValidityQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: CheckTokenValidityQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<CheckTokenValidityQuery>(CheckTokenValidityDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'checkTokenValidity', 'query');
    },
    sendResetPasswordMail(variables?: SendResetPasswordMailMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: SendResetPasswordMailMutation; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<SendResetPasswordMailMutation>(SendResetPasswordMailDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'sendResetPasswordMail', 'mutation');
    },
    resetPassword(variables?: ResetPasswordMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: ResetPasswordMutation; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<ResetPasswordMutation>(ResetPasswordDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'resetPassword', 'mutation');
    },
    getAccountDetails(variables?: GetAccountDetailsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: GetAccountDetailsQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetAccountDetailsQuery>(GetAccountDetailsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAccountDetails', 'query');
    },
    addToCart(variables?: AddToCartMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: AddToCartMutation; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<AddToCartMutation>(AddToCartDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addToCart', 'mutation');
    },
    updateCartItem(variables?: UpdateCartItemMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: UpdateCartItemMutation; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<UpdateCartItemMutation>(UpdateCartItemDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateCartItem', 'mutation');
    },
    deleteCartItem(variables?: DeleteCartItemMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: DeleteCartItemMutation; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<DeleteCartItemMutation>(DeleteCartItemDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteCartItem', 'mutation');
    },
    getCart(variables?: GetCartQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: GetCartQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetCartQuery>(GetCartDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCart', 'query');
    },
    getCategories(variables?: GetCategoriesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: GetCategoriesQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetCategoriesQuery>(GetCategoriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCategories', 'query');
    },
    getCategoryPaths(variables?: GetCategoryPathsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: GetCategoryPathsQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetCategoryPathsQuery>(GetCategoryPathsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCategoryPaths', 'query');
    },
    getCategory(variables?: GetCategoryQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: GetCategoryQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetCategoryQuery>(GetCategoryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCategory', 'query');
    },
    getFeaturedCategory(variables?: GetFeaturedCategoryQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: GetFeaturedCategoryQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetFeaturedCategoryQuery>(GetFeaturedCategoryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getFeaturedCategory', 'query');
    },
    getFilteredProducts(variables?: GetFilteredProductsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: GetFilteredProductsQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetFilteredProductsQuery>(GetFilteredProductsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getFilteredProducts', 'query');
    },
    getCategoryInCurrency(variables?: GetCategoryInCurrencyQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: GetCategoryInCurrencyQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetCategoryInCurrencyQuery>(GetCategoryInCurrencyDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCategoryInCurrency', 'query');
    },
    getCategorySlugs(variables?: GetCategorySlugsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: GetCategorySlugsQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetCategorySlugsQuery>(GetCategorySlugsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCategorySlugs', 'query');
    },
    getCategoryPreviewData(variables?: GetCategoryPreviewDataQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: GetCategoryPreviewDataQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetCategoryPreviewDataQuery>(GetCategoryPreviewDataDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCategoryPreviewData', 'query');
    },
    getCategoryWithProductSlugs(variables?: GetCategoryWithProductSlugsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: GetCategoryWithProductSlugsQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetCategoryWithProductSlugsQuery>(GetCategoryWithProductSlugsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCategoryWithProductSlugs', 'query');
    },
    getContentPages(variables?: GetContentPagesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: GetContentPagesQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetContentPagesQuery>(GetContentPagesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getContentPages', 'query');
    },
    getOrders(variables?: GetOrdersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: GetOrdersQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetOrdersQuery>(GetOrdersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getOrders', 'query');
    },
    getOrderById(variables?: GetOrderByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: GetOrderByIdQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetOrderByIdQuery>(GetOrderByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getOrderById', 'query');
    },
    getProductsPaginated(variables?: GetProductsPaginatedQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: GetProductsPaginatedQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetProductsPaginatedQuery>(GetProductsPaginatedDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProductsPaginated', 'query');
    },
    getProductsCount(variables?: GetProductsCountQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: GetProductsCountQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetProductsCountQuery>(GetProductsCountDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProductsCount', 'query');
    },
    getProductFilters(variables?: GetProductFiltersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: GetProductFiltersQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetProductFiltersQuery>(GetProductFiltersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProductFilters', 'query');
    },
    getAllProductsOptimized(variables?: GetAllProductsOptimizedQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: GetAllProductsOptimizedQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetAllProductsOptimizedQuery>(GetAllProductsOptimizedDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAllProductsOptimized', 'query');
    },
    getAllProducts(variables?: GetAllProductsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: GetAllProductsQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetAllProductsQuery>(GetAllProductsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAllProducts', 'query');
    },
    getProductsPricesInCurrency(variables?: GetProductsPricesInCurrencyQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: GetProductsPricesInCurrencyQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetProductsPricesInCurrencyQuery>(GetProductsPricesInCurrencyDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProductsPricesInCurrency', 'query');
    },
    getProduct(variables?: GetProductQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: GetProductQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetProductQuery>(GetProductDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProduct', 'query');
    },
    getProductPricesInCurrency(variables?: GetProductPricesInCurrencyQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: GetProductPricesInCurrencyQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetProductPricesInCurrencyQuery>(GetProductPricesInCurrencyDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProductPricesInCurrency', 'query');
    },
    getProductSlugs(variables?: GetProductSlugsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: GetProductSlugsQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetProductSlugsQuery>(GetProductSlugsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProductSlugs', 'query');
    },
    searchProducts(variables?: SearchProductsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: SearchProductsQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<SearchProductsQuery>(SearchProductsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'searchProducts', 'query');
    },
    getFilteredSortedProducts(variables?: GetFilteredSortedProductsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: GetFilteredSortedProductsQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetFilteredSortedProductsQuery>(GetFilteredSortedProductsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getFilteredSortedProducts', 'query');
    },
    addInvoiceItemFirstProducts(variables?: AddInvoiceItemFirstProductsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: AddInvoiceItemFirstProductsQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<AddInvoiceItemFirstProductsQuery>(AddInvoiceItemFirstProductsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addInvoiceItemFirstProducts', 'query');
    },
    getStoreSettings(variables?: GetStoreSettingsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: GetStoreSettingsQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetStoreSettingsQuery>(GetStoreSettingsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getStoreSettings', 'query');
    },
    getStoreUrl(variables?: GetStoreUrlQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: GetStoreUrlQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetStoreUrlQuery>(GetStoreUrlDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getStoreUrl', 'query');
    },
    getMenus(variables?: GetMenusQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: GetMenusQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetMenusQuery>(GetMenusDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getMenus', 'query');
    },
    getSubscriptionById(variables: GetSubscriptionByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: GetSubscriptionByIdQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetSubscriptionByIdQuery>(GetSubscriptionByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getSubscriptionById', 'query');
    },
    getSubscriptions(variables?: GetSubscriptionsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: GetSubscriptionsQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetSubscriptionsQuery>(GetSubscriptionsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getSubscriptions', 'query');
    },
    cancelSubscription(variables?: CancelSubscriptionMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: CancelSubscriptionMutation; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<CancelSubscriptionMutation>(CancelSubscriptionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'cancelSubscription', 'mutation');
    },
    pauseSubscription(variables?: PauseSubscriptionMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: PauseSubscriptionMutation; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<PauseSubscriptionMutation>(PauseSubscriptionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'pauseSubscription', 'mutation');
    },
    deleteSubscriptionItem(variables?: DeleteSubscriptionItemMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: DeleteSubscriptionItemMutation; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<DeleteSubscriptionItemMutation>(DeleteSubscriptionItemDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteSubscriptionItem', 'mutation');
    },
    addSubscriptionItem(variables?: AddSubscriptionItemMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: AddSubscriptionItemMutation; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<AddSubscriptionItemMutation>(AddSubscriptionItemDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addSubscriptionItem', 'mutation');
    },
    replaceSubscriptionProduct(variables?: ReplaceSubscriptionProductMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: ReplaceSubscriptionProductMutation; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<ReplaceSubscriptionProductMutation>(ReplaceSubscriptionProductDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'replaceSubscriptionProduct', 'mutation');
    },
    replaceSubscriptionProductDetails(variables?: ReplaceSubscriptionProductDetailsMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: ReplaceSubscriptionProductDetailsMutation; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<ReplaceSubscriptionProductDetailsMutation>(ReplaceSubscriptionProductDetailsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'replaceSubscriptionProductDetails', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;