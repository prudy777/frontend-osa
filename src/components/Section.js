import PropTypes from "prop-types";
import styles from "./Section.module.css";

const Section = ({ className = "" }) => {
  return (
    <div className={[styles.section, className].join(" ")}>
      <div className={styles.container}>
        <div className={styles.container1}>
          <div className={styles.container2}>
            <div className={styles.container3}>
              <div className={styles.margin}>
                <div className={styles.container4}>
                  <div className={styles.container5}>
                    <div className={styles.websiteDesignedWith}>
                      Website designed with the B12 website builder. Create your
                      own website today.
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.margin1}>
                <div className={styles.container6}>
                  <div className={styles.link}>
                    <a className={styles.startForFree}>Start for free</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.container7}>
          <div className={styles.background} />
          <div className={styles.background1} />
        </div>
      </div>
    </div>
  );
};

Section.propTypes = {
  className: PropTypes.string,
};

export default Section;
