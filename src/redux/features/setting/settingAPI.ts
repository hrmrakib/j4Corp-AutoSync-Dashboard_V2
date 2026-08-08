import baseAPI from "@/redux/api/api";

const settingAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: "/profiles/me/",
      }),
      providesTags: ["Settings"],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/profiles/me/",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Settings"],
    }),

    getContentBySlug: builder.query({
      query: (slug) => ({
        url: `/privacy/content/${slug}/`,
        method: "GET",
      }),
      providesTags: (result, error, slug) => [{ type: "Settings", id: slug }],
    }),

    updateContentBySlug: builder.mutation({
      query: ({ slug, data }) => ({
        url: `/privacy/content/${slug}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { slug }) => [{ type: "Settings", id: slug }],
    }),

    patchContentBySlug: builder.mutation({
      query: ({ slug, data }) => ({
        url: `/privacy/content/${slug}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { slug }) => [{ type: "Settings", id: slug }],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetContentBySlugQuery,
  useUpdateContentBySlugMutation,
  usePatchContentBySlugMutation,
} = settingAPI;
export default settingAPI;
