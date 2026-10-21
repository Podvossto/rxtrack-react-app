import Topic from "../../components/Topic";
import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../lib/api";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const AddUser = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [addUserSuccess, setAddUserSuccess] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setRname] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      // console.log("Not valid!");
      event.stopPropagation();
    } else {
      // console.log("valid");
      setShowConfirmModal(true);
    }
    setValidated(true);
  };

  const userData = {
    username: username,
    password: password,
    name: name,
    isAdmin: isAdmin,
    email: email,
    tel: tel,
  };

  const addNewUser = (userData) => {
    api
      .post("/user", userData)
      .then(() => {
        // console.log(response);
        setAddUserSuccess(true);
        setShowConfirmModal(false);
        setShowResultModal(true);
      })
      .catch(() => {
        // console.log(err);
        setShowConfirmModal(false);
        setShowResultModal(true);
      });
  };

  return (
    <div>
      <Topic
        topicTitle="เพิ่มผู้ใช้"
        description="เพิ่มผู้ใช้, กำหนดสิทธิ, ตั้งค่าข้อมูลผู้ใช้"
      />
      <form
        className="m-5 p-5 needs-validation"
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          border: "solid 1px #e8ebed",
        }}
        noValidate
      >
        <div className="row mb-3">
          <div className="form-group col-4">
            <label>ชื่อผู้ใช้</label>
            <input
              type="text"
              className={`form-control ${
                validated && !username && "is-invalid"
              }`}
              placeholder="กรอกชื่อผู้ใช้"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              required
            />
            <div className="invalid-feedback">กรุณากรอกชื่อผู้ใช้</div>
          </div>
          <div className="form-group col-4">
            <label>รหัสผ่าน</label>
            <input
              type="password"
              className={`form-control ${
                validated && !password && "is-invalid"
              }`}
              placeholder="กรอกรหัสผ่าน"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              required
            />
            <div className="invalid-feedback">กรุณากรอกรหัสผ่าน</div>
          </div>

          <div className="form-group col-4">
            <label>ชื่อจริง</label>
            <input
              type="text"
              className={`form-control ${validated && !name && "is-invalid"}`}
              placeholder="กรอกชื่อ-นามสกุล"
              onChange={(event) => {
                setRname(event.target.value);
              }}
              required
            />
            <div className="invalid-feedback">กรุณากรอกชื่อ-นามสกุล</div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="form-group col-4">
            <label>อีเมล</label>
            <input
              type="email"
              className={`form-control ${validated && !email && "is-invalid"}`}
              placeholder="email@email.com"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              required
            />
            <div className="invalid-feedback">กรุณากรอกอีเมล</div>
          </div>
          <div className="form-group col-4">
            <label>เบอร์มือถือ</label>
            <input
              type="text"
              className={`form-control ${validated && !tel && "is-invalid"}`}
              placeholder="xxx-xxx-xxxx"
              onChange={(event) => {
                setTel(event.target.value);
              }}
              required
            />
            <div className="invalid-feedback">กรุณากรอกเบอร์มือถือ</div>
          </div>
          <div className="form-group col-4">
            <label>ตำแหน่ง</label>
            <select
              className="form-control"
              onChange={(event) => setIsAdmin(event.target.value === "admin")}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
        {/* <div className="row">
          <label>รูป</label>
          <input type="file" />
        </div> */}
        <button
          type="submit"
          className="btn btn-primary mt-3"
          style={{ width: "120px", height: "50px" }}
        >
          ยืนยัน
        </button>
        <Link to={"/admin/manageUser"}>
          <button
            type="button"
            className="btn btn-secondary mt-3 mx-3"
            style={{ width: "120px", height: "50px" }}
          >
            ย้อนกลับ
          </button>
        </Link>
      </form>

      <Modal
        show={showConfirmModal}
        onHide={() => {
          setShowConfirmModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>ยืนยัน</Modal.Title>
        </Modal.Header>
        <Modal.Body>คุณต้องการเพิ่มผู้ใช้ใหม่ในระบบใช่หรือไม่</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowConfirmModal(false);
            }}
          >
            ไม่
          </Button>
          <Button variant="primary" onClick={() => addNewUser(userData)}>
            ใช่
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success/Error Modal */}
      <Modal
        show={showResultModal}
        onHide={() => {
          setShowResultModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{addUserSuccess ? "สำเร็จ" : "ไม่สำเร็จ"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {addUserSuccess ? "เพิ่มผู้ใช้สำเร็จ" : "เพิ่มผู้ใช้ไม่สำเร็จ"}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowResultModal(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddUser;
