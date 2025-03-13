import HydroMap from '@/app/ui/hydro/hydro-map'
import Search from '@/app/ui/search'
import {fetchHydroPosts, fetchHydroData1} from '@/app/lib/data'
import { Suspense } from 'react'
import { lusitana } from '@/app/ui/fonts'

export default async function Page({searchParams}) {
  const hydroPosts = await fetchHydroPosts()
  const { reportDate } = await searchParams || new Date().toISOString().slice(0,10)
  // const reportDate = searchParams?.reportDate || new Date().toISOString().slice(0,10)
  let observations = await fetchHydroData1(reportDate)
  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} text-2xl`}>Гидропосты ДНР</h1>
      <h2>Отчетная дата</h2>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search />
      </div>
      <br/>
      <Suspense fallback={<div>Загрузка...</div>}>
        <HydroMap hydroPosts={hydroPosts} observations={observations}/>
      </Suspense>
    </div>
  )
}