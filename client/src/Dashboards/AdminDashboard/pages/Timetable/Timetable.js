import React, { useState, useEffect } from 'react';
import './Timetable.css';

const Timetable = () => {
  const [selectedClass, setSelectedClass] = useState('10th A');
   const getAllClasses = () => {
  const stored = localStorage.getItem("classesData");
  return stored ? JSON.parse(stored) : [
    "10th A",
    "9th B",
    "8th C"
  ];
};
  const getStoredTimetable = () => {
    const stored = localStorage.getItem('timetableData');
    return stored ? JSON.parse(stored) : [
      { id: 1, class: '10th A', day: 'Monday', periods: [
        { time: '8:00-9:00', subject: 'Mathematics', teacher: 'Mr. Ahmed Khan' },
        { time: '9:00-10:00', subject: 'Physics', teacher: 'Ms. Ayesha Hassan' },
        { time: '10:00-10:30', subject: 'Break', teacher: '' },
        { time: '10:30-11:30', subject: 'English', teacher: 'Mr. Usman Malik' },
        { time: '11:30-12:30', subject: 'Computer Science', teacher: 'Mr. Bilal Ahmed' }
      ]},
      { id: 2, class: '10th A', day: 'Tuesday', periods: [
        { time: '8:00-9:00', subject: 'Science', teacher: 'Ms. Fatima Ali' },
        { time: '9:00-10:00', subject: 'Mathematics', teacher: 'Mr. Ahmed Khan' },
        { time: '10:00-10:30', subject: 'Break', teacher: '' },
        { time: '10:30-11:30', subject: 'Physics', teacher: 'Ms. Ayesha Hassan' },
        { time: '11:30-12:30', subject: 'English', teacher: 'Mr. Usman Malik' }
      ]}
    ];
  };

  const [timetable, setTimetable] = useState(getStoredTimetable);
  useEffect(() => {
    localStorage.setItem('timetableData', JSON.stringify(timetable));
  }, [timetable]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    class: '',
    day: 'Monday',
    periods: [
      { time: '8:00-9:00', subject: '', teacher: '' },
      { time: '9:00-10:00', subject: '', teacher: '' },
      { time: '10:00-10:30', subject: 'Break', teacher: '' },
      { time: '10:30-11:30', subject: '', teacher: '' },
      { time: '11:30-12:30', subject: '', teacher: '' }
    ]
  });

  const [classes,setClasses] =useState(getAllClasses) ;
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const subjects = ['Mathematics', 'Science', 'English', 'Physics', 'Computer Science', 'Chemistry', 'Biology'];
  const teachers = ['Mr. Ahmed Khan', 'Ms. Fatima Ali', 'Mr. Usman Malik', 'Ms. Ayesha Hassan', 'Mr. Bilal Ahmed'];

  const handleInputChange = (e, periodIndex, field) => {
    const { value } = e.target;
    const updatedPeriods = [...formData.periods];
    updatedPeriods[periodIndex][field] = value;
    setFormData({ ...formData, periods: updatedPeriods });
  };

  const handleAddTimetable = (e) => {
    e.preventDefault();
    const newTimetable = {
      id: Date.now(), 
      ...formData
    };
    setTimetable([...timetable, newTimetable]);
    setFormData({
      class: '',
      day: 'Monday',
      periods: [
        { time: '8:00-9:00', subject: '', teacher: '' },
        { time: '9:00-10:00', subject: '', teacher: '' },
        { time: '10:00-10:30', subject: 'Break', teacher: '' },
        { time: '10:30-11:30', subject: '', teacher: '' },
        { time: '11:30-12:30', subject: '', teacher: '' }
      ]
    });
    setShowAddForm(false);
  };

  const handleDeleteTimetable = (id) => {
    setTimetable(timetable.filter(item => item.id !== id));
  };

  const filteredTimetable = timetable.filter(item => item.class === selectedClass);

  return (
    <div className="timetable-page">
      <div className="page-header">
        <h2>Timetable Management</h2>
        <button 
          className="btn-primary"
          onClick={() => setShowAddForm(true)}
        >
          <i className="fas fa-plus"></i> Create Timetable
        </button>
      </div>

      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal large-modal">
            <div className="modal-header">
              <h3>Create New Timetable</h3>
              <button 
                className="close-btn"
                onClick={() => setShowAddForm(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleAddTimetable}>
              <div className="form-row">
                <div className="form-group">
                  <label>Class</label>
                  <select
                    name="class"
                    value={formData.class}
                    onChange={(e) => setFormData({...formData, class: e.target.value})}
                    required
                  >
                    <option value="">Select Class</option>
                    {classes.map(cls => (
  <option key={cls.id} value={cls.name}>{cls.name}</option>
))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Day</label>
                  <select
                    name="day"
                    value={formData.day}
                    onChange={(e) => setFormData({...formData, day: e.target.value})}
                    required
                  >
                    {days.map(day => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="timetable-form-periods">
                <h4>Periods Schedule</h4>
                {formData.periods.map((period, index) => (
                  <div key={index} className="period-row">
                    <div className="period-time">
                      <span>{period.time}</span>
                    </div>
                    <div className="period-details">
                      {period.subject === 'Break' ? (
                        <div className="break-period">
                          <span>Break Time</span>
                        </div>
                      ) : (
                        <>
                          <select
                            value={period.subject}
                            onChange={(e) => handleInputChange(e, index, 'subject')}
                            required
                          >
                            <option value="">Select Subject</option>
                            {subjects.map(subject => (
                              <option key={subject} value={subject}>{subject}</option>
                            ))}
                          </select>
                          <select
                            value={period.teacher}
                            onChange={(e) => handleInputChange(e, index, 'teacher')}
                            required
                          >
                            <option value="">Select Teacher</option>
                            {teachers.map(teacher => (
                              <option key={teacher} value={teacher}>{teacher}</option>
                            ))}
                          </select>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => setShowAddForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Create Timetable
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="content-card">
        <div className="card-header">
          <h3>Class Timetables</h3>
          <div className="class-filter">
            <label>Select Class:</label>
            <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
            {classes.map(cls => (
  <option key={cls.id} value={cls.name}>{cls.name}</option>
))}
            </select>
          </div>
        </div>
        <div className="card-body">
          {filteredTimetable.length > 0 ? (
            <div className="timetable-container">
              {filteredTimetable.map(daySchedule => (
                <div key={daySchedule.id} className="day-schedule">
                  <h4>{daySchedule.day}</h4>
                  <table className="timetable-table">
                    <thead>
                      <tr>
                        <th>Time</th>
                        <th>Subject</th>
                        <th>Teacher</th>
                      </tr>
                    </thead>
                    <tbody>
                      {daySchedule.periods.map((period, index) => (
                        <tr key={index}>
                          <td>{period.time}</td>
                          <td>{period.subject}</td>
                          <td>{period.teacher}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDeleteTimetable(daySchedule.id)}
                  >
                    <i className="fas fa-trash"></i> Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-timetable">
              <i className="fas fa-calendar-times"></i>
              <p>No timetable found for {selectedClass}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Timetable;