import { ReactNode, createContext, useContext, useState } from "react";

export const authContext = createContext<{
  auth: any;
  setAuthData: (data: any) => void;
}>({
  auth: null,
  setAuthData: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<string>("");
  const setAuthData = (data: string) => {
    setAuth(data);
  };

  const restaurantContextValue = {
    auth,
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
