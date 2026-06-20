// styles
import classes from "./_IllustrationBox.module.scss";

/**
 *
 * @param {{
 * illustration : ReactComponentElement
 * title : string
 * subTitle : string
 * subTitle2 : string
 * }} props
 * @returns
 */

const IllustrationBox = ({ illustration, title, subTitle, subTitle2 }) => {
  return (
    <div className={classes.container}>
      {illustration && illustration}
      <div className={classes.titleSection}>
        {title && <h3>{title}</h3>}
        <div>
          {subTitle && <p>{subTitle}</p>}
          {subTitle2 && <p>{subTitle2}</p>}
        </div>
      </div>
    </div>
  );
};

export default IllustrationBox;
