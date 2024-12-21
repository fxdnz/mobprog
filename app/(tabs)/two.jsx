import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView, StyleSheet, Modal, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ShopTab = () => {
  // Mock data
  const VOUCHERS = [
    { id: '1', title: 'Koykoy 50PHP', rarity: 'Rare', diamonds: 5000, icon: require('@/assets/koykoy.webp') },
    { id: '2', title: 'Koykoy Premium', rarity: 'Rare', diamonds: 10000, icon: require('@/assets/koykoy.webp') },
    { id: '3', title: 'Extra Quest Slot', rarity: 'Hero', diamonds: 7500, icon: require('@/assets/quest.webp') },
    { id: '4', title: 'Double Quest Slot', rarity: 'Hero', diamonds: 15000, icon: require('@/assets/quest.webp') },
    { id: '5', title: 'Nuda 100PHP', rarity: 'Legendary', diamonds: 20000, icon: require('@/assets/nuda.webp') },
    { id: '6', title: 'Nuda 250PHP', rarity: 'Legendary', diamonds: 50000, icon: require('@/assets/nuda.webp') },
  ];

  const [vouchers] = useState(VOUCHERS);
  const [claimedItems, setClaimedItems] = useState(new Set());
  const [modalVisible, setModalVisible] = useState(false);
  const [claimedVoucher, setClaimedVoucher] = useState(null);

  // Group vouchers by rarity
  const groupedVouchers = vouchers.reduce((acc, voucher) => {
    acc[voucher.rarity] = acc[voucher.rarity] || [];
    acc[voucher.rarity].push(voucher);
    return acc;
  }, {});

  // Function to get rarity color
  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'Rare': return '#2563eb';      // blue-600
      case 'Hero': return '#9333ea';      // purple-600
      case 'Legendary': return '#d97706'; // amber-600
      default: return '#6b7280';          // gray-500
    }
  };

  const handleClaimVoucher = (voucher) => {
    setClaimedItems(new Set(claimedItems.add(voucher.id)));
    setClaimedVoucher(voucher);
    setModalVisible(true);
  };

  const renderVoucherCard = (voucher) => (
    <View key={voucher.id} style={styles.card}>
      <View style={[styles.cardHeader, { backgroundColor: getRarityColor(voucher.rarity) }]}>
        <Text style={styles.cardTitle}>{voucher.title}</Text>
      </View>
  
      <View style={styles.cardContent}>
        <View style={styles.iconContainer}>
          <Image
            source={voucher.icon}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>
  
        <Text style={styles.rarityText}>{voucher.rarity}</Text>
  
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: getRarityColor(voucher.rarity) }]}
          onPress={() => handleClaimVoucher(voucher)}
          disabled={claimedItems.has(voucher.id)}
        >
          <Text style={styles.diamondEmoji}>💎</Text>
          <Text style={styles.priceText}>
            {claimedItems.has(voucher.id) ? 'Claimed' : `x${voucher.diamonds.toLocaleString()}`}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  
  return (
    <ImageBackground 
      source={require('@/assets/spring.png')}
      style={styles.container}
    >
      <LinearGradient
        colors={['rgba(15, 23, 42, 0.7)', 'rgba(15, 23, 42, 0.7)']}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Diamond Shop</Text>
          <Text style={styles.headerSubtitle}>Exclusive vouchers available now!</Text>
        </View>

        <ScrollView style={styles.scrollView}>
          <View style={styles.content}>
            {Object.entries(groupedVouchers).map(([rarity, voucherList]) => (
              <View key={rarity} style={styles.section}>
                <Text style={styles.sectionTitle}>{rarity} Vouchers</Text>
                <View style={styles.cardsContainer}>
                  {voucherList.map(renderVoucherCard)}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        <Modal
          transparent={true}
          animationType="fade"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Congratulations!</Text>
              <Text style={styles.modalMessage}>You have successfully claimed {claimedVoucher?.title}!</Text>
              <TouchableOpacity 
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    height: 96,
    backgroundColor: '#f59e0b', // amber-500
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#1f2937', // gray-800
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    
  },
  card: {
    width: '48%',
    marginBottom: 16,
    backgroundColor: '#1e293b', // slate-800
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 2
  },
  cardHeader: {
    padding: 8,
    borderBottomWidth: 2
  },
  cardTitle: {
    color: '#ffffff',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 14,
  },
  cardContent: {
    backgroundColor: '#334155', // slate-700
    padding: 16,
    alignItems: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    backgroundColor: '#475569', // slate-600
    borderRadius: 8,
    borderWidth: 4,
    borderColor: '#64748b', // slate-500
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    width: 48,
    height: 48,
  },
  rarityText: {
    color: '#e2e8f0', // gray-200
    fontWeight: '600',
    marginBottom: 12,
  },
  button: {
    width: '100%',
    borderRadius: 8,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2
  },
  diamondEmoji: {
    fontSize: 18,
    marginRight: 4,
  },
  priceText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#1e293b', // slate-800
    padding: 20,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  modalMessage: {
    fontSize: 16,
    color: '#e2e8f0',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#f59e0b', // amber-500
    padding: 10,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#000000',
    fontWeight: 'bold',
  },
});

export default ShopTab;