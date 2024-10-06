import { useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./Section6.module.css";

const Section6 = ({ className = "" }) => {
  const onLinkContainerClick = useCallback(() => {
    window.open("https://www.b12.io/ai-web-design/");
  }, []);

  return (
    <footer className={[styles.section, className].join(" ")}>
      <div className={styles.container}>
        <div className={styles.container1}>
          <div className={styles.container2}>
            <div className={styles.container3}>
              <div className={styles.container2}>
                <div className={styles.navSecondary}>
                  <div className={styles.list}>
                    <div className={styles.itemmargin}>
                      <div className={styles.item}>
                        <div className={styles.link}>
                          <a className={styles.services}>Services</a>
                        </div>
                      </div>
                    </div>
                    <div className={styles.itemmargin1}>
                      <div className={styles.item}>
                        <div className={styles.link}>
                          <a
                            className={styles.scheduleAppointment}
                            href="https://osamedic-records.b12sites.com/scheduling"
                            target="_blank"
                          >
                            Schedule appointment
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className={styles.itemmargin1}>
                      <div className={styles.item}>
                        <div className={styles.link}>
                          <a
                            className={styles.scheduleAppointment}
                            href="https://osamedic-records.b12sites.com/intake-form"
                            target="_blank"
                          >
                            Complete intake
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className={styles.itemmargin1}>
                      <div className={styles.item}>
                        <div className={styles.link}>
                          <a className={styles.contact}>Contact</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.webDesign}>
            <div className={styles.link4} onClick={onLinkContainerClick}>
              <div className={styles.webDesignByWrapper}>
                <a
                  className={styles.webDesignBy}
                  href="/"
                  target="_blank"
                >{`Web design by Osamedic LTD`}</a>
              </div>
              <div className={styles.horizontalDivider} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

Section6.propTypes = {
  className: PropTypes.string,
};

export default Section6;
