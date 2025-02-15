import { useState } from 'react';
import HolidayModal from './HolidayModal';

export default function HolidayCard({ holiday }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="p-4 bg-white rounded-lg shadow cursor-pointer hover:bg-gray-50"
        onClick={() => setIsOpen(true)}
      >
        <h3 className="text-lg font-semibold text-gray-900">{holiday.name}</h3>
        <p className="text-sm text-gray-500">{new Date(holiday.date).toDateString()}</p>
        <span className="inline-block mt-2 px-2 py-1 text-xs font-medium text-indigo-800 bg-indigo-100 rounded-full">
          {holiday.type}
        </span>
      </div>

      {isOpen && <HolidayModal holiday={holiday} onClose={() => setIsOpen(false)} />}
    </>
  );
}