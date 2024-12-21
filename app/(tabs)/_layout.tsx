import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { TabIcon } from '@/components/TabIcon';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#FF0000',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.5)',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="home" />
          ),
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          title: 'Confidants',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="chat" />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#000000',
    borderTopWidth: 2,
    borderTopColor: '#FF0000',
    height: 60,
    paddingBottom: 8,
  },
});
