import { useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ParticleBackground } from '@/components/ParticleBackground';
import { ChatItem } from '@/components/ChatItem';

interface ChatPreview {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  avatar: any;
  unread: number;
}

const MOCK_CHATS: ChatPreview[] = [
  {
    id: '1',
    name: 'Ryuji Sakamoto',
    lastMessage: 'For real!? When are we meeting?',
    timestamp: '2m ago',
    avatar: require('@/assets/images/avatars/ryuji.png'),
    unread: 2,
  },
  {
    id: '2',
    name: 'Ann Takamaki',
    lastMessage: 'The new target looks tough...',
    timestamp: '15m ago',
    avatar: require('@/assets/images/avatars/ann.png'),
    unread: 0,
  },
  // Add more mock chats as needed
];

export default function ChatsScreen() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  return (
    <ThemedView style={styles.container}>
      <ParticleBackground />
      
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          CONFIDANTS
        </ThemedText>
      </ThemedView>

      <FlatList
        data={MOCK_CHATS}
        renderItem={({ item }) => (
          <ChatItem {...item} onPress={setSelectedChat} />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <ThemedView style={styles.separator} />}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderBottomWidth: 2,
    borderBottomColor: '#FF0000',
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    letterSpacing: 4,
  },
  listContainer: {
    padding: 16,
    gap: 12,
  },
  separator: {
    height: 12,
  },
});