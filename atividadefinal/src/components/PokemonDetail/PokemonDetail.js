import React from 'react';
import './PokemonDetail.css';

const PokemonDetail = ({ details }) => {
    return (
        <div className="pokemon-detail">
            <p><strong>Altura:</strong> {details.height}</p>
            <p><strong>Peso:</strong> {details.weight}</p>
            <p><strong>Tipos:</strong> {details.types.map(t => t.type.name).join(', ')}</p>
            <p><strong>Habilidades:</strong> {details.abilities.map(a => a.ability.name).join(', ')}</p>
        </div>
    );
};

export default PokemonDetail;