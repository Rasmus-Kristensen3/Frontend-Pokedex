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