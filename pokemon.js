
// allpokemonbutton
fetch("http://localhost:3000/allPokemon")
    .then(response => response.json())
    .then(allPokemonData => {
        console.log(allPokemonData);

        const showAllPokemonButton = document.querySelector("#showAllPokemonButton");
        const showAllPokemonList = document.querySelector("#showAllPokemonList");

        showAllPokemonButton.addEventListener("click", () => {
            showAllPokemonList.replaceChildren();

            for (let i = 0; i < allPokemonData.length; i++) {
                const pokemon = allPokemonData[i];

                const pokemonLi = document.createElement("li");
                pokemonLi.textContent = pokemon.name;

                showAllPokemonList.appendChild(pokemonLi);
            }
        });
    });


//Pokémon med dens stats ved at søge på navn
function searchPokemon() {
    const pokeName = document.querySelector('#pokemonName').value.trim();

    fetch('http://localhost:3000/pokemonname?name=' + encodeURIComponent(pokeName))
        .then(response => response.json())
        .then(pokemon => {
            console.log('Resultat:', pokemon);
            showPokemonList(pokemon, document.querySelector('#nameResult'));
        });
}


// Søg efter Pokémon med attack over en bestemt værdi
function filterAttack() {
    const attackValue = document.querySelector('#pokemonAttack').value.trim();

    fetch('http://localhost:3000/attackvalue?attack=' + encodeURIComponent(attackValue))
        .then(response => response.json())
        .then(attack => {
            console.log('Resultat:', attack);
            showPokemonList(attack, document.querySelector('#attackResult'));
        });
}


// Søg efter Pokémon efter primary type
function filterType() {
    const primaryType = document.querySelector('#pokemonType').value.trim();

    fetch('http://localhost:3000/primarytype?type=' + encodeURIComponent(primaryType))
        .then(response => response.json())
        .then(type => {
            console.log('Resultat:', type);
            showPokemonList(type, document.querySelector('#typeResult'));
        });
}


// Labels til Pokémon-stats
const pokemonLabels = {
    hp: "HP",
    attack: "Attack",
    defence: "Defense",
    speed: "Speed",
    special_attack: "Special attack",
    special_defence: "Special defense",
    primary_type: "Primary type",
    secondary_type: "Secondary type"
};


// Vis søgeresultater pænt
function showPokemonList(pokemonData, resultElement) {
    resultElement.replaceChildren();

    if (!Array.isArray(pokemonData)) {
        const message = document.createElement("p");
        message.textContent = pokemonData;
        resultElement.appendChild(message);
        return;
    }

    if (pokemonData.length === 0) {
        const message = document.createElement("p");
        message.textContent = "Ingen Pokémon fundet.";
        resultElement.appendChild(message);
        return;
    }

    const list = document.createElement("ul");

    for (let i = 0; i < pokemonData.length; i++) {
        const pokemon = pokemonData[i];
        const pokemonLi = document.createElement("li");

        const heading = document.createElement("h3");
        heading.textContent = pokemon.name;
        pokemonLi.appendChild(heading);

        for (const key of Object.keys(pokemonLabels)) {
            if (pokemon[key] !== undefined && pokemon[key] !== null) {
                const stat = document.createElement("p");
                stat.textContent = pokemonLabels[key] + ": " + pokemon[key];
                pokemonLi.appendChild(stat);
            }
        }

        list.appendChild(pokemonLi);
    }

    resultElement.appendChild(list);
}


// Clear-knapperne
function clearAllPokemon() {
    document.querySelector('#showAllPokemonList').replaceChildren();
    document.querySelector('#allPokemonResult').replaceChildren();
}

function clearPokemonName() {
    document.querySelector('#pokemonName').value = '';
    document.querySelector('#nameResult').replaceChildren();
}

function clearPokemonType() {
    document.querySelector('#pokemonType').value = '';
    document.querySelector('#typeResult').replaceChildren();
}

function clearPokemonStats() {
    document.querySelector('#pokemonAttack').value = '';
    document.querySelector('#attackResult').replaceChildren();
}