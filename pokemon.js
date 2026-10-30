
// Vis alle Pokémon med deres stats-allpokemonbutton

// først leder vi efter knappen i htmlen

const showAllPokemon = document.querySelector("#showAllPokemonButton");
const allPokemonList = document.querySelector("#showAllPokemonList");
// Så gå vi ind og ber java om at hver gang jeg trykker p[ knappen skal en funtion ske

showAllPokemon.addEventListener("click",() =>{
    allPokemonList.replaceChildren();

    fetch("http://localhost:3000/allPokemon")
        .then(response => {
            return response.json();
        })
    .then(AllPokemondata => {
        for (let i=0; i < AllPokemondata.length; i++) {

            const pokemonli = document.createElement('li')

            const pokemon = AllPokemondata[i];

            pokemonli.textContent = `
            Name: ${pokemon.name}
            HP: ${pokemon.hp}
            Attack: ${pokemon.attack}
            Defence: ${pokemon.defence}
            Speed: ${pokemon.speed}
            Primary type: ${pokemon.primary_type}
            Secondary type: ${pokemon.secondary_type}
        `;
            allPokemonList.appendChild(pokemonli);

        }

    })
});

// Søg efter en Pokémon via navn
const searchPokemonButton = document.querySelector("#searchPokemonStats");
const pokemonNameInput = document.querySelector("#pokemonName");
const nameResult = document.querySelector("#nameResult");

searchPokemonButton.addEventListener("click", () => {

    const name = pokemonNameInput.value.trim();

    nameResult.replaceChildren();

    fetch("http://localhost:3000/pokemonname?name=" + encodeURIComponent(name))
        .then(response => {
            return response.json();
        })
        .then(pokemonData => {

            for (let i = 0; i < pokemonData.length; i++) {

                const pokemon = pokemonData[i];

                const pokemonli = document.createElement("li");

                pokemonli.textContent = `
                    Name: ${pokemon.name}
                    HP: ${pokemon.hp}
                    Attack: ${pokemon.attack}
                    Defence: ${pokemon.defence}
                    Speed: ${pokemon.speed}
                    Special attack: ${pokemon.special_attack}
                    Special defence: ${pokemon.special_defence}
                    Primary type: ${pokemon.primary_type}
                    Secondary type: ${pokemon.secondary_type}
                `;

                nameResult.appendChild(pokemonli);
            }
        })
        .catch(error => {
            console.error("Fejl ved navnesøgning:", error);
        });

});

// Søg  pokemon type
const searchTypeButton = document.querySelector("#SearchType");
const pokemonTypeInput = document.querySelector("#pokemonType");
const typeResult = document.querySelector("#typeResult");

searchTypeButton.addEventListener("click", () => {

    const type = pokemonTypeInput.value.trim();

    typeResult.replaceChildren();

    fetch("http://localhost:3000/primarytype?type=" + encodeURIComponent(type))
        .then(response => {
            return response.json();
        })
        .then(pokemonData => {

            for (let i = 0; i < pokemonData.length; i++) {

                const pokemon = pokemonData[i];

                const pokemonli = document.createElement("li");

                pokemonli.textContent = `
                    Name: ${pokemon.name}
                    HP: ${pokemon.hp}
                    Attack: ${pokemon.attack}
                    Defence: ${pokemon.defence}
                    Speed: ${pokemon.speed}
                    Special attack: ${pokemon.special_attack}
                    Special defence: ${pokemon.special_defence}
                    Primary type: ${pokemon.primary_type}
                    Secondary type: ${pokemon.secondary_type}
                `;

                typeResult.appendChild(pokemonli);
            }
        })
        .catch(error => {
            console.error("Fejl ved type-søgning:", error);
        });

});

// Søg efter attack
const searchAttackButton = document.querySelector("#SearchAttack");
const pokemonAttackInput = document.querySelector("#pokemonAttack");
const attackResult = document.querySelector("#attackResult");

searchAttackButton.addEventListener("click", () => {

    const attack = pokemonAttackInput.value.trim();

    attackResult.replaceChildren();

    fetch("http://localhost:3000/attackvalue?attack=" + encodeURIComponent(attack))
        .then(response => {
            return response.json();
        })
        .then(pokemonData => {

            for (let i = 0; i < pokemonData.length; i++) {

                const pokemon = pokemonData[i];

                const pokemonli = document.createElement("li");

                pokemonli.textContent = `
                    Name: ${pokemon.name}
                    HP: ${pokemon.hp}
                    Attack: ${pokemon.attack}
                    Defence: ${pokemon.defence}
                    Speed: ${pokemon.speed}
                    Special attack: ${pokemon.special_attack}
                    Special defence: ${pokemon.special_defence}
                    Primary type: ${pokemon.primary_type}
                    Secondary type: ${pokemon.secondary_type}
                `;

                attackResult.appendChild(pokemonli);
            }
        })
        .catch(error => {
            console.error("Fejl ved attack-søgning:", error);
        });

});

// CLEAR  POKÉMON
const clearAllPokemon = document.querySelector("#clearAllPokemon");

clearAllPokemon.addEventListener("click", () => {
    allPokemonList.replaceChildren();
});


// CLEAR NAVNE
const clearPokemonNameStats = document.querySelector("#clearPokemonNameStats");

clearPokemonNameStats.addEventListener("click", () => {
    nameResult.replaceChildren();
    pokemonNameInput.value = "";
});


// CLEAR TYPE
const clearType = document.querySelector("#clearType");

clearType.addEventListener("click", () => {
    typeResult.replaceChildren();
    pokemonTypeInput.value = "";
});


// CLEAR ATTACK
const clearPokemonStats = document.querySelector("#clearPokemonStats");

clearPokemonStats.addEventListener("click", () => {
    attackResult.replaceChildren();
    pokemonAttackInput.value = "";
});