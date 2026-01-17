import { createHashRouter, Navigate } from "react-router";
import { ShopLayout } from "../shop/layouts/ShopLayout";
import { HomePage } from "../shop/pages/home/HomePage";
import { ProductPage } from "../shop/pages/product/ProductPage";
import { GenderPage } from "../shop/pages/gender/GenderPage";
// import { AuthLayout } from "./auth/layouts/AuthLayout";
import { LoginPage } from "../auth/pages/login/LoginPage";
import { RegisterPage } from "../auth/pages/register/RegisterPage";
// import { AdminLayout } from "./admin/layouts/AdminLayout";
import { DashBoardPage } from "../admin/pages/dashboard/DashboardPage";
import { AdminProductPage } from "../admin/pages/product/AdminProductPage";
import { AdminProductsPage } from "../admin/pages/products/AdminProductsPage";
import { lazy } from "react";
import {
  AdminRoutes,
  NotAuthenticatedRoutes,
} from "@/components/routes/ProtectedRoutes";

const AuthLayout = lazy(() => import("../auth/layouts/AuthLayout"));
const AdminLayout = lazy(() => import("../admin/layouts/AdminLayout"));

export const appRouter = createHashRouter([
  // export const appRouter = createBrowserRouter([
  // Main page Routes
  {
    path: "/",
    element: <ShopLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "product/:idSlug",
        element: <ProductPage />,
      },
      {
        path: "gender/:gender",
        element: <GenderPage />,
      },
    ],
  },
  // Auth Routes
  {
    path: "/auth",
    element: (
      <NotAuthenticatedRoutes>
        <AuthLayout />,
      </NotAuthenticatedRoutes>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  // Admin Routes
  {
    path: "/admin",
    element: (
      <AdminRoutes>
        <AdminLayout />
      </AdminRoutes>
    ),
    children: [
      {
        index: true,
        element: <DashBoardPage />,
      },
      {
        path: "products",
        element: <AdminProductsPage />,
      },
      {
        path: "products/:id",
        element: <AdminProductPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
