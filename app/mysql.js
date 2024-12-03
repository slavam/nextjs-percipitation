import mysql from 'mysql2';
const connection = mysql.createConnection({
  // host: 'localhost',
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PW, 
  database: process.env.HMC_DB_NAME 
  // port: 3306,
  // host: '10.54.1.6',
  // database: 'hmc_production',
  // user: 'db-admin',
  // password: ''
});
export default connection;