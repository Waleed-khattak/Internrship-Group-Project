import React, { useState } from "react";
import "./Results.css";

const Results = () => {
  const [selectedExam, setSelectedExam] = useState("midterm");

  const examResults = JSON.parse(localStorage.getItem("examResults")) || {};
  const currentResults = examResults[selectedExam];

  const handleDownloadReport = () => {
    if (!currentResults) {
      alert("No report available to download.");
      return;
    }
    console.log(`Downloading report for ${currentResults.name}`);
    alert(`Downloading report for ${currentResults.name}`);
  };

  return (
    <div className="results-page">
      <h1 className="page-title">Exam Results</h1>

      <div className="results-controls">
        <div className="exam-selector">
          <label htmlFor="exam-select">Select Exam:</label>
          <select
            id="exam-select"
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
          >
            <option value="midterm">Mid-Term Examination</option>
            <option value="final">Final Examination</option>
          </select>
        </div>

        <button className="download-btn" onClick={handleDownloadReport}>
          <i className="fas fa-download"></i>
          Download Report Card
        </button>
      </div>

      {!currentResults ? (
        <p>No results found for {selectedExam}.</p>
      ) : (
        <>
          <div className="exam-header">
            <h2>{currentResults.name}</h2>
            <p>Date: {currentResults.date}</p>
          </div>

          <div className="results-summary">
            <div className="summary-card">
              <h3>Total Marks</h3>
              <div className="summary-value">
                {currentResults.total.marks}/{currentResults.total.total}
              </div>
            </div>

            <div className="summary-card">
              <h3>Percentage</h3>
              <div className="summary-value">
                {currentResults.total.percentage}%
              </div>
            </div>

            <div className="summary-card">
              <h3>Overall Grade</h3>
              <div className="summary-value">
                {currentResults.total.grade}
              </div>
            </div>
          </div>

          <div className="results-table-container">
            <h3>Subject-wise Results</h3>
            <table className="results-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Marks Obtained</th>
                  <th>Total Marks</th>
                  <th>Percentage</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {currentResults.subjects.map((subject, index) => (
                  <tr key={index}>
                    <td>{subject.name}</td>
                    <td>{subject.marks}</td>
                    <td>{subject.total}</td>
                    <td>
                      {((subject.marks / subject.total) * 100).toFixed(1)}%
                    </td>
                    <td>
                      <span
                        className={`grade-badge grade-${subject.grade
                          .toLowerCase()
                          .replace("+", "plus")
                          .replace("-", "minus")}`}
                      >
                        {subject.grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Results;
