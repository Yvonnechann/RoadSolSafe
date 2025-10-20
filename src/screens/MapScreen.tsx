import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
  Linking,
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../components/Card';
import { StartStopButton } from '../components/DeviceFrame';
import { theme } from '../styles/theme';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface Location {
  latitude: number;
  longitude: number;
}

interface TripData {
  isActive: boolean;
  startTime?: Date;
  distance: number;
  duration: number;
  currentLocation: Location;
  route: Location[];
}

export const MapScreen: React.FC = () => {
  const [tripData, setTripData] = useState<TripData>({
    isActive: false,
    distance: 0,
    duration: 0,
    currentLocation: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
    route: [],
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  // Mock current location (in real app, this would come from GPS)
  const currentLocation = {
    latitude: 37.78825,
    longitude: -122.4324,
  };

  // Mock route data (in real app, this would be tracked during trip)
  const mockRoute = [
    { latitude: 37.78825, longitude: -122.4324 },
    { latitude: 37.78925, longitude: -122.4334 },
    { latitude: 37.79025, longitude: -122.4344 },
    { latitude: 37.79125, longitude: -122.4354 },
  ];

  const handleStartTrip = () => {
    setTripData(prev => ({
      ...prev,
      isActive: true,
      startTime: new Date(),
      route: [currentLocation],
    }));
  };

  const handleStopTrip = () => {
    setTripData(prev => ({
      ...prev,
      isActive: false,
      startTime: undefined,
    }));
  };

  const handleNavigate = () => {
    Alert.alert(
      'Choose Navigation App',
      'Select your preferred navigation app',
      [
        {
          text: 'Waze',
          onPress: () => {
            const url = `waze://?ll=${currentLocation.latitude},${currentLocation.longitude}&navigate=yes`;
            Linking.openURL(url).catch(() => {
              Alert.alert('Error', 'Waze is not installed on this device');
            });
          },
        },
        {
          text: 'Google Maps',
          onPress: () => {
            const url = `google.navigation:q=${currentLocation.latitude},${currentLocation.longitude}`;
            Linking.openURL(url).catch(() => {
              Alert.alert('Error', 'Google Maps is not installed on this device');
            });
          },
        },
        {
          text: 'Apple Maps',
          onPress: () => {
            const url = `maps://?daddr=${currentLocation.latitude},${currentLocation.longitude}`;
            Linking.openURL(url).catch(() => {
              Alert.alert('Error', 'Apple Maps is not installed on this device');
            });
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  return (
    <>
      {/* Map */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true}
        showsMyLocationButton={false}
        showsCompass={false}
        showsScale={false}
        mapType="standard"
      >
        {/* Current location marker */}
        <Marker
          coordinate={currentLocation}
          title="Your Location"
          description="Current position"
        >
          <View style={styles.currentLocationMarker}>
            <Ionicons name="location" size={20} color="#FFFFFF" />
          </View>
        </Marker>

        {/* Route polyline */}
        {tripData.isActive && tripData.route.length > 1 && (
          <Polyline
            coordinates={tripData.route}
            strokeColor={theme.colors.primary}
            strokeWidth={4}
            lineDashPattern={[5, 5]}
          />
        )}
      </MapView>

      {/* Top Search Bar */}
      <View style={styles.topBar}>
        <Card style={styles.searchCard}>
          <TouchableOpacity
            style={styles.searchInput}
            onPress={() => setShowSearch(true)}
          >
            <Ionicons name="search" size={20} color={theme.colors.textSecondary} />
            <Text style={styles.searchPlaceholder}>
              {searchQuery || 'Search destination...'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navigateButton} onPress={handleNavigate}>
            <Ionicons name="navigate" size={20} color={theme.colors.primary} />
          </TouchableOpacity>
        </Card>
      </View>

      {/* Trip Status Banner */}
      {tripData.isActive && (
        <LinearGradient
          colors={['#32CD32', '#228B22']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.tripBanner}
        >
          <View style={styles.tripBannerContent}>
            <View style={styles.tripInfo}>
              <Ionicons name="car" size={20} color="#FFFFFF" />
              <Text style={styles.tripBannerText}>Drive in Progress</Text>
            </View>
            <View style={styles.tripStats}>
              <Text style={styles.tripStatText}>
                {tripData.distance.toFixed(1)} km
              </Text>
              <Text style={styles.tripStatText}>
                {formatDuration(tripData.duration)}
              </Text>
            </View>
            <TouchableOpacity style={styles.endTripButton} onPress={handleStopTrip}>
              <Text style={styles.endTripButtonText}>End</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      )}

      {/* Start/Stop Button */}
      <View style={styles.startStopContainer}>
        <StartStopButton
          isActive={tripData.isActive}
          onPress={tripData.isActive ? handleStopTrip : handleStartTrip}
        />
      </View>

      {/* Bottom Info Panel */}
      <View style={styles.bottomPanel}>
        <Card style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Text style={styles.infoTitle}>Drive Status</Text>
            <View style={styles.statusIndicator}>
              <View style={[
                styles.statusDot,
                { backgroundColor: tripData.isActive ? theme.colors.success : theme.colors.textSecondary }
              ]} />
              <Text style={styles.statusText}>
                {tripData.isActive ? 'Active' : 'Ready'}
              </Text>
            </View>
          </View>

          <View style={styles.infoStats}>
            <View style={styles.infoStat}>
              <Text style={styles.infoStatValue}>{tripData.distance.toFixed(1)}</Text>
              <Text style={styles.infoStatLabel}>km</Text>
            </View>
            <View style={styles.infoStat}>
              <Text style={styles.infoStatValue}>{formatDuration(tripData.duration)}</Text>
              <Text style={styles.infoStatLabel}>duration</Text>
            </View>
            <View style={styles.infoStat}>
              <Text style={styles.infoStatValue}>8.7</Text>
              <Text style={styles.infoStatLabel}>avg score</Text>
            </View>
          </View>

          {!tripData.isActive && (
            <TouchableOpacity style={styles.navigateButtonLarge} onPress={handleNavigate}>
              <Ionicons name="navigate" size={24} color="#FFFFFF" />
              <Text style={styles.navigateButtonText}>Start Navigation</Text>
            </TouchableOpacity>
          )}
        </Card>
      </View>

      {/* Safety Tips */}
      <View style={styles.safetyTips}>
        <Card style={styles.tipsCard}>
          <View style={styles.tipsHeader}>
            <Ionicons name="shield-checkmark" size={20} color={theme.colors.success} />
            <Text style={styles.tipsTitle}>Safety Tips</Text>
          </View>
          <Text style={styles.tipsText}>
            • Keep your phone mounted and hands-free{'\n'}
            • Follow speed limits and traffic signs{'\n'}
            • Maintain safe following distances
          </Text>
        </Card>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  map: {
    flex: 1,
  },

  // Top bar styles
  topBar: {
    position: 'absolute',
    top: 70,
    left: theme.spacing.lg,
    right: theme.spacing.lg,
    zIndex: 1000,
  },
  searchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  searchPlaceholder: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSize.base,
    marginLeft: theme.spacing.sm,
  },
  navigateButton: {
    padding: theme.spacing.sm,
    marginLeft: theme.spacing.sm,
  },

  // Trip banner styles
  tripBanner: {
    position: 'absolute',
    top: 120,
    left: theme.spacing.lg,
    right: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    zIndex: 1000,
    ...theme.shadows.md,
  },
  tripBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tripInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  tripBannerText: {
    color: '#FFFFFF',
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    marginLeft: theme.spacing.sm,
  },
  tripStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  tripStatText: {
    color: '#FFFFFF',
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
  },
  endTripButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  endTripButtonText: {
    color: '#FFFFFF',
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
  },

  // Start/Stop button styles
  startStopContainer: {
    position: 'absolute',
    bottom: 200,
    left: '50%',
    marginLeft: -40,
    zIndex: 1000,
  },

  // Current location marker styles
  currentLocationMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    ...theme.shadows.md,
  },

  // Bottom panel styles
  bottomPanel: {
    position: 'absolute',
    bottom: 120,
    left: theme.spacing.lg,
    right: theme.spacing.lg,
    zIndex: 1000,
  },
  infoCard: {
    padding: theme.spacing.lg,
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  infoTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: theme.spacing.xs,
  },
  statusText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
  },
  infoStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: theme.spacing.lg,
  },
  infoStat: {
    alignItems: 'center',
  },
  infoStatValue: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
  },
  infoStatLabel: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
  },
  navigateButtonLarge: {
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md,
  },
  navigateButtonText: {
    color: '#FFFFFF',
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    marginLeft: theme.spacing.sm,
  },

  // Safety tips styles
  safetyTips: {
    position: 'absolute',
    bottom: 20,
    left: theme.spacing.lg,
    right: theme.spacing.lg,
    zIndex: 1000,
  },
  tipsCard: {
    padding: theme.spacing.md,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  tipsTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    marginLeft: theme.spacing.sm,
  },
  tipsText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSize.sm,
    lineHeight: theme.typography.lineHeight.relaxed,
  },
});
