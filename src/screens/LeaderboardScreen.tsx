import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Card, Badge } from '../components/Card';
import { theme } from '../styles/theme';

const { width: screenWidth } = Dimensions.get('window');

interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  avatar?: string;
  points: number;
  safetyScore: number;
  streakDays: number;
  tripsCompleted: number;
  isCurrentUser?: boolean;
}

export const LeaderboardScreen: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'global' | 'weekly'>('global');

  const globalLeaderboard: LeaderboardEntry[] = [
    {
      id: '1',
      rank: 1,
      name: 'Sarah Chen',
      points: 2847,
      safetyScore: 9.2,
      streakDays: 45,
      tripsCompleted: 127,
    },
    {
      id: '2',
      rank: 2,
      name: 'Mike Rodriguez',
      points: 2653,
      safetyScore: 9.0,
      streakDays: 38,
      tripsCompleted: 112,
    },
    {
      id: '3',
      rank: 3,
      name: 'Emma Thompson',
      points: 2489,
      safetyScore: 8.9,
      streakDays: 32,
      tripsCompleted: 98,
    },
    {
      id: '4',
      rank: 4,
      name: 'Alex Driver',
      points: 1847,
      safetyScore: 8.7,
      streakDays: 12,
      tripsCompleted: 67,
      isCurrentUser: true,
    },
    {
      id: '5',
      rank: 5,
      name: 'David Kim',
      points: 1723,
      safetyScore: 8.5,
      streakDays: 28,
      tripsCompleted: 89,
    },
    {
      id: '6',
      rank: 6,
      name: 'Lisa Wang',
      points: 1654,
      safetyScore: 8.3,
      streakDays: 15,
      tripsCompleted: 73,
    },
    {
      id: '7',
      rank: 7,
      name: 'James Wilson',
      points: 1521,
      safetyScore: 8.1,
      streakDays: 22,
      tripsCompleted: 81,
    },
    {
      id: '8',
      rank: 8,
      name: 'Anna Garcia',
      points: 1432,
      safetyScore: 7.9,
      streakDays: 18,
      tripsCompleted: 65,
    },
  ];

  const weeklyLeaderboard: LeaderboardEntry[] = [
    {
      id: '1',
      rank: 1,
      name: 'Mike Rodriguez',
      points: 245,
      safetyScore: 9.1,
      streakDays: 7,
      tripsCompleted: 12,
    },
    {
      id: '2',
      rank: 2,
      name: 'Sarah Chen',
      points: 238,
      safetyScore: 9.0,
      streakDays: 7,
      tripsCompleted: 11,
    },
    {
      id: '3',
      rank: 3,
      name: 'Emma Thompson',
      points: 221,
      safetyScore: 8.8,
      streakDays: 6,
      tripsCompleted: 10,
    },
    {
      id: '4',
      rank: 4,
      name: 'Alex Driver',
      points: 198,
      safetyScore: 8.7,
      streakDays: 5,
      tripsCompleted: 9,
      isCurrentUser: true,
    },
    {
      id: '5',
      rank: 5,
      name: 'David Kim',
      points: 187,
      safetyScore: 8.5,
      streakDays: 7,
      tripsCompleted: 8,
    },
  ];

  const currentLeaderboard = activeFilter === 'global' ? globalLeaderboard : weeklyLeaderboard;

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return 'trophy';
      case 2: return 'medal';
      case 3: return 'ribbon';
      default: return 'person';
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return theme.colors.gold;
      case 2: return theme.colors.accent;
      case 3: return '#CD7F32'; // Bronze
      default: return theme.colors.textSecondary;
    }
  };

  const getSafetyScoreColor = (score: number) => {
    if (score >= 8) return theme.colors.scoreHigh;
    if (score >= 5) return theme.colors.scoreMedium;
    return theme.colors.scoreLow;
  };

  const LeaderboardRow: React.FC<{ entry: LeaderboardEntry }> = ({ entry }) => {
    return (
      <View style={[
        styles.leaderboardRow,
        entry.isCurrentUser && styles.currentUserRow
      ]}>
        <View style={styles.rankContainer}>
          <View style={[
            styles.rankBadge,
            { backgroundColor: getRankColor(entry.rank) }
          ]}>
            <Ionicons
              name={getRankIcon(entry.rank) as any}
              size={16}
              color={entry.rank <= 3 ? '#000000' : theme.colors.text}
            />
          </View>
          <Text style={styles.rankText}>#{entry.rank}</Text>
        </View>

        <View style={styles.userInfo}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={20} color={theme.colors.text} />
          </View>
          <View style={styles.userDetails}>
            <Text style={[
              styles.userName,
              entry.isCurrentUser && styles.currentUserName
            ]}>
              {entry.name}
            </Text>
            <View style={styles.userStats}>
              <Text style={styles.userStat}>
                {entry.tripsCompleted} trips
              </Text>
              <Text style={styles.userStat}>
                {entry.streakDays} day streak
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.scoreContainer}>
          <Text style={styles.pointsText}>{entry.points.toLocaleString()}</Text>
          <View style={styles.safetyScoreContainer}>
            <Text style={[
              styles.safetyScoreText,
              { color: getSafetyScoreColor(entry.safetyScore) }
            ]}>
              {entry.safetyScore.toFixed(1)}
            </Text>
            <Text style={styles.safetyScoreLabel}>/10</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Leaderboard</Text>
          <View style={styles.headerStats}>
            <View style={styles.headerStat}>
              <Text style={styles.headerStatValue}>
                {activeFilter === 'global' ? '2,847' : '245'}
              </Text>
              <Text style={styles.headerStatLabel}>Your Rank</Text>
            </View>
            <View style={styles.headerStat}>
              <Text style={styles.headerStatValue}>
                {activeFilter === 'global' ? '4th' : '4th'}
              </Text>
              <Text style={styles.headerStatLabel}>Position</Text>
            </View>
          </View>
        </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterTab,
            activeFilter === 'global' && styles.activeFilterTab
          ]}
          onPress={() => setActiveFilter('global')}
        >
          <Text style={[
            styles.filterTabText,
            activeFilter === 'global' && styles.activeFilterTabText
          ]}>
            Global
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterTab,
            activeFilter === 'weekly' && styles.activeFilterTab
          ]}
          onPress={() => setActiveFilter('weekly')}
        >
          <Text style={[
            styles.filterTabText,
            activeFilter === 'weekly' && styles.activeFilterTabText
          ]}>
            This Week
          </Text>
        </TouchableOpacity>
      </View>

      {/* Podium */}
      {activeFilter === 'global' && (
        <Card style={styles.podiumCard}>
          <Text style={styles.podiumTitle}>Top Performers</Text>
          <View style={styles.podium}>
            {/* 2nd Place */}
            <View style={styles.podiumSecond}>
              <View style={styles.podiumAvatar}>
                <Ionicons name="person" size={24} color={theme.colors.text} />
              </View>
              <Text style={styles.podiumName}>Mike</Text>
              <Text style={styles.podiumPoints}>2,653</Text>
              <View style={styles.podiumRank}>
                <Ionicons name="medal" size={16} color={theme.colors.accent} />
                <Text style={styles.podiumRankText}>2nd</Text>
              </View>
            </View>

            {/* 1st Place */}
            <View style={styles.podiumFirst}>
              <View style={styles.podiumAvatar}>
                <Ionicons name="person" size={28} color={theme.colors.text} />
              </View>
              <Text style={styles.podiumName}>Sarah</Text>
              <Text style={styles.podiumPoints}>2,847</Text>
              <View style={styles.podiumRank}>
                <Ionicons name="trophy" size={18} color={theme.colors.gold} />
                <Text style={styles.podiumRankText}>1st</Text>
              </View>
            </View>

            {/* 3rd Place */}
            <View style={styles.podiumThird}>
              <View style={styles.podiumAvatar}>
                <Ionicons name="person" size={20} color={theme.colors.text} />
              </View>
              <Text style={styles.podiumName}>Emma</Text>
              <Text style={styles.podiumPoints}>2,489</Text>
              <View style={styles.podiumRank}>
                <Ionicons name="ribbon" size={14} color="#CD7F32" />
                <Text style={styles.podiumRankText}>3rd</Text>
              </View>
            </View>
          </View>
        </Card>
      )}

      {/* Leaderboard List */}
      <ScrollView 
        style={styles.leaderboardList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.leaderboardListContent}
      >
        <Card style={styles.leaderboardCard}>
          <View style={styles.leaderboardHeader}>
            <Text style={styles.leaderboardTitle}>
              {activeFilter === 'global' ? 'All Time Rankings' : 'Weekly Rankings'}
            </Text>
            <Text style={styles.leaderboardSubtitle}>
              {activeFilter === 'global' ? 'Total points earned' : 'Points this week'}
            </Text>
          </View>

          <View style={styles.leaderboardRows}>
            {currentLeaderboard.map((entry) => (
              <LeaderboardRow key={entry.id} entry={entry} />
            ))}
          </View>
        </Card>
      </ScrollView>

      {/* Bottom Info */}
      <Card style={styles.bottomInfo}>
        <View style={styles.bottomInfoContent}>
          <Ionicons name="information-circle" size={20} color={theme.colors.primary} />
          <Text style={styles.bottomInfoText}>
            Rankings are updated in real-time. Complete more trips and maintain high safety scores to climb the leaderboard!
          </Text>
        </View>
      </Card>
    </ScrollView>
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
  scrollView: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  // Header styles
  headerContent: {
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
  },
  headerTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing.lg,
  },
  headerStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  headerStat: {
    alignItems: 'center',
  },
  headerStatValue: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
  },
  headerStatLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    marginTop: theme.spacing.xs,
  },

  // Filter styles
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    marginHorizontal: theme.spacing.lg,
    marginTop: -theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xs,
    ...theme.shadows.md,
  },
  filterTab: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    borderRadius: theme.borderRadius.md,
  },
  activeFilterTab: {
    backgroundColor: theme.colors.primary,
  },
  filterTabText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  activeFilterTabText: {
    color: '#FFFFFF',
  },

  // Podium styles
  podiumCard: {
    margin: theme.spacing.lg,
    marginTop: theme.spacing.lg,
  },
  podiumTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  podium: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 120,
  },
  podiumFirst: {
    alignItems: 'center',
    marginHorizontal: theme.spacing.sm,
  },
  podiumSecond: {
    alignItems: 'center',
    marginHorizontal: theme.spacing.sm,
  },
  podiumThird: {
    alignItems: 'center',
    marginHorizontal: theme.spacing.sm,
  },
  podiumAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
    ...theme.shadows.md,
  },
  podiumName: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    marginBottom: theme.spacing.xs,
  },
  podiumPoints: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.medium,
    marginBottom: theme.spacing.xs,
  },
  podiumRank: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  podiumRankText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.medium,
    marginLeft: theme.spacing.xs,
  },

  // Leaderboard styles
  leaderboardList: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
  },
  leaderboardListContent: {
    paddingBottom: theme.spacing.xl,
  },
  leaderboardCard: {
    padding: theme.spacing.lg,
  },
  leaderboardHeader: {
    marginBottom: theme.spacing.lg,
  },
  leaderboardTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing.xs,
  },
  leaderboardSubtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSize.sm,
  },
  leaderboardRows: {
    gap: theme.spacing.sm,
  },
  leaderboardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
  },
  currentUserRow: {
    backgroundColor: 'rgba(30, 144, 255, 0.1)',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  rankContainer: {
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  rankBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.xs,
  },
  rankText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.medium,
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    marginBottom: theme.spacing.xs,
  },
  currentUserName: {
    color: theme.colors.primary,
  },
  userStats: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  userStat: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSize.xs,
  },
  scoreContainer: {
    alignItems: 'flex-end',
  },
  pointsText: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing.xs,
  },
  safetyScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  safetyScoreText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  safetyScoreLabel: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSize.xs,
    marginLeft: theme.spacing.xs,
  },

  // Bottom info styles
  bottomInfo: {
    margin: theme.spacing.lg,
    marginTop: 0,
  },
  bottomInfoContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bottomInfoText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSize.sm,
    lineHeight: theme.typography.lineHeight.relaxed,
    marginLeft: theme.spacing.sm,
    flex: 1,
  },
});
