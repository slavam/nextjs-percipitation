// import { useState } from 'react';
import { lusitana } from '@/app/ui/fonts'
import Search from '@/app/ui/search'
import HpPercipitation from '@/app/ui/invoices/hp_percipitation'

export const metadata = {
  title: 'Invoices',
}

export default async function Page({
  searchParams,
}) {
  const query = searchParams?.query || '';
//   const currentPage = Number(searchParams?.page) || 1
//   const totalPages = await fetchInvoicesPages(query)
const qParams = {
	stations: '34519,34524,34622,34721,34615,34712',
	notbefore: '2024-09-01T00:00:00',
	notafter: '2024-09-30T00:00:00',
}
let data = await fetch(`http://localhost:3001/observations/observations?limit=0&sources=100&streams=0&hashes=870717212&min_quality=1&syn_hours=15:00,03:00&stations=${qParams.stations}&after=${qParams.notbefore}`)
let observations = await data.json()
let perc = new Array(6).fill(null)
observations.forEach(o => {
	let i = qParams.stations.split(',').indexOf(o.station)
	let j = +o.meas_time.slice(8,10)
	if(i>=0){
		perc[i] = perc[i] || [i]
		o.syn_hour==="03:00"? perc[i][j*2-1]=o.value : perc[i][j*2]=o.value
	}
});
let body = []
const mStations = ['Донецк','Дебальцево','Амвросиевка','Седово','Волноваха','Мариуполь']
for (let i = 0; i < 6; i++) {
	let row = [<td key={i+100} className="whitespace-nowrap bg-white px-4 py-5 text-sm">{mStations[i]}</td>]
	let j = 1
	while (j < perc[i].length) {
		row.push(<td key={i} className="whitespace-nowrap bg-white px-2 py-5 text-sm">{perc[i][j]?perc[i][j]:''}/{perc[i][j+1]?perc[i][j+1]:''}</td>);
		j+=2
	}
	body.push(<tr key={i} className="group">{row}</tr>)
}
let today = new Date()
// const [currYear, setCurrYear] = useState(today.getUTCFullYear())
let currYear = today.getFullYear()
let currMonth = 9 //today.getMonth()
let lastDay = 32 - new Date(currYear, currMonth-1, 32).getDate()
let header = []
for(let i = 1; i <= lastDay; i++){
	header.push(<th key={i} scope="col" className="px-3 py-5 font-medium">{i}</th>)
}
	const yearChanged = (e)=>{
		currYear = e.target.value
	}
  return (
    <div className="w-full">
			<div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Осадки</h1>
      </div>
			
			<div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        {/* <CreateInvoice /> */}
      </div>
			<div>
        <h1>Осадки по данным метеостанций за {currMonth} месяц {currYear} года</h1>
        <table className="hidden min-w-full rounded-md text-gray-900 md:table">
          <thead className="rounded-md bg-gray-400 text-left text-sm font-normal">
            <tr key="0">
              <th key="0" scope="col" className="px-4 py-5 font-medium sm:pl-6">
                Метеостанция
              </th>
              {header}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-900">
            {body}
          </tbody>
        </table>
			</div>
      <HpPercipitation year={currYear} month={currMonth} />
    </div>
  )
}