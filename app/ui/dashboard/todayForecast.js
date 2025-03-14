import { fetchWeatherForecast3 } from '@/app/lib/data'
import { lusitana } from '@/app/ui/fonts'

export default async function TodayForecast() {
  let totalForecast = await fetchWeatherForecast3('/dashboard')
  // let options = {
  //   year: 'numeric',
  //   month: 'long',
  //   day: 'numeric',
  // }
  const todayForecast = totalForecast.forecast.forecastday[0].day
  const totalPrecip = todayForecast.totalprecip_mm
  const todayForecastMaxTemp = todayForecast.maxtemp_c
  const todayForecastMinTemp = todayForecast.mintemp_c
  const sunrise = totalForecast.forecast.forecastday[0].astro.sunrise.slice(0,5)
  let sunset = totalForecast.forecast.forecastday[0].astro.sunset.slice(0,5)
  sunset = 12+(+sunset.slice(0,2))+sunset.slice(2)
  const maxWind = (todayForecast.maxwind_kph*1000/3600).toFixed(1)
  const currHour = new Date().getHours()+1 // toISOString().slice(11,13)
  let hdr = [<th key='00' style={{height: '80px', width: '80px', backgroundColor: '#666666'}}></th>]
  const forecastByHour = totalForecast.forecast.forecastday[0].hour
  for (let i = currHour; i < 24; i++) {
    hdr.push(<th key={i} style={{height: '80px', width: '80px', backgroundColor: '#666666'}}>{`${i}:00`}</th>)
  }
  let icons = []
  let temp = []
  let precip = []
  for (let i = currHour; i < 24; i++) {
    let data = forecastByHour[i]
    icons.push(<th key={i} ><img className="img-thumbnail rounded float-start " src={data.condition.icon} alt={data.condition.text} title={data.condition.text} /> </th>)
    temp.push(<th key={i} >{data.temp_c}</th>)
    let precPers = ((data.chance_of_rain===0) && (data.chance_of_snow===0))? '0':Math.max(data.chance_of_rain,data.chance_of_snow)
    precip.push(<th key={i}>{precPers}</th>)
  }
  return (
    <div>
      <table className="table table-condensed table-hover table-bordered small">
        <thead>
          <tr style={{'backgroundColor': '#666666', height: '80px'}}>
            <th style={{width:'150px'}}>Восход: {sunrise}<br />Закат: {sunset}</th>
            <th style={{width:'150px'}}>Max:<br />{todayForecastMaxTemp} &deg;C</th>
            <th style={{width:'150px'}}>Min:<br />{todayForecastMinTemp} &deg;C</th>
            <th style={{width:'150px'}}>Осадки:<br />{totalPrecip} mm</th>
            <th style={{width:'150px'}}>Скорость ветра:<br />{maxWind} м/сек</th>
          </tr>
        </thead>
      </table>
      <h1 className={`${lusitana.className} text-2xl`}>Почасовой прогноз</h1>
      <table className="table table-condensed table-hover table-bordered small">
        <thead>
          <tr>{hdr}</tr>
          <tr style={{height: '80px', 'backgroundColor': '#222222'}}>
              <th style={{'backgroundColor': '#666666'}}>Погода</th>
              {icons}
            </tr>
            <tr style={{height: '80px', 'backgroundColor': '#222222'}}>
              <th style={{'backgroundColor': '#666666'}}>Температура &deg;C</th>
              {temp}
            </tr>
            <tr style={{height: '80px', 'backgroundColor': '#222222'}}>
              <th style={{'backgroundColor': '#666666'}}>Вероятность освдков %</th>
              {precip}
            </tr>
        </thead>
      </table>
    </div>
  )
}