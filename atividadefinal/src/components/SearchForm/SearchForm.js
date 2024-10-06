import React, { useState } from 'react';
import './SearchForm.css';

const SearchForm = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <div className="search-form">
            <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                placeholder="Buscar Pokémon"
            />
        </div>
    );
};

export default SearchForm;