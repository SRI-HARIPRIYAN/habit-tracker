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

export async function updateHabitStatus(habitId, newStatus) {
  return axios.put(
    `${backendurl}/api/habits/${habitId}`,
    { status: newStatus },
    { withCredentials: true }
  );
}

export function getAllHabits() {
  return axios.get(`${backendurl}/api/habits`, {
    withCredentials: true,
  });
}

export function deleteHabit(habitId) {
  return axios.delete(`${backendurl}/api/habits/${habitId}`, {
    withCredentials: true,
  });
}

export function getTodayHabits() {
  return axios.get(`${backendurl}/api/habits/today`, {
    withCredentials: true,
  });
}


