// JavaScript to handle the selection
    
const dropdown = document.getElementById('empDropdown');
var selectedValue;
dropdown.addEventListener('change', function() {
    selectedValue = this.value;
    console.log('Selected value:', selectedValue);
    // You can perform actions based on the selected value
  });
// Function to get selected usernames
function getSelectedUsernames() {
  const checkboxes = document.querySelectorAll('#usernameDropdown input[type="checkbox"]');
  
  const selectedUsernames = Array.from(checkboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);
  console.log(selectedUsernames)
fetch('/Admin/Add-Reviewer', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  //Make sure in server side that selectedUsernames should not match with selectedValue
  body: JSON.stringify({ selectedValue: selectedValue, selectedUsernames: selectedUsernames })
})
.then(response => {
  if (response.ok) {
    return response.json();
    console.log('Selected usernames sent to the server');
    // Handle success if needed
  } else {
    console.error('Error sending selected usernames');
    // Handle error if needed
  }
})
.then(data => {
    if (data.redirectTo) {
        console.log("redirect to");
        // Redirect to the URL received from the server
        window.location.href = data.redirectTo;
    } else {
        // Handle other data or success cases
    }
    })
.catch(error => {
  console.error('Error:', error);
});
}
  
function enableCheckboxes() {
const firstDropdown = document.getElementById('empDropdown');
const checkboxes = document.querySelectorAll('#usernameDropdown input[type="checkbox"]');
if (firstDropdown.value !== '') {
checkboxes.forEach(checkbox => {
  //checkbox.disabled = false; // Enable each checkbox if a value is selected in the first dropdown
  if (checkbox.value === firstDropdown.value) {
  checkbox.disabled = true; // Disable the checkbox if it matches the selected value
} else {
  checkbox.disabled = false; // Enable other checkboxes
}
});
} else {
checkboxes.forEach(checkbox => {
  checkbox.disabled = true;
  
});
} 
}


/*
function updateDropdown2(selectedValue) {
const usernameDropdown = document.getElementById('usernameDropdown');
const checkboxes = usernameDropdown.querySelectorAll('input[type="checkbox"]');

checkboxes.forEach(checkbox => {
if (checkbox.value === selectedValue) {
  checkbox.disabled = true; // Disable the checkbox if it matches the selected value
} else {
  checkbox.disabled = false; // Enable other checkboxes
}
});
}


function handleCheckboxChange(checkbox) {
const selectedValue = checkbox.value;
const empDropdown = document.getElementById('empDropdown');
const options = empDropdown.querySelectorAll('option');

options.forEach(option => {
if (option.value === selectedValue) {
  option.disabled = true; // Disable the option in empDropdown if corresponding checkbox is checked
} else {
  option.disabled = false; // Enable other options
}
});
}
*/