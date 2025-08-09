import { GraphQLClient } from 'graphql-request';
import { getSdk } from 'lib/graphql/generated/sdk'; // THIS FILE IS THE GENERATED FILE

const storeUrl = process.env.NEXT_PUBLIC_SWELL_STORE_URL;
const graphqlEndpoint = `${storeUrl}/graphql`;
const graphqlKey = process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY;

if (!storeUrl)
  throw new Error(
    `Missing NEXT_PUBLIC_SWELL_STORE_URL variable in the .env file`,
  );

if (!graphqlKey)
  throw new Error(
    'Missing NEXT_PUBLIC_SWELL_PUBLIC_KEY variable in the .env file',
  );

const endpoint = graphqlEndpoint;

const headers = {
  Authorization: graphqlKey,
  'Cache-Control': 'no-cache',
  // Add compression to reduce payload size
  'Accept-Encoding': 'gzip, deflate, br',
  // Keep connection alive for faster subsequent requests
  'Connection': 'keep-alive',
};

export const getRawClient = () =>
  new GraphQLClient(endpoint, {
    headers:
      // This needs to be destructured to avoid making changes to the original "headers" object that persist with new requests
      { ...headers },
    timeout: 8000, // Reduce timeout from 15s to 8s for faster failures
    // Add retry logic for failed requests
    retry: 2,
  });

export const getClientWithSessionToken = (
  cookies: Record<string, string | undefined>,
) => {
  const sessionToken = cookies.sessionToken;
  const rawClient = getRawClient();
  if (sessionToken) {
    rawClient.setHeader('X-Session', sessionToken);
  }
  return getGQLClient(rawClient);
};

const getGQLClient = (rawClient?: GraphQLClient) =>
  getSdk(rawClient ?? getRawClient());

export default getGQLClient;
