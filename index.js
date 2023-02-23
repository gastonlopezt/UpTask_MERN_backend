import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js"
import proyectoRoutes from "./routes/proyectoRoutes.js"
import tareaRoutes from "./routes/tareaRoutes.js"


const app = express();
app.use(express.json());

dotenv.config();

conectarDB();

//Cors config
const whitelist =[
    process.env.FRONTEND_URL
];

const corsOptions = {
    origin:function(origin, callback) {
        if(!origin){ //Postman request have not origin 
            return callback(null, true)
        }else if (whitelist.includes(origin)){
            callback(null, true)
        }else{
            callback(new Error("Cors Error"))
        }
    } 
}


app.use(cors(corsOptions))

//Routing

app.use('/API/usuarios', usuarioRoutes)
app.use('/API/proyectos', proyectoRoutes)
app.use('/API/tareas', tareaRoutes);

const PORT = process.env.PORT || 4000;

const servidor = app.listen(PORT, () => {
    console.log(`Server connected to ${PORT}`);
})


//socket.io
import { Server } from 'socket.io';

const io = new Server(servidor, {
    pingTimeout:  60000,
    cors: {
        origin: process.env.FRONTEND_URL,
    }
})

io.on('connection', (socket) => {
    console.log('Connected to socket.io')


    //Definir eventos de socket.io
    socket.on('abrir proyecto', (proyecto) => {
        socket.join(proyecto);
        socket.emit('respuesta', {nombre: "gaston"});
    })

    socket.on('nueva tarea', (tarea) => {
        const proyecto = tarea.proyecto;
        socket.to(proyecto).emit('tarea agregada', tarea)
    })

    socket.on('eliminar tarea', tarea => {
        const proyecto = tarea.proyecto
        socket.to(proyecto).emit('tarea elimininada', tarea)
    })

    socket.on('actualizar tarea', tarea => {
        const proyecto = tarea.proyecto._id
        socket.to(proyecto).emit('tarea actualizada', tarea)
    })
    
    socket.on('cambiar estado', (tarea) => {
        const proyecto = tarea.proyecto._id
        socket.to(proyecto).emit('nuevo estado', tarea);
    })
})