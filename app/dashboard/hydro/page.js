import HydroMap from '../../ui/hydro/hydro-map'

export default async function Page({searchParams}) {
  let stations=[]
  let data = await fetch(`http://10.54.1.30:8640/stations.json`)
  try {
    stations = await data.json()
  }catch (error) {
    console.error('API Error:', error);
  }
  const hydroPosts = stations.filter(s=>s.sindex>80000 && s.sindex<90000)
  let today = new Date()
  const reportDate = searchParams?.reportDate || today.toISOString().slice(0,10)
  let dateSec1 = Math.round(new Date(reportDate).getTime()/1000)
  data = await fetch(`http://10.54.1.30:8640/get?quality=1&sources=1500,10202&hashes=-1334432274,622080813,751364125&stations=83026,83028,83036,83040,83045,83048,83050,83060&notbefore=${dateSec1}&notafter=${dateSec1+24*3600}`)
  let observations = []
  try {
    observations = await data.json()
  }catch (error) {
    console.error('API Error:', error);
  }
  return (
    <section>
      <h2>Гидропосты ДНР</h2>
      <HydroMap hydroPosts={hydroPosts} observations={observations}/>
    </section>
  )
}