import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export function useAuth() {
  const { user, token, profileLoading } = useSelector(
    (state: RootState) => state.auth,
  );

  return {
    user,
    token,
    profileLoading,

    isLoggedIn: !!user && !!token,

    isVerified: user?.is_verified ?? false,

    isAdmin: user ? (user.is_staff || user.is_superuser) : false,

    isUser: user ? (!user.is_staff && !user.is_superuser) : false,
  };
}
