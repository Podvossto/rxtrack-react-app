import { useState } from "react";
import Topic from "../../components/Topic";

const Setting = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  function editInfo() {
    setIsEditMode(true);
  }

  return (
    <div>
      <Topic topicTitle="ตั้งค่า" description="ตั้งค่าเงื่อนไขต่างๆ" />
      <form
        onSubmit={editInfo}
        className="m-5 p-5 "
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          border: "solid 1px #e8ebed",
        }}
      >
        <div className="row mb-3">
          {/* <div className="form-group col-3">
            <label>ชื่อองค์กร</label>
            <input
              type="text"
              className="form-control"
              placeholder="RxTrack"
              value={"RxTrack"}
              disabled={!isEditMode}
            />
          </div> */}
          <div className="form-group col-4">
            <label>ภาษา</label>
            <select className="form-control" disabled={!isEditMode}>
              <option value={1}>ไทย</option>
              <option value={2}>English</option>
            </select>
          </div>
          <div className="form-group col-4">
            <label>แสดงวันที่</label>
            <select className="form-control" disabled={!isEditMode}>
              <option value={true}>แสดง</option>
              <option value={false}>ไม่แสดง</option>
            </select>
          </div>
          <div className="form-group col-4">
            <label>รูปแบบวันที่</label>
            <select className="form-control" disabled={!isEditMode}>
              <option value={"mm/dd/yy"}>mm/dd/yy</option>
              <option value={"dd/mm/yy"}>dd/mm/yy</option>
            </select>
          </div>
        </div>

        {/* <div className="row mb-3">
          <div className="form-group col-12">
            <label>ที่อยู่</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="4"
              disabled={!isEditMode}
            ></textarea>
          </div>
        </div> */}

        <div className="row mb-3">
          <div className="form-group col-4">
            <label>แจ้งเตือนเมื่อยาเหลือน้อยกว่า</label>
            <input
              type="Number"
              className="form-control"
              placeholder="30"
              disabled={!isEditMode}
            />
          </div>
          <div className="form-group col-4">
            <label>แจ้งเตือนกี่วันก่อนหมดอายุ</label>
            <input
              type="Number"
              className="form-control"
              placeholder="60"
              disabled={!isEditMode}
            />
          </div>
          {/* <div className="form-group col-4">
            <label>ต้องมีการอนุมัติเมื่อเบิกจ่ายยาประเภทอันตราย</label>
            <select className="form-control" disabled={!isEditMode}>
              <option value={false}>ไม่ต้องอนุมัติ</option>
              <option value={true}>ต้องอนุมัติ</option>
            </select>
          </div> */}
        </div>
        {isEditMode && (
          <button
            type="button"
            className="btn btn-primary mt-3"
            style={{ width: "120px", height: "50px",marginRight:'15px' }}
            onClick={() => {setIsEditMode(false);}}
          >
            ยืนยัน
          </button>
        )}
        <button
          type="button"
          className="btn btn-secondary mt-3"
          style={{ width: "120px", height: "50px" }}
          onClick={() => setIsEditMode(!isEditMode)}
        >
          {isEditMode ? "ยกเลิก" : "แก้ไข"}
        </button>
      </form>
    </div>
  );
};

export default Setting;
