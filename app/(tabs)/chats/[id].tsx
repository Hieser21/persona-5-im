import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, Image } from 'react-native';
import { Platform } from 'react-native';
import io from 'socket.io-client';
import {socketClient} from '@/hooks/socketService';
import { ChatBubble } from '@/components/ChatBubble';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

interface Message {
    id: string;
    text: string;
    timestamp: string;
    isSender: boolean;
    senderName: string;
}

const ChatScreen = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<any>([]);
    const currentUser = socketClient.getCurrentUser();

    useEffect(() => {
        socketClient.connect();
        
        socketClient.on('message/receive', (message) => {
            setMessages(prev => [...prev, message]);
        });

        return () => socketClient.disconnect();
    }, []);

    const sendMessage = async (text: string) => {
        if (typeof text !== 'string') return;
        
        await socketClient.emit('message', 'send', {
            to: 'defaultGroup',
            type: 'text',
            content: text
        });
    };
    ;

    const fileInputRef = useRef(null);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch('http://localhost:3000/upload', {
                    method: 'POST',
                    body: formData,
                });
                const result = await response.json();
                console.log('File uploaded successfully:', result.fileUrl);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };
    const uploadImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            allowsMultipleSelection: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const fileUri = result.assets[0].uri;
            const fileName = fileUri.split('/').pop() || 'image.jpg'; // Get the file name
            const fileData = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 });
            const blob = new Blob([fileData], { type: "image/jpeg" });
            const formData = new FormData();
            formData.append('file', blob, fileName);

            fetch('http://localhost:3000/upload', {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(result => {
                const fileUrl = result.fileUrl;
                const fileMessage: Message = {
                    id: Date.now().toString(),
                    text: `Image uploaded: ${fileName} - ${fileUrl}`,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
                    isSender: true,
                    senderName: "JOKER",
                };
                messageHandlers.sendMessage('Image', 'groupId'); // Emit the file message to the server
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    };

    return (
        <View style={styles.container}>
           <FlatList
    data={messages}
    renderItem={({ item, index }) => (
        <ChatBubble 
            message={item}
            isConnectedToNext={
                index < messages.length - 1 && 
                messages[index + 1].isSender === item.isSender
            }
        />
    )}
    keyExtractor={item => item.id}
    contentContainerStyle={{ paddingBottom: 100 }}
/>


            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Type a message"
                    placeholderTextColor="#fff"
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Button title="✉️" onPress={(e) => sendMessage(message)} color="#fff" />
                    {Platform.OS !== 'web' ? (
                      <Button title="🖼️" onPress={uploadImage} color="#fff" />
                    ) : (
                      <View>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }} // Hide the default input
            />
            <Button
                title="Upload File"
                onPress={() => fileInputRef.current.click()} // Trigger file input click
            />
        </View>
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    padding: 16,
    paddingTop: 60,
    backgroundColor: '#000000',
    borderBottomWidth: 3,
    borderBottomColor: '#FF0000',
  },
  backButton: {
    alignSelf: 'flex-start',
    transform: [{ skewX: '-10deg' }],
  },
  backText: {
    color: '#FF0000',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  chatContainer: {
    padding: 16,
    gap: 24, // Increased gap between messages
  },
  messageContainer: {
    marginVertical: 4,
  },
  inputContainer: {
    padding: 16,
    paddingBottom: 16,
    backgroundColor: '#000000',
    borderTopWidth: 2,
    borderTopColor: '#FF0000',
  },
  input: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#FFFFFF',
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#FF0000',
    transform: [{ skewX: '-5deg' }],
    marginBottom: 12,
  },
  sendButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#FF0000',
    paddingVertical: 8,
    paddingHorizontal: 24,
    transform: [{ skewX: '-10deg' }],
  },
  sendButtonDisabled: {
    backgroundColor: 'rgba(255, 0, 0, 0.3)',
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ChatScreen;