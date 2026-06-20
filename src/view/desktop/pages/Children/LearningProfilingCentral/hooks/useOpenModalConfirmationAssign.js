import { useState } from "react";

const useOpenModalConfirmationAssign = () => {
  const [isOpenModalConfirmation, setIsOpenModalConfirmation] = useState(false);

  const handleOpenModalConfirmation = () => {
    setIsOpenModalConfirmation(true);
  };

  const handleCloseModalConfirmation = () => {
    setIsOpenModalConfirmation(false);
  };

  return {
    isOpenModalConfirmation,
    handleOpenModalConfirmation,
    handleCloseModalConfirmation,
  };
};

export default useOpenModalConfirmationAssign;
