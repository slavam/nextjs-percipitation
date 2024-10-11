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
  let query = `http://10.54.1.30:8640/get?limit=10&stations=${station}&quality=1&source=100&streams=0&hashes=-789901366,1345858116,795976906,1223041370&notbefore=${observDate}&notafter=${observDate}`
  let res = await fetch(query)
  return res.json()
}
export default async function Page({searchParams}) {
  const postId = searchParams?.post || '5'
  const term = searchParams?.term || '1'
  const observDate = searchParams?.observDate || new Date().toISOString().slice(0,10)
  let stationCode = postId2stationCode(postId)
  let observUnixtime = timestamp2unixtime(term,observDate)
  const weatherCSDN  = getWeather(stationCode,observUnixtime)
  let weatherData = []
  let weather = {}
  try{
    [weatherData] = await Promise.all([weatherCSDN])
  } catch (error) {
    console.log('Нет данных о погоде')
    console.error(error)
    return <div>Нет данных о погоде</div>
  } finally {
    // setIsLoading(false)
  }
  if(weatherData && weatherData.length)
    weatherData.forEach(w => {
      switch (w.unit) {
        case 'k':
          weather.temperature = (+w.value-273.15).toFixed(1)
          break;
        case 'pa':
          weather.pressure = +w.value/100
          break
        case "m/s":
          weather.windSpeed = +w.value
          break
        default:
          weather.windDirection = +w.value
      }
    })
  // select p.id, p.name, s.name, l.name from posts p join cities s on s.id=p.city_id join laboratories l on l.id=p.laboratory_id where active=1;
  const [posts] = await connection.promise().query('SELECT * FROM posts WHERE active=1;');
  let p = posts.find(p=>p.id=== +postId)
  const [materials] = await connection.promise().query('SELECT * FROM materials WHERE active=1;');
  return (
    <main>
      <Breadcrumbs                                                                                                              
        breadcrumbs={[                                                                                                            
          { label: 'Измерения', href: '/dashboard/measurements' },
          {                                                                                                                         
            label: 'Создать измерение',                                                                                                
            href: '/dashboard/invoices/create',                                                                                     
            // active: true,                                                                                                         
          },                                                                                                                    
        ]}
      />
      <SearchWeather posts={posts} />
      <p>Дата {observDate}; Срок {term}; Пост {p.name}; Температура {weather.temperature}°С; Давление {weather.pressure}hPa; Скорость ветра {weather.windSpeed}м/с; Направление ветра {weather.windDirection}°;</p>
      <Form weather={weather} materials={materials} postId={postId} date={observDate} term={term}/>                                                                                        
    </main>                                                                                                               
  );                                                                                                                    
}