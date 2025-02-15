const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')

const botonReiniciar = document.getElementById('boton-reiniciar')

const botonMascotaJugador = document.getElementById('boton-mascota')

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById ('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasEnemigo = document.getElementById('vidas-enemigo')
const spanVidasJugador = document.getElementById('vidas-jugador')

const sectionMensajes = document.getElementById('resultado')
const ataqueDelJugador = document.getElementById('ataque-del-jugador')
const ataqueDelEnemigo = document.getElementById('ataque-del-enemigo')

const contenedorTarjetas = document.getElementById('contenedor-tarjetas')

const contenedorAtaques = document.getElementById('contenedorAtaques')

sectionReiniciar.style.display = 'none'


const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')
let lienzo = mapa.getContext('2d')
let intervalo

let mokepones = []
let ataqueEnemigo = []
let vidasJugador = 3
let vidasEnemigo = 3
let opcionDeMokepon
let inputHipodoge
let inputCapipepo 
let inputRatigueya 
let mascotaJugador
let ataquesMokepon
let botones = []
let ataqueJugador = []

let botonFuego
let botonAgua
let botonTierra

let ataquesMokeponEnemigo
let indexAtaqueJugador
let indexAtaqueEnemigo

let victoriasJugador= 0
let victoriasEnemigo =0

let mapaBackground = new Image ()
mapaBackground.src ='https://images2.imgbox.com/b4/d9/x9ubpv2H_o.png'
let mascotaDelJugadorObjeto

let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
alturaQueBuscamos = anchoDelMapa*600/800

mapa.width=anchoDelMapa
mapa.height=alturaQueBuscamos

let jugadorId = null
let enemigoId = null

let mokeponesEnemigos = []

const anchoMaximoDelMapa = 350
if (anchoDelMapa>anchoMaximoDelMapa) {
    anchoDelMapa=anchoMaximoDelMapa-20
    
}

class Mokepon { //clase.
    constructor (nombre, foto, vida, fotoMapa, id = null){
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0,mapa.width- this.ancho)
        this.y = aleatorio(0,mapa.height-this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX=0
        this.velocidadY=0
    }

    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto, 
            this.x,
            this.y,
            this.ancho, 
            this.alto
        )
    }
}


let hypodoge = new Mokepon('Hipodoge', 'https://images2.imgbox.com/72/4f/FtMeIIbY_o.png', 5, 'https://images2.imgbox.com/77/e6/LGzhLnXN_o.png')
let capipepo = new Mokepon('Capipepo', 'https://images2.imgbox.com/b3/45/k2jgVjyd_o.png', 5, 'https://images2.imgbox.com/78/79/uZx0xJgg_o.png')
let ratigueya = new Mokepon('Ratigueya', 'https://images2.imgbox.com/f3/e9/w1BQtPQL_o.png', 5, 'https://images2.imgbox.com/26/83/CO9zxorc_o.png')




const HIPODOGE_ATAQUES =[//un array dentro de otro array.
    {nombre: '🧊', id:'boton-agua'},
    {nombre: '🧊', id:'boton-agua'},
    {nombre: '🧊', id:'boton-agua'},
    {nombre: '🔥', id:'boton-fuego'},
    {nombre: '🌱', id:'boton-tierra'},
]

hypodoge.ataques.push(...HIPODOGE_ATAQUES)


const CAPIPEPO_ATAQUES=[
    {nombre: '🌱', id:'boton-tierra'},
    {nombre: '🌱', id:'boton-tierra'},
    {nombre: '🌱', id:'boton-tierra'},
    {nombre: '🧊', id:'boton-agua'},
    {nombre: '🔥', id:'boton-fuego'},
]

capipepo.ataques.push(...CAPIPEPO_ATAQUES)


const RATIGUEYA_ATAQUES=[
    {nombre: '🔥', id:'boton-fuego'},
    {nombre: '🔥', id:'boton-fuego'},
    {nombre: '🔥', id:'boton-fuego'},
    {nombre: '🌱', id:'boton-tierra'},
    {nombre: '🧊', id:'boton-agua'},
]
ratigueya.ataques.push(...RATIGUEYA_ATAQUES)

mokepones.push(hypodoge,capipepo,ratigueya)



function iniciarJuego (){
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'

    mokepones.forEach((mokepon) =>{
        opcionDeMokepon = `
        <input type="radio" name="mascota" id=${mokepon.nombre}>
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `
        contenedorTarjetas.innerHTML+=opcionDeMokepon 
        ////inyecta los mokepones mas la imagen y el alt de los 3 mokepones  

    }) 

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    botonReiniciar.addEventListener('click',reiniciarJuego)
    unirseAlJuego()
}

