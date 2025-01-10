'use client';


import React, { useEffect, useState } from 'react';
import SaintOfTheDay from './components/SaintOfTheDay';
import BankingHoliday from './components/BankingHoliday';
import SalomonSays from './components/SalomonSays';

interface Saint {
  date: string;
  name: string;
}

interface Holiday {
  date: string;
  name: string;
  fullDate?: Date;
}

const App: React.FC = () => {
  const [saint, setSaint] = useState<string>('');
  const [nextHoliday, setNextHoliday] = useState<Holiday | null>(null);

  const basePath = process.env.NODE_ENV === 'production' ? '/salomon-says' : '';


  useEffect(() => {
    const fetchData = async () => {
      try {
        const saintsResponse = await fetch(`${basePath}/data/saints.json`);
        const saintsData = await saintsResponse.json();

        const holidaysResponse = await fetch(`${basePath}/data/holidays.json`);
        const holidaysData = await holidaysResponse.json();

        const today = new Date();
        const currentDate = `${(today.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

        const todaySaint = saintsData.saints.find(
          (s: Saint) => s.date === currentDate
        )?.name || 'Unknown Saint';
        setSaint(todaySaint);

        const currentYear = today.getFullYear();
        const upcomingHoliday = holidaysData.holidays
          .map((h: Holiday) => {
            const [month, day] = h.date.split('-');
            return {
              ...h,
              fullDate: new Date(currentYear, parseInt(month) - 1, parseInt(day)),
            };
          })
          .find((holiday) => holiday.fullDate && holiday.fullDate >= today);

        if (upcomingHoliday) {
          setNextHoliday(upcomingHoliday);
        } else {
          const nextYearHoliday = holidaysData.holidays[0];
          const [month, day] = nextYearHoliday.date.split('-');
          setNextHoliday({
            ...nextYearHoliday,
            fullDate: new Date(currentYear + 1, parseInt(month) - 1, parseInt(day)),
          });
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#19181A' }}>
      <div className="max-w-md rounded-lg p-4" style={{ backgroundColor: '#ECECEC' }}>
        <SalomonSays />
        <SaintOfTheDay saint={saint} />
        <BankingHoliday holiday={nextHoliday} />
      </div>
    </div>
  );
};

export default App;
