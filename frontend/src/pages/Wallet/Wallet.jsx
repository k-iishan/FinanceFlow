import React from 'react';
import { CreditCard, Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import './Wallet.css';

const Wallet = () => {
    return (
        <div className="wallet-page">
            <h1>My Wallet</h1>

            <div className="wallet-grid">
                {/* Cards Section */}
                <section className="cards-section">
                    <div className="card-display glass-panel">
                        <div className="card-header">
                            <span>Primary Card</span>
                            <CreditCard size={24} />
                        </div>
                        <div className="card-number">**** **** **** 4242</div>
                        <div className="card-footer">
                            <div className="card-holder">
                                <span>Card Holder</span>
                                <strong>Pro User</strong>
                            </div>
                            <div className="card-expiry">
                                <span>Expires</span>
                                <strong>12/28</strong>
                            </div>
                        </div>
                    </div>
                    <button className="add-card-btn">
                        <Plus size={20} /> Add New Card
                    </button>
                </section>

                {/* Balance Breakdown */}
                <section className="balance-breakdown glass-panel">
                    <h3>Balance Breakdown</h3>
                    <div className="balance-item">
                        <div className="icon-box wallet">
                            <WalletIcon size={20} />
                        </div>
                        <div className="balance-info">
                            <span>Main Wallet</span>
                            <strong>$8,450.00</strong>
                        </div>
                    </div>
                    <div className="balance-item">
                        <div className="icon-box savings">
                            <ArrowUpRight size={20} />
                        </div>
                        <div className="balance-info">
                            <span>Savings</span>
                            <strong>$4,000.00</strong>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

// Helper Icon for Add Button
const Plus = ({ size }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);

export default Wallet;
