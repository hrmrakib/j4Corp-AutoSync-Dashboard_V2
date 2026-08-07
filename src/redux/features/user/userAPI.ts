import baseAPI from "@/redux/api/api";

const userAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query({
      query: (params) => ({
        url: "/dashboard/status/",
        method: "GET",
        params,
      }),
    }),

    getSingleUser: build.query({
      query: (userId: string) => ({
        url: `/admin_dashboard/users/${userId}/`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetSingleUserQuery,
} = userAPI;
export default userAPI;
