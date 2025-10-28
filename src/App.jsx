import { useState, useEffect } from 'react';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debug logging
  console.log('Weather App loaded successfully!');

  const getWeatherTheme = (temperature) => {
    if (temperature >= 30) {
      return 'from-orange-400 via-red-400 to-pink-400';
    } else if (temperature >= 25) {
      return 'from-yellow-400 via-orange-400 to-red-400';
    } else if (temperature >= 20) {
      return 'from-green-400 via-blue-400 to-purple-400';
    } else if (temperature >= 15) {
      return 'from-blue-400 via-indigo-400 to-purple-400';
    } else if (temperature >= 10) {
      return 'from-blue-500 via-blue-600 to-indigo-600';
    } else {
      return 'from-blue-600 via-indigo-700 to-purple-800';
    }
  };

  const fetchWeatherData = async (city) => {
    setLoading(true);
    setError(null);

    try {
      console.log('Fetching weather for:', city);

      const cityCoordinates = {
        'london': { lat: 51.5074, lon: -0.1278, name: 'London', country: 'United Kingdom' },
        'new york': { lat: 40.7128, lon: -74.0060, name: 'New York', country: 'United States' },
        'tokyo': { lat: 35.6762, lon: 139.6503, name: 'Tokyo', country: 'Japan' },
        'sydney': { lat: -33.8688, lon: 151.2093, name: 'Sydney', country: 'Australia' },
        'paris': { lat: 48.8566, lon: 2.3522, name: 'Paris', country: 'France' },
        'mumbai': { lat: 19.0760, lon: 72.8777, name: 'Mumbai', country: 'India' },
        'delhi': { lat: 28.7041, lon: 77.1025, name: 'Delhi', country: 'India' },
        'bangalore': { lat: 12.9716, lon: 77.5946, name: 'Bangalore', country: 'India' }
      };

      const cityKey = city.toLowerCase();
      let latitude, longitude, name, country;

      if (cityCoordinates[cityKey]) {
        const coords = cityCoordinates[cityKey];
        latitude = coords.lat;
        longitude = coords.lon;
        name = coords.name;
        country = coords.country;
        console.log('Using predefined coordinates for:', name);
      } else {
        // Try geocoding A
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
        console.log('Geocoding URL:', geoUrl);

        const geoResponse = await fetch(geoUrl);
        console.log('Geocoding response status:', geoResponse.status);

        if (!geoResponse.ok) {
          throw new Error(`City "${city}" not found. Try: London, New York, Tokyo, Sydney, Paris, Mumbai, Delhi, or Bangalore`);
        }

        const geoData = await geoResponse.json();
        console.log('Geocoding data:', geoData);

        if (!geoData.results || geoData.results.length === 0) {
          throw new Error(`City "${city}" not found. Try: London, New York, Tokyo, Sydney, Paris, Mumbai, Delhi, or Bangalore`);
        }

        const result = geoData.results[0];
        latitude = result.latitude;
        longitude = result.longitude;
        name = result.name;
        country = result.country;
      }

      console.log('Using coordinates:', { latitude, longitude, name, country });

      // Now get weather data
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`;
      console.log('Weather URL:', weatherUrl);

      const weatherResponse = await fetch(weatherUrl);
      console.log('Weather response status:', weatherResponse.status);

      if (!weatherResponse.ok) {
        throw new Error(`Weather service unavailable (${weatherResponse.status}). Please try again later.`);
      }

      const weatherData = await weatherResponse.json();
      console.log('Weather data:', weatherData);

      if (!weatherData.current) {
        throw new Error('Invalid weather data received. Please try again.');
      }

      setWeatherData({
        temperature: Math.round(weatherData.current.temperature_2m),
        weatherCode: weatherData.current.weather_code,
        windSpeed: Math.round(weatherData.current.wind_speed_10m * 10) / 10,
        humidity: weatherData.current.relative_humidity_2m,
        city: name,
        country: country
      });
    } catch (err) {
      console.error('Error fetching weather:', err);
      setError(err.message || 'Network error. Please check your internet connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Test network connectivity
  const testConnection = async () => {
    try {
      const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=51.5074&longitude=-0.1278&current=temperature_2m');
      console.log('Connection test successful:', response.ok);
      return response.ok;
    } catch (err) {
      console.error('Connection test failed:', err);
      return false;
    }
  };

  // Load default city on mount
  useEffect(() => {
    const initializeApp = async () => {
      console.log('Initializing weather app...');
      const isConnected = await testConnection();
      if (isConnected) {
        fetchWeatherData('London');
      } else {
        setError('Unable to connect to weather service. Please check your internet connection.');
      }
    };

    initializeApp();
  }, []);

  const backgroundTheme = weatherData ? getWeatherTheme(weatherData.temperature) : 'from-blue-400 via-blue-500 to-blue-600';

  return (
    <div className={`min-h-screen bg-gradient-to-br ${backgroundTheme} transition-all duration-1000 ease-in-out`}>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 drop-shadow-lg">
            Weather Now
          </h1>
          <p className="text-white/80 text-lg">
            Quick weather check for outdoor enthusiasts
          </p>
        </div>

        <SearchBar onSearch={fetchWeatherData} loading={loading} />

        {error && (
          <div className="max-w-md mx-auto mt-6 p-4 bg-red-500/20 backdrop-blur-sm rounded-lg border border-red-300/30">
            <p className="text-white text-center mb-3">{error}</p>
            <button
              onClick={() => {
                setError(null);
                fetchWeatherData('London');
              }}
              className="w-full px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-all duration-200"
            >
              Try Again
            </button>
          </div>
        )}

        {weatherData && !loading && (
          <WeatherCard weatherData={weatherData} />
        )}

        {loading && (
          <div className="max-w-md mx-auto mt-8 p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-white">Loading weather data...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;