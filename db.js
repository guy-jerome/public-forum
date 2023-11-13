import pg from 'pg'
import dotenv from 'dotenv'
dotenv.config()

const pool = new pg.Pool({
  user:'postgres',
  host:'localhost',
  password: process.env.DB_PASS,
  database:'publicforum',
  port:5432
})

export default pool