import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import SafetyCluster from "../components/SafetyCluster";
import StartTripButtonShiny from "../components/StartTripButtonShiny";
import TripMonitoringModal from "../components/TripMonitoringModal";
import TripSummaryModal from "../components/TripSummaryModal";

const { width: screenWidth } = Dimensions.get('window');

export default function ProfileScreen() {
  // demo data (wire to your store/api)
  const safetyScore = 6.1;
  const totalTripKm = 124.7;
  const dayStreak = 12;
  const [showTripModal, setShowTripModal] = useState(false);
  const [showTripSummary, setShowTripSummary] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);

  // Sample trip data
  const recentTrips = [
    {
      id: "1",
      date: "Today",
      km: 12.3,
      duration: "28 min",
      score: 7.8,
      points: 45,
      distance: "12.3 km",
      origin: {
        address: "41 Jalan Bukit Bintang, Kuala Lumpur 50200",
        latitude: 3.1478,
        longitude: 101.7003,
      },
      destination: {
        address: "300 Jalan Ampang, Kuala Lumpur 50450",
        latitude: 3.1615,
        longitude: 101.7176,
      },
      route: [
        { latitude: 3.1478, longitude: 101.7003 },
        { latitude: 3.1490, longitude: 101.7020 },
        { latitude: 3.1505, longitude: 101.7040 },
        { latitude: 3.1520, longitude: 101.7060 },
        { latitude: 3.1535, longitude: 101.7080 },
        { latitude: 3.1550, longitude: 101.7100 },
        { latitude: 3.1565, longitude: 101.7120 },
        { latitude: 3.1580, longitude: 101.7140 },
        { latitude: 3.1595, longitude: 101.7160 },
        { latitude: 3.1615, longitude: 101.7176 },
      ],
      events: {
        hardBrake: 0,
        hardAccel: 0,
        harshTurn: 0,
        speeding: 0,
        phoneUse: 0,
      },
      recommendation: "Excellent driving! Keep maintaining this smooth and safe driving style.",
    },
    {
      id: "2",
      date: "Yesterday",
      km: 8.1,
      duration: "22 min",
      score: 6.4,
      points: 32,
      distance: "8.1 km",
      origin: {
        address: "123 Jalan Sultan Ismail, Kuala Lumpur 50200",
        latitude: 3.1390,
        longitude: 101.6869,
      },
      destination: {
        address: "456 Jalan Tun Razak, Kuala Lumpur 50400",
        latitude: 3.1390,
        longitude: 101.6869,
      },
      route: [
        { latitude: 3.1390, longitude: 101.6869 },
        { latitude: 3.1405, longitude: 101.6880 },
        { latitude: 3.1420, longitude: 101.6890 },
        { latitude: 3.1435, longitude: 101.6900 },
        { latitude: 3.1450, longitude: 101.6910 },
        { latitude: 3.1465, longitude: 101.6920 },
        { latitude: 3.1480, longitude: 101.6930 },
        { latitude: 3.1495, longitude: 101.6940 },
      ],
      events: {
        hardBrake: 1,
        hardAccel: 0,
        harshTurn: 0,
        speeding: 5,
        phoneUse: 0,
      },
      recommendation: "Good overall driving! Try to avoid sudden braking and watch your speed limits.",
    },
    {
      id: "3",
      date: "2 days ago",
      km: 15.2,
      duration: "35 min",
      score: 8.5,
      points: 52,
      distance: "15.2 km",
      origin: {
        address: "789 Jalan Pudu, Kuala Lumpur 50200",
        latitude: 3.1357,
        longitude: 101.6882,
      },
      destination: {
        address: "321 Jalan Raja Chulan, Kuala Lumpur 50200",
        latitude: 3.1478,
        longitude: 101.7003,
      },
      route: [
        { latitude: 3.1357, longitude: 101.6882 },
        { latitude: 3.1370, longitude: 101.6900 },
        { latitude: 3.1385, longitude: 101.6920 },
        { latitude: 3.1400, longitude: 101.6940 },
        { latitude: 3.1415, longitude: 101.6960 },
        { latitude: 3.1430, longitude: 101.6980 },
        { latitude: 3.1445, longitude: 101.7000 },
        { latitude: 3.1460, longitude: 101.7020 },
        { latitude: 3.1478, longitude: 101.7003 },
      ],
      events: {
        hardBrake: 0,
        hardAccel: 0,
        harshTurn: 0,
        speeding: 0,
        phoneUse: 0,
      },
      recommendation: "Outstanding performance! You're setting a great example for safe driving.",
    },
  ];

  const handleEndTrip = () => {
    setShowTripModal(false);
    // Add trip end logic here
  };

  const handleTripPress = (trip) => {
    setSelectedTrip(trip);
    setShowTripSummary(true);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 32 }}>
      {/* Welcome Message */}
      <View style={styles.welcomeHeader}>
        <Text style={styles.welcomeTitle}>Welcome back!</Text>
        <Text style={styles.welcomeSubtitle}>Ready to drive safely and earn rewards?</Text>
      </View>

      {/* Gauge Card (keeps your base layout) */}
      <View style={styles.gaugeCard}>
        <SafetyCluster
          safetyScore={safetyScore}
          totalTripKm={totalTripKm}
          dayStreak={dayStreak}
          weeklyTripGoal={300}
          streakGoal={20}
        />
      </View>

      {/* Start Trip button with shiny effects */}
      <View style={styles.ctaContainer}>
        <StartTripButtonShiny
          title="Start Trip"
          subtitle="Safe mode • GPS on"
          onPress={() => setShowTripModal(true)}
          width={screenWidth - 32}
          height={60}
          iconName="play"
          shinyText={true}
          speed={2.4}
          style={{ marginHorizontal: 16 }}
        />
      </View>

      {/* Recent Trips */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Recent Trips</Text>
          <Text style={styles.link}>View All</Text>
        </View>

        {recentTrips.map((trip, i) => (
          <TouchableOpacity 
            key={trip.id} 
            style={styles.tripRow}
            onPress={() => handleTripPress(trip)}
            activeOpacity={0.7}
          >
            <View>
              <Text style={styles.tripDate}>{trip.date}</Text>
              <Text style={styles.tripSub}>{trip.km} km • {trip.duration}</Text>
            </View>
            <View style={styles.tripScoreContainer}>
              <Text style={styles.tripScore}>{trip.score.toFixed(1)}</Text>
              <Ionicons name="chevron-forward" size={16} color="rgba(255, 255, 255, 0.5)" />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Trip Monitoring Modal */}
      <TripMonitoringModal
        visible={showTripModal}
        onClose={() => setShowTripModal(false)}
        onEndTrip={handleEndTrip}
      />

      {/* Trip Summary Modal */}
      {selectedTrip && (
        <TripSummaryModal
          visible={showTripSummary}
          onClose={() => {
            setShowTripSummary(false);
            setSelectedTrip(null);
          }}
          tripData={selectedTrip}
        />
      )}

      {/* bottom nav placeholder to mirror your base */}
      <View style={styles.bottomPad} />
    </ScrollView>
  );
}

const BG = "#0F1722";
const CARD = "#0B111A";
const TEXT = "#E8F0FF";
const MUTED = "rgba(210,225,245,0.8)";
const DIVIDER = "rgba(255,255,255,0.08)";

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },
  
  welcomeHeader: {
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 10,
    alignItems: "center",
  },
  welcomeTitle: { 
    color: TEXT, 
    fontSize: 24, 
    fontWeight: "800",
    marginBottom: 4,
  },
  welcomeSubtitle: { 
    color: MUTED, 
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },

  gaugeCard: {
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: "transparent",
  },

  ctaContainer: {
    marginTop: 24,
  },

  card: {
    marginTop: 18,
    marginHorizontal: 16,
    backgroundColor: CARD,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: DIVIDER,
    padding: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: { color: TEXT, fontSize: 20, fontWeight: "800" },
  link: { color: "#2D82FF", fontWeight: "700" },

  tripRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: DIVIDER,
  },
  tripDate: { color: TEXT, fontWeight: "700", fontSize: 16 },
  tripSub: { color: MUTED, marginTop: 2 },
  tripScoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  tripScore: { color: TEXT, fontWeight: "800", fontSize: 16 },

  bottomPad: { height: 40 },
});
