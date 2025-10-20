# RoadSolSafe - DePIN Rewards Platform

A mobile app for incentivizing safer, low-risk driving by issuing cryptocurrency tokens and NFTs for verified driving behavior. Features an automotive-themed, safety-focused, tech-savvy UI designed for both iOS and Android.

## 🚗 Features

### Core Functionality
- **Safety Scoring**: Real-time calculation based on driving behavior (GPS, IMU, interaction signals)
- **Token Rewards**: Weekly claimable SPL tokens and milestone NFTs
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

### 1. Profile Screen
- Safety score gauge (circular progress, 0-10 scale)
- Weekly earnings and badge carousel
- Recent trip history
- Settings and wallet integration

### 2. Quests Screen
- Daily challenges (Smooth Operator, Route Explorer, Pace Yourself)
- Weekly challenges (Flow State, City Explorer, Eco Friendly)
- Progress tracking with visual indicators
- Reward claiming system

### 3. Map Screen
- Full-screen interactive map with MapLibre GL
- Start/stop trip functionality
- Real-time trip tracking
- Navigation app integration
- Safety tips overlay

### 4. Leaderboard Screen
- Global and weekly rankings
- Podium display for top performers
- Safety score and streak tracking
- Current user highlighting

### 5. Socials Screen
- Friend connections and activity feed
- Points sharing and competition
- Friend code system
- Online status indicators

## 🛠 Technical Stack

### Frontend
- **React Native** with Expo
- **TypeScript** for type safety
- **React Navigation** for screen management
- **MapLibre GL** for map rendering
- **Expo Vector Icons** for iconography

### Backend (Planned)
- **Node.js** with Fastify
- **PostgreSQL** for data storage
- **Redis** for caching
- **MagicBlock** for TEE scoring

### Blockchain
- **Solana** with Anchor framework
- **SPL Token 2022** for rewards
- **Private Ephemeral Rollup** for secure computation

## 🎨 Design System

### Colors
```typescript
const theme = {
  colors: {
    background: '#1F2328',    // Deep charcoal
    primary: '#1E90FF',       // Electric blue
    success: '#32CD32',       // Neon green
    gold: '#EBCB6C',          // Gold for rewards
    warning: '#FFA500',       // Orange
    error: '#FF4444',        // Red
  }
}
```

### Typography
- **Font Family**: System fonts (San Francisco for iOS, Roboto for Android)
- **Hierarchy**: Emphasizes safety scores and rewards
- **Accessibility**: High contrast ratios for readability

### Components
- **Button**: Multiple variants with automotive styling
- **Card**: Glass morphism with subtle gradients
- **SafetyScoreGauge**: Circular progress indicator
- **ProgressBar**: Dynamic color changes based on completion
- **DeviceFrame**: iPhone 15 Pro and Pixel 8 mockups

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
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   └── DeviceFrame.tsx
├── screens/            # Main app screens
│   ├── ProfileScreen.tsx
│   ├── QuestsScreen.tsx
│   ├── MapScreen.tsx
│   ├── LeaderboardScreen.tsx
│   ├── SocialsScreen.tsx
│   └── DeviceFrameDemo.tsx
└── styles/
    └── theme.ts        # Design system and theme
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

## 🔮 Future Roadmap

### Phase 1 (MVP)
- ✅ Core mobile app with all screens
- ✅ Basic safety scoring algorithm
- ✅ Quest system implementation
- ✅ Social features and leaderboards

### Phase 2 (Expansion)
- Fleet driver support
- City partner integrations
- Advanced analytics dashboard
- Enhanced anti-cheat measures

### Phase 3 (Scale)
- Multi-chain support
- Advanced AI coaching
- Insurance partnerships
- Global expansion

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
