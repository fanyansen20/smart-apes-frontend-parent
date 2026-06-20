// Assets
import { ReactComponent as FlagIcon } from "../../../../assets/icons/flag.svg";

// interface props = {
//    type:  ['activeButton', 'activeFalseButton', 'answeredButton','answeredFalseButton', 'unansweredButton']
//    isFlagged: [true, false]
// }

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
        className={`btn__navigation ${
          type === "activeButton" ? "btn__active" : "btn__active__false"
        }`}
      >
        {isFlagged && <FlagIcon className="navigation__flag" />}
        <p>{number}</p>
      </div>
    );
  } else {
    return (
      <div
        onClick={onClick}
        className={`btn__navigation ${
          type === "answeredButton" ? "btn__answered" : ""
        } ${type === "answeredFalseButton" ? "btn__answered__false" : ""}`}
      >
        {isFlagged && <FlagIcon className="navigation__flag" />}
        <p>{number}</p>
      </div>
    );
  }
};

export default NavigationButton;
