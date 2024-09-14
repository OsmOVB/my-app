import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { insertUser, createTableUser } from '../src/database';

const SignUpScreen = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSignUp = async () => {
        if (!validateEmail(email)) {
            Alert.alert('Erro', 'Por favor, insira um email válido.');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        try {
            await createTableUser(); // Garante que a tabela de usuários exista
            await insertUser(username, email, password);
            Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
            router.push('./LoginScreen'); // Navega de volta para a tela de login
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Ocorreu um erro ao tentar cadastrar o usuário.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro</Text>
            <TextInput
                style={styles.input}
                placeholder="Nome de usuário"
                placeholderTextColor="#999999"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#999999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1A1A1A',
        padding: 20,
    },
    title: {
        fontSize: 24,
        color: '#FFA500',
        marginBottom: 40,
    },
    input: {
        width: '100%',
        backgroundColor: '#333333',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        borderColor: '#555555',
        borderWidth: 1,
        color: '#FFFFFF',
    },
    button: {
        width: '100%',
        backgroundColor: '#FFA500',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#1A1A1A',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default SignUpScreen;
