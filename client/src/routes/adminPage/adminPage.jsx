import Navbar from "../../components/adminPage/Navbar";
import "./adminPage.css";
import Header from "../../components/adminPage/Header";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../nav/dashboard";
import CheckStock from "../nav/checkStock";
import InputStock from "../nav/inputStock";
import CurrentStock from "../nav/currentStock";
import OutputStock from "../nav/outputStock";
import MedType from "../nav/medType";
import MedUnit from "../nav/medUnit";
import MedLocation from "../nav/medLocation";
import Reports from "../nav/report";
import ManageUser from "../nav/manageUser";
import Setting from "../nav/setting";
import AddStock from "../nav/addStock";
import AddUser from "../nav/addUser";
import InfoPage from "../nav/infoPage";
import AddMedType from "../nav/addMedType";
import AddMedUnit from "../nav/addMedUnit";
import AddMedLocation from "../nav/addMedLocation";
import Profile from "../nav/profile";
import AddOutput from "../nav/addOutput";

// * Layout
const AdminPage = () => {
  return (
    <>
      <div className="background">
        <Navbar></Navbar>
        <article>
          <Header></Header>
          <div className="content">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/checkStock" element={<CheckStock />} />
              <Route path="/inputStock" element={<InputStock />} />
              <Route path="/currentStock" element={<CurrentStock />} />
              <Route path="/outputStock" element={<OutputStock />} />
              <Route path="/medType" element={<MedType />} />
              <Route path="/medUnit" element={<MedUnit />} />
              <Route path="/medLocation" element={<MedLocation />} />
              <Route path="/report" element={<Reports />} />
              <Route path="/manageUser" element={<ManageUser />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="/addStock" element={<AddStock />} />
              <Route path="/addUser" element={<AddUser />} />
              <Route path="/infoPage" element={<InfoPage />} />
              <Route path="/addMedType" element={<AddMedType />} />
              <Route path="/addMedUnit" element={<AddMedUnit />} />
              <Route path="/addMedLocation" element={<AddMedLocation />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/addOutput" element={<AddOutput />} />
            </Routes>
          </div>
        </article>
      </div>
    </>
  );
};

export default AdminPage;
