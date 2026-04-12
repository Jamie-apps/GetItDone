import { View, Text, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import { useEffect } from "react";

const { width, height } = Dimensions.get("window");

interface LightBlobProps {
  color: string;
  size: number;
  delay: number;
}

function LightBlob({ color, size, delay }: LightBlobProps) {
  const x = useSharedValue(Math.random() * width);
  const y = useSharedValue(Math.random() * height);
  const opacity = useSharedValue(0.6);
  const scale = useSharedValue(1);

  useEffect(() => {
    const animate = () => {
      x.value = withTiming(Math.random() * width, { duration: 10000 });
      y.value = withTiming(Math.random() * height, { duration: 10000 });

      opacity.value = withTiming(Math.random() * 0.5 + 0.5, {
        duration: 4000,
      });

      scale.value = withTiming(Math.random() * 0.6 + 0.8, {
        duration: 4000,
      });

      setTimeout(animate, 4000);
    };

    setTimeout(animate, delay);
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: x.value },
      { translateY: y.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.blob,
        {
          width: size,
          height: size,
          backgroundColor: color,
        },
        style,
      ]}
    />
  );
}

export default function Home() {
  return (
    <View style={styles.container}>
      
      {/* 🔥 Fog Lights */}
      <LightBlob color="#7dd3fc" size={350} delay={0} />
      <LightBlob color="#a78bfa" size={400} delay={500} />
      <LightBlob color="#f9a8d4" size={300} delay={1000} />
      <LightBlob color="#fde68a" size={380} delay={1500} />
      <LightBlob color="#86efac" size={350} delay={2000} />
      {/* 🌑 Fog overlay */}
      <View style={styles.overlay} />

      {/* 📱 Foreground */}
      <View style={styles.card}>
        <Text style={styles.title}>GetItDone</Text>
        <Text style={styles.subtitle}>
          Build consistency. Track your goals.
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050505",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  blob: {
  position: "absolute",
  borderRadius: 999,

  // 👇 THIS is the "fake blur glow"
  shadowColor: "#fff",
  shadowOpacity: 0.8,
  shadowRadius: 100,

  elevation: 50, // Android glow boost
},

  overlay: {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: "rgba(5,5,5,0.6)", // was 0.85 → too dark
},

  card: {
    padding: 30,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },

  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },

  subtitle: {
    color: "#aaa",
    fontSize: 16,
  },
});