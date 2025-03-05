/* eslint-disable import/prefer-default-export */

import baseApi from "@/libs/redux/api/baseApi";

const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: ({ postId, firstName, lastName, phone, email, content }) => ({
        url: '',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation CreateComment(
              $postId: ID!,
              $firstName: String!,
              $lastName: String!,
              $phone: String!,
              $email: String!,
              $content: String!
            ) {
              createComment(
                postId: $postId,
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
          variables: { postId, firstName, lastName, phone, email, content },
        }),
      }),
    //   invalidatesTags: [{ type: 'COMMENT', id: 'LIST' }],
    }),
  }),
});

export const { useCreateCommentMutation } = commentApi;
