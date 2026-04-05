import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  // This groups tabs at the top of the editor for a clean writer experience
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'seo', title: 'SEO & Social' },
  ],
  fields: [
    // -------------------------
    // THE CONTENT TAB
    // -------------------------
    defineField({
      name: 'title',
      title: 'Article Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL path)',
      type: 'slug',
      group: 'content',
      description: 'IMPORTANT: Write this in English/Latin characters for clean, shareable URLs (e.g., "medical-seo-trends-2026"), even if the article is in Burmese.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      group: 'content',
      to: { type: 'author' },
      description: 'Select the author to boost E-E-A-T signals.'
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      group: 'content',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt / Summary',
      type: 'text',
      group: 'content',
      rows: 3,
      description: 'A short hook used on the main blog listing page to get people to click.',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Cover Image',
      type: 'image',
      group: 'content',
      options: { hotspot: true }, // Allows writers to crop the image inside Sanity
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text (Crucial for SEO)',
          description: 'Describe what is in the image for search engines and accessibility.',
        }
      ]
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: { type: 'category' } }],
      description: 'High-level grouping for your blog posts (e.g., Marketing, Consultancy).',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: { type: 'tag' } }],
      description: 'Granular topics used for filtering (e.g., SEO tips, Case Study).',
    }),
    defineField({
      name: 'body',
      title: 'Article Body',
      type: 'array',
      group: 'content',
      of: [
        { type: 'block' }, // Standard text
        { type: 'image', options: { hotspot: true } } // Allows images inside the text
      ],
    }),

    // -------------------------
    // THE SEO & SOCIAL TAB
    // -------------------------
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      group: 'seo',
      description: 'Optimal length: 50–60 characters. Search engines use this as the blue link.',
      validation: Rule => Rule.max(60).warning('Longer titles usually get truncated by Google.')
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      group: 'seo',
      rows: 3,
      description: 'Optimal length: 150–160 characters. A compelling summary to increase click-through rates.',
      validation: Rule => Rule.max(160).warning('Keep under 160 characters for best results.')
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Sharing Image (OG Image)',
      type: 'image',
      group: 'seo',
      description: 'Recommended size: 1200x630px. This image shows up when the link is shared on Facebook, LinkedIn, X, or Telegram.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      group: 'seo',
      description: 'Advanced SEO: Leave blank unless you are republishing this article from another website.',
    }),
  ],
})
