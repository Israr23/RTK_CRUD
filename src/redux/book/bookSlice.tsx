import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface bookType {
  id: number
  bookName: string
  writerName: string
  isSold: boolean
}

export const bookApi = createApi({
  reducerPath: 'book',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3004',
  }),
  tagTypes: ['Book'],
  endpoints: (builder) => ({
    getBook: builder.query<bookType[], void>({
      query: () => '/books',
      transformResponse: (res: any) =>
        res.sort((a: any, b: any) => b.id - a.id),
      providesTags: ['Book'],
    }),
    addBook: builder.mutation({
      query: (payload) => ({
        url: '/books',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Book'],
    }),
    updateBook: builder.mutation({
      query: (payload) => ({
        url: `/books/${payload.id}`,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['Book'],
    }),
    deteteBook: builder.mutation({
      query: ({ id }) => ({
        url: `/books/${id}`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: ['Book'],
    }),
  }),
})

export const {
  useAddBookMutation,
  useGetBookQuery,
  useUpdateBookMutation,
  useDeteteBookMutation,
} = bookApi
