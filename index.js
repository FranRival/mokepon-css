const express = require("express")

const app = express()

app.get("/", (req,res)=>{
    res.send("Hellooo")
}) //dar un recurso. para eso es get

app.listen(8080, ()=>{
    console.log("Servidor funcionando");
})