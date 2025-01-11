import React from 'react';
import { Holiday } from '../App';

interface BankingHolidayProps {
  holiday: Holiday | null;
}

const BankingHoliday: React.FC<BankingHolidayProps> = ({ holiday }) => (
  <div className="text-center">
    <h2 className="text-xl font-semibold mb-2 text-gray-700">Prochain jour férié</h2>
    {holiday ? (
      <p className="mb-4 text-gray-600">
        {holiday.name} -{' '}
        {holiday.fullDate?.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
      </p>
    ) : (
      <p className="mb-4 text-gray-600">No upcoming holidays found</p>
    )}
  </div>
);

export default BankingHoliday;
