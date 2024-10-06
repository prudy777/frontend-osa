import PropTypes from "prop-types";
import styles from "./Section2.module.css";

const Section2 = ({ className = "" }) => {
  return (
    <div className={[styles.section, className].join(" ")}>
      <img
        className={styles.gradientimageIcon}
        loading="lazy"
        alt=""
        src="/gradientimage@2x.png"
      />
      <div className={styles.container}>
        <div className={styles.container1}>
          <div className={styles.container2}>
            <div className={styles.container3}>
              <div className={styles.container4}>
                <div className={styles.heading1}>
                  <h1 className={styles.osamedicRecords}>Osamedic Records</h1>
                </div>
                <div className={styles.container5}>
                  <div className={styles.realTimeSalesData}>
                    Real-time Sales Data Visualization and Reporting
                  </div>
                </div>
              </div>
              <div className={styles.container6}>
                <button className={styles.link}>
                  <a
                    className={styles.viewServices}
                    href="https://osamedic-records.b12sites.com/index#services"
                    target="_blank"
                  >
                    View services
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Section2.propTypes = {
  className: PropTypes.string,
};

export default Section2;
