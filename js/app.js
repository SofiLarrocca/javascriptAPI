const gridContainer = document.getElementById ('grid-container')
gridContainer.className = 'grid-container'
const buscador = document.getElementById('buscador')

let personajes = []

const consultaAPI = () => { 
    const resultado = fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?count=50`)
    .then((response) => response.json())
    .then((data) => { 
        personajes = data.filter ((e)=> {
            if (!personajes.includes (e.quote)) { 
                personajes.push(e)
            }
            renderHTML (personajes);
        }) 
    });
}


const renderHTML = (personajes) => { 
    let html = ""
    for (let i=0; i < personajes.length; i++) { 
        html += `<div class="grid-item">
        <h1>${personajes[i].character}</h1>
        <img src="${personajes[i].image}" class"img-card"</img>
        <p>${personajes[i].quote}</p>
        </div>`
    }
    gridContainer.innerHTML = html;
}


buscador.addEventListener("keyup", ()=> {
    fetch(
      `https://thesimpsonsquoteapi.glitch.me/quotes?count=6&character=`+buscador.value 
    ).then(function (data) {
      data.json().then(function (response) {
        renderHTML(response);
        console.log (buscador.value)
      });
    });
  });


consultaAPI()




