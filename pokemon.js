

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


// Funktion til at vise Pokémon pænt
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
        const pokemonItem = document.createElement("li");

        const heading = document.createElement("h3");
        heading.textContent = pokemon.name;
        pokemonItem.appendChild(heading);

        const statsList = document.createElement("ul");

        for (const key of Object.keys(pokemonLabels)) {
            if (pokemon[key] !== undefined && pokemon[key] !== null) {
                const stat = document.createElement("li");
                stat.textContent =
                    `${pokemonLabels[key]}: ${pokemon[key]}`;

                statsList.appendChild(stat);
            }
        }

        pokemonItem.appendChild(statsList);
        list.appendChild(pokemonItem);
    }

    resultElement.appendChild(list);
}


// Håndter både JSON og almindelige tekstbeskeder fra backend
function getPokemonData(url, resultElement) {
    fetch(url)
        .then(response => response.text())
        .then(result => {
            let pokemonData;

            try {
                pokemonData = JSON.parse(result);
            } catch {
                pokemonData = result;
            }

            showPokemonList(pokemonData, resultElement);
        })
        .catch(error => {
            console.log("Fejl:", error);

            showPokemonList(
                "Der opstod en fejl under søgningen.",
                resultElement
            );
        });
}

// Vis alle Pokémon
fetch("http://localhost:3000/allPokemon")
    .then(response => response.json())
    .then(allPokemonData => {
        const button =
            document.querySelector("#showAllPokemonButton");

        const list =
            document.querySelector("#showAllPokemonList");

        button.addEventListener("click", () => {
            showPokemonList(allPokemonData, list);
        });
    })
    .catch(error => console.log("Fejl:", error));


// Søg efter Pokémon ved navn
function searchPokemon() {
    const pokeName =
        document.querySelector("#pokemonName").value.trim();

    const resultElement =
        document.querySelector("#nameResult");

    if (pokeName === "") {
        showPokemonList("Skriv et Pokémon-navn.", resultElement);
        return;
    }

    getPokemonData(
        "http://localhost:3000/pokemonname?name=" +
        encodeURIComponent(pokeName),
        resultElement
    );
}


// Søg efter Pokémon med attack over en bestemt værdi
function filterAttack() {
    const attackValue =
        document.querySelector("#pokemonAttack").value.trim();

    const resultElement =
        document.querySelector("#attackResult");

    if (attackValue === "") {
        showPokemonList("Skriv en attack-værdi.", resultElement);
        return;
    }

    getPokemonData(
        "http://localhost:3000/attackvalue?attack=" +
        encodeURIComponent(attackValue),
        resultElement
    );
}


// Søg efter Pokémon efter primary type
function filterType() {
    const primaryType =
        document.querySelector("#pokemonType").value.trim();

    const resultElement =
        document.querySelector("#typeResult");

    if (primaryType === "") {
        showPokemonList("Skriv en primary type.", resultElement);
        return;
    }

    getPokemonData(
        "http://localhost:3000/primarytype?type=" +
        encodeURIComponent(primaryType),
        resultElement
    );
}


// Clear alle Pokémon
function clearAllPokemon() {
    document.querySelector("#showAllPokemonList").replaceChildren();
    document.querySelector("#allPokemonResult").replaceChildren();
}


// Clear Pokémon-navn
function clearPokemonName() {
    document.querySelector("#pokemonName").value = "";
    document.querySelector("#nameResult").replaceChildren();
}


// Clear primary type
function clearPokemonType() {
    document.querySelector("#pokemonType").value = "";
    document.querySelector("#typeResult").replaceChildren();
}

// Clear attack-stats
function clearPokemonStats() {
    document.querySelector("#pokemonAttack").value = "";
    document.querySelector("#attackResult").replaceChildren();
}