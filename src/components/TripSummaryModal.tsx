import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface TripData {
  id: string;
  date: string;
  score: number;
  points: number;
  duration: string;
  distance: string;
  events: {
    hardBrake: number;
    hardAccel: number;
    harshTurn: number;
    speeding: number;
    phoneUse: number;
  };
  recommendation: string;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  tripData: TripData;
}

export default function TripSummaryModal({ visible, onClose, tripData }: Props) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <LinearGradient
        colors={['#0F1419', '#1F2A3A', '#0F1419']}
        locations={[0, 0.5, 1]}
        style={styles.container}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Trip Summary</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Trip Summary Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Trip Summary</Text>
            
            {/* Performance Metrics */}
            <View style={styles.metricsContainer}>
              {/* First Row */}
              <View style={styles.metricsRow}>
                <View style={styles.metricItem}>
                  <View style={styles.metricIcon}>
                    <Ionicons name="shield-outline" size={24} color="#FFFFFF" />
                  </View>
                  <Text style={styles.metricLabel}>Score</Text>
                  <Text style={styles.metricValue}>{tripData.score}/10</Text>
                </View>
                
                <View style={styles.metricItem}>
                  <View style={styles.metricIcon}>
                    <Ionicons name="flash" size={24} color="#FFFFFF" />
                  </View>
                  <Text style={styles.metricLabel}>Points</Text>
                  <Text style={styles.metricValue}>+{tripData.points}</Text>
                </View>
              </View>

              {/* Second Row */}
              <View style={styles.metricsRow}>
                <View style={styles.metricItem}>
                  <View style={styles.metricIcon}>
                    <Ionicons name="time-outline" size={24} color="#FFFFFF" />
                  </View>
                  <Text style={styles.metricLabel}>Duration</Text>
                  <Text style={styles.metricValue}>{tripData.duration}</Text>
                </View>
                
                <View style={styles.metricItem}>
                  <View style={styles.metricIcon}>
                    <Ionicons name="location-outline" size={24} color="#FFFFFF" />
                  </View>
                  <Text style={styles.metricLabel}>Distance</Text>
                  <Text style={styles.metricValue}>{tripData.distance}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Separator */}
          <View style={styles.separator} />

          {/* Events Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Events</Text>
            
            <View style={styles.eventsContainer}>
              <View style={styles.eventItem}>
                <Text style={styles.eventValue}>{tripData.events.hardBrake}</Text>
                <Text style={styles.eventLabel}>Hard Brake</Text>
              </View>
              
              <View style={styles.eventItem}>
                <Text style={styles.eventValue}>{tripData.events.hardAccel}</Text>
                <Text style={styles.eventLabel}>Hard Accel</Text>
              </View>
              
              <View style={styles.eventItem}>
                <Text style={styles.eventValue}>{tripData.events.harshTurn}</Text>
                <Text style={styles.eventLabel}>Harsh Turn</Text>
              </View>
              
              <View style={styles.eventItem}>
                <Text style={styles.eventValue}>{tripData.events.speeding}%</Text>
                <Text style={styles.eventLabel}>Speeding</Text>
              </View>
              
              <View style={styles.eventItem}>
                <Text style={styles.eventValue}>{tripData.events.phoneUse}</Text>
                <Text style={styles.eventLabel}>Phone Use</Text>
              </View>
            </View>
          </View>

          {/* AI Driving Coach Section */}
          <View style={styles.coachSection}>
            <View style={styles.coachHeader}>
              <View style={styles.coachIcon}>
                <Ionicons name="trending-up" size={20} color="#2D82FF" />
              </View>
              <Text style={styles.coachTitle}>AI Driving Coach</Text>
            </View>
            
            <View style={styles.recommendationContainer}>
              <Text style={styles.recommendationLabel}>Recommendation:</Text>
              <Text style={styles.recommendationText}>{tripData.recommendation}</Text>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  
  placeholder: {
    width: 40,
  },
  
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  
  section: {
    marginBottom: 24,
  },
  
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 20,
  },
  
  metricsContainer: {
    gap: 16,
  },
  
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  
  metricItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  
  metricIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  
  metricLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  
  metricValue: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  
  separator: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 8,
  },
  
  eventsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 16,
  },
  
  eventItem: {
    alignItems: 'center',
    minWidth: '18%',
  },
  
  eventValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 4,
  },
  
  eventLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  
  coachSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 40,
  },
  
  coachHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  
  coachIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(45, 130, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  
  coachTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  
  recommendationContainer: {
    gap: 8,
  },
  
  recommendationLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  
  recommendationText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
});
