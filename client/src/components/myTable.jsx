/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import api from "../lib/api";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const DataTable = (props) => {
  const { columns, table, pk, editDisable, deleteDisable, showDescription } = props;
  // console.log("deleteDisable : ", deleteDisable);
  editDisable ? true : false;
  deleteDisable ? true : false;
  showDescription ? true : false;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState("");
  const [sortColumnDir, setSortColumnDir] = useState("");
  const [search, setSearch] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editRow, setEditRow] = useState(null);

  const fetchData = async () => {
    setLoading(true);

    let url = `/${table}?page=${currentPage}&per_page=${rowsPerPage}`;

    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }
    if (sortColumn) {
      url += `&sort_column=${sortColumn}&sort_direction=${sortColumnDir}`;
    }

    try {
      const response = await api.get(url);
      setData(response.data.data);
      setTotalRows(response.data.total);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    if (page === currentPage || totalRows <= rowsPerPage) {
      return;
    }
    setCurrentPage(page);
  };

  const handlePerRowsChange = (newPerPage) => {
    setRowsPerPage(newPerPage);
    setCurrentPage(1);
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortColumnDir(sortColumnDir === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortColumnDir("asc");
    }
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  const handleEdit = (row, event) => {
    event.stopPropagation(); // Prevent event propagation
    setEditRow(row);
    setShowEditModal(true);
  };

  const handleDelete = (row, event) => {
    event.stopPropagation(); // Prevent event propagation
    setEditRow(row);
    setShowDeleteModal(true);
  };

  const handleViewRow = (row) => {
    setShowEditModal(false); // Close the edit modal if open
    setShowDeleteModal(false); // Close the delete modal if open
    setEditRow(row);
    setShowViewModal(true);
  };

  const handleCloseModal = () => {
    setEditRow(null);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setShowViewModal(false);
  };

  const handleSaveChanges = () => {
    const updatedData = {};
    columns.forEach((column) => {
      const inputElement = document.getElementById(`${column.name}-input`);
      if (inputElement && column.field) {
        updatedData[column.field] = inputElement.value;
      }
    });
    updateData(editRow[pk], updatedData);
    setShowEditModal(false);
  };

  const handleDeleteConfirm = () => {
    deleteData(editRow[pk]);
    setShowDeleteModal(false);
  };

  const updateData = (pk, updatedData) => {
    api
      .put(`/${table}/${pk}`, updatedData)
      .then(() => {
        setData(
          data.map((row) => {
            if (row[pk] === pk) {
              return { ...row, ...updatedData };
            } else {
              return row;
            }
          })
        );
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  const deleteData = (pk) => {
    api
      .delete(`/${table}/${pk}`)
      .then(() => {
        setData(data.filter((row) => row[pk] !== pk));
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  const renderInputFields = () => {
    if (!editRow || showViewModal) return null;

    return columns.map((column) => (
      <div className="form-group" key={column.name}>
        <label htmlFor={`${column.name}-input`} className="col-form-label">
          {column.name}:
        </label>
        {column.choices ? (
          <select
            className="form-control"
            id={`${column.name}-input`}
            defaultValue={
              column.inputSelector
                ? column.inputSelector(editRow)
                : column.selector(editRow)
            }
            required={column.required}
            disabled={editDisable || column.noEdit}
          >
            {column.choices.map((choice, index) => (
              <option key={index} value={choice}>
                {choice}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={column.type || "text"}
            className="form-control"
            id={`${column.name}-input`}
            defaultValue={
              column.inputSelector
                ? column.inputSelector(editRow)
                : column.selector(editRow)
            }
            required={column.required}
            disabled={editDisable || column.noEdit}
          />
        )}
      </div>
    ));
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, rowsPerPage, sortColumn, sortColumnDir, search]);

  return (
    <div
      className="m-5 p-3"
      style={{
        backgroundColor: "white",
        borderRadius: "15px",
        border: "1px solid #e8ebed",
      }}
    >
      <form style={{ position: "relative", margin: "20px 0px 5px 5px" }}>
        <input
          type="text"
          name="Search"
          onChange={handleSearchChange}
          placeholder="Search Name"
          style={{
            color: "black",
            backgroundColor: "white",
            borderRadius: "5px",
            border: "solid 1px rgb(220, 224, 228)",
            width: "200px",
            height: "40px",
            fontSize: "15px",
            paddingLeft: "35px",
          }}
        />
        <i
          className="bi bi-search"
          style={{
            color: "#303030",
            fontSize: "18px",
            position: "absolute",
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none",
          }}
        />
      </form>
      <table className="table">
        <thead className="thead-light">
          <tr>
            {columns.map((column) => (
              <th key={column.name} onClick={() => column.field && handleSort(column.field)}>
                {column.name}
                {sortColumn === column.field && (
                  <i
                    className={`bi bi-caret-${
                      sortColumnDir === "asc" ? "up" : "down"
                    }-fill`}
                  />
                )}
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              style={{
                verticalAlign: "middle",
                cursor: "pointer",
              }}
              className={editDisable ? "increase-row-height" : ""}
              onClick={() => handleViewRow(row)}
            >
              {columns.map((column) => (
                <td
                  key={column.name}
                  style={{ width: `${90 / columns.length}%` }}
                >
                  {column.selector(row)}
                </td>
              ))}
              <td style={{ width: "35%" }}>
                <button
                  className={`btn ${
                    editDisable ? "btn-secondary" : "btn-warning"
                  }`}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleEdit(row, event);
                  }}
                  disabled={editDisable}
                >
                  <i className="bi bi-pencil-square"></i>
                </button>
                &nbsp; &nbsp;
                <button
                  className={`btn ${
                    deleteDisable ? "btn-secondary" : "btn-danger"
                  }`}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleDelete(row, event);
                  }}
                  disabled={deleteDisable}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between mt-3">
        <div className="me-3">
          จำนวนที่แสดงต่อหน้า:
          <select
            value={rowsPerPage}
            onChange={(e) => handlePerRowsChange(e.target.value)}
            className="form-select form-select-sm d-inline-block w-auto ms-2"
          >
            <option value={1}>1</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={25}>25</option>
            <option value={30}>30</option>
            <option value={35}>35</option>
            <option value={40}>40</option>
            <option value={45}>45</option>
            <option value={50}>50</option>
          </select>
        </div>
        <nav>
          <ul className="pagination">
            <div className="me-3 d-flex align-items-center">
              จำนวนข้อมูล: {totalRows} Rows
            </div>
            <li
              className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              onClick={() => handlePageChange(1)}
              style={{ cursor: "pointer" }}
            >
              <a className="page-link">First</a>
            </li>
            <li
              className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              onClick={() => handlePageChange(currentPage - 1)}
              style={{ cursor: "pointer" }}
            >
              <a className="page-link">Previous</a>
            </li>
            <li className="page-item active">
              <a className="page-link">{currentPage}</a>
            </li>
            <li
              className={`page-item ${
                currentPage === Math.ceil(totalRows / rowsPerPage)
                  ? "disabled"
                  : ""
              }`}
              onClick={() => handlePageChange(currentPage + 1)}
              style={{ cursor: "pointer" }}
            >
              <a className="page-link">Next</a>
            </li>
            <li
              className={`page-item ${
                currentPage === Math.ceil(totalRows / rowsPerPage)
                  ? "disabled"
                  : ""
              }`}
              onClick={() =>
                handlePageChange(Math.ceil(totalRows / rowsPerPage))
              }
              style={{ cursor: "pointer" }}
            >
              <a className="page-link">Last</a>
            </li>
          </ul>
        </nav>
      </div>

      <Modal show={showEditModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>แก้ไขข้อมูล</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>{renderInputFields()}</form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            ปิด
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            บันทึก
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>ยืนยัน</Modal.Title>
        </Modal.Header>
        <Modal.Body>ต้องการที่จะลบรายการนี้ใช่หรือไม่</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            ไม่
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            ใช่
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        centered
        size={showDescription ? "xl" : ""}
      >
        <Modal.Header closeButton>
          <Modal.Title>รายละเอียด</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showDescription == "input" ? (
            <table className="table">
              <thead>
                <tr>
                  <th>รหัสยา</th>
                  <th>ชื่อ</th>
                  <th>จำนวน</th>
                  <th>หน่วย</th>
                  <th>ประเภท</th>
                  <th>ตำแหน่ง</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Paracetamol</td>
                  <td>100</td>
                  <td>กระปุก</td>
                  <td>ยาแก้ปวด</td>
                  <td>A</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Chlorpheniramine</td>
                  <td>100</td>
                  <td>กระปุก</td>
                  <td>ยาแก้ภูมิแพ้</td>
                  <td>A</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Mebendazole</td>
                  <td>100</td>
                  <td>กระปุก</td>
                  <td>ยาถ่ายพยาธิ</td>
                  <td>B</td>
                </tr>
              </tbody>
            </table>
          ) : showDescription == "output" ? (
            <table className="table">
              <thead>
                <tr>
                  <th>รหัสยา</th>
                  <th>ชื่อ</th>
                  <th>จำนวน</th>
                  <th>หน่วย</th>
                  <th>ประเภท</th>
                  <th>ตำแหน่ง</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Paracetamol</td>
                  <td>2</td>
                  <td>กระปุก</td>
                  <td>ยาแก้ปวด</td>
                  <td>A</td>
                </tr>
              </tbody>
            </table>
          ) : (
            editRow && (
              <div>
                {columns.map((column) => (
                  <div key={column.name}>
                    <strong>{column.name}:</strong> {column.selector(editRow)}
                  </div>
                ))}
              </div>
            )
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>
            ปิด
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DataTable;
