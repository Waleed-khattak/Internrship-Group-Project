import React, { useState } from 'react';
import './Fees.css';

const Fees = () => {
  const [fees, setFees] = useState([
    { id: 1, student: 'Ali Ahmed', class: '10th A', amount: 5000, paid: 4000, due: 1000, status: 'Partial' },
    { id: 2, student: 'Fatima Khan', class: '9th B', amount: 5000, paid: 5000, due: 0, status: 'Paid' },
    { id: 3, student: 'Usman Ali', class: '8th C', amount: 5000, paid: 0, due: 5000, status: 'Unpaid' },
    { id: 4, student: 'Ayesha Malik', class: '11th A', amount: 5000, paid: 5000, due: 0, status: 'Paid' },
    { id: 5, student: 'Bilal Hassan', class: '7th B', amount: 5000, paid: 3000, due: 2000, status: 'Partial' }
  ]);

  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [formData, setFormData] = useState({
    student: '',
    amount: '',
    paymentDate: new Date().toISOString().split('T')[0]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddPayment = (e) => {
    e.preventDefault();
    // In a real app, you would process the payment
    alert(`Payment of ${formData.amount} recorded for ${formData.student}`);
    setFormData({ student: '', amount: '', paymentDate: new Date().toISOString().split('T')[0] });
    setShowPaymentForm(false);
  };

  return (
    <div className="fees-page">
      <div className="page-header">
        <h2>Fee Management</h2>
        <button 
          className="btn-primary"
          onClick={() => setShowPaymentForm(true)}
        >
          <i className="fas fa-plus"></i> Record Payment
        </button>
      </div>

      {showPaymentForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Record Fee Payment</h3>
              <button 
                className="close-btn"
                onClick={() => setShowPaymentForm(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleAddPayment}>
              <div className="form-group">
                <label>Student</label>
                <select
                  name="student"
                  value={formData.student}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Student</option>
                  <option value="Ali Ahmed">Ali Ahmed (10th A)</option>
                  <option value="Fatima Khan">Fatima Khan (9th B)</option>
                  <option value="Usman Ali">Usman Ali (8th C)</option>
                  <option value="Ayesha Malik">Ayesha Malik (11th A)</option>
                  <option value="Bilal Hassan">Bilal Hassan (7th B)</option>
                </select>
              </div>
              <div className="form-group">
                <label>Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Payment Date</label>
                <input
                  type="date"
                  name="paymentDate"
                  value={formData.paymentDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowPaymentForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Record Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'var(--color-6)' }}>
            <i className="fas fa-money-bill-wave" style={{ color: 'var(--primary-color-1)' }}></i>
          </div>
          <div className="stat-info">
            <h3>{fees.reduce((acc, fee) => acc + fee.amount, 0).toLocaleString()}</h3>
            <p>Total Fees</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'rgba(24, 187, 155, 0.1)' }}>
            <i className="fas fa-check-circle" style={{ color: '#18BB9B' }}></i>
          </div>
          <div className="stat-info">
            <h3>{fees.reduce((acc, fee) => acc + fee.paid, 0).toLocaleString()}</h3>
            <p>Total Paid</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'rgba(233, 87, 87, 0.1)' }}>
            <i className="fas fa-exclamation-circle" style={{ color: '#E95757' }}></i>
          </div>
          <div className="stat-info">
            <h3>{fees.reduce((acc, fee) => acc + fee.due, 0).toLocaleString()}</h3>
            <p>Total Due</p>
          </div>
        </div>
      </div>

      <div className="content-card">
        <div className="card-header">
          <h3>Fee Records</h3>
          <div className="search-box">
            <input type="text" placeholder="Search fees..." />
            <i className="fas fa-search"></i>
          </div>
        </div>
        <div className="card-body">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Student</th>
                <th>Class</th>
                <th>Amount</th>
                <th>Paid</th>
                <th>Due</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {fees.map(fee => (
                <tr key={fee.id}>
                  <td>{fee.id}</td>
                  <td>{fee.student}</td>
                  <td>{fee.class}</td>
                  <td>{fee.amount.toLocaleString()}</td>
                  <td>{fee.paid.toLocaleString()}</td>
                  <td>{fee.due.toLocaleString()}</td>
                  <td>
                    <span className={`status ${fee.status.toLowerCase()}`}>
                      {fee.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon"><i className="fas fa-edit"></i></button>
                      <button className="btn-icon"><i className="fas fa-trash"></i></button>
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

export default Fees;