import { ReactNode, createContext, useContext, useState } from "react";
import { AuthUser } from "../models/model";
import { jwtDecode } from "jwt-decode";
export const authContext = createContext<{
  auth: any;
  authUser: AuthUser | undefined;
  setAuthData: (data: any) => void;
}>({
  auth: null,
  authUser: undefined,
  setAuthData: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<string>("");
  const [authUser, setAuthUSer] = useState<AuthUser>();

  const setAuthData = (data: string) => {
    setAuth(data);
    initAuthUser(data);
  };

  function initAuthUser(token : string) {
    const jwtToken = localStorage.getItem("token");
    if (jwtToken || token) {
      const decodedToken = jwtDecode(
        jwtToken === null ? token : jwtToken!
      ) as AuthUser;
      setAuthUSer(decodedToken);
    }
  }
  
  const restaurantContextValue = {
    auth,
    authUser,
    setAuthData,
  };

  return (
    <authContext.Provider value={restaurantContextValue}>
      {children}
    </authContext.Provider>
  );
};
const useAuthContext = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error(
      "useRestaurantContext must be used within a RestaurantContext.Provider"
    );
  }
  return context;
};

export { AuthProvider, useAuthContext };
