import React from 'react';
import { ArrowUpRight, ArrowDownRight, DollarSign } from 'lucide-react';
import './SummaryCard.css';

const SummaryCard = ({ title, amount, type = 'neutral', percentage }) => {
    const getIcon = () => {
        switch (type) {
            case 'income': return <ArrowUpRight size={24} className="icon-success" />;
            case 'expense': return <ArrowDownRight size={24} className="icon-danger" />;
            default: return <DollarSign size={24} className="icon-neutral" />;
        }
    };

    const getTrendClass = () => {
        if (percentage > 0) return 'trend-up';
        if (percentage < 0) return 'trend-down';
        return 'trend-neutral';
    };

    return (
        <div className="summary-card glass-panel">
            <div className="card-header">
                <span className="card-title">{title}</span>
                <div className={`icon-wrapper ${type}`}>
                    {getIcon()}
                </div>
            </div>
            <div className="card-content">
                <h3 className="amount">${amount.toLocaleString()}</h3>
                <div className={`trend ${getTrendClass()}`}>
                    <span>{percentage > 0 ? '+' : ''}{percentage}%</span>
                    <span className="trend-label">from last month</span>
                </div>
            </div>
        </div>
    );
};

export default SummaryCard;
