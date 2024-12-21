import { useState, useEffect } from 'react';
import { Image, StyleSheet, Pressable } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  withSpring,
  withTiming,
  withRepeat,
  useSharedValue
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TextInput } from 'react-native';
import { ParticleBackground } from '@/components/ParticleBackground';

interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const buttonScale = useSharedValue(1);
  const loadingRotation = useSharedValue(0);

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Handle successful login
    } catch (error) {
      setErrors({ email: 'Invalid credentials' });
    } finally {
      setIsLoading(false);
    }
  };

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: buttonScale.value },
      { skewX: '-10deg' }
    ]
  }));

  const loadingAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${loadingRotation.value}deg` }]
  }));

  useEffect(() => {
    if (isLoading) {
      loadingRotation.value = withRepeat(
        withTiming(360, { duration: 1000 }),
        -1
      );
    } else {
      loadingRotation.value = 0;
    }
  }, [isLoading]);

  return (
    <ThemedView style={styles.container}>
      <ParticleBackground />

      <Animated.View style={[styles.logoContainer]}>
        <Image
          source={require('@/assets/images/persona5-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <ThemedText type="title" style={styles.title}>
          PHANTOM CHAT
        </ThemedText>
      </Animated.View>

      <ThemedView variant="card" style={styles.formContainer}>
        <ThemedText type="subtitle" style={styles.welcomeText}>
          Welcome back, Phantom Thief
        </ThemedText>
        
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setErrors({ ...errors, email: undefined });
          }}
          style={[styles.input, errors.email && styles.inputError]}
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setErrors({ ...errors, password: undefined });
          }}
          secureTextEntry
          style={[styles.input, errors.password && styles.inputError]}
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
        />

        <ThemedView style={styles.buttonContainer}>
          <Pressable 
            onPressIn={() => {
              buttonScale.value = withSpring(0.95);
            }}
            onPressOut={() => {
              buttonScale.value = withSpring(1);
            }}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Animated.View style={[styles.button, buttonAnimatedStyle]}>
              {isLoading ? (
                <Animated.View style={[styles.loadingIcon, loadingAnimatedStyle]}>
                  {/* Your loading icon component */}
                </Animated.View>
              ) : (
                <ThemedText style={styles.buttonText}>
                  TAKE YOUR TIME
                </ThemedText>
              )}
            </Animated.View>
          </Pressable>
          
          <ThemedText type="link" style={styles.registerText}>
            First time? Join the Phantom Thieves
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    padding: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  title: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 32,
    marginBottom: 8,
    letterSpacing: 4,
  },
  formContainer: {
    padding: 32,
    gap: 24,
    backgroundColor: 'rgba(20, 20, 20, 0.95)',
    borderRadius: 8,
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  welcomeText: {
    textAlign: 'center',
    color: '#FFFFFF',
    marginBottom: 8,
    opacity: 0.9,
  },
  input: {
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: '#FF0000',
    color: '#FFFFFF',
    paddingHorizontal: 15,
    fontSize: 16,
    transform: [{ skewX: '-5deg' }],
    borderRadius: 4,
  },
  buttonContainer: {
    gap: 20,
    alignItems: 'center',
    marginTop: 8,
  },
  button: {
    backgroundColor: '#FF0000',
    paddingVertical: 14,
    paddingHorizontal: 48,
    transform: [{ skewX: '-10deg' }],
    shadowColor: '#FF0000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderRadius: 4,
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 2,
  },
  registerText: {
    color: '#FF0000',
    textAlign: 'center',
    opacity: 0.9,
    fontSize: 14,
  },
  inputError: {
    borderColor: '#FF0000',
    borderWidth: 2,
  },
  loadingIcon: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 12,
    borderTopColor: 'transparent',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 12,
    marginTop: 4,
    transform: [{ skewX: '-5deg' }],
  },
});