function unirseAlJuego(){
    fetch("http://localhost:8080/unirse")
    .then(function (res){
        if (res.ok) {
            res.text()
                .then(function(respuesta){
                    console.log(respuesta);
                    jugadorId = respuesta
                })
        }
    })

}


function seleccionarMascotaJugador(){//la segunda pagina.
    console.log('panoquiaa');
    
        sectionSeleccionarMascota.style.display = 'none'
        sectionVerMapa.style.display = 'flex'

        let inputHipodoge = document.getElementById('Hipodoge')
        let inputCapipepo = document.getElementById('Capipepo')
        let inputRatigueya = document.getElementById('Ratigueya')

        if (inputHipodoge.checked){
            spanMascotaJugador.innerHTML = inputHipodoge.id
            mascotaJugador=inputHipodoge.id
        }else if (inputCapipepo.checked){
            spanMascotaJugador.innerHTML = inputCapipepo.id
            mascotaJugador=inputCapipepo.id
        } else if (inputRatigueya.checked){
            spanMascotaJugador.innerHTML = inputRatigueya.id
            mascotaJugador=inputRatigueya.id
        }else {
            alert ("Tienes que selecionar")
        }
        seleccionarMokepon(mascotaJugador)        
        extraerAtaques(mascotaJugador)
        iniciarMapa()  
}



function seleccionarMokepon(mascotaJugador){
    fetch(`http://localhost:8080/mokepon/${jugadorId}`,{
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon:mascotaJugador
        })
    })


}

function extraerAtaques(mascotaJugador){
        let ataques

        for (let i = 0; i < mokepones.length; i++) {
            if (mascotaJugador== mokepones[i].nombre){
                ataques = mokepones[i].ataques
                //console.log(i);
                console.log('aaaaaaaaaaa!');
                
                //console.log(mokepones.length);//da 3.
                
                
            } 
        }
        mostrarAtaques(ataques)
    }//se obtiene el nombre y el ataque. 



function mostrarAtaques(ataques){//asigna valor.
    ataques.forEach(ataque => {//2 variables locales. 
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque BATaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })
        botonFuego = document.getElementById('boton-fuego')
        botonAgua = document.getElementById('boton-agua')
        botonTierra = document.getElementById('boton-tierra')
        botones = document.querySelectorAll('.BATaque')
}//da valor a ataquesMokepon/da valor, dice donde colocar ese valor, contenedorAtaques. 


function secuenciaAtaque(){
    botones.forEach((boton) =>{ //array. + variable local
        boton.addEventListener('click',(Event) => {
            //console.log(Event)
                if (Event.target.textContent === '🔥') {
                    ataqueJugador.push('Fuego')
                    console.log(ataqueJugador)
                    boton.style.background = '#112f58'
                }else if (Event.target.textContent === '🧊'){
                    ataqueJugador.push('Agua')
                    console.log(ataqueJugador)
                    boton.style.background = '#112f58'
                }else{
                    ataqueJugador.push('Tierra')
                    console.log(ataqueJugador)
                    boton.style.background = '#112f58'
            }
            if (ataqueJugador.length===5) {
                enviarAtaques()
            }/////esta funcion es extrana. how it works
        })
    })
}

function enviarAtaques(){
    fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`,{
        method: "post",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })
    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques (){
    fetch(`http://localhost:8080/mokepon/${enemigoId}/ataques`)
    .then(function(res){
        if (res.ok) {
            res.json()
            .then(function({ataques}){
                if (ataques.length===5) {
                    ataqueEnemigo=ataques
                    combate()
                }
            })
        }
    })
}


function seleccionarMascotaEnemigo(){
    let mascotaAleatoria = aleatorio (0,mokepones.length -1)
    spanMascotaEnemigo.innerHTML= mokepones[mascotaAleatoria].nombre
    ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo (){//ubicacion aleatoria del enemigo.
    console.log('Ataque enemigo', ataquesMokeponEnemigo);
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1)

    if (ataqueAleatorio == 0 || ataqueAleatorio==1){
       ataqueEnemigo.push('Fuego')

    }else if (ataqueAleatorio == 3 || ataqueAleatorio==4){
        ataqueEnemigo.push('Agua')

    }else{
        ataqueEnemigo.push('Tierra')
    }
    console.log(ataqueEnemigo)

    iniciarPelea()
}

function iniciarPelea (){
    if (ataqueJugador.length===5) {
        combate()   
    }
}



function indexAmbosOponente(jugador, enemigo){//asigna valor.
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}


//el programa vuelve a ejecutar el codigo por cada eleccion de boton de ataque. 

