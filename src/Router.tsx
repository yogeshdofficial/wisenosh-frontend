import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "@src/features/Layout/Layout";
import Home from "@src/pages/Home/Home";

const routes = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      // Additional routes go here
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={routes}></RouterProvider>;
}
