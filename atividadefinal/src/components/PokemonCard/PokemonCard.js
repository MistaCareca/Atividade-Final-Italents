import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonDetail from '../PokemonDetail/PokemonDetail';
import './PokemonCard.css';

const PokemonCard = ({ name, url, addFavorite, isFavorite, removeFavorite }) => {
    const [details, setDetails] = useState(null);
    const [showDetail, setShowDetail] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await axios.get(url);
                setDetails(res.data);
            } catch (error) {
                console.error(`Erro ao buscar detalhes do Pokémon ${name}:`, error);
            }
        };

        fetchDetails();
    }, [url, name]);

    const toggleFavorite = () => {
        if (isFavorite && details) {
            removeFavorite(details.id); 
        } else if (details) {
            const pokemonToAdd = {
                pokemonId: details.id,
                name: details.name,
                url: url,
            };
            addFavorite(pokemonToAdd); 
        }
    };

    return (
        <div className="pokemon-card">
            <h3>{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
            {details && <img src={details.sprites.front_default} alt={name} />}
            <div className="card-buttons">
                <button onClick={toggleFavorite}>
                    {isFavorite ? 'Favorito' : 'Adicionar aos Favoritos'}
                </button>
                <button onClick={() => setShowDetail(!showDetail)}>
                    {showDetail ? 'Esconder Detalhes' : 'Mostrar Detalhes'}
                </button>
            </div>
            {showDetail && details && <PokemonDetail details={details} />}
        </div>
    );
};

export default PokemonCard;
