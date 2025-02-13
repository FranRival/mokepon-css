const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonFuego = document.getElementById('boton-fuego')
const botonAgua = document.getElementById('boton-agua')
const botonTierra = document.getElementById('boton-tierra')
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


let mokepones = []
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3
let ataqueJugador
let opcionDeMokepon
let inputHipodoge
let inputCapipepo
let inputRatigueya



class Mokepon{
    constructor (nombre, foto, vida){
        this.nombre=nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}



let hypodogue = new Mokepon('Hipodoge', 'https://images2.imgbox.com/72/4f/FtMeIIbY_o.png', 5)
let capipepo = new Mokepon('Capipepo', 'https://images2.imgbox.com/b3/45/k2jgVjyd_o.png', 5)
let ratigueya = new Mokepon('Ratigueya', 'https://images2.imgbox.com/f3/e9/w1BQtPQL_o.png', 5)

hypodogue.ataques.push(
    {nombre: '🧊', id:"boton-agua"},
    {nombre: '🧊', id:"boton-agua"},
    {nombre: '🧊', id:"boton-agua"},
    {nombre: '🔥', id:"boton-fuego"},
    {nombre: '🌱', id:"boton-tierra"},
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

mokepones.push(hypodogue,capipepo,ratigueya)


function iniciarJuego (){//no se para que works
    sectionSeleccionarAtaque.style.display = 'none'

    

        mokepones.forEach((mokepon) =>{
        opcionDeMokepon = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for="${mokepon.nombre}">
            <p>${mokepon.nombre}</p>
            <img src="${mokepon.foto}" alt="${mokepon.nombre}">
        </label>
        `
        contenedorTarjetas.innerHTML+=opcionDeMokepon
        ///console.log(opcionDeMokepon);//inyecta los mokepones mas la imagen y el alt de los 3 mokepones

        //ubicacion en el DOM + contenedorTarjetas, donde se inyecta la informacion.

        //no se inyeta de manera normal. se utiliza un js + un dom. 
    }) 



    function seleccionarMascotaJugador(){
        sectionSeleccionarAtaque.style.display = 'flex'
        sectionSeleccionarMascota.style.display = 'none'

    let inputHipodoge = document.getElementById("Hipodoge")
    let inputCapipepo = document.getElementById("Capipepo")
    let inputRatigueya = document.getElementById("Ratigueya")
    
        if (inputHipodoge.checked){
            spanMascotaJugador.innerHTML ="Hipodoge"
        }else if (inputCapipepo.checked){
            spanMascotaJugador.innerHTML ="Capipepo"
        } else if (inputRatigueya.checked){
            spanMascotaJugador.innerHTML ="Ratigueya"
        }else {
            alert ("Tienes que selecionar")
        }
        seleccionarMascotaEnemigo()
    }
    
    sectionReiniciar.style.display = 'none'

      botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

      botonFuego.addEventListener('click', ataqueFuego)
      botonAgua.addEventListener('click' , ataqueAgua)
      botonTierra.addEventListener('click', ataqueTierra)

      botonReiniciar.addEventListener('click', reiniciarJuego)
}


window.addEventListener('load',iniciarJuego)





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



function crearMensaje (resultado){ //se ejecuta cada que se elige el ataque. 
    console.log('se repite cada');
    
    let nuevoAtaqueDelJugador = document.createElement('p')
    //fuego, agua, tierra
    let nuevoAtaqueDelEnemigo = document.createElement('p')
    //agua, tierra, fuego
    
    

    sectionMensajes.innerHTML = resultado //ganaste - perdiste
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo
    
    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}


function combate (){
    if(ataqueEnemigo==ataqueJugador){
        crearMensaje('Empate')
        console.log('Sentado en silencio');
       } else if (ataqueJugador == 'Fuego' && ataqueEnemigo == 'Tierra'){
        crearMensaje("Ganaste")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
       } else if (ataqueJugador == 'Agua' && ataqueEnemigo == 'Fuego'){
        crearMensaje("Ganaste")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
       } else if (ataqueJugador == 'Tierra' && ataqueEnemigo == 'Agua'){
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

function revisarVidas (){
    if (vidasEnemigo==0){
        crearMensajeFinal("Felicitaciones, ganaste 🎈")
    }else if (vidasJugador==0){
        crearMensajeFinal("Perdiste. 🎃")
    }
}

function crearMensajeFinal (resultadoFinal){
    sectionMensajes.innerHTML = resultadoFinal
    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true
    sectionReiniciar.style.display = 'block'
    console.log('cunt');
    
}


function aleatorio (min, max){
    return Math.floor(Math.random()*(max-min +1)+ min)
}

function seleccionarMascotaEnemigo(){
    let mascotaAleatoria = aleatorio (1,3)
    if (mascotaAleatoria==1){
        spanMascotaEnemigo.innerHTML='Hipodoge'
    }else if (mascotaAleatoria==2){
        spanMascotaEnemigo.innerHTML='Capipepo'
    }else if (mascotaAleatoria==3){
        spanMascotaEnemigo.innerHTML='Ratigueya'
    }
}


//aparecera de forma infinita hasta que se acaben las vidas.
//porque se repite de forma infinita?


