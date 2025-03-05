/* eslint-disable import/prefer-default-export */
export const blogsQuery = [
  '_id',
  'blogType',
  'category',
  'user { userName userDetails {profilePic} }',
  'blogTitle',
  'slug',
  'description',
  'tag',
  'publishDate',
  'focusKeyword',
  'metaImage',
  'featuredImage',
  'seoMetaTitle',
  'seoMetaDescription',
  'permalink',
  'status',
]

export const blogsCategoryQuery = [
  `
     _id
      categoryName
  `,
]
