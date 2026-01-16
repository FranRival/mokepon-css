/*************************************************
 * 1. OBSERVABILIDAD / INFRA
 *************************************************/

const STATE = {
    fase: 'init',          // init | seleccion | combate | final
    botones: [],           // entidades botón
    ataqueJugador: [],
    ataqueEnemigo: [],
    vidasJugador: 3,
    vidasEnemigo: 3
}

function log(tag, data) {
    console.group(`🧭 ${tag}`)
    console.log(data)
    console.trace()
    console.groupEnd()
}

function snapshot() {
    console.table(
        STATE.botones.map(b => ({
            uid: b.uid,
            tipo: b.tipo,
            clicks: b.clicks,
            disabled: b.ref.disabled,
            edadMs: Math.round(performance.now() - b.createdAt)
        }))
    )
}

/*************************************************
 * 2. DOM REFERENCES
 *************************************************/

const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')

const spanMascotaJugador = document.getElementById('mascota-jugador')
const spanMascotaEnemigo = document.getElementById('mascota-enemigo')
const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataqueDelJugador = document.getElementById('ataque-del-jugador')
const ataqueDelEnemigo = document.getElementById('ataque-del-enemigo')

const contenedorTarjetas = document.getElementById('contenedor-tarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

sectionReiniciar.style.display = 'none'
sectionSeleccionarAtaque.style.display = 'none'

/*************************************************
 * 3. DOMINIO
 *************************************************/

class Mokepon {
    constructor(nombre, foto, vida) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

const hypodoge = new Mokepon('Hipodoge', 'https://images2.imgbox.com/72/4f/FtMeIIbY_o.png', 5)
const capipepo = new Mokepon('Capipepo', 'https://images2.imgbox.com/b3/45/k2jgVjyd_o.png', 5)
const ratigueya = new Mokepon('Ratigueya', 'https://images2.imgbox.com/f3/e9/w1BQtPQL_o.png', 5)

hypodoge.ataques.push(
    { nombre: '🧊', tipo: 'Agua' },
    { nombre: '🔥', tipo: 'Fuego' },
    { nombre: '🌱', tipo: 'Tierra' }
)

capipepo.ataques.push(
    { nombre: '🌱', tipo: 'Tierra' },
    { nombre: '🧊', tipo: 'Agua' },
    { nombre: '🔥', tipo: 'Fuego' }
)

ratigueya.ataques.push(
    { nombre: '🔥', tipo: 'Fuego' },
    { nombre: '🌱', tipo: 'Tierra' },
    { nombre: '🧊', tipo: 'Agua' }
)

const mokepones = [hypodoge, capipepo, ratigueya]

/*************************************************
 * 4. UI RENDER
 *************************************************/

function iniciarJuego() {
    STATE.fase = 'seleccion'
    contenedorTarjetas.innerHTML = ''

    mokepones.forEach(mokepon => {
        contenedorTarjetas.innerHTML += `
            <input type="radio" name="mascota" id="${mokepon.nombre}">
            <label class="tarjeta-de-mokepon" for="${mokepon.nombre}">
                <p>${mokepon.nombre}</p>
                <img src="${mokepon.foto}">
            </label>
        `
    })

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    log('JUEGO INICIADO', STATE)
}

function seleccionarMascotaJugador() {
    const seleccion = document.querySelector('input[name="mascota"]:checked')

    if (!seleccion) {
        alert('Selecciona una mascota')
        return
    }

    const mascotaJugador = seleccion.id
    spanMascotaJugador.textContent = mascotaJugador

    sectionSeleccionarMascota.style.display = 'none'
    sectionSeleccionarAtaque.style.display = 'flex'

    extraerAtaques(mascotaJugador)
    seleccionarMascotaEnemigo()
}

function extraerAtaques(nombre) {
    const mokepon = mokepones.find(m => m.nombre === nombre)
    mostrarAtaques(mokepon.ataques)
}

function mostrarAtaques(ataques) {
    contenedorAtaques.innerHTML = ''

    ataques.forEach(ataque => {
        contenedorAtaques.innerHTML += `
            <button 
              class="boton-de-ataque BATaque"
              data-tipo="${ataque.tipo}">
              ${ataque.nombre}
            </button>
        `
    })

    inicializarBotones()
}

/*************************************************
 * 5. ENTIDADES BOTÓN (instrumentación)
 *************************************************/

function inicializarBotones() {
    const nodos = document.querySelectorAll('.BATaque')

    STATE.botones = [...nodos].map(nodo => {
        const uid = crypto.randomUUID()
        nodo.dataset.uid = uid

        return {
            uid,
            tipo: nodo.dataset.tipo,
            ref: nodo,
            clicks: 0,
            createdAt: performance.now(),
            history: []
        }
    })

    log('BOTONES CREADOS', STATE.botones)
    bindEventosBotones()
}

function bindEventosBotones() {
    STATE.botones.forEach(entidad => {
        entidad.ref.addEventListener('click', () => {
            manejarClickAtaque(entidad)
        })
    })
}

/*************************************************
 * 6. MOTOR DEL JUEGO
 *************************************************/

function manejarClickAtaque(boton) {
    if (STATE.fase === 'final') return
    if (STATE.ataqueJugador.length >= 5) return

    boton.clicks++
    boton.history.push({
        event: 'click',
        time: performance.now()
    })

    STATE.ataqueJugador.push(boton.tipo)
    ataqueDelJugador.innerHTML += `<p>${boton.tipo}</p>`

    log('CLICK ATAQUE', {
        boton,
        ataqueJugador: STATE.ataqueJugador
    })

    ataqueAleatorioEnemigo()

    if (STATE.ataqueJugador.length === 5) {
        resolverCombate()
    }
}

function seleccionarMascotaEnemigo() {
    const index = aleatorio(0, mokepones.length - 1)
    const enemigo = mokepones[index]
    spanMascotaEnemigo.textContent = enemigo.nombre
    STATE.ataquesEnemigoBase = enemigo.ataques
}

function ataqueAleatorioEnemigo() {
    const index = aleatorio(0, STATE.ataquesEnemigoBase.length - 1)
    const ataque = STATE.ataquesEnemigoBase[index].tipo

    STATE.ataqueEnemigo.push(ataque)
    ataqueDelEnemigo.innerHTML += `<p>${ataque}</p>`

    log('ATAQUE ENEMIGO', {
        ataque,
        ataqueEnemigo: STATE.ataqueEnemigo
    })
}

function resolverCombate() {
    STATE.fase = 'combate'
    log('RESOLVIENDO COMBATE', STATE)

    for (let i = 0; i < 5; i++) {
        const jugador = STATE.ataqueJugador[i]
        const enemigo = STATE.ataqueEnemigo[i]

        if (jugador === enemigo) continue

        if (
            (jugador === 'Fuego' && enemigo === 'Tierra') ||
            (jugador === 'Agua' && enemigo === 'Fuego') ||
            (jugador === 'Tierra' && enemigo === 'Agua')
        ) {
            STATE.vidasEnemigo--
        } else {
            STATE.vidasJugador--
        }
    }

    spanVidasJugador.textContent = STATE.vidasJugador
    spanVidasEnemigo.textContent = STATE.vidasEnemigo

    finalizarJuego()
}

function finalizarJuego() {
    STATE.fase = 'final'
    STATE.botones.forEach(b => b.ref.disabled = true)

    let resultado = 'Empate'
    if (STATE.vidasJugador > STATE.vidasEnemigo) resultado = 'Ganaste 🎉'
    if (STATE.vidasJugador < STATE.vidasEnemigo) resultado = 'Perdiste 💀'

    sectionMensajes.textContent = resultado
    sectionReiniciar.style.display = 'block'

    log('FIN DEL JUEGO', STATE)
}

/*************************************************
 * 7. UTILIDADES
 *************************************************/

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

/*************************************************
 * 8. BOOTSTRAP
 *************************************************/

window.addEventListener('load', iniciarJuego)
