import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const SideQuestsTab = () => {
  const [quests, setQuests] = useState([
    {
      id: 1,
      title: 'Start an adventure today',
      reward: 500,
      progress: '0/1',
      completed: false,
    },
    {
      id: 2,
      title: 'Collect 1000 diamonds',
      reward: 1000,
      progress: '0/1000',
      completed: false,
    },
  ]);

  const getProgress = (progress) => {
    const [current, total] = progress.split('/').map(Number);
    return (current / total) * 100;
  };

  const claimQuest = (questId) => {
    setQuests((prevQuests) =>
      prevQuests.map((quest) =>
        quest.id === questId
          ? { ...quest, completed: true }
          : quest
      )
    );
  };

  const deleteQuest = (questId) => {
    setQuests((prevQuests) => prevQuests.filter((quest) => quest.id !== questId));
  };

  const QuestCard = ({ quest }) => (
    <View style={styles.card}>
      <LinearGradient
        colors={['rgba(30, 41, 59, 0.9)', 'rgba(30, 41, 59, 0.95)']}
        style={styles.cardGradient}
      >
        <View style={styles.cardContent}>
          <Text style={styles.title}>{quest.title}</Text>

          <View style={styles.progressContainer}>
            <Text style={styles.progressLabel}>Progress</Text>
            <Text style={styles.progressText}>{quest.progress}</Text>
          </View>

          <View style={styles.progressBarBackground}>
            <LinearGradient
              colors={['#F59E0B', '#FBBF24']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[
                styles.progressBarFill,
                { width: `${getProgress(quest.progress)}%` },
              ]}
            />
          </View>

          <View style={styles.rewardContainer}>
            <View style={styles.rewardBadge}>
              <Text style={styles.rewardText}>{quest.reward}</Text>
              <Text style={styles.rewardEmoji}>💎</Text>
            </View>

            <TouchableOpacity
              style={[
                styles.claimButton,
                quest.completed ? styles.claimButtonDisabled : null,
              ]}
              disabled={quest.completed}
              onPress={() => {
                claimQuest(quest.id);
                deleteQuest(quest.id);
              }}
            >
              <LinearGradient
                colors={['#15803d', '#16a34a']}
                style={styles.claimButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.claimButtonText}>
                  {quest.completed ? 'Claimed' : 'Claim'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );

  return (
    <ImageBackground 
      source={require('@/assets/5.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0.6)']}
          style={styles.headerContainer}
        >
          <View style={styles.headerIconContainer}>
            <Text style={styles.headerIcon}>⚔️</Text>
          </View>
          <Text style={styles.headerTitle}>Side Quests</Text>
          <Text style={styles.headerSubtitle}>Complete quests to earn more diamonds 💎</Text>
          <View style={styles.decorativeLine} />
        </LinearGradient>
        {quests.map((quest) => (
          <QuestCard key={quest.id} quest={quest} />
        ))}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 24,
    gap: 16,
  },
  headerContainer: {
    marginBottom: 20,
    alignItems: 'center',
    borderRadius: 16,
    padding: 20,
    backgroundColor: 'orange',
    borderWidth: 2,

  
  },
  headerIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerIcon: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#cbd5e1',
    textAlign: 'center',
    marginBottom: 16,
  },
  decorativeLine: {
    width: '40%',
    height: 2,
    backgroundColor: '#334155',
    borderRadius: 1,
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'gray',
  },
  cardGradient: {
    borderRadius: 12,
  },
  cardContent: {
    padding: 20,
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#94a3b8',
  },
  progressText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#cbd5e1',
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#334155',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  rewardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  rewardBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    gap: 8,
  },
  rewardText: {
    color: '#FBBF24',
    fontWeight: '700',
  },
  rewardEmoji: {
    fontSize: 16,
  },
  claimButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  claimButtonGradient: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  claimButtonDisabled: {
    opacity: 0.5,
  },
  claimButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});

export default SideQuestsTab;