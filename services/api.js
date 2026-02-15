import axios from "axios";
const API_URL = "https://api-1-95eq.onrender.com/api";

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }
  return await response.json();
};

export const registerUser = async (
  firstName,
  lastName,
  email,
  password,
  passwordConfirm,
  state,
  country
) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
      state,
      country,
    }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Registration failed");
  }
  return await response.json();
};

//AI ASSISTANCE
export const askGemini = async (prompt) => {
  const response = await axios.post(
    "https://api-1-95eq.onrender.com/ai/chat/gemini",
    { prompt }
  );
  return response.data.response;
};
