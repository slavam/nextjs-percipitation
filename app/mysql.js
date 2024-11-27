import mysql from 'mysql2';
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'slavam1',
  password: 'slavam1',
  database: 'hmc_development',
  // port: 3306,
  // host: '10.54.1.6',
  // database: 'hmc_production',
  // user: 'db-admin',
  // password: 'Pw_Hmc12345'
});
export default connection;