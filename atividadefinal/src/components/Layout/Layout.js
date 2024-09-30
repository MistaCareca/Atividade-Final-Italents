// src/components/Layout/Layout.js
import React from 'react';
import './Layout.css';

const Layout = ({ children }) => {
    return (
        <div className="layout-container">
            {children}
        </div>
    );
};

export default Layout;
