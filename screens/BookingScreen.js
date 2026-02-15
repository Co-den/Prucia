import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const services = [
  'Fitting',
  'Personal Styling',
  'Custom Design',
  'Consultation',
];

export default function BookingScreen() {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [selectedService, setSelectedService] = useState(null);

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) setDate(selectedDate);
  };

  const onChangeTime = (event, selectedTime) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedTime) setTime(selectedTime);
  };

  const handleBooking = () => {
    if (!selectedService) {
      Alert.alert('Error', 'Please select a service.');
      return;
    }
    // Here you’d usually send the booking data to your backend
    Alert.alert(
      'Booking Confirmed',
      `You have booked a ${selectedService} on ${date.toDateString()} at ${time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}.`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Book an Appointment</Text>

      <Text style={styles.label}>Select Service</Text>
      <View style={styles.servicesContainer}>
        {services.map((service) => (
          <TouchableOpacity
            key={service}
            style={[
              styles.serviceButton,
              selectedService === service && styles.serviceButtonSelected,
            ]}
            onPress={() => setSelectedService(service)}
          >
            <Text
              style={[
                styles.serviceText,
                selectedService === service && styles.serviceTextSelected,
              ]}
            >
              {service}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Select Date</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateText}>{date.toDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          minimumDate={new Date()}
          display="default"
          onChange={onChangeDate}
        />
      )}

      <Text style={styles.label}>Select Time</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowTimePicker(true)}
      >
        <Text style={styles.dateText}>
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </TouchableOpacity>

      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={onChangeTime}
        />
      )}

      <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
        <Text style={styles.bookButtonText}>Confirm Booking</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 16,
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#eee',
    borderRadius: 20,
    marginVertical: 6,
    width: '48%',
  },
  serviceButtonSelected: {
    backgroundColor: '#ff6f61',
  },
  serviceText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  serviceTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  dateButton: {
    paddingVertical: 12,
    backgroundColor: '#eee',
    borderRadius: 10,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
  },
  bookButton: {
    marginTop: 40,
    backgroundColor: '#ff6f61',
    paddingVertical: 16,
    borderRadius: 12,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
