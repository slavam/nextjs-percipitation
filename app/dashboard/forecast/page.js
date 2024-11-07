import { lusitana } from '@/app/ui/fonts'
import Link from 'next/link'

const absoluteZero = 273.15
export default async function Page({searchParams}) {
  const iDay = +searchParams?.i_day || 0
  let realWeather = []
  let realTemps = []
  if(iDay===0){
    let points = [0,10800,21600,32400,43200,54000,64800,75600]
    const reportDate = new Date().toISOString().slice(0,10)
    let reportDateSec = Math.round(new Date(reportDate).getTime()/1000)
    let data = await fetch(`http://10.54.1.30:8640/get?quality=1&sources=100&hashes=795976906&point=0,10800,21600,32400,43200,54000,64800,75600&stations=34519&notbefore=${reportDateSec}&notafter=${reportDateSec+22*60*60}`)
    try {
      realWeather = await data.json()
    }catch (error) {
      console.error('API Error:', error);
    }
    realWeather.forEach(rw=> {let i=points.indexOf(rw.point); realTemps[i]= (+rw.value-absoluteZero).toFixed(1)})
  }
  const apiKey = process.env.WEATHER_API_KEY
  // http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Donetsk,Donets'ka Oblast'&days=2&aqi=no&alerts=no
  // const query =  `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Donetsk, Donetsk oblast&days=1&aqi=no&alerts=no`
  const query = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=id:2495932&days=3`
  let data = await fetch(query)

  let totalForecast = {}
  try {
    totalForecast = await data.json()
  }catch (error) {
    console.error('API Error:', error);
  }
  let options = {
    month: 'long',
    day: 'numeric',
  }
  const days =[]
  let name = iDay===0? 'Сегодня':(iDay===1? 'Завтра':new Date((totalForecast.location.localtime_epoch+iDay*24*3600)*1000).toLocaleDateString('ru',options))
  for (let i = 0; i < 3; i++) {
    let href = `?i_day=${i}`
    let name = i===0? 'Сегодня':(i===1? 'Завтра':new Date((totalForecast.location.localtime_epoch+i*24*3600)*1000).toLocaleDateString('ru',options))
    days.push(<Link key={i} href={href} className="p-3">{name}</Link>)
  }
  // options = {
  //   year: 'numeric',
  //   month: 'long',
  //   day: 'numeric',
  //   hour: 'numeric',
  //   minute: 'numeric',
  //   second: 'numeric',
  // }
  const todayForecast = totalForecast.forecast.forecastday[iDay].day
  const todayForecastIcon = todayForecast.condition.icon
  const todayForecastText = todayForecast.condition.text
  const todayForecastMaxTemp = todayForecast.maxtemp_c
  const todayForecastMinTemp = todayForecast.mintemp_c
  const todayForecastHumidity = todayForecast.avghumidity
  const todayForecastPercipitation = todayForecast.daily_chance_of_rain===0? 'Осадков не ожидается':`Вероятность освдков ${todayForecast.daily_chance_of_rain}%`
  // const sunrise = totalForecast.forecast.forecastday[0].astro.sunrise.slice(0,5)
  // let sunset = totalForecast.forecast.forecastday[0].astro.sunset.slice(0,5)
  // sunset = 12+(+sunset.slice(0,2))+sunset.slice(2)
  const maxWind = (todayForecast.maxwind_kph*1000/3600).toFixed(1)
  // const totalPrecip = todayForecast.totalprecip_mm
  let hdr = []
  const forecastByHour = totalForecast.forecast.forecastday[iDay].hour
  for (let i = 0; i < 8; i++) {
    hdr.push(<th key={i} style={{width:'150px'}}>{`${i*3}:00`}</th>)
  }
  let icons = []
  let temp = []
  let wind = []
  let windDegree = []
  let precip = []
  let cloud = []
  let humidity = []
  let pressure = []
  for (let i = 0; i < 8; i++) {
    let data = forecastByHour[i*3]
    icons.push(<th key={i} ><img class="img-thumbnail rounded float-start " src={data.condition.icon} alt={data.condition.text} title={data.condition.text} /> </th>)
    let realTemp = realTemps[i]? `/${realTemps[i]}`: null
    temp.push(<th key={i} >{data.temp_c}{realTemp}</th>)
    wind.push(<th key={i} >{(data.wind_kph*1000/3600).toFixed(1)}</th>)
    windDegree.push(<th key={i} >{data.wind_degree}</th>)
    precip.push(<th key={i} >{data.precip_mm}</th>)
    cloud.push(<th key={i} >{data.cloud}</th>)
    humidity.push(<th key={i} >{data.humidity}</th>)
    pressure.push(<th key={i} >{data.pressure_mb}</th>)
    // pressure.push(<th key={i} style={{'border': '2px solid white'}}>{data.pressure_mb}</th>)
  }
  let postTemp = iDay===0? 'прогноз/факт':''
  return (
    
    <div className="w-full">
      {/* <link rel="stylesheet" href="//cdn.weatherapi.com/v5/assets/css/theme.css" />  */}
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Прогноз погоды в г. Донецк на {totalForecast.forecast.forecastday[iDay].date}</h1> {/* {new Date(totalForecast.location.localtime_epoch*1000).toLocaleDateString('ru',options)}</h1> */}
      </div>
      <div class="bg-light border rounded nav-scroller py-1 mb-2">
        <nav class="nav d-flex justify-content-between">
          {days}
        </nav>
      </div>
      <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm position-relative">
        <div class="col p-4 d-flex flex-column position-static">
          <strong class="d-inline-block mb-2 text-primary"></strong>
          {/* <h3 class="mb-0">{JSON.stringify(realWeather)}</h3> */}
          <p class="card-text mb-auto">
            <img class="img-thumbnail rounded float-start " src={todayForecastIcon} alt="Weather is Partly Cloudy " title="Weather is Partly Cloudy " /> 
            {name} ожидается <b>{todayForecastText}</b>. Дневная температура достигнет <b>{todayForecastMaxTemp} &deg;C</b>. Ночью температура опустится до <b>{todayForecastMinTemp} &deg;C</b>. {todayForecastPercipitation}. Влажность будет около <b>{todayForecastHumidity}%</b>. Скорость ветра <b>{maxWind} м/сек</b>
          </p>
        </div>
      </div>
      <div class="table-responsive">
        <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm position-relative">
          <table class="table table-condensed table-hover table-bordered small">
            <thead>
              <tr style={{'background-color': '#666666', height: '80px'}}>
                <th style={{width:'150px'}}>&nbsp;</th>
                {hdr}
              </tr>
              <tr style={{height: '80px', 'background-color': '#222222'}}>
                <th style={{'background-color': '#666666'}}>Погода</th>
                {icons}
              </tr>
              <tr style={{height: '80px', 'background-color': '#222222'}}>
                <th style={{'background-color': '#666666'}}>Температура &deg;C<br/>{postTemp}</th>
                {temp}
              </tr>
              <tr style={{height: '80px', 'background-color': '#222222'}}>
                <th style={{'background-color': '#666666'}}>Скорость ветра м/сек</th>
                {wind}
              </tr>
              <tr style={{height: '80px', 'background-color': '#222222'}}>
                <th style={{'background-color': '#666666'}}>Направление ветра &deg;</th>
                {windDegree}
              </tr>
              <tr style={{height: '80px', 'background-color': '#222222'}}>
                <th style={{'background-color': '#666666'}}>Осадки мм</th>
                {precip}
              </tr>
              <tr style={{height: '80px', 'background-color': '#222222'}}>
                <th style={{'background-color': '#666666'}}>Облачность %</th>
                {cloud}
              </tr>
              <tr style={{height: '80px', 'background-color': '#222222'}}>
                <th style={{'background-color': '#666666'}}>Влажность %</th>
                {humidity}
              </tr>
              <tr style={{height: '80px', 'background-color': '#222222'}}>
                <th style={{'background-color': '#666666'}}>Давление mb</th>
                {pressure}
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  )
}