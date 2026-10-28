//
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
        });

}


