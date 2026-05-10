/**
 * Shared constants for Dr. Nathan Sanity CMS schemas.
 *
 * Single source of truth — add, rename, or remove entries here
 * and all schemas that reference these lists will update automatically.
 */

// ─── DEPARTMENTS ──────────────────────────────────────────────────────────────
// Used by: teamMember.department, jobVacancy.department
export const DEPARTMENT_LIST = [
  { title: 'Marketing',           value: 'Marketing' },
  { title: 'Consultancy',         value: 'Consultancy' },
  { title: 'Creative',            value: 'Creative' },
  { title: 'Operations',          value: 'Operations' },
  { title: 'Technology',          value: 'Technology' },
  { title: 'Business Development',value: 'Business Development' },
] as const

// Derive a union type so TypeScript catches invalid department strings at compile time
export type Department = (typeof DEPARTMENT_LIST)[number]['value']
