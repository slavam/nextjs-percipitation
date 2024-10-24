import connection from '@/app/mysql'
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
    // throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchMeasurementsPages() {
  try {
    const count = await connection.promise().query(`SELECT COUNT(*) FROM measurements;`);
    const totalPages = Math.ceil(Number(count[0][0]['COUNT(*)']) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    // throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchPollutionsForMeasurement(id){
  try {
    const [pollutions] = await connection.promise().query(`SELECT pv.*, m.name FROM pollution_values pv 
      JOIN materials m ON pv.material_id=m.id
      WHERE pv.measurement_id = ${id};`);
    return pollutions
    // console.log(pollutions)
    // return await pollutions.json()
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function fetchMeasurement(id){
  // select m.*, p.name from measurements m join posts p on p.id=m.post_id where m.id=
  try {
    const measurement = await connection.promise().query(`SELECT m.*, p.name FROM measurements m
      JOIN posts p ON p.id=m.post_id
      WHERE m.id = ${id};`);
    return measurement[0][0]
    // return await measurement.json()
  } catch (err) {
    console.error(err);
    return null;
  }
}