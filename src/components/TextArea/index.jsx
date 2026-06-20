import FormHelperText from "@mui/material/FormHelperText";
import { styled } from "@mui/material/styles";
import React, { memo, useCallback } from "react";
import Label from "../LabelInput";
import "./style.scss";

export const CustomTextArea = styled("textarea")(({ theme, addStyles }) => ({
  transition: theme.transitions.create([
    "border-color",
    "background-color",
    "box-shadow",
  ]),
  ...addStyles,
}));

function TextArea({
  label,
  id,
  height,
  error,
  helperText,
  onChange,
  value,
  limitTextLength,
  ...allProps
}) {
  const idValue = id || "CustomInput";
  const customHeight = height && height + "px !important";

  const LabelElement = () => label && <Label htmlFor={idValue} value={label} />;

  const errorStyles = error
    ? {
        border: "1px solid #d32f2f",
        "&:focus": {
          borderColor: "#d32f2f",
        },
      }
    : {};

  return (
    <div>
      <div className="textarea-container">
        <LabelElement />
        <CustomTextArea
          className="custom-textarea"
          addStyles={{
            minHeight: customHeight,
            resize: "vertical",

            ...errorStyles,
          }}
          id={idValue}
          {...allProps}
          value={value}
          onChange={useCallback(onChange, [onChange])}
        />

        {limitTextLength && <div className="limit-text">{limitTextLength}</div>}
      </div>
      {error && helperText && (
        <FormHelperText error={Boolean(error)}>{helperText}</FormHelperText>
      )}
    </div>
  );
}

export default memo(TextArea);
