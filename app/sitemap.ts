import { MetadataRoute } from 'next'
import namesData from '@/data/names.json'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://korean-name-generator-weld.vercel.app'

    // 1. Main Page
    const staticPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
    ]

    // 2. Dynamic Name Pages
    const namePages = namesData.map((item) => ({
        url: `${baseUrl}/name/${item.engName.toLowerCase()}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    return [...staticPages, ...namePages]
}
