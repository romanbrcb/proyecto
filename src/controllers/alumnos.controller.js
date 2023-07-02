import {pool} from '../db.js'

export const getAlumnos = async (req, res) => {
    try{
        const [rows] = await pool.query('select * from alumnos')
    res.json(rows)
    }catch (eror){
        return res.status(500).json({
            message: 'something is wrong :('
        })
    }
} //se ven a todos los alumnos 

export const getAlumno = async(req,res)=>{
    try{
        const [rows] = await pool.query('select * from alumnos where id_alumnos = ?', [req.params.id])
    
    if (rows.length <=0) return res.status(404).json({
        message:'alumno not found | check the ID'
    })
    res.json(rows[0])
    } catch(error){
        return res.status(500).json({
            message: 'something is wrong :('
        })
    }
} //se selecciona un alumno dependiendo su id

export const createAlumnos = async (req, res) => {
   try{
        const{id, name, edad, correo}= req.body
        const [rows]=await pool.query('insert into alumnos ( id_alumnos, nombre_alumnos, edad_alumnos, correo_alumnos) values(?,?,?,?)',[id, name, edad, correo])
        res.send({
         id: rows.insertId,
         name,
         edad,
         correo,
    })
   }catch (error){
         return res.status(500).json({
             message: 'something is wrong :('
            })
   }
}//se crea un nuevo alumno

export const updateAlumnos = async(req, res) => {
    const {id} = req.params
    const{name,edad,correo} =req.body
    try{ 
        const[result] = await pool.query('UPDATE alumnos Set nombre_alumnos=IFNULL(?, nombre_alumnos),edad_alumnos=IFNULL(?, edad_alumnos), correo_alumnos=IFNULL(?, correo_alumnos)WHERE id_alumnos=?', 
         [name,edad,correo,id])
         console.log(result)
    if(result.affectedRows ===0) return res.status(404).json({
        message:'alumno not found | check the ID'
    })
    const[rows]= await pool.query('SELECT * FROM alumnos WHERE id_alumnos=?',[id])

    res.json(rows[0])
    }catch (error){
        return res.status(500).json({
            message: 'something is wrong :('
           })
    }
}//se actualizan los datos de un alumno dependiendo su id

export const deleteAlumnos = async(req, res) => {
   try{
        const [result] = await pool.query('DELETE FROM alumnos WHERE id_alumnos = ?',
         [req.params.id])
            if (result.affectedRows <=0) return res.status(404).json({
                 message: 'alumno not found | check the ID'
             })
         res.sendStatus(204)
   }catch(error){
         return res.status(500).json({
             message: 'something is wrong :('
             })
   }
}//se elimina un alumno dependiendo su id 