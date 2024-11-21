import { fetchWeatherForecast3, fetchTodayTempDonetsk } from '@/app/lib/data'

async function ForecastDescription({iDay,todayForecast}) {
  const todayForecastIcon = todayForecast.condition.icon
  const todayForecastText = todayForecast.condition.text
  const todayForecastMaxTemp = todayForecast.maxtemp_c
  const todayForecastMinTemp = todayForecast.mintemp_c
  const todayForecastHumidity = todayForecast.avghumidity
  const todayForecastPercipitation = todayForecast.daily_chance_of_rain===0? 'Осадков не ожидается':`Вероятность освдков ${todayForecast.daily_chance_of_rain}%`
  const maxWind = (todayForecast.maxwind_kph*1000/3600).toFixed(1)
  let todayTime = new Date().getTime()
  let options = {
    month: 'long',
    day: 'numeric',
  }
  let name = iDay===0? 'Сегодня':(iDay===1? 'Завтра':new Date(todayTime+iDay*24*3600*1000).toLocaleDateString('ru',options))
  return (
    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm position-relative">
      <div className="col p-4 d-flex flex-column position-static">
        <p className="card-text mb-auto">
          <img className="img-thumbnail rounded float-start " src={todayForecastIcon} alt={todayForecastText} title={todayForecastText} /> 
          {name} ожидается <b>{todayForecastText}</b>. Дневная температура достигнет <b>{todayForecastMaxTemp} &deg;C</b>. Ночью температура опустится до <b>{todayForecastMinTemp} &deg;C</b>. {todayForecastPercipitation}. Влажность будет около <b>{todayForecastHumidity}%</b>. Скорость ветра <b>{maxWind} м/сек</b>
        </p>
      </div>
    </div>
  )
}

export default async function ForecastTable({iDay}) {
  const totalForecast = await fetchWeatherForecast3('/dashboard/forecast')
  const todayForecast = totalForecast.forecast.forecastday[iDay].day
  let realWeather = []
  let realTemps = []
  const absoluteZero = 273.15
  if(iDay===0){
    let points = [0,10800,21600,32400,43200,54000,64800,75600]
    realWeather = await fetchTodayTempDonetsk()
    realWeather.forEach(rw=> {let i=points.indexOf(rw.point); realTemps[i]= (+rw.value-absoluteZero).toFixed(1)})
  }
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
    icons.push(<th key={i} ><img className="img-thumbnail rounded float-start " src={data.condition.icon} alt={data.condition.text} title={data.condition.text} /> </th>)
    let realTemp = realTemps[i]? `/${realTemps[i]}`: null
    temp.push(<th key={i} >{data.temp_c}{realTemp}</th>)
    wind.push(<th key={i} >{(data.wind_kph*1000/3600).toFixed(1)}</th>)
    windDegree.push(<th key={i} >{data.wind_degree}</th>)
    precip.push(<th key={i} >{data.precip_mm}</th>)
    cloud.push(<th key={i} >{data.cloud}</th>)
    humidity.push(<th key={i} >{data.humidity}</th>)
    pressure.push(<th key={i} >{data.pressure_mb}</th>)
  }
  let postTemp = iDay===0? 'прогноз/факт':''
  let styleTr = {height: '80px', 'backgroundColor': '#222222'}
  let styleTh = {'backgroundColor': '#666666'}
  return(
    <section>
      <ForecastDescription iDay={iDay} todayForecast={todayForecast}/>
      <div className="table-responsive">
        <div className="col p-4 d-flex flex-column position-static">
          <table className="table table-condensed table-hover table-bordered small">
            <thead>
              <tr style={{'backgroundColor': '#666666', height: '80px'}}>
                <th style={{width:'150px'}}>&nbsp;</th>
                {hdr}
              </tr>
              <tr style={styleTr}>
                <th style={styleTh}>Погода</th>
                {icons}
              </tr>
              <tr style={styleTr}>
                <th style={styleTh}>Температура &deg;C<br/>{postTemp}</th>
                {temp}
              </tr>
              <tr style={styleTr}>
                <th style={styleTh}>Скорость ветра м/сек</th>
                {wind}
              </tr>
              <tr style={styleTr}>
                <th style={styleTh}>Направление ветра &deg;</th>
                {windDegree}
              </tr>
              <tr style={styleTr}>
                <th style={styleTh}>Осадки мм</th>
                {precip}
              </tr>
              <tr style={styleTr}>
                <th style={styleTh}>Облачность %</th>
                {cloud}
              </tr>
              <tr style={styleTr}>
                <th style={styleTh}>Влажность %</th>
                {humidity}
              </tr>
              <tr style={styleTr}>
                <th style={styleTh}>Давление mb</th>
                {pressure}
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </section>
  )
}