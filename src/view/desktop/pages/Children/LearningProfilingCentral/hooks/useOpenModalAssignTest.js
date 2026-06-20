// react
import { useState } from "react";

const useOpenModalAssignTest = () => {
  const [isOpenModalTest, setIsOpenModalTest] = useState(false);

  const handleOpenModalTest = () => {
    setIsOpenModalTest(true);
  };

  const handleCloseModalTest = () => {
    setIsOpenModalTest(false);
  };

  return { isOpenModalTest, handleOpenModalTest, handleCloseModalTest };
};

export default useOpenModalAssignTest;
