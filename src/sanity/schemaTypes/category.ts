import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
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
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'mainImage',
      title: 'Category Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'gallery',
      title: 'Sub-images Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Add 3-4 sub-images for this category showcase.',
    }),
    defineField({
      name: 'pdf',
      title: 'Catalog PDF',
      type: 'file',
      options: {
        accept: '.pdf',
      },
      description: 'PDF containing details of the products of this category',
    }),
  ],
})
