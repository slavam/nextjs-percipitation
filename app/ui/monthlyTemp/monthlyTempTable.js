import { fetchMonthlyTemperatures } from '@/app/lib/data'

export default async function MonthlyTempTable({reportMonth}) {
  let observations = await fetchMonthlyTemperatures(reportMonth)
  let hdr = []
  let m = []
  if(observations.length>0){
    const absoluteZero = 273.15
    let lastDay = 32 - new Date(+reportMonth.slice(0,4), +(reportMonth.slice(5,7))-1, 32).getDate()
    const codes = [34519,34524,34622,34721,34615,34712]
    const stations = ['Донецк','Дебальцево','Амвросиевка','Седово','Волноваха','Мариуполь']
    let row = new Array(codes.length)
    let ids = new Array(codes.length)
    let avg = new Array(codes.length)
    
    
    const points='0,10800,21600,32400,43200,54000,64800,75600'
    observations.forEach(e => {
      let i = codes.indexOf(+e.station)
      let t = points.split(',').indexOf(''+e.point)
      let d = new Date(e.moment*1000)
      let day = d.getUTCDate()
      row[i] ||= new Array(lastDay)
      ids[i] ||= new Array(lastDay)
      row[i][day] ||= new Array(8).fill(null)
      ids[i][day] ||= new Array(8).fill(null)
      if(row[i][day][t]===null){
        ids[i][day][t]= +e.created_at
        row[i][day][t] = (+e.value-absoluteZero)
      }else if((row[i][day][t]!==(+e.value-absoluteZero)) && (e.created_at > (ids[i][day][t]))){
        ids[i][day][t]= +e.created_at
        if(e.meas_hash===795976906) 
          row[i][day][t] = (+e.value-absoluteZero)
        else
          row[i][day][t] = (+e.value-absoluteZero)
      }
    });

    for(let i=0; i<codes.length; i++){
      avg[i] ||= new Array(lastDay+1)
      avg[i][0] = codes[i]
      for(let j=1; j<=lastDay; j++){
        if(row[i] && row[i][j]){
          let sum =row[i][j].reduce((accumulator, currentValue) => accumulator + currentValue,0)
          let numNotNull = (row[i][j].filter(n => n)).length
          avg[i][j] = (sum/numNotNull).toFixed(1)
        }
      }
    }
    hdr = [<th key='0' scope="col" className="px-3 py-5 font-medium">Метеостанции</th>]
    for(let d=1; d<=lastDay; d++){
      hdr.push(<th key={d} scope="col" className="px-3 py-5 font-medium">{d}</th>)
    }
    for(let i=0; i<codes.length; i++){
      let tds = [<td key='0'className="whitespace-nowrap bg-white px-4 py-5 text-sm"><b>{stations[i]}</b></td>]
      for(let j=1; j<=lastDay; j++){
        tds.push(<td key={j} className="whitespace-nowrap bg-white px-4 py-5 text-sm">{avg[i][j]}</td>)
      }
      m.push(<tr key={i}>{tds}</tr>)
    }
  }
  return (
    <div className="w-full">
        <table className="hidden min-w-full rounded-md text-gray-900 md:table">
          <thead className="rounded-md bg-gray-400 text-left text-sm font-normal">
            <tr key="00">{hdr}</tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-900">
            {m}
          </tbody>
        </table>
    </div>
  )
}