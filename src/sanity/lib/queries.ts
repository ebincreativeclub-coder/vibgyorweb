import { groq } from 'next-sanity'

export const productsQuery = groq`*[_type == "product"] {
  _id,
  title,
  "slug": slug.current,
  "category": category->slug.current,
  "subCategory": subCategory->title,
  mainImage,
  description,
  specifications,
  features
}`

export const productsByCategoryQuery = groq`*[_type == "product" && category->slug.current == $category] {
  _id,
  title,
  "slug": slug.current,
  "category": category->slug.current,
  "subCategory": subCategory->title,
  mainImage,
  description,
  specifications,
  features
}`

export const productBySlugQuery = groq`*[_type == "product" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  "category": category->slug.current,
  "subCategory": subCategory->title,
  mainImage,
  gallery,
  description,
  specifications,
  features,
  "downloads": downloads[] {
    name,
    "url": file.asset->url
  }
}`

export const categoryBySlugQuery = groq`*[_type == "category" && slug.current == $category][0] {
  _id,
  title,
  "slug": slug.current,
  description,
  mainImage
}`

export const allCategoriesQuery = groq`*[_type == "category"] | order(title asc) {
  _id,
  title,
  "slug": slug.current,
  description,
  mainImage
}`
