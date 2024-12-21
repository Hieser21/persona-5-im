import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

class SocketClient {
    private socket: any;
    private connected: boolean = false;
    private currentUser: string = '';

    constructor(serverUrl: string) {
        this.socket = io(serverUrl, {
            transports: ['websocket'],
            reconnectionDelay: 1000,
            autoConnect: false
        });
        this.setupListeners();
    }

    public getCurrentUser(): string {
        return this.currentUser;
    }

    private setupListeners() {
        this.socket.on('connect', () => {
            this.connected = true;
            console.log('Connected with ID:', this.socket.id);
        });

        this.socket.on('disconnect', () => {
            this.connected = false;
        });
    }

    //private connected: boolean = false;


    public emit<T = any>(namespace: string, event: string, data: any = {}): Promise<[string | null, T | null]> {
        return new Promise((resolve) => {
            this.socket.emit(`${namespace}/${event}`, data, (response: any) => {
                if (typeof response === 'string') {
                    resolve([response, null]);
                } else {
                    resolve([null, response]);
                }
            });
        });
    }

    // Add a public method for message sending
    
    public on(event: string, callback: (data: any) => void) {
        this.socket.on(event, callback);
    }


    async loginWithPassword(username: string, password: string) {
        const [error, response] = await this.emit('user', 'login', {
            username,
            password,
            platform: Platform.OS,
            browser: 'expo-app'
        });

        if (!error && response?.token) {
            await AsyncStorage.setItem('token', response.token);
            return [null, response];
        }
        return [error, null];
    }

    async register(username: string, password: string) {
        const [error, response] = await this.emit('user', 'register', {
            username,
            password,
            platform: Platform.OS,
            browser: 'expo-app'
        });
        if (!error && response?.token) {
            this.currentUser = response.user._id;
            await AsyncStorage.setItem('token', response.token);
            return [null, response];
        }
        return [error, null];
    }
    public async sendMessage(text: string) {
        return this.emit('message', 'send', {
            to: 'defaultGroup',
            type: 'text',
            content: text
        });
    }

    async loginWithToken(token: string) {
        return this.emit('user', 'loginByToken', { token });
    }

    disconnect() {
        this.socket.disconnect();
    }

    connect() {
        this.socket.connect();
    }
}

export const socketClient = new SocketClient('https://miniature-palm-tree-7j9g66v4gw53xvvg-3000.app.github.dev');