/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import ".//DashboardComponent.css";
import React from "react";

export const PreviewBox = (props) => {
  const { bgColor, fontColor, displayText, classIcon,number } = props;
  return (
    <div
      className="PreviewBox"
      style={{
        backgroundColor: bgColor,
        color: fontColor,
        marginRight: "25px",
      }}
    >
      <div
        style={{
          width: "280px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "start",
          marginLeft: "30px",
          gap: "5px",
        }}
      >
        <h5 className="m-0" style={{ height: "25px", backgroundColor: "" }}>
          {displayText}
        </h5>
        <h4
          className="m-0"
          style={{ height: "25px", backgroundColor: "", fontWeight: "bold" }}
        >
          {number}
        </h4>
      </div>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ width: "100px" }}
      >
        <i className={classIcon} style={{ fontSize: "50px" }} />
      </div>
    </div>
  );
};

export const TableBox = () => {
  return (
    <>
      <div className="tableBox">
        <p className="h5 m-3" style={{ fontWeight: "bold" }}>
          เพิ่มล่าสุด
        </p>
        <div>
          <table className="table m-4" style={{
            width:'97%'
          }}>
            <thead>
              <tr className="column-header">
                <th scope="col">รายการที่</th>
                <th scope="col">รายการ</th>
                <th scope="col">Order ID</th>
                <th scope="col">วันที่รับยา</th>
                <th scope="col">ทำโดย</th>
              </tr>
            </thead>
            <tbody className="theTbody">
              <tr>
                <th scope="row">1</th>
                <td>รายการที่ 1</td>
                <td>661115001</td>
                <td>10/12/23</td>
                <td>เจ้าหน้าที่คลังยา</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>รายการที่ 2</td>
                <td>661115002</td>
                <td>10/12/23</td>
                <td>เจ้าหน้าที่คลังยา</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>รายการที่ 2</td>
                <td>661115002</td>
                <td>10/12/23</td>
                <td>เจ้าหน้าที่คลังยา</td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td>รายการที่ 2</td>
                <td>661115002</td>
                <td>10/12/23</td>
                <td>เจ้าหน้าที่คลังยา</td>
              </tr>
              {/* Add more table rows here */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

// export default PreviewBox;
