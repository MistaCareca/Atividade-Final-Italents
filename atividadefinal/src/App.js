import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Layout from './components/Layout/Layout';
import SearchForm from './components/SearchForm/SearchForm';
import PokemonList from './components/PokemonList/PokemonList';
import Favorites from './components/Favorites/Favorites';
import axios from 'axios';

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [favorites, setFavorites] = useState([]);

    const fetchFavorites = async () => {
        try {
            const res = await axios.get('http://localhost:3001/favorites');
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
            const existing = await axios.get(`http://localhost:3001/favorites?name=${pokemon.name}`);
            if (existing.data.length === 0) {
                await axios.post('http://localhost:3001/favorites', pokemon);
                fetchFavorites();
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
            fetchFavorites();
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
                />
            </Layout>
        </div>
    );
}

export default App;
