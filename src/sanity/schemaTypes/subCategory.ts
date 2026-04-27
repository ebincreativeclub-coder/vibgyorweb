import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'subCategory',
  title: 'Sub Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Sub Category Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'parentCategory',
      title: 'Parent Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),
  ],
})
