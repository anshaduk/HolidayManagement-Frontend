import { useState } from "react";
import { COUNTRIES } from "../utils/constants";

export default function SearchForm({ onSearch }) {
  const [country, setCountry] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ country, year, month });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-gray-900 bg-opacity-40 backdrop-blur-lg rounded-xl shadow-2xl border border-gray-600"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div>
          <label className="block text-sm font-semibold text-gray-50">
            Country
          </label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="mt-1 block w-full rounded-lg bg-gray-800 bg-opacity-60 text-gray-100 py-2 px-3 shadow-inner focus:ring-cyan-400 focus:border-cyan-400"
          >
            <option value="" disabled>
              Select Country
            </option>
            {Object.entries(COUNTRIES).map(([code, name]) => (
              <option
                key={code}
                value={code}
                className="bg-white text-black" 
              >
                {name}
              </option>
            ))}
          </select>
        </div>

        
        <div>
          <label className="block text-sm font-semibold text-gray-50">
            Year
          </label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            min="1900"
            max="2100"
            className="mt-1 block w-full rounded-lg bg-gray-800 bg-opacity-60 text-gray-100 py-2 px-3 shadow-inner focus:ring-cyan-400 focus:border-cyan-400"
          />
        </div>

        
        <div>
          <label className="block text-sm font-semibold text-gray-50">
            Month
          </label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="mt-1 block w-full rounded-lg bg-gray-800 bg-opacity-60 text-gray-100 py-2 px-3 shadow-inner focus:ring-cyan-400 focus:border-cyan-400"
          >
            <option value="">All Months</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option
                key={i + 1}
                value={i + 1}
                className="bg-white text-black" 
              >
                {new Date(2000, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
        </div>
      </div>

      
      <button
        type="submit"
        className="w-full md:w-auto inline-flex justify-center rounded-full border border-transparent bg-cyan-500 py-2 px-6 text-sm font-semibold text-white shadow-md hover:bg-cyan-600 transition-all duration-300"
      >
        Search Holidays
      </button>
    </form>
  );
}
