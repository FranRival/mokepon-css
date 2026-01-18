const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')

const botonReiniciar = document.getElementById('boton-reiniciar')

const botonMascotaJugador = document.getElementById('boton-mascota')

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasEnemigo = document.getElementById('vidas-enemigo')
const spanVidasJugador = document.getElementById('vidas-jugador')

const sectionMensajes = document.getElementById('resultado')
const ataqueDelJugador = document.getElementById('ataque-del-jugador')
const ataqueDelEnemigo = document.getElementById('ataque-del-enemigo')

const contenedorTarjetas = document.getElementById('contenedor-tarjetas')

const contenedorAtaques = document.getElementById('contenedorAtaques')

sectionReiniciar.style.display = 'none'


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

class Mokepon {
    constructor(nombre, foto, vida) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}



let hypodoge = new Mokepon('Hipodoge', 'https://images2.imgbox.com/72/4f/FtMeIIbY_o.png', 5)
let capipepo = new Mokepon('Capipepo', 'https://images2.imgbox.com/b3/45/k2jgVjyd_o.png', 5)
let ratigueya = new Mokepon('Ratigueya', 'https://images2.imgbox.com/f3/e9/w1BQtPQL_o.png', 5)

hypodoge.ataques.push(
    { nombre: '🧊', tipo: 'Agua', id: 'boton-agua' },
    { nombre: '🔥', tipo: 'Fuego', id: 'boton-fuego' },
    { nombre: '🌱', tipo: 'Tierra', id: 'boton-tierra' },
)

capipepo.ataques.push(
    { nombre: '🌱', tipo: 'Tierra', id: 'boton-tierra' },
    { nombre: '🧊', tipo: 'Agua', id: 'boton-agua' },
    { nombre: '🔥', tipo: 'Fuego', id: 'boton-fuego' },
)

ratigueya.ataques.push(
    { nombre: '🔥', tipo: 'Fuego', id: 'boton-fuego' },
    { nombre: '🌱', tipo: 'Tierra', id: 'boton-tierra' },
    { nombre: '🧊', tipo: 'Agua', id: 'boton-agua' },
)

mokepones.push(hypodoge, capipepo, ratigueya)

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = 'none'
    mokepones.forEach((mokepon) => {
        opcionDeMokepon = `
        <input type="radio" name="mascota" id=${mokepon.nombre}>
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepon

    })

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
}


function seleccionarMascotaJugador() {
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionSeleccionarMascota.style.display = 'none'

    let inputHipodoge = document.getElementById('Hipodoge')
    let inputCapipepo = document.getElementById('Capipepo')
    let inputRatigueya = document.getElementById('Ratigueya')

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    } else {
        alert("Tienes que selecionar")

    }

    extraerAtaques(mascotaJugador)
    seleccionarMascotaEnemigo()

}

function extraerAtaques(mascotaJugador) {
    let ataques

    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador == mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
    }

    mostrarAtaques(ataques)

}


function mostrarAtaques(ataques) {

    ataques.forEach(ataque => {
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque BATaque">${ataque.nombre}" data-tipo="${ataque.tipo}">${ataque.nombre}</button>
        `

        contenedorAtaques.innerHTML += ataquesMokepon
    })

    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')
    botones = document.querySelectorAll('.BATaque')

    secuenciaAtaque()
}


function secuenciaAtaque() {


    botones.forEach((boton) => {
        boton.addEventListener('click', (Event) => {
            console.log(Event)
            if (Event.target.textContent === '🔥') {
                ataqueJugador.push('Fuego')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
            } else if (Event.target.textContent === '🧊') {
                ataqueJugador.push('Agua')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
            } else {
                ataqueJugador.push('Tierra')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
            }
            ataqueAleatorioEnemigo()
        })
    })//logica fragil.
    //en delete7 ya no se usa el if. solo se guarda el ataque.
    //aqui es lo mismo. decide cual es el emoji, y asigna el ataque.
    //y lo guarda...
}


function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(0, mokepones.length - 1)
    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre
    ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques
}

function ataqueAleatorioEnemigo() {
    let indice = aleatorio(0, ataquesMokeponEnemigo.length - 1)
    let ataque = ataquesMokeponEnemigo[indice].nombre


    if (ataque === '🔥') {
        ataqueEnemigo.push('Fuego')
    } else if (ataque === '🧊') {
        ataqueEnemigo.push('Agua')
    } else {
        ataqueEnemigo.push('Tierra')
    }

    console.log(ataqueEnemigo)
    iniciarPelea()

}

function iniciarPelea() {
    //cuando la longitud sea 5, se va a esperar a que sean 5
    if (ataqueJugador.length === 5) {
        combate()
    }
}


