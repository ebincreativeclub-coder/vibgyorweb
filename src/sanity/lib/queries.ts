import { groq } from 'next-sanity'

export const categoryBySlugQuery = groq`*[_type == "category" && slug.current == $category][0] {
  _id,
  title,
  "slug": slug.current,
  description,
  mainImage,
  gallery,
  "pdfUrl": pdf.asset->url
}`

export const allCategoriesQuery = groq`*[_type == "category"] | order(title asc) {
  _id,
  title,
  "slug": slug.current,
  description,
  mainImage
}`

export const projectsQuery = groq`*[_type == "project"] | order(_createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  category,
  mainImage,
  images
}`

export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  category,
  mainImage,
  images
}`
