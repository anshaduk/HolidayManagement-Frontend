import { useState } from 'react';
import HolidayCard from './HolidayCard';

export default function HolidayList({ holidays }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const holidaysPerPage = 10;

  
  const types = [...new Set(holidays.map(holiday => holiday.type))];

  
  const filteredHolidays = holidays.filter(holiday => {
    const matchesSearch = holiday.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = (
      (!startDate || new Date(holiday.date) >= new Date(startDate)) &&
      (!endDate || new Date(holiday.date) <= new Date(endDate))
    );
    const matchesType = !selectedType || holiday.type === selectedType;
    return matchesSearch && matchesDate && matchesType;
  });

  // Pagination
  const indexOfLast = currentPage * holidaysPerPage;
  const indexOfFirst = indexOfLast - holidaysPerPage;
  const currentHolidays = filteredHolidays.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredHolidays.length / holidaysPerPage);

  return (
    <div className="space-y-6 mt-8">
      
      <div className="bg-white p-4 rounded-lg shadow space-y-4">
        <input
          type="text"
          placeholder="Search by holiday name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-md"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="">All Types</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      
      <div className="space-y-4">
        {currentHolidays.map(holiday => (
          <HolidayCard key={holiday.id} holiday={holiday} />
        ))}
      </div>

      
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-md ${
                currentPage === i + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}