function combate() {
    let ataqueJugadorActual = ataqueJugador[ataqueJugador.length - 1]
    let ataqueEnemigoActual = ataqueEnemigo[ataqueEnemigo.length - 1]



    if (ataqueEnemigoActual == ataqueJugadorActual) {
        crearMensaje('Empate')
    } else if (ataqueJugadorActual == 'Fuego' && ataqueEnemigoActual == 'Tierra') {
        crearMensaje("Ganaste")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if (ataqueJugadorActual == 'Agua' && ataqueEnemigoActual == 'Fuego') {
        crearMensaje("Ganaste")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if (ataqueJugadorActual == 'Tierra' && ataqueEnemigoActual == 'Agua') {
        crearMensaje("Ganaste")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else {
        crearMensaje("Perdiste")
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
    }
    revisarVidas()
}

function revisarVidas() {
    if (vidasEnemigo == 0) {
        crearMensajeFinal("Felicitaciones, ganaste 🎈")
    } else if (vidasJugador == 0) {
        crearMensajeFinal("Perdiste. 🎃")

    }
}

function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal
    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true

    sectionReiniciar.style.display = 'block'
}



window.addEventListener('load', iniciarJuego)





function reiniciarJuego() {
    location.reload()
}



function crearMensaje(resultado) {
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')


    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador[ataqueJugador.length - 1]
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo[ataqueEnemigo.length - 1]



    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}



function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}



//este codigo tiene un error de ataques infinitos.
//no hay un tope de cantidad de ataques
//ChatGPT me dice que es una coincidencia de diseno.
//historial muerto = arrays. la lista de los ataques.
//los anteriores ataques no participan mas.

//el turno no esta en el array. esta en una sola linea:

/*
let ataqueJugadorActual = ataqueJugador[ataqueJugador.length - 1]
let ataqueEnemigoActual = ataqueEnemigo[ataqueEnemigo.length - 1]
*/
//cada click: representa un 1 turno - genere 1 ataque de jugador - genera 1 ataque del enemigo - ejecuta 1 combate.


//actual estado del array:
//nunca se vacian los arrays de ataqueJugador y ataqueEnemigo
//crecen de manera infinita
//guarda un historial que ya no se usa
//el combate solo es el ultimo ataque

//esta linea esta mal
//aleatorio(0, mokepones.length - 1) en ataqueAleatorioEnemigo.
//mokepones.length es la cantidad de animales. no de ataques.
//a profundidad: esa linea da 3. pero menos 1, da 2. asi es como se elige el ataque del enemigo.
//mi opcion esta wrong: mokepones[ataques].length. ya que ataques no es un indice. es un array

//esta lleno de basura la pantalla:
//nuevoAtaqueDelJugador.innerHTML = ataqueJugador[i].ataque
//esta linea esta mal.
//resuelto...


//error de sobrecarga del boton de los eventListener. multiples veces al mismo boton. 
//es simple: si una funcion que se puede ejecutar mas de una vez agrega addEventListener, esta mal. 

//mostrarAtaques se agrego el ataque.tipo.porque... el sistema de ataues depende leer los emojis en el dom. ademas de eliminar los ataques extra

//reestructurando secienciaAtaque
//el tipo actual (codigo agrgado a delete7) no interviene en el codigo real. el problema, es que estamos usando el emoji como identificador de ataque. cuando debemos usar el tipo.

//
//es un error. en secuenciaAtaque hay un emoji de fuego. 🔥. dentro de los <>. cuando deberia estar fuera de ellos. 
//toda funcion que no devuelva un return sera automaticamente undefined.
//mostrarAtaques tenia un error. ese emoji volvia un undefined a la funcion de secuenciaAtaque. data-tipo era undefined. porque el navegador leia el emoji. y el resto que estuviera luego de ese emoji, seria undefined. 
//"el navegador no entiende emojis como atributos. entra el <error recovery>"


//ERROR RECOVERY: sigue funcionando aunque la informacion este incorrecta, incompleta o currupta. 

//aislarlo. se pueden crear funciones para decir que lo esta aislando. 
//sin error recovery internet se caeria. 
//CAPA 1: Error Recovery
//CAPA 2: Coercion y tolerancia
//CAPA 3: Fallbacks silenciosos
//CAPA 4: Propagacion automatica 
//CAPA 5: Scope y hoisting
//CAPA 6: Event loop y asincronia 

//se eliminaron las variables globales de let inputHipodoge, i, imputRatigueya
//se elimino el id=${ataque.id}


///eliminamos los botones de botonFuego, botonAgua, botonTierra.

//cambiando codigo de la funcion. por un event.tarjet.dataset.tipo

//OBSERVABILIDAD - branch -> delete7A 
//porque???
//DEVOPS - un sistema que no se puede observar, no se puede mejorar ni mantener. 
//perfiles Backend - devops - arquitectura - sistemas distribuidos - trabajo remoto internaiconal - calidad de ingenieria

//infraestructura - STATE central - 
//prioridad a tiktaks... malo....


//observabilidad. entraremos con ello tomorrow...