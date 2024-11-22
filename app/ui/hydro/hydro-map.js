'use client'
import { YMaps, Map, Placemark, Clusterer } from '@pbe/react-yandex-maps'
// const absoluteZero = 273.15
const apiKey = process.env.REACT_APP_YANDEX_API_KEY
export default function HydroMap({hydroPosts,observations}) {
  const clusterPoints = []
  hydroPosts.map((s) =>{
    let waterLevel = 0
    let waterLevelChange = 0
    if(observations.length>0){
      let wlMeas = observations.find(o=>(o.station===s.sindex) && (o.meas_hash===-1334432274))
      waterLevel = wlMeas? wlMeas.value : '0'
      wlMeas = observations.find(o=>(o.station===s.sindex) && (o.meas_hash===622080813))
      waterLevelChange = wlMeas? wlMeas.value:'0'
    }
    waterLevelChange = +waterLevelChange>0? '↑'+waterLevelChange+'м.' : (+waterLevelChange===0? 'Без изменений': '↓'+(-waterLevelChange)+'м.')
    clusterPoints.push(<Placemark key={s.sindex} defaultGeometry={[s.latitude, s.longitude]}
    properties={{
      iconContent: `Уровень ${waterLevel}м. ${waterLevelChange}`,
      hintContent: `${s.sindex} ${s.station_name}`,
    }}
    modules = {['geoObject.addon.hint']}
    options={{preset: "islands#blueStretchyIcon"}}/>)
  })
  return (
    <YMaps query={{ apikey: apiKey }}>
      <Map
        defaultState={{
        center: [48.1, 37.7],
        zoom: 8,
        controls: ['zoomControl']
        }}
        width={800}
        height={800}
        modules={['control.ZoomControl']}
      >
        <Clusterer options={{groupByCoordinates: false}}>{clusterPoints}</Clusterer>
      </Map>
    </YMaps>
  )
}
// Donetsk 48 04 20N 037 43 36E 225.00 => 48.072222, 37.726667