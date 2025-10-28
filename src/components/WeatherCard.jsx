import React from 'react';

const WeatherCard = ({ weatherData }) => {
  const getWeatherDescription = (code) => {
    const weatherCodes = {
      0: { description: 'Clear sky', icon: '☀️' },
      1: { description: 'Mainly clear', icon: '🌤️' },
      2: { description: 'Partly cloudy', icon: '⛅' },
      3: { description: 'Overcast', icon: '☁️' },
      45: { description: 'Foggy', icon: '🌫️' },
      48: { description: 'Depositing rime fog', icon: '🌫️' },
      51: { description: 'Light drizzle', icon: '🌦️' },
      53: { description: 'Moderate drizzle', icon: '🌦️' },
      55: { description: 'Dense drizzle', icon: '🌧️' },
      61: { description: 'Slight rain', icon: '🌧️' },
      63: { description: 'Moderate rain', icon: '🌧️' },
      65: { description: 'Heavy rain', icon: '⛈️' },
      71: { description: 'Slight snow', icon: '🌨️' },
      73: { description: 'Moderate snow', icon: '❄️' },
      75: { description: 'Heavy snow', icon: '❄️' },
      95: { description: 'Thunderstorm', icon: '⛈️' },
    };
    
    return weatherCodes[code] || { description: 'Unknown', icon: '🌡️' };
  };

  const weather = getWeatherDescription(weatherData.weatherCode);

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-2xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-1">
            {weatherData.city}, {weatherData.country}
          </h2>
          <p className="text-white/70">Current Weather</p>
        </div>
        
        <div className="text-center mb-6">
          <div className="text-6xl mb-2">{weather.icon}</div>
          <div className="text-5xl font-bold text-white mb-2">
            {weatherData.temperature}°C
          </div>
          <p className="text-white/80 text-lg">{weather.description}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <div className="text-2xl mb-1">💨</div>
            <div className="text-white font-semibold">{weatherData.windSpeed} km/h</div>
            <div className="text-white/70 text-sm">Wind Speed</div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <div className="text-2xl mb-1">💧</div>
            <div className="text-white font-semibold">{weatherData.humidity}%</div>
            <div className="text-white/70 text-sm">Humidity</div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-white/60 text-sm">
            Perfect for outdoor activities? {weatherData.temperature >= 15 && weatherData.temperature <= 25 ? '✅ Yes!' : '⚠️ Check conditions'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;