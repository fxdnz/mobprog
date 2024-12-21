import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <Image
            source={require('@/assets/cute-girl.png')}
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.username}>BearBrand</Text>
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>Level 1 Adventurer</Text>
        </View>
      </View>

      {/* Achievements Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="star" size={24} color="#FFD700" />
          <Text style={styles.sectionTitle}>Achievements</Text>
        </View>
        <View style={styles.achievementRow}>
          <Text style={styles.achievementLabel}>Total Quests Completed</Text>
          <Text style={styles.achievementValue}>1</Text>
        </View>
        <View style={styles.achievementRow}>
          <Text style={styles.achievementLabel}>Total Adventures</Text>
          <Text style={styles.achievementValue}>0</Text>
        </View>
        <View style={styles.achievementRow}>
          <Text style={styles.achievementLabel}>Diamonds Earned </Text>
          <View style={styles.diamondContainer}>
            <Text style={styles.achievementValue}>0 💎</Text>
            
          </View>
        </View>
      </View>

      {/* Badges Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="trophy" size={24} color="#FFD700" />
          <Text style={styles.sectionTitle}>Badges</Text>
        </View>
        <View style={styles.badgesContainer}>
          {[1, 2, 3, 4].map((badge) => (
            <View key={badge} style={styles.badgeItem}>
              <Image
                source={require('@/assets/badge.webp')}
                style={styles.trophyImage}
              />
              <Text style={styles.badgeText}>Badge {badge}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Settings Button */}
      <TouchableOpacity style={styles.settingsButton}>
        <Ionicons name="settings" size={24} color="#4A90E2" />
        <Text style={styles.settingsText}>Settings</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A2233',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingTop: 40
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFD700',
    padding: 2,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    backgroundColor: 'white',
  },
  username: {
    fontSize: 24,
    color: '#FFF',
    marginTop: 10,
  },
  levelBadge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    marginTop: 5,
  },
  levelText: {
    color: '#000',
    fontWeight: '600',
  },
  section: {
    backgroundColor: '#252D3F',
    margin: 10,
    borderRadius: 10,
    padding: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  achievementRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  achievementLabel: {
    color: '#B0B0B0',
    fontSize: 16,
  },
  achievementValue: {
    color: '#FFF',
    fontSize: 16,
  },
  diamondContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  badgesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  badgeItem: {
    alignItems: 'center',
    width: '23%',
  },
  trophyImage: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  badgeText: {
    color: '#B0B0B0',
    fontSize: 12,
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#252D3F',
    margin: 10,
    padding: 15,
    borderRadius: 10,
  },
  settingsText: {
    color: '#FFF',
    marginLeft: 10,
    fontSize: 16,
  },
  logoutButton: {
    margin: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF3B30',
    alignItems: 'center',
  },
  logoutText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#252D3F',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#FFD700',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
});

export default ProfileScreen;