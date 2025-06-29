import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Sun, CloudRain, Wind, Thermometer, Droplets } from 'lucide-react';

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with mock data
    const fetchWeather = async () => {
      setLoading(true);
      // Simulate API delay
      setTimeout(() => {
        setWeather({
          location: 'New York, NY',
          temperature: 22,
          condition: 'Partly Cloudy',
          humidity: 65,
          windSpeed: 12,
          icon: 'partly-cloudy'
        });
        setLoading(false);
      }, 1000);
    };

    fetchWeather();
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'rainy':
        return <CloudRain className="w-8 h-8 text-blue-500" />;
      default:
        return <Cloud className="w-8 h-8 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Cloud className="w-8 h-8 text-blue-500" />
        </motion.div>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="h-full p-6 bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-xl"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">Weather</h3>
          <p className="text-blue-100">{weather.location}</p>
        </div>
        {getWeatherIcon(weather.condition)}
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Thermometer className="w-5 h-5 text-blue-200" />
          <span className="text-3xl font-bold">{weather.temperature}°C</span>
        </div>

        <p className="text-blue-100">{weather.condition}</p>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex items-center space-x-2">
            <Droplets className="w-4 h-4 text-blue-200" />
            <span className="text-sm">{weather.humidity}%</span>
          </div>
          <div className="flex items-center space-x-2">
            <Wind className="w-4 h-4 text-blue-200" />
            <span className="text-sm">{weather.windSpeed} km/h</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherWidget;