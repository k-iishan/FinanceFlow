import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { Search, Filter, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import './Transactions.css';

const Transactions = () => {
    const { getToken, userId } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const token = await getToken();
                const response = await fetch(`http://localhost:5000/api/transactions?userId=${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    setTransactions(data);
                }
            } catch (error) {
                console.error("Error fetching transactions:", error);
            } finally {
                setLoading(false);
            }
        };

        if (userId) fetchTransactions();
    }, [userId, getToken]);

    const filteredTransactions = transactions.filter(tx => {
        const matchesSearch = tx.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'all' || tx.type === filterType;
        return matchesSearch && matchesType;
    });

    return (
        <div className="transactions-page">
            <div className="page-header">
                <h1>Transactions</h1>
                <div className="controls">
                    <div className="search-wrapper">
                        <Search size={20} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search transactions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="filter-wrapper">
                        <Filter size={20} className="filter-icon" />
                        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                            <option value="all">All Types</option>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="transactions-table-container glass-panel">
                <table className="transactions-table">
                    <thead>
                        <tr>
                            <th>Transaction</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTransactions.map(tx => (
                            <tr key={tx._id}>
                                <td>
                                    <div className="tx-info">
                                        <div className={`icon-box ${tx.type}`}>
                                            {tx.type === 'income' ? <ArrowUpRight size={18} /> : <ArrowDownLeft size={18} />}
                                        </div>
                                        <span>{tx.title}</span>
                                    </div>
                                </td>
                                <td>{tx.category}</td>
                                <td>{new Date(tx.date).toLocaleDateString()}</td>
                                <td className={tx.type}>
                                    {tx.type === 'income' ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
                                </td>
                                <td>
                                    <span className="status-badge completed">Completed</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredTransactions.length === 0 && (
                    <div className="no-results">No transactions found</div>
                )}
            </div>
        </div>
    );
};

export default Transactions;
