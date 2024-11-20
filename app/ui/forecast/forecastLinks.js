import Link from 'next/link'

export default async function ForecastLinks() {
  let todayTime = new Date().getTime()
  const days =[]
  let options = {
    month: 'long',
    day: 'numeric',
  }
  let name = ''
  for (let i = 0; i < 3; i++) {
    let href = `?i_day=${i}`
    name = i===0? 'Сегодня':(i===1? 'Завтра':new Date(todayTime+i*24*3600*1000).toLocaleDateString('ru',options))
    days.push(<Link key={i} href={href} className="p-3">{name}</Link>)
  }
  return(
    <div className="bg-light border rounded nav-scroller py-1 mb-2">
      <nav className="nav d-flex justify-content-between">
        {days}
      </nav>
    </div>
  )
}