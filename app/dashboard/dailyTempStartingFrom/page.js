import Search from '@/app/ui/search'
import SelectTerm from '@/app/ui/selectTerm'
import { lusitana } from '@/app/ui/fonts'
import DailyTempStartingFromTable from '@/app/ui/dailyTempStartingFrom/dailyTempStartingFromTable'
import { Suspense } from 'react'

export const metadata = {
  title: 'Средняя температура за сутки, начиная с',
}
export default async function Page({searchParams}) {
  const reportDate = searchParams?.reportDate || new Date().toISOString().slice(0,10)
  const startTerm = searchParams?.startTerm || 0
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Среднесуточная температура</h1>
      </div>
      <h2>Отчетная дата</h2>
      <Search />
      <SelectTerm reportDate={reportDate}/>
      <Suspense key={reportDate} fallback={<div>Loading...</div>}>
        <DailyTempStartingFromTable reportDate={reportDate} startTerm={startTerm}/>
      </Suspense>
    </div>
  )
}
