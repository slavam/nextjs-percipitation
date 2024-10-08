import mysql from 'mysql2';
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'slavam1',
  password: 'slavam1',
  database: 'hmc_development',
  // port: 3306,
//   adapter: 'mysql2'
});
export default connection;