import connection from '@/app/mysql'
import { revalidatePath } from 'next/cache'

const ITEMS_PER_PAGE = 15;
export async function fetchMeasurements(currentPage) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const [measurements] = await connection.promise().query( //'SELECT * FROM posts WHERE active=1;');
      `SELECT
        measurements.id,
        measurements.term,
        measurements.date,
        measurements.temperature,
        posts.name,
        measurements.wind_direction,
        measurements.wind_speed,
        measurements.atmosphere_pressure,
        measurements.created_at
      FROM measurements
      JOIN posts ON measurements.post_id = posts.id
      
      ORDER BY measurements.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `);

    return measurements;
  } catch (error) {
    console.error('Database Error:', error);
  }
}

export async function fetchMeasurementsPages() {
  try {
    const count = await connection.promise().query(`SELECT COUNT(*) FROM measurements;`);
    const totalPages = Math.ceil(Number(count[0][0]['COUNT(*)']) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
  }
}

export async function fetchPollutionsForMeasurement(id){
  try {
    const [pollutions] = await connection.promise().query(`SELECT pv.*, m.name FROM pollution_values pv 
      JOIN materials m ON pv.material_id=m.id
      WHERE pv.measurement_id = ${id};`);
    return pollutions
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function fetchMeasurement(id){
  try {
    const measurement = await connection.promise().query(`SELECT m.*, p.name FROM measurements m
      JOIN posts p ON p.id=m.post_id
      WHERE m.id = ${id};`);
    return measurement[0][0]
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function fetchHydroPosts(){
  let data = await fetch(`http://10.54.1.30:8640/stations.json`)
  try {
    let stations = await data.json()
    const hydroPosts = stations.filter(s=>s.sindex>80000 && s.sindex<90000)
    return hydroPosts
  }catch (error) {
    console.error('API Error:', error);
  }
}

export async function fetchHydroData1(reportDate){
  let dateSec1 = Math.round(new Date(reportDate).getTime()/1000)
  let query = `http://10.54.1.30:8640/get?quality=1&sources=1500,10202&hashes=-1334432274,622080813,751364125&stations=83026,83028,83036,83040,83045,83048,83050,83060&notbefore=${dateSec1}&notafter=${dateSec1+24*3600}`
  let data = await fetch(query)
  try {
    let observations = await data.json()
    return observations
  }catch (error) {
    console.error('API Error:', error);
  }
}

export async function fetchDailyTemperatures(reportDate){
  let reportDateSec = Math.round(new Date(reportDate).getTime()/1000)
  // const points='0,10800,21600,32400,43200,54000,64800,75600'
  revalidatePath('/dashboard/temperature')
  let query = `http://10.54.1.30:8640/get?quality=1&sources=100,10202&hashes=795976906,1451382247&point=0,10800,21600,32400,43200,54000,64800,75600&stations=34519,34524,34622,34721,34615,34712&notbefore=${reportDateSec}&notafter=${reportDateSec+22*60*60}`
  let data = await fetch(query)
  try {
    let observations = await data.json()
    return observations
  }catch (error) {
    console.error('API Error:', error);
    console.log(query)
  }
}