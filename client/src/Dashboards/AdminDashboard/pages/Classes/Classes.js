import React, { useState, useEffect } from "react";
import "./Classes.css";
const getAllClasses = () => {
  const stored = localStorage.getItem("classesData");
  return stored
    ? JSON.parse(stored)
    : [
        {
          id: 1,
          name: "10th A",
          students: 40,
          classTeacher: "Mr. Ahmed Khan",
          section: "A",
        },
        {
          id: 2,
          name: "9th B",
          students: 35,
          classTeacher: "Ms. Fatima Ali",
          section: "B",
        },
        {
          id: 3,
          name: "8th C",
          students: 38,
          classTeacher: "Mr. Usman Malik",
          section: "C",
        },
        {
          id: 4,
          name: "11th A",
          students: 42,
          classTeacher: "Ms. Ayesha Hassan",
          section: "A",
        },
        {
          id: 5,
          name: "7th B",
          students: 36,
          classTeacher: "Mr. Bilal Ahmed",
          section: "B",
        },
      ];
};
const Classes = () => {
  const [classes, setClasses] = useState(getAllClasses);

  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    students: "",
    classTeacher: "",
    section: "",
  });
  useEffect(() => {
    localStorage.setItem("classesData", JSON.stringify(classes));
  }, [classes]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddClass = (e) => {
    e.preventDefault();
    const newClass = {
      id: classes.length > 0 ? classes[classes.length - 1].id + 1 : 1,
      ...formData,
    };
    setClasses([...classes, newClass]);
    setFormData({ name: "", students: "", classTeacher: "", section: "" });
    setShowAddForm(false);
  };

  const handleDeleteClass = (id) => {
    setClasses(classes.filter((cls) => cls.id !== id));
  };

  return (
    <div className="classes-page">
      <div className="page-header">
        <h2>Class Management</h2>
        <button className="btn-primary" onClick={() => setShowAddForm(true)}>
          <i className="fas fa-plus"></i> Add New Class
        </button>
      </div>

      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Add New Class</h3>
              <button
                className="close-btn"
                onClick={() => setShowAddForm(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleAddClass}>
              <div className="form-group">
                <label>Class Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., 10th A"
                  required
                />
              </div>
              <div className="form-group">
                <label>Number of Students</label>
                <input
                  type="number"
                  name="students"
                  value={formData.students}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Class Teacher</label>
                <input
                  type="text"
                  name="classTeacher"
                  value={formData.classTeacher}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Section</label>
                <input
                  type="text"
                  name="section"
                  value={formData.section}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowAddForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Add Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="stats-grid">
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{ backgroundColor: "var(--color-6)" }}
          >
            <i
              className="fas fa-school"
              style={{ color: "var(--primary-color-1)" }}
            ></i>
          </div>
          <div className="stat-info">
            <h3>{classes.length}</h3>
            <p>Total Classes</p>
          </div>
        </div>
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{ backgroundColor: "rgba(24, 187, 155, 0.1)" }}
          >
            <i
              className="fas fa-user-graduate"
              style={{ color: "#18BB9B" }}
            ></i>
          </div>
          <div className="stat-info">
            <h3>
              {" "}
              {classes.reduce(
                (acc, cls) => acc + (parseInt(cls.students) || 0),
                0
              )}
            </h3>
            <p>Total Students</p>
          </div>
        </div>
      </div>

      <div className="content-card">
        <div className="card-header">
          <h3>All Classes</h3>
          <div className="search-box">
            <input type="text" placeholder="Search classes..." />
            <i className="fas fa-search"></i>
          </div>
        </div>
        <div className="card-body">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Class Name</th>
                <th>Students</th>
                <th>Class Teacher</th>
                <th>Section</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((cls) => (
                <tr key={cls.id || `${cls.name}-${cls.section}`}>
                  <td>{cls.id}</td>
                  <td>{cls.name}</td>
                  <td>{cls.students}</td>
                  <td>{cls.classTeacher}</td>
                  <td>{cls.section}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="btn-icon"
                        onClick={() => handleDeleteClass(cls.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Classes;
