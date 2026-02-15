import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const response = await fetch(
            "https://api-jsrm.onrender.com/api/profile",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            await AsyncStorage.removeItem("token");
            setUser(null);
          }
        }
      } catch (e) {
        console.error("Load user error:", e);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Registration function
  const register = async ({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    state,
    country,
  }) => {
    const response = await fetch(
      "https://api-jsrm.onrender.com/api/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          state,
          country,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Registration failed");
    }

    return await response.json();
  };

  // Login function
  const login = async (email, password) => {
    const response = await fetch(
      "https://api-jsrm.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login failed");
    }

    const data = await response.json();
    await AsyncStorage.setItem("token", data.token);
    setUser(data.user);
    return data.user;
  };

  // Logout function
  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, register, login, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
