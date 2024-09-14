import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { insertPet } from '../src/database';

const images = [
    { uri: require('../../assets/images/01.png'), path: '../../assets/images/01.png' },
    { uri: require('../../assets/images/02.png'), path: '../../assets/images/02.png' },
    { uri: require('../../assets/images/03.png'), path: '../../assets/images/03.png' },
    { uri: require('../../assets/images/04.png'), path: '../../assets/images/04.png' },
    { uri: require('../../assets/images/05.png'), path: '../../assets/images/05.png' },
];

const PetRegisterScreen = () => {
    const [name, setName] = useState('');
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    const handleRegister = async () => {
        if (!name) {
            Alert.alert('Erro', 'Por favor, insira o nome do bichinho.');
            return;
        }

        if (selectedImageIndex === null) {
            Alert.alert('Erro', 'Por favor, selecione uma imagem.');
            return;
        }

        const selectedImage = images[selectedImageIndex];
        try {
            // Passa a referência da imagem no banco de dados
            await insertPet(name, selectedImage.path); 
            Alert.alert('Sucesso', 'Bichinho cadastrado com sucesso!');
            setName('');
            setSelectedImageIndex(null);
        } catch (error) {
            console.error('Erro ao cadastrar o bichinho:', error);
            Alert.alert('Erro', 'Houve um problema ao cadastrar o bichinho.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro de Bichinho</Text>
            <TextInput
                style={styles.input}
                placeholder="Nome"
                placeholderTextColor="#999999"
                value={name}
                onChangeText={setName}
            />
            <Text style={styles.subtitle}>Selecione uma Imagem</Text>
            <View style={styles.imageContainer}>
                {images.map((img, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.imageWrapper,
                            selectedImageIndex === index && styles.selectedImageWrapper,
                        ]}
                        onPress={() => setSelectedImageIndex(index)}
                    >
                        <Image source={img.uri} style={styles.image} />
                    </TouchableOpacity>
                ))}
            </View>
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
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
        fontWeight: 'bold',
        marginBottom: 20,
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
    subtitle: {
        fontSize: 18,
        color: '#FFA500',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    imageWrapper: {
        padding: 5,
        borderRadius: 8,
    },
    selectedImageWrapper: {
        borderColor: '#FFA500',
        borderWidth: 2,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 8,
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

export default PetRegisterScreen;
