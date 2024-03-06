import { lazy } from "react";
import { Navigate, useRoutes } from "react-router";
import BaseLayout from "../component/layout/Layout";
import PageNotFound from "../component/PageNotFound";

const _ROOT_PATH = "/";

const Loadable = (Component: any) => (props: any) => {
  return <Component {...props} />;
};
const Login = Loadable(lazy(() => import("../component/Login")));

const Home = Loadable(lazy(() => import("../component/Home"))) 
const _CHILDREN_FOR_BASE_LAYOUT = [
  {
    index: true,
    path: _ROOT_PATH,
    element: <Navigate to="/login" replace />,
  },
  { path: "/login", element: <Login /> },
  { path: "/404", element: <PageNotFound /> },
  { path: "/home", element: <Home /> },
  { path: "*", element: <Navigate to="/404" replace /> },
];
function RoutingConfig() {
  return useRoutes([
    {
      path: _ROOT_PATH,
      element: <BaseLayout />,
      children: _CHILDREN_FOR_BASE_LAYOUT,
    },
  ]);
}

export default RoutingConfig;
