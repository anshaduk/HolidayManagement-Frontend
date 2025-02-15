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

 
  const indexOfLast = currentPage * holidaysPerPage;
  const indexOfFirst = indexOfLast - holidaysPerPage;
  const currentHolidays = filteredHolidays.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredHolidays.length / holidaysPerPage);

  return (
    <div className="space-y-6 mt-8">
      
      <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg p-6 rounded-2xl space-y-4">
        <input
          type="text"
          placeholder="Search by holiday name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 bg-transparent border border-white/30 rounded-lg 
                     text-white placeholder-gray-300 focus:ring-2 focus:ring-white focus:outline-none
                     drop-shadow-lg"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-white drop-shadow-md">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-3 bg-transparent border border-white/30 rounded-lg 
                         text-white focus:ring-2 focus:ring-white focus:outline-none
                         drop-shadow-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white drop-shadow-md">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-3 bg-transparent border border-white/30 rounded-lg 
                         text-white focus:ring-2 focus:ring-white focus:outline-none
                         drop-shadow-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white drop-shadow-md">Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full p-3 bg-transparent border border-white/30 rounded-lg 
                         text-white focus:ring-2 focus:ring-white focus:outline-none
                         drop-shadow-lg"
            >
              <option value="" className="text-black">All Types</option>
              {types.map(type => (
                <option key={type} value={type} className="text-black">
                  {type}
                </option>
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
        <div className="flex justify-center space-x-3 overflow-auto width-[90%]">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-md text-white font-semibold transition hover:scale-50 hover:rounded-md drop-shadow-lg ${
                currentPage === i + 1
                  ? 'bg-indigo-500 hover:bg-indigo-600'
                  : 'bg-gray-600 hover:bg-gray-700'
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
