import React, { useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { loginUser } from "../services/api";
import { AuthContext } from "../contexts/AuthContext";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext);

  const handleLogin = async () => {
    // Trim whitespace from inputs
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    // Validation
    if (!trimmedEmail || !trimmedPassword) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const data = await loginUser(trimmedEmail, trimmedPassword);

      if (data && data.token) {
        await AsyncStorage.setItem("token", data.token);

        if (data.user) {
          await AsyncStorage.setItem("user", JSON.stringify(data.user));
          setUser(data.user);
        }
      } else {
        Alert.alert("Login Failed", "No token received from server.");
      }
    } catch (err) {
      const msg = (err && err.message) || String(err) || "An unexpected error occurred";
      let errorMessage = "An unexpected error occurred";

      if (msg.includes("Incorrect email or password")) {
        errorMessage = "Invalid email or password. Please try again.";
      } else if (msg.toLowerCase().includes("network")) {
        errorMessage = "Network error. Please check your internet connection.";
      } else if (msg.toLowerCase().includes("timeout")) {
        errorMessage = "Request timed out. Please try again.";
      } else {
        errorMessage = msg;
      }

      Alert.alert("Login Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/k8.jpeg")}
        style={styles.background}
        resizeMode="cover"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <View style={styles.overlay}>
            <Text style={styles.brand}>PRUCIA</Text>

            <TextInput
              placeholder="Email"
              placeholderTextColor="#ccc"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              textContentType="emailAddress"
              autoComplete="email"
            />

            <TextInput
              placeholder="Password"
              placeholderTextColor="#ccc"
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="password"
              autoComplete="password"
            />

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text style={styles.link}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.link}>Don't have an account? Sign up</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "center",
  },
  keyboardView: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    margin: 20,
    borderRadius: 12,
  },
  brand: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#222",
    color: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#ff6f61",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonDisabled: {
    backgroundColor: "#ff6f6180",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    color: "#ccc",
    textAlign: "center",
    marginTop: 10,
    textDecorationLine: "underline",
  },
});
