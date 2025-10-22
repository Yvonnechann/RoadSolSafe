# RoadSolSafe - DePIN Rewards Platform

A mobile app for incentivizing safer, low-risk driving by issuing cryptocurrency tokens and NFTs for verified driving behavior. Features an automotive-themed, safety-focused, tech-savvy UI designed for both iOS and Android.

![RoadSolSafe App](https://img.shields.io/badge/Platform-iOS%20%7C%20Android-blue)
![React Native](https://img.shields.io/badge/React%20Native-0.72+-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6)
![Expo](https://img.shields.io/badge/Expo-49+-000020)

## 🚗 Features

### Core Functionality
- **Safety Scoring**: Real-time calculation based on driving behavior (GPS, IMU, interaction signals)
- **Token Rewards**: Weekly claimable USDT and milestone NFTs
- **Navigation Integration**: Deep links to Waze, Google Maps, and Apple Maps
- **Quest System**: Daily and weekly challenges for gamified safety
- **Social Features**: Friend connections, leaderboards, and activity sharing
- **Privacy-First**: Raw telemetry stays private; only signed aggregates leave secure compute

### UI/UX Design
- **Automotive Theme**: Digital cockpit aesthetic with dark backgrounds and illuminated elements
- **Device Frames**: iPhone 15 Pro (390×844px) and Google Pixel 8 (393×851px) support
- **Color Palette**: Deep charcoal (#1F2328), electric blue (#1E90FF), gold (#EBCB6C), neon green (#32CD32)
- **Glass Morphism**: Subtle transparency effects for modern mobile feel
- **High Contrast**: Accessible design with proper contrast ratios

## 📱 Screens

### 1. Profile Screen (Home)
- **Safety Cluster**: Circular gauges for safety score, total trips (km), and day streak
- **Start Trip Button**: Shiny animated button with glassmorphic effects
- **Recent Trips**: Glassmorphic cards showing trip history with detailed summaries
- **Trip Monitoring**: Real-time trip tracking with circular loading animation
- **Trip Summary Modal**: Comprehensive trip analysis with route maps and metrics

### 2. Quests Screen
- **Daily Challenges**: Smooth Operator, Route Explorer, Pace Yourself
- **Weekly Challenges**: Flow State, City Explorer, Eco Friendly
- **Progress Tracking**: Visual progress bars with gradient colors
- **Reward System**: Points and multiplier rewards for quest completion
- **Statistics**: Points and streak counters with gradient text effects

### 3. Map Screen
- **Interactive Map**: Full-screen MapLibre GL integration
- **Origin/Destination Input**: Custom address input fields
- **Navigation Integration**: Deep links to preferred map apps
- **Start Navigation Button**: Shiny animated button with glassmorphic styling
- **Trip Tracking**: Real-time location and route monitoring

### 4. Leaderboard Screen
- **Global Rankings**: Worldwide driver leaderboard
- **Weekly Rankings**: Time-based competition rankings
- **User Statistics**: Personal rank, points, and streak tracking
- **Filter Options**: Toggle between global and weekly views
- **Podium Display**: Top performers with special highlighting

### 5. Socials Screen (Friends)
- **Friend Connections**: Add and manage friend connections
- **Activity Feed**: Recent friend activities and achievements
- **Online Status**: Real-time friend availability indicators
- **Social Statistics**: Friend count and online user tracking
- **Friend Codes**: Unique codes for easy friend connections

### 6. Wallet Screen
- **USDT Balance**: Gradient text display with shiny blue effects
- **Transaction History**: Recent USDT claims and airdrops
- **Phantom Wallet Integration**: Connect Solana wallet functionality
- **Weekly Claims**: Countdown timer and estimated payouts
- **Points Tracking**: Total points and weekly progress

## 🛠 Technical Stack

### Frontend
- **React Native** with Expo SDK 49+
- **TypeScript** for type safety and better development experience
- **React Navigation** v6 for screen management and tab navigation
- **MapLibre GL** for interactive map rendering
- **Expo Vector Icons** for comprehensive iconography
- **Expo Linear Gradient** for gradient effects
- **React Native SVG** for custom gauge components
- **MaskedView** for gradient text effects
- **Expo Location** for GPS tracking
- **Expo Sensors** for IMU data collection

### Backend (Planned)
- **Node.js** with Fastify
- **PostgreSQL** for data storage
- **Redis** for caching
- **MagicBlock** for TEE scoring

### Blockchain
- **Solana** with Anchor framework
- **SPL Token 2022** for rewards
- **Private Ephemeral Rollup** for secure computation

## 🎨 Key Design Features

### Visual Design
- **Automotive Theme**: Digital cockpit aesthetic with dark backgrounds
- **Glassmorphic UI**: Subtle transparency effects throughout the app
- **Gradient Text**: Shiny blue gradients for USDT balances and important metrics
- **Circular Gauges**: Custom SVG-based safety score and metrics displays
- **Animated Elements**: Smooth transitions and interactive feedback
- **High Contrast**: Accessible design with proper contrast ratios

### Color Palette
```typescript
const theme = {
  colors: {
    background: '#1F2328',    // Deep charcoal
    surface: '#2A2F36',       // Darker surface
    primary: '#1E90FF',       // Electric blue
    secondary: '#3A3F45',     // Slate gray
    accent: '#D1D5DB',        // Silver
    success: '#32CD32',       // Neon green
    warning: '#FFA500',       // Orange
    error: '#FF4444',        // Red
    gold: '#EBCB6C',          // Gold for rewards
  }
}
```

### Typography
- **System Fonts**: San Francisco (iOS) and Roboto (Android)
- **Hierarchy**: Clear distinction between headings, body text, and labels
- **Accessibility**: High contrast ratios and proper font sizing
- **Gradient Text**: Special effects for important numerical values

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Expo CLI
- iOS Simulator or Android Emulator

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd roadsolsafe-app

# Install dependencies
npm install

# Start the development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

### Project Structure
```
src/
├── components/                    # Reusable UI components
│   ├── Button.tsx                # Custom button component
│   ├── Card.tsx                  # Glassmorphic card component
│   ├── GradientText.tsx          # Gradient text effects
│   ├── CircleGauge.tsx           # Circular progress gauges
│   ├── SafetyCluster.tsx         # Safety metrics cluster
│   ├── StartTripButtonShiny.tsx  # Animated trip button
│   ├── TripSummaryModal.tsx      # Trip analysis modal
│   └── CustomTabBar.tsx          # Custom tab navigation
├── screens/                      # Main app screens
│   ├── ProfileScreen.tsx         # Home/Dashboard screen
│   ├── QuestsScreen.tsx          # Quest management
│   ├── MapScreen.tsx             # Map and navigation
│   ├── LeaderboardScreen.tsx     # Rankings and competition
│   ├── SocialsScreen.tsx         # Friends and social features
│   └── WalletScreen.tsx          # USDT wallet and transactions
├── styles/
│   └── theme.ts                  # Design system and theme
└── App.tsx                       # Main app component
```

## 🔒 Privacy & Security

### Data Collection
- **GPS**: 1Hz location tracking during trips
- **IMU**: Accelerometer and gyroscope data
- **Interaction Signals**: Screen/touch/app-foreground detection
- **No Raw Media**: No video or audio recording

### Privacy Measures
- Raw telemetry buffered locally (≤72h)
- Only signed aggregates uploaded to secure compute
- Device attestation for fraud prevention
- Behavioral anomaly detection

### Safety Features
- Anti-cheat mechanisms (loop detection, desk-rig detection)
- Trip validation (minimum distance/time requirements)
- Tamper-resistant scoring algorithms

## 🎯 Safety Scoring Algorithm

### Base Score: 10 points
Subtract per 10km driven:
- **Hard Braking**: -1.5 points (|ax| > 3.5 m/s² for ≥300ms)
- **Hard Acceleration**: -1.0 points (|ax| > 3.0 m/s²)
- **Harsh Cornering**: -1.0 points (|yaw_rate| > 25°/s)
- **Speeding**: -6 × speeding_time_ratio
- **Phone Use**: -0.5 points per minute while moving

### Trip Validity Requirements
- Distance ≥ 2km AND moving time ≥ 8min
- Average speed ≥ 12km/h
- GPS continuity (no teleports)
- Congestion allowance (<30% time <5km/h)

## 🏆 Reward System

### Points Calculation
- **Per-trip**: [score] × ([km_driven] / 10)
- **Daily Quests**: +10 points each
- **Weekly Challenges**: +50 points each
- **Weekly Cap**: 300 base points per driver

### Token Distribution
- **USDT Payout**: ([your_points] / [all_points]) × [weekly_pool_usdt]
- **NFT Badges**: For consecutive safety streaks (30/60/100/1000 days)
- **Data Bonus**: +0.2x multiplier for full sensing consent

## 📊 Analytics & Transparency

### Weekly Reports
- Total trips counted
- Average safety scores
- Points created and distributed
- Fraud rejections
- Quest completions
- Pool funding and payouts

### Real-time Updates
- Live leaderboard rankings
- Friend activity feeds
- Quest progress tracking
- Safety score calculations

## 🔮 Development Status

### ✅ Completed Features
- **Core Mobile App**: All 6 main screens implemented
- **Automotive UI Design**: Dark theme with glassmorphic effects
- **Safety Cluster**: Circular gauges for metrics display
- **Gradient Text Effects**: Shiny blue gradients for important values
- **Trip Management**: Start/stop functionality with monitoring
- **Quest System**: Daily and weekly challenges with progress tracking
- **Social Features**: Friends list and leaderboard rankings
- **Wallet Integration**: USDT balance display and Phantom wallet connection
- **Map Integration**: MapLibre GL with navigation app deep linking
- **Custom Tab Navigation**: Animated tab bar with expandable labels
- **Responsive Design**: iPhone 15 Pro and Pixel 8 optimized layouts

### 🚧 In Progress
- **Backend Integration**: API endpoints for data persistence
- **Real-time Tracking**: Live GPS and sensor data collection
- **Blockchain Integration**: Solana smart contracts for rewards
- **Anti-cheat System**: Fraud detection and prevention

### 📋 Planned Features
- **Fleet Driver Support**: Multi-vehicle management
- **City Partnerships**: Municipal integration programs
- **Advanced Analytics**: Detailed driving behavior insights
- **Insurance Partnerships**: Risk assessment integration
- **Multi-chain Support**: Ethereum and other blockchain networks

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation wiki

---

**Built with ❤️ for safer roads and better driving habits.**