function combate (){//esta era la segunda pantalla. 
    //son 6,5,4,3,2,1. 
    //quiere decir que el valor de ataque jugador y ataque enemigo ya esta inicializado.
    

    clearInterval(intervalo)
    for (let index = 0; index < ataqueJugador.length; index++) {

        //que hace la funcion combate antes de nada
        if (ataqueJugador[index]===ataqueEnemigo[index]) {
            indexAmbosOponente(index, index)
            crearMensaje('Empate')            
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] ==='Fuego' && ataqueEnemigo[index] ==='Tierra'){
            indexAmbosOponente(index, index)
            crearMensaje("Ganaste")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }else if (ataqueJugador[index]==='Agua' && ataqueEnemigo[index] === 'Fuego'){
            indexAmbosOponente(index, index)
            crearMensaje("Ganaste")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index]==='Tierra' && ataqueEnemigo[index] === 'Agua'){
            indexAmbosOponente(index, index)
            crearMensaje ("Ganaste")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }else {
            indexAmbosOponente(index, index)
            crearMensaje ("Perdiste")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
       }
       revisarVidas()
}



function revisarVidas (){//asigna o compara valor.
    if (victoriasJugador===victoriasEnemigo){
        crearMensajeFinal("Esto fue un empate!!!")
    }else if (victoriasJugador>victoriasEnemigo){
        crearMensajeFinal("Felicitaciones, ganaste 🎈")
    }else {
        crearMensajeFinal("Perdiste. 🎃")
    }
}

function crearMensajeFinal (resultadoFinal){ //asigna o compara valor.

    //resultado segunda pagina. 
    sectionMensajes.innerHTML = resultadoFinal
    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true
    sectionReiniciar.style.display = 'block'
}



window.addEventListener('load',iniciarJuego)


function reiniciarJuego(){ //asigna o compara valor.
    location.reload()
}



function crearMensaje (resultado){ 
    let nuevoAtaqueDelJugador = document.createElement('p')
    //fuego, agua, tierra
    let nuevoAtaqueDelEnemigo = document.createElement('p')
    //agua, tierra, fuego
    //es el proceso infinito. 

    sectionMensajes.innerHTML = resultado //ganaste, perdiste
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}



function aleatorio (min, max){//asigna o compara valor.
    return Math.floor(Math.random()*(max-min +1)+ min)
}



function pintarCanvas(){

    //tambien es infinita.
    
    mascotaDelJugadorObjeto.x=mascotaDelJugadorObjeto.x+mascotaDelJugadorObjeto.velocidadX

    //console.log(mascotaDelJugadorObjeto.x);
    //como funciona la velocidad
    
    mascotaDelJugadorObjeto.y=mascotaDelJugadorObjeto.y+mascotaDelJugadorObjeto.velocidadY
    lienzo.clearRect(0,0,mapa.width,mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )

    mascotaDelJugadorObjeto.pintarMokepon()
    enviarPocision(mascotaDelJugadorObjeto.x,mascotaDelJugadorObjeto.y)

    mokeponesEnemigos.forEach(function(mokepon){
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })



}

function enviarPocision (x,y){
    fetch(`http://localhost:8080/mokepon/${jugadorId}/pocision/`,{
    method:'post',
    headers:{
        "Content-Type": "application/json"
    },
    body:JSON.stringify({
        x,
        y
    })
        
    })

    .then(function(res){
        if (res.ok) {
            res.json()
                .then(function({enemigos}){
                  console.log(enemigos)



                  mokeponesEnemigos = enemigos.map(function(enemigo){
                    let mokeponEnemigo=null
                    const mokeponNombre = enemigo.mokepon.nombre || ""
                    if(mokeponNombre==="Hipodoge"){
                        mokeponEnemigo = new Mokepon('Hipodoge', 'https://images2.imgbox.com/72/4f/FtMeIIbY_o.png', 5, 'https://images2.imgbox.com/77/e6/LGzhLnXN_o.png', enemigo.id)

                    }else if (mokeponNombre==="Capipepo"){
                        mokeponEnemigo = new Mokepon('Capipepo', 'https://images2.imgbox.com/b3/45/k2jgVjyd_o.png', 5, 'https://images2.imgbox.com/78/79/uZx0xJgg_o.png', enemigo.id)

                    }else if (mokeponNombre==="Ratigueya"){
                        mokeponEnemigo = new Mokepon('Ratigueya', 'https://images2.imgbox.com/f3/e9/w1BQtPQL_o.png', 5, 'https://images2.imgbox.com/26/83/CO9zxorc_o.png', enemigo.id)

                    }

                    mokeponEnemigo.x = enemigo.x
                    mokeponEnemigo.y = enemigo.y

                    return mokeponEnemigo
                  })
                         

                })
        }
    })

}

