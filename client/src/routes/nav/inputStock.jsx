import Topic from "../../components/Topic";
import MyTable from "../../components/myTable";
const formatDateTime = (dateTimeString) => {
  const dateTime = new Date(dateTimeString);
  return dateTime.toLocaleString(); // This will include both date and time
};
const InputStock = () => {
  const columns = [
    {
      name: "รหัสใบรับยา",
      selector: (row) => row.input_id,
      field: "input_id",
      sortable: true,
    },
    {
      name: "ผู้รับยา",
      selector: (row) => row.name,
      field: "name",
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => formatDateTime(row.date),
      field: "date",
      sortable: true,
    },
  ];

  // console.log("InputStock columns:", columns);

  return (
    <div>
      <Topic
        topicTitle={"ประวัติรับยาเข้าคลัง"}
        description={"รับยาเข้าคลัง, ประวัติการรับยา"}
        path={"/admin/addStock"}
      />
      <MyTable
        columns={columns}
        table={"inputstock"}
        pk={"input_id"}
        editDisable={true}
        deleteDisable={true}
        showDescription={"input"}
      />
    </div>
  );
};

export default InputStock;
