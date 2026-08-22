const vercelurl = process.env.VERCEL_URL;

export const envValues = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  apiUrl: process.env.NEXT_PUBLIC_API_URL + '/api/v1',
  siteUrl: vercelurl || process.env.NEXT_PUBLIC_SITE_URL,
};
