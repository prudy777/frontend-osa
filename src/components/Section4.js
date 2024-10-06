import { useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./Section4.module.css";

const Section4 = ({ className = "" }) => {
  const onLinkReadMoreClick = useCallback(() => {
    window.open("https://osamedic-records.b12sites.com/sales-dashboard");
  }, []);

  const onLinkReadMoreClick1 = useCallback(() => {
    window.open(
      "https://osamedic-records.b12sites.com/data-visualization-tools"
    );
  }, []);

  const onLinkReadMoreClick2 = useCallback(() => {
    window.open(
      "https://osamedic-records.b12sites.com/report-retrieval-widgets"
    );
  }, []);

  return (
    <section className={[styles.section, className].join(" ")}>
      <div className={styles.container}>
        <div className={styles.container1}>
          <div className={styles.containerInner}>
            <div className={styles.ourPlatformFeaturesParent}>
              <div className={styles.ourPlatformFeatures}>
                Our platform features
              </div>
              <div className={styles.container2}>
                <h2 className={styles.unleashingDataPotential}>
                  Unleashing data potential
                </h2>
              </div>
            </div>
          </div>
          <div className={styles.list}>
            <div className={styles.itemmargin}>
              <div className={styles.item}>
                <div
                  className={styles.linkReadMore}
                  onClick={onLinkReadMoreClick}
                >
                  <img
                    className={styles.figureIcon}
                    loading="lazy"
                    alt=""
                    src="/figure-1@2x.png"
                  />
                  <div className={styles.container3}>
                    <div className={styles.container4}>
                      <a
                        className={styles.salesDashboard}
                        href="https://osamedic-records.b12sites.com/sales-dashboard"
                        target="_blank"
                      >
                        Sales dashboard 
                      </a>
                      <div className={styles.svg}>
                        <img
                          className={styles.frameIcon}
                          loading="lazy"
                          alt=""
                          src="/frame.svg"
                        />
                      </div>
                    </div>
                    <div className={styles.container5}>
                      <a
                        className={styles.visualizeYourSalesContainer}
                        href="https://osamedic-records.b12sites.com/sales-dashboard"
                        target="_blank"
                      >
                        <p className={styles.visualizeYourSales}>
                          Visualize your sales data like
                        </p>
                        <p className={styles.visualizeYourSales}>
                          never before.
                        </p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.itemmargin1}>
              <div className={styles.item}>
                <div
                  className={styles.linkReadMore}
                  onClick={onLinkReadMoreClick1}
                >
                  <img
                    className={styles.figureIcon}
                    loading="lazy"
                    alt=""
                    src="/figure-2@2x.png"
                  />
                  <div className={styles.container3}>
                    <div className={styles.container7}>
                      <a
                        className={styles.salesDashboard}
                        href="https://osamedic-records.b12sites.com/data-visualization-tools"
                        target="_blank"
                      >
                        Data visualization tools 
                      </a>
                      <div className={styles.svg}>
                        <img
                          className={styles.frameIcon}
                          loading="lazy"
                          alt=""
                          src="/frame.svg"
                        />
                      </div>
                    </div>
                    <div className={styles.container5}>
                      <a
                        className={styles.visualizeYourSalesContainer}
                        href="https://osamedic-records.b12sites.com/data-visualization-tools"
                        target="_blank"
                      >
                        <p className={styles.visualizeYourSales}>
                          Transform complex data into
                        </p>
                        <p className={styles.visualizeYourSales}>
                          clear visuals.
                        </p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.itemmargin1}>
              <div className={styles.item}>
                <div
                  className={styles.linkReadMore}
                  onClick={onLinkReadMoreClick2}
                >
                  <img
                    className={styles.figureIcon}
                    loading="lazy"
                    alt=""
                    src="/figure-3@2x.png"
                  />
                  <div className={styles.container3}>
                    <div className={styles.container10}>
                      <a
                        className={styles.salesDashboard}
                        href="https://osamedic-records.b12sites.com/report-retrieval-widgets"
                        target="_blank"
                      >
                        Report retrieval widgets 
                      </a>
                      <div className={styles.svg}>
                        <img
                          className={styles.frameIcon}
                          loading="lazy"
                          alt=""
                          src="/frame.svg"
                        />
                      </div>
                    </div>
                    <div className={styles.container5}>
                      <a
                        className={styles.visualizeYourSalesContainer}
                        href="https://osamedic-records.b12sites.com/report-retrieval-widgets"
                        target="_blank"
                      >
                        <p className={styles.visualizeYourSales}>
                          Quickly access detailed
                        </p>
                        <p className={styles.visualizeYourSales}>
                          reports with ease.
                        </p>
                      </a>
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

Section4.propTypes = {
  className: PropTypes.string,
};

export default Section4;
