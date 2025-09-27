import React, { useState } from 'react';
import './Assignments.css';

const getAllClasses = () => {
  const stored = localStorage.getItem("classesData");
  return stored ? JSON.parse(stored) : [];
};

const getAllAssignments = () => {
  const stored = localStorage.getItem("assignmentsData");
  return stored ? JSON.parse(stored) : [];
};

const saveAssignments = (assignments) => {
  localStorage.setItem("assignmentsData", JSON.stringify(assignments));
};


const Assignments = () => {
  const [assignments, setAssignments] = useState(getAllAssignments());
  const [classes] = useState(getAllClasses); 
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedClass, setSelectedClass] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    class: '',
    subject: '',
    dueDate: '',
    status: 'Active',
    priority: 'Medium',
    attachments: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const fileData = files.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date().toISOString()
    }));
    
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...fileData]
    }));
  };

  const removeAttachment = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.class || !formData.dueDate) {
      alert('Please fill in all required fields (Title, Class, Due Date)');
      return;
    }
    
    const newAssignment = {
      id: editingId || Date.now(),
      ...formData,
      createdAt: editingId ? assignments.find(a => a.id === editingId)?.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    let updatedAssignments;
    if (editingId) {
      updatedAssignments = assignments.map(assignment =>
        assignment.id === editingId ? newAssignment : assignment
      );
    } else {
      updatedAssignments = [...assignments, newAssignment];
    }

    setAssignments(updatedAssignments);
    saveAssignments(updatedAssignments); 
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      class: '',
      subject: '',
      dueDate: '',
      status: 'Active',
      priority: 'Medium',
      attachments: []
    });
    setShowForm(false);
    setEditingId(null);
    alert('Assignment saved successfully!');
  };

  const handleEdit = (assignment) => {
    setFormData({
      title: assignment.title,
      description: assignment.description,
      class: assignment.class,
      subject: assignment.subject,
      dueDate: assignment.dueDate,
      status: assignment.status,
      priority: assignment.priority,
      attachments: assignment.attachments || []
    });
    setEditingId(assignment.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      const updatedAssignments = assignments.filter(assignment => assignment.id !== id);
      setAssignments(updatedAssignments);
      saveAssignments(updatedAssignments); 
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      class: '',
      subject: '',
      dueDate: '',
      status: 'Active',
      priority: 'Medium',
      attachments: []
    });
  };

  const filteredAssignments = selectedClass 
    ? assignments.filter(assignment => assignment.class === selectedClass)
    : assignments;

  const getPriorityClass = (priority) => {
    switch(priority) {
      case 'High': return 'priority-high';
      case 'Medium': return 'priority-medium';
      case 'Low': return 'priority-low';
      default: return 'priority-medium';
    }
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'Active': return 'status-active';
      case 'Completed': return 'status-completed';
      case 'Overdue': return 'status-overdue';
      default: return 'status-active';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="assignments-page">
      <div className="page-header">
        <h2>Assignment Management</h2>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          + Create Assignment
        </button>
      </div>

      {/* Filter Section */}
      <div className="content-card">
        <div className="card-header">
          <h3>Filter Assignments</h3>
        </div>
        <div className="card-body">
          <div className="filter-row">
            <div className="form-group">
              <label>Filter by Class</label>
              <select 
                value={selectedClass} 
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">All Classes</option>
                {classes.map(cls => (
                  <option key={cls.id} value={cls.name}>{cls.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Assignment Form Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingId ? 'Edit Assignment' : 'Create New Assignment'}</h3>
              <button 
                className="close-btn"
                onClick={handleCancel}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="assignment-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Assignment Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter assignment title"
                  />
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Enter subject"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Select Class *</label>
                  <select
                    name="class"
                    value={formData.class}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a class</option>
                    {classes.map(cls => (
                      <option key={cls.id} value={cls.name}>{cls.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Due Date *</label>
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Priority</label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Enter assignment description..."
                />
              </div>

              {/* File Upload Section */}
              <div className="form-group">
                <label>Upload Files</label>
                <div className="file-upload-area">
                  <input
                    type="file"
                    id="file-upload"
                    multiple
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.ppt,.pptx,.xls,.xlsx"
                  />
                  <label htmlFor="file-upload" className="file-upload-label">
                    📎 Choose files or drag here
                    <br />
                    <small>Supported: PDF, DOC, TXT, Images, PPT, XLS</small>
                  </label>
                </div>
                
                {/* Display uploaded files */}
                {formData.attachments.length > 0 && (
                  <div className="uploaded-files">
                    <h4>Uploaded Files:</h4>
                    {formData.attachments.map((file, index) => (
                      <div key={index} className="file-item">
                        <span className="file-name">{file.name}</span>
                        <span className="file-size">({formatFileSize(file.size)})</span>
                        <button
                          type="button"
                          className="remove-file-btn"
                          onClick={() => removeAttachment(index)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingId ? 'Update Assignment' : 'Create Assignment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assignments List */}
      <div className="content-card">
        <div className="card-header">
          <h3>Assignments List ({filteredAssignments.length})</h3>
        </div>
        <div className="card-body">
          {filteredAssignments.length === 0 ? (
            <div className="no-data">
              <p>No assignments found. Create your first assignment!</p>
            </div>
          ) : (
            <div className="assignments-grid">
              {filteredAssignments.map(assignment => (
                <div key={assignment.id} className="assignment-card">
                  <div className="assignment-header">
                    <h4>{assignment.title}</h4>
                    <div className="assignment-actions">
                      <button 
                        className="btn-edit"
                        onClick={() => handleEdit(assignment)}
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDelete(assignment.id)}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  
                  <div className="assignment-meta">
                    <span className="class-badge">{assignment.class}</span>
                    <span className={`priority-badge ${getPriorityClass(assignment.priority)}`}>
                      {assignment.priority}
                    </span>
                    <span className={`status-badge ${getStatusClass(assignment.status)}`}>
                      {assignment.status}
                    </span>
                  </div>

                  {assignment.subject && (
                    <p className="assignment-subject"><strong>Subject:</strong> {assignment.subject}</p>
                  )}

                  {assignment.description && (
                    <p className="assignment-description">{assignment.description}</p>
                  )}

                  <div className="assignment-dates">
                    <p><strong>Due:</strong> {formatDate(assignment.dueDate)}</p>
                    <p><strong>Created:</strong> {formatDate(assignment.createdAt)}</p>
                  </div>

                  {assignment.attachments && assignment.attachments.length > 0 && (
                    <div className="assignment-attachments">
                      <p><strong>Attachments:</strong></p>
                      <ul>
                        {assignment.attachments.map((file, index) => (
                          <li key={index}>
                            📎 {file.name} ({formatFileSize(file.size)})
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assignments;