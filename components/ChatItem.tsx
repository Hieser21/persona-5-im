import { Pressable, Image, StyleSheet } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  withSpring,
  useSharedValue 
} from 'react-native-reanimated';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface ChatItemProps {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  avatar: any;
  unread: number;
  onPress: (id: string) => void;
}

export function ChatItem({ 
  id, 
  name, 
  lastMessage, 
  timestamp, 
  avatar, 
  unread, 
  onPress 
}: ChatItemProps) {
  const itemScale = useSharedValue(1);
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: itemScale.value },
      { skewX: '-5deg' }
    ]
  }));

  return (
    <Pressable
      onPressIn={() => {
        itemScale.value = withSpring(0.98);
      }}
      onPressOut={() => {
        itemScale.value = withSpring(1);
      }}
      onPress={() => onPress(id)}
    >
      <Animated.View style={[styles.chatItem, animatedStyle]}>
        <Image source={avatar} style={styles.avatar} />
        
        <ThemedView style={styles.chatInfo}>
          <ThemedView style={styles.chatHeader}>
            <ThemedText type="defaultSemiBold" style={styles.chatName}>
              {name}
            </ThemedText>
            <ThemedText style={styles.timestamp}>
              {timestamp}
            </ThemedText>
          </ThemedView>
          
          <ThemedView style={styles.chatPreview}>
            <ThemedText 
              style={styles.lastMessage}
              numberOfLines={1}
            >
              {lastMessage}
            </ThemedText>
            
            {unread > 0 && (
              <ThemedView style={styles.unreadBadge}>
                <ThemedText style={styles.unreadCount}>
                  {unread}
                </ThemedText>
              </ThemedView>
            )}
          </ThemedView>
        </ThemedView>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chatItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'rgba(20, 20, 20, 0.95)',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#FF0000',
    gap: 16,
    shadowColor: '#FF0000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FF0000',
  },
  chatInfo: {
    flex: 1,
    gap: 8,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatName: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  timestamp: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  chatPreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    flex: 1,
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  unreadBadge: {
    backgroundColor: '#FF0000',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  unreadCount: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});