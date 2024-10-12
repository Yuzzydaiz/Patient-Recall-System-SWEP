// Initialize patient data
let patients = JSON.parse(localStorage.getItem('patients')) || [];

// Load patients when the page loads
window.onload = function () {
    displayPatients(patients);
};

// Function to display patients on the page
function displayPatients(patientArray) {
    const patientList = document.getElementById('patientList');
    patientList.innerHTML = ''; // Clear the list before rendering

    const today = new Date(); // Get current date

    patientArray.forEach((patient, index) => {
        let patientItem = document.createElement('div');
        patientItem.className = 'patient-item';

        // Check if recall date has passed
        const recallDate = new Date(patient.recallDate);
        if (recallDate < today) {
            patientItem.classList.add('overdue');
        }

        patientItem.innerHTML = `
            <strong>Name:</strong> ${patient.name}<br>
            <strong>Age:</strong> ${patient.age}<br>
            <strong>Condition:</strong> ${patient.condition}<br>
            <strong>Recall Date:</strong> ${patient.recallDate}<br>
            ${recallDate < today ? '<strong>⚠️ Recall Date has passed!</strong>' : ''}
            <button onclick="deletePatient(${index})">Delete</button>
        `;
        patientList.appendChild(patientItem);
    });
}

// Function to add a new patient
function addPatient(event) {
    event.preventDefault(); // Prevent form submission

    const name = document.getElementById('patientName').value;
    const age = document.getElementById('patientAge').value;
    const condition = document.getElementById('patientCondition').value;
    const recallDate = document.getElementById('recallDate').value;

    const newPatient = { name, age, condition, recallDate };

    // Add new patient to the list and save to localStorage
    patients.push(newPatient);
    localStorage.setItem('patients', JSON.stringify(patients));

    // Clear the form
    document.getElementById('patientForm').reset();

    // Refresh the patient list
    displayPatients(patients);
}

// Function to delete a patient
function deletePatient(index) {
    patients.splice(index, 1); // Remove the patient at the given index
    localStorage.setItem('patients', JSON.stringify(patients)); // Update localStorage
    displayPatients(patients); // Refresh the displayed list
}

// Function to search patients
function searchPatients() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    const filteredPatients = patients.filter(patient => patient.name.toLowerCase().includes(query));
    displayPatients(filteredPatients);
}
