import { View, Text, StyleSheet, ScrollView } from "react-native";
import {AnimatedCircularProgress} from 'react-native-circular-progress';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>

      {/* 🔹 Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Hello, Jamie 👋</Text>
        <Text style={styles.subtitle}>What are you tracking today?</Text>
      </View>

      {/* 🔹 Main Progress Card */}
      <View style={styles.card}>

      <Text style={styles.cardTitle}>Daily Progress</Text>

      <View style={{ alignItems: "center", marginVertical: 20 }}>
        <AnimatedCircularProgress
          size={160}
          width={12}
          fill={80} // dynamic later
          tintColor="#7dd3fc"
          backgroundColor="rgba(255,255,255,0.1)"
          rotation={0}
          lineCap="round"
        >
          {(fill: number) => (
            <Text style={styles.progressText}>
              {Math.round(fill)}%
            </Text>
          )}
        </AnimatedCircularProgress>
      </View>

      <Text style={styles.streak}>🔥 5 day streak</Text>

    </View>

      {/* 🔹 Goals List */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today’s Goals</Text>

        <View style={styles.goalItem}>
          <Text style={styles.goalText}>✔ Workout</Text>
        </View>

        <View style={styles.goalItem}>
          <Text style={styles.goalText}>✔ Study</Text>
        </View>

        <View style={styles.goalItem}>
          <Text style={styles.goalText}>✖ Drink Water</Text>
        </View>

      </View>
      <View style={styles.statsRow}>

  <View style={styles.statBox}>
    <Text style={styles.statNumber}>5</Text>
    <Text style={styles.statLabel}>Goals</Text>
  </View>

  <View style={styles.statBox}>
    <Text style={styles.statNumber}>4</Text>
    <Text style={styles.statLabel}>Completed</Text>
  </View>

  <View style={styles.statBox}>
    <Text style={styles.statNumber}>80%</Text>
    <Text style={styles.statLabel}>Rate</Text>
  </View>

</View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050505",
    padding: 20,
  },

  header: {
    marginBottom: 20,
  },

  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#aaa",
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },

  cardTitle: {
    color: "#aaa",
    marginBottom: 10,
  },

  progress: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },

  streak: {
    color: "#7dd3fc",
    marginTop: 5,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  gridItem: {
    width: "48%",
    padding: 20,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.05)",
    marginBottom: 10,
  },

  gridText: {
    color: "white",
    fontWeight: "500",
  },

  section: {
    marginBottom: 40,
  },

  sectionTitle: {
    color: "white",
    fontSize: 18,
    marginBottom: 10,
  },

  goalItem: {
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  goalText: {
    color: "white",
  },

  progressText: {
  color: "white",
  fontSize: 28,
  fontWeight: "bold",
},

statsRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 25,
},

statBox: {
  width: "30%",
  padding: 16,
  borderRadius: 14,
  backgroundColor: "rgba(255,255,255,0.05)",
  alignItems: "center",
},

statNumber: {
  color: "white",
  fontSize: 18,
  fontWeight: "bold",
},

statLabel: {
  color: "#888",
  fontSize: 12,
  marginTop: 4,
},
});