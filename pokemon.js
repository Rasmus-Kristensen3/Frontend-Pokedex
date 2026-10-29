
// allpokemonbutton
fetch("http://localhost:3000/allpokemon")
.then(response => response.json())
.then(allPokemonData => {console.log(allPokemonData)
const showAllPokemonButton = document.querySelector("#showAllPokemonButton")
    const showAllPokemonList = document.querySelector("#showAllPokemonList")
showAllPokemonButton.addEventListener("click", ()=> {


    showAllPokemonList.innerHTML = "";
for (let i = 0; i<allPokemonData.length; i++) {
    const pokemon = allPokemonData[i]
    showAllPokemonList.insertAdjacentHTML("beforeend",
        `<li>
name: ${pokemon.name}
hp: ${pokemon.hp}
       </li>`
    )}})});

//Se en liste over alle Pokémon med deres navne og stats.
function searchPokemon() {
    const pokeName = document.querySelector('#pokemonName').value.trim();

    fetch('http://localhost:3000/pokemonname?name=' + pokeName)
        .then(response => response.json())
        .then(pokemon => {
            console.log('Resultat:', pokemon);
            document.querySelector('#nameResult').textContent = JSON.stringify(pokemon);
        });

}

// søg efter deres attack værdi

function filterAttack () {
    const attackValue = document.querySelector('#pokemonAttack').value.trim();
    fetch('http://localhost:3000/attackvalue?attack=' + attackValue)
        .then(response => response.json())
        .then(attack => {
            console.log('Resultat:', attack);
            document.querySelector('#attackResult').textContent = JSON.stringify(attack);
        })

}

// Søg efter deres primary type
function filterType() {
    const primaryType = document.querySelector('#pokemonType').value.trim();
    fetch('http://localhost:3000/primarytype?type=' + primaryType)
        .then(response => response.json())
        .then(type => {
            console.log('Resultat:',type);
            document.querySelector('#typeResult').textContent = JSON.stringify(type);
        })
}

// så clear buttons virker
function clearAllPokemon() {
    document.querySelector('#showAllPokemonList').innerHTML = '';
    document.querySelector('#allPokemonResult').textContent = '';
}

function clearPokemonName() {
    document.querySelector('#pokemonName').value = '';
    document.querySelector('#nameResult').textContent = '';
}

function clearPokemonType() {
    document.querySelector('#pokemonType').value = '';
    document.querySelector('#typeResult').textContent = '';
}


// Clear attack-stats
function clearPokemonStats() {
    document.querySelector('#pokemonAttack').value = '';
    document.querySelector('#attackResult').textContent = '';
}