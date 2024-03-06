import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Loading from "../Loading";

const BaseLayout = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const staticTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => {
      clearTimeout(staticTimeout);
    };
  }, []);

  return <>{isLoading ? <Loading /> : <Outlet />}</>;
};
export default BaseLayout;