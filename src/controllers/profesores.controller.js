import {pool} from '../db.js'

export const getProfesores = async (req,res) =>{
    try{
        const[rows] = await pool.query('select * from profesores')
    }catch (error){
        return res.status(500).json({
            message: 'something is wrong :('
        })
    }
} //mostrar profesores

export const getProfesor = async (req,res) =>{
    try{
        const[rows] =await pool.query('select * from profesores where id_profesores =?', [req.params.id])
        if(rows.length<=0) return res.status(404).json({
            message:'profesor not found | check the ID'
        })
        res.json(rows[0])
    }catch (error) {
        return res.status(500).json({
            message:'something is wrong :('
        })

    } //se muestra solo a un profesor dependiendo su ID
}

export const createProfesor = async (req, res) => {
   try{
        const{id, name, correo, id_cursos}= req.body
        const [rows]=await pool.query('insert into profesores ( id_profesor, nombre_profesor ,correo_profesor ,id_cursos ) values(?,?,?,?)',[id, name, correo,id_cursos ])
        res.send({
         id: rows.insertId,
         name,
         correo,
         id_cursos,
    })
   }catch (error){
         return res.status(500).json({
             message: 'something is wrong :('
            })
   }
}//crear un profesor

export const updateProfesor = async(req, res) => {
    const {id} = req.params
    const{name,correo,id_cursos} =req.body
    try{ 
        const[result] = await pool.query('UPDATE profesores Set nombre_profesor=IFNULL(?, nombre_profesor),correo_profesor=IFNULL(?, correo_profesor), id_cursos=IFNULL(?, id_cursos)WHERE id_profesor=?', //el IFNULL es para que solo tome el dato si es que hay un dato
         [name,correo,id_cursos,id])
         console.log(result)
    if(result.affectedRows ===0) return res.status(404).json({
        message:'profesor not found | check the ID'
    })
    const[rows]= await pool.query('SELECT * FROM profesores WHERE id_profesor=?',[id])

    res.json(rows[0])
    }catch (error){
        return res.status(500).json({
            message: 'something is wrong :('
           })
    }
}//se actualizan los datos de un profesor dependiendo su id

export const deleteProfesor = async(req, res) => {
    try{
         const [result] = await pool.query('DELETE FROM profesores WHERE id_profesor = ?',
          [req.params.id])
             if (result.affectedRows <=0) return res.status(404).json({
                  message: 'profesor not found | check the ID'
              })
          res.sendStatus(204)
    }catch(error){
          return res.status(500).json({
              message: 'something is wrong :('
              })
    }
 }//se elimina un alumno dependiendo su id


