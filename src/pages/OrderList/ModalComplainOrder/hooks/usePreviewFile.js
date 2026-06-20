import { useState } from "react";
import useNotification from "../../../../hooks/useNotification";

const usePreviewFile = ({ maxFileSize = 2097152 }) => {
  const [_msg, sendNotification] = useNotification();

  const [preview, setPreview] = useState(null);
  const maxSizeInMb = Math.round(maxFileSize / 1048576);

  function previewFile(e, callback) {
    const reader = new FileReader();
    const selectedFile = e.target.files[0];
    const sizeFile = e.target.files[0].size;

    if (sizeFile > maxFileSize) {
      sendNotification({
        msg: `File size exceeds limit ${maxSizeInMb} mb`,
        variant: "error",
      });
      return false;
    }

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }

    reader.onload = (readerEvent) => {
      setPreview(readerEvent.target.result);
    };

    if (callback) {
      callback(e.target.name, selectedFile);
    }
  }

  return { previewFile, preview, setPreview };
};

export default usePreviewFile;
