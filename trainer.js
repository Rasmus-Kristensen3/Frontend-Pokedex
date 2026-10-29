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

})