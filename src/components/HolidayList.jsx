import { useState } from 'react';

export default function HolidayList({ holidays }) {
  const [selectedHoliday, setSelectedHoliday] = useState(null); // State for selected holiday modal
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [currentPage, setCurrentPage] = useState(1); // State for pagination
  const holidaysPerPage = 10; // Number of holidays per page

  // Filter holidays by name based on search term
  const filteredHolidays = holidays.filter((holiday) =>
    holiday.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastHoliday = currentPage * holidaysPerPage;
  const indexOfFirstHoliday = indexOfLastHoliday - holidaysPerPage;
  const currentHolidays = filteredHolidays.slice(indexOfFirstHoliday, indexOfLastHoliday);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="space-y-4">
      {/* Search bar for filtering holidays by name */}
      <input
        type="text"
        placeholder="Search holidays by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* Display filtered holidays */}
      {currentHolidays.map((holiday) => (
        <div
          key={holiday.id}
          className="p-4 bg-white rounded-lg shadow cursor-pointer hover:bg-gray-50"
          onClick={() => setSelectedHoliday(holiday)}
        >
          <h3 className="text-lg font-semibold text-gray-900">{holiday.name}</h3>
          <p className="text-sm text-gray-500">{holiday.date}</p>
        </div>
      ))}

      {/* Pagination buttons */}
      <div className="flex justify-center space-x-2">
        {Array.from({ length: Math.ceil(filteredHolidays.length / holidaysPerPage) }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={`px-4 py-2 rounded-md ${
              currentPage === i + 1
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Modal for holiday details */}
      {selectedHoliday && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {selectedHoliday.name}
            </h2>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Date:</strong> {selectedHoliday.date}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Type:</strong> {selectedHoliday.type}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Description:</strong> {selectedHoliday.description}
            </p>
            <button
              onClick={() => setSelectedHoliday(null)}
              className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}