import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { socketClient } from '@/hooks/socketService';
import { ParticleBackground } from '@/components/ParticleBackground';
import { router } from 'expo-router';
interface FormErrors {
  username?: string;
  password?: string;
}
const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    socketClient.connect();
    return () => socketClient.disconnect();
  }, []);
  const [errors, setErrors] = useState<FormErrors>({});
  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!username) newErrors.username = 'Username is required';
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    const [error, response] = await socketClient.register(username, password);
    
    if (error) {
      setErrors({ username: error });
    } else {
        router.replace('/(tabs)/chats');
    }
};
  return (
    <View style={styles.container}>
      <ParticleBackground />
      <View style={styles.overlay}>
        <Image
          source={require('@/assets/images/persona5-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <ThemedText type="title" style={styles.title}>
          Register
        </ThemedText>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Button title="Register" onPress={handleRegister} color="#FF0000" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0D0D0D',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
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
  input: {
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: '#FF0000',
    color: '#FFFFFF',
    paddingHorizontal: 15,
    fontSize: 16,
    borderRadius: 4,
  },
});

export default RegisterScreen;