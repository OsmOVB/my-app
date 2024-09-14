import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { fetchPets } from '../src/database';

const PetListScreen = () => {
    interface Pet {   
        id: number;    // Adiciona o campo id à interface
        name: string;
        image: string;
        hunger: number;
        sleep: number;
        fun: number;
        status: string;
    }

    const [pets, setPets] = useState<Pet[]>([]);
    const router = useRouter();

    useEffect(() => {
        const loadPets = async () => {
            try {
                const fetchedPets = await fetchPets();
                console.log('Bichinhos carregados:', fetchedPets);
                setPets(fetchedPets);
            } catch (error) {
                console.error('Erro ao carregar bichinhos:', JSON.stringify(error));
            }
        };

        loadPets();
    }, []);

    const renderItem = ({ item }: { item: Pet }) => (
        <View style={styles.petContainer}>
            <Image source={{ uri: item.image }} style={styles.petImage} />
            <View style={styles.petDetails}>
                <Text style={styles.petName}>{item.name}</Text>
                <Text style={styles.petAttribute}>Fome: {item.hunger}%</Text>
                <Text style={styles.petAttribute}>Sono: {item.sleep}%</Text>
                <Text style={styles.petAttribute}>Diversão: {item.fun}%</Text>
                <Text style={styles.petStatus}>Status: {item.status}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Personagens</Text>
            <FlatList
                data={pets}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push('./PetRegisterScreen')}
            >
                <Text style={styles.buttonText}>Cadastrar Novo Bichinho</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1A1A',
        paddingTop: 60,
        padding: 20,
    },
    title: {
        fontSize: 24,
        color: '#FFA500',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    list: {
        paddingBottom: 20,
    },
    petContainer: {
        flexDirection: 'row',
        backgroundColor: '#333333',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        alignItems: 'center',
    },
    petImage: {
        width: 60,
        height: 60,
        marginRight: 15,
        borderRadius: 30,
    },
    petDetails: {
        flex: 1,
    },
    petName: {
        fontSize: 18,
        color: '#FFA500',
        fontWeight: 'bold',
    },
    petAttribute: {
        fontSize: 14,
        color: '#CCCCCC',
    },
    petStatus: {
        fontSize: 14,
        color: '#00FF00',
        marginTop: 5,
    },
    button: {
        backgroundColor: '#FFA500',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#1A1A1A',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default PetListScreen;
