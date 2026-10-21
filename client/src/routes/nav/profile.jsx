import Topic from "../../components/Topic";
import { useState } from "react";

const Profile = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  function editInfo() {
    setIsEditMode(true);
  }

  return (
    <div>
      <Topic topicTitle="โปรไฟล์ของฉัน" description="ข้อมูลส่วนตัว" />
      <div
        className="m-5 p-5"
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          border: "solid 1px #e8ebed",
        }}
      >
        <div style={{ position: "relative" }}>
          <div
            style={{
              backgroundColor: "#131b37",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              width: "100%",
              height: "110px",
            }}
          ></div>
          <div
            style={{
              border: "10px solid white",
              borderRadius: "100%",
              width: "150px",
              height: "150px",
              backgroundColor: "lightblue",
              position: "absolute",
              top: "40px",
              left: "20px",
            }}
          ></div>
          <div
            style={{
              width: "100%",
              height: "110px",
              // backgroundColor: "red",
            }}
          >
            <p
              style={{
                paddingLeft: "200px",
                paddingTop: "10px",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              พิชยะ หุตะจูฑะ
            </p>
            <p style={{ paddingLeft: "200px", color: "gray" }}>
              สามารถแก้ไขข้อมูล และเปลี่ยนรูปโปรไฟล์ได้
            </p>
          </div>

          <form onSubmit={editInfo}>
            <div className="row mb-3">
              <div className="form-group col-6">
                <label>ชื่อจริง</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="พิชยะ หุตะจูฑะ"
                  // value={"พิชยะ หุตะจูฑะ"}
                  disabled={!isEditMode}
                />
              </div>
              <div className="form-group col-6">
                <label>ตำแหน่ง</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="admin"
                  // value={"admin"}
                  disabled={true}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="form-group col-6">
                <label>อีเมล</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="myemail@example.com"
                  // value={"myemail@example.com"}
                  disabled={!isEditMode}
                />
              </div>
              <div className="form-group col-6">
                <label>เบอร์โทร</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="000-000-0000"
                  // value={"000-000-0000"}
                  disabled={!isEditMode}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="form-group col-6">
                <label>ชื่อผู้ใช้</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="admin"
                  disabled={!isEditMode}
                />
              </div>
              <div className="form-group col-6">
                <label>รหัสผ่าน</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="1234"
                  disabled={!isEditMode}
                />
              </div>
            </div>
            {isEditMode && (
              <button
                type="button"
                className="btn btn-primary mt-3"
                style={{ width: "120px", height: "50px", marginRight: "15px" }}
                onClick={() => setIsEditMode(!isEditMode)}
              >
                อัพเดท
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
      </div>
    </div>
  );
};

export default Profile;
