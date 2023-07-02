import { pool } from "../db.js";

export const Ping = async (req, res) =>{
    const [result] = await pool.query('select "pong" AS result')
    res.json(result[0])
}