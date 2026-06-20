// Assets
import { ReactComponent as FlagIcon } from "../../../../../../assets/icons/flag.svg";

// Style
import classes from "./_NavigationButton.module.scss";

const NavigationButton = ({
  type = "unansweredBButton",
  isFlagged = false,
  number = 0,
  onClick,
}) => {
  if (type === "activeButton" || type === "activeFalseButton") {
    return (
      <div
        onClick={onClick}
        className={`${classes.btn__navigation} ${
          type === "activeButton"
            ? classes.btn__active
            : classes.btn__active__false
        }`}
      >
        {isFlagged && <FlagIcon className={classes.navigation__flag} />}
        <p>{number}</p>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`${classes.btn__navigation} ${
        type === "answeredButton" && classes.btn__answered
      } ${type === "answeredFalseButton" && classes.btn__answered__false}`}
    >
      {isFlagged && <FlagIcon className={classes.navigation__flag} />}
      <p>{number}</p>
    </div>
  );
};

export default NavigationButton;
