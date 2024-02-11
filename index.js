const express = require("express")

const app = express()
const jugadores = []

class Jugador{
    constructor(id){
        this.id=id
    }
}

app.get("/unirse", (req,res)=>{ //nuestra pagina en el fronted llame un servicio en el backend para que se regriste ese jugador y le devuelva un id
    const id = `${Math.random()}` //template string, numero se conviera en una codena de texto. se maneje como cadena de exto

    const jugador = new Jugador(id)

    jugadores.push(jugador)
 
    res.setHeader("Access-Control-Allow-Origin", "*")


    res.send(id) //es como una sala de juego. 

}) 



app.listen(8080, ()=>{
    console.log("Servidor funcionando");
})

//http, localhost, servidores y puertos

