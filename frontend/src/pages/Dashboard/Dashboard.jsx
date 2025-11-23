import React, { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import SummaryCard from './SummaryCard';
import RecentTransactions from './RecentTransactions';
import AddTransactionModal from '../../components/Transaction/AddTransactionModal';
import FinancialChart from '../../components/Dashboard/FinancialChart';
import { Plus } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
    const { getToken, userId } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchTransactions = async () => {
        try {
            const token = await getToken();
            const response = await fetch(`http://localhost:5000/api/transactions?userId=${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
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

    useEffect(() => {
        if (userId) {
            fetchTransactions();
        }
    }, [userId, getToken]);

    // Calculate Summaries
    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((acc, curr) => acc + curr.amount, 0);

    const totalExpenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, curr) => acc + curr.amount, 0);

    const totalBalance = totalIncome - totalExpenses;

    return (
        <div className="dashboard">
            <div className="dashboard-grid">
                {/* Summary Cards */}
                <section className="summary-section">
                    <SummaryCard
                        title="Total Balance"
                        amount={totalBalance}
                        percentage={0}
                        type="neutral"
                    />
                    <SummaryCard
                        title="Total Income"
                        amount={totalIncome}
                        percentage={0}
                        type="income"
                    />
                    <SummaryCard
                        title="Total Expenses"
                        amount={totalExpenses}
                        percentage={0}
                        type="expense"
                    />
                </section>

                {/* Main Content Grid */}
                <section className="main-grid">
                    <div className="chart-container glass-panel">
                        <div className="section-header">
                            <h3>Analytics</h3>
                            <select className="period-select">
                                <option>This Week</option>
                                <option>This Month</option>
                                <option>This Year</option>
                            </select>
                        </div>
                        <div className="chart-placeholder" style={{ height: '300px', width: '100%' }}>
                            <FinancialChart transactions={transactions} />
                        </div>
                    </div>

                    <div className="transactions-container">
                        <RecentTransactions transactions={transactions} />
                    </div>
                </section>
            </div>

            <button className="fab-add" onClick={() => setIsModalOpen(true)}>
                <Plus size={24} />
            </button>

            <AddTransactionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onTransactionAdded={fetchTransactions}
            />
        </div>
    );
};

export default Dashboard;
