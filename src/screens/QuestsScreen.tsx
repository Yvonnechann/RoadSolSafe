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
import { Card, ProgressBar, Badge } from '../components/Card';
import { Button } from '../components/Button';
import { theme } from '../styles/theme';

const { width: screenWidth } = Dimensions.get('window');

interface Quest {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  progress: number;
  target: number;
  reward: string;
  rewardType: 'points' | 'multiplier' | 'nft';
  completed: boolean;
  claimed: boolean;
  category: 'daily' | 'weekly';
}

export const QuestsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly'>('daily');

  const dailyQuests: Quest[] = [
    {
      id: '1',
      title: 'Smooth Operator',
      description: 'Complete 2 trips with safety score ≥ 8.0',
      icon: 'car-sport',
      progress: 1,
      target: 2,
      reward: '+10 pts',
      rewardType: 'points',
      completed: false,
      claimed: false,
      category: 'daily',
    },
    {
      id: '2',
      title: 'Route Explorer',
      description: '1 trip with ≥ 20% distance on new tiles',
      icon: 'map',
      progress: 0,
      target: 1,
      reward: '+10 pts',
      rewardType: 'points',
      completed: false,
      claimed: false,
      category: 'daily',
    },
    {
      id: '3',
      title: 'Pace Yourself',
      description: 'Maintain speed within ±5 km/h for ≥ 8 minutes',
      icon: 'speedometer',
      progress: 0.6,
      target: 1,
      reward: '+10 pts',
      rewardType: 'points',
      completed: false,
      claimed: false,
      category: 'daily',
    },
  ];

  const weeklyQuests: Quest[] = [
    {
      id: '4',
      title: 'Flow State',
      description: '10 trips with safety score ≥ 8.0',
      icon: 'trophy',
      progress: 7,
      target: 10,
      reward: '+50 pts',
      rewardType: 'points',
      completed: false,
      claimed: false,
      category: 'weekly',
    },
    {
      id: '5',
      title: 'City Explorer',
      description: 'Visit 5 tiles not driven in past 14 days',
      icon: 'location',
      progress: 3,
      target: 5,
      reward: '2x Multiplier',
      rewardType: 'multiplier',
      completed: false,
      claimed: false,
      category: 'weekly',
    },
    {
      id: '6',
      title: 'Eco Friendly',
      description: 'Complete Pace Yourself ×5',
      icon: 'leaf',
      progress: 2,
      target: 5,
      reward: 'Eco NFT',
      rewardType: 'nft',
      completed: false,
      claimed: false,
      category: 'weekly',
    },
    {
      id: '7',
      title: 'Safety Streak',
      description: '30 consecutive days with score ≥ 8.0',
      icon: 'flame',
      progress: 12,
      target: 30,
      reward: 'Streak NFT',
      rewardType: 'nft',
      completed: false,
      claimed: false,
      category: 'weekly',
    },
  ];

  const currentQuests = activeTab === 'daily' ? dailyQuests : weeklyQuests;

  const getRewardColor = (rewardType: string) => {
    switch (rewardType) {
      case 'points': return theme.colors.primary;
      case 'multiplier': return theme.colors.gold;
      case 'nft': return theme.colors.success;
      default: return theme.colors.textSecondary;
    }
  };

  const getProgressColor = (progress: number, target: number) => {
    const percentage = progress / target;
    if (percentage >= 1) return theme.colors.success;
    if (percentage >= 0.7) return theme.colors.warning;
    return theme.colors.primary;
  };

  const QuestCard: React.FC<{ quest: Quest }> = ({ quest }) => {
    const progressPercentage = quest.progress / quest.target;
    const isCompleted = quest.completed;
    const canClaim = isCompleted && !quest.claimed;

    return (
      <Card style={styles.questCard}>
        <View style={styles.questHeader}>
          <View style={styles.questIconContainer}>
            <Ionicons 
              name={quest.icon} 
              size={24} 
              color={isCompleted ? theme.colors.success : theme.colors.text} 
            />
          </View>
          <View style={styles.questInfo}>
            <Text style={styles.questTitle}>{quest.title}</Text>
            <Text style={styles.questDescription}>{quest.description}</Text>
          </View>
          <View style={styles.questReward}>
            <Badge 
              variant={quest.rewardType === 'nft' ? 'gold' : 'default'} 
              size="sm"
            >
              <Text style={[
                styles.rewardText,
                { color: quest.rewardType === 'nft' ? '#000000' : theme.colors.text }
              ]}>
                {quest.reward}
              </Text>
            </Badge>
          </View>
        </View>

        <View style={styles.questProgress}>
          <View style={styles.progressInfo}>
            <Text style={styles.progressText}>
              {quest.progress}/{quest.target}
            </Text>
            <Text style={styles.progressPercentage}>
              {Math.round(progressPercentage * 100)}%
            </Text>
          </View>
          <ProgressBar
            progress={progressPercentage}
            color={getProgressColor(quest.progress, quest.target)}
            backgroundColor={theme.colors.surface}
            height={6}
          />
        </View>

        {canClaim && (
          <Button
            title="Claim Reward"
            onPress={() => {}}
            variant="success"
            size="sm"
            icon="gift"
            style={styles.claimButton}
          />
        )}

        {quest.claimed && (
          <View style={styles.claimedBadge}>
            <Ionicons name="checkmark-circle" size={16} color={theme.colors.success} />
            <Text style={styles.claimedText}>Claimed</Text>
          </View>
        )}
      </Card>
    );
  };

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header with Stats */}
        <View style={styles.headerContent}>
          <View style={styles.headerStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Daily</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>4</Text>
              <Text style={styles.statLabel}>Weekly</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Streak</Text>
            </View>
          </View>
        </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'daily' && styles.activeTab
          ]}
          onPress={() => setActiveTab('daily')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'daily' && styles.activeTabText
          ]}>
            Daily
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'weekly' && styles.activeTab
          ]}
          onPress={() => setActiveTab('weekly')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'weekly' && styles.activeTabText
          ]}>
            Weekly
          </Text>
        </TouchableOpacity>
      </View>

      {/* Quests List */}
      <ScrollView 
        style={styles.questsList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.questsListContent}
      >
        {currentQuests.map((quest) => (
          <QuestCard key={quest.id} quest={quest} />
        ))}
      </ScrollView>

      {/* Bottom Info */}
      <Card style={styles.bottomInfo}>
        <View style={styles.bottomInfoContent}>
          <Ionicons name="information-circle" size={20} color={theme.colors.primary} />
          <Text style={styles.bottomInfoText}>
            Complete quests to earn points and unlock special rewards. 
            Daily quests reset every 24 hours.
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
    paddingTop: theme.spacing['6xl'],
    paddingBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
  },
  headerStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    marginTop: theme.spacing.xs,
  },

  // Tab styles
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    marginHorizontal: theme.spacing.lg,
    marginTop: -theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xs,
    ...theme.shadows.md,
  },
  tab: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    borderRadius: theme.borderRadius.md,
  },
  activeTab: {
    backgroundColor: theme.colors.primary,
  },
  tabText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  activeTabText: {
    color: '#FFFFFF',
  },

  // Quest styles
  questsList: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
  },
  questsListContent: {
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  questCard: {
    marginBottom: theme.spacing.lg,
  },
  questHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  questIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  questInfo: {
    flex: 1,
  },
  questTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    marginBottom: theme.spacing.xs,
  },
  questDescription: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSize.sm,
    lineHeight: theme.typography.lineHeight.relaxed,
  },
  questReward: {
    marginLeft: theme.spacing.sm,
  },
  rewardText: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.bold,
  },
  questProgress: {
    marginBottom: theme.spacing.md,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  progressText: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
  },
  progressPercentage: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
  },
  claimButton: {
    marginTop: theme.spacing.sm,
  },
  claimedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
    backgroundColor: 'rgba(50, 205, 50, 0.1)',
    borderRadius: theme.borderRadius.md,
  },
  claimedText: {
    color: theme.colors.success,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
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
