import {fetchPrecipitationHP} from '@/app/lib/data'

export default async function HpPercipitation({date1, date2,monthName}){
// 83026 ГП с.Захаровка, р. Берда
// 83028 ГП Донецк, р.Кальмиус
// 83036 ГП Пгт Сартана, р. Кальмиус
// 83040 ГП Николаевка, р.Мокрая Волноваха
// 83045 ГП Кремневка, р.Кальчик
// 83048 ГП Мариуполь, р.Кальчик
// 83050 ГП Кременевка, р. Малый Кальчик
// 83060 ГП Дмитровка
  const posts = '83026,83028,83036,83040,83045,83048,83050,83060'
  let observations = await fetchPrecipitationHP(date1,date2) //await data.json()
  let perc = new Array(8).fill(null)
  observations.forEach(o => {
    let i = posts.split(',').indexOf(o.station)
    let j = +o.meas_time.slice(8,10)
    if(i>=0){
      perc[i] = perc[i] || [i]
      perc[i][j]=o.value
    }
  });
  let body = []
  const mStations = ['Захаровка','Донецк','Сартана','Николаевка','Кремневка, Кальчик','Мариуполь','Кременевка, М.Кальчик','Дмитровка']
  for (let i = 0; i < 8; i++) {
    let row = [<td key={i+100} className="whitespace-nowrap bg-white px-4 py-5 text-sm">{mStations[i]}</td>]
    let j = 1
    while (j < perc[i]?.length) {
      row.push(<td key={j} className="whitespace-nowrap bg-white px-2 py-5 text-sm">{perc[i][j]?perc[i][j]:''}</td>);
      j+=1
    }
    body.push(<tr key={i} className="group">{row}</tr>)
  }
  let header = []
  let lastDay = +date2.slice(8,10)
  for(let i = 1; i <= lastDay; i++){
    header.push(<th key={i} scope="col" className="px-3 py-5 font-medium">{i}</th>)
  }
  return <div>
		<h1>Осадки по данным гидропостов за {monthName} месяц {date1.slice(0,4)} года</h1>
		<table className="hidden min-w-full rounded-md text-gray-900 md:table">
      <thead className="rounded-md bg-gray-400 text-left text-sm font-normal">
				<tr key="00">
					<th key="00" scope="col" className="px-4 py-5 font-medium sm:pl-6">
						Гидропост
					</th>
					{header}
				</tr>
			</thead>
			<tbody className="divide-y divide-gray-200 text-gray-900">
				{body}
			</tbody>
		</table>
	</div>
}