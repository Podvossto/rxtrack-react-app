/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useState } from "react";
import api from "../../lib/api";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Topic from "../../components/Topic";

const AddMedLocation = () => {
  const [medLocation, setMedLocation] = useState("");
  const [medLocationRoom, setMedLocationRoom] = useState("");
  const [medLocationRack, setMedLocationRack] = useState("");
  const [medLocationDetail, setMedLocationDetail] = useState("");

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);

  const addNewMedLocation = (medData) => {
    api
      .post("/medlocation", medData)
      .then((response) => {
        // console.log(response);
        setAddSuccess(true);
        setShowConfirmModal(false);
        setShowResultModal(true);
      })
      .catch((err) => {
        // console.log(err);
        setShowConfirmModal(false);
        setShowResultModal(true);
      });
  };

  const medData = {
    location_name: medLocation,
    rack: medLocationRack,
    room: medLocationRoom,
  };

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
  };

  return (
    <div>
      <Topic
        topicTitle="เพิ่มที่จัดเก็บ"
        description="เพิ่มที่อยู่ที่จัดเก็บของยา"
      />
      <form
        onSubmit={handleSubmit}
        className="m-5 p-5 "
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          border: "solid 1px #e8ebed",
        }}
      >
        <div className="row mb-3">
          <div className="form-group col-4">
            <label>ชื่อที่จัดเก็บ</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setMedLocation(e.target.value)}
            />
          </div>
          <div className="form-group col-4">
            <label>ชั้น</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setMedLocationRack(e.target.value)}
            />
          </div>
          <div className="form-group col-4">
            <label>ห้อง</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setMedLocationRoom(e.target.value)}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="form-group col-12">
            <label>คำอธิบาย</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="4"
              value={medLocationDetail}
              onChange={(e) => setMedLocationDetail(e.target.value)}
            ></textarea>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-3"
          style={{ width: "120px", height: "50px" }}
        >
          ยืนยัน
        </button>
        <Link to={"/admin/medlocation"}>
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
        <Modal.Body>คุณต้องการเพิ่มรายการในระบบใช่หรือไม่</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowConfirmModal(false);
            }}
          >
            ไม่
          </Button>
          <Button variant="primary" onClick={() => addNewMedLocation(medData)}>
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
          <Modal.Title>{addSuccess ? "สำเร็จ" : "ไม่สำเร็จ"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{addSuccess ? "เพิ่มสำเร็จ" : "เพิ่มไม่สำเร็จ"}</Modal.Body>
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

export default AddMedLocation;
