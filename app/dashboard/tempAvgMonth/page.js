import { lusitana } from '@/app/ui/fonts';
import ReportMonth from '@/app/ui/reportMonth';
import { Suspense } from 'react';
import MonthlyTempTable from '@/app/ui/monthlyTemp/monthlyTempTable'
 
export default async function Page({searchParams}) {
  const reportMonth = searchParams?.reportMonth || new Date().toISOString().slice(0,7)
  let date1 = reportMonth+'-01'
  let d = new Date(date1)
  let monthName = d.toLocaleString('ru', { month: 'long' })
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Среднесуточная температура за месяц</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <ReportMonth />
      </div>
      <h2>Средняя за сутки (00:01-24:00) температура воздуха (°С) за {monthName} месяц {reportMonth.slice(0,4)} года на метеостанциях ДНР</h2>
      <Suspense key={reportMonth} fallback={<div>Loading...</div>}>
        <MonthlyTempTable reportMonth={reportMonth}/>
      </Suspense>
    </div>
  )
}