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

//para que dickenson son los 3 puntos?

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

        console.log('1');
        

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
    console.log('2');
    
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
        console.log('3');
        

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
    console.log('4');
    
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
    console.log('5');
    
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
    console.log('6');
    
    let mascotaAleatoria = aleatorio (0,mokepones.length -1)
    spanMascotaEnemigo.innerHTML= mokepones[mascotaAleatoria].nombre
    ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo (){
    console.log('7');
    
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
    console.log('8');
    
    if (ataqueJugador.length===5) {
        combate()   
    }
}



function indexAmbosOponente(jugador, enemigo){
    console.log('9');
    
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}


//el programa vuelve a ejecutar el codigo por cada eleccion de boton de ataque. 

function combate (){
    console.log('10');
    
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



function revisarVidas (){
    console.log('11');
    
    if (victoriasJugador===victoriasEnemigo){
        crearMensajeFinal("Esto fue un empate!!!")
    }else if (victoriasJugador>victoriasEnemigo){
        crearMensajeFinal("Felicitaciones, ganaste 🎈")
    }else {
        crearMensajeFinal("Perdiste. 🎃")
    }
}

function crearMensajeFinal (resultadoFinal){ 
    console.log('12');
    
    sectionMensajes.innerHTML = resultadoFinal
    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true
    sectionReiniciar.style.display = 'block'
}



window.addEventListener('load',iniciarJuego)


function reiniciarJuego(){ //asigna o compara valor.
    location.reload()
    console.log('13');
}



function crearMensaje (resultado){ 
    console.log('14');
    
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
    console.log('15');
    return Math.floor(Math.random()*(max-min +1)+ min)
}



function pintarCanvas(){
    console.log('16');
    

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
    console.log('17');
    
}

function moverIzquierda(){//asigna o compara valor.
    mascotaDelJugadorObjeto.velocidadX = - 5
    console.log('18');
    
}

function moverAbajo(){ //asigna o compara valor.
    mascotaDelJugadorObjeto.velocidadY = 5
    console.log('19');
    
}

function moverArriba(){ //asigna o compara valor.
    mascotaDelJugadorObjeto.velocidadY = -5
    console.log('20');
    
}

function detenerMovimiento(){ //asigna o compara valor.
    mascotaDelJugadorObjeto.velocidadY=0
    mascotaDelJugadorObjeto.velocidadX =0
    console.log('21');
    
}

function obtenerObjetoMascota(){ //asigna o compara valor.
    console.log('22');
    
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador== mokepones[i].nombre){
            return mokepones[i]
        } 
    }
}


function iniciarMapa(){
    console.log('23');
    
    mascotaDelJugadorObjeto = obtenerObjetoMascota(mascotaJugador)

    //no se where sale el 5 y 6. de que funcion.
    intervalo = setInterval(pintarCanvas,50)
    window.addEventListener('keyup', detenerMovimiento)
    window.addEventListener('keydown',SePresionoUnaTecla)
}




function SePresionoUnaTecla(event){
    console.log('24');
    
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
    console.log('25');
    
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

//17-11-25
//creamos el flujo de los primeros commits.

//***hasta este commit -714df3728308c92a62271a5a0a5a49b05b5aeab1- el problema de Fuego, Agua, Tierra - AGUA, FUEGO, TIERRA, persiste. 

//CONSTRUCCION DE ARQUITECTURA
//crearMensaje siempre y unicamente es llamada desde combate()
//se ejecuta 3 turnos. 2+ por si hay empates.


//ataqueFuego | ataqueAgua | ataqueTierra -> ataqueAleatorioEnemigo -> combate -> crearMensaje -> revisarVidas

//ataqueJugador y ataqueEnemigo envian datos a crearMensaje
//se comparan dentro de combate. 

//ERROR DE LOGICA
//crearMensaje da: ganaste, perdiste, empate. 
//pero tambien lee variables: ataqueJugador - ataqueEnemigo
//el problem?
//esta funcion tiene codigo mas abajo: let ataqueDelJugador, let ataqueDelEnemigo, nuevoAtaqueDelJugador, nuevoAtaqueDelEnemigo que se ejecutara tambien y no solo el mensaje.
//es un problema logico, hace 2 cosas aunque no las necesita hacer. 
//hace 2 cosas:
//1. muestra el resultado de sectionMensajes: ganaste, perdiste, empate.
//2. registra ataques (jugador y enemigo) creando 2 parrafos.
//ambas utilizan la misma section: = document.getElementById('mensajes')


//9a371d0d20060ba47da3cb48dc8aaca66f2ecbc9 - se sacaron todas las variables internas dentro de las funciones y se volvieron globales. commits antes vimos como cambiar los colores de las tarjetas de los mokepones. 

//llegamos hoy hasta: ee30472b440a7d326dc435a870d37d35761d4365

//ESCALABILIDAD:
/* 
6c60a0fe3e3f4fa1d8fbba7a79b8cd09947f1132 - commit arriba
26f534fae0a793a2325dcbd03ed057839f6f4d08 - commit abajo.
FUNCION: seleccionarMascotaEnemigo <---captura de pantalla.

el de arriba esta funcionando bien. why? 
-entre esos 2 commits no se rompe el codigo, porque en el viejo, manejaba checks. y este nuevo, maneja el array con el indice.
//1. el de arriba manejaba if-else comparando 1-3 mokepones.
//2. el de abajo, el numero total del array -mokepones.length.
mokepones[mascotaAleatoria(1 entre 3)].nombre
es decir, escalabilidad.
*/

//1bf0c469e57d03949f4f2905e4bfd9030303fdca - la funcion de extraerAtaques se la pasa iterando hasta encontrar la variable exacta de la funcion anterior seleccionarMascotaJugador. ese indice de [i] se lleva a la siguiente linea, ataques=mokepones[i].ataques.


/* 
DELETE3
118e971bfadab76ad6acdcdc823fe3aba26d4b81 - el hecho que haya mas de 3 veces el ataque repetido en el array de ataques:

ALEATORIEDAD:
1) no incrementa las posibilidades nuestras. porque el id es el mismo.
2) incrementa la probabilidad de repetir ataque. por math.random
 */

//118e971bfadab76ad6acdcdc823fe3aba26d4b81
//extraerAtaques pasa los valores a mostrarAtaques. y ese parametro es un array...


//33c25096ee72e16aee575ae3ca2e6d9d65125dfd
//la funcion de secuenciaAtaques busca eliminar los getElementById de botonFuego, botonAgua, botonTierra.
