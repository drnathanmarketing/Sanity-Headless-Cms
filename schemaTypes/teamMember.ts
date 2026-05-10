import { defineField, defineType } from 'sanity'
import { DEPARTMENT_LIST } from './constants'

/**
 * teamMember Schema
 *
 * Used to populate the "Meet Our Team" section on the "Life at Dr. Nathan" page.
 * The founder is hardcoded on the frontend; all other members are managed here.
 */
export default defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',

  // Group fields for a clean editing experience in the Studio
  groups: [
    { name: 'profile', title: 'Profile' },
    { name: 'display', title: 'Display & Order' },
  ],

  fields: [
    // ─── PROFILE GROUP ────────────────────────────────────────────────────────

    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      group: 'profile',
      validation: (Rule) => Rule.required().error('A team member must have a name.'),
    }),

    defineField({
      name: 'role',
      title: 'Role / Title',
      type: 'string',
      group: 'profile',
      description: 'e.g. Head of Strategy, Senior Marketing Consultant',
      validation: (Rule) => Rule.required().error('A role is required to display on the card.'),
    }),

    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      group: 'profile',
      description: 'e.g. Marketing, Operations, Consultancy, Creative',
      options: {
        list: [...DEPARTMENT_LIST],
      },
    }),

    defineField({
      name: 'profileImage',
      title: 'Profile Photo',
      type: 'image',
      group: 'profile',
      options: {
        hotspot: true, // Enables focal-point cropping in Sanity Studio
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Describe the photo for accessibility and SEO (e.g. "Jane Doe, Head of Strategy at Dr. Nathan").',
          validation: (Rule) => Rule.required().warning('Alt text is strongly recommended for accessibility.'),
        },
      ],
      validation: (Rule) => Rule.required().error('A profile photo is required.'),
    }),

    defineField({
      name: 'bio',
      title: 'Short Bio',
      type: 'text',
      group: 'profile',
      rows: 4,
      description: 'A concise 1–2 sentence bio that will appear on hover or in the team card. Keep it punchy.',
      validation: (Rule) =>
        Rule.max(300).warning('Keep the bio under 300 characters for a clean card layout.'),
    }),

    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      group: 'profile',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          title: 'Social Link',
          fields: [
            {
              name: 'platform',
              type: 'string',
              title: 'Platform',
              options: {
                list: [
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'X (Twitter)', value: 'twitter' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Website', value: 'website' },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'url',
              type: 'url',
              title: 'Profile URL',
              validation: (Rule) =>
                Rule.required().uri({
                  scheme: ['http', 'https'],
                }),
            },
          ],
          preview: {
            select: { title: 'platform', subtitle: 'url' },
          },
        },
      ],
      description: 'Optional: LinkedIn or other professional profile links.',
    }),

    // ─── DISPLAY & ORDER GROUP ─────────────────────────────────────────────────

    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      group: 'display',
      description:
        'Controls the order of team members on the page. Lower numbers appear first. The founder is always pinned at position 0 on the frontend.',
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .integer()
          .error('Display order is required and must be a positive integer.'),
      initialValue: 1,
    }),

    defineField({
      name: 'isActive',
      title: 'Show on Website',
      type: 'boolean',
      group: 'display',
      description: 'Toggle off to hide this team member without deleting their record.',
      initialValue: true,
    }),
  ],

  // Preview card shown in the Sanity Studio document list
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'profileImage',
      isActive: 'isActive',
      order: 'displayOrder',
    },
    prepare({ title, subtitle, media, isActive, order }) {
      return {
        title: `${order ? `#${order} — ` : ''}${title}`,
        subtitle: `${subtitle}${isActive === false ? ' · ⚠️ Hidden' : ''}`,
        media,
      }
    },
  },

  // Orderings let editors sort the list in Studio by display order
  orderings: [
    {
      title: 'Display Order (Asc)',
      name: 'displayOrderAsc',
      by: [{ field: 'displayOrder', direction: 'asc' }],
    },
    {
      title: 'Name (A → Z)',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
})
