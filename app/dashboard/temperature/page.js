import Search from '@/app/ui/search'   

const absoluteZero = 273.15
export const metadata = {
  title: 'Средняя температура за сутки',
  }
export default async function Page({searchParams}) {
  const reportDate = searchParams?.reportDate || new Date().toISOString().slice(0,10)
  let reportDateSec = Math.round(new Date(reportDate).getTime()/1000)
  const points='0,10800,21600,32400,43200,54000,64800,75600'
  let data = await fetch(`http://10.54.1.30:8640/get?quality=1&sources=100,10202&hashes=795976906,1451382247&points=${points}&stations=34519,34524,34622,34721,34615,34712&notbefore=${reportDateSec}&notafter=${reportDateSec+22*60*60}`)
  let observations = await data.json()
  const codeStations = [null,34519,34524,34622,34721,34615,34712]
  const starts = [0,3,6,9,12,15,18,21]
  const startTerms = [
        {label:'00', value:0},
        {label:'03', value:1},
        {label:'06', value:2},
        {label:'09', value:3},
        {label:'12', value:4},
        {label:'15', value:5},
        {label:'18', value:6},
        {label:'21', value:7},
      ]
  let shiftTerms = starts //starts.slice(startTerm.value).concat(starts.slice(0,startTerm.value))
    let row0 = ['Срок'].concat(shiftTerms).concat(['Средняя','N'])
    let i,j
    let temps = [row0,
                 ['Донецк',null,null,null,null,null,null,null,null,0,0,0],
                 ['Дебальцево',null,null,null,null,null,null,null,null,0,0,0],
                 ['Амвросиевка',null,null,null,null,null,null,null,null,0,0,0],
                 ['Седово',null,null,null,null,null,null,null,null,0,0,0],
                 ['Волноваха',null,null,null,null,null,null,null,null,0,0,0],
                 ['Мариуполь',null,null,null,null,null,null,null,null,0,0,0]]
    observations.map((o) => {
      i = codeStations.indexOf(o.station)
      j = shiftTerms.indexOf(o.point/3600)+1
      let tempC = Number.parseFloat(+o.value-absoluteZero).toFixed(1)
      if(temps[i][j]===null){
        if(+o.meas_hash===795976906){
          temps[i][j] = +tempC
          temps[i][9]+= +tempC
          temps[i][10]+=1
        }else if(+o.station===34622){
          temps[i][j] = +tempC
          temps[i][9]+= +tempC
          temps[i][10]+=1
        }
      }
    })
    const createTr = (i) => {
      if(temps[i][10]>0)temps[i][9] = +((temps[i][9]/temps[i][10]).toFixed(2))
      let row = []
      let st 
      for(let j=0; j<starts.length+3; j++){
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
          <tr>{liveHead}</tr>
        </thead>
        {myBody}
      </table>
    </div>
  return (
    <div className="w-full">
      <h2>Отчетная дата</h2>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search />
      </div>
      <div className="mt-6 flow-root">
        <h1>Температура воздуха (°С) {reportDate} в сроки наблюдений, начиная со срока 00 по данным метеорологических станций</h1>
        <div className="bg-gray-50 p-2 md:pt-0">
          {content}
        </div>
      </div>
    </div>
  )
}
