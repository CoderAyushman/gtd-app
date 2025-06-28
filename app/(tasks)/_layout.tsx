import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="Inbox"

        options={{
          title: 'Inbox',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="inbox" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="Next"
        options={{
          title: 'Next_Action',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="queue-play-next" size={24} color="black" />),
        }}
      />
      <Tabs.Screen
        name="Project"
        options={{
          title: 'Project',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Octicons name="project" size={20} color="black" />        )}}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          title: 'Settings',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
}
