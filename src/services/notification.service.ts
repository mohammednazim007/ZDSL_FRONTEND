/* eslint-disable import/prefer-default-export */
import {  NotificationsQuery } from '@/constants/notifications/notifications.const';
import baseApi from '@/libs/redux/api/baseApi';

interface INotificationsPayload {
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
}

const notificationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotifications: builder.query({
      query: ({
        page = 1,
        limit = 10,
        sort = 'asc',
        order = 'asc',
      }: INotificationsPayload) => {
        const variables = { page, limit, sort, order };

        return {
          url: '',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            
          },
          body: JSON.stringify({
            query: NotificationsQuery, // Directly using the imported query
            variables,
          }),
        };
      },
    }),
  }),
});

export const { useGetAllNotificationsQuery } = notificationsApi;
