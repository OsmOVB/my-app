import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { createTablePet, fetchUser } from '../src/database';  // Certifique-se de ajustar o caminho para o arquivo correto

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    useEffect(() => {
        const initializeDatabase = async () => {
            try {
                await createTablePet();  // Garante que a tabela "pets" seja criada
                console.log('Tabela "pets" criada com sucesso.');
            } catch (error) {
                console.error('Erro ao criar a tabela "pets":', error);
            }
        };
        initializeDatabase();
    }, []);

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleLogin = async () => {
        if (!validateEmail(email)) {
            Alert.alert('Erro', 'Por favor, insira um email válido.');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        try {
            const user = await fetchUser(email, password);
            if (user) {
                router.push('../../screens/PetListScreen');
                createTablePet(); // Certifique-se de que a tabela de bichinhos existe
            } else {
                Alert.alert('Erro', 'Credenciais inválidas.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login.');
        }
    };

    const handleSignUpNavigation = () => {
        router.push('../../screens/SignUpScreen'); // Navega para a tela de cadastro
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/01.png')} style={styles.image} />
            <Text style={styles.title}>Bem-vindo ao Tamagochi</Text>
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
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSignUpNavigation}>
                <Text style={styles.signUpText}>Não tem uma conta? Cadastre-se</Text>
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
    image: {
        width: 150,
        height: 150,
        marginBottom: 20,
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
    signUpText: {
        color: '#FFA500',
        marginTop: 20,
        textDecorationLine: 'underline',
    },
});

export default LoginScreen;
