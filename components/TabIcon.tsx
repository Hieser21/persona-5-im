import { Image, StyleSheet } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  withSpring 
} from 'react-native-reanimated';

interface TabIconProps {
  focused: boolean;
  icon: 'home' | 'chat' | 'profile';
}

export function TabIcon({ focused, icon }: TabIconProps) {
  const getIconSource = () => {
    switch (icon) {
      case 'home':
        return focused 
          ? require('@/assets/icons/home-icon-active.png')
          : require('@/assets/icons/home-icon.png');
      case 'chat':
        return focused 
          ? require('@/assets/icons/chat-icon-active.png')
          : require('@/assets/icons/chat-icon.png');
      case 'profile':
        return focused 
          ? require('@/assets/icons/profile-icon-active.png')
          : require('@/assets/icons/profile-icon.png');
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: withSpring(focused ? 1.1 : 1) }
    ]
  }));

  return (
    <Animated.View style={[styles.iconContainer, animatedStyle]}>
      <Image
        source={getIconSource()}
        style={styles.icon}
        resizeMode="contain"
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: '100%',
    height: '100%',
  },
});