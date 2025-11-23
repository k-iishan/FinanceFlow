import React from 'react';
import { Bell, Search } from 'lucide-react';
import { UserButton, useUser } from '@clerk/clerk-react';
import './Header.css';

const Header = ({ title = "Dashboard" }) => {
    const { user } = useUser();

    return (
        <header className="header">
            <div className="header-title">
                <h1>{title}</h1>
                <p className="date">Tuesday, 23 Nov 2025</p>
            </div>

            <div className="header-actions">
                <div className="search-bar glass-panel">
                    <Search size={18} className="search-icon" />
                    <input type="text" placeholder="Search transactions..." />
                </div>

                <button className="icon-btn glass-panel">
                    <Bell size={20} />
                    <span className="notification-dot"></span>
                </button>

                <div className="user-profile-wrapper">
                    <UserButton afterSignOutUrl="/sign-in" />
                    <div className="user-info">
                        <span className="name">{user?.firstName}</span>
                        <span className="role">Pro User</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
