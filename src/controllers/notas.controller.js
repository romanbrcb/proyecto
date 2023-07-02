import {pool} from '../db.js'

export const getNotas = async (req, res) => {
    try{
        const [rows] = await pool.query('select * from notas')
    res.json(rows)
    }catch (eror){
        return res.status(500).json({
            message: 'something is wrong :('
        })
    }
} //se ven a todas las notas

export const getNota = async(req,res)=>{
    try{
        const [rows] = await pool.query('select * from notas where id_nota = ?', [req.params.id])
    
    if (rows.length <=0) return res.status(404).json({
        message:'nota not found | check the ID'
    })
    res.json(rows[0])
    } catch(error){
        return res.status(500).json({
            message: 'something is wrong :('
        })
    }
} //se selecciona un alumno dependiendo su id

export const createNotas = async (req, res) => {
    try{
         const{id, id_alumnos, id_cursos, nota}= req.body
         const [rows]=await pool.query('insert into notas ( id_nota, id_alumnos, id_cursos, nota) values(?,?,?,?)',[id, name, id_cursos, nota])
         res.send({
          id: rows.insertId,
          id_alumnos,
          id_cursos,
          nota,
     })
    }catch (error){
          return res.status(500).json({
              message: 'something is wrong :('
             })
    }
 }//se crea una nueva nota

 export const updateNotas = async(req, res) => {
    const {id} = req.params
    const{id_alumnos,id_cursos,nota} =req.body
    try{ 
        const[result] = await pool.query('UPDATE notas Set id_alumnos=IFNULL(?, id_alumnos),id_cursos=IFNULL(?, id_cursos), nota=IFNULL(?, nota)WHERE id_nota=?', 
         [id_alumnos,id_cursos,nota,id])
         console.log(result)
    if(result.affectedRows ===0) return res.status(404).json({
        message:'nota not found | check the ID'
    })
    const[rows]= await pool.query('SELECT * FROM notas WHERE id_nota=?',[id])

    res.json(rows[0])
    }catch (error){
        return res.status(500).json({
            message: 'something is wrong :('
           })
    }
}//se actualizan los datos de una nota dependiendo su id

export const deleteNotas = async(req, res) => {
    try{
         const [result] = await pool.query('DELETE FROM notas WHERE id_nota = ?',
          [req.params.id])
             if (result.affectedRows <=0) return res.status(404).json({
                  message: 'nota not found | check the ID'
              })
          res.sendStatus(204)
    }catch(error){
          return res.status(500).json({
              message: 'something is wrong :('
              })
    }
 }//se elimina una nota dependiendo su id 