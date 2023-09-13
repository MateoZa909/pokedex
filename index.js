const listaPokemon = document.querySelector('#listaPokemon');
const botonsHeader = document.querySelectorAll('.btn-header')
const URL = 'https://pokeapi.co/api/v2/pokemon/';



function showPokemon(poke) {

    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    let pokeID = poke.id.toString();
    if (pokeID.length === 1) {
        pokeID = '#00' + pokeID
    } else if (pokeID.length === 2) {
        pokeID = '#0' + pokeID;
    }

    const div = document.createElement('div')
    div.classList.add('pokemon')
    div.innerHTML = `
        <p class="pokemon-id-back">${poke.id}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="pikachu">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <div class="pokemon-id">${pokeID}</div>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}m</p>
                <div class="stat">${poke.weight}kg</div>
            </div>
        </div>
    `
    listaPokemon.append(div);
}

botonsHeader.forEach(boton => boton.addEventListener('click', (event) => {
    const botonID = event.currentTarget.id;

    listaPokemon.innerHTML = '';

    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {
                const tipos = data.types.map(type => type.type.name);

                if (botonID === 'ver-todos') {
                    showPokemon(data)
                } else {
                    if (tipos.some(tipo => tipo.includes(botonID))) {
                        showPokemon(data);
                    }
                }
            });
    }
}))