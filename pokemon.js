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
    )}})})
