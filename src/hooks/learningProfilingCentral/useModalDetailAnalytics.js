import { useState } from "react";

const useModalDetailAnalytics = () => {
  const [selectedDetailDescription, setSelectedDetailDescription] =
    useState(null);

  /**
   * @param {'typology' | 'keyLearningDimension' | 'sensory' | 'multipleIntelligence' | 'careerInterest'} value
   */
  const handleSelectDetail = (value) => {
    setSelectedDetailDescription(value);
  };

  const closeModal = () => {
    setSelectedDetailDescription(null);
  };

  return { selectedDetailDescription, handleSelectDetail, closeModal };
};

export default useModalDetailAnalytics;
