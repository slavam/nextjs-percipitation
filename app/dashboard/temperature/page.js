import Search from '@/app/ui/search'
// import { fetchDailyTemperatures } from '@/app/lib/data'
import { lusitana } from '@/app/ui/fonts'
import DailyTempTable from '@/app/ui/dailyTemp/dailyTempTable'
import { Suspense } from 'react'

export const metadata = {
  title: 'Средняя температура за сутки',
}
export default async function Page({searchParams}) {
  const reportDate = searchParams?.reportDate || new Date().toISOString().slice(0,10)
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Среднесуточная температура</h1>
      </div>
      <h2>Отчетная дата</h2>
      <Search />
      <Suspense key={reportDate} fallback={<div>Loading...</div>}>
        <DailyTempTable reportDate={reportDate} />
      </Suspense>
    </div>
  )
}
