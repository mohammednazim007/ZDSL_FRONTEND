/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/prefer-default-export */
import { getMeQuery } from '@/constants/user/user.query'
import {
  feedbackMutation,
  reportMutation,
} from '@/constants/userDashboard/feedbackMutation'
import {
  FeedbackReportFormValues,
  ReportFormValues,
} from '@/interface/FeedbackReport'
import baseApi from '@/libs/redux/api/baseApi'

interface TChangePassword {
  oldPassword: string
  newPassword: string
}

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => {
        return {
          url: ``,
          method: 'POST',
          body: JSON.stringify({
            query: getMeQuery,
          }),
        }
      },
      providesTags: ['USER_PROFILE'],
    }),
    updateUserProfile: builder.mutation({
      query: ({ id, data }: { id: string; data: any }) => {
        const query = `mutation UpdateProfile($profile: UpdateProfileInput!) {
                          updateProfile(profile: $profile) {
                                success
                                message
                          }
                        }`
        return {
          url: ``,
          method: 'POST',
          body: JSON.stringify({
            query: query,
            variables: {
              profile: {
                ...data,
                user: id,
              },
            },
          }),
        }
      },
      invalidatesTags: ['USER_PROFILE'],
    }),
    changeUserPassword: builder.mutation({
      query: (payload: TChangePassword) => {
        const query = `mutation Mutation($oldPassword: String!, $newPassword: String!) {
  changePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
    success
    message
  }
        }`
        return {
          url: ``,
          method: 'POST',
          body: JSON.stringify({
            query: query,
            variables: payload,
          }),
        }
      },
    }),
    submitFeedback: builder.mutation({
      query: (payload: FeedbackReportFormValues) => {
        return {
          url: ``,
          method: 'POST',
          body: JSON.stringify({
            query: feedbackMutation,
            variables: payload,
          }),
        }
      },
    }),
    submitReport: builder.mutation({
      query: (payload: ReportFormValues) => {
        return {
          url: ``,
          method: 'POST',
          body: JSON.stringify({
            query: reportMutation,
            variables: payload,
          }),
        }
      },
    }),
  }),
})

export const {
  useGetMeQuery,
  useUpdateUserProfileMutation,
  useChangeUserPasswordMutation,
  useSubmitFeedbackMutation,
  useSubmitReportMutation,
} = userApi
