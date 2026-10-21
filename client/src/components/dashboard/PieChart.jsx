/* eslint-disable no-unused-vars */
import * as React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

const data = [
  { value: 67, label: "ใกล้หมดอายุ", color: "#ff9900" }, // 5% "ใกล้หมดอายุ"
  { value: 22, label: "ใกล้หมด", color: "#dc3912" }, // 10% "ใกล้หมด"
  { value: 283, label: "ปกติ", color: "#3366cc" }, // 85% "ปกติ"
];

const size = {
  width: 500,
  height: 300,
};

export default function PieArcLabel() {
  return (
    <PieChart
      series={[
        {
          // arcLabel: (item) => `${item.label} (${item.value})`,
          arcLabelMinAngle: 45,
          data,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: "white",
          fontWeight: "bold",
        },
      }}
      {...size}
    />
  );
}
