import {pool} from "../db.js"

export const getCursos = async (req, res) => {
    try{
        const [rows] = await pool.query('select * from cursos')
    res.json(rows)
    }catch (eror){
        return res.status(500).json({
            message: 'something is wrong :('
        })
    }
} //se ven a todos los cursos

export const getCurso = async(req,res)=>{
    try{
        const [rows] = await pool.query('select * from cursos where id_cursos = ?', [req.params.id])
    
    if (rows.length <=0) return res.status(404).json({
        message:'alumno not found | check the ID'
    })
    res.json(rows[0])
    } catch(error){
        return res.status(500).json({
            message: 'something is wrong :('
        })
    }
} //se selecciona un curso dependiendo su id

export const createCursos = async (req, res) => {
   try{
        const{id, name, id_profesor}= req.body
        const [rows]=await pool.query('insert into cursos ( id_cursos, nombre_cursos, id_profesor) values(?,?,?)',[id, name, id_profesor])
        res.send({
         id: rows.insertId,
         name,
         id_profesor,
    })
   }catch (error){
         return res.status(500).json({
             message: 'something is wrong :('
            })
   }
}//se crea un nuevo curso

export const updateCursos = async(req, res) => {
    const {id} = req.params
    const{name,id_profesor,} =req.body
    try{ 
        const[result] = await pool.query('UPDATE cursos Set nombre_crusos=IFNULL(?, nombre_cursos),id_profesor=IFNULL(?, id_profesor), WHERE id_cursos=?', 
         [name,id_profesor,id])
         console.log(result)
    if(result.affectedRows ===0) return res.status(404).json({
        message:'curso not found | check the ID'
    })
    const[rows]= await pool.query('SELECT * FROM crusos WHERE id_cursos=?',[id])

    res.json(rows[0])
    }catch (error){
        return res.status(500).json({
            message: 'something is wrong :('
           })
    }
}//se actualizan los datos de un curso dependiendo su id

export const deleteCursos = async(req, res) => {
   try{
        const [result] = await pool.query('DELETE FROM cursos WHERE id_cursos = ?',
         [req.params.id])
            if (result.affectedRows <=0) return res.status(404).json({
                 message: 'curso not found | check the ID'
             })
         res.sendStatus(204)
   }catch(error){
         return res.status(500).json({
             message: 'something is wrong :('
             })
   }
}//se elimina un curso dependiendo su id 