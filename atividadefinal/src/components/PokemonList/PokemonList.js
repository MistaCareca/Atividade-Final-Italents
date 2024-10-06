import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from '../PokemonCard/PokemonCard';
import './PokemonList.css';

const PokemonList = ({ search, addFavorite, favorites, removeFavorite }) => {
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    useEffect(() => {
        const fetchPokemonList = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000');
                setPokemonList(response.data.results);
            } catch (error) {
                console.error('Erro ao buscar lista de Pokémons:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemonList();
    }, []);

    const filteredList = pokemonList.filter(pokemon =>
        pokemon.name.toLowerCase().includes((search || '').toLowerCase())
    );

    const totalPages = Math.ceil(filteredList.length / itemsPerPage);
    const displayedPokemons = filteredList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    if (loading) return <p>Carregando Pokémons...</p>;

    return (
        <div className="pokemon-list">
            <div className="pokemon-cards">
            {displayedPokemons.map(pokemon => {
    const isFavorite = favorites.some(fav => fav.pokemonId === pokemon.name); // Usando pokemon.name em vez de pokemon.id
    return (
        <PokemonCard
            key={pokemon.name}
            name={pokemon.name}
            url={pokemon.url}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
            isFavorite={isFavorite} 
        />
    );
})}
            </div>
            <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                    Anterior
                </button>
                <span>Página {currentPage} de {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Próxima
                </button>
            </div>
        </div>
    );
};

export default PokemonList;
