// Import statements
import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput,
  Modal,
  SafeAreaView,
  ScrollView,
  Platform,
  Dimensions
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur'; 
import FontAwesome from '@expo/vector-icons/FontAwesome';



// Constants
const ICON_OPTIONS = [
  { id: 'default', imagePath: require('@/assets/quest.webp') },
  { id: 'study', imagePath: require('@/assets/study.webp') },
  { id: 'exercise', imagePath: require('@/assets/exercise.webp') },
  { id: 'work', imagePath: require('@/assets/work.webp') },
];

const DEFAULT_ICON = require('@/assets/quest.webp');
const MAX_TITLE_LENGTH = 40;

const SCREEN_HEIGHT = Dimensions.get('window').height;


export default function TabOneScreen() {
  // State Management
  // Energy system states
  const [energy, setEnergy] = useState(0);
  const [maxEnergy, setMaxEnergy] = useState(100);
  const [characterAnimation, setCharacterAnimation] = useState(require('@/assets/idle.gif'));
  
  // Quest management states
  const [quests, setQuests] = useState([]);
  const [editTitle, setEditTitle] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(DEFAULT_ICON);
  const [quickAddTitle, setQuickAddTitle] = useState('');
  const [isIconModalVisible, setIsIconModalVisible] = useState(false);
  const [currentEditingQuest, setCurrentEditingQuest] = useState(null);
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  const [scrollY, setScrollY] = useState(0);

  // Quest Management Functions
  // Initiate quest editing
  const startEditing = (quest) => {
    setCurrentEditingQuest(quest);
    setEditTitle(quest.title);
    setSelectedIcon(quest.iconPath);
  };

  // Save quest edits
  const saveEdit = () => {
    const trimmedTitle = editTitle.trim();
    if (!trimmedTitle || !currentEditingQuest) return;

    setQuests(prev => prev.map(quest => 
      quest.id === currentEditingQuest.id
        ? { ...quest, title: trimmedTitle, iconPath: selectedIcon }
        : quest
    ));
    
    resetEditingState();
  };

  // Cancel quest editing
  const cancelEdit = () => {
    resetEditingState();
  };

  // Reset editing state helper
  const resetEditingState = () => {
    setCurrentEditingQuest(null);
    setEditTitle('');
    setSelectedIcon(DEFAULT_ICON);
  };

  // Quick add new quest
  const handleQuickAdd = () => {
    const trimmedTitle = quickAddTitle.trim();
    if (trimmedTitle) {
      const newQuest = {
        id: Date.now(),
        title: trimmedTitle,
        energy: 5,
        iconPath: selectedIcon
      };
      setQuests(prev => [...prev, newQuest]);
      
      setQuickAddTitle('');
      setSelectedIcon(DEFAULT_ICON);
      setShowQuickAdd(false); 
    }
  };

  // Complete quest and gain energy
  const completeQuest = (quest) => {
    setEnergy(prev => Math.min(maxEnergy, prev + quest.energy));
    setQuests(prev => prev.filter(q => q.id !== quest.id));
  };

  // Delete quest
  const deleteQuest = (id) => {
    setQuests(quests.filter(quest => quest.id !== id));
  };

  // New state for filtering
  const [selectedFilter, setSelectedFilter] = useState(null);

  // Filter quests based on selected icon
  const filteredQuests = selectedFilter
    ? quests.filter(quest => quest.iconPath === selectedFilter)
    : quests;

  // Toggle filter function
  const toggleFilter = (iconPath) => {
    if (selectedFilter === iconPath) {
      setSelectedFilter(null); // Deselect if already selected
    } else {
      setSelectedFilter(iconPath); // Select new filter
    }
  };

  // Render filter buttons
  const renderFilterButtons = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.filterScrollView}
    >
      {ICON_OPTIONS.map((option) => (
        <TouchableOpacity
          key={option.id}
          onPress={() => toggleFilter(option.imagePath)}
          style={[
            styles.filterButton,
            selectedFilter === option.imagePath && styles.filterButtonActive
          ]}
        >
          <Image 
            source={option.imagePath} 
            style={styles.filterIcon}
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  // Render quest in editing mode
  const renderEditingQuest = () => (
    <View style={styles.editQuestContainer}>
      
      
      <View style={styles.editInputContainer}>
      <TouchableOpacity 
        onPress={() => setIsIconModalVisible(true)}
        style={styles.quickAddIconButton}  // Changed to use quickAddIconButton style
      >
        <Image source={selectedIcon} style={styles.icon} />
      </TouchableOpacity>
        <TextInput
          value={editTitle}
          onChangeText={(text) => setEditTitle(text.slice(0, MAX_TITLE_LENGTH))}
          style={styles.editInput}
          autoFocus
        />
        <Text style={styles.characterCount}>
          {MAX_TITLE_LENGTH - editTitle.length}
        </Text>
      </View>
      
      <View style={styles.editButtonContainer}>
        <TouchableOpacity 
          onPress={cancelEdit} 
          style={styles.cancelQuickAddButton}  // Changed to use quickAddButton style
        >
          <Text style={styles.cancelQuickAddButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={saveEdit} 
          style={styles.quickAddButton}  // Changed to use quickAddButton style
        >
          <Text style={styles.quickAddButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Render quest in normal mode
  const renderNormalQuest = (quest) => (
    <View style={styles.questContainer}>
      <View style={styles.questDetails}>
        <Image source={quest.iconPath} style={styles.icon} />
        <Text style={styles.questTitle}>{quest.title}</Text>
      </View>
      
      <View style={styles.questActions}>
        <Text style={styles.energyText}>{quest.energy}⚡</Text>
        <TouchableOpacity 
          onPress={() => completeQuest(quest)} 
          style={styles.completeButton}
        >
          <Ionicons name="checkmark" color="white" size={16} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => startEditing(quest)}
          style={styles.moreButton}
        >
          <Ionicons name="create" color="white" size={16} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => deleteQuest(quest.id)}
          style={styles.deleteButton}
        >
          <Ionicons name="trash-outline" color="white" size={16} />
        </TouchableOpacity>
      </View>
    </View>
  );

  // Main Render
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
      <ScrollView 
      style={styles.mainScrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
        {/* Background Images Container */}
        <View style={styles.backgroundContainer}>
        <Image
          source={require('@/assets/6.png')}
          style={styles.backgroundImage}
        />
        <Image
          source={require('@/assets/winterocean.png')}
          style={styles.darkBackgroundImage}
        />
      </View>

        <View 
          style={styles.mainScrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          onScroll={event => {
            setScrollY(event.nativeEvent.contentOffset.y);
          }}
          scrollEventThrottle={16}
        >
          {/* Character Animation */}
          <Image
            source={characterAnimation}
            style={styles.gif}
          />

          {/* Energy Status Section */}
          <View style={styles.energyContainer}>
            <View style={styles.energyTitleContainer}>
              <Image 
                source={require('@/assets/energy.webp')} 
                style={styles.energyIcon} 
              />
              <Text style={styles.energyTitle}>1st Adventure</Text>
              <Text style={styles.energyValue}>{energy} / {maxEnergy}</Text>
            </View>
            
            <View style={styles.energyProgressContainer}>
              <View 
                style={[
                  styles.energyProgressBar, 
                  { width: `${(energy / maxEnergy) * 100}%` }
                ]} 
              />
            </View>
            
            <Text style={styles.energySubtext}>Gain ⚡ energy by completing quest!</Text>
          </View>

          <View style={styles.filterContainer}>
            <Text style={styles.filterTitle}>Filter by type:</Text>
            {renderFilterButtons()}
          </View>
          
          {/* Quest List Section */}
          <View style={styles.questCountContainer}>
            <Text style={styles.questCountText}>
              {filteredQuests.length} quests {selectedFilter ? 'remaining' : 'remaining'}
            </Text>
          </View>
          
          <View style={styles.questList}>
            {filteredQuests.map((quest) => (
              <View key={quest.id}>
                {currentEditingQuest && currentEditingQuest.id === quest.id
                  ? renderEditingQuest()
                  : renderNormalQuest(quest)}
              </View>
            ))}
          </View>

          {/* Add Quest Button */}
          {!showQuickAdd && (
            <TouchableOpacity 
              style={styles.addQuestButton}
              onPress={() => setShowQuickAdd(true)}
            >
              <Text style={styles.addQuestButtonText}>ADD QUEST</Text>
            </TouchableOpacity>
          )}

          {/* Quick Add Quest Section */}
          {showQuickAdd && (
            <View 
              style={styles.quickAddContainer} 
              
              keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            >
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity 
                  onPress={() => setIsIconModalVisible(true)}
                  style={styles.quickAddIconButton}
                >
                  <Image source={selectedIcon} style={styles.icon} />
                </TouchableOpacity>
                
                <View style={styles.quickAddInputContainer}>
                  <TextInput
                    value={quickAddTitle}
                    onChangeText={(text) => setQuickAddTitle(text.slice(0, MAX_TITLE_LENGTH))}
                    placeholder="Enter Quest"
                    style={styles.quickAddInput}
                    placeholderTextColor='gray'
                    autoFocus
                  />
                  <Text style={styles.characterCount}>
                    {MAX_TITLE_LENGTH - quickAddTitle.length}
                  </Text>
                </View>
              </View>
              
              <View style={styles.quickAddButtonsContainer}>
                <TouchableOpacity 
                  onPress={() => {
                    setShowQuickAdd(false);
                    setQuickAddTitle('');
                    setSelectedIcon(DEFAULT_ICON);
                  }}
                  style={styles.cancelQuickAddButton}
                >
                  <Text style={styles.cancelQuickAddButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={handleQuickAdd}
                  disabled={!quickAddTitle.trim()}
                  style={[
                    styles.quickAddButton, 
                    !quickAddTitle.trim() && styles.disabledQuickAddButton
                  ]}
                >
                  <Text style={styles.quickAddButtonText}>Add Quest</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Add extra space for second background image */}
          <View style={{ height: SCREEN_HEIGHT }} />
        </View>

        {/* Icon Selection Modal */}
        <Modal
          visible={isIconModalVisible}
          transparent={true}
          animationType="fade"
        >
          <BlurView 
            intensity={20} 
            style={styles.modalContainer}
            onTouchEnd={() => setIsIconModalVisible(false)} 
          >
            <View style={styles.modalContent}>
              {ICON_OPTIONS.map((option) => (
                <TouchableOpacity 
                  key={option.id}
                  onPress={() => {
                    setSelectedIcon(option.imagePath);
                    setIsIconModalVisible(false);
                  }}
                  style={[
                    styles.iconModalItem, 
                    selectedIcon === option.imagePath && styles.selectedIconItem
                  ]}
                >
                  <Image source={option.imagePath} style={styles.icon} />
                </TouchableOpacity>
              ))}
            </View>
          </BlurView>
        </Modal>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  
  container: {
    flex: 1,
  },
  // Base Container Styles
  safeArea: {
    flex: 1,
    backgroundColor: 'black',
  },
  mainScrollView: {
    flex: 1,
  },  
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: SCREEN_HEIGHT,
    resizeMode: 'cover',
  },

  darkBackgroundImage: {
    position: 'absolute',
    width: '100%',
    height: SCREEN_HEIGHT,
    resizeMode: 'cover',
    marginTop: SCREEN_HEIGHT,
    opacity: 0.5, // This will darken the image
    
  },

  mainScrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  gif: {
    width: 140,
    height: 140,
    alignSelf: 'center',
    marginBottom: 20,
    marginLeft: 30,
    marginTop: 150
  },

  // Energy Section Styles
  energyContainer: {
    backgroundColor: 'rgba(31, 41, 55, 0.9)',
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  energyTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  energyIcon: {
    width: 30,
    height: 30,
    borderRadius: 5,
  },
  energyTitle: {
    color: 'white',
    fontWeight: 'bold',
  },
  energyValue: {
    color: 'white',
  },
  energyProgressContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    height: 8,
    borderRadius: 4,
    marginVertical: 10,
  },
  energyProgressBar: {
    backgroundColor: '#fbbf24',
    height: '100%',
    borderRadius: 4,
  },
  energySubtext: {
    color: 'gray',
    fontSize: 12,
  },

  // Quest List Styles
  questCountContainer: {
    marginHorizontal: 20,
  },
  questCountText: {
    color: 'white',
    fontWeight: 'bold'
  },
  questList: {
    paddingHorizontal: 20,
    marginTop: 10
  },
  questContainer: {
    backgroundColor: 'rgba(31, 41, 55, 0.9)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    
  },

  // Quick Add Section Styles
  quickAddContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: 'rgba(31, 41, 55, 0.9)',
    marginHorizontal: 20,
    borderRadius: 10,
    paddingVertical: 10,
  },
  quickAddIconButton: {
    margin: 5,
    borderWidth: 1,
    padding: 4,
    borderColor: '#fbbf24',
    borderRadius: 5
  },
  quickAddInputContainer: {
    flex: 1,
    position: 'relative',
  },
  quickAddInput: {
    backgroundColor: 'rgba(31, 41, 55, 1)',
    color: 'white',
    padding: 16,
    borderRadius: 5,
    marginTop: 5,
    marginRight: 5
  },
  quickAddButton: {
    backgroundColor: '#fbbf24',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    marginBottom: 5,
    marginTop: 5,
  },
  disabledQuickAddButton: {
    opacity: 0.5,
  },
  quickAddButtonText: {
    color: 'black',
    textAlign: 'center'
  },

  // Common Component Styles
  characterCount: {
    position: 'absolute',
    right: 15,
    top: 20,
    color: 'gray',
  },
  icon: {
    width: 40,
    height: 40,
  },

  // Quest Item Styles
  questDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  questTitle: {
    color: 'white',
    marginLeft: 10,
  },
  questActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  energyText: {
    color: '#fbbf24',
    marginRight: 10,
  },
  completeButton: {
    backgroundColor: 'green',
    padding: 5,
    borderRadius: 20,
    marginRight: 5,
  },
  moreButton: {
    backgroundColor: 'gray',
    padding: 5,
    borderRadius: 20,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 20,
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)', 
    
  },
  modalContent: {
    backgroundColor: 'rgba(31, 41, 55, 0.9)',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:1,
    borderColor: 'gray',
    paddingHorizontal: 30
  },
  iconModalItem: {
    margin: 8,
    padding: 5,
    borderRadius: 5,
  },
  selectedIconItem: {
    borderWidth: 2,
    borderColor: '#fbbf24',
  },
  modalCloseButton: {
    marginTop: 20,
    backgroundColor: '#fbbf24',
    padding: 10,
    borderRadius: 5,
  },
  modalCloseText: {
    color: 'black',
    textAlign: 'center',
  },

  // Quest Editing Styles
  editQuestContainer: {
    backgroundColor: 'rgba(31, 41, 55, 0.9)',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  editInputContainer: {
    flex: 1,
    position: 'relative',
    marginTop: 5,
    flexDirection: 'row'
  },
  editInput: {
    backgroundColor: 'rgba(31, 41, 55, 0.9)',
    color: 'white',
    padding: 16,
    borderRadius: 5,
    flex: 1
  },
  editButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  saveButtonText: {
    color: 'white',
  },
  cancelButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: 'white',
  },
  addQuestButton: {
    backgroundColor: 'rgba(31, 41, 55, 0.9)',
    padding: 15,
    borderRadius: 5,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  addQuestButtonText: {
    color: 'gray',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  quickAddButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cancelQuickAddButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  cancelQuickAddButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  quickAddButton: {
    backgroundColor: '#fbbf24',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  filterContainer: {
    marginHorizontal: 20,
    marginBottom: 15,
  },
  filterTitle: {
    color: 'white',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  filterScrollView: {
    flexGrow: 0,
    marginBottom: 5,
  },
  filterButton: {
    backgroundColor: 'rgba(31, 41, 55, 0.9)',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  filterButtonActive: {
    borderColor: '#fbbf24',
    backgroundColor: 'rgba(31, 41, 55, 0.9)',
  },
  filterIcon: {
    width: 30,
    height: 30,
  },
});