import React from 'react';
import './Favorites.css';

const Favorites = ({ favorites, removeFavorite }) => {
    if (favorites.length === 0) return <p>Nenhum Pokémon favorito.</p>;

    return (
        <div className="favorites">
            <h2>Favoritos</h2>
            <ul className="favorites-list">
                {favorites.map((pokemon) => (
                    <li key={pokemon.id} className="favorite-item">
                        <span>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</span>
                        <img 
                            src={pokemon.url || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokemonId}.png`} 
                            alt={pokemon.name} 
                        />
                        <button onClick={() => removeFavorite(pokemon.id)}>Remover</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Favorites;
