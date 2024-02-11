const express = require("express")

const app = express()
const jugadores = []

app.get("/unirse", (req,res)=>{ //nuestra pagina en el fronted llame un servicio en el backend para que se regriste ese jugador y le devuelva un id
    res.send("Hellooo")

}) 



app.listen(8080, ()=>{
    console.log("Servidor funcionando");
})

//http, localhost, servidores y puertos

