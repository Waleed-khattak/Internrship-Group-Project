import React from "react";

function Index() {
  return (
    <div className="app">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title animate-fade">Welcome to SmartDesk</h1>
          <p className="hero-subtitle animate-slide">
            A modern School Management System to simplify learning, teaching, and administration.
          </p>
          <a href="#features" className="hero-btn animate-bounce">
            Get Started
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <h2 className="section-title">Why Choose SmartDesk?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>📚 Student Management</h3>
            <p>Track admissions, attendance, grades, and progress seamlessly.</p>
          </div>
          <div className="feature-card">
            <h3>👩‍🏫 Teacher Tools</h3>
            <p>Empower teachers with smart scheduling, gradebooks, and reporting.</p>
          </div>
          <div className="feature-card">
            <h3>👨‍👩‍👧 Parent Access</h3>
            <p>Parents stay connected with real-time updates, fees, and progress.</p>
          </div>
          <div className="feature-card">
            <h3>💻 Admin Dashboard</h3>
            <p>Centralized management for students, staff, and operations.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="about-content">
          <h2 className="section-title">About SmartDesk</h2>
          <p>
            SmartDesk is designed to streamline school operations, enhance communication,
            and improve the educational experience for students, teachers, and parents alike.
            With cloud-based features, secure access, and real-time notifications, 
            SmartDesk brings education management into the digital age.
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2 className="section-title">What People Say</h2>
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <p>“SmartDesk has revolutionized the way our school operates!”</p>
            <h4>- Principal Ayesha</h4>
          </div>
          <div className="testimonial-card">
            <p>“As a teacher, grading and attendance have never been easier.”</p>
            <h4>- Mr. Ali, Teacher</h4>
          </div>
          <div className="testimonial-card">
            <p>“I can track my child’s progress instantly. Very helpful!”</p>
            <h4>- Mrs. Khan, Parent</h4>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="cta">
        <h2>Ready to Transform Your School?</h2>
        <a href="#!" className="cta-btn">Contact Us Today</a>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} SmartDesk. All rights reserved.</p>
      </footer>
    </div>
  );
}
export default Index;
