import { useState } from 'react';
import HolidayModal from './HolidayModal';

export default function HolidayCard({ holiday }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="p-4 bg-white bg-opacity-40 backdrop-blur-lg rounded-lg shadow-lg 
                   cursor-pointer transition-all hover:bg-opacity-50 hover:shadow-xl 
                   transform hover:scale-105 border border-white/30"
        onClick={() => setIsOpen(true)}
      >
        <h3 className="text-lg font-bold text-gray-900 drop-shadow-md">{holiday.name}</h3>
        <p className="text-sm text-gray-700 drop-shadow-sm">
          {new Date(holiday.date).toDateString()}
        </p>
        <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold 
                        text-indigo-900 bg-indigo-200 bg-opacity-60 rounded-full drop-shadow-md">
          {holiday.type}
        </span>
      </div>

      {isOpen && <HolidayModal holiday={holiday} onClose={() => setIsOpen(false)} />}
    </>
  );
}
