import "./App.css";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import LoginPage from "./routes/loginPage/loginPage";
import AdminPage from "./routes/adminPage/adminPage";
import { AuthProvider, RequireAuth } from "./auth/AuthContext";

function App() {
  return (
    <div className="backgrounds">
      <AuthProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/admin/*"
              element={
                <RequireAuth>
                  <AdminPage />
                </RequireAuth>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </HashRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
