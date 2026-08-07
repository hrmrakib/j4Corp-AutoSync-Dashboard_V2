import baseAPI from "@/redux/api/api";


const appointmentAPI = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
        getAppointments: builder.query({
            query: () => ({
                url: `/unit/services/`,
                method: "GET"
            }),
        })
    })
})
export const { useGetAppointmentsQuery } = appointmentAPI