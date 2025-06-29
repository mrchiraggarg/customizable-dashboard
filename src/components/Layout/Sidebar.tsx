import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cloud, Newspaper, TrendingUp, CheckSquare, Eye, EyeOff } from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const widgetIcons = {
  weather: Cloud,
  news: Newspaper,
  stocks: TrendingUp,
  todo: CheckSquare,
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { widgets, updateWidgetEnabled } = useDashboard();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            exit={{ x: 300 }}
            className="fixed right-0 top-0 h-full w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-l border-gray-200/50 dark:border-gray-700/50 z-50 shadow-2xl"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Widget Settings
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </motion.button>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Available Widgets
                </h3>
                
                {widgets.map((widget) => {
                  const Icon = widgetIcons[widget.type];
                  return (
                    <motion.div
                      key={widget.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between p-4 rounded-xl bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-white dark:bg-gray-700 shadow-sm">
                          <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {widget.title}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {widget.enabled ? 'Visible' : 'Hidden'}
                          </p>
                        </div>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => updateWidgetEnabled(widget.id, !widget.enabled)}
                        className={`p-2 rounded-lg transition-colors ${
                          widget.enabled
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                        }`}
                      >
                        {widget.enabled ? (
                          <Eye className="w-4 h-4" />
                        ) : (
                          <EyeOff className="w-4 h-4" />
                        )}
                      </motion.button>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-8 p-4 rounded-xl bg-blue-50/50 dark:bg-blue-900/20 border border-blue-200/50 dark:border-blue-700/50">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                  Pro Tips
                </h4>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• Drag widgets to rearrange</li>
                  <li>• Resize by dragging corners</li>
                  <li>• Changes save automatically</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;