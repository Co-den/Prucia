import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  ScrollView,
  StatusBar,
} from "react-native";

export default function ResetPasswordScreen({ route, navigation }) {
  const { email } = route.params;
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleReset = async () => {
    if (!code || !password || !confirm)
      return Alert.alert("Error", "All fields are required.");

    if (password !== confirm)
      return Alert.alert("Error", "Passwords do not match.");

    try {
      const response = await fetch(
        "https://api-jsrm.onrender.com/api/auth/resetPassword",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, code, password }),
        },
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to reset password");
      }

      Alert.alert("Success", "Password reset successfully.", [
        { text: "Login", onPress: () => navigation.replace("Login") },
      ]);
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require("../assets/k9.jpeg")}
        style={styles.background}
        resizeMode="cover"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.overlay}>
              <View style={styles.formContainer}>
                <Text style={styles.title}>Reset Your Password</Text>
                <Text style={styles.subtitle}>
                  Enter the code sent to {email}
                </Text>

                <TextInput
                  style={styles.input}
                  placeholder="Enter reset code"
                  value={code}
                  onChangeText={setCode}
                  placeholderTextColor="#999"
                  keyboardType="number-pad"
                />

                <TextInput
                  style={styles.input}
                  placeholder="New password"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                  placeholderTextColor="#999"
                  autoCapitalize="none"
                />

                <TextInput
                  style={styles.input}
                  placeholder="Confirm new password"
                  secureTextEntry
                  value={confirm}
                  onChangeText={setConfirm}
                  placeholderTextColor="#999"
                  autoCapitalize="none"
                />

                <TouchableOpacity style={styles.button} onPress={handleReset}>
                  <Text style={styles.buttonText}>Reset Password</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => navigation.goBack()}
                >
                  <Text style={styles.backButtonText}>Back to Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 40,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 20,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ff6f61",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 30,
    textAlign: "center",
    color: "#666",
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#ff6f61",
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 10,
    shadowColor: "#ff6f61",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 15,
    paddingVertical: 10,
  },
  backButtonText: {
    textAlign: "center",
    color: "#666",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
