import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Alert,
} from "react-native";
import { AuthContext } from "../contexts/AuthContext";

export default function SignupScreen({ navigation }) {
  const { register } = useContext(AuthContext);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    state: "",
    country: "",
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSignup = async () => {
    const {
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
      state,
      country,
    } = form;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !passwordConfirm ||
      !state ||
      !country
    ) {
      return Alert.alert("Error", "All fields are required.");
    }

    if (password !== passwordConfirm) {
      return Alert.alert("Error", "Passwords do not match.");
    }

    try {
      await register(form);
      Alert.alert("Success", "Account created successfully!");
      navigation.replace("Login");
    } catch (err) {
      const msg =
        (err && err.message) || String(err) || "An unexpected error occurred";
      Alert.alert("Signup Error", msg);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/k9.jpeg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Create an Account</Text>

          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.half]}
              placeholder="First Name"
              placeholderTextColor="#ddd"
              onChangeText={(text) => handleChange("firstName", text)}
            />
            <TextInput
              style={[styles.input, styles.half]}
              placeholder="Last Name"
              placeholderTextColor="#ddd"
              onChangeText={(text) => handleChange("lastName", text)}
            />
          </View>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#ddd"
            keyboardType="email-address"
            onChangeText={(text) => handleChange("email", text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#ddd"
            secureTextEntry
            onChangeText={(text) => handleChange("password", text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#ddd"
            secureTextEntry
            onChangeText={(text) => handleChange("passwordConfirm", text)}
          />

          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.half]}
              placeholder="State"
              placeholderTextColor="#ddd"
              onChangeText={(text) => handleChange("state", text)}
            />
            <TextInput
              style={[styles.input, styles.half]}
              placeholder="Country"
              placeholderTextColor="#ddd"
              onChangeText={(text) => handleChange("country", text)}
            />
          </View>

          <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.replace("Login")}>
            <Text style={styles.loginText}>Already have an account? Login</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  container: {
    paddingVertical: 40,
    paddingTop: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    alignSelf: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.1)",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  half: {
    width: "48%",
  },
  signupButton: {
    backgroundColor: "#ff6f61",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 15,
  },
  signupText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  loginText: {
    color: "#ccc",
    textAlign: "center",
    fontSize: 14,
  },
});
