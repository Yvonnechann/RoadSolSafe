import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OnboardingFlow } from './src/screens/OnboardingFlow';
import ProfileScreen from './src/screens/ProfileScreen';
import { QuestsScreen } from './src/screens/QuestsScreen';
import { MapScreen } from './src/screens/MapScreen';
import { LeaderboardScreen } from './src/screens/LeaderboardScreen';
import { SocialsScreen } from './src/screens/SocialsScreen';
import { CustomTabBar } from './src/components/CustomTabBar';

const Tab = createBottomTabNavigator();

export default function App() {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      // Temporarily force onboarding to show for testing
      setIsOnboardingComplete(false);
      
      // Uncomment the lines below to restore normal behavior:
      // const onboardingComplete = await AsyncStorage.getItem('onboardingComplete');
      // setIsOnboardingComplete(onboardingComplete === 'true');
    } catch (error) {
      console.error('Error checking onboarding status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('onboardingComplete', 'true');
      setIsOnboardingComplete(true);
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  if (isLoading) {
    return null; // You can add a loading screen here
  }

  if (!isOnboardingComplete) {
    return (
      <LinearGradient
        colors={['#0F1419', '#1F2A3A', '#0F1419']}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.5, 1]}
      >
        <SafeAreaProvider style={{ backgroundColor: 'transparent', flex: 1 }}>
          <OnboardingFlow onComplete={completeOnboarding} />
          <StatusBar style="light" />
        </SafeAreaProvider>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#0F1419', '#1F2A3A', '#0F1419']}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      locations={[0, 0.5, 1]}
    >
      <SafeAreaProvider style={{ backgroundColor: 'transparent', flex: 1 }}>
        <NavigationContainer theme={{ 
          colors: { 
            background: 'transparent',
            primary: '#2D82FF',
            card: 'transparent',
            text: '#FFFFFF',
            border: 'transparent',
            notification: '#2D82FF'
          } 
        }}>
        <Tab.Navigator
          initialRouteName="Home"
          tabBar={(props) => <CustomTabBar {...props} />}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Tab.Screen name="Quests" component={QuestsScreen} />
          <Tab.Screen name="Maps" component={MapScreen} />
          <Tab.Screen name="Home" component={ProfileScreen} />
          <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
          <Tab.Screen name="Friends" component={SocialsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="light" />
    </SafeAreaProvider>
    </LinearGradient>
  );
}