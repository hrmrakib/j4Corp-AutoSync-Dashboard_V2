import baseAPI from "@/redux/api/api"


const sellRequestAPI = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
        getSellRequests: builder.query({
            query: (search?: string) => ({
                url: search ? `/unit/sell-units/?search=${encodeURIComponent(search)}` : `/unit/sell-units/`,
                method: "GET"
            }),
        })
    })
})
export const { useGetSellRequestsQuery } = sellRequestAPI