import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
const { width, height } = Dimensions.get("window");
const COLORS = [
  "#7dd3fc",
  "#a78bfa",
  "#f9a8d4",
  "#fde68a",
  "#86efac",
];

//LIGHT BLOBS
interface LightBlobProps {
  color: string;
  size: number;
  delay: number;
}
function LightBlob({ color, size, delay }: LightBlobProps) {
  const x = useSharedValue(Math.random() * width);
  const y = useSharedValue(Math.random() * height);
  const opacity = useSharedValue(0.5);
  useEffect(() => {
    const animate = () => {
      x.value = withTiming(Math.random() * width, {
        duration: 8000 + Math.random() * 6000,
      });
      y.value = withTiming(Math.random() * height, {
        duration: 8000 + Math.random() * 6000,
      });
      // 🔥 subtle flicker
      opacity.value = withTiming(Math.random() * 0.2 + 0.4, {
        duration: 1500 + Math.random() * 1500,
      });
      setTimeout(animate, 1500 + Math.random() * 2000);
    };
    setTimeout(animate, delay);
  }, []);
  const style = useAnimatedStyle(() => ({
    position: "absolute",
    left: width / 2 - size / 2,
    top: height / 2 - size / 2,
    transform: [
      { translateX: x.value - width / 2 },
      { translateY: y.value - height / 2 },
    ],
    opacity: opacity.value,
  }));
  return (
    <Animated.View style={style}>
      <View
        style={[
          styles.blob,
          {
            backgroundColor: color,
            width: size,
            height: size,
          },
        ]}
      />
    </Animated.View>
  );
}

//GLOW BUTTON
function GlowButton({ label }: { label: string }) {
  const translate = useSharedValue(-300); // start far left
  const opacity = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translate.value }],
    opacity: opacity.value,
  }));
  const handlePress = () => {
    translate.value = -300;
    opacity.value = 1;
    //full sweep across button
    translate.value = withTiming(300, { duration: 800 });
    // fade out AFTER it fully passes
    setTimeout(() => {
      opacity.value = withTiming(0, { duration: 300 });
    }, 700);
  };
  return (
    <Pressable onPress={handlePress}>
      <View style={styles.button}>
        {/*Moving gradient*/}
        <Animated.View style={[styles.gradientOverlay, animatedStyle]}>
          <LinearGradient
            colors={["#7dd3fc", "#a78bfa", "#f9a8d4"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }} // horizontal flow
            style={styles.gradient}
          />
        </Animated.View>
        <Text style={styles.buttonText}>{label}</Text>
      </View>
    </Pressable>
  );
}

// 🏠 HOME SCREEN
export default function Home() {
  return (
    <View style={styles.container}>
      {/*LIGHTS*/}
      <LightBlob color="#7dd3fc" size={500} delay={0} />
      <LightBlob color="#a78bfa" size={550} delay={1000} />
      <LightBlob color="#f9a8d4" size={350} delay={500} />
      <LightBlob color="#fde68a" size={400} delay={1500} />
      <LightBlob color="#86efac" size={250} delay={2000} />
      {/*Fog layer*/}
      <View style={styles.fogLayer} />
      {/*Overlay*/}
      <View style={styles.overlay} />
      {/*Foreground*/}
      <View style={styles.foreground}>
        <Text style={styles.title}>GetItDone</Text>
        <Text style={styles.subtitle}>
          Build consistency. Track your goals.
        </Text>
        <View style={{ height: 30 }} />
        <GlowButton label="Start" />
        <GlowButton label="Quit" />
      </View>
    </View>
  );
}

//STYLES
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: "#050505", justifyContent: "center", alignItems: "center", overflow: "hidden"},
  blob: {position: "absolute", borderRadius: 999, opacity: 0.65, shadowColor: "#fff", shadowOpacity: 0.6, shadowRadius: 140, elevation: 100},
  fogLayer: {...StyleSheet.absoluteFillObject, backgroundColor: "rgba(255,255,255,0.03)"},
  overlay: {...StyleSheet.absoluteFillObject, backgroundColor: "rgba(5,5,5,0.65)"},
  foreground: {position: "absolute", alignItems: "center"},
  title: {color: "white", fontSize: 32, fontWeight: "bold", marginBottom: 10},
  subtitle: {color: "#aaa", fontSize: 16},
  button: {width: 200, paddingVertical: 14, borderRadius: 12, marginVertical: 8, overflow: "hidden", backgroundColor: "rgba(255,255,255,0.05)", borderWidth: 1, borderColor: "rgba(255,255,255,0.1)"},
  buttonText: {color: "white", textAlign: "center", fontSize: 16, fontWeight: "600"},
  gradientOverlay: {...StyleSheet.absoluteFillObject},
  gradient: {width: "200%", height: "100%"},
});