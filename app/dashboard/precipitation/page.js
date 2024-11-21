import { lusitana } from '@/app/ui/fonts' //app/ui/fonts'
import HpPercipitation from '@/app/ui/invoices/hp_percipitation' // app/ui/invoices/hp_percipitation'
import OtherPercipitation from '../../ui/invoices/other_percipitation'
import ReportMonth from '@/app/ui/reportMonth'
import PrecipitationMSTable from '@/app/ui/invoices/msPrecipitation'
import { Suspense } from 'react'

export const metadata = {
  title: `Осадки`,
}
export default async function Page({searchParams}) {
  const reportMonth = searchParams?.reportMonth || new Date().toISOString().slice(0,7)
  let lastDay = 32 - new Date(+reportMonth.slice(0,4), +(reportMonth.slice(5,7))-1, 32).getDate()
  let date1 = reportMonth+'-01'
  let d = new Date(date1)
  let monthName = d.toLocaleString('ru', { month: 'long' })
  const notbefore = `${reportMonth}-01T00:00:00`
  const notafter = `${reportMonth}-${lastDay}T23:59:59`
  return (
    <div className="w-full">
			<div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Осадки</h1>
      </div>
			<div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <ReportMonth />
      </div>
      <Suspense key={reportMonth} fallback={<div>Loading...</div>}>
        <PrecipitationMSTable reportMonth={reportMonth} lastDay={lastDay} monthName={monthName}/>
        <HpPercipitation date1={notbefore} date2={notafter} monthName={monthName}/>
        <OtherPercipitation year={reportMonth.slice(0,4)} month={reportMonth.slice(5,7)} lastDay={lastDay} monthName={monthName}/>
      </Suspense>
    </div>
  )
}