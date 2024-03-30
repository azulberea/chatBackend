import express from "express"
import handlebars from "express-handlebars"
import { Server } from "socket.io"

import __dirname from "./utils.js"
import viewsRouter from "./routes/views.router.js"
import Swal from "sweetalert2"

//server http
const app = express()

//inicio motor de plantillas
app.engine("handlebars", handlebars.engine())

//establezco ruta de vistas
app.set("views", `${__dirname}/views`)

//establezco motor de renderizado
app.set("view engine", "handlebars")

//establezco sv estatico de archivos
app.use(express.static(`${__dirname}/../public`))

//utilizo en la ruta base mi grupo de views router
app.use("/", viewsRouter)

//inicio servidor y lo almaceno en una constante
const PORT = 8080
const baseUrl = "http://localhost"
const httpServer = app.listen(PORT, ()=>{
    console.log(`Servidor ejecutandose en ${baseUrl}:${PORT}`)
})

// inicio servidor socket
const io = new Server(httpServer)

//acvtua como base de datos de mis mensajes
const messages = []

io.on("connection", socket => {
    console.log("Nuevo cliente conectado: ", socket.id)

    socket.on("message", data => {
        
        messages.push(data)

        io.emit("messagesLogs", messages)
    })

    socket.on("userConnection", data => {
        socket.emit("messagesLogs", messages)
        socket.broadcast.emit("newUser", data)
    })
})

