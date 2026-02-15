import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HelpCenterScreen() {
  const openEmail = () => {
    Linking.openURL(
      "mailto:support@pruciael@gmail.com?subject=Help Needed&body=Hi PRUCIA Team,"
    );
  };

  const openWhatsApp = () => {
    Linking.openURL(
      "https://wa.me/2348128903936?text=Hello PRUCIA Team, I need help with..."
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Help Center</Text>
      <Text style={styles.subtitle}>How can we assist you today?</Text>

      <View style={styles.section}>
        <Text style={styles.header}>Frequently Asked Questions</Text>
        <Text style={styles.faq}>• How do I track my order?</Text>
        <Text style={styles.faq}>• How do I request a refund?</Text>
        <Text style={styles.faq}>• How do I edit my address?</Text>
        <Text style={styles.faq}>• What payment methods are accepted?</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.header}>Contact Us</Text>

        <TouchableOpacity style={styles.button} onPress={openEmail}>
          <Ionicons name="mail-outline" size={22} color="#fff" />
          <Text style={styles.buttonText}>Email Support</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#25D366" }]}
          onPress={openWhatsApp}
        >
          <Ionicons name="logo-whatsapp" size={22} color="#fff" />
          <Text style={styles.buttonText}>Chat on WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    marginTop: 6,
    fontSize: 16,
    color: "#777",
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#222",
  },
  faq: {
    fontSize: 15,
    marginBottom: 6,
    color: "#444",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f68b1e",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    marginLeft: 10,
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
