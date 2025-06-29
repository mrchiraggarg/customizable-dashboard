import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Newspaper, ExternalLink, Clock } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  publishedAt: string;
  source: string;
}

const NewsWidget: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with mock data
    const fetchNews = async () => {
      setLoading(true);
      setTimeout(() => {
        setNews([
          {
            id: '1',
            title: 'Tech Giants Report Strong Q4 Earnings',
            summary: 'Major technology companies exceeded expectations in their quarterly reports...',
            url: '#',
            publishedAt: '2 hours ago',
            source: 'Tech News'
          },
          {
            id: '2',
            title: 'Global Markets React to Economic Data',
            summary: 'Stock markets worldwide showed mixed reactions to latest economic indicators...',
            url: '#',
            publishedAt: '4 hours ago',
            source: 'Financial Times'
          },
          {
            id: '3',
            title: 'Innovation in Renewable Energy Sector',
            summary: 'New breakthrough technologies promise to revolutionize clean energy production...',
            url: '#',
            publishedAt: '6 hours ago',
            source: 'Green Tech'
          }
        ]);
        setLoading(false);
      }, 1200);
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Newspaper className="w-8 h-8 text-purple-500" />
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
        <Newspaper className="w-6 h-6 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Latest News</h3>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {news.map((item, index) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                  {item.summary}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{item.publishedAt}</span>
                  </div>
                  <span>{item.source}</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 ml-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.article>
        ))}
      </div>
    </motion.div>
  );
};

export default NewsWidget;