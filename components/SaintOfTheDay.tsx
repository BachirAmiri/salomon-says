import React from 'react'

interface SaintOfTheDayProps {
  saint: string;
}

const SaintOfTheDay: React.FC<SaintOfTheDayProps> = ({ saint }) => {
  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-2 text-gray-700">Saint of the Day</h2>
      <p className="mb-4 text-gray-600">{saint}</p>
    </div>
  )
}

export default SaintOfTheDay

