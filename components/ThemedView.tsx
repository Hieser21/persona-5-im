import { View, type ViewProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  variant?: 'default' | 'card' | 'menu' | 'dialog';
};

export function ThemedView({ 
  style, 
  lightColor, 
  darkColor, 
  variant = 'default',
  ...otherProps 
}: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return (
    <View 
      style={[
        { backgroundColor },
        variant === 'default' ? styles.default : undefined,
        variant === 'card' ? styles.card : undefined,
        variant === 'menu' ? styles.menu : undefined,
        variant === 'dialog' ? styles.dialog : undefined,
        style
      ]} 
      {...otherProps} 
    />
  );
}

const styles = StyleSheet.create({
  default: {
    borderRadius: 4,
  },
  card: {
    backgroundColor: '#000000',
    borderWidth: 2,
    borderColor: '#FF0000',
    borderRadius: 4,
    transform: [{ skewX: '-10deg' }],
    shadowColor: '#FF0000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    padding: 16,
  },
  menu: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderColor: '#FF0000',
    transform: [{ skewX: '-15deg' }],
    shadowColor: '#FF0000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
    padding: 20,
  },
  dialog: {
    backgroundColor: '#000000',
    borderWidth: 3,
    borderColor: '#FF0000',
    borderRadius: 6,
    transform: [{ skewX: '-5deg' }],
    shadowColor: '#FF0000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 10,
    padding: 24,
  },
});
