const gridContainer = document.getElementById ('grid-container')
gridContainer.className = 'grid-container'

const consultaApi = () => { 
    const resultado = fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?count=num`)
    .then((response) => response.json())
    .then((data) => { 
            
        // BUSCAR PERSONAJES
            const buscador = document.getElementById ('buscador')
            buscador.addEventListener ('keyup', ()=> { 
                    buscarPersonaje(data)
                })
 
        for (obj of data) { 
            /* PEGO EN CARD NOMBRE, IMG Y FRASE*/
            const gridCard = document.createElement ('div')
            gridCard.className = 'grid-item'
            gridContainer.appendChild(gridCard)
        
            const tituloCard = document.createElement('h2')
            tituloCard.innerText =  `${obj.character}`
            gridCard.appendChild(tituloCard)

            const imgCard = document.createElement('img')
            imgCard.src = `${obj.image}`
            gridCard.appendChild(imgCard)
           


             /*ARRAY DE FRASES SIN REPETIR*/
             let resultado = data.reduce((acc, quote)=>{
                if(!acc.includes(quote)) {
                    acc.push(quote.quote) 
                }  
                return acc;
            },[])

            const fraseCard = document.createElement ('p')
            gridCard.appendChild(fraseCard)
            fraseCard.innerText = `${obj.quote}` 


   
         

        }
    });
}
consultaApi(6);

/*PAGINACIÓN */ 
const anterior = document.getElementById ('anterior')
const siguiente = document.getElementById ('siguiente')

siguiente.addEventListener ('click', ()=> { 
    gridContainer.innerHTML = ``
    consultaApi (6)

})

anterior.addEventListener ('click', ()=> { 
    gridContainer.innerHTML = ``
    consultaApi (6)
})



