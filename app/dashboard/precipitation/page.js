import { lusitana } from '../../ui/fonts' //app/ui/fonts'
import Search from '../../ui/search' // app/ui/search'
import HpPercipitation from '../../ui/invoices/hp_percipitation' // app/ui/invoices/hp_percipitation'
import OtherPercipitation from '../../ui/invoices/other_percipitation'
// import connection from '@/app/mysql'

// export async function getServerSideProps() {
//   const [rows] = await connection.promise().query('SELECT * FROM laboratories');
//     return {
//       props: {
//         data: rows,
//       },
//     };
//  }
export const metadata = {
  title: `Осадки`,
}
export default async function Page({searchParams}) {
  // const [rows] = await connection.promise().query('SELECT * FROM laboratories');
  let today = new Date()
  let m = today.getMonth()+1
  const calcYear = searchParams?.reportDate?.slice(0,4) || today.getFullYear()
  const calcMonth = searchParams?.reportDate?.slice(5,7) || (m>9? m : '0'+m)
  let lastDay = 32 - new Date(calcYear, calcMonth-1, 32).getDate()
  const qParams = {
    stations: '34519,34524,34622,34721,34615,34712',
    notbefore: `${calcYear}-${calcMonth}-01T00:00:00`,
    notafter: `${calcYear}-${calcMonth}-${lastDay}T23:59:59`,
  }
  let data = await fetch(`http://localhost:3001/observations/observations?limit=0&sources=100&streams=0&hashes=870717212&min_quality=1&syn_hours=15:00,03:00&stations=${qParams.stations}&after=${qParams.notbefore}&before=${qParams.notafter}`)
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
    while (j < perc[i]?.length) {
      row.push(<td key={i} className="whitespace-nowrap bg-white px-2 py-5 text-sm">{perc[i][j]?perc[i][j]:''}/{perc[i][j+1]?perc[i][j+1]:''}</td>);
      j+=2
    }
    body.push(<tr key={i} className="group">{row}</tr>)
  }
  let header = []
  for(let i = 1; i <= lastDay; i++){
    header.push(<th key={i} scope="col" className="px-3 py-5 font-medium">{i}</th>)
  }
  return (
    <div className="w-full">
			<div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Осадки</h1>
      </div>
			
			<div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search />
      </div>
			<div>
        <h1>Осадки по данным метеостанций за {calcMonth} месяц {calcYear} года</h1>
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
      <HpPercipitation date1={qParams.notbefore} date2={qParams.notafter} />
      <OtherPercipitation year={calcYear} month={calcMonth} lastDay={lastDay}/>
    </div>
  )
}