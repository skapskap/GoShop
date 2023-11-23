import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home.page"; // Importe a HomePage

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
