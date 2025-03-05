/* eslint-disable import/prefer-default-export */

import baseApi from "@/libs/redux/api/baseApi";

const replyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addReply: builder.mutation({
      query: ({ commentId, firstName, lastName, phone, email, content }) => ({
        url: '',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation AddReply(
              $commentId: ID!,
              $firstName: String!,
              $lastName: String!,
              $phone: String!,
              $email: String!,
              $content: String!
            ) {
              addReply(
                commentId: $commentId,
                firstName: $firstName,
                lastName: $lastName,
                phone: $phone,
                email: $email,
                content: $content
              ) {
                success
                message
                data {
                  id
                  postId
                  firstName
                  lastName
                  phone
                  email
                  content
                  createdAt
                }
              }
            }
          `,
          variables: { commentId, firstName, lastName, phone, email, content },
        }),
      }),
      // Uncomment if you want to invalidate cache tags
      // invalidatesTags: [{ type: 'REPLY', id: 'LIST' }],
    }),
  }),
});

export const { useAddReplyMutation } = replyApi;
