# Deployment instructions for Vercel

## Before deploying:

1. Make sure all required environment variables are set in your Vercel dashboard:
   - NEXT_PUBLIC_SWELL_STORE_URL
   - NEXT_PUBLIC_SWELL_PUBLIC_KEY
   - NEXT_PUBLIC_SWELL_EDITOR
   - SWELL_STORE_ID
   - SWELL_STOREFRONT_ID
   - SWELL_SECRET_KEY

2. Use the production build command: `yarn build:prod`

## Key optimizations made:

1. **vercel.json**: Added function timeouts (30s for API, 60s for pages)
2. **next.config.js**: Added timeout handling for async config and SWC minification
3. **[[...slug]].tsx**: Added error handling and ISR revalidation
4. **fetchStoreData.ts**: Added 15-second timeout to REST calls
5. **GraphQL client**: Added 15-second timeout to GraphQL requests

## If you still get timeouts:

1. Check your Swell API response times
2. Consider using ISR (Incremental Static Regeneration) instead of SSG
3. Move heavy operations to client-side or background jobs
4. Consider using Vercel Pro for longer function timeouts
