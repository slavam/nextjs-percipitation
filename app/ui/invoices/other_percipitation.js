export default async function OtherPercipitation({year, month, lastDay}){
  let data = await fetch(`http://10.54.1.6:8080/other_observations/monthly_precipitation?format=json&month=${month}&year=${year}`)
  // let data = await fetch(`http://localhost:3002/other_observations/monthly_precipitation?format=json&month=${month}&year=${year}`)
  let observations = await data.json()
  observations = observations.precipitation
  let body = []
  // const mStations = ['Авдотьино','Кировский','Макеевка','Старобешево','Тельманово']
  const mStations = ['Авдотьино','Кировский','Макеевка','Старобешево','Тельманово','Раздольное','Стрюково','Дмитровка','Новоселовка','Благодатное','Алексеево-Орловка']
  for (let j = 0; j < mStations.length; j++) {
    let row = [<td key={j} className="whitespace-nowrap bg-white px-4 py-5 text-sm">{mStations[j]}</td>]
    for (let i = 1; i <= lastDay; i++) {
      let val = (observations[i] && observations[i][j])? `${observations[i][j][0]===null?'':observations[i][j][0]}/${observations[i][j][1]===null?'':observations[i][j][1]}`:''
      row.push(<td key={i} className="whitespace-nowrap bg-white px-2 py-5 text-sm">{val}</td>)
    }
    body.push(<tr key={j}  className="group">{row}</tr>)
  }
  
  let header = []
  for(let i = 1; i <= lastDay; i++){
    header.push(<th key={i} scope="col" className="px-3 py-5 font-medium">{i}</th>)
  }
  return <div>
    <h1>Осадки по данным прочих источников за {month} месяц {year} года</h1>
		<table className="hidden min-w-full rounded-md text-gray-900 md:table">
      <thead className="rounded-md bg-gray-400 text-left text-sm font-normal">
				<tr key="00">
					<th key="00" scope="col" className="px-4 py-5 font-medium sm:pl-6">
						Источник
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