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