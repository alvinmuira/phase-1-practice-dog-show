document.addEventListener('DOMContentLoaded', () => {
    //Accessing the table body and form for the data to be be displayed
const tableBody = document.getElementById("table-body")
const editForm = document.getElementById("dog-form")
const dogUrl = "http://localhost:3000/dogs";
    //Fetching the dog data from the server
function loadsDogs() {
    fetch(`http://localhost:3000/dogs`)
    .then(response => response.json())
    .then(dogs => {
        dogs.forEach(dog => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="id" style="display: none;">${dog.id}</td>
                <td class="name">${dog.name}</td>
                <td class="breed">${dog.breed}</td>
                <td class="sex">${dog.sex}</td>
                <td><button class="edit-button">Edit Dog</button></td>
            `;
            tableBody.appendChild(row);
        });
    })
};
loadsDogs();
    //Adding event listener to the table body for edit button clicks
    tableBody.addEventListener(`click`, (event)=> {
        const row = event.target.closest("tr");
        const id = row.querySelector(".id").textContent;
        const name = row.querySelector(".name").textContent;
        const breed = row.querySelector(".breed").textContent;
        const sex = row.querySelector(".sex").textContent;

        editForm.name.value = name;
        editForm.breed.value = breed;
        editForm.sex.value = sex;
        updatingDetails(id);
    })
    //Updating the Server through the form submission
     function updatingDetails(id){ 
        editForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const values = {
                name: editForm.name.value,
                breed: editForm.breed.value,
                sex: editForm.sex.value
            }
        fetch(`${dogUrl}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values) 
        })
        .then(response => response.json())
        .then(() => {
            editForm.reset();
            loadsDogs(); // Refresh list after update
        });
    });
}


})


