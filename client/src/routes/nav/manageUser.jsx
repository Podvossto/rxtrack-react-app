import Topic from "../../components/Topic";
import MyTable from "../../components/myTable";
import { useState,memo } from "react";

const MemoizedMyTable = memo(MyTable);

const ManageUser = () => {
  const [activeBtn,setActiveBtn] = useState("staff")
  const columnsStaff = [
    {
      name: "userId",
      selector: (row) => row.user_id,
      field: "user_id",
      sortable: true,
      noEdit: true,
    },
    {
      name: "ชื่อผู้ใช้",
      selector: (row) => row.username,
      field: "username",
      sortable: true,
    },
    {
      name: "ชื่อจริง-นามสกุล",
      selector: (row) => row.name,
      field: "name",
      sortable: true,
    },
    {
      name: "isAdmin",
      selector: (row) => row.isAdmin,
      field: "isAdmin",
      sortable: true,
      choices: ["0","1"]
    },
    {
      name: "อีเมล",
      selector: (row) => row.email,
      field: "email",
      sortable: true,
    },
    {
      name: "เบอร์มือถือ",
      selector: (row) => row.tel,
      field: "tel",
      sortable: true,
    },
  ];
  const columnsPatient = [
    {
      name: "ID",
      selector: (row) => row.patient_id,
      field: "patient_id",
      sortable: true,
      noEdit: true,
    },
    {
      name: "ชื่อจริง-นามสกุล",
      selector: (row) => row.patient_name,
      field: "patient_name",
      sortable: true,
    },
  ];

  return (
    <div>
      <Topic
        topicTitle="จัดการผู้ใช้"
        description="รายชื่อผู้ใช้งานระบบ, กำหนดตำแหน่ง, ตั้งค่าข้อมูลผู้ใช้, เพิ่มผู้ใช้"
        path="/admin/addUser"
      />
      <div
        style={{ backgroundColor: "white", width: "94%", borderRadius: "5px" }}
        className="p-3 m-5 d-flex gap-3 align-items-center"
      >
        <span style={{ fontWeight: "bold" }}>แสดง :</span>
        <button
          style={
            activeBtn == "patient"
              ? {
                  backgroundColor: "gray",
                  color: "white",
                }
              : {
                  border: "1px solid rgb(19, 27, 55)",
                  backgroundColor: "rgb(19, 27, 55)",
                  color: "white",
                }
          }
          onClick={() => {
            setActiveBtn("staff");
          }}
        >
          พนักงาน
        </button>
        <button
          style={
            activeBtn == "staff"
              ? {
                  backgroundColor: "gray",
                  color: "white",
                }
              : {
                  border: "1px solid rgb(19, 27, 55)",
                  backgroundColor: "rgb(19, 27, 55)",
                  color: "white",
                }
          }
          onClick={() => {
            setActiveBtn("patient");
          }}
        >
          ผู้รับยา
        </button>
      </div>
      {activeBtn === "staff" ? (
        <MemoizedMyTable
          columns={columnsStaff}
          table={"user"}
          pk={"user_id"}
          key="staff" // Add a unique key prop to force re-render
        />
      ) : activeBtn === "patient" ? (
        <MemoizedMyTable
          columns={columnsPatient}
          table={"patient"}
          pk={"patient_id"}
          key="patient" // Add a unique key prop to force re-render
        />
      ) : null}
    </div>
  );
};

export default ManageUser;
