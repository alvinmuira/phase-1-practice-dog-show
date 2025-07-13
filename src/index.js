document.addEventListener('DOMContentLoaded', () => {
    //Accessing the table body and form for the data to be be displayed
const tableBody = document.getElementById("table-body")
const editForm = document.getElementById("dog-form")
    //Fetching the dog data from the server
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
//     function updatingDetails(id){ 
//         editForm.addEventListener("submit", (event) => {
//         event.preventDefault();
//         fetch(`http://localhost:3000/dogs${id}`, {
//             method: "PATCH",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 name: editForm.name.value,
//                 breed: editForm.breed.value,
//                 sex: editForm.sex.value
//             })
//         })
//         .then(response => response.json())
//         .then(updatedDog => {
//             const row = document.querySelector(`tr td.id:contains('${id}')`).closest("tr");
//             row.querySelector(".name").textContent = updatedDog.name;
//             row.querySelector(".breed").textContent = updatedDog.breed;
//             row.querySelector(".sex").textContent = updatedDog.sex;
//             editForm.reset();
//         });
//     });
// }


})