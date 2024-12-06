import {fetchDailyTemperatureStartingFrom} from '@/app/lib/data'

export default async function DailyTempStartingFromTable({reportDate,startTerm}) {
  let observations = await fetchDailyTemperatureStartingFrom(reportDate,startTerm)
  const stationsId = [null,1,3,2,10,4,5]
  const terms = [0,3,6,9,12,15,18,21]
  const start = +startTerm
  for (let i = 0; i < 8; i++) {
    terms[i] = i*3+start>=24? i*3+start-24:i*3+start
  }
  let temps = [
    ['Stations',0,3,6,9,12,15,18,21,0,0,0],
    ['Донецк',null,null,null,null,null,null,null,null,0,0,0],
    ['Дебальцево',null,null,null,null,null,null,null,null,0,0,0],
    ['Амвросиевка',null,null,null,null,null,null,null,null,0,0,0],
    ['Седово',null,null,null,null,null,null,null,null,0,0,0],
    ['Волноваха',null,null,null,null,null,null,null,null,0,0,0],
    ['Мариуполь',null,null,null,null,null,null,null,null,0,0,0]]
  observations.map(o=> {
    let i = stationsId.indexOf(o.station_id)
    let j = terms.indexOf(+o.term)+1
    temps[i][j] = o.temperature
    temps[i][9]+= +o.temperature
    temps[i][10]+=1
  })
  // console.log(temps[1])
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
    for(let i=1; i<7; i++){
      body.push(createTr(i))
    }
    return <tbody>{body}</tbody>
  }
  let myBody = createBody()
  let liveHead = [] 
  let day = reportDate.slice(8,10)
  for (let i = 0; i < 8; i++) {
    if(terms[0]!==0){
      if(terms[i]<terms[0])
        day = new Date(new Date(reportDate).getTime()+24*3600*1000).toISOString().slice(8,10)
    }
    liveHead[i] = <th key={i}>{terms[i]}/{day}</th>
  }
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
    <div>
      {/* <p>{JSON.stringify(observations)}</p> */}
      <h1>Температура воздуха (°С) {reportDate} в сроки наблюдений. начиная со срока {startTerm}, по данным метеорологических станций</h1>
        <div className="bg-gray-50 md:pt-0">
          {content}
        </div>
    </div>
  )
}