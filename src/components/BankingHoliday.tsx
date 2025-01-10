import React from 'react';

interface Holiday {
  date: string;
  name: string;
  fullDate?: Date;
}

interface BankingHolidayProps {
  holiday: Holiday | null;
}

const BankingHoliday: React.FC<BankingHolidayProps> = ({ holiday }) => {
  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-2 text-gray-700">Next Banking Holiday in France</h2>
      {holiday ? (
        <p className="mb-4 text-gray-600">
          {holiday.name} - {holiday.fullDate?.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      ) : (
        <p className="mb-4 text-gray-600">No upcoming holidays found</p>
      )}
    </div>
  );
};

export default BankingHoliday;