function moverDerecha(){ //asigna o compara valor.
    mascotaDelJugadorObjeto.velocidadX = 5
}

function moverIzquierda(){//asigna o compara valor.
    mascotaDelJugadorObjeto.velocidadX = - 5
}

function moverAbajo(){ //asigna o compara valor.
    mascotaDelJugadorObjeto.velocidadY = 5
}

function moverArriba(){ //asigna o compara valor.
    mascotaDelJugadorObjeto.velocidadY = -5
}

function detenerMovimiento(){ //asigna o compara valor.
    mascotaDelJugadorObjeto.velocidadY=0
    mascotaDelJugadorObjeto.velocidadX =0
}

function obtenerObjetoMascota(){ //asigna o compara valor.
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador== mokepones[i].nombre){
            return mokepones[i]
        } 
    }
}


function iniciarMapa(){
    mascotaDelJugadorObjeto = obtenerObjetoMascota(mascotaJugador)

    intervalo = setInterval(pintarCanvas,50)
    //el canvas se repite de manera infinita por el setInterval
    //porque esta dentro de un contexto.
    console.log(intervalo);
    
    ///no se como es que resulta 5.
    
    //el resultado de una funcion, devuelve un numero aleatorio menor a 5.
    //de donde saca ese puto < 6
    //tendremos que hacer un recuento de todas las funciones

    
    window.addEventListener('keyup', detenerMovimiento)
    window.addEventListener('keydown',SePresionoUnaTecla)
}




function SePresionoUnaTecla(event){
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break;
        case 'ArrowDown':
                moverAbajo()
             break;
        case 'ArrowLeft':
                moverIzquierda()
                break;
        case 'ArrowRight':
            moverDerecha()
                break;
        default:
            break;
    }
}

function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y+enemigo.alto
    const derechaEnemigo = enemigo.x+enemigo.ancho
    const izquierdaEnemigo = enemigo.x
    const arribaMascota = mascotaDelJugadorObjeto.y
    const abajoMascota = mascotaDelJugadorObjeto.y+mascotaDelJugadorObjeto.alto
    const derechaMascota = mascotaDelJugadorObjeto.x+mascotaDelJugadorObjeto.ancho
    const izquierdaMascota = mascotaDelJugadorObjeto.x


    if (abajoMascota<arribaEnemigo||   
        arribaMascota>abajoEnemigo||
        derechaMascota<izquierdaEnemigo||
        izquierdaMascota>derechaEnemigo
        
        ) {
            return
        
    }
    detenerMovimiento()
    clearInterval(intervalo)
    console.log('se deecto una colision');
    enemigoId = enemigo.id
    //3er pagina para elegir el ataque.
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display='none'
    seleccionarMascotaEnemigo(enemigo)
}

//30 funciones. 1 clase.
/* 
seleccionarMascotaJugador: seleccionarMokepon() - extraerAtaques() - iniciarMapa()
revisionColision: detenerMovimiento() - clearInterval() - seleccionarMascotaEnemigo() 

extraerAtaques: mostrarAtaques()
secuenciaAtaque: enviarAtaques()
seleccionarMascotaEnemigo: secuenciaAtaque()
ataqueAleatorioEnemigo: iniciarPelea()
iniciarPelea: combate()
combate: revisarVidas()
pintarCanvas: revisarColision()
*/

//d428673d197257ed9ab6b6d74dd979e1ef2a314e - existen formas de colisionar con otros jugadores en local. 

/* 
sectionReiniciar = reiniciar
sectionSeleccionarAtaque = seleccionar-ataque
sectionVerMapa = ver-mapa 
*/ //


//funcion crearMensaje - iniciarJuego. tienen 2 funciones extranges.

//9cfe46d589962924be0628ffd51cc4a4b5d4ad20 - fetch. 



/* ---buscar con un log, todos los resultados de estas funciones
iniciarJuego - 
unirseAlJuego -
seleccionarMascotaJugador - 
seleccionarMokepon -
extraerAtaques
mostrarAtaques
secuenciaAtaque
enviarAtaque
obtenerAtaques
seleccionarMascotaEnemigo
ataqueAleatorioEnemigo
iniciarPelea
indexAmbosOponentes
combate
revisarVidas
crearMensajeFinal
reiniciarJuego
crearMensaje
aleatorio
pintarCanvas
enviarPocision
moverDerecha
moverIzquierda
moverAbajo
moverArriba
detenerMovimiento
obtenerObjetoMascota
iniciarMapa
sePresionoUnaTecla
revisarColision */