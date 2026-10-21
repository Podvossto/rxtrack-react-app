import Topic from "../../components/Topic";
import MyTable from "../../components/myTable";
const formatDateTime = (dateTimeString) => {
  const dateTime = new Date(dateTimeString);
  return dateTime.toLocaleString(); // This will include both date and time
};
const columns = [
  // { name: "อันดั", selector: (row) => row.no, sortable: true, width: "100px" },
  {
    name: "รหัสใบเบิก",
    selector: (row) => row.output_id,
    field: "output_id",
    sortable: true,
  },
  {
    name: "ชื่อผู้ใช้",
    selector: (row) => row.name,
    field: "name",
    sortable: true,
  },
  {
    name: "ผู้รับยา",
    selector: (row) => row.patient_name,
    field: "patient_name",
    sortable: true,
  },
  {
    name: "วันที่",
    selector: (row) => formatDateTime(row.date),
    field: "date",
    sortable: true,
  },
];

const OutputStock = () => {
  return (
    <div>
      <Topic
        topicTitle={"ประวัติการเบิกจ่ายยา"}
        description={"เบิกจ่ายยา, ประวัติการเบิกจ่ายยา"}
        path={"/admin/addOutput"}
      />
      <MyTable
        columns={columns}
        table={"outputstock"}
        pk={"output_id"}
        editDisable={true}
        deleteDisable={true}
        showDescription={"output"}
      />
    </div>
  );
};

export default OutputStock;
