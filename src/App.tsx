import React, { useState, useEffect } from 'react';
import SalomonSays from './components/SalomonSays';
import SaintOfTheDay from './components/SaintOfTheDay';
import BankingHoliday from './components/BankingHoliday';
import saintsData from './data/saints.json';
import holidaysData from './data/holidays.json';
import './App.css';

interface Holiday {
  date: string;
  name: string;
}

function App() {
  const [saint, setSaint] = useState<string>('');
  const [nextHoliday, setNextHoliday] = useState<Holiday | null>(null);

  useEffect(() => {
    const today = new Date();
    const currentDate = `${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
    
    const todaySaint = saintsData.saints.find(s => s.date === currentDate)?.name || "Unknown Saint";
    setSaint(todaySaint);

    const currentYear = today.getFullYear();
    const upcomingHoliday = holidaysData.holidays
      .map(h => {
        const [month, day] = h.date.split('-');
        return {
          ...h,
          fullDate: new Date(currentYear, parseInt(month) - 1, parseInt(day))
        };
      })
      .find(holiday => holiday.fullDate >= today);

    if (upcomingHoliday) {
      setNextHoliday(upcomingHoliday);
    } else {
      // If no holiday found this year, get the first holiday of next year
      const nextYearHoliday = holidaysData.holidays[0];
      const [month, day] = nextYearHoliday.date.split('-');
      setNextHoliday({
        ...nextYearHoliday,
        fullDate: new Date(currentYear + 1, parseInt(month) - 1, parseInt(day))
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Salomon Says</h1>
          <SalomonSays saint={saint} holiday={nextHoliday} />
          <div className="mt-8 space-y-6">
            <SaintOfTheDay saint={saint} />
            <BankingHoliday holiday={nextHoliday} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

