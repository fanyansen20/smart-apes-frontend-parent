// Assets
import { ReactComponent as Footer } from "../../../../../../../assets/images/footer-summary-test.svg";
// import { ReactComponent as Footer } from "../../../assets/images/footer-summary-test.svg";

// styles
import classes from "./_FooterSummaryTest.module.scss";

const FooterSummaryTest = () => {
  const year = new Date().getFullYear();

  return (
    <div className={classes.containerFooterSummaryTest}>
      <Footer className={classes.imageFooterSummaryTest} />
      <div className={classes.textFooterSummaryTest}>
        Copyright {year} | Privacy Policy | Terms
      </div>
    </div>
  );
};

export default FooterSummaryTest;
