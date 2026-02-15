import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { askGemini } from "../services/api";

export default function AIAssistantScreen() {
  const [prompt, setPrompt] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef();

  const handleAsk = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const reply = await askGemini(prompt);

      setConversation((prev) => [
        ...prev,
        { type: "user", text: prompt },
        { type: "ai", text: reply || "🤖 Gemini had no reply." },
      ]);
      setPrompt("");
    } catch (error) {
      console.error("Error asking Gemini:", error);
      setConversation((prev) => [
        ...prev,
        { type: "user", text: prompt },
        { type: "ai", text: "❌ Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
      setTimeout(
        () => scrollViewRef.current?.scrollToEnd({ animated: true }),
        300
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <ScrollView
        style={styles.responseContainer}
        contentContainerStyle={{ padding: 20 }}
        ref={scrollViewRef}
      >
        {conversation.map((msg, index) => (
          <View
            key={index}
            style={[
              styles.message,
              msg.type === "user" ? styles.userMsg : styles.aiMsg,
            ]}
          >
            <Text style={styles.msgText}>{msg.text}</Text>
          </View>
        ))}
        {loading && (
          <ActivityIndicator
            size="small"
            color="#666"
            style={{ marginTop: 10 }}
          />
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Ask me anything..."
          value={prompt}
          onChangeText={setPrompt}
          style={styles.input}
        />
        <Button
          title="Ask"
          onPress={handleAsk}
          disabled={!prompt.trim() || loading}
          color="orange" // ← This sets the button color
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },
  responseContainer: {
    flex: 1,
  },
  message: {
    padding: 10,
    borderRadius: 8,
    marginVertical: 4,
    maxWidth: "80%",
  },
  userMsg: {
    alignSelf: "flex-end",
    backgroundColor: "#d1e7dd",
  },
  aiMsg: {
    alignSelf: "flex-start",
    backgroundColor: "#f8d7da",
  },
  msgText: {
    fontSize: 16,
    color: "#333",
  },
  inputContainer: {
    borderTopWidth: 1,
    borderColor: "#eee",
    padding: 10,
    backgroundColor: "#fafafa",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
  },
});
