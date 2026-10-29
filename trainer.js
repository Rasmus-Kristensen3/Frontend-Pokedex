//1) liste med alle trænere

fetch("http://localhost:3000/alltrainers")
    .then(response => response.json())
    .then(allTrainersData => {console.log(allTrainersData)
const trainerNames = {
    name: "Name",
    age: "Age",
    hometown: "Hometown"
    };
const keys = Object.keys(trainerNames);
        const allTrainersList = document.querySelector("#allTrainersList")
for(let j = 0; j<allTrainersData.length; j++){
    const allTrainerNamesLi = document.createElement("li");
    for(let i = 0; i<keys.length; i++){
        const trainerP = document.createElement(keys[i] === "name" ? "h3" : "p");
        if (keys[i] === "name") {
            trainerP.textContent = allTrainersData[j].name;
        }
        else if (keys[i] === "age") {
            trainerP.textContent = "Age " + allTrainersData[j].age;
        }
        else if (keys[i] === "hometown") {
            trainerP.textContent = "Hometown " + allTrainersData[j].hometown;
        }
        allTrainerNamesLi.appendChild(trainerP);

    console.log(`${trainerNames[keys[i]]}: ${allTrainersData[j][keys[i]]}`);}
    // 2)

    allTrainerNamesLi.addEventListener("click", ()=> {
        document.querySelector("#selectedTrainerName").textContent =
            allTrainersData[j].name + "s Pokemon";
fetch(`http://localhost:3000/pokemontrainersown?trainer_name=${allTrainersData[j].name}`)
    .then (response=> response.json())
    .then(whichTrainersOwnWhatPokemonData => {
        const whichTrainersOwnWhatPokemonUl = document.querySelector("#whichTrainersOwnWhatPokemon");
        const trainerSelect = document.querySelector("#trainerSelect");
        whichTrainersOwnWhatPokemonUl.textContent = "";
        for( let i = 0; i<whichTrainersOwnWhatPokemonData.length; i++){
            const pokemonLi = document.createElement("li");
            pokemonLi.textContent = whichTrainersOwnWhatPokemonData[i].name;
            whichTrainersOwnWhatPokemonUl.appendChild(pokemonLi);

        }
        console.log(whichTrainersOwnWhatPokemonData)
    })

        console.log(allTrainersData[j].name)
    })
    allTrainersList.appendChild(allTrainerNamesLi);}
    })
// 2)Se hvilke Pokémon en bestemt trainer ejer. det her er det som er tilføjet til den første funktion.
/*
allTrainerNamesLi.addEventListener("click", ()=> {
fetch(`http://localhost:3000/pokemontrainersown?trainer_name=${allTrainersData[j].name}`)
    .then (response=> response.json())
    .then(whichTrainersOwnWhatPokemonData => {
        const whichTrainersOwnWhatPokemonUl = document.querySelector("#whichTrainersOwnWhatPokemon");
        whichTrainersOwnWhatPokemonUl.textContent = "";
        for( let i = 0; i<whichTrainersOwnWhatPokemonData.length; i++){
            whichTrainersOwnWhatPokemonUl.insertAdjacentHTML("beforeend",`<p>${whichTrainersOwnWhatPokemonData[i].name} </p>` )

        }
        console.log(whichTrainersOwnWhatPokemonData)

})
*/
const createTrainerButoon = document.querySelector("#createTrainer");
const createTrainerForm = document.querySelector("#createTrainerForm");

// Til at vise formularen når man klikker på knappen
createTrainerButoon.addEventListener("click", function (){
    createTrainerForm.hidden = !createTrainerForm.hidden;
})

// Til at oprette ny trainer
createTrainerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const trainer_name = document.querySelector("#new_trainer_name").value;
    const age = document.querySelector("#age").value;
    const hometown = document.querySelector("#hometown").value;

    fetch("http://localhost:3000/trainer/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            trainer_name: trainer_name,
            age: Number(age),
            hometown: hometown
        })
    })
        .then(response =>{
            if (!response.ok){
                throw new Error("Kunne ikke oprette trainer");
            }
            return response.text();
        })
        .then(data =>{
            alert(data);
            createTrainerForm.reset();
            createTrainerForm.hidden = true;
        })
    .catch(error =>{
        alert("Fejl:" + error.message);
        console.log(error);
    })

});

fetch("http://localhost:3000/alltrainers")
    .then(response => response.json())
    .then(trainers => {
        console.log(trainers);

        trainers.sort((a, b) => a.name.localeCompare(b.name));

        const trainerSelect = document.querySelector("#trainer_id");

        trainers.forEach(trainer => {
            const option = document.createElement("option");

            option.textContent = trainer.name;
            option.value = trainer.trainer_id;

            trainerSelect.appendChild(option);
        });
    });



fetch("http://localhost:3000/allpokemon")
.then(response => response.json())
.then(pokemons => {
    console.log(pokemons);

    pokemons.sort((a, b) => a.name.localeCompare(b.name));
    const pokemonSelect = document.querySelector("#pokedex_number");
    pokemons.forEach(pokemon => {
        const option = document.createElement("option");

        option.textContent = pokemon.name;
        option.value = pokemon.pokedex_number;

        pokemonSelect.appendChild(option);
    });
});



const addPokemonForm = document.querySelector("#addPokemonForm");

addPokemonForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const trainer_id = document.querySelector("#trainer_id").value;
    const pokedex_number = document.querySelector("#pokedex_number").value;

    if (trainer_id === "") {
        alert("Du skal vælge en trainer først");
        return;
    }

    fetch("http://localhost:3000/trainer/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            trainer_id: Number(trainer_id),
            pokedex_number: Number(pokedex_number)
        })
    })
        .then(response => {
            if (!response.ok){
                throw new Error("Kunne ikke tilføje pokemon");
            }
            return response.text();
        })
        .then(data => {
            alert(data);
        })
        .catch(error => {
            alert(error.message);
        });
})