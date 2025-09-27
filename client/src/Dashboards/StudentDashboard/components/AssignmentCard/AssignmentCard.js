import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AssignmentCard.css";

const AssignmentCard = () => {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const storedAssignments = localStorage.getItem("assignments");
    if (storedAssignments) {
      setAssignments(JSON.parse(storedAssignments));
    }
  }, []);

  const getStatusBadge = (status) => {
    let className = "status-badge ";
    if (status === "Submitted") className += "submitted";
    else if (status === "Pending") className += "pending";
    else if (status === "Late") className += "late";
    return className;
  };

  const handleViewAll = () => {
    navigate("/student/assignments");
  };

  return (
    <div className="assignment-card">
      <div className="card-header">
        <h3>Recent Assignments</h3>
        <button className="view-all-btn" onClick={handleViewAll}>
          View All
        </button>
      </div>

      <div className="assignments-list">
        {assignments.length === 0 ? (
          <p>No assignments available</p>
        ) : (
          assignments.slice(0, 3).map((assignment, index) => (
            <div key={index} className="assignment-item">
              <div className="assignment-info">
                <h4 className="assignment-title">{assignment.title}</h4>
                <p className="assignment-subject">{assignment.subject}</p>
                <p className="assignment-due">Due: {assignment.dueDate}</p>
              </div>
              <div className="assignment-status">
                <span className={getStatusBadge(assignment.status)}>
                  {assignment.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AssignmentCard;
