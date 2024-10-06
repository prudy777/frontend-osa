import PropTypes from "prop-types";
import styles from "./Section3.module.css";

const Section3 = ({ className = "" }) => {
  return (
    <section className={[styles.section, className].join(" ")}>
      <div className={styles.container}>
        <div className={styles.container1}>
          <div className={styles.container2}>
            <div className={styles.margin}>
              <div className={styles.container3}>
                <div className={styles.container4}>
                  <div className={styles.dataAtYour}>
                    Data at your fingertips
                  </div>
                </div>
                <div className={styles.container5}>
                  <h2 className={styles.transformingSalesInsights}>
                    Transforming sales insights
                  </h2>
                </div>
                <div className={styles.container6}>
                  <div className={styles.osamedicRecordsEmpowersContainer}>
                    <p className={styles.osamedicRecordsEmpowers}>
                      Osamedic Records empowers you with a dynamic
                    </p>
                    <p className={styles.osamedicRecordsEmpowers}>
                      dashboard platform that visualizes sales data in real-
                    </p>
                    <p className={styles.osamedicRecordsEmpowers}>
                      time. Our tools, including GraphQL bar charts and
                    </p>
                    <p className={styles.osamedicRecordsEmpowers}>
                      customizable tables, help you track performance over
                    </p>
                    <p className={styles.osamedicRecordsEmpowers}>
                      weeks, months, and years. Based in Lagos, we strive to
                    </p>
                    <p className={styles.osamedicRecordsEmpowers}>
                      make data accessible and actionable, ensuring you
                    </p>
                    <p className={styles.osamedicRecordsEmpowers}>
                      stay informed and ahead in your business decisions.
                    </p>
                    <p className={styles.osamedicRecordsEmpowers}>
                      Experience the future of data management with us.
                    </p>
                  </div>
                </div>
                <div className={styles.container7}>
                  <div className={styles.link}>
                    <a
                      className={styles.getInTouch}
                      href="https://osamedic-records.b12sites.com/index#contact"
                      target="_blank"
                    >
                      Get in touch
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.margin1}>
              <div className={styles.container8}>
                <img
                  className={styles.figureIcon}
                  loading="lazy"
                  alt=""
                  src="/figure@2x.png"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Section3.propTypes = {
  className: PropTypes.string,
};

export default Section3;
