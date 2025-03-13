import { Suspense } from 'react'
import { lusitana } from '@/app/ui/fonts'
import ForecastLinks from '@/app/ui/forecast/forecastLinks'
import ForecastTable from '@/app/ui/forecast/forecastUI'

export default async function Page({searchParams}) {
  const iDay = +searchParams?.i_day || 0
  // const {iDay} = await searchParams || 0
  let todayTime = new Date().getTime()
  let options = {
    month: 'long',
    day: 'numeric',
  }
  return (
    <div className="w-full">
      {/* <link rel="stylesheet" href="//cdn.weatherapi.com/v5/assets/css/theme.css" />  */}
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Прогноз погоды в г. Донецк на {new Date(todayTime+iDay*24*3600*1000).toLocaleDateString('ru',options)}</h1>
      </div>
      <ForecastLinks />
      <Suspense key={iDay} fallback={<div>Loading...</div>}>
        <ForecastTable iDay={iDay}/>
      </Suspense>

      <div className="footer-bottom text-center pb-5">
	      <small className="copyright">Copyright &copy; <a href="https://www.weatherapi.com" title="Weather API">Weather API</a></small>
      </div>
    </div>
  )
}