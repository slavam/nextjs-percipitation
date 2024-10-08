import Form from '@/app/ui/measurements/create-form'
import Breadcrumbs from '@/app/ui/measurements/breadcrumbs'
import connection from '@/app/mysql'
import SearchWeather from '@/app/ui/measurements/searchWeather';

const postId2stationCode = postId=>{
  return +postId<27? 34519:34712
}
const timestamp2unixtime = (term,observDate)=>{
  const hours = {1:'00:00', 7:'06:00', 13:'12:00',19:'18:00'}
  let od = `${observDate} ${hours[+term]}`
  return (new Date(od)).getTime()/1000
}
async function getWeather(station,observDate){
  const query = `http://10.54.1.30:8640/get?limit=10&stations=${station}&quality=1&source=100&streams=0&hashes=-789901366,1345858116,795976906,1223041370&local=1&notbefore=${observDate}&notafter=${observDate}`
  const res = await fetch(query)
  return res.json()
}
export default async function Page({searchParams}) {
  const postId = searchParams?.post || '5'
  const term = searchParams?.term || '1'
  const observDate = searchParams?.observDate || new Date().toISOString().slice(0,10)
  let stationCode = postId2stationCode(postId)
  let observUnixtime = timestamp2unixtime(term,observDate)
  const weatherData  = getWeather(stationCode,observUnixtime)
  const [weather] = await Promise.all([weatherData])
  let temperature = null
  let pressure = null
  let windDirection = null
  let windSpeed = null
  weather.forEach(w => {
    switch (w.unit) {
      case 'k':
        temperature = (+w.value-273.15).toFixed(1)
        break;
      case 'pa':
        pressure = +w.value/100
        break
      case "m/s":
        windSpeed = w.value
        break
      default:
        windDirection = w.value
    }
    
  });
  // select p.id, p.name, s.name, l.name from posts p join cities s on s.id=p.city_id join laboratories l on l.id=p.laboratory_id where active=1;
  const [posts] = await connection.promise().query('SELECT * FROM posts WHERE active=1;');
  return (
    <main>
      {/* <p>{JSON.stringify(weather)}</p> */}
      <Breadcrumbs                                                                                                              
        breadcrumbs={[                                                                                                            
          { label: 'Загрязнения', href: '/dashboard/measurements' },
          {                                                                                                                         
            label: 'Создать измерение',                                                                                                
            href: '/dashboard/invoices/create',                                                                                     
            active: true,                                                                                                         
          },                                                                                                                    
        ]}
      />
      <SearchWeather posts={posts} />
      <p>Температура {temperature}°С; Давление {pressure}pa; Скорость ветра {windSpeed}м/с; Направление ветра {windDirection}°;</p>
      <Form posts={posts}/>                                                                                        
    </main>                                                                                                               
  );                                                                                                                    
}