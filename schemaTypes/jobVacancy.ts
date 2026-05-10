import { defineField, defineType } from 'sanity'
import { DEPARTMENT_LIST } from './constants'

/**
 * jobVacancy Schema
 *
 * Used to populate the "Careers / Open Roles" section on the "Life at Dr. Nathan" page.
 * Set `isActive` to false to unpublish a role without deleting its record.
 */
export default defineType({
  name: 'jobVacancy',
  title: 'Job Vacancy',
  type: 'document',

  groups: [
    { name: 'details', title: 'Job Details' },
    { name: 'requirements', title: 'Requirements' },
    { name: 'settings', title: 'Settings & Display' },
  ],

  fields: [
    // ─── JOB DETAILS GROUP ────────────────────────────────────────────────────

    defineField({
      name: 'jobTitle',
      title: 'Job Title',
      type: 'string',
      group: 'details',
      description: 'e.g. Senior Medical Marketing Strategist',
      validation: (Rule) => Rule.required().error('Job title is required.'),
    }),

    defineField({
      name: 'slug',
      title: 'Slug (URL ID)',
      type: 'slug',
      group: 'details',
      description: 'Auto-generated from the job title. Used for deep-linking to specific roles.',
      options: {
        source: 'jobTitle',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('A slug is required for linking.'),
    }),

    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      group: 'details',
      options: {
        list: [...DEPARTMENT_LIST],
      },
      validation: (Rule) => Rule.required().error('Please assign a department.'),
    }),

    defineField({
      name: 'employmentType',
      title: 'Employment Type',
      type: 'string',
      group: 'details',
      options: {
        list: [
          { title: 'Full-Time', value: 'Full-Time' },
          { title: 'Part-Time', value: 'Part-Time' },
          { title: 'Contract', value: 'Contract' },
          { title: 'Internship', value: 'Internship' },
          { title: 'Freelance', value: 'Freelance' },
        ],
        layout: 'radio',
      },
      initialValue: 'Full-Time',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      group: 'details',
      description: 'e.g. Yangon, Myanmar · Remote · Hybrid',
      initialValue: 'Yangon, Myanmar',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'salaryRange',
      title: 'Salary Range (Optional)',
      type: 'string',
      group: 'details',
      description: 'Optional: e.g. MMK 800,000 – 1,200,000 / month. Leave blank to omit from the listing.',
    }),

    defineField({
      name: 'summary',
      title: 'Role Summary',
      type: 'text',
      group: 'details',
      rows: 3,
      description: 'A 2–3 sentence hook that makes the candidate want to read more. This appears in the collapsed card view.',
      validation: (Rule) =>
        Rule.required()
          .max(400)
          .error('Summary is required. Keep it under 400 characters for clean layout.'),
    }),

    defineField({
      name: 'description',
      title: 'Full Job Description',
      type: 'array',
      group: 'details',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading', value: 'h3' },
            { title: 'Sub-heading', value: 'h4' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
          },
        },
      ],
      description: 'Detailed description of the role, responsibilities, and what the candidate will work on.',
    }),

    // ─── REQUIREMENTS GROUP ───────────────────────────────────────────────────

    defineField({
      name: 'requirements',
      title: 'Key Requirements',
      type: 'array',
      group: 'requirements',
      of: [{ type: 'string' }],
      description: 'List each requirement as a separate item (e.g. "3+ years of digital marketing experience"). These render as a clean bullet list.',
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .error("Add at least one requirement so candidates know what you're looking for."),
    }),

    defineField({
      name: 'niceToHave',
      title: 'Nice to Have (Optional)',
      type: 'array',
      group: 'requirements',
      of: [{ type: 'string' }],
      description: 'Bonus skills or experiences that are not mandatory. These are displayed separately to encourage more applicants.',
    }),

    defineField({
      name: 'whatWeOffer',
      title: 'What We Offer',
      type: 'array',
      group: 'requirements',
      of: [{ type: 'string' }],
      description: 'Perks and benefits for this role (e.g. "Flexible working hours", "Learning & development budget").',
    }),

    // ─── SETTINGS & DISPLAY GROUP ─────────────────────────────────────────────

    defineField({
      name: 'isActive',
      title: 'Accepting Applications',
      type: 'boolean',
      group: 'settings',
      description: 'Toggle to publish or unpublish this role. Only active roles will appear on the website.',
      initialValue: true,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'isFeatured',
      title: 'Feature This Role',
      type: 'boolean',
      group: 'settings',
      description: 'Featured roles are highlighted at the top of the careers listing.',
      initialValue: false,
    }),

    defineField({
      name: 'applicationDeadline',
      title: 'Application Deadline (Optional)',
      type: 'date',
      group: 'settings',
      description: 'Leave blank for a rolling application. If set, this date will display on the role card.',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
    }),

    defineField({
      name: 'publishedAt',
      title: 'Date Posted',
      type: 'datetime',
      group: 'settings',
      description: 'The date this role was first posted. Used for sorting.',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
  ],

  // Orderings available in the Sanity Studio document list
  orderings: [
    {
      title: 'Date Posted (Newest First)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'isFeatured', direction: 'desc' },
        { field: 'publishedAt', direction: 'desc' },
      ],
    },
    {
      title: 'Department (A → Z)',
      name: 'departmentAsc',
      by: [{ field: 'department', direction: 'asc' }],
    },
  ],

  // Preview card shown in the Studio document list
  preview: {
    select: {
      title: 'jobTitle',
      subtitle: 'department',
      active: 'isActive',
      featured: 'isFeatured',
      type: 'employmentType',
    },
    prepare({ title, subtitle, active, featured, type }) {
      const badges = [
        featured ? '⭐ Featured' : '',
        active ? '🟢 Active' : '🔴 Closed',
      ]
        .filter(Boolean)
        .join(' · ')

      return {
        title,
        subtitle: `${subtitle} · ${type} · ${badges}`,
      }
    },
  },
})
