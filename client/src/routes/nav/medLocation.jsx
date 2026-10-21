 
import Topic from "../../components/Topic";
import MyTable from "../../components/myTable";

const columns = [
  // {
  //   name: "no",
  //   selector: (row) => row.no,
  //   sortable: true,
  //   noEdit: true,
  // },
  {
    name: "ที่จัดเก็บ",
    selector: (row) => row.location_name,
    field: "location_name",
    sortable: true,
  },
  {
    name: "ชั้นวาง",
    selector: (row) => row.rack,
    field: "rack",
    sortable: true,
  },
  {
    name: "ห้อง",
    selector: (row) => row.room,
    field: "room",
    sortable: true,
  },
  {
    name: "จำนวนยา(ปัจจุบัน)",
    selector: (row) => row.quantity,
    field: "quantity",
    sortable: true,
    noEdit: true,
  },
];

const MedLocation = () => {
  return (
    <div>
      <Topic
        topicTitle={"ที่จัดเก็บ"}
        description={"ที่จัดเก็บของยา"}
        path={"/admin/addMedLocation"}
      ></Topic>
      <MyTable columns={columns} table={"medlocation"} pk={"location_id"} />
    </div>
  );
};

export default MedLocation;
