const container = document.getElementById('grid-container')
const characterPag = 6
let indexPag = 1
const character = []

const numberPag = document.getElementById('indexPag')
const buttonPrev = document.getElementById('buttonPrev')
const buttonNext = document.getElementById('buttonNext')

const buttonSearch = document.getElementById('buttonSearch')


const consultaAPI = () => {
fetch ("https://thesimpsonsquoteapi.glitch.me/quotes?count=50")
.then((res) => res.json())
.then((res)=> { 
    deleteDuplicate(res)
    renderHTML(character[indexPag-1])
    if (indexPag === 1) { 
        buttonPrev.disabled = true
    }
})
}

//FUNCIONES
// Filtrar repetidos
const deleteDuplicate = (res) => { 
    let hash = {};
    let newRes = res.filter((e)=> { 
        let exist = !hash[e.character]
        hash[e.character] = e.character
  
        return exist
    })
    Paginacion(newRes)
}


// Paginación
const Paginacion = (newRes) => {
    for (let i = 0; newRes.length > 0; i++) {
        let splice = newRes.splice(0,6)
        character.push(splice)
    }
}

// Mostrar contenido en Pagina
const renderHTML = (character) => { 
    character.forEach((e) => {
        let html = document.createElement('div')
        html.className = 'grid-item'
        html.innerHTML = `
        <h1>${e.character}</h1>
        <img src='${e.image}' class='img-card' />
        <p>${e.quote}</p>
        `
        container.appendChild(html)
    })
}


// EVENTOS

buttonPrev.addEventListener ('click', ()=> { 
    if (indexPag > 1) { 
        container.innerHTML = ''
        indexPag--
        renderHTML(character[indexPag])
        buttonNext.disabled = false
        numberPag.innerText = indexPag
    } else {
        buttonPrev.disabled = true
    } 
})

buttonNext.addEventListener ('click', ()=> { 
    if (indexPag < character.length -1) {
        container.innerHTML = ''
        indexPag++
        renderHTML(character[indexPag])
        buttonPrev.disabled = false
        numberPag.innerText = indexPag
    } else { 
        buttonNext.disabled = true
    }
})


buttonSearch.addEventListener ('keyup', ()=> { 
    if (buttonSearch.value.length === 0) { 
        container.innerHTML =''
        consultaAPI()
    } else {
     fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?character=${buttonSearch.value}`)
    .then ((res)=> res.json())
    .then((res)=> { 
        let hash = {};
        let newResFilter = res.filter((e)=> { 
        let exist = !hash[e.character]
        hash[e.character] = e.character
  
        return exist
    })
        container.innerHTML = ''
        renderHTML(newResFilter)
    }) 
}
})


consultaAPI ()