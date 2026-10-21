/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useState, useEffect } from "react"; // Import useEffect
import api from "../../lib/api";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Topic from "../../components/Topic";

const AddStock = () => {
  const [medName, setMedName] = useState("");
  const [medType, setMedType] = useState("");
  const [medLocation, setMedLocation] = useState("");
  const [medAmt, setMedAmt] = useState("");
  const [medUnit, setMedUnit] = useState("");
  const [medDetail, setMedDetail] = useState("");

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [disableSelect, setDisableSelect] = useState(true);
  const [showResultModal, setShowResultModal] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);
  const [medicineList, setMedicineList] = useState([]); // State to store medicine list
  const [tableData, setTableData] = useState([]); // State to store table data
  const [isEditMode, setIsEditMode] = useState(false);
  const [isNameInputField, setIsNameInputField] = useState(false);

  useEffect(() => {
    api
      .get("/medicine")
      .then((response) => {
        // console.log("Response from API:", response.data);
        setMedicineList(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching medicine data:", error);
      });
  }, []);

  useEffect(() => {
    // console.log("MedicineList:", medicineList); // Moved the console.log here
    // console.log("medType:", medType);
    // console.log("medName:", medName);
    // console.log("medLocation:", medLocation);
    // console.log("medAmt:", medAmt);
    // console.log("medUnit:", medUnit);
    // console.log("tableData", tableData);
  }, [medicineList, medType, medName, medLocation, medAmt, medUnit, tableData]);

  // const addNewMed = (medData) => {
  //   axios
  //     .post("http://localhost:5000/api/medicine", medData)
  //     .then((response) => {
  //       console.log(response);
  //       setAddSuccess(true);
  //       setShowConfirmModal(false);
  //       setShowResultModal(true);
  //       // Add the new data to the table
  //       setTableData([...tableData, medData]);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setShowConfirmModal(false);
  //       setShowResultModal(true);
  //     });
  // };

  const handleRemoveRow = (index) => {
    const updatedTableData = [...tableData];
    updatedTableData.splice(index, 1);
    setTableData(updatedTableData);
  };

  const handleEdit = () => {
    setIsEditMode(!isEditMode);
    setDisableSelect(!disableSelect);
    setIsNameInputField(!isNameInputField);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      // console.log("Not valid!");
      event.stopPropagation();
    } else {
      // console.log("valid");

      const medData = {
        name: medName, // Directly assign the medName value
        amount: medAmt,
        unit: medUnit,
        type: medType,
        location: medLocation,
      };

      // console.log("medData!!!", medData);
      setTableData([...tableData, medData]);
    }
  };

  // Function to handle selection of medName
  const handleMedNameChange = (value) => {
    setMedName(value);

    if (value !== "") {
      const selectedMedicine = medicineList.find(
        (medicine) => medicine.med_id === parseInt(value)
      );

      if (selectedMedicine) {
        setMedType(selectedMedicine.medType);
        setMedLocation(selectedMedicine.location_name);
        setMedUnit(selectedMedicine.medUnit);
        setMedDetail(selectedMedicine.detail);
        setMedAmt(selectedMedicine.amount || "");
        // setDisableSelect(false); // Enabled select dropdowns when a medicine is selected
      } else {
        setMedType("");
        setMedLocation("");
        setMedUnit("");
        setMedDetail("");
        setMedAmt("");
        setDisableSelect(true); // Disable select dropdowns when no medicine is selected
      }
    } else {
      setMedType("");
      setMedLocation("");
      setMedUnit("");
      setMedDetail("");
      setMedAmt("");
      setDisableSelect(true); // Disable select dropdowns when no medicine is selected
    }
  };

  // Construct medData object before calling addNewMed
  const medData = {
    name: medName,
    type: medType,
    location: medLocation,
    amount: medAmt,
    unit: medUnit,
    detail: medDetail,
  };

  return (
    <div>
      <Topic
        topicTitle="รับยาเข้าคลัง"
        description="เพิ่มยาเข้าสต๊อก, ตั้งค่าหมวดหมู่, ประเภท, กำหนดที่จัดเก็บ"
      />
      <form
        className="m-5 p-5 "
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          border: "solid 1px #e8ebed",
        }}
        onSubmit={handleSubmit}
      >
        <div className="row mb-3">
          <div className="form-group col-4">
            <label>ยา</label>
            {isNameInputField ? (
              <input
                type="text"
                className="form-control"
                value={medName}
                onChange={(e) => setMedName(e.target.value)}
              />
            ) : (
              <select
                className="form-control"
                value={medName}
                onChange={(e) => handleMedNameChange(e.target.value)}
              >
                <option value="">เลือกยา</option>
                {medicineList.length > 0 ? (
                  medicineList.map((medicine) => (
                    <option key={medicine.med_id} value={medicine.med_id}>
                      {medicine.name}
                    </option>
                  ))
                ) : (
                  <option value="">Loading...</option>
                )}
              </select>
            )}
          </div>
          <div className="form-group col-4">
            <label>หมวดหมู่</label>
            <select
              className="form-control"
              value={medType}
              disabled={!isEditMode && disableSelect}
              onChange={(e) => setMedType(e.target.value)}
            >
              <option value="">เลือกประเภท</option>
              {/* Display all options from medicineList */}
              {medicineList.map((medicine) => (
                <option key={medicine.med_id} value={medicine.medType}>
                  {medicine.medType}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group col-4">
            <label>ที่จัดเก็บ</label>
            <select
              className="form-control"
              value={medLocation}
              // disabled={!isEditMode && disableSelect}
              onChange={(e) => setMedLocation(e.target.value)}
            >
              <option value="">เลือกที่จัดเก็บ</option>
              {/* {isEditMode ? (
                <> */}
                  <option value={"A"}>A</option>
                  <option value={"B"}>B</option>
                {/* </>
              ) : (
                medicineList.map((medicine) => (
                  <option key={medicine.med_id} value={medicine.location_id}>
                    {medicine.location_id}
                  </option>
                ))
              )} */}
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="form-group col-4">
            <label>จำนวน</label>
            <input
              type="number"
              className="form-control"
              placeholder="0"
              value={medAmt}
              onChange={(e) => setMedAmt(e.target.value)}
            />
          </div>
          <div className="form-group col-4">
            <label>หน่วย</label>
            <select
              className="form-control"
              value={medUnit}
              disabled={!isEditMode && disableSelect}
              onChange={(e) => setMedUnit(e.target.value)}
            >
              <option value="">เลือกหน่วย</option>
              {isEditMode ? (
                <>
                  <option value="กระปุก">กระปุก</option>
                  <option value="ขวด">ขวด</option>
                  <option value="แผง">แผง</option>
                </>
              ) : (
                medicineList.map((medicine) => (
                  <option key={medicine.med_id} value={medicine.medUnit}>
                    {medicine.medUnit}
                  </option>
                ))
              )}
            </select>
          </div>
          <div className="form-group col-2">
            <label>แก้ไข</label>
            <a
              className="form-control btn btn-secondary"
              onClick={() => handleEdit()}
            >
              แก้ไข
            </a>
          </div>
          <div className="form-group col-2">
            <label>เพิ่ม</label>
            <button
              type="button"
              className="form-control btn btn-success"
              onClick={() => {
                // console.log("medData!!!", medData);
                // Add the form data to the table when clicked
                setTableData([...tableData, medData]);
              }}
            >
              เพิ่ม
            </button>
          </div>
        </div>
        <div className="row mb-3">
          <div className="form-group col-12">
            <label>รายละเอียด</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="4"
              value={disableSelect && medName ? "............" : ""}
              disabled={disableSelect}
              onChange={(e) => setMedDetail(e.target.value)}
            />
          </div>
        </div>
      </form>
      <form
        onSubmit={() => {
          setShowConfirmModal(true)

        }}
        className="m-5 p-5 "
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          border: "solid 1px #e8ebed",
        }}
      >
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ชื่อยา</th>
              <th scope="col">จำนวน</th>
              <th scope="col">หน่วย</th>
              <th scope="col">ประเภท</th>
              <th scope="col">ตำแหน่ง</th>
              <th scope="col">ลบ</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  {item.name == 1
                    ? "Paracetamol"
                    : item.name == 2
                    ? "Chlorpheniramin"
                    : item.name == 3
                    ? "Mebendazole"
                    : medName}
                </td>

                <td>{item.amount}</td>
                <td>{item.unit}</td>
                <td>{item.type}</td>
                <td>{item.location}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemoveRow(index)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* {console.log("tableData.length", tableData.length)} */}
        <button
          type="submit"
          className="btn btn-primary mt-3"
          style={{ width: "120px", height: "50px" }}
          disabled={tableData.length == 0}
        >
          ยืนยัน
        </button>
        <Link to={"/admin/inputStock"}>
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
        <Modal.Body>คุณต้องการเพิ่มยาในระบบใช่หรือไม่</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowConfirmModal(false);
            }}
          >
            ไม่
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setShowConfirmModal(false);
              setShowResultModal(true);
            }}
          >
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
          <Modal.Title>ผลลัพธ์</Modal.Title>
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

export default AddStock;
