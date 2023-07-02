import {createPool} from 'mysql2/promise'

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '44375522',
    port: 3306,
    database: 'proyecto'
})