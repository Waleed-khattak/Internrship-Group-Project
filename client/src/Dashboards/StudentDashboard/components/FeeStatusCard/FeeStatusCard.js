import React, { useEffect, useState } from "react";
import "./FeeStatusCard.css";

const FeeStatusCard = () => {
  const [feeData, setFeeData] = useState(null);

  useEffect(() => {
    const storedFee = localStorage.getItem("feeStatus");
    if (storedFee) {
      setFeeData(JSON.parse(storedFee));
    }
  }, []);

  const getStatusClass = (status) => {
    if (status === "Paid") return "paid";
    if (status === "Pending") return "pending";
    if (status === "Overdue") return "overdue";
    return "";
  };

  if (!feeData) {
    return (
      <div className="fee-status-card">
        <h3>Fee Status</h3>
        <p>No fee record available</p>
      </div>
    );
  }

  return (
    <div className="fee-status-card">
      <h3>Fee Status</h3>

      <div className="fee-details">
        <div className="fee-amount">
          <span className="label">Amount Due:</span>
          <span className="value">Rs. {feeData.amount}</span>
        </div>

        <div className="fee-due-date">
          <span className="label">Due Date:</span>
          <span className="value">{feeData.dueDate}</span>
        </div>

        <div className="fee-status">
          <span className="label">Status:</span>
          <span className={`status-badge ${getStatusClass(feeData.status)}`}>
            {feeData.status}
          </span>
        </div>
      </div>

      {feeData.status !== "Paid" && (
        <button className="pay-now-btn">Pay Now</button>
      )}
    </div>
  );
};

export default FeeStatusCard;
