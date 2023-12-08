import { startOfWeek, addDays, format } from 'date-fns'
import { fr } from 'date-fns/locale'
import Event from './Event';
import Lec from '../assets/lec-2019.avif'

const Planning = () => {
  const startOfWeekDate = startOfWeek(new Date(), {weekStartsOn: 1});
  const daysOfWeek = Array.from({ length: 7 }, (_, index) =>
    addDays(startOfWeekDate, index)
  );

  const Hour_array = (Array.from({ length: 11 }, (_, index) => index + 13))

  return (
    <div className='container-fluid flex flex-row'>
      <div className='flex flex-col bg-black pt-16'>
        {Hour_array.map((Hour, index) => (
          <span className='m-3 font-bold' key={index}>{Hour}</span>
        ))}
      </div>
      <table className="w-full text-sm text-left text-gray-400">
        <thead className="uppercase">
          <tr className="flex flex-row align-items justify-between">
            {daysOfWeek.map((day, index) => (
              <th key={index} scope="col" className="flex flex-col text-lg text-center w-full bg-black border">
                <span className='day'>{format(day, 'EEEE', { locale: fr })}</span>
                <span>{format(day, 'dd/MM')}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="flex flex-row align-items justify-between">
            {daysOfWeek.map((_, index) => (
              <th className='border-x w-full h-[75vh]' key={index}>
                {index === 1 && (<Event image={Lec} begin={14} duration={3} title={"Test"} />)}
              </th>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Planning