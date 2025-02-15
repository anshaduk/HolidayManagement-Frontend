import { useState } from 'react';
import { format } from 'date-fns';
import HolidayModal from './HolidayModal';

export default function HolidayList({ holidays }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHoliday, setSelectedHoliday] = useState(null);

  const filteredHolidays = holidays.filter((holiday) =>
    holiday.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="max-w-xl">
        <input
          type="text"
          placeholder="Search holidays..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredHolidays.map((holiday) => (
          <div
            key={holiday.name}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedHoliday(holiday)}
          >
            <h3 className="text-lg font-semibold text-gray-900">{holiday.name}</h3>
            <p className="text-sm text-gray-500">
              {format(new Date(holiday.date.iso), 'MMMM d, yyyy')}
            </p>
            <p className="text-sm text-gray-600 mt-2">{holiday.type.join(', ')}</p>
          </div>
        ))}
      </div>

      {selectedHoliday && (
        <HolidayModal
          holiday={selectedHoliday}
          onClose={() => setSelectedHoliday(null)}
        />
      )}
    </div>
  );
}