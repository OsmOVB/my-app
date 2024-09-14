import { createTable, getItems, insertItem } from '@/components/src/database';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

const HomeScreen = () => {
  const [items, setItems] = useState<{ id: number, name: string, value: number }[]>([]);

  useEffect(() => {
    async function initDb() {
      await createTable();
      const fetchedItems = await getItems();
      setItems(fetchedItems);
    }

    initDb();
  }, []);

  const handleAddItem = async () => {
    await insertItem('Novo Item', Math.random() * 100);
    const fetchedItems = await getItems();
    setItems(fetchedItems); // Recarrega os itens após a inserção
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo!</Text>
      <Button title="Adicionar Item" onPress={handleAddItem} />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.itemText}>
            {item.name}: {item.value.toFixed(2)}
          </Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default HomeScreen;
