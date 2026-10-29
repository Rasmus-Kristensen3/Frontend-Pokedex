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
        const trainerP = document.createElement("p");
        trainerP.textContent = `${trainerNames[keys[i]]}: ${allTrainersData[j][keys[i]]}`;
        allTrainerNamesLi.appendChild(trainerP);

    console.log(`${trainerNames[keys[i]]}: ${allTrainersData[j][keys[i]]}`);}
    // 2)

    allTrainerNamesLi.addEventListener("click", ()=> {
fetch(`http://localhost:3000/pokemontrainersown?trainer_name=${allTrainersData[j].name}`)
    .then (response=> response.json())
    .then(whichTrainersOwnWhatPokemonData => {
        const whichTrainersOwnWhatPokemonUl = document.querySelector("#whichTrainersOwnWhatPokemon");
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
// 2)Se hvilke Pokémon en bestemt trainer ejer.
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