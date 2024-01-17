// Fetch
//
// POST

const BASE_URL = 'https://pokeapi.co/api/v2/';
const getPokemon = document.getElementById("get-btn");
const card = document.querySelector(".card--container");
const previous = document.getElementById('previous-btn')
const next = document.getElementById('next-btn')

let currentPokemonIndex = 0;




// Fetch no async
/*
fetch(BASE_URL + 'pokemon/ditto')
    .then(res => res.json())
    .then(data => console.log(data));
*/
// fetch async

const fetchPokemon = async (pokemon) => {
    try {
        const response = await fetch(`${BASE_URL}pokemon/${pokemon}`);
        const parsedResponse = await response.json();
        return parsedResponse;
    } catch (err) {
        console.error(err);
    }
}



    

const createPokemonCard = (pokemon) => {
    const pokemonName = document.createElement("p");
    const pokemonID = document.createElement("p");
    const pokemonWeight = document.createElement("p");
    const pokemonImage = document.createElement("img");

    pokemonName.innerHTML = 'Name : ${pokemon.name}';
    pokemonID.innerHTML = ' ID : ${pokemon.id}';
    pokemonWeight.innerHTML = 'Weight : ${pokemon.weight}';
    pokemonImage.src = pokemon.sprites.front_default;

    card.innerHTML = "";

    card.appendChild (pokemonImage);
    card.appendChild (pokemonID);
    card.appendChild (pokemonName);
    card.appendChild (pokemonWeight);


};

const saveOnLocalStorage = (pokemon) => {
    const pokemonID = pokemon.id;
    //Recuperar 
    const pokemonsList = JSON.parse(localStorage.getItem("pokemons"))  ||[];
    //Agregar pokemon a la lista
    pokemonList.push(pokemonID);
    //Actualizar lista
        localStorage.setItem('card', JSON.stringify(card))
};
/* const getInfoLocalStorage = () => {
    const pokemonsList =JSON.parse(localStorage.getItem("pokemons"));

    localStorage.getItem("pokemons")
}
 */
// Obtener pokemon
getPokemon.addEventListener("click", async () => {
        const text = document.getElementById('poke-name').value.toLowerCase();
        const pokemon = await fetchPokemon(text);
        console.log(pokemon);
        //localStorage.setItem('pokemons', pokemon.id);
        saveOnLocalStorage (pokemon);

        createPokemonCard(pokemon);
    });

document.addEventListener('DOMContentLoaded', async () => {
/* 
    const list = getInfoLocalStorage();

    console.log(list.length === 0); */

   /*  if (list ===0){
        const pokemonID = list [0];
        const pokemon =await fetchPokemon(pokemonID);
        createPokemonCard(pokemon); */

    const storedId = localStorage.getItem('currentPokeId');
    const initialId = storedId ? parseInt(storedId) : 1;
    const pokemon = await fetchPokemon(initialId);
    console.log(pokemon.name);
});

// obtener el anterior
//
//
// obtener el siguiente


    previous.addEventListener('click', async () => {
        /* const currentPokeId = parseInt(localStorage.getItem('pokemons'));
        const newId = Math.max(1, currentPokeId -1);
        const pokemon = await fetchPokemon(newId);
        console.log(pokemon.name); */
        
        
        if (currentPokemonIndex > 0 ) {
            const list = getInfoLocalStorage ();
            currentPokemonIndex--;
            const pokemonID = list[ currentPokemonIndex];
            const pokemon = await fetchPokemon(pokemonID);
            createPokemonCard(pokemon);

        }

        
    })


    next.addEventListener('click', async () => {

        const list = getInfoLocalStorage();
        const pokemonListLength = list.length -1;
        
       /*  if (currentPokemonIndex ===0){
            const pokemonID = list[0];
            const pokemon =await fetchPokemon() 
        } */
        if (currentPokemonIndex < pokemonListLength){
            console.log(currentPokemonIndex);
            currentPokemonIndex++;
            const pokemonID = list[currentPokemonIndex];
            const pokemon = await fetchPokemon(newId);
        console.log(pokemon);
    }
    })



////////////////// POST
//

/* fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
        title: 'title1',
        body: 'Lorem ipsum dolor sit amet',
        userId: 1,
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    }
}).then(res => res.json())
    .then(json => console.log(json))
 */

/////////////////// EJERCICIOS
//- Arreglar el pokemon en localStorage
// - Manipular el DOM y agregar una tarjeta del pokemon.
// - El tamaño e info de la tarjeta es a consideración personal.
// - La tarjeta debe mantenerse en la pantalla.
// - La info -> LocalStorage -> Fetch
