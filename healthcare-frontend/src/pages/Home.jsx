import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold" href="/">
            <img src="/creatornet.png" alt="Logo" height="40" className="me-2" /> Healthcare System
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link fw-bold" href="/login">Login</a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-bold" href="/register">Register</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-light text-center py-5">
        <div className="container">
          <h1 className="display-3 text-primary fw-bold">Welcome to the Healthcare System</h1>
          <p className="lead text-dark">Your trusted platform for efficient and secure healthcare management</p>
          <a href="/register" className="btn btn-outline-primary btn-lg mt-3 px-4">Get Started</a>
        </div>
      </header>

      {/* About Section with Image */}
      <section className="container my-5">
        <div className="row align-items-center">
          <div className="col-md-6 text-center">
            <img src="/back111.jpg" alt="Healthcare" className="img-fluid rounded shadow-lg" style={{ maxWidth: "100%" }} />
          </div>
          <div className="col-md-6">
            <h2 className="text-primary fw-bold">About Our System</h2>
            <p className="text-dark">Our healthcare management system is designed to streamline patient care, ensuring accurate and efficient medical record-keeping, seamless lab integrations, and secure patient data handling.</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container my-5">
        <div className="row text-center">
          <div className="col-md-4">
            <div className="card p-4 shadow-sm border-0">
              <h3 className="text-primary fw-bold">Patient Management</h3>
              <p>Register and manage patient data with ease.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-4 shadow-sm border-0">
              <h3 className="text-primary fw-bold">Lab Integration</h3>
              <p>Seamless integration with diagnostic labs.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-4 shadow-sm border-0">
              <h3 className="text-primary fw-bold">Secure & Reliable</h3>
              <p>Data protection with top-level security measures.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white text-center py-4 mt-5">
        <div className="container">
          <p className="mb-1">&copy; 2025 Healthcare System. All rights reserved.</p>
          <p className="mb-0">Designed with ❤️ for better healthcare services</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
