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


let mokepones = []
let ataqueEnemigo
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

class Mokepon {
    constructor (nombre, foto, vida){
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
//empujamos la informacion de 3 nombres, y los volvemos mokepones


function iniciarJuego (){
    sectionSeleccionarAtaque.style.display = 'none'

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
}


    function seleccionarMascotaJugador(){
        sectionSeleccionarAtaque.style.display = 'flex'
        sectionSeleccionarMascota.style.display = 'none'

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
        seleccionarMascotaEnemigo()

    }//relacionamos los botones de los 3 mokepones. 
    //verificamos cual ha sido chequeado. 
    //extraemos los ataques
    //el resultado de la funcion de extraerAtaques

    //da entre 1 - 3 a la mascotaJugador.
    function extraerAtaques(mascotaJugador){
        let ataques

        for (let i = 0; i < mokepones.length; i++) {
            //de 1 a 3, 
            //i, a la longitud que haya llegado, dame el nombre
            //y establece ataques, a ese lugar. y dame el ataque
            if (mascotaJugador== mokepones[i].nombre){
                ataques = mokepones[i].ataques
    //arreglo: y le damos un numero I: nos va a regresar los datos que esten en ese indice. 
    //pero nos regresara el elemento completo, pero solo queremos el .nombre
            } 
        }
        
        mostrarAtaques(ataques)
        
    }//ya tenemos el ataque, y lo enviamos a la funcion de mostrarAtaques




//fuego, agua, tierra
function mostrarAtaques(ataques){
    //fuego, agua, tierra
    
    ataques.forEach((ataque, index) => {
        //vas a recorrer cada boton de mokepon, y le vas a asignar un nombre, id, ataque. 
        ataquesMokepon = `
        <button id=${ataque.id}-${index} class="boton-de-ataque BATaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })


    //este ocdigo puede ser eliminado?

        botones = document.querySelectorAll('.BATaque')

}//el index es escalable. si se tienen 1 o 1k ataques.



function secuenciaAtaque(){


    botones.forEach((boton) =>{
        boton.addEventListener('click',(Event) => {
            console.log(Event)
            if (Event.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
            }else if (Event.target.textContent === '🧊'){
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
            }else{
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'

                
            }
            ataqueAleatorioEnemigo()
        })
                
    })


}


function seleccionarMascotaEnemigo(){
    let mascotaAleatoria = aleatorio (0,mokepones.length -1)
    spanMascotaEnemigo.innerHTML= mokepones[mascotaAleatoria].nombre
    secuenciaAtaque()
    
}


/* iniciarJuego - si
seleccionarMascotaJugador - si
               extraerAtaques (mascotaJugador) - si
                                         mostrarAtaques(ataques)

               seleccionarMascotaEnemigo - si
                                        secuenciaAtaque - si

en donde esta la opcion de entrar en combate? 
donde se ligaron los botones con el ataque?

ataqueAleatorioEnemigo -  */

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)



window.addEventListener('load',iniciarJuego)





function reiniciarJuego(){
    location.reload()
}


//me parece que el error esta en que no se llama a la funcion de ataqueAleatorioEnemigo

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


function combate (){
    if(ataqueEnemigo==ataqueJugador){
        crearMensaje('Empate')
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
}




function crearMensaje (resultado){
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')


    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo

    
    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}



function aleatorio (min, max){
    return Math.floor(Math.random()*(max-min +1)+ min)
}


//el error del segundo y tercer boton que aun continuan funcionando es porque se deshabilita el boton. pero al compartir el mismo ID, solo funciona con el primero. los demas pasan desapaercibidos. 
//estructura, por cada ataque, hay 3 botones repetidos y 2 diferentes. 


//las arrow funcion necesitan ser encerrados sus parametros cuando hay 0. 0 mas de 2 valores. 

//se eliminan los botones porque ya no estan en el DOM

//esto es lo que entiendo. comienza con la fucnion de iniciarJuego. entonces hay un click en un boton. y esa, llama a selecionarMascotaJuegador. ese click, es elegir el mokepon. lo que desata la ejecucion de esa funcion. y esa funcion comienza el flujo natural del juego.