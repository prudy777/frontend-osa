import { useCallback, useState, useEffect } from "react";
import FrameComponent from "./FrameComponent";
import PropTypes from "prop-types";
import styles from "./Section5.module.css";

const Section5 = ({ className = "" }) => {
  // State for form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  // State for contact information
  const [contactInfo, setContactInfo] = useState({
    email: "",
    location: "",
    hours: [],
  });

  // Fetch contact information from the backend when the component mounts
  useEffect(() => {
    fetch("http://localhost:4000/contact-info")
      .then((response) => response.json())
      .then((data) => {
        setContactInfo(data);
      })
      .catch((error) => {
        console.error("Error fetching contact information:", error);
      });
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare data for submission
    const formData = {
      name,
      email,
      phone,
      message,
      consent,
    };

    // Send form data to backend
    fetch("http://localhost:4000/submit-contact-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Form submitted successfully!");
          // Clear the form fields after submission
          setName("");
          setEmail("");
          setPhone("");
          setMessage("");
          setConsent(false);
        } else {
          alert("Failed to submit the form. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error submitting the form:", error);
        alert("An error occurred. Please try again.");
      });
  };

  const onLinkEmailUsAtAilemendaniClick = useCallback(() => {
    window.location.href = `mailto:${contactInfo.email}`;
  }, [contactInfo]);

  const onLinkOurLocationAtLagosClick = useCallback(() => {
    window.open("https://www.google.com/maps/place/Lagos+LA+NG");
  }, []);

  return (
    <section className={[styles.section, className].join(" ")}>
      <div className={styles.container}>
        <div className={styles.container1}>
          <div className={styles.container2}>
            <div className={styles.container3}>
              <div className={styles.getInTouchParent}>
                <div className={styles.getInTouch}>Get in touch</div>
                <div className={styles.container4}>
                  <h2 className={styles.wedLoveToContainer}>
                    <p className={styles.wedLoveTo}>We'd love to hear from</p>
                    <p className={styles.wedLoveTo}>you</p>
                  </h2>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className={styles.container5}>
                    <div className={styles.label}>
                      <div className={styles.name}>
                        <span>{`Name `}</span>
                        <span className={styles.span}>*</span>
                      </div>
                    </div>
                    <div className={styles.input}>
                      <input
                        className={styles.container6}
                        placeholder="Jane Smith"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <FrameComponent
                    emailAddress="Email address "
                    containerPlaceholder="email@website.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <FrameComponent
                    emailAddress="Phone number "
                    containerPlaceholder="555-555-5555"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <div className={styles.messageParent}>
                    <div className={styles.name}>Message</div>
                    <textarea
                      className={styles.textarea}
                      rows={6}
                      cols={20}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                  <div className={styles.labelWrapper}>
                    <div className={styles.label1}>
                      <input
                        className={styles.agreementBorder}
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                      />
                      <div className={styles.iAllowThisContainer}>
                        <p className={styles.wedLoveTo}>
                          I allow this website to store my submission so
                        </p>
                        <p className={styles.wedLoveTo}>
                          <span>{`they can respond to my inquiry. `}</span>
                          <span className={styles.span}>*</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <button className={styles.button} type="submit">
                    <div className={styles.submit}>Submit</div>
                  </button>
                </form>
              </div>
              <div className={styles.contactInfo}>
                <div className={styles.container18}>
                  <div className={styles.background1}>
                    <div className={styles.getInTouchGroup}>
                      <b className={styles.location}>Get in touch</b>
                      <div className={styles.contactIcons}>
                        <img
                          className={styles.svgIcon}
                          loading="lazy"
                          alt=""
                          src="/svg.svg"
                        />
                        <div
                          className={styles.linkEmailUsAtAilemendani}
                          onClick={onLinkEmailUsAtAilemendaniClick}
                        >
                          <a
                            className={styles.ailemendaniel76gmailcom}
                            href={`mailto:${contactInfo.email}`}
                            target="_blank"
                          >
                            {contactInfo.email}
                          </a>
                          <div className={styles.horizontalDivider} />
                        </div>
                      </div>
                    </div>
                    <div className={styles.getInTouchGroup}>
                      <b className={styles.location}>Location</b>
                      <div className={styles.svgParent}>
                        <img
                          className={styles.svgIcon}
                          loading="lazy"
                          alt=""
                          src="/svg-1.svg"
                        />
                        <div
                          className={styles.linkOurLocationAtLagos}
                          onClick={onLinkOurLocationAtLagosClick}
                        >
                          <a
                            className={styles.lagosLaNg}
                            href="https://www.google.com/maps/place/Lagos+LA+NG"
                            target="_blank"
                          >
                            {contactInfo.location}
                          </a>
                          <div className={styles.horizontalDivider1} />
                        </div>
                      </div>
                    </div>
                    <div className={styles.container19}>
                      <div className={styles.label}>
                        <b className={styles.location}>Hours</b>
                      </div>
                      <div className={styles.orderedListWorkingHours}>
                        {contactInfo.hours.map((hour, index) => (
                          <div className={styles.item} key={index}>
                            <div className={styles.monday}>{hour.day}</div>
                            <div className={styles.am}>{hour.open}</div>
                            <div className={styles.div}>–</div>
                            <div className={styles.pm}>{hour.close}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Section5.propTypes = {
  className: PropTypes.string,
};

export default Section5;
