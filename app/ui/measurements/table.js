// import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
import { ViewMeasurement, DeleteMeasurement } from '@/app/ui/measurements/buttons'
// import InvoiceStatus from '@/app/ui/invoices/status';
// import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchMeasurements } from '@/app/lib/data';

export default async function MeasurementsTable({currentPage}) {
  const measurements = await fetchMeasurements(currentPage)
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* <p>{JSON.stringify(measurements[0])}</p> */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Дата и срок измерения
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Дата создания 
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
                {/* <th scope="col" className="relative py-3 pl-6 pr-3"> */}
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
                    {`${measurement.date.toISOString().slice(0,10)} ${measurement.term>9? measurement.term:('0'+measurement.term)}:00`}
                  </td>
                  
                  <td className="whitespace-nowrap px-3 py-3">
                    {measurement.created_at.toISOString().replace('T',' ').slice(0,19)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {measurement.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <p>{measurement.temperature}</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <p>{measurement.wind_direction}</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <p>{measurement.wind_speed}</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <p>{measurement.atmosphere_pressure}</p>
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