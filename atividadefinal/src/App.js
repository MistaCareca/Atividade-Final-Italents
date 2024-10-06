import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Layout from './components/Layout/Layout';
import SearchForm from './components/SearchForm/SearchForm';
import PokemonList from './components/PokemonList/PokemonList';
import Favorites from './components/Favorites/Favorites';
import Forms from './components/Forms/Forms';
import axios from 'axios';

function App() {
    const [searchTerm, setSearchTerm] = useState(''); 
    const [favorites, setFavorites] = useState([]);

    const fetchFavorites = async () => {
        try {
            const res = await axios.get('http://localhost:3001/favorites');
            console.log('Favoritos buscados:', res.data); // Log
            setFavorites(res.data);
        } catch (error) {
            console.error('Erro ao buscar favoritos:', error);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    const addFavorite = async (pokemon) => {
        try {
            const existing = await axios.get(`http://localhost:3001/favorites?pokemonId=${pokemon.pokemonId}`);
            console.log(`Verificando se ${pokemon.name} já está nos favoritos:`, existing.data); 
            if (existing.data.length === 0) {
                const res = await axios.post('http://localhost:3001/favorites', pokemon);
                console.log('Favorito adicionado:', res.data); 
                setFavorites(prevFavorites => [...prevFavorites, res.data]); 
            } else {
                alert(`${pokemon.name} já está nos favoritos!`);
            }
        } catch (error) {
            console.error('Erro ao adicionar favorito:', error);
        }
    };

    const removeFavorite = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/favorites/${id}`);
            console.log(`Favorito com id ${id} removido`); 
            setFavorites(prevFavorites => prevFavorites.filter(pokemon => pokemon.id !== id));
        } catch (error) {
            console.error('Erro ao remover favorito:', error);
        }
    };

    return (
        <div className="App">
            <Header />
            <Layout>
                <SearchForm onSearch={setSearchTerm} />
                <Favorites favorites={favorites} removeFavorite={removeFavorite} />
                <PokemonList 
                    search={searchTerm}
                    addFavorite={addFavorite} 
                    favorites={favorites}
                    removeFavorite={removeFavorite}
                />
            </Layout>
            <Forms/>
        </div>
    );
}

export default App;
