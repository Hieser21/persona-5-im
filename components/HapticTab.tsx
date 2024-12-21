import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';
import { StyleSheet, Animated } from 'react-native';
import { useState, useRef } from 'react';

export function HapticTab(props: BottomTabBarButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const animatePress = (pressed: boolean) => {
    setIsPressed(pressed);
    Animated.spring(scaleAnim, {
      toValue: pressed ? 0.95 : 1,
      useNativeDriver: true,
      speed: 12,
      bounciness: 8,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <PlatformPressable
        {...props}
        style={[styles.tabButton, isPressed && styles.tabButtonPressed]}
        onPressIn={(ev) => {
          animatePress(true);
          if (process.env.EXPO_OS === 'ios') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }
          props.onPressIn?.(ev);
        }}
        onPressOut={() => animatePress(false)}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  tabButton: {
    borderRadius: 8,
    margin: 4,
    backgroundColor: '#000000',
    borderWidth: 2,
    borderColor: '#FF0000',
    transform: [{ skewX: '-10deg' }],
  },
  tabButtonPressed: {
    backgroundColor: '#FF0000',
  },
});
