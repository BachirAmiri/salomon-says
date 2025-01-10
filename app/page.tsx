import { promises as fs } from 'fs'
import path from 'path'
import SalomonSays from '../components/SalomonSays'
import SaintOfTheDay from '../components/SaintOfTheDay'
import BankingHoliday from '../components/BankingHoliday'

async function getData() {
  const saintsFile = path.join(process.cwd(), 'data/saints.json')
  const holidaysFile = path.join(process.cwd(), 'data/holidays.json')

  const [saintsData, holidaysData] = await Promise.all([
    fs.readFile(saintsFile, 'utf8'),
    fs.readFile(holidaysFile, 'utf8')
  ])

  const { saints } = JSON.parse(saintsData)
  const { holidays } = JSON.parse(holidaysData)

  const today = new Date()
  const currentDate = `${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`
  
  const saint = saints.find(s => s.date === currentDate)?.name || "Unknown Saint"

  const currentYear = today.getFullYear()
  const nextHoliday = holidays
    .map(h => {
      const [month, day] = h.date.split('-')
      return {
        ...h,
        date: new Date(currentYear, parseInt(month) - 1, parseInt(day))
      }
    })
    .find(holiday => holiday.date >= today)

  // If no holiday found this year, check next year
  if (!nextHoliday) {
    const nextYearHoliday = holidays
      .map(h => {
        const [month, day] = h.date.split('-')
        return {
          ...h,
          date: new Date(currentYear + 1, parseInt(month) - 1, parseInt(day))
        }
      })[0]  // Get the first holiday of next year
    return { saint, nextHoliday: nextYearHoliday }
  }

  return { saint, nextHoliday }
}

export default async function Home() {
  const { saint, nextHoliday } = await getData()

  return (
    <main className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
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
    </main>
  )
}

