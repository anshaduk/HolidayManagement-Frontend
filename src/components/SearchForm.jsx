import { useState } from 'react';
import { COUNTRIES } from '../utils/constants';

export default function SearchForm({ onSearch }) {
  const [country, setCountry] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ country, year, month });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Country</label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="" disabled>Select Country</option>
            {Object.entries(COUNTRIES).map(([code, name]) => (
              <option key={code} value={code}>{name}</option>

            ))}
          </select>
        </div>

        
        <div>
          <label className="block text-sm font-medium text-gray-700">Year</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            min="1900"
            max="2100"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        
        <div>
          <label className="block text-sm font-medium text-gray-700">Month</label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">All Months</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(2000, i).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full md:w-auto inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
      >
        Search Holidays
      </button>
    </form>
  );
}