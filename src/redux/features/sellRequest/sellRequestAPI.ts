import baseAPI from "@/redux/api/api"


const sellRequestAPI = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
        getSellRequests: builder.query({
            query: () => ({
                url: `/unit/sell-units/`,
                method: "GET"
            }),
        })
    })
})
export const { useGetSellRequestsQuery } = sellRequestAPI