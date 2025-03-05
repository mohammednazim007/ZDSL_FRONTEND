export const getAllProjectZoneQuery = `query GetZones(
    $search: String
    $zone: String
    $sort: String
    $order: SortOrder
    $page: Int
    $limit: Int
  ) {
    getZones(
      search: $search
      zone: $zone
      sort: $sort
      order: $order
      page: $page
      limit: $limit
    ) {
      success
      message
      data {
        id
        zone
        isActive
      }
      meta {
        page
        limit
        total
        totalPage
      }
    }
  }`
  