import React, { Fragment } from "react";

// assets
import classes from "./_DetailMiSummary.module.scss";

// component
import { SubHeaderContent } from "../../../../../../../../components/TypographySummaryTest";

/**
 * @param {{
 * title : string
 * briefSummary : string
 * tableSummary : {
 *  firstRow:string
 *  secondRow:string
 * }[]
 *  }} props
 * @returns
 */

const DetailMiSummary = ({ title, briefSummary, tableSummary }) => {
  return (
    <div className={classes.containerDetailMiSummary}>
      <SubHeaderContent subTitle={title} />

      <p className={classes.descriptionSummary}>{briefSummary}</p>

      <div className={classes.cardKeyCharacteristics}>
        <div className={classes.leftBarTitle}>
          <p>Key Characteristics</p>
        </div>
        <div className={classes.tableSummary}>
          {tableSummary.map((value, key) => (
            <Fragment key={key}>
              <p className={classes.titleSummary}>{value.firstRow}</p>
              <p className={classes.contentSummary}>{value.secondRow}</p>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailMiSummary;
