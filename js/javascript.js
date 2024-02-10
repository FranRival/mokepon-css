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

class Mokepon {
    constructor (nombre, foto, vida, fotoMapa, x = 10, y = 10){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        //x arriba, estan asi, en un color oscuro comparado con estas de abajo, porque no se estan utilizando. primer hay que instanciarlas. asi cambiaran al mismo color
        this.x = x
        this.y = y
        this.ancho = 40
        this.alto = 40
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX=0
        this.velocidadY=0
    }

    //se copio de la funcion de Canva. y se utiliza this. porque usamos los atributos del objeto que se creo en la clase. se le llama metodos de la clase 
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


let hypodogeEnemigo = new Mokepon('Hipodoge', 'https://images2.imgbox.com/72/4f/FtMeIIbY_o.png', 5, 'https://images2.imgbox.com/77/e6/LGzhLnXN_o.png', 80, 120)
let capipepoEnemigo = new Mokepon('Capipepo', 'https://images2.imgbox.com/b3/45/k2jgVjyd_o.png', 5, 'https://images2.imgbox.com/78/79/uZx0xJgg_o.png', 150, 95)
let ratigueyaEnemigo = new Mokepon('Ratigueya', 'https://images2.imgbox.com/f3/e9/w1BQtPQL_o.png', 5, 'https://images2.imgbox.com/26/83/CO9zxorc_o.png', 200,190)

hypodoge.ataques.push(
    {nombre: '🧊', id:'boton-agua'},
    {nombre: '🧊', id:'boton-agua'},
    {nombre: '🧊', id:'boton-agua'},
    {nombre: '🔥', id:'boton-fuego'},
    {nombre: '🌱', id:'boton-tierra'},
)

capipepo.ataques.push(
    {nombre: '🌱', id:'boton-tierra'},
    {nombre: '🌱', id:'boton-tierra'},
    {nombre: '🌱', id:'boton-tierra'},
    {nombre: '🧊', id:'boton-agua'},
    {nombre: '🔥', id:'boton-fuego'},
)

ratigueya.ataques.push(
    {nombre: '🔥', id:'boton-fuego'},
    {nombre: '🔥', id:'boton-fuego'},
    {nombre: '🔥', id:'boton-fuego'},
    {nombre: '🌱', id:'boton-tierra'},
    {nombre: '🧊', id:'boton-agua'},
)

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

    }) 

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
}


    function seleccionarMascotaJugador(){
       // 
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


        extraerAtaques(mascotaJugador)
       // sectionSeleccionarAtaque.style.display = 'flex'
        iniciarMapa()

        

    }

    function extraerAtaques(mascotaJugador){
        let ataques

        for (let i = 0; i < mokepones.length; i++) {
            if (mascotaJugador== mokepones[i].nombre){
                ataques = mokepones[i].ataques
            } 
        }
        
        mostrarAtaques(ataques)
        
    }


function mostrarAtaques(ataques){
    
    ataques.forEach(ataque => {
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque BATaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })

        botonFuego = document.getElementById('boton-fuego')
        botonAgua = document.getElementById('boton-agua')
        botonTierra = document.getElementById('boton-tierra')
        botones = document.querySelectorAll('.BATaque')

}//



function secuenciaAtaque(){
    botones.forEach((boton) =>{
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
            ataqueAleatorioEnemigo()
        })
    })
}

//probablemente, aqui este el mistake
function seleccionarMascotaEnemigo(){
    let mascotaAleatoria = aleatorio (0,mokepones.length -1)
    spanMascotaEnemigo.innerHTML= mokepones[mascotaAleatoria].nombre
    ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques
    secuenciaAtaque()
    
}

function ataqueAleatorioEnemigo (){

    let ataqueAleatorio = aleatorio(0,mokepones.length -1)
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
    //cuando la longitud sea 5, se va a esperar a que sean 5
    if (ataqueJugador.length===5) {
        combate()   
    }
}



function indexAmbosOponente(jugador, enemigo){
    //
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate (){
    for (let index = 0; index < ataqueJugador.length; index++) {
       //  console.log(ataqueJugador[index])
        if (ataqueJugador[index]===ataqueEnemigo[index]) {
            indexAmbosOponente(index, index)
            crearMensaje('Empate')
            victoriasJugador++
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
    if (victoriasJugador===victoriasEnemigo){
        crearMensajeFinal("Esto fue un empate!!!")
    }else if (victoriasJugador>victoriasEnemigo){
        crearMensajeFinal("Felicitaciones, ganaste 🎈")
    }else {
        crearMensajeFinal("Perdiste. 🎃")
    }
}

function crearMensajeFinal (resultadoFinal){
    sectionMensajes.innerHTML = resultadoFinal
    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true

    sectionReiniciar.style.display = 'block'
}



window.addEventListener('load',iniciarJuego)





function reiniciarJuego(){
    location.reload()
}



function crearMensaje (resultado){
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')


    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    
    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}



function aleatorio (min, max){
    return Math.floor(Math.random()*(max-min +1)+ min)
}



function pintarCanvas(){


    mascotaDelJugadorObjeto.x=mascotaDelJugadorObjeto.x+mascotaDelJugadorObjeto.velocidadX
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
    hypodogeEnemigo.pintarMokepon()
    ratigueyaEnemigo.pintarMokepon()
    capipepoEnemigo.pintarMokepon()


    //todas las macotas inician en la misma pocision del mapa
    if (mascotaDelJugadorObjeto.velocidadX!==0||mascotaDelJugadorObjeto.velocidadY!==0) {
        revisarColision(hypodogeEnemigo)
        revisarColision(capipepoEnemigo)
        revisarColision(ratigueyaEnemigo)
        
    }



}

function moverDerecha(){
    mascotaDelJugadorObjeto.velocidadX = 5
}

function moverIzquierda(){
    mascotaDelJugadorObjeto.velocidadX = - 5
}

function moverAbajo(){
    mascotaDelJugadorObjeto.velocidadY = 5
}

function moverArriba(){
    mascotaDelJugadorObjeto.velocidadY = -5
}

function detenerMovimiento(){
    mascotaDelJugadorObjeto.velocidadY=0
    mascotaDelJugadorObjeto.velocidadX =0
}

function obtenerObjetoMascota(){
    
    //el mismo for de extraerAtaques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador== mokepones[i].nombre){
            return mokepones [i]
        } 
    }
}


function iniciarMapa(){

    mapa.width=320
    mapa.height=240
    mascotaDelJugadorObjeto = obtenerObjetoMascota(mascotaJugador)

    intervalo = setInterval(pintarCanvas,50)
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
    const abajoEnemigo = enemigo.y+enemigo.alto//y es donde se pinta el enemigo
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
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display='none'
    seleccionarMascotaEnemigo(enemigo)
}