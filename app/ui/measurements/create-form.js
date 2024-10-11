'use client'

import { useState } from 'react';
import Link from 'next/link';
import { useFormStatus } from "react-dom"
let values = {}
export default function Form({ weather, materials, postId, date, term }) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const { pending } = useFormStatus()
  
  const handleValueChange = e=>{
    values[+e.target.id]=e.target.value
  }
  
  let ths = [<th key='1001'></th>];
  let tds = [<td key='1002'><b>Значение</b></td>];
  materials.map( m => {
    ths.push(<th key={m.id} scope="col" className="px-4 py-5 font-medium sm:pl-6">{m.name}</th>);
    tds.push(<td key={m.id}>
      <input type="number" id={m.id} value={values[+m.id]} pattern="[0-9]+([,\.][0-9]+)?" onChange={handleValueChange} name={m.id} min="0.0" step="0.001"/>
    </td>);
  })
  async function onSubmit(event) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)
    let measurement = {}
    measurement.date = date
    measurement.term = term
    measurement.post_id = postId
    measurement.wind_direction = +weather.windDirection/10
    measurement.wind_speed = weather.windSpeed
    measurement.temperature = weather.temperature
    measurement.atmosphere_pressure = weather.pressure
    try {   
      const response = await fetch('http://localhost:3002/measurements/create_or_update.json', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({measurement, values}),
      })
      if (!response.ok) {
        alert(JSON.stringify('Error'))
        throw new Error('Failed to submit the data. Please try again.')
      }
      const data = await response.json()
      values = {}
      alert(JSON.stringify(data.error))
    } catch (error) {
      setError(error.message)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="rounded-md bg-gray-500 p-4 md:p-6  text-gray-800">
        <table className="hidden min-w-full text-gray-900 md:table">
          <thead className="rounded-lg text-left text-sm font-normal">
            <tr>
              {ths}
            </tr>
          </thead>
          <tbody>
            <tr className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
              {tds}
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/precipitation"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >Отменить</Link>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Сохранение...' : 'Создать'}
        </button>
      </div>
    </form>
  );
}
