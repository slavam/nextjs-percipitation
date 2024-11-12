'use client'
// import { useState } from 'react'
import { YMaps, Map, Placemark, Clusterer } from '@pbe/react-yandex-maps'
const absoluteZero = 273.15
export default function HydroMap({hydroPosts,observations}) {
  const clusterPoints = []
  hydroPosts.map((s) =>{
    let waterLevel = observations.filter(o=>(o.station===s.sindex) && (o.meas_hash===-1334432274))[0].value
    let waterLevelChange = observations.filter(o=>(o.station===s.sindex) && (o.meas_hash===622080813))[0].value
    waterLevelChange = +waterLevelChange>0? '↑'+waterLevelChange+'м.' : (+waterLevelChange===0? 'Без изменений': '↓'+waterLevelChange+'м.')
      clusterPoints.push(<Placemark key={s.sindex} defaultGeometry={[s.latitude, s.longitude]}
      properties={{
        iconContent: `Уровень ${waterLevel}м. ${waterLevelChange}`,
        hintContent: `${s.sindex} ${s.station_name}`,
      }}
      modules = {['geoObject.addon.hint']}
      options={{preset: "islands#blueStretchyIcon"}}/>)
    // return (<Station key={station.index} station={station} />)
    }
  )
  return (
    <YMaps query={{ apikey: process.env.REACT_APP_YANDEX_API_KEY }}>
      <Map
        defaultState={{
        center: [47.7, 38.0],
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