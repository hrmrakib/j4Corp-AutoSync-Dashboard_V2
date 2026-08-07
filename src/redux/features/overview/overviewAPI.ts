import baseAPI from "@/redux/api/api";


const overviewAPI = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
        getOverview: builder.query({
            query: (params) => ({
                url: "/dashboard/status/",
                method: "GET",
                params,
            }),
        }),
    }),
    overrideExisting: false,
})

export const { useGetOverviewQuery } = overviewAPI