import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://zunoon-2026.vercel.app';

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/events', '/confessions', '/pass'],
        disallow: ['/scan', '/api/scan/', '/api/'],
      },
      {
        userAgent: 'Googlebot',
        allow: ['/', '/events', '/confessions', '/pass'],
        disallow: ['/scan', '/api/scan/', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
