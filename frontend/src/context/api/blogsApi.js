import { api } from './index'

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBlogs: build.query({
      query: (params) => ({
        url: '/blogs',
        params
      }),
      providesTags: ["Blog", "User"]
    }),
    getSearchBlog: build.query({
      query: (params) => ({
        url: '/blogs/search',
        params
      }),
      providesTags: ["Blog", "User"]
    }),
    getBlogById: build.query({
      query: (id) => ({
        url: `/blogs/${id}`
      }),
      providesTags: ["Blog"]
    }),
    createBlog: build.mutation({
      query: (body) => ({
        url: "/blogs",
        method: "POST",
        body
      }),
      invalidatesTags: ["Blog"]
    }),
    deleteBlog: build.mutation({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Blog"]
    }),
    updateBlog: build.mutation({
      query: ({ id, body }) => ({
        url: `/blogs/${id}`,
        method: "PUT",
        body
      }),
      invalidatesTags: ["Blog"]
    })
  }),
})

export const {
  useGetBlogsQuery,
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
  useGetSearchBlogQuery
} = userApi
