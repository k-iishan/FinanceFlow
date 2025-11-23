import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import './MainLayout.css';

const MainLayout = ({ children }) => {
    return (
        <div className="main-layout">
            <Sidebar />
            <main className="main-content">
                <Header />
                <div className="content-scrollable">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default MainLayout;
