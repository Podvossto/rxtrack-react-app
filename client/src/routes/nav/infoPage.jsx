/* eslint-disable no-unused-vars */
import React from "react";
import { useLocation } from "react-router-dom";

const InfoPage = () => {
  const location = useLocation();
  const columns = location.state?.columns;
  const row = location.state?.row;

  // console.log("columns:", columns);
  // console.log("row:", row);

  return (
    <div>
      <h2>Info Page</h2>
      {/* Use the columns and row data here */}
    </div>
  );
};

export default InfoPage;
