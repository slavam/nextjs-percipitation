export default async function HpPercipitation({year, month}){
  return <div>
		<h1>Осадки по данным гидропостов за {month} месяц {year} года</h1>
		<table className="hidden min-w-full rounded-md text-gray-900 md:table">
			<thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
				<tr key="00">
					<th key="00" scope="col" className="px-4 py-5 font-medium sm:pl-6">
						Гидропост
					</th>
					{/* {header} */}
				</tr>
			</thead>
			<tbody className="divide-y divide-gray-200 text-gray-900">
				{/* {body} */}
			</tbody>
		</table>
	</div>
}