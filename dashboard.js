const API = 'http://localhost:3000';

async function loadAvgAttack() {
    const response = await fetch(API + '/stats/average-attack-per-attack');
    const data = await response.json();

    new Chart(document.getElementById('avgAttackChart'), {
        type: 'bar',
        data: {
            labels: data.map(row => row.primary_type),
            datasets: [{
                label: 'Gennemsnitlig attack',
                data: data.map(row => Number(row.avg_attack))
            }]
        },
        options: {
            scales: { y: { beginAtZero: true } }
        }
    });
}

async function loadLowestSpeed() {
    const response = await fetch(API + '/pokemon/lowest-speed');
    const data = await response.json();

    document.getElementById('lowestSpeedText').textContent =
        data[0].primary_type + ' har den laveste gennemsnitlige speed: ' +
        Number(data[0].avg_speed).toFixed(1);

    new Chart(document.getElementById('lowestSpeedChart'), {
        type: 'bar',
        data: {
            labels: data.map(row => row.primary_type),
            datasets: [{
                label: 'Gennemsnitlig speed',
                data: data.map(row => Number(row.avg_speed))
            }]
        },
        options: {
            scales: { y: { beginAtZero: true } }
        }
    });
}

loadAvgAttack();
loadLowestSpeed();

// Chart 3:  En liste over Pokemons med gennemsnitlige samlede stats, DESC liste.

fetch('http://localhost:3000/higheststatpokemons')
    .then(response => response.json())
    .then(data => {
        new Chart(document.getElementById('highestStatsChart'), {
            type: 'bar',
            data: {
                labels: data.map(pokemon => pokemon.name),
                datasets: [{
                    label: 'Average Stats',
                    data: data.map(pokemon => pokemon.Average_Stats)
                }]
            },
            options: {
                responsive: true
            }
        });
    })
    .catch(error => console.error('Error loading Pokémon chart:', error));


// Chart 4: Hvilke trainers har flest Pokémon?

fetch('http://localhost:3000/chartfortrainersxpokemons')
    .then(response => response.json())
    .then(data => {
        new Chart(document.getElementById('trainerPokemonChart'), {
            type: 'bar',
            data: {
                labels: data.map(trainer => `Trainer ${trainer.trainer_id}`),
                datasets: [{
                    label: 'Number of Pokémon',
                    data: data.map(trainer => trainer.number_of_pokemon)
                }]
            },
            options: {
                responsive: true
            }
        });
    })
    .catch(error => console.error('Error loading trainer chart:', error));

fetch('http://localhost:3000/howmanytrainers')
    .then(response => response.json())
    .then(howManyTrainersData => {
        console.log(howManyTrainersData)

        const trainerCount = document.querySelector('#trainerCount');
        trainerCount.textContent= `${howManyTrainersData[0].Trainers}`
    })
    .catch(error => {
        console.error('Fejl ved hentning af trainers:', error);
    });
























































fetch('http://localhost:3000/howmanypokemonmoves')
    .then(response => response.json())
    .then(data => {
        console.log('API-data:', data);

        const moveCountP = document.querySelector('#moveCount');

        if (moveCountP) {
            moveCountP.textContent = `${data[0].Moves}`;
        } else {
            console.error('HTML-elementet #moveCount blev ikke fundet');
        }
    })
    .catch(error => {
        console.error('Fejl ved hentning af moves:', error);
    });


fetch('http://localhost:3000/howmanypokemon')
    .then(response => response.json())
    .then(howManyPokemonData => {console.log(howManyPokemonData[[0]])
        const pokemonCountP = document.querySelector("#pokemonCount")
        pokemonCountP.textContent = `${howManyPokemonData[0].TotalPokemon}`
    })
