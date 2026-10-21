import Topic from "../../components/Topic";
import MyTable from "../../components/myTable";

const MedUnit = () => {
  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString(); // This will include both date and time
  };
  const columns = [
    {
      name: "รหัสหน่วย",
      selector: (row) => row.unit_id,
      field: "unit_id",
      sortable: true,
      noEdit: true
    },
    {
      name: "ชื่อ",
      selector: (row) => row.medUnit,
      field: "medUnit",
      sortable: true,
    },
    {
      name: "วันที่",
      selector: (row) => formatDateTime(row.Date),
      field: "Date",
      sortable: true,
      noEdit: true
    },
  ];
  return (
    <div>
      <Topic
        topicTitle="หน่วยเก็บ"
        description="สร้างหน่วยเก็บของยา"
        path="/admin/addMedUnit"
      />
      <MyTable columns={columns} table={"medUnit"} />
    </div>
  );
};

export default MedUnit;
