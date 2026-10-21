/* eslint-disable no-unused-vars */
import * as React from "react";
import Box from "@mui/material/Box";
import { BarChart } from "@mui/x-charts/BarChart";
// Thai month names
// const thaiMonthNames = [
//   "มกราคม",
//   "กุมภาพันธ์",
//   "มีนาคม",
//   "เมษายน",
//   "พฤษภาคม",
//   "มิถุนายน",
//   "กรกฎาคม",
//   "สิงหาคม",
//   "กันยายน",
//   "ตุลาคม",
//   "พฤศจิกายน",
//   "ธันวาคม",
// ];

export default function BarAnimation() {
  const [seriesNb, setSeriesNb] = React.useState(2);
  const [itemNb, setItemNb] = React.useState(12);

  // Create an array of Thai month names for the x-axis tick values
  // const thaiMonthLabels = Array.from(
  //   { length: itemNb },
  //   (_, i) => thaiMonthNames[i]
  // );

  return (
    <Box sx={{ width: "100%" }}>
      <BarChart
        height={300}
        series={series.slice(0, seriesNb).map((s, index) => ({
          ...s,
          data: s.data.slice(0, itemNb),
          color: index === 0 ? "#131b37" : "#8fceff",
        }))}
        xAxis={[
          {
            scaleType: "band",
            data: [
              "มกราคม",
              "กุมภาพันธ์",
              "มีนาคม",
              "เมษายน",
              "พฤษภาคม",
              "มิถุนายน",
              "กรกฎาคม",
              "สิงหาคม",
              "กันยายน",
              "ตุลาคม",
              "พฤศจิกายน",
              "ธันวาคม",
            ],
          },
        ]}
        // xAxisTickValues={thaiMonthLabels}
      />
    </Box>
  );
}

const series = [
  {
    label: "รับยาเข้าคลัง",
    data: [
      2500, 2200, 2000, 1900, 1600, 1400, 2000, 1200, 1600, 1300, 1750, 1850,
      2000, 1000, 1600, 1500, 2200, 500, 1800, 1600,
    ],
  },
  {
    label: "เบิกจ่าย",
    data: [
      2362, 2054, 1962, 1336, 1186, 1069, 994, 529, 1173, 1031, 757, 862, 1446,
      910, 1430, 1300, 805, 1835, 1684, 1407,
    ],
  },
  // series 3 to series 10 data removed for brevity
].map((s) => ({ ...s }));
