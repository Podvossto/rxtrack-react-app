import { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logoWhite from "../../assets/images/RxTrack-logo-white.png";

const Navbar = () => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [activeSubject, setActiveSubject] = useState("overview");
  const [activeSubmenuList, setActiveSubmenuList] = useState(null);

  const toggleSubmenu = (submenu) => {
    if (activeSubmenu === submenu) {
      return;
    }
    setActiveSubmenu(submenu);
    setActiveSubject(null);
  };

  const toggleSubject = (subject) => {
    if (activeSubject === subject) {
      return;
    }
    setActiveSubject(subject);
    setActiveSubmenu(null);
    setActiveSubmenuList(null);
  };

  const toggleSubmenuList = (submenuList) => {
    if (activeSubmenuList === submenuList) {
      return;
    }
    setActiveSubmenuList(submenuList);
  };

  return (
    <div className="myNav">
      <div className="logo">
        <img src={logoWhite} alt="RxTrack" />
      </div>
      <div className="menu">
        <ul>
          <span className="dropdown-header">แดชบอร์ด</span>

          <Link to={"/admin/dashboard"}>
            <li
              className={`subject ${
                activeSubject === "overview" ? "active" : ""
              }`}
              onClick={() => toggleSubject("overview")}
            >
              <i className="bi bi-bar-chart-fill" />
              <span> ภาพรวม</span>
            </li>
          </Link>

          <span className="dropdown-header">จัดการคลัง</span>

          {/* <Link to={"/admin/checkStock"}>
            <li
              className={`subject ${
                activeSubject === "checkQuantity" ? "active" : ""
              }`}
              onClick={() => toggleSubject("checkQuantity")}
            >
              <i className="bi bi-upc-scan" />
              <span>แสกน</span>
            </li>
          </Link> */}

          <li
            style={{
              width: "200px",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              justifyContent: "start",
              padding: "5px 10px 5px 10px",
            }}
          >
            <div
              className={`submenu-header1 ${
                activeSubmenu === "submenu1" ? "active" : ""
              }`}
              onClick={() => toggleSubmenu("submenu1")}
            >
              <i className="bi bi-archive-fill" />
              <span style={{ width: "120px" }}> คลัง</span>
              <i
                className={`bi bi-chevron-right ${
                  activeSubmenu === "submenu1" ? "rotate" : ""
                }`}
                style={{ transition: "all ease 0.2s" }}
              />
            </div>
            <ul
              className={`submenu1 ${
                activeSubmenu === "submenu1" ? "active" : ""
              }`}
            >
              <Link to={"/admin/inputStock"}>
                <li
                  className={`submenu-list ${
                    activeSubmenuList === "receiveStock" ? "active" : ""
                  }`}
                  onClick={() => toggleSubmenuList("receiveStock")}
                >
                  รับเข้าคลัง
                </li>
              </Link>

              <Link to={"/admin/currentStock"}>
                <li
                  className={`submenu-list ${
                    activeSubmenuList === "stockBalance" ? "active" : ""
                  }`}
                  onClick={() => toggleSubmenuList("stockBalance")}
                >
                  คงคลัง
                </li>
              </Link>

              <Link to={"/admin/outputStock"}>
                <li
                  className={`submenu-list ${
                    activeSubmenuList === "requestStock" ? "active" : ""
                  }`}
                  onClick={() => toggleSubmenuList("requestStock")}
                >
                  ขอเบิก
                </li>
              </Link>
            </ul>
          </li>

          <li
            style={{
              width: "200px",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              justifyContent: "start",
              padding: "5px 10px 5px 10px",
            }}
          >
            <div
              className={`submenu-header2 ${
                activeSubmenu === "submenu2" ? "active" : ""
              }`}
              onClick={() => toggleSubmenu("submenu2")}
            >
              <i className="bi bi-inboxes-fill" />
              <span style={{ width: "120px" }}> ตั้งค่าคลัง</span>
              <i
                className={`bi bi-chevron-right ${
                  activeSubmenu === "submenu2" ? "rotate" : ""
                }`}
                style={{ transition: "all ease 0.2s" }}
              />
            </div>
            <ul
              className={`submenu2 ${
                activeSubmenu === "submenu2" ? "active" : ""
              }`}
            >
              <Link to={"/admin/medType"}>
                <li
                  className={`submenu-list ${
                    activeSubmenuList === "medType" ? "active" : ""
                  }`}
                  onClick={() => toggleSubmenuList("medType")}
                >
                  หมวดหมู่
                </li>
              </Link>

              <Link to={"/admin/medUnit"}>
                <li
                  className={`submenu-list ${
                    activeSubmenuList === "medUnit" ? "active" : ""
                  }`}
                  onClick={() => toggleSubmenuList("medUnit")}
                >
                  หน่วยเก็บ
                </li>
              </Link>

              <Link to={"/admin/medLocation"}>
                <li
                  className={`submenu-list ${
                    activeSubmenuList === "medStock" ? "active" : ""
                  }`}
                  onClick={() => toggleSubmenuList("medStock")}
                >
                  ที่จัดเก็บ
                </li>
              </Link>
            </ul>
          </li>

          {/* <span className="dropdown-header">รายงาน</span> */}

          {/* <Link to={"/admin/report"}>
            <li
              className={`subject ${
                activeSubject === "reports" ? "active" : ""
              }`}
              onClick={() => toggleSubject("reports")}
            >
              <i className="bi bi-file-earmark-bar-graph-fill" />
              <span> รายงาน</span>
            </li>
          </Link> */}

          <span className="dropdown-header">อื่นๆ</span>

          <Link to={"/admin/manageUser"}>
            <li
              className={`subject ${activeSubject === "users" ? "active" : ""}`}
              onClick={() => toggleSubject("users")}
            >
              <i className="bi bi-people-fill" />
              <span> รายชื่อ</span>
            </li>
          </Link>

          <Link to={"/admin/setting"}>
            <li
              className={`subject ${
                activeSubject === "settings" ? "active" : ""
              }`}
              onClick={() => toggleSubject("settings")}
            >
              <i className="bi bi-gear-fill" />
              <span> ตั้งค่า</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
