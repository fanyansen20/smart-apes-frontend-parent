// react
import { memo } from "react";

// assets
import { ReactComponent as ArrowRight } from "../../../assets/icons/arrow-right.svg";

// mui material
import { Button, Stack } from "@mui/material";

// helper
import Joyride from "react-joyride";

// styles
import classes from "./_TourPage.module.scss";

// components
import PrimaryButton from "../../PrimaryButton";

const TooltipCustom = ({
  disablePageTour,
  closeTourPage,
  isLastStep,
  skipProps,
  continuous,
  step,
  isIcon,
  primaryProps: { onClick, title },
}) => {
  const continuesHandler = (e) => {
    onClick(e);
    if (isLastStep) {
      closeTourPage();
    }
  };

  return (
    <Stack gap={2}>
      <div className={classes.containerTooltip}>
        {step.title && <h6>{step.title}</h6>}
        {step.content && <p>{step.content}</p>}
      </div>

      <Stack direction="row" justifyContent="space-between">
        {disablePageTour && (
          <Button onClick={disablePageTour} className={classes.btnDontShow}>
            Don’t Show this Again
          </Button>
        )}

        {continuous && (
          <Button onClick={closeTourPage} className={classes.btnSkip}>
            {skipProps.title}
          </Button>
        )}

        <div>
          {continuous && (
            <PrimaryButton
              endIcon={isIcon && <ArrowRight width="1rem" height="1rem" />}
              onClick={continuesHandler}
            >
              {title}
            </PrimaryButton>
          )}
        </div>
      </Stack>
    </Stack>
  );
};

/**
 *
 * @param {{
 * steps : object[]
 * run : boolean
 * isIcon : boolean
 * disablePageTour :() => {}
 * closeTourPage :() => {}
 * }} props
 * @returns
 */

const TourPage = ({
  steps,
  run,
  disablePageTour,
  closeTourPage,
  isIcon,
  ...anotherProps
}) => {
  return (
    <Joyride
      {...anotherProps}
      run={run}
      steps={steps}
      tooltipComponent={(prevProps) =>
        TooltipCustom({
          isIcon,
          disablePageTour,
          closeTourPage,
          ...prevProps,
        })
      }
    />
  );
};

export default memo(TourPage);
