 
// import MyTable from "../../components/myTable";

 
import BarAnimation from "../../components/dashboard/BarChart";
import { PreviewBox } from "../../components/dashboard/DashboardComponent";
import PieArcLabel from "../../components/dashboard/PieChart";

const Dashboard = () => {
  return (
    // <h1>Dashboard</h1>
    <>
      <div className="d-flex m-5">
        <PreviewBox
          bgColor={"rgb(19, 27, 55)"}
          fontColor={"#fff"}
          displayText={"จำนวนยาในสต๊อก (ปัจจุบัน)"}
          classIcon={"bi bi-archive"}
          number={300}
        />
        <PreviewBox
          bgColor={"#fff"}
          fontColor={"rgb(19, 27, 55)"}
          displayText={"เบิกจ่ายในเดือนนี้"}
          classIcon={"bi bi-box-arrow-right"}
          number={4}
        />
        <PreviewBox
          bgColor={"#fff"}
          fontColor={"rgb(19, 27, 55)"}
          displayText={"ใกล้หมดอายุ"}
          classIcon={"bi bi-clock"}
          number={35}
        />
        <PreviewBox
          bgColor={"#fff"}
          fontColor={"rgb(19, 27, 55)"}
          displayText={"ใกล้หมด"}
          classIcon={"bi bi-exclamation-triangle"}
          number={22}
        />
      </div>
      <div className="row">
        <div
          className="p-5 "
          style={{
            width: "1000px",
            backgroundColor: "white",
            borderRadius: "10px",
            border: "solid 1px #e8ebed",
            margin: "0rem 1rem 3rem 3rem",
          }}
        >
          <h5 style={{ fontWeight: "bold" }}>รับเข้าคลัง & เบิกจ่าย</h5>
          <BarAnimation></BarAnimation>
        </div>
        <div
          className="p-5 "
          style={{
            width: "500px",
            backgroundColor: "white",
            borderRadius: "10px",
            border: "solid 1px #e8ebed",
            margin: "0rem 3rem 3rem 1rem",
          }}
        >
          <h5 style={{ fontWeight: "bold" }}>สถานะยาในคลัง</h5>

          <div style={{ marginLeft: "-40px" }}>
            <PieArcLabel></PieArcLabel>
          </div>
        </div>
      </div>
      {/* <TableBox/> */}
    </>
  );
};

export default Dashboard;
