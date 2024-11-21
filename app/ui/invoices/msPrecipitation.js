import {fetchPrecipitation} from '@/app/lib/data'

export default async function PrecipitationMSTable({reportMonth,lastDay,monthName}) {
  let observations = await fetchPrecipitation(reportMonth)
  const stations = '34519,34524,34622,34721,34615,34712'
  let prec = new Array(6).fill(null)
  observations.forEach(o => {
    let i = stations.split(',').indexOf(o.station)
    let j = +o.meas_time.slice(8,10)
    if(i>=0){
      prec[i] = prec[i] || [i]
      o.syn_hour==="03:00"? prec[i][j*2-1]=o.value : prec[i][j*2]=o.value
    }
  });
  let body = []
  const mStations = ['Донецк','Дебальцево','Амвросиевка','Седово','Волноваха','Мариуполь']
  for (let i = 0; i < 6; i++) {
    let row = [<td key={i+100} className="whitespace-nowrap bg-white px-4 py-5 text-sm">{mStations[i]}</td>]
    let j = 1
    while (j < prec[i]?.length) {
      row.push(<td key={i} className="whitespace-nowrap bg-white px-2 py-5 text-sm">{prec[i][j]?prec[i][j]:''}/{prec[i][j+1]?prec[i][j+1]:''}</td>);
      j+=2
    }
    body.push(<tr key={i} className="group">{row}</tr>)
  }
  let header = []
  for(let i = 1; i <= lastDay; i++){
    header.push(<th key={i} scope="col" className="px-3 py-5 font-medium">{i}</th>)
  }
  // let monthName = d.toLocaleString('ru', { month: 'long' })
  return(
    <div>
      <h1>Осадки по данным метеостанций за {monthName} месяц {reportMonth.slice(0,4)} года</h1>
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
  )
}