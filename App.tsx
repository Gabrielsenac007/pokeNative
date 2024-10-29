import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { Pokemon } from './types';

export default function App() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [search, setSearch] = useState<string>("pikachu");

  // Função para buscar Pokémon
  const fetchPokemon = async () => {
    try {
      const response = await axios.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`);
      setPokemon(response.data);
    } catch (error) {
      console.error("Pokémon não encontrado", error);
      setPokemon(null);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokédex</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do Pokémon"
        value={search}
        onChangeText={setSearch}
      />
      <Button title="Buscar Pokémon" onPress={fetchPokemon} />

      {pokemon && (
        <View style={styles.pokemonInfo}>
          <Text style={styles.pokemonName}>{pokemon.name.toUpperCase()}</Text>
          <Image
            source={{ uri: pokemon.sprites.front_default }}
            style={styles.pokemonImage}
          />
          <Text>Tipo: {pokemon.types.map(t => t.type.name).join(', ')}</Text>
          <Text>Altura: {pokemon.height * 10} cm</Text>
          <Text>Peso: {pokemon.weight / 10} kg</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: "80%",
    marginBottom: 16
  },
  pokemonInfo: {
    marginTop: 16,
    alignItems: "center"
  },
  pokemonName: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "capitalize"
  },
  pokemonImage: {
    width: 150,
    height: 150,
    marginVertical: 16
  }
});
