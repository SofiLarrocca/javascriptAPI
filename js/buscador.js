// BUSCAR PERSONAJES
const buscador = document.getElementById ('buscador')

buscador.addEventListener ('keyup', ()=> { 
    buscarPersonaje()
})

function buscarPersonaje (data) { 
    // Capto el valor ingresado en el buscador 
    let nombreBuscado = buscador.value.toLowerCase()

    // Muestro en HTML aquellos productos que coincidan con el texto ingresado en buscador
    let nombreFiltrado = data.filter((nombre) => nombre.character.toLowerCase().includes(nombreBuscado))
    console.log (nombreBuscado)
}

