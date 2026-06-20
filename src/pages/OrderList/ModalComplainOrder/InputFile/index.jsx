import { useRef } from "react";

// hooks
import usePreviewFile from "../hooks/usePreviewFile";

// Component
import LabelInput from "../../../../components/LabelInput";

// Mui material
import { FormHelperText, Grid, IconButton } from "@mui/material";

// styles
import classes from "./_InputFile.module.scss";

// Assets
import CancelIcon from "@mui/icons-material/Cancel";
import { ReactComponent as UploadImage } from "../../../../assets/icons/upload-image.svg";
import { ReactComponent as UploadVideo } from "../../../../assets/icons/upload-video.svg";

const InputFile = ({ inputFileProof, error, helperText }) => {
  const videoProof = useRef(null);
  const imageProof = useRef(null);

  const {
    previewFile: previewFileVideo,
    preview: previewVideo,
    setPreview: clearPreviewVideo,
  } = usePreviewFile({ maxFileSize: 10485760 });
  const {
    previewFile: previewFileImage,
    preview: previewImage,
    setPreview: clearPreviewImage,
  } = usePreviewFile({ maxFileSize: 2097152 });

  function clearInputFile({ targetName, clearPreview, refName }) {
    inputFileProof(targetName, "");
    clearPreview(null);
    refName.current.value = "";
  }

  return (
    <>
      <LabelInput value="Photo/Video Proof" />

      <Grid container gap={1} direction={"row"}>
        <Grid item xs={5.8} md={4} className={classes.containerInputFile}>
          {previewVideo && (
            <IconButton
              onClick={() =>
                clearInputFile({
                  targetName: "fileProof[videoProof]",
                  clearPreview: clearPreviewVideo,
                  refName: videoProof,
                })
              }
              className={classes.iconClose}
            >
              <CancelIcon color="inherit" />
            </IconButton>
          )}

          <div
            className={classes.uploadFile}
            onClick={() => videoProof.current.click()}
          >
            <input
              name="fileProof[videoProof]"
              ref={videoProof}
              accept="video/*"
              onChange={(e) => previewFileVideo(e, inputFileProof)}
              type="file"
              hidden
            />

            {!previewVideo ? (
              <Grid container direction="column" gap={1} alignItems="center">
                <UploadVideo />
                <p>Upload Video</p>
                <p>Max. Size 10MB</p>
              </Grid>
            ) : (
              <video
                className={classes.photo}
                controls
                src={previewVideo}
              ></video>
            )}
          </div>
        </Grid>

        <Grid item xs={5.8} md={4} className={classes.containerInputFile}>
          {previewImage && (
            <IconButton
              name="testName"
              onClick={() =>
                clearInputFile({
                  targetName: "fileProof[imageProof]",
                  clearPreview: clearPreviewImage,
                  refName: imageProof,
                })
              }
              className={classes.iconClose}
            >
              <CancelIcon color="inherit" />
            </IconButton>
          )}

          <div
            className={classes.uploadFile}
            onClick={() => imageProof.current.click()}
          >
            <input
              name="fileProof[imageProof]"
              ref={imageProof}
              accept="image/*"
              onChange={(e) => previewFileImage(e, inputFileProof)}
              type="file"
              hidden
            />

            {previewImage != null ? (
              <img className={classes.photo} src={previewImage} alt="" />
            ) : (
              <Grid container direction="column" gap={1} alignItems="center">
                <UploadImage />
                <p>Upload Photo</p>
                <p>Max. Size 2MB</p>
              </Grid>
            )}
          </div>
        </Grid>

        <Grid item md={4} />
      </Grid>

      {/* error text */}
      {error && helperText && (
        <FormHelperText error={Boolean(error)}>{helperText}</FormHelperText>
      )}
    </>
  );
};

export default InputFile;
