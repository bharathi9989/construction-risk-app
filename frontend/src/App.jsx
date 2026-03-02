import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";

import Login from "./auth/Login";
import Register from "./auth/Register";

import Dashboard from "./pages/DashBoard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import RiskDashboard from "./pages/RiskDashBoard";
import MainLayout from "./components/layout/MainLayout";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected with Layout */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Projects />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/projects/:projectId/tasks"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Tasks />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/risk/:projectId"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <RiskDashboard />
                </MainLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
