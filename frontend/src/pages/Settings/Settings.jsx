import React from 'react';
import { User, Bell, Shield, Moon, LogOut } from 'lucide-react';
import { useClerk } from '@clerk/clerk-react';
import './Settings.css';

const Settings = () => {
    const { signOut } = useClerk();

    return (
        <div className="settings-page">
            <h1>Settings</h1>

            <div className="settings-grid">
                <section className="settings-section glass-panel">
                    <h3>Preferences</h3>
                    <div className="setting-item">
                        <div className="setting-info">
                            <Moon size={20} />
                            <span>Dark Mode</span>
                        </div>
                        <label className="switch">
                            <input type="checkbox" defaultChecked />
                            <span className="slider round"></span>
                        </label>
                    </div>
                    <div className="setting-item">
                        <div className="setting-info">
                            <Bell size={20} />
                            <span>Notifications</span>
                        </div>
                        <label className="switch">
                            <input type="checkbox" defaultChecked />
                            <span className="slider round"></span>
                        </label>
                    </div>
                </section>

                <section className="settings-section glass-panel">
                    <h3>Account</h3>
                    <div className="setting-item clickable">
                        <div className="setting-info">
                            <User size={20} />
                            <span>Edit Profile</span>
                        </div>
                    </div>
                    <div className="setting-item clickable">
                        <div className="setting-info">
                            <Shield size={20} />
                            <span>Security</span>
                        </div>
                    </div>
                    <div className="setting-item clickable danger" onClick={() => signOut()}>
                        <div className="setting-info">
                            <LogOut size={20} />
                            <span>Sign Out</span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Settings;
