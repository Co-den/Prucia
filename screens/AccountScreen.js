import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AccountScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    Alert.alert("Log out", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: () => logout(), style: "destructive" },
    ]);
  };

  const handleDelete = async () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to permanently delete your account?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem("token");
              const response = await fetch(
                "https://api-jsrm.onrender.com/api/profile/delete",
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                },
              );

              if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Delete failed");
              }

              await AsyncStorage.removeItem("token");
              logout();
              Alert.alert(
                "Deleted",
                "Your account has been permanently deleted.",
              );
            } catch (error) {
              Alert.alert("Error", error.message);
              console.error("Delete error:", error);
            }
          },
        },
      ],
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* User Profile */}
      <View style={styles.profile}>
        <Image
          source={{ uri: user?.avatar || "https://via.placeholder.com/100" }}
          style={styles.avatar}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{user?.firstName || "Your Name"}</Text>
          <Text style={styles.email}>{user?.email}</Text>
          <Text style={styles.location}>{user?.state || "No state set"}</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Option
          icon="chatbubbles-outline"
          label="Live Chat Support"
          onPress={() => navigation.navigate("LiveChat")}
        />
      </View>
      {/* Quick Access */}
      <View style={styles.menu}>
        <SectionHeader title="Quick Access" />
        <Option
          icon="cart-outline"
          label="My Orders"
          onPress={() => navigation.navigate("Orders")}
        />
        <Option
          icon="heart-outline"
          label="Saved Items"
          onPress={() => navigation.navigate("SavedItems")}
        />
        <Option
          icon="help-circle-outline"
          label="Help Center"
          onPress={() => navigation.navigate("Help")}
        />
      </View>

      {/* My Settings */}
      <View style={styles.menu}>
        <SectionHeader title="My Settings" />
        <Option
          icon="card-outline"
          label="Payment Settings"
          onPress={() => navigation.navigate("PaymentSettings")}
        />
        <Option
          icon="location-outline"
          label="Address Book"
          onPress={() => navigation.navigate("AddressBook")}
        />
        <Option
          icon="settings-outline"
          label="Account Management"
          onPress={() => navigation.navigate("AccountManagement")}
        />
        <Option
          icon="trash-outline"
          label="Close Account"
          onPress={handleDelete}
        />
      </View>

      {/* Logout */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const Option = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.option} onPress={onPress}>
    <Ionicons name={icon} size={22} color="#333" />
    <Text style={styles.optionText}>{label}</Text>
    <Ionicons
      name="chevron-forward"
      size={20}
      color="#999"
      style={{ marginLeft: "auto" }}
    />
  </TouchableOpacity>
);

const SectionHeader = ({ title }) => (
  <Text style={styles.sectionHeader}>{title}</Text>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingTop: 50,
    paddingBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: "#ddd",
    marginRight: 16,
  },
  info: {
    flexShrink: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
  },
  email: {
    color: "#777",
    marginTop: 2,
  },
  location: {
    color: "#777",
    marginTop: 2,
    fontStyle: "italic",
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 10,
    color: "#222",
  },
  menu: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    fontSize: 16,
    marginLeft: 12,
    color: "#333",
  },
  actions: {
    marginTop: 30,
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "#ff6f61",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    marginBottom: 12,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
