import baseAPI from "@/redux/api/api";

const AuthenticationAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    verifyFogotPassOtp: builder.mutation({
      query: (body) => ({
        url: "/account/verify-forget-password-otp/",
        method: "POST",
        body,
      }),
    }),

    resendOtp: builder.mutation({
      query: (body) => ({
        url: "/accounts/send_otp/",
        method: "POST",
        body,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/account/forget-password/",
        method: "POST",
        body,
      }),
    }),

    resetPassword: builder.mutation({
      query: (body) => ({
        url: "/account/reset-password/",
        method: "POST",
        body,
      }),
    }),

    changePassword: builder.mutation({
      query: (body) => ({
        url: "/account/change-password/",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useVerifyFogotPassOtpMutation,
  useResendOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = AuthenticationAPI;
export default AuthenticationAPI;
