import { useState } from 'react';
import { StyleSheet, FlatList, TextInput, Pressable, KeyboardAvoidingView, Platform, Image, View } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import Animated, { FadeIn, SlideInRight } from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ChatBubble } from '@/components/ChatBubble';

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isSender: boolean;
  senderName: string;
  avatar?: any;
}

// Mock data
const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    text: "Hey, we need to talk about the next palace.",
    timestamp: '14:30',
    isSender: false,
    senderName: "RYUJI",
    avatar: require('@/assets/images/avatars/ryuji.png'),
  },
  {
    id: '2',
    text: "I've got some intel from Mishima about a potential target. Apparently, there's been some suspicious activity at Shujin lately.",
    timestamp: '14:31',
    isSender: true,
    senderName: "JOKER",
    avatar: require('@/assets/images/avatars/default.png'),
  },
  {
    id: '3',
    text: "For real!? What's going on at our school now?",
    timestamp: '14:31',
    isSender: false,
    senderName: "RYUJI",
    avatar: require('@/assets/images/avatars/ryuji.png'),
  },
  {
    id: '4',
    text: "Someone's been blackmailing students. They're using personal information to extort money. Mishima thinks they might have access to the school's records.",
    timestamp: '14:32',
    isSender: true,
    senderName: "JOKER",
    avatar: require('@/assets/images/avatars/default.png'),
  },
  {
    id: '5',
    text: "Damn, that's messed up! We gotta stop them!",
    timestamp: '14:32',
    isSender: false,
    senderName: "RYUJI",
    avatar: require('@/assets/images/avatars/ryuji.png'),
  },
  {
    id: '6',
    text: "Agreed. I'm thinking we should investigate this carefully. We need to find out who has access to these records and if they have a Palace. Ann and Makoto are already looking into some leads at school.",
    timestamp: '14:33',
    isSender: true,
    senderName: "JOKER",
    avatar: require('@/assets/images/avatars/default.png'),
  },
  {
    id: '7',
    text: "Should we meet up at the hideout to discuss this?",
    timestamp: '14:33',
    isSender: false,
    senderName: "RYUJI",
    avatar: require('@/assets/images/avatars/ryuji.png'),
  },
  {
    id: '8',
    text: "Yes. Let's meet at Leblanc after school tomorrow. I'll contact the others. We need to plan this carefully - we can't let them know we're onto them.",
    timestamp: '14:34',
    isSender: true,
    senderName: "JOKER",
    avatar: require('@/assets/images/avatars/default.png'),
  }
];

function processMessages(messages: Message[]) {
  return messages.map((message, index) => {
    const prevMessage = index > 0 ? messages[index - 1] : null;
    const nextMessage = index < messages.length - 1 ? messages[index + 1] : null;
    
    return {
      ...message,
      isFirstInSequence: prevMessage?.isSender !== message.isSender,
      isLastInSequence: nextMessage?.isSender !== message.isSender
    };
  });
}

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(MOCK_MESSAGES);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      timestamp: new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      }),
      isSender: true,
      senderName: "JOKER",
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
  };

  const processedMessages = processMessages(messages);

  return (
    <View style={styles.container}>

      
      <ThemedView style={styles.header}>
        <Pressable 
          onPress={() => router.back()} 
          style={styles.backButton}
        >
          <ThemedText style={styles.backText}>RETURN</ThemedText>
        </Pressable>
      </ThemedView>

      <FlatList
        data={processedMessages}
        renderItem={({ item }) => (
          <ChatBubble message={item} />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.chatContainer}
      />

      <ThemedView style={styles.inputContainer}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          style={styles.input}
          placeholder="Press ⨉ to send"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          multiline
        />
        <Pressable 
          onPress={sendMessage}
          style={[
            styles.sendButton,
            !message.trim() && styles.sendButtonDisabled
          ]}
          disabled={!message.trim()}
        >
          <ThemedText style={styles.sendButtonText}>⨉</ThemedText>
        </Pressable>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF0000',
    overflow: 'hidden',
  },
  header: {
    padding: 16,
    paddingTop: 60,
    backgroundColor: '#000000',
    borderBottomWidth: 3,
    borderBottomColor: '#FF0000',
  },
  backButton: {
    alignSelf: 'flex-start',
    transform: [{ skewX: '-10deg' }],
  },
  backText: {
    color: '#FF0000',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  chatContainer: {
    padding: 16,
    gap: 24, // Increased gap between messages
  },
  messageContainer: {
    marginVertical: 4,
  },
  inputContainer: {
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
    backgroundColor: '#000000',
    borderTopWidth: 2,
    borderTopColor: '#FF0000',
  },
  input: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#FFFFFF',
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#FF0000',
    transform: [{ skewX: '-5deg' }],
    marginBottom: 12,
  },
  sendButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#FF0000',
    paddingVertical: 8,
    paddingHorizontal: 24,
    transform: [{ skewX: '-10deg' }],
  },
  sendButtonDisabled: {
    backgroundColor: 'rgba(255, 0, 0, 0.3)',
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  globalDiagonalLine: {
    position: 'absolute',
    width: 2,
    height: '200%',
    backgroundColor: '#FFFFFF',
    top: 0,
    left: '50%',
    transform: [{ rotate: '45deg' }],
    transformOrigin: 'top left',
    zIndex: 1,
  },
});