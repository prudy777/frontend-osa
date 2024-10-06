import PropTypes from "prop-types";
import styles from "./Section1.module.css";
import { Link } from "react-router-dom";

const Section1 = ({ className = "" }) => {
  return (
    <div className={[styles.section, className].join(" ")}>
      <div className={styles.container}>
        <div className={styles.container1}>
          <div className={styles.container2}>
            <div className={styles.link}>
              <a
                className={styles.osamedicRecords}
                href="/"
                target="_blank"
              >
                Osamedic Records
              </a>
            </div>
            <div className={styles.navMain}>
              <div className={styles.list}>
                <div className={styles.itemmargin}>
                  <div className={styles.item}>
                    <div className={styles.link1}>
                      <Link to='/' className={styles.home}>Home</Link>
                    </div>
                  </div>
                </div>
                <div className={styles.itemmargin}>
                  <div className={styles.item}>
                    <div className={styles.link1}>
                      <Link to="/profile" className={styles.about}>About</Link>
                    </div>
                  </div>
                </div>
                <div className={styles.itemmargin}>
                  <div className={styles.item}>
                    <div className={styles.link1}>
                      <Link to='/register' className={styles.services}>Services</Link>
                    </div>
                  </div>
                </div>
                <div className={styles.itemmargin3}>
                  <button className={styles.item3}>
                    <div className={styles.link4}>
                      <Link
                        className={styles.contact}
                        href="https://osamedic-records.b12sites.com/index#contact"
                        target="_blank"
                      >
                        Contact
                      </Link>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Section1.propTypes = {
  className: PropTypes.string,
};

export default Section1;
