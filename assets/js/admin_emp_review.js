// Function to change the review dynamically
    /*function changeReview(reviewId) {
      const selectElement = document.getElementById('changeReview_' + reviewId);
      const selectedValue = selectElement.value;
      const reviewElement = document.getElementById('review_' + reviewId);
      reviewElement.innerHTML = '<strong>Review:</strong> ' + selectedValue;
      */
      // You can further perform an AJAX request to update the review on the server
      // This example only updates the review dynamically in the browser
      async function changeReview(reviewId) {
        const selectElement = document.getElementById('changeReview_' + reviewId);
        const selectedValue = selectElement.value;
        const reviewElement = document.getElementById('review_' + reviewId);
  
        if (!selectedValue) {
        // If no option is selected, display an alert or a message
        alert('Please select something from the dropdown.');
        return; // Stop further execution of the function
      }
        try {
          const response = await fetch('/Admin/updateReview/', {
            method: 'POST', // Use appropriate HTTP method for updating reviews (PUT, POST, etc.)
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ reviewId, updatedReview: selectedValue })
          });
  
          const updatedReview = await response.json();
  
          // Update the review content displayed on the page
          reviewElement.innerHTML = '<strong>Review:</strong> ' + updatedReview.review;
        } catch (error) {
          console.error('Error updating review:', error);
        }
      }