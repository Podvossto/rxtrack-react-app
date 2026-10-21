import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./loginPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logoWhite from "../../assets/images/RxTrack-logo-white.png";
import { useAuth } from "../../auth/AuthContext";

const labelStyle = { fontSize: "1rem", color: "#131b37a4" };

const LoginPage = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (user) return <Navigate to="/admin/dashboard" replace />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(username, password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(
        err.response?.status === 401
          ? "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"
          : "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div className="boxContainer">
        <div className="left-section">
          <div className="logo-section">
            <img src={logoWhite} alt="RxTrack" />
          </div>
          <div className="left-detail-section">
            <h1>ระบบบริหารจัดการคลังยา</h1>
            <h4>Medical Inventory Management System</h4>
          </div>
        </div>
        <div className="right-section">
          <h1 style={{ fontWeight: "bold", color: "rgb(19, 27, 55)" }}>เข้าสู่ระบบ</h1>
          <form className="needs-validation input-section w-75" onSubmit={handleSubmit}>
            <div>
              <h5 className="form-label" style={labelStyle}>ชื่อผู้ใช้</h5>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
              />
            </div>
            <div>
              <h5 className="form-label" style={labelStyle}>รหัสผ่าน</h5>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            {error && <div className="alert alert-danger py-2" role="alert">{error}</div>}
            <button
              className="btn btn-primary"
              style={{ backgroundColor: "rgb(19, 27, 55)", border: "none", padding: "15px 50px" }}
              type="submit"
              disabled={submitting}
            >
              ยืนยัน
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
