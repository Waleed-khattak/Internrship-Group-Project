import React, { useState, useEffect } from "react";
import "./Assignments.css";

const Assignments = () => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [assignmentsData, setAssignmentsData] = useState([]);

  // Load assignments from localStorage
  useEffect(() => {
    const storedAssignments = localStorage.getItem("assignmentsData");
    if (storedAssignments) {
      try {
        const parsed = JSON.parse(storedAssignments).map((a) => ({
          ...a,
          attachments: Array.isArray(a.attachments)
            ? a.attachments.map(f => (typeof f === "string" ? { name: f, size: 0 } : f))
            : [],
        }));
        setAssignmentsData(parsed);
      } catch (error) {
        console.error("Invalid JSON in localStorage:", error);
        setAssignmentsData([]);
      }
    }
  }, []);

  // Filter assignments based on status
  const filteredAssignments =
    filterStatus === "all"
      ? assignmentsData
      : assignmentsData.filter((assignment) => assignment.status === filterStatus);

  // Status badge styling
  const getStatusBadge = (status) => {
    let className = "status-badge ";
    if (status === "Submitted") className += "submitted";
    else if (status === "Pending") className += "pending";
    else if (status === "Late") className += "late";
    else className += "active";
    return className;
  };

const handleDownload = (file) => {
  // If file is an object with content
  if (file.content) {
    const blob = new Blob([file.content], { type: file.type || "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } else {
    // Fallback: download empty text file with the same name
    const blob = new Blob([""], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = file.name || "file.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};


  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="assignments-page">
      <h1 className="page-title">Assignments</h1>

      {/* Filter */}
      <div className="assignments-controls">
        <div className="filter-section">
          <label htmlFor="status-filter">Filter by Status:</label>
          <select
            id="status-filter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Assignments</option>
            <option value="Pending">Pending</option>
            <option value="Submitted">Submitted</option>
            <option value="Late">Late</option>
            <option value="Active">Active</option>
          </select>
        </div>
      </div>

      {/* Assignment List */}
      <div className="assignments-list">
        {filteredAssignments.length > 0 ? (
          filteredAssignments.map((assignment) => (
            <div key={assignment.id} className="assignment-card">
              <div className="assignment-header">
                <div className="assignment-title-section">
                  <h3 className="assignment-title">{assignment.title}</h3>
                  {assignment.subject && (
                    <span className="assignment-subject">{assignment.subject}</span>
                  )}
                </div>
                <div className="assignment-status">
                  <span className={getStatusBadge(assignment.status)}>
                    {assignment.status}
                  </span>
                </div>
              </div>

              <div className="assignment-details">
                {assignment.description && (
                  <p className="assignment-description">{assignment.description}</p>
                )}

                {assignment.attachments.length > 0 && (
                  <div className="assignment-attachments">
                    <h4>Attachments:</h4>
                    <div className="attachments-list">
                      {assignment.attachments.map((file, index) => (
                        <div key={index} className="attachment-item">
                          <i className="fas fa-paperclip"></i>
                          <span>{file.name || file}</span>
                          <button
                            className="download-btn"
                            onClick={() => handleDownload(file)}
                          >
                            <i style={{color: 'white'}} className="fas fa-download"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="assignment-footer">
                <div className="due-date">
                  <i className="fas fa-calendar-alt"></i>
                  <span>Due: {formatDate(assignment.dueDate)}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No assignments found.</p>
        )}
      </div>
    </div>
  );
};

export default Assignments;
