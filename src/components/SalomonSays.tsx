import React from 'react';

interface Holiday {
  date: string;
  name: string;
  fullDate?: Date;
}

interface SalomonSaysProps {
  saint: string;
  holiday: Holiday | null;
}

const SalomonSays: React.FC<SalomonSaysProps> = ({ saint, holiday }) => {
  let message = "Greetings! I am Salomon. I know about saints and holidays!";

  if (saint && holiday) {
    message = `Today we celebrate ${saint}. The next banking holiday is ${holiday.name} on ${holiday.fullDate?.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.`;
  } else if (saint) {
    message = `Today we celebrate ${saint}. May your day be blessed!`;
  } else if (holiday) {
    message = `The next banking holiday is ${holiday.name} on ${holiday.fullDate?.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}. Mark your calendar!`;
  }

  return (
    <div className="text-center">
      <pre className="text-xs sm:text-sm md:text-base lg:text-lg font-mono text-gray-700 whitespace-pre-wrap">
        {`
         ,---.
        (     )
         )   (
        /     \\
       /       \\
      /  ^   ^  \\
     |  (o) (o)  |
      \\  < ^ >  /
       \\       /
        \\     /
         \\___/
        `}
      </pre>
      <div className="mt-4 p-4 bg-gray-200 rounded-lg">
        <p className="text-gray-800">{message}</p>
      </div>
    </div>
  );
};

export default SalomonSays;

