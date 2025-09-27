import React, { useState, useEffect } from "react";
import "./Fees.css";

const Fees = () => {
  const [activeTab, setActiveTab] = useState("current");
  const [feesData, setFeesData] = useState({ current: [], history: [] });

  // Load fees data from localStorage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("studentFees"));
    if (storedData) {
      setFeesData(storedData);
    }
  }, []);

  const currentFees = feesData.current || [];
  const historyFees = feesData.history || [];

  const totalDue = currentFees.reduce((sum, fee) => sum + fee.amount, 0);
  const totalPaid = historyFees.reduce((sum, fee) => sum + fee.amount, 0);

  const handlePayNow = (feeId) => {
    const updatedCurrent = currentFees.filter((fee) => fee.id !== feeId);
    const paidFee = currentFees.find((fee) => fee.id === feeId);

    if (!paidFee) return;

    const updatedHistory = [
      ...historyFees,
      {
        ...paidFee,
        paidDate: new Date().toISOString().split("T")[0],
        status: "Paid",
      },
    ];

    const updatedData = { current: updatedCurrent, history: updatedHistory };
    setFeesData(updatedData);
    localStorage.setItem("studentFees", JSON.stringify(updatedData));

    alert(`Fee ID ${feeId} marked as Paid ✅`);
  };

  return (
    <div className="fees-page">
      <h1 className="page-title">Fee Management</h1>

      <div className="fees-summary">
        <div className="summary-card">
          <h3>Total Due</h3>
          <div className="amount due">Rs. {totalDue}</div>
          <p>Unpaid fees</p>
        </div>

        <div className="summary-card">
          <h3>Total Paid</h3>
          <div className="amount paid">Rs. {totalPaid}</div>
          <p>Paid this year</p>
        </div>
      </div>

      <div className="fees-tabs">
        <button
          className={`tab-button ${activeTab === "current" ? "active" : ""}`}
          onClick={() => setActiveTab("current")}
        >
          Current Fees
        </button>
        <button
          className={`tab-button ${activeTab === "history" ? "active" : ""}`}
          onClick={() => setActiveTab("history")}
        >
          Payment History
        </button>
      </div>

      <div className="fees-content">
        {activeTab === "current" ? (
          <div className="current-fees">
            <h2>Current Due Fees</h2>
            {currentFees.length > 0 ? (
              <div className="fees-list">
                {currentFees.map((fee) => (
                  <div key={fee.id} className="fee-item">
                    <div className="fee-info">
                      <h3 className="fee-title">{fee.title}</h3>
                      <p className="fee-description">{fee.description}</p>
                      <div className="fee-details">
                        <span className="fee-amount">Rs. {fee.amount}</span>
                        <span className="fee-due-date">Due: {fee.dueDate}</span>
                      </div>
                    </div>
                    <div className="fee-actions">
                      <span className={`status-badge ${fee.status?.toLowerCase()}`}>
                        {fee.status}
                      </span>
                      <button
                        className="pay-now-btn"
                        onClick={() => handlePayNow(fee.id)}
                      >
                        Pay Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-fees">
                <i className="fas fa-check-circle"></i>
                <p>No pending fees at the moment</p>
              </div>
            )}
          </div>
        ) : (
          <div className="payment-history">
            <h2>Payment History</h2>
            {historyFees.length > 0 ? (
              <div className="fees-list">
                {historyFees.map((fee) => (
                  <div key={fee.id} className="fee-item">
                    <div className="fee-info">
                      <h3 className="fee-title">{fee.title}</h3>
                      <p className="fee-description">{fee.description}</p>
                      <div className="fee-details">
                        <span className="fee-amount">Rs. {fee.amount}</span>
                        <span className="fee-paid-date">Paid on: {fee.paidDate}</span>
                      </div>
                    </div>
                    <div className="fee-actions">
                      <span className={`status-badge ${fee.status?.toLowerCase()}`}>
                        {fee.status}
                      </span>
                      <button className="receipt-btn">
                        <i className="fas fa-receipt"></i>
                        Receipt
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-fees">
                <i className="fas fa-receipt"></i>
                <p>No payment history available</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Fees;
