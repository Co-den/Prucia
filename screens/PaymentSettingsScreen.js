import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PaymentSettingsScreen() {
  const [paymentMethods, setPaymentMethods] = useState([
    { id: "1", type: "Visa", last4: "1234", added: "2024-07-02" },
    { id: "2", type: "MasterCard", last4: "5678", added: "2024-06-10" },
  ]);

  const removeMethod = (id) => {
    setPaymentMethods((prev) => prev.filter((method) => method.id !== id));
    Alert.alert("Removed", "Payment method has been removed.");
  };

  const addNewMethod = () => {
    Alert.alert(
      "Paystack Integration",
      "Redirect to Paystack card registration..."
    );
  };

  const renderMethod = ({ item }) => (
    <View style={styles.card}>
      <Ionicons
        name={item.type === "Visa" ? "card-outline" : "card"}
        size={24}
        color="#333"
      />
      <View style={styles.cardInfo}>
        <Text style={styles.cardText}>
          {item.type} •••• {item.last4}
        </Text>
        <Text style={styles.dateText}>Added: {item.added}</Text>
      </View>
      <TouchableOpacity onPress={() => removeMethod(item.id)}>
        <Ionicons name="trash-outline" size={22} color="#e53935" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Payment Settings</Text>

        <FlatList
          data={paymentMethods}
          keyExtractor={(item) => item.id}
          renderItem={renderMethod}
          ListEmptyComponent={
            <Text style={styles.empty}>No saved payment methods.</Text>
          }
          contentContainerStyle={{ paddingBottom: 20 }}
          style={{ flex: 1 }}
        />

        <TouchableOpacity style={styles.addButton} onPress={addNewMethod}>
          <Ionicons name="add-circle-outline" size={22} color="#fff" />
          <Text style={styles.addText}>Add New Payment Method</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  empty: {
    textAlign: "center",
    marginTop: 30,
    color: "#999",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fafafa",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  cardInfo: {
    flex: 1,
    marginLeft: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "500",
  },
  dateText: {
    fontSize: 13,
    color: "#777",
  },
  addButton: {
    flexDirection: "row",
    backgroundColor: "#f68b1e",
    padding: 16,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});
