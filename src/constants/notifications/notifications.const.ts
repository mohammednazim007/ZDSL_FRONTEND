/* eslint-disable import/prefer-default-export */

export const NotificationsQuery = `query GetAllNotifications($sort: String, $order: SortOrder, $page: Int, $limit: Int) {
  getAllNotifications(sort: $sort, order: $order, page: $page, limit: $limit) {
    success
    message
    data {
      id
      message
      body
      image
      targetId
      sendBy {
        id
        userName
        email
        role
        isDeleted
        status
        socialAuthId
        userDetails {
          _id
          name {
            firstName
            middleName
            lastName
          }
          profilePic
        }
      }
      type
      isDeleted
      isRead
      targetUser {
        email
        userDetails {
          name {
            firstName
            middleName
            lastName
          }
          profilePic
        }
      }
      createdAt
    }
    meta {
      page
      limit
      total
      totalPage
}
  }
}`
