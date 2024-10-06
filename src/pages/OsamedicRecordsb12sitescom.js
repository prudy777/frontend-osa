import Section1 from "../components/Section1";
import Section2 from "../components/Section2";
import Section3 from "../components/Section3";
import Section4 from "../components/Section4";
import Section5 from "../components/Section5";
import Section6 from "../components/Section6";
import styles from "./OsamedicRecordsb12sitescom.module.css";

const OsamedicRecordsb12sitescom = () => {
  return (
    <div className={styles.osamedicRecordsb12sitescom}>
      <section className={styles.frameParent}>
      <header className={styles.sectionParent}>
        </header>
        <Section1 />
        <Section2 />
      </section>
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
    </div>
  );
};

export default OsamedicRecordsb12sitescom;
