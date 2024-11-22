import { lusitana } from '@/app/ui/fonts'
import TodayForecast from '@/app/ui/dashboard/todayForecast'
import { revalidatePath } from 'next/cache'
import { Suspense } from 'react'

export default async function Page() {
  let options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  revalidatePath('/dashboard')
  return (
    <div>
    {/* <link rel="stylesheet" href="//cdn.weatherapi.com/v5/assets/css/theme.css" />        */}
      <h1 className={`${lusitana.className} text-2xl`}>Погода в Донецке на {new Date().toLocaleDateString('ru',options)}</h1>
      <Suspense key='0' fallback={<div>Loading...</div>}>
        <TodayForecast/>
      </Suspense>
      <footer className="footer">
        <div className="footer-bottom text-center pb-5">
            <small className="copyright">Copyright &copy; <a href="https://www.weatherapi.com" title="Weather API">Weather API</a></small>
        </div>
      </footer>
    </div>
  )
}