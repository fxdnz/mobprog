import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon({ name, color }) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} name={name} color={color} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: {
          height: 70, // Increase the height of the tab bar here
          paddingVertical: 10, // Add some vertical padding if needed
          backgroundColor: Colors[colorScheme ?? 'light'].background, // Optional: Set background color
          borderTopWidth: 1, // Optional: Remove the top border if you like
          borderColor: 'white',
          paddingTop: 10, 
          
          
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerShown: false
        }}
      />

      <Tabs.Screen
        name="sidequest"
        options={{
          title: 'Side Quest',
          tabBarIcon: ({ color }) => <TabBarIcon name="gavel" color={color} />,
          headerShown: false
        }}
      />

      <Tabs.Screen
        name="two"
        options={{
          title: 'Shop',
          tabBarIcon: ({ color }) => <TabBarIcon name="shopping-cart" color={color} />,
          headerShown: false
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          headerShown: false
        }}
      />

      
    </Tabs>
  );
}
