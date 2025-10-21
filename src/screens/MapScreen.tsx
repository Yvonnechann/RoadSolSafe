import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
  Linking,
  TextInput,
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

  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

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


      {/* Origin and Destination Input Fields */}
      <View style={styles.addressFields}>
        <Card style={styles.addressCard}>
          <View style={styles.addressItem}>
            <View style={styles.addressIcon}>
              <View style={styles.originDot} />
            </View>
            <TextInput
              style={styles.addressInput}
              placeholder="Enter origin address..."
              placeholderTextColor={theme.colors.textSecondary}
              value={origin}
              onChangeText={setOrigin}
            />
          </View>
          
          <View style={styles.addressConnector} />
          
          <View style={styles.addressItem}>
            <View style={styles.addressIcon}>
              <View style={styles.destinationDot} />
            </View>
            <TextInput
              style={styles.addressInput}
              placeholder="Enter destination address..."
              placeholderTextColor={theme.colors.textSecondary}
              value={destination}
              onChangeText={setDestination}
            />
          </View>
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


  // Address fields styles
  addressFields: {
    position: 'absolute',
    top: 70,
    left: theme.spacing.lg,
    right: theme.spacing.lg,
    zIndex: 1000,
  },
  addressCard: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.xs,
  },
  addressIcon: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.sm,
  },
  originDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#666666',
  },
  destinationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#666666',
  },
  addressConnector: {
    width: 1,
    height: 12,
    backgroundColor: '#666666',
    marginLeft: 4,
    marginVertical: 2,
  },
  addressInput: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    flex: 1,
    paddingVertical: theme.spacing.xs,
  },

  // Trip banner styles
  tripBanner: {
    position: 'absolute',
    top: 140,
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
    bottom: 100,
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


});
