'use client';

import React from 'react';

const SaintOfTheDay: React.FC<{ saint: string }> = ({ saint }) => (
  <div className="text-center">
    <h2 className="text-xl font-semibold mb-2 text-gray-700">Saint of the Day</h2>
    <p className="mb-4 text-gray-600">{saint || 'Loading...'}</p>
  </div>
);

export default SaintOfTheDay;
