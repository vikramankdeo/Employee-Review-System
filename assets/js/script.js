
console.log("script called");
//const removeButtons = document.querySelectorAll('.remove-btn');

// Function to remove the employee from the DOM and send the delete request to the server
function removeEmployee(employeeId) {
    // Remove the employee element from the DOM
    console.log("ecalled" , employeeId);
    const employeeElement = document.getElementById(employeeId);
    console.log(employeeElement);
    if (employeeElement) {
        employeeElement.remove();
        console.log("element removed");
    }

    // Send a request to the server to delete the employee from the database
    fetch(`/Admin/deleteEmployee/${employeeId}`, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            console.log('Employee deleted successfully from the database');
            // Handle success if needed
        } else {
            console.error('Error deleting employee from the database');
            // Handle error if needed
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Attach click event listeners to each remove button
/*removeButtons.forEach(button => {
    console.log("called remoce");
    button.addEventListener('click', () => {
        const employeeId = button.parentElement.dataset.id; // Get the employee ID
        console.log(employeeId);
        removeEmployee(employeeId); // Call the removeEmployee function
    });
});
});
*/
