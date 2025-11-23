import React from 'react';
import { LayoutDashboard, Receipt, Wallet, Settings, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import './Sidebar.css';

const Sidebar = () => {
    const location = useLocation();
    const { signOut } = useClerk();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: Receipt, label: 'Transactions', path: '/transactions' },
        { icon: Wallet, label: 'Wallet', path: '/wallet' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    return (
        <aside className="sidebar glass-panel">
            <div className="sidebar-header">
                <div className="logo-icon">
                    <Wallet size={28} color="var(--accent-primary)" />
                </div>
                <h2 className="logo-text">Finance<span className="text-accent">Flow</span></h2>
            </div>

            <nav className="sidebar-nav">
                {menuItems.map((item, index) => (
                    <Link
                        to={item.path}
                        key={index}
                        className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                    >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="sidebar-footer">
                <button className="nav-item logout-btn" onClick={() => signOut()}>
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
