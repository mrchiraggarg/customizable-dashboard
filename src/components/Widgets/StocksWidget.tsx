import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  chartData: { time: string; price: number }[];
}

const StocksWidget: React.FC = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with mock data
    const fetchStocks = async () => {
      setLoading(true);
      setTimeout(() => {
        setStocks([
          {
            symbol: 'AAPL',
            name: 'Apple Inc.',
            price: 175.25,
            change: 2.15,
            changePercent: 1.24,
            chartData: [
              { time: '9:30', price: 173 },
              { time: '10:30', price: 174 },
              { time: '11:30', price: 173.5 },
              { time: '12:30', price: 175 },
              { time: '13:30', price: 175.25 },
            ]
          },
          {
            symbol: 'GOOGL',
            name: 'Alphabet Inc.',
            price: 2840.50,
            change: -15.30,
            changePercent: -0.54,
            chartData: [
              { time: '9:30', price: 2855 },
              { time: '10:30', price: 2850 },
              { time: '11:30', price: 2845 },
              { time: '12:30', price: 2842 },
              { time: '13:30', price: 2840.50 },
            ]
          },
          {
            symbol: 'TSLA',
            name: 'Tesla Inc.',
            price: 245.80,
            change: 8.45,
            changePercent: 3.56,
            chartData: [
              { time: '9:30', price: 237 },
              { time: '10:30', price: 240 },
              { time: '11:30', price: 242 },
              { time: '12:30', price: 244 },
              { time: '13:30', price: 245.80 },
            ]
          }
        ]);
        setLoading(false);
      }, 1500);
    };

    fetchStocks();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <TrendingUp className="w-8 h-8 text-green-500" />
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center space-x-2 mb-6">
        <DollarSign className="w-6 h-6 text-green-600" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Stock Market</h3>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {stocks.map((stock, index) => (
          <motion.div
            key={stock.symbol}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-gray-900 dark:text-white">{stock.symbol}</span>
                  {stock.change >= 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{stock.name}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900 dark:text-white">${stock.price}</p>
                <p className={`text-sm ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stock.change >= 0 ? '+' : ''}{stock.change} ({stock.changePercent}%)
                </p>
              </div>
            </div>
            
            <div className="h-16">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stock.chartData}>
                  <XAxis dataKey="time" hide />
                  <YAxis hide />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke={stock.change >= 0 ? '#10B981' : '#EF4444'}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default StocksWidget;