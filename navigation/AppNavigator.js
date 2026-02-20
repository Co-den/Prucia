import React, { useState, useEffect, useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../contexts/AuthContext';

// Screens
import OnboardingScreen from '../screens/OnBoardingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import MainTabs from './MainTab';
import CollectionScreen from '../screens/CollectionScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import BookingScreen from '../screens/BookingScreen';
//import CheckoutScreen from '../screens/CheckoutScreen';
import ReceiptScreen from '../screens/ReceiptScreen';
import OrdersScreen from '../screens/OrderScreen';
import SavedItemsScreen from '../screens/SaveItemsScreen';
import HelpCenterScreen from '../screens/HelpCenterScreen';
import PaymentSettingsScreen from '../screens/PaymentSettingsScreen';
import AddPaymentMethodScreen from '../screens/AddPaymentMethodScreen';
import AddressBookScreen from '../screens/AddressBookScreen';
import AddAddressScreen from '../screens/AddAddressScreen';
import AccountManagementScreen from '../screens/AccountManagementScreen';
import LiveChatScreen from '../screens/LiveChatScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user, loading } = useContext(AuthContext);
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  if (loading) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!onboardingComplete ? (
        <Stack.Screen name="Onboarding">
          {(props) => (
            <OnboardingScreen
              {...props}
              onFinish={() => setOnboardingComplete(true)}
            />
          )}
        </Stack.Screen>
      ) : !user ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="Collections" component={CollectionScreen} />
          <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
          <Stack.Screen name="Booking" component={BookingScreen} />
          {/* <Stack.Screen name="Checkout" component={CheckoutScreen} /> */}
          <Stack.Screen name="Receipt" component={ReceiptScreen} />
          <Stack.Screen name="Orders" component={OrdersScreen} />
          <Stack.Screen name="SavedItems" component={SavedItemsScreen} />
          <Stack.Screen name="Help" component={HelpCenterScreen} />
          <Stack.Screen name="PaymentSettings" component={PaymentSettingsScreen} />
          <Stack.Screen name="AddPaymentMethod" component={AddPaymentMethodScreen} />
          <Stack.Screen name="AddressBook" component={AddressBookScreen} />
          <Stack.Screen name="AddAddress" component={AddAddressScreen} />
          <Stack.Screen name="AccountManagement" component={AccountManagementScreen} />
          <Stack.Screen name="LiveChat" component={LiveChatScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
