import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import LandingPage from "../pages/Public/LandingPage";
import HomePage from "../pages/Public/HomePage";
import AboutPage from "../pages/Public/AboutPage";
import LoginPage from "../pages/Public/LoginPage";
import RegisterPage from "../pages/Public/RegisterPage";
import Dashboard from "../pages/Both/Dashboard";
import WorkSpace from "../pages/Both/WorkSpace";
import AccountPage from "../pages/Both/AccountPage";
import AdminUsersPage from "../pages/Admin/AdminUsersPage";
import AdminTasksPage from "../pages/Admin/AdminTasksPage";

function AppRouter() {
  return (
    <div className="min-h-screen text-slate-900 flex flex-col">
      <Navbar />
      <main className="w-full max-w-6xl mx-auto px-4 py-8 md:py-10 flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/workspace"
            element={
              <PrivateRoute>
                <WorkSpace />
              </PrivateRoute>
            }
          />
          <Route
            path="/account"
            element={
              <PrivateRoute>
                <AccountPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <AdminUsersPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/tasks"
            element={
              <AdminRoute>
                <AdminTasksPage />
              </AdminRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default AppRouter;
