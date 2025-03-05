/* eslint-disable import/prefer-default-export */
export const videoQuery = `query GetAllVideos(
    $page: Int,
    $limit: Int,
    $search: String,
    $videoTitle: String,
    $videoType: String,
    $videoUrl: String,
    $order: SortOrder,
    $sort: String
  ) {
    getAllVideos(
      page: $page,
      limit: $limit,
      search: $search,
      VideoTitle: $videoTitle,
      videoType: $videoType,
      VideoUrl: $videoUrl,
      order: $order,
      sort: $sort
    ) {
      success
      message
      data {
        _id
        VideoTitle
        VideoUrl
        publishDate
        thumbnailImage
        videoType
        isDeleted
      }
      meta {
        page
        limit
        total
        totalPage
      }
    }
  }`
