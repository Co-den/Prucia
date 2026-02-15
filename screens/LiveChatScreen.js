import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

export default function LiveChatScreen() {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://tawk.to/chat/68685d206d9ffc190f97b932/1ivbqni40' }} // Replace this with your own Tawk.to direct link
        style={{ flex: 1 }}
        originWhitelist={['*']}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        renderLoading={() => (
          <ActivityIndicator
            size="large"
            color="#f68b1e"
            style={styles.loader}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -20,
    marginTop: -20,
  },
});
