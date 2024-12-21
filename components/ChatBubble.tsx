import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Svg, { Line } from 'react-native-svg';
import Markdown from 'react-native-markdown-display';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { Animated } from 'react-native';
interface ChatBubbleProps {
  message: {
      content: string;
      timestamp: number;
      from: string;
      type: string;
      to: string;
  };
  isCurrentUser: boolean;
}
const getStyles = (isCurrentUser: boolean) => StyleSheet.create({
  messageContainer: {
    marginVertical: 4,
    position: 'relative',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bubbleWrapper: {
    flex: 1,
    position: 'relative',
  },
  connector: {
    position: 'absolute',
    width: 2,
    height: '100%',
    bottom: -20,
  },
  senderConnector: {
    right: 20,
  },
  receiverConnector: {
    left: 20,
  },
  zigzagSegment: {
    position: 'absolute',
    width: 15,
    height: 2,
    backgroundColor: '#FF0000',
  },
  senderZigzag: {
    transform: [
      { rotate: '45deg' },
      { translateX: -5 }
    ],
  },
  receiverZigzag: {
    transform: [
      { rotate: '-45deg' },
      { translateX: 5 }
    ],
  },
  messageWrapper: {
    flex: 1,
    position: 'relative',
  },
  senderContainer: {
    justifyContent: 'flex-end',
    marginLeft: 60,
  },
  receiverContainer: {
    justifyContent: 'flex-start',
    marginRight: 60,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    marginRight: 8,
    borderWidth: 2,
    borderColor: '#FF0000',
    borderRadius: 20,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  bubble: {
    backgroundColor: '#000000',
    borderWidth: 2,
    borderColor: '#FF0000',
    padding: 12,
    maxWidth: '80%',
    transform: [{ skewX: '-5deg' }],
    zIndex: 2,
  },
  senderBubble: {
    alignSelf: 'flex-end',
    marginLeft: 'auto',
  },
  receiverBubble: {
    alignSelf: 'flex-start',
  },
  messageText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'System',
  },
  timestamp: {
      fontSize: 12,
      color: 'rgba(255, 255, 255, 0.7)',
      fontFamily: 'monospace',
      letterSpacing: 1,
      transform: [{ skewX: '-5deg' }],
      position: 'absolute',
      bottom: -20,
      right: isCurrentUser ? 8 : undefined,
      left: isCurrentUser ? undefined : 8,
      textShadowColor: 'rgba(255, 0, 0, 0.5)',
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 2,
      borderBottomWidth: 2,
      borderBottomColor: '#FF0000',
      paddingBottom: 2
  }
});
export function ChatBubble({ message, isCurrentUser }: ChatBubbleProps) {
  const styles = getStyles(isCurrentUser);
  return (
      <ThemedView style={[
          styles.container,
          isCurrentUser ? styles.senderContainer : styles.receiverContainer
      ]}>
          <Animated.View style={[
              styles.bubble,
              isCurrentUser ? styles.senderBubble : styles.receiverBubble
          ]}>
              <ThemedText style={styles.messageText}>
                  {message.content}
              </ThemedText>
              <ThemedText style={styles.timestamp}>
                  {new Date(message.timestamp).toLocaleTimeString()}
              </ThemedText>
          </Animated.View>
      </ThemedView>
  );
}