import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.onthebrand.cl';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/consultora`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/agencia`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/plataforma`,
      lastModified: new Date(),
    },
  ]
}