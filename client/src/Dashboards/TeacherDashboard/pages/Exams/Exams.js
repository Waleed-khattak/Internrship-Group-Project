import React, { useState } from 'react';
import './Exams.css';

const Exams = () => {
  const [currentTeacher] = useState("Mr. Ahmed Khan");

  const teachers = [
    { id: 1, name: "Mr. Ahmed Khan", subject: "Mathematics", classes: ["10th A", "9th B"], email: "ahmed.khan@school.edu", phone: "0321-1234567" },
    { id: 2, name: "Ms. Fatima Ali", subject: "English", classes: ["8th C", "11th A"], email: "fatima.ali@school.edu", phone: "0322-7654321" },
    { id: 3, name: "Dr. Hassan Sheikh", subject: "Physics", classes: ["11th A", "10th A"], email: "hassan.sheikh@school.edu", phone: "0323-9876543" }
  ];

  const allStudents = [
    { id: 1, rollNo: "101", name: "Ali Hassan", fatherName: "Mr. Imran Ali", phone: "03001234567", class: "10th A" },
    { id: 2, rollNo: "102", name: "Sara Ahmed", fatherName: "Mr. Ahmed Khan", phone: "03011234567", class: "10th A" },
    { id: 3, rollNo: "103", name: "Zain Malik", fatherName: "Mr. Malik Saeed", phone: "03021234567", class: "10th A" },
    { id: 4, rollNo: "201", name: "Hassan Ali", fatherName: "Mr. Ali Khalid", phone: "03031234567", class: "9th B" },
    { id: 5, rollNo: "202", name: "Ayesha Khan", fatherName: "Mr. Khan Sahib", phone: "03041234567", class: "9th B" },
    { id: 6, rollNo: "301", name: "Fatima Sheikh", fatherName: "Mr. Sheikh Ahmad", phone: "03051234567", class: "8th C" },
    { id: 7, rollNo: "401", name: "Omar Farooq", fatherName: "Mr. Farooq Ali", phone: "03061234567", class: "11th A" }
  ];

  const allExams = [
    { id: 1, name: 'Mid-Term Exams', class: '10th A', subject: 'Mathematics', date: '2024-10-15', status: 'Scheduled', totalMarks: 100 },
    { id: 2, name: 'Final Exams', class: '9th B', subject: 'Mathematics', date: '2024-12-05', status: 'Scheduled', totalMarks: 100 },
    { id: 3, name: 'Unit Test', class: '8th C', subject: 'English', date: '2024-09-20', status: 'Completed', totalMarks: 50 },
    { id: 4, name: 'Quarterly Exams', class: '11th A', subject: 'Physics', date: '2024-11-10', status: 'Scheduled', totalMarks: 100 },
    { id: 5, name: 'Quiz 1', class: '10th A', subject: 'Mathematics', date: '2024-09-25', status: 'Scheduled', totalMarks: 25 },
    { id: 6, name: 'Monthly Test', class: '11th A', subject: 'English', date: '2024-10-20', status: 'Scheduled', totalMarks: 60 }
  ];

  const [marksRecords, setMarksRecords] = useState({});
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedExam, setSelectedExam] = useState('');
  const [showResults, setShowResults] = useState(false);

  const teacher = teachers.find(t => t.name === currentTeacher);
  const teacherClasses = teacher ? teacher.classes : [];
  const teacherSubject = teacher ? teacher.subject : "";

  const getStudentsForClass = (className) => allStudents.filter(s => s.class === className);
  const getExamsForClass = (className) => {
    if (!className) return [];
    return allExams.filter(exam => exam.class === className && exam.subject === teacherSubject && exam.status === 'Scheduled');
  };

  const calculateGrade = (marks, total) => {
    const percent = (marks / total) * 100;
    if (percent >= 80) return "A+";
    if (percent >= 70) return "A";
    if (percent >= 60) return "B";
    if (percent >= 50) return "C";
    if (percent >= 40) return "D";
    return "F";
  };

  const handleMarksChange = (studentId, marks) => {
    if (!selectedExam || !selectedClass) return;
    const selectedExamData = allExams.find(e => e.id == selectedExam);
    if (!selectedExamData) return;

    const total = selectedExamData.totalMarks;
    const numMarks = parseFloat(marks) || 0;
    const grade = numMarks > 0 ? calculateGrade(numMarks, total) : '';
    const percentage = numMarks > 0 ? ((numMarks / total) * 100).toFixed(1) : '0';

    setMarksRecords(prev => ({
      ...prev,
      [selectedExam]: {
        ...prev[selectedExam],
        [studentId]: { marks: numMarks, grade, totalMarks: total, percentage }
      }
    }));
  };

  const studentsForSelectedClass = getStudentsForClass(selectedClass);
  const examsForSelectedClass = getExamsForClass(selectedClass);
  const selectedExamData = allExams.find(e => e.id == selectedExam);
  const currentMarks = selectedExam ? (marksRecords[selectedExam] || {}) : {};

  return (
    <div className="exams-container">
      {/* Header */}
      <div className="header-card">
        <h2 className="page-title">📊 Marks Entry System</h2>
        <div className="teacher-info">
          <p><strong>Teacher:</strong> {currentTeacher}</p>
          <p><strong>Subject:</strong> {teacherSubject}</p>
          <p><strong>Classes:</strong> {teacherClasses.join(', ')}</p>
        </div>
      </div>

      {/* Selection */}
      <div className="selection-card">
        <h3 className="card-title">Select Class & Exam</h3>
        <div className="selection-row">
          <div className="form-group">
            <label>Select Class:</label>
            <select 
              value={selectedClass} 
              onChange={(e) => { setSelectedClass(e.target.value); setSelectedExam(''); setShowResults(false); }}
              className="form-select"
            >
              <option value="">-- Choose Class --</option>
              {teacherClasses.map((cls) => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Select Exam:</label>
            <select 
              value={selectedExam} 
              onChange={(e) => { setSelectedExam(e.target.value); setShowResults(false); }}
              className={`form-select ${!selectedClass ? 'disabled' : ''}`}
              disabled={!selectedClass}
            >
              <option value="">-- Choose Exam --</option>
              {examsForSelectedClass.map(exam => (
                <option key={exam.id} value={exam.id}>
                  {exam.name} (Total: {exam.totalMarks} marks)
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Marks Table */}
      {selectedClass && selectedExam && selectedExamData && (
        <>
          <div className="marks-card">
            <div className="marks-header">
              <div className="marks-title-section">
                <h3 className="marks-title">📝 Enter Marks - {selectedExamData.name}</h3>
                <p className="marks-subtitle">
                  Class: {selectedClass} | Subject: {teacherSubject} | Total: {selectedExamData.totalMarks} marks
                </p>
              </div>
            </div>
            
            <div className="table-container">
              <table className="marks-table">
                <thead>
                  <tr>
                    <th>Roll No</th>
                    <th>Student Name</th>
                    <th>Father Name</th>
                    <th>Marks (/{selectedExamData.totalMarks})</th>
                    <th>Grade</th>
                    <th>%</th>
                  </tr>
                </thead>
                <tbody>
                  {studentsForSelectedClass.map(student => {
                    const studentMarks = currentMarks[student.id];
                    return (
                      <tr key={student.id}>
                        <td>{student.rollNo}</td>
                        <td>{student.name}</td>
                        <td>{student.fatherName}</td>
                        <td>
                          <input 
                            type="number"
                            min="0"
                            max={selectedExamData.totalMarks}
                            value={studentMarks?.marks || ''}
                            onChange={(e) => handleMarksChange(student.id, e.target.value)}
                          />
                        </td>
                        <td>{studentMarks?.grade || ''}</td>
                        <td>{studentMarks?.percentage || '0'}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="marks-footer">
              <button 
                className="submit-btn"
                onClick={() => setShowResults(true)}
              >
                ✅ Submit Result
              </button>
            </div>
          </div>

          {/* Display Submitted Results */}
          {showResults && (
            <div className="submitted-results">
              <h3>📄 Submitted Results - {selectedExamData.name}</h3>
              <table className="marks-table">
                <thead>
                  <tr>
                    <th>Roll No</th>
                    <th>Student Name</th>
                    <th>Marks</th>
                    <th>Grade</th>
                    <th>%</th>
                  </tr>
                </thead>
                <tbody>
                  {studentsForSelectedClass.map(student => {
                    const studentMarks = currentMarks[student.id];
                    return (
                      <tr key={student.id}>
                        <td>{student.rollNo}</td>
                        <td>{student.name}</td>
                        <td>{studentMarks?.marks || '-'}</td>
                        <td>{studentMarks?.grade || '-'}</td>
                        <td>{studentMarks?.percentage || '0'}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Exams;
