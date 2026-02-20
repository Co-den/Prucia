import axios from "axios";
const API_URL = "https://api-jsrm.onrender.com/api";

export const loginUser = async (email, password) => {
  // Trim and normalize inputs to prevent whitespace issues
  const trimmedEmail = email.trim().toLowerCase();
  const trimmedPassword = password.trim();

  console.log("=== LOGIN API CALL ===");
  console.log("Original email:", email);
  console.log("Trimmed email:", trimmedEmail);
  console.log("Original password length:", password.length);
  console.log("Trimmed password length:", trimmedPassword.length);
  console.log("API URL:", `${API_URL}/auth/login`);

  const requestBody = {
    email: trimmedEmail,
    password: trimmedPassword,
  };

  console.log("Request body:", JSON.stringify(requestBody));

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);

    const responseData = await response.json();
    console.log("Response data:", JSON.stringify(responseData));

    if (!response.ok) {
      console.error("❌ Login failed:", responseData);
      throw new Error(responseData.message || "Login failed");
    }

    console.log("✅ Login successful");
    return responseData;
  } catch (error) {
    console.error("❌ Login error:", error);
    throw error;
  }
};

export const registerUser = async (
  firstName,
  lastName,
  email,
  password,
  passwordConfirm,
  state,
  country,
) => {
  console.log("=== REGISTER API CALL ===");
  console.log("Email:", email);
  console.log("Password length:", password.length);

  const requestBody = {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: email.trim().toLowerCase(),
    password: password.trim(),
    passwordConfirm: passwordConfirm.trim(),
    state: state.trim(),
    country: country.trim(),
  };

  console.log("Request body:", JSON.stringify(requestBody));

  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    console.log("Response status:", response.status);

    const responseData = await response.json();
    console.log("Response data:", JSON.stringify(responseData));

    if (!response.ok) {
      console.error("❌ Registration failed:", responseData);
      throw new Error(responseData.message || "Registration failed");
    }

    console.log("✅ Registration successful");
    return responseData;
  } catch (error) {
    console.error("❌ Registration error:", error);
    throw error;
  }
};

//AI ASSISTANCE
export const askGemini = async (prompt) => {
  const response = await axios.post(
    "https://api-1-95eq.onrender.com/ai/chat/gemini",
    { prompt },
  );
  return response.data.response;
};
