import React, { useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Animated, { 
  withTiming, 
  useSharedValue,
  useAnimatedStyle
} from 'react-native-reanimated';
import { ThemedText } from './ThemedText';
import Markdown from 'react-native-markdown-display';

interface ChatBubbleProps {
  message: {
    text: string;
    timestamp: string;
    isSender: boolean;
    senderName: string;
    avatar?: any;
  };
  isLastInSequence?: boolean;  // Is this the last message from current sender
  isFirstInSequence?: boolean; // Is this the first message from current sender
}

export function ChatBubble({ message, isLastInSequence, isFirstInSequence }: ChatBubbleProps) {
  const lineHeight = useSharedValue(0);

  useEffect(() => {
    if (isLastInSequence) {
      lineHeight.value = withTiming(40, { duration: 300 });
    } else {
      lineHeight.value = 0;
    }
  }, [isLastInSequence]);

  const animatedLineStyle = useAnimatedStyle(() => ({
    height: lineHeight.value,
    opacity: lineHeight.value > 0 ? 1 : 0,
  }));

  return (
    <View style={[
      styles.container,
      message.isSender ? styles.senderContainer : styles.receiverContainer
    ]}>
      {/* Profile picture for received messages */}
      {!message.isSender && (
        <View style={styles.avatarContainer}>
          <Image 
            source={message.avatar}
            style={styles.avatar}
          />
        </View>
      )}

      {/* Zigzag line through the text */}
      <Animated.View style={[
        styles.zigzagLine,
        animatedLineStyle,
        message.isSender ? styles.senderZigzagLine : styles.receiverZigzagLine,
      ]} />

      {/* Message bubble */}
      <View style={[
        styles.bubble,
        message.isSender ? styles.senderContainer : styles.receiverContainer
      ]}>
        <Markdown style={{text: {color: 'white'}}}>
          {message.text}
        </Markdown>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    flexDirection: 'row',
    alignItems: 'flex-start',
    position: 'relative',
  },
  senderContainer: {
    justifyContent: 'flex-end',
    marginLeft: 60,
    marginRight: 20,
  },
  receiverContainer: {
    justifyContent: 'flex-start',
    marginLeft: 20,
    marginRight: 60,
  },
  avatarContainer: {
    width: 32,
    height: 32,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  zigzagLine: {
    position: 'absolute',
    width: 4, // Thicker line
    backgroundColor: '#000000',
    bottom: 0, // Align with the bottom of the message bubble
    left: 10, // Adjust as needed
    transform: [{ rotate: '45deg' }], // Adjust for zigzag effect
  },
  senderZigzagLine: {
    right: -10,
  },
  receiverZigzagLine: {
    left: -10,
  },
  bubble: {
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    padding: 12,
    paddingHorizontal: 16,
    maxWidth: '80%',
    borderRadius: 8, // Adjust for sharper angles
    transform: [{ skewX: '-5deg' }], // Skew effect for Persona 5 style
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});