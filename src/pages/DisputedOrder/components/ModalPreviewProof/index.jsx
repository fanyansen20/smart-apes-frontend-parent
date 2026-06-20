// Component
import Dialog from "../../../../components/Dialog";

// styles
import classes from "./_ModalPreviewProof.module.scss";

const ModalPreviewProof = ({ open, closeModal, filePreview }) => {
  return (
    <Dialog
      open={open}
      fullWidth
      disableDivider
      title="Preview"
      onClose={closeModal}
    >
      <div className={classes.previewContainer}>
        {filePreview?.type === "image" && (
          <img src={filePreview.url} alt="image Proof" />
        )}
        {filePreview?.type === "video" && (
          <video
            controls="controls"
            preload="metadata"
            src={filePreview.url}
            alt="video Proof"
          />
        )}
      </div>
    </Dialog>
  );
};

export default ModalPreviewProof;
