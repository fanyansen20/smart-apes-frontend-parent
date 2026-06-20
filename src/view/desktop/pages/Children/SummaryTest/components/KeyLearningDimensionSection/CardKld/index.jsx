import React from "react";

// assets
import { ReactComponent as CheckedCircle } from "../../../../../../../../assets/images/ChildrenDashboard/summary-test/check-circle-filled.svg";
import classes from "./_CardKld.module.scss";

// constant
import { IconImage } from "./IconHeaderConstant";

// component
import { SubHeaderContent } from "../../../../../../../../components/TypographySummaryTest";

/**
 *
 * @param {{
 * type : 'list' | 'paragraph'
 * dataSummary : string[]
 * }} param0
 * @returns
 */

export const ContentKldCard = ({ dataSummary, type }) => {
  if (type === "list") {
    return (
      <div className={classes.containerText}>
        {dataSummary?.map((value, key) => (
          <div key={key} className={classes.contentList}>
            <div className={classes.iconCheckedCircle}>
              <CheckedCircle />
            </div>
            <p>{value}</p>
            <br />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={classes.containerText}>
      {dataSummary.map((value, key) => (
        <div key={key} className={classes.containerParagraph}>
          <p>{value}</p>
        </div>
      ))}
    </div>
  );
};

/**
 * @typedef {{
 * header : string
 * body : string[]
 * type : 'list' | 'paragraph'
 * }} SummaryData
 */

/**
 * @param {{
 * summaryData : [SummaryData]
 * }} props
 * @returns
 */

const CardKld = ({ summaryData }) => {
  return (
    <div className={classes.containerCardKld}>
      <SubHeaderContent subTitle={summaryData.header} />

      <div className={classes.contentCardKld}>
        <div className={classes.titleContent}>
          {IconImage[summaryData?.header]}
          {summaryData?.subheader}
        </div>

        <ContentKldCard
          type={summaryData?.type}
          dataSummary={summaryData?.body}
        />
      </div>
    </div>
  );
};

export default CardKld;
