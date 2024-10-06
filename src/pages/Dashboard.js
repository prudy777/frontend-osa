import React from "react";
import "./Dashboard.css";
import companyLogo from '../assets/company.png'; // Replace with your logo path
import ceoImage from '../assets/Emmanuel.png'; // Replace with your CEO image path
import wifeImage from '../assets/progress.png'; // Replace with your Wife image path


function App() {
  return (
    <div className="page-container">
      <header className="top-nav">
        <div className="nav-top-section">
          <a href="/" className="logo-link">
            <div className="logo"></div>
          </a>
        </div>
        
      </header>

      <main>
        <section className="hero-section">
          <div className="container">
            <div className="about-intro-grid">
              <div className="about-head-text-wrap">
                <h1 className="heading-jumbo">Hi there!</h1>
                <p className="paragraph-light bigger">
                  Fuelled by a passion for designing compelling products, I have a desire to excel and continuously improve in my work. Learn more about my journey below.
                </p>
                <a href="https://cdn.prod.website-files.com/5fa25266badbdb239c79ef86/66a1a30a81f0e58483d9a8a4_Sebastian%20Petravic%20CV%202024.pdf" className="button-gradient">
                  View my CV
                </a>
              </div>
              <div className="card">
                <img src={ceoImage} alt="Profile" />
              </div>
            </div>
          </div>
        </section>

        <section className="career-journey-section">
          <div className="container">
            <h2 className="heading-4">My career journey</h2>
            <p className="paragraph-light">
              Always up for a challenge, I have worked across a range of lean startups and larger companies. In my first role, I was the Lead Designer for the first New Zealand startup to attend Y Combinator - the largest startup accelerator in the world. From there, I worked my way up to Art Director and Team Lead at Appster where I oversaw the design of 30+ mobile and desktop apps. I then moved to video creation company - VideoMyJob - where I led UI and UX design of the website and app. In my most recent role, I was a Senior Product Designer at Linktree leading design for the activation team and Linktree's first ever mobile app.<br />
              <br />Outside of work, I enjoy collecting 90s vintage toys, playing guitar and spending time with my wife and our two cats - Neo and Scully.
            </p>
            <div className="skills-grid">
              <div className="skillset-wrap">
                <div className="service-name-text">UI Design</div>
                <div className="service-name-text">UX Design</div>
                <div className="service-name-text">Prototyping</div>
                <div className="service-name-text">Branding</div>
                <div className="service-name-text">HTML/CSS</div>
                <div className="service-name-text">Wireframing</div>
                <div className="service-name-text">Information Architecture</div>
                <div className="service-name-text">User Research</div>
                <div className="service-name-text">User Interviews</div>
                <div className="service-name-text">Leadership</div>
                <div className="service-name-text">Figma</div>
              </div>
            </div>
          </div>
        </section>

        <section className="testimonials-section">
          <div className="container">
            <h2 className="heading-4">On working with me</h2>
            <blockquote className="testimonial">
              <p>"Sebastian is a guru at all things UX design, consistently producing intuitive, modern, and bold designs. He is a natural problem solver in the design space so everyone went to him if they were stuck on a feature or flow. He has an arsenal of design skills including animation and graphic design. Not to mention, Seb was a design team lead, which means he managed a full team of both onshore and offshore designs reviewing and providing feedback on all of their designs... Any business would be lucky to have him."</p>
              <cite className="testimony-person">
                <img src={wifeImage} alt="Lana Kinney" />
                <div>
                  <h5>Progress Osawemen</h5>
                  <span>MANAGING DIRECTOR AT OSAMEDIC</span>
                </div>
              </cite>
            </blockquote>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>Copyright © 2024 OSAMEDIC Diagnostic. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
