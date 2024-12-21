import { PropsWithChildren, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  withSpring,
  withTiming,
  interpolate
} from 'react-native-reanimated';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { skewX: withSpring(isOpen ? '-12deg' : '-8deg') },
      { scale: withSpring(isOpen ? 1.02 : 1) }
    ],
  }));

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: withSpring(isOpen ? '90deg' : '0deg') },
      { scale: withSpring(isOpen ? 1.2 : 1) }
    ],
  }));

  return (
    <ThemedView style={styles.container}>
      <Animated.View style={[styles.wrapper, animatedStyle]}>
        <TouchableOpacity
          style={styles.heading}
          onPress={() => setIsOpen((value) => !value)}
          activeOpacity={0.8}>
          <Animated.View style={chevronStyle}>
            <IconSymbol
              name="chevron.right"
              size={18}
              weight="medium"
              color="#FF0000"
            />
          </Animated.View>

          <ThemedText type="defaultSemiBold" style={styles.title}>
            {title}
          </ThemedText>
        </TouchableOpacity>
        {isOpen && (
          <ThemedView style={styles.content}>
            {children}
          </ThemedView>
        )}
      </Animated.View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
  },
  wrapper: {
    backgroundColor: '#000000',
    borderWidth: 2,
    borderColor: '#FF0000',
    borderRadius: 4,
    padding: 8,
    shadowColor: '#FF0000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    color: '#FFFFFF',
    textShadowColor: '#FF0000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  content: {
    marginTop: 12,
    marginLeft: 24,
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderLeftWidth: 2,
    borderColor: '#FF0000',
  },
});
