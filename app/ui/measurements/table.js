import { ViewMeasurement, DeleteMeasurement } from '@/app/ui/measurements/buttons'
import { fetchMeasurements } from '@/app/lib/data';

export default async function MeasurementsTable({currentPage}) {
  const measurements = await fetchMeasurements(currentPage)
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Дата и срок измерения (местное время)
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Дата создания (UTC)
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Пост
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Температура
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Направление ветра
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Скорость ветра
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Давление
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Просмотр
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Удалить
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {measurements?.map((measurement) => (
                <tr
                  key={measurement.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    {`${measurement.date.toLocaleDateString('ru')} ${measurement.term>9? measurement.term:('0'+measurement.term)}:00`}
                  </td>
                  
                  <td className="whitespace-nowrap px-3 py-3">
                    {measurement.created_at.toLocaleString('ru')}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {measurement.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {measurement.temperature}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {measurement.wind_direction*10}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {measurement.wind_speed}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {measurement.atmosphere_pressure}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <ViewMeasurement id={measurement.id} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <DeleteMeasurement id={measurement.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}