import { useState } from 'react';

const SearchBar = ({ onSearch, loading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() && !loading) {
      onSearch(city.trim());
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            className="w-full px-4 py-3 pl-12 pr-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-200"
            disabled={loading}
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <span className="text-white/60 text-xl">🔍</span>
          </div>
          <button
            type="submit"
            disabled={loading || !city.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 disabled:bg-white/10 disabled:cursor-not-allowed rounded-full p-2 transition-all duration-200"
          >
            <span className="text-white text-sm font-medium px-2">
              {loading ? '...' : 'Go'}
            </span>
          </button>
        </div>
      </form>
      
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {['London', 'New York', 'Tokyo', 'Sydney', 'Paris', 'Mumbai', 'Delhi', 'Bangalore'].map((suggestedCity) => (
          <button
            key={suggestedCity}
            onClick={() => !loading && onSearch(suggestedCity)}
            disabled={loading}
            className="px-3 py-1 bg-white/10 hover:bg-white/20 disabled:bg-white/5 disabled:cursor-not-allowed rounded-full text-white/80 text-sm transition-all duration-200"
          >
            {suggestedCity}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;