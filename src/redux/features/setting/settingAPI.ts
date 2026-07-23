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

    getAboutUs: builder.query({
      query: () => ({
        url: "/privacy/about-us/",
        method: "GET",
      }),
    }),

    updateAboutUs: builder.mutation({
      query: (body) => ({
        url: "/privacy/about-us/",
        method: "POST",
        body,
      }),
    }),

    getTermsAndConditions: builder.query({
      query: () => ({
        url: "/settings/terms_conditions/",
      }),
      providesTags: ["Settings"],
    }),

    updateTermsAndConditions: builder.mutation({
      query: (data) => ({
        url: "/settings/terms_conditions/",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Settings"],
    }),

    getPrivacyPolicy: builder.query({
      query: () => ({
        url: "/privacy/privacy-policy/",
      }),
      providesTags: ["Settings"],
    }),

    updatePrivacyPolicy: builder.mutation({
      query: (data) => ({
        url: "/privacy/privacy-policy/",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Settings"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetAboutUsQuery,
  useUpdateProfileMutation,
  useUpdateAboutUsMutation,
  useUpdateTermsAndConditionsMutation,
  useGetPrivacyPolicyQuery,
  useUpdatePrivacyPolicyMutation,
} = settingAPI;
export default settingAPI;
