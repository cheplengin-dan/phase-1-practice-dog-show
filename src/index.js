document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('table-body');
    const dogForm = document.getElementById('dog-form');
    // Fetch the list of dogs
    fetch('http://localhost:3000/dogs')
      .then(response => response.json())
      .then(dogs => {
        // For each dog, create a new row in the table
        dogs.forEach(dog => {
          const row = document.createElement('tr');
          const nameCell = document.createElement('td');
          const breedCell = document.createElement('td');
          const sexCell = document.createElement('td');
          const editCell = document.createElement('td');
          const editLink = document.createElement('a');
  
          nameCell.textContent = dog.name;
          breedCell.textContent = dog.breed;
          sexCell.textContent = dog.sex;
  
          editLink.href = `./edit.html?id=${dog.id}`;
          editLink.textContent = 'Edit';
          editLink.addEventListener('click', event => {
            event.preventDefault();
            // Populate the dog form with this dog's information
            dogForm.elements.name.value = dog.name;
            dogForm.elements.breed.value = dog.breed;
            dogForm.elements.sex.value = dog.sex;
            dogForm.dataset.id = dog.id;
          });
          editCell.appendChild(editLink);
  
          row.appendChild(nameCell);
          row.appendChild(breedCell);
          row.appendChild(sexCell);
          row.appendChild(editCell);
  
          tableBody.appendChild(row);
        });
      })
      .catch(error => console.error(error));

// Handle form submit event
dogForm.addEventListener('submit', event => {
    event.preventDefault();
    const dogId = dogForm.dataset.id;
    const updatedDog = {
      name: dogForm.elements.name.value,
      breed: dogForm.elements.breed.value,
      sex: dogForm.elements.sex.value,
    };
    // Send a PATCH request to update the dog information
    fetch(`http://localhost:3000/dogs/${dogId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedDog),
    })
      .then(response => response.json())
      .then(() => {
        // Refresh the list of dogs in the table
        location.reload();
      })
      .catch(error => console.error(error));
  });
});