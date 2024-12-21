import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  withSpring,
} from 'react-native-reanimated';

import { ThemedText } from '@/components/ThemedText';

export function HelloWave() {
  const rotationAnimation = useSharedValue(0);
  const scaleAnimation = useSharedValue(1);

  useEffect(() => {
    // More dynamic wave animation
    rotationAnimation.value = withRepeat(
      withSequence(
        withSpring(-25, { damping: 3, stiffness: 100 }),
        withSpring(25, { damping: 3, stiffness: 100 }),
        withSpring(0, { damping: 3, stiffness: 100 })
      ),
      4,
      true
    );

    // Add pulsing effect
    scaleAnimation.value = withRepeat(
      withSequence(
        withSpring(1.2, { damping: 2 }),
        withSpring(1, { damping: 2 })
      ),
      4,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotationAnimation.value}deg` },
      { scale: scaleAnimation.value },
      { skewX: '-10deg' }, // Persona 5 angular style
    ],
    backgroundColor: '#000000',
    borderWidth: 2,
    borderColor: '#FF0000',
    padding: 12,
    borderRadius: 4,
  }));

  return (
    <Animated.View style={animatedStyle}>
      <ThemedText style={styles.text}>👋</ThemedText>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 28,
    lineHeight: 32,
    marginTop: -6,
    color: '#FFFFFF', // White text for contrast
    textShadowColor: '#FF0000', // Red shadow for Persona effect
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
});
