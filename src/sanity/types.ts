import { Image } from 'sanity'

export interface SanityProduct {
  _id: string
  title: string
  slug: string
  category: 'furniture' | 'partitioning' | 'raised-floors'
  mainImage: Image
  gallery?: Image[]
  description?: string
  specifications?: {
    label: string
    value: string
  }[]
  features?: string[]
}
