import axios from "axios";
import backendurl from "./Constanceapi";

// 👉 Login Redirect (Google OAuth)
export const loginWithGoogle = () => {
  window.location.href = `${backendurl}/oauth2/authorization/google`;
};

// 👉 Fetch logged-in user (Spring Boot session cookie)
export const fetchUser = async () => {
  try {
    const response = await axios.get(`${backendurl}/api/auth/me`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return null; // if not logged in
  }
};
