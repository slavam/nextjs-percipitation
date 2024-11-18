// 'use client'
import { fetchDailyTemperatures } from '@/app/lib/data'

export default async function DailyTempTable({reportDate}) {
  let observations = await fetchDailyTemperatures(reportDate)
  const codeStations = [null,34519,34524,34622,34721,34615,34712]
  let i,j
  let row0 = [0,3,6,9,12,15,18,21]
  let temps = [row0,
    ['Донецк',null,null,null,null,null,null,null,null,0,0,0],
    ['Дебальцево',null,null,null,null,null,null,null,null,0,0,0],
    ['Амвросиевка',null,null,null,null,null,null,null,null,0,0,0],
    ['Седово',null,null,null,null,null,null,null,null,0,0,0],
    ['Волноваха',null,null,null,null,null,null,null,null,0,0,0],
    ['Мариуполь',null,null,null,null,null,null,null,null,0,0,0]]
  const absoluteZero = 273.15
  observations.map(o=> {
    i = codeStations.indexOf(o.station)
    j = o.point/3600/3+1
    let tempC = Number.parseFloat(+o.value-absoluteZero).toFixed(1)
    if(temps[i][j]===null){
      if(+o.meas_hash===795976906){
        temps[i][j] = +tempC
        temps[i][9]+= +tempC
        temps[i][10]+=1
        temps[i][11] = +o.id
      }else{
        temps[i][j] = +tempC
        temps[i][9]+= +tempC
        temps[i][10]+=1
        temps[i][11] = +o.id
      }
    }else if(+o.meas_hash===795976906){
      if(((+o.value-absoluteZero)!== +temps[i][j])&&(+o.id>temps[i][11])){
        temps[i][11] = +o.id
        temps[i][9] = +temps[i][9]-(+temps[i][j])+(+tempC)
        temps[i][j] = +tempC
      }
    }else
      if(((+o.value-absoluteZero)!== +temps[i][j])&&(+o.id>temps[i][11])){
        temps[i][11] = +o.id
        temps[i][9] = +temps[i][9]-(+temps[i][j])+(+tempC)
        temps[i][j] = +tempC
      }
  })
  const createTr = (i) => {
    if(temps[i][10]>0)temps[i][9] = +((temps[i][9]/temps[i][10]).toFixed(2))
    let row = []
    let st 
    for(let j=0; j<11; j++){
      st = j === 9? (<b>{temps[i][j]}</b>) : temps[i][j]
      row.push(<td key={j}>{st}</td>)
    }
    return <tr key={i}>{row}</tr>
  }
  const createBody = ()=>{
    let body=[]
    for(let i=1; i<codeStations.length; i++){
      body.push(createTr(i))
    }
    return <tbody>{body}</tbody>
  }
  let myBody = createBody()
  let liveHead = row0.map((th)=> <th key={th}>{th}</th>)
  let content = <div >
    <table className="hidden min-w-full text-gray-900 md:table">
      <thead className="rounded-md bg-gray-400 text-left text-sm font-normal">
        <tr><th rowSpan='2'>Метеостанции</th><th colSpan={8} align='center'>Сроки</th><th rowSpan='2'>Средняя</th><th rowSpan='2'>N</th></tr>
        <tr>{liveHead}</tr>
      </thead>
      {myBody}
    </table>
  </div>
  return(
    <div >
        <h1>Температура воздуха (°С) {reportDate} в сроки наблюдений по данным метеорологических станций</h1>
        <div className="bg-gray-50 md:pt-0">
          {content}
        </div>
    </div>
  )
}