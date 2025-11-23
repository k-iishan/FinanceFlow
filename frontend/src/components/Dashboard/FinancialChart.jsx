import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const FinancialChart = ({ transactions }) => {
    // Process data for the chart
    const processData = () => {
        if (!transactions || transactions.length === 0) return [];

        // Group by date
        const grouped = transactions.reduce((acc, curr) => {
            const date = new Date(curr.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            if (!acc[date]) {
                acc[date] = { date, income: 0, expense: 0 };
            }
            if (curr.type === 'income') {
                acc[date].income += curr.amount;
            } else {
                acc[date].expense += curr.amount;
            }
            return acc;
        }, {});

        // Convert to array and sort by date
        return Object.values(grouped).sort((a, b) => new Date(a.date) - new Date(b.date));
    };

    const data = processData();

    if (data.length === 0) {
        return (
            <div style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)'
            }}>
                No data available
            </div>
        );
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <defs>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis
                    dataKey="date"
                    stroke="var(--text-secondary)"
                    tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="var(--text-secondary)"
                    tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: 'var(--bg-card)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        color: 'var(--text-primary)'
                    }}
                />
                <Area
                    type="monotone"
                    dataKey="income"
                    stroke="#10b981"
                    fillOpacity={1}
                    fill="url(#colorIncome)"
                    strokeWidth={2}
                    name="Income"
                />
                <Area
                    type="monotone"
                    dataKey="expense"
                    stroke="#ef4444"
                    fillOpacity={1}
                    fill="url(#colorExpense)"
                    strokeWidth={2}
                    name="Expense"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default FinancialChart;
