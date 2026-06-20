import { API } from "../../../config/api";

export const getFreeAssessment = async (childrenId) => {
  try {
    const res = await API.get(`/children/${childrenId}/free-assessments`);

    return res.data;
  } catch (error) {
    throw new Error(error.response.message);
  }
};
