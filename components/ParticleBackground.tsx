import { useEffect } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withRepeat, 
  withTiming,
  withDelay,
  withSequence
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const NUM_PARTICLES = 15;

export function ParticleBackground() {
  // Create multiple particles with random positions and animations
  const particles = Array(NUM_PARTICLES).fill(0).map(() => ({
    x: useSharedValue(Math.random() * width),
    y: useSharedValue(Math.random() * height),
    opacity: useSharedValue(Math.random() * 0.5),
    scale: useSharedValue(0.5 + Math.random() * 0.5),
  }));

  useEffect(() => {
    // Animate each particle
    particles.forEach((particle, i) => {
      // Floating animation
      particle.y.value = withRepeat(
        withSequence(
          withTiming(Math.random() * height, { 
            duration: 5000 + Math.random() * 3000 
          }),
          withTiming(Math.random() * height, { 
            duration: 5000 + Math.random() * 3000 
          })
        ),
        -1
      );

      // Drifting animation
      particle.x.value = withRepeat(
        withSequence(
          withTiming(Math.random() * width, { 
            duration: 6000 + Math.random() * 4000 
          }),
          withTiming(Math.random() * width, { 
            duration: 6000 + Math.random() * 4000 
          })
        ),
        -1
      );

      // Fading animation
      particle.opacity.value = withRepeat(
        withSequence(
          withTiming(Math.random() * 0.5, { duration: 3000 }),
          withTiming(Math.random() * 0.3, { duration: 3000 })
        ),
        -1
      );

      // Scaling animation
      particle.scale.value = withRepeat(
        withSequence(
          withTiming(0.5 + Math.random() * 0.5, { duration: 4000 }),
          withTiming(0.3 + Math.random() * 0.3, { duration: 4000 })
        ),
        -1
      );
    });
  }, []);

  return (
    <>
      {particles.map((particle, index) => (
        <Animated.View
          key={index}
          style={[
            styles.particle,
            useAnimatedStyle(() => ({
              transform: [
                { translateX: particle.x.value },
                { translateY: particle.y.value },
                { scale: particle.scale.value }
              ],
              opacity: particle.opacity.value,
            })),
          ]}
        />
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  particle: {
    position: 'absolute',
    width: 4,
    height: 4,
    backgroundColor: '#FF0000',
    borderRadius: 2,
    shadowColor: '#FF0000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
});