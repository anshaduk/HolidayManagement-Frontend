import { useState } from 'react';
import axios from 'axios';
import SearchForm from './components/SearchForm';
import HolidayList from './components/HolidayList';

function App() {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async ({ country, year, month }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://127.0.0.1:8000/holidays/', {
        params: { country, year, month },
      });
      setHolidays(response.data);
    } catch (err) {
      setError('Failed to fetch holidays. Please try again.');
      setHolidays([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Holiday Management
          </h1>

          <SearchForm onSearch={handleSearch} />

          {loading && (
            <div className="mt-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"></div>
            </div>
          )}

          {error && (
            <div className="mt-8 bg-red-50 p-4 rounded-md">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {!loading && !error && <HolidayList holidays={holidays} />}

          {!loading && !error && holidays.length === 0 && (
            <div className="mt-8 text-center text-gray-500">
              No holidays found. Try searching for a different country or year.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;