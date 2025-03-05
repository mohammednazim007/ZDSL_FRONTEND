const query = `query GetPhotoGallery {
  getPhotoGallery {
    success
    message
    data {
      _id
      fileName
      mediaType
      moduleName
      isFeatured
      isDeleted
    }
    meta {
      page
      limit
      total
      totalPage}}
}`
export default query
