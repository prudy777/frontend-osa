import React from "react";
import './profile.css';

// Import images
import companyLogo from '../assets/company.png'; // Replace with your logo path
import ceoImage from '../assets/Emmanuel.png'; // Replace with your CEO image path
import wifeImage from '../assets/progress.png'; // Replace with your Wife image path

const About = () => {
  return (
    <section className="py-5" style={{ marginTop: 190 }}>
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <img src={companyLogo} alt="Company Logo" className="img-fluid mb-4" style={{ maxWidth: '200px' }} />
            <h1 className="display-4">About Us</h1>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12">
            <div className="card border-0">
              <div className="card-body p-0">
                <p className="lead text-secondary" style={{fontSize: 20, fontFamily: 'Romans', fontWeight:'bold', fontStyle:'italic', fontStretch:"revert-layer"}}>
                  Osamedic Diagnostics Ltd was born out of the need to bridge the gap between the public and access to quality and affordable healthcare in Nigeria. We currently offer onsite and mobile diagnostic services to the residents of Lekki and its environs, Sale of Medical laboratory Equipment and Consumables, Laboratory Set-up, Registration, and Management. We also offer consultancy services as regards the kind of medical structures, designs, and building, environment that best suits a medical centre, the right equipment and budget allocations for any given projects.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="card border-0 h-100">
              <div className="card-body p-0">
                <h4 className="card-title mb-3">Our Services</h4>
                <ul className="list-unstyled text-secondary">
                  <li className="mb-2">
                    <span className="text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="bi bi-check-all"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486z" />
                      </svg>
                    </span>
                    <span> Onsite Diagnostic Services</span>
                  </li>
                  <li className="mb-2">
                    <span className="text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="bi bi-check-all"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486z" />
                      </svg>
                    </span>
                    <span> Mobile Diagnostic Services</span>
                  </li>
                  <li className="mb-2">
                    <span className="text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="bi bi-check-all"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486z" />
                      </svg>
                    </span>
                    <span> Sale of Medical Laboratory Equipment</span>
                  </li>
                  <li className="mb-2">
                    <span className="text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="bi bi-check-all"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486z" />
                      </svg>
                    </span>
                    <span> Sale of Medical Consumables</span>
                  </li>
                  <li className="mb-2">
                    <span className="text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="bi bi-check-all"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486z" />
                      </svg>
                    </span>
                    <span> Laboratory Setup, Registration, and Management</span>
                  </li>
                  <li className="mb-2">
                    <span className="text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="bi bi-check-all"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486z" />
                      </svg>
                    </span>
                    <span> Consultancy Services</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="card border-0 h-100">
              <div className="card-body p-0">
                <h4 className="card-title mb-3">Our Team</h4>
                <div className="d-flex align-items-center mb-4">
                  <img src={ceoImage} alt="CEO" className="img-fluid rounded-circle" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                  <div className="ms-3">
                    <h5 className="mb-0">Mr. Emmanuel Osawemen</h5>
                    <p className="text-secondary mb-0">CEO</p>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <img src={wifeImage} alt="Wife" className="img-fluid rounded-circle" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                  <div className="ms-3">
                    <h5 className="mb-0">Mrs. Progress Osawemen</h5>
                    <p className="text-secondary mb-0">Co-Founder</p>
                  </div>
                </div>
                <p className="lead text-secondary">
                  The major drivers of Osamedic Diagnostics are Mr. Emmanuel Osawemen and his wife, Mrs. Progress Osawemen, both qualified Medical Laboratory Scientists with over 10 years of post-qualification practice in the medical field, as well as a team of medical advisors. We partner with distributors, dealers, and manufacturers' representatives locally and internationally.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-12 col-sm-12 mb-4">
            <div className="card border-0 h-100">
              <div className="card-body p-0">
                <h4 className="card-title mb-3">Our Values</h4>
                <p className="lead text-secondary">
                  We are committed to best and professional good ethical practices in all of our business engagements and relationships.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;


