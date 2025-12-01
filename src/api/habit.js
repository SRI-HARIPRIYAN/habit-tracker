import axios from "axios";
import backendurl from "./Constanceapi";

export const createHabit = async (habitData) => {
  try {
    const response = await axios.post(`${backendurl}/api/habits`, habitData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data; // success data
  } catch (error) {
    console.error("Error creating habit:", error);
    throw error;
  }
};

