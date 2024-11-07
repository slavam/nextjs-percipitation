import { lusitana } from '@/app/ui/fonts'
import Link from 'next/link'

export default async function Page() {
  const apiKey = process.env.WEATHER_API_KEY
  const query = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=id:2495932`
  let data = await fetch(query)

  let options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    // hour: 'numeric',
    // minute: 'numeric',
    // second: 'numeric',
    // timeZoneName: 'short'
  }
  let totalForecast = {}
  try {
    totalForecast = await data.json()
  }catch (error) {
    console.error('API Error:', error);
  }
  const todayForecast = totalForecast.forecast.forecastday[0].day
  const totalPrecip = todayForecast.totalprecip_mm
  const todayForecastMaxTemp = todayForecast.maxtemp_c
  const todayForecastMinTemp = todayForecast.mintemp_c
  const sunrise = totalForecast.forecast.forecastday[0].astro.sunrise.slice(0,5)
  let sunset = totalForecast.forecast.forecastday[0].astro.sunset.slice(0,5)
  sunset = 12+(+sunset.slice(0,2))+sunset.slice(2)
  const maxWind = (todayForecast.maxwind_kph*1000/3600).toFixed(1)
  return (
    <div>
      
    <link rel="stylesheet" href="//cdn.weatherapi.com/v5/assets/css/theme.css" />       
     {/* <link rel="stylesheet" href="/static/css/weather-5.css" /> */}
      {/* <link rel="shortcut icon" href="//cdn.weatherapi.com/favicon.ico" /><link rel="icon" type="image/vnd.microsoft.icon" href="//cdn.weatherapi.com/favicon.ico" /><link rel="apple-touch-icon" sizes="180x180" href="//cdn.weatherapi.com/apple-touch-icon.png" /><link rel="icon" type="image/png" sizes="32x32" href="//cdn.weatherapi.com/favicon-32x32.png" /><link rel="icon" type="image/png" sizes="16x16" href="//cdn.weatherapi.com/favicon-16x16.png" /><link rel="manifest" href="//cdn.weatherapi.com/site.webmanifest" /> */}
      <div id="weatherapi-weather-widget-3"></div>
      <h1 className={`${lusitana.className} text-2xl`}>Погода в г. Донецк на {new Date(totalForecast.location.localtime_epoch*1000).toLocaleDateString('ru',options)}</h1>
      {/* <script type='text/javascript' src='https://www.weatherapi.com/weather/widget.ashx?loc=2509387&wid=3&tu=1&div=weatherapi-weather-widget-3' async></script> */}
      {/* <noscript>
        <a href="https://www.weatherapi.com/weather/q/mospyne-2509387" alt="Hour by hour Mospyne weather">10 day hour by hour Mospyne weather</a>
      </noscript> */}
      <div class="table-responsive">
        <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm position-relative">
        <table class="table table-condensed table-hover table-bordered small">
          <thead>
            <tr style={{'background-color': '#666666', height: '80px'}}>
              <th style={{width:'150px'}}>Восход: {sunrise}<br />Закат: {sunset}</th>
              {/* <th style={{width:'150px', height:'50px'}}>Moonrise: 11:35 AM<br />Moonset: 06:59 PM</th> */}
              <th style={{width:'150px'}}>Max:<br />{todayForecastMaxTemp} &deg;C</th>
              <th style={{width:'150px'}}>Min:<br />{todayForecastMinTemp} &deg;C</th>
              {/* <th style={{'background-color':'#9BF6F3'}}>Avg:<br />2.6 &deg;c</th> */}
              <th style={{width:'150px'}}>Осадки:<br />{totalPrecip} mm</th>
              <th style={{width:'150px'}}>Скорость ветра:<br />{maxWind} м/сек</th>
            </tr>
          </thead>
        </table>
        </div>
        <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm position-relative">
        <table class="table table-condensed table-hover table-bordered small">
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th class="table-dark"><address>Wed 06<br/>0:00</address></th>
              <th class="table-dark"><address>Wed 06<br/>3:00</address></th>
              <th class="table-dark"><address>Wed 06<br/>6:00</address></th>
              <th class="table-dark"><address>Wed 06<br/>9:00</address></th>
              <th class="table-dark"><address>Wed 06<br/>12:00</address></th>
              <th class="table-dark"><address>Wed 06<br/>15:00</address></th>
              <th class="table-dark"><address>Wed 06<br/>18:00</address></th>
              <th class="table-dark"><address>Wed 06<br/>21:00</address></th>
            </tr>
          </thead>
          <tbody>
             <tr>
              <td class="table-dark">Weather</td>
              <td><img src="//cdn.weatherapi.com/weather/64x64/night/119.png" alt="Cloudy " title="Cloudy " class="img-circle" style={{width:'50px', height:'50px'}}/></td>
              <td><img src="//cdn.weatherapi.com/weather/64x64/night/122.png" alt="Overcast " title="Overcast " class="img-circle" style={{width:'50px', height:'50px'}}/></td>
              <td><img src="//cdn.weatherapi.com/weather/64x64/night/332.png" alt="Moderate snow" title="Moderate snow" class="img-circle" style={{width:'50px', height:'50px'}}/></td>
              <td><img src="//cdn.weatherapi.com/weather/64x64/day/176.png" alt="Patchy rain nearby" title="Patchy rain nearby" class="img-circle" style={{width:'50px', height:'50px'}}/></td>
              <td><img src="//cdn.weatherapi.com/weather/64x64/day/176.png" alt="Patchy rain nearby" title="Patchy rain nearby" class="img-circle" style={{width:'50px', height:'50px'}}/></td>
              <td><img src="//cdn.weatherapi.com/weather/64x64/day/176.png" alt="Patchy rain nearby" title="Patchy rain nearby" class="img-circle" style={{width:'50px', height:'50px'}}/></td>
              <td><img src="//cdn.weatherapi.com/weather/64x64/night/122.png" alt="Overcast " title="Overcast " class="img-circle" style={{width:'50px', height:'50px'}}/></td>
              <td><img src="//cdn.weatherapi.com/weather/64x64/night/122.png" alt="Overcast " title="Overcast " class="img-circle" style={{width:'50px', height:'50px'}}/></td>
            </tr>
            <tr>
              <td class="table-dark">Temp</td>
              <td style={{'background-color': '#9BF6F3'}}>0.3&deg;c</td>
              <td style={{'background-color':'#9BF6F3'}}>1.3&deg;c</td>
              <td style={{'background-color':'#9BF6F3'}}>-0.3&deg;c</td>
              <td style={{'background-color':'#9BF6F3'}}>2.1&deg;c</td>
              <td style={{'background-color':'#9BF6F3'}}>3.4&deg;c</td>
              <td style={{'background-color':'#9BF6F3'}}>3.7&deg;c</td>
              <td style={{'background-color':'#9BF6F3'}}>3.9&deg;c</td>
              <td style={{'background-color':'#9BF6F3'}}>4.5&deg;c</td>
            </tr>
            {/*<tr>
              <td class="table-dark">Feels</td>
              <td style="background-color:#9BF6F3;">-4.0&deg;c</td>
              <td style="background-color:#9BF6F3;">-3.0&deg;c</td>
              <td style="background-color:#9BF6F3;">-5.2&deg;c</td>
              <td style="background-color:#9BF6F3;">-2.3&deg;c</td>
              <td style="background-color:#9BF6F3;">-0.1&deg;c</td>
              <td style="background-color:#9BF6F3;">0.6&deg;c</td>
              <td style="background-color:#9BF6F3;">1.1&deg;c</td>
              <td style="background-color:#9BF6F3;">1.6&deg;c</td>
              </tr> */}
              {/*<tr><td class="table-dark">Wind</td><td style="background-color:#80F9CC;">14.4 kmph</td><td style="background-color:#80F9CC;">15.5 kmph</td><td style="background-color:#80F9CC;">16.9 kmph</td><td style="background-color:#80F9CC;">17.6 kmph</td><td style="background-color:#80F9CC;">14.0 kmph</td><td style="background-color:#A4F6E9;">12.2 kmph</td><td style="background-color:#A4F6E9;">11.5 kmph</td><td style="background-color:#A4F6E9;">12.2 kmph</td></tr><tr><td class="table-dark">Dir</td><td>W</td><td>W</td><td>W</td><td>WNW</td><td>WNW</td><td>WNW</td><td>WNW</td><td>W</td></tr><tr><td class="table-dark">Gust</td><td style="background-color:#73F6AB;">24.9 kmph</td><td style="background-color:#73F6AB;">23.0 kmph</td><td style="background-color:#73F6AB;">25.3 kmph</td><td style="background-color:#73F6AB;">23.7 kmph</td><td style="background-color:#80F9CC;">16.4 kmph</td><td style="background-color:#80F9CC;">15.1 kmph</td><td style="background-color:#80F9CC;">17.3 kmph</td><td style="background-color:#80F9CC;">18.7 kmph</td></tr><tr><td class="table-dark">Precip</td><td style="background-color:#ffffff;">0.00 mm</td><td style="background-color:#ffffff;">0.00 mm</td><td style="background-color:#ffffff;">0.08 mm</td><td style="background-color:#ffffff;">0.01 mm</td><td style="background-color:#ffffff;">0.02 mm</td><td style="background-color:#ffffff;">0.01 mm</td><td style="background-color:#ffffff;">0.00 mm</td><td style="background-color:#ffffff;">0.00 mm</td></tr><tr><td class="table-dark">Cloud</td><td style="background-color:#BCBFC0;">82%</td><td style="background-color:#9EA2A3;">98%</td><td style="background-color:#9EA2A3;">100%</td><td style="background-color:#9EA2A3;">100%</td><td style="background-color:#9EA2A3;">100%</td><td style="background-color:#9EA2A3;">100%</td><td style="background-color:#9EA2A3;">100%</td><td style="background-color:#9EA2A3;">100%</td></tr><tr><td class="table-dark">Humidity</td><td>58%</td><td>57%</td><td>84%</td><td>83%</td><td>91%</td><td>87%</td><td>80%</td><td>81%</td></tr><tr><td class="table-dark">Pressure</td><td style="background-color:#C6F56F;">1026 mb</td><td style="background-color:#C6F56F;">1026 mb</td><td style="background-color:#C6F56F;">1026 mb</td><td style="background-color:#C6F56F;">1028 mb</td><td style="background-color:#C6F56F;">1029 mb</td><td style="background-color:#C6F56F;">1030 mb</td><td style="background-color:#C6F56F;">1030 mb</td><td style="background-color:#C6F56F;">1030 mb</td></tr>*/}
            </tbody>
        </table>
        </div>
              </div>
    </div>
  )
}