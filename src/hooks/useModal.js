import { useState } from "react";

/**
 * @typedef {boolean} openModal - State of the modal (open/close)
 * @typedef {Function} handleOpen - Function to open modal
 * @typedef {Function} handleClose - Function to close modal
 *
 * @returns {[openModal, handleOpen, handleClose]} useModalType
 */
const useModal = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return [openModal, handleOpenModal, handleCloseModal];
};

export default useModal;
