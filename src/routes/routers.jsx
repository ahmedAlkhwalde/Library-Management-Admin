import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/login.jsx";
import CategoriesPage from "../pages/CategoriesPage.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";
import MainLayout from "../layout/MainLayout.jsx";
import RootRedirect from "./RootRedirect.jsx";
import BooksPage from "../pages/BooksPage.jsx";
import UserPage from "../pages/User.jsx";
import BorrowRequestsView from "../pages/BorrowRequestspage.jsx";
import ActiveBorrowTable from "../features/borrow/components/ActiveBorrowTable.jsx";
import ReservedBooksTable from "../features/borrow/components/ReservedBooksTable.jsx";
import ReturnedBooksTable from "../features/borrow/components/ReturnedBooksTable.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";

// استيراد مكونات الجداول الفرعية (تأكد من المسارات الصحيحة)
import BorrowTable from "../features/borrow/components/BorrowTable.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRedirect />,
  },
  {
    path: "/app/main-page",
    element: <Navigate to="/app/dashboard" replace />,
  },
  {
    path: "/app/login",
    element: <Login />,
  },
  {
    path: "/app",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "categories",
        element: <CategoriesPage />,
      },
      {
        path: "books",
        element: <BooksPage />,
      },
      {
        path: "users",
        element: <UserPage />,
      },
      {
        path: "borrow-requests",
        element: <BorrowRequestsView />,
        children: [
          {
            index: true,
            element: <Navigate to="active" replace />, // توجيه تلقائي عند الدخول لـ borrow-requests
          },
          {
            path: "active",
            element: <ActiveBorrowTable />,
          },
          {
            path: "reserved",
            element: <ReservedBooksTable />,
          },
          {
            path: "history",
            element: <ReturnedBooksTable />,
          },
        ],
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
]);