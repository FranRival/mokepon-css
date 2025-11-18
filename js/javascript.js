
window.addEventListener('load',iniciarJuego) //desde aqui comienza el juego.

let ataqueJugador
//window.addEventListener -> iniciarJuego -> seleccionarMascotaJugador -> seleccionarMascotaEnemigo -> Aleatorio
//..-> ataqueFuego | ataqueAgua | ataqueTierra
//...
//ataqueFuego | ataqueAgua | ataqueTierra -> ataqueAleatorioEnemigo -> combate -> crearMensaje -> revisarVidas -> crearMensajeFinal
//..reiniciarJuego


/*
//window.addEventListener 
    -> iniciarJuego 

-> seleccionarMascotaJugador 

-> seleccionarMascotaEnemigo 
    -> Aleatorio   (elige mascota enemiga)

// aquí el juego espera ataques del jugador

..-> ataqueFuego | ataqueAgua | ataqueTierra

// Al elegir un ataque:

ataqueFuego | ataqueAgua | ataqueTierra 
    -> ataqueAleatorioEnemigo 
    -> combate 
    -> crearMensaje 
    -> revisarVidas 
        -> crearMensajeFinal (si vidas llegan a 0)

..reiniciarJuego

*/

//**total de interacciones
// 3 obligatorias
// 2 opcionales.
//  */

function iniciarJuego (){
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque').style.display = 'none'
    //boton de ataque - no visible

    let sectionReiniciar = document.getElementById('reiniciar').style.display = 'none'
    //boton de reiniciar - no visible

     let botonMascotaJugador = document.getElementById('boton-mascota')
     //boton seleccionar
      botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
      //inicializacion + funcion seleccionarMascotaJugador


      //botones seleccionados
      let botonFuego = document.getElementById('boton-fuego')
      botonFuego.addEventListener('click', ataqueFuego)
      let botonAgua = document.getElementById('boton-agua')
      botonAgua.addEventListener('click' , ataqueAgua)
      let botonTierra = document.getElementById('boton-tierra')
      botonTierra.addEventListener('click', ataqueTierra)


      let botonReiniciar = document.getElementById('boton-reiniciar')
      botonReiniciar.addEventListener('click', reiniciarJuego)
}



function seleccionarMascotaJugador(){
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque').style.display = 'block'

    let sectionSeleccionarMascota = document.getElementById('seleccionar-mascota').style.display = 'none'

    let inputHypodoge = document.getElementById('hypodoge')
    let inputCapipepo = document.getElementById('capipepo')
    let inputRatigueya = document.getElementById('ratigueya')
    let spanMascotaJugador = document.getElementById ('mascota-jugador')

    if (inputHypodoge.checked){
        spanMascotaJugador.innerHTML = 'Hypodoge'
    }else if (inputCapipepo.checked){
        spanMascotaJugador.innerHTML = 'Capipepo'
    } else if (inputRatigueya.checked){
        spanMascotaJugador.innerHTML = 'Ratigueya'
    }else {
        alert ("Tienes que selecionar")

    }
    seleccionarMascotaEnemigo()
    
}

function reiniciarJuego(){
    location.reload()
}

function ataqueFuego (){
    ataqueJugador='Fuego'
    ataqueAleatorioEnemigo ()
}

function ataqueAgua (){
    ataqueJugador='Agua'
    ataqueAleatorioEnemigo()
}

function ataqueTierra(){
    ataqueJugador='Tierra'
    ataqueAleatorioEnemigo()
}


function ataqueAleatorioEnemigo (){
    let ataqueAleatorio = aleatorio(1,3)

    if (ataqueAleatorio == 1){
        ataqueEnemigo = 'Fuego'

    }else if (ataqueAleatorio == 2){
        ataqueEnemigo = 'Agua'

    }else if (ataqueAleatorio == 3){
        ataqueEnemigo = 'Tierra'
    }
    combate()
}

let ataqueEnemigo




function combate (){
    let spanVidasEnemigo = document.getElementById('vidas-enemigo')
    let spanVidasJugador = document.getElementById('vidas-jugador')


    if(ataqueEnemigo==ataqueJugador){
        crearMensaje('Empate')
       } else if (ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA'){
        crearMensaje("Ganaste")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
       } else if (ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO'){
        crearMensaje("Ganaste")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
       } else if (ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA'){
        crearMensaje("Ganaste")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML= vidasEnemigo
       }else {
        crearMensaje ("Perdiste")
        vidasJugador --
        spanVidasJugador.innerHTML = vidasJugador
       }
       revisarVidas()
}


function crearMensaje (resultado){
    let sectionMensajes = document.getElementById('mensajes')


    let parrafo = document.createElement('p')
    parrafo.innerHTML = 'Tu mascota ataco con ' + ataqueJugador + ', la mascota del enemigo ataco con ' + ataqueEnemigo + ' - ' + resultado

    sectionMensajes.appendChild(parrafo)
}


function revisarVidas (){
    if (vidasEnemigo==0){
        crearMensajeFinal("Felicitaciones, ganaste 🎈")
    }else if (vidasJugador==0){
        crearMensajeFinal("Perdiste. 🎃")

    }
}

function crearMensajeFinal (resultadoFinal){
    let sectionMensajes = document.getElementById('mensajes')


    let parrafo = document.createElement('p')
    parrafo.innerHTML = resultadoFinal
    sectionMensajes.appendChild(parrafo)


    let botonFuego = document.getElementById('boton-fuego')
    botonFuego.disabled = true
    let botonAgua = document.getElementById('boton-agua')
    botonAgua.disabled = true
    let botonTierra = document.getElementById('boton-tierra')
    botonTierra.disabled = true

    let sectionReiniciar = document.getElementById('reiniciar').style.display = 'block'
}




let vidasJugador = 3
let vidasEnemigo = 3




function aleatorio (min, max){
    return Math.floor(Math.random()*(max-min +1)+ min)
}

function seleccionarMascotaEnemigo(){
    let mascotaAleatoria = aleatorio (1,3)
    let spanMascotaEnemigo = document.getElementById('mascota-enemigo')

    if (mascotaAleatoria==1){
        spanMascotaEnemigo.innerHTML='Hipodoge'
    }else if (mascotaAleatoria==2){
        spanMascotaEnemigo.innerHTML='Capipepo'
    }else if (mascotaAleatoria==3){
        spanMascotaEnemigo.innerHTML='Ratigueya'
    }
}





