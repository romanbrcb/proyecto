import express from "express"
import alumnosRoutes from './routes/alumnos.routes.js'
import indexRoutes from './routes/index.routes.js'
import cursosRoutes from './routes/cursos.routes.js'
import notasRoutes from './routes/notas.routes.js'
import profesRoutes from './routes/alumnos.routes.js'

const app = express()

app.use(express.json())

app.use(indexRoutes)
app.use(alumnosRoutes)
app.use(cursosRoutes)
app.use(notasRoutes)
app.use(profesRoutes)

app.use((req, res, next) =>{
    res.status(404).json({
        message:'endpoint not found :c'
    })
})

app.listen(3000)
console.log("se esta ejecutando")