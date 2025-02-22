import React, { useState, useEffect } from "react";

const CurrentDateDisplay = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // Converts to YYYY-MM-DD
    setCurrentDate(formattedDate);
  }, []); // Runs only once when the component mounts

  return <div>Date: {currentDate}</div>;
};

export default CurrentDateDisplay;
