import PropTypes from "prop-types";
import styles from "./FrameComponent.module.css";

const FrameComponent = ({
  className = "",
  emailAddress,
  containerPlaceholder,
}) => {
  return (
    <div className={[styles.containerWrapper, className].join(" ")}>
      <div className={styles.container}>
        <div className={styles.label}>
          <div className={styles.emailAddressContainer}>
            <span>{emailAddress}</span>
            <span className={styles.span}>*</span>
          </div>
        </div>
        <div className={styles.input}>
          <input
            className={styles.container1}
            placeholder={containerPlaceholder}
            type="text"
          />
        </div>
      </div>
    </div>
  );
};

FrameComponent.propTypes = {
  className: PropTypes.string,
  emailAddress: PropTypes.string,
  containerPlaceholder: PropTypes.string,
};

export default FrameComponent;
