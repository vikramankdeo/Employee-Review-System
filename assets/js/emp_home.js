function submitReview(employeeId) {
    const reviewSelect = document.getElementById(`review_${employeeId}`);
    const selectedReview = reviewSelect.value;
    console.log("employee id",employeeId);
    console.log(selectedReview);
    fetch(`/Employee/submitReview/${employeeId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ review: selectedReview })
    })
    .then(response => {
      if (response.ok) {
        console.log('Review submitted for employee');
        const employeeDiv = document.getElementById(employeeId);
        console.log(employeeDiv);
        if (employeeDiv) {
          employeeDiv.remove(); // Remove the employee's DOM element after submitting review
        }
      } else {
        console.error('Failed to submit review');
        // Handle error if needed
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }