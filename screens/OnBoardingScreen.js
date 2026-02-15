import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Video } from "expo-av";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    key: "1",
    type: "video",
    title: "Welcome to PruciaStore",
    description: "Experience fashion that speaks elegance, comfort, and class.",
    video: {
      uri: "https://drive.google.com/uc?export=download&id=1e7AVOYcqlko_0jIdj4IUrhuStuYFXg6b",
    },
  },
  {
    key: "2",
    title: "Handcrafted Perfection",
    description: "Every stitch is a story. Discover the art behind each piece.",
    image: {uri:'../assets/p2.jpg'},
  },
  {
    key: "3",
    title: "Your Style, Delivered",
    description:
      "From our atelier to your doorstep effortlessly stylish and timely.",
    image: {uri:'../assets/k1.jpg'},
  },
  {
    key: "4",
    title: "Join the PRUCIA Family",
    description:
      "Create your account and step into the world of premium fashion.",
    image: {uri:'../assets/p4.jpg'},
  },
];

export default function OnboardingScreen({ navigation, onFinish }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentSlide, setCurrentSlide] = useState(0);
  const flatListRef = useRef();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentSlide + 1 });
    }
  };

  const handleSkip = () => {
    if (onFinish) onFinish();
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentSlide(viewableItems[0].index);
    }
  }).current;

  const viewConfigRef = useRef({
    viewAreaCoveragePercentThreshold: 50, // Adjust this threshold as needed
  });

  const renderItem = ({ item, index }) => {
    if (item.type === "video") {
      return (
        <View style={styles.background}>
          <Video
            source={item.video}
            style={styles.video}
            resizeMode="cover"
            shouldPlay
            isLooping
          />
          <View style={styles.overlay}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>
      );
    }

    return (
      <ImageBackground
        source={item.image}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Animated.View style={styles.textbox}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </Animated.View>
          {index === slides.length - 1 && (
            <TouchableOpacity
              style={styles.getStartedButton}
              onPress={onFinish}
            >
              <Text style={styles.getStartedText}>Get Started</Text>
            </TouchableOpacity>
          )}
        </View>
      </ImageBackground>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList
        data={slides}
        ref={flatListRef}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfigRef.current}
      />

      {currentSlide < slides.length - 1 && (
        <View style={[styles.footer, { paddingBottom: 20 }]}>
          <View style={styles.indicatorContainer}>
            {slides.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  currentSlide === index && styles.activeIndicator,
                ]}
              />
            ))}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleSkip}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: width,
    height: height,
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height,
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  title: {
    fontSize: 56,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  description: {
    fontSize: 18,
    color: "#eee",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  getStartedButton: {
    marginTop: 30,
    backgroundColor: "#28a745",
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 10,
    alignSelf: "center",
  },
  getStartedText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: "#fff",
    width: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  skipText: {
    fontSize: 16,
    color: "#fff",
  },
  nextButton: {
    backgroundColor: "#007aff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  nextText: {
    color: "#fff",
    fontSize: 16,
  },
});
