import React from 'react';
import { ShoppingBag, Coffee, Home, Car, DollarSign, Film, Heart, Briefcase, TrendingUp, MoreHorizontal } from 'lucide-react';
import './RecentTransactions.css';

const getCategoryIcon = (category) => {
    switch (category) {
        case 'Food': return Coffee;
        case 'Shopping': return ShoppingBag;
        case 'Transport': return Car;
        case 'Bills': return Home;
        case 'Entertainment': return Film;
        case 'Health': return Heart;
        case 'Salary': return DollarSign;
        case 'Freelance': return Briefcase;
        case 'Investment': return TrendingUp;
        default: return MoreHorizontal;
    }
};

const RecentTransactions = ({ transactions = [] }) => {
    // Take only the last 5 transactions
    const recentTransactions = transactions.slice(0, 5);

    if (recentTransactions.length === 0) {
        return (
            <div className="recent-transactions glass-panel">
                <div className="section-header">
                    <h3>Recent Transactions</h3>
                </div>
                <div className="no-transactions">
                    <p>No recent transactions</p>
                </div>
            </div>
        );
    }

    return (
        <div className="recent-transactions glass-panel">
            <div className="section-header">
                <h3>Recent Transactions</h3>
                <button className="view-all-btn">View All</button>
            </div>

            <div className="transactions-list">
                {recentTransactions.map((tx) => {
                    const Icon = getCategoryIcon(tx.category);
                    return (
                        <div key={tx._id} className="transaction-item">
                            <div className={`tx-icon-wrapper ${tx.type}`}>
                                <Icon size={20} />
                            </div>
                            <div className="tx-details">
                                <span className="tx-title">{tx.title}</span>
                                <span className="tx-date">{new Date(tx.date).toLocaleDateString()}</span>
                            </div>
                            <div className={`tx-amount ${tx.type}`}>
                                {tx.type === 'income' ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RecentTransactions;
