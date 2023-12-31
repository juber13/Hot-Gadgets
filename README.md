# Hot-Gadgets https://juber13.github.io/Hot-Gadgets/
It defines several variables and initializes them with appropriate values.
The fetchApi function is an asynchronous function that makes a GET request to the specified API endpoint and returns the data.
The createPhone function is an asynchronous function that fetches phone data using the fetchApi function and dynamically creates HTML elements to display the phone information on the webpage.
The showMorePhones function is an asynchronous function that fetches additional phone data when the "Show More" button is clicked and updates the displayed phones accordingly.
The showDetails function is an asynchronous function that fetches detailed information about a specific phone when the "SHOW DETAILS" button is clicked and displays it in a modal.
The form event listener listens for form submissions and calls the createPhone function with the entered search text to display matching phones.
The closeModal function removes the "active" class from the modal element to hide it when the "CLOSE" button is clicked.
The close event listener listens for clicks on the "CLOSE" button and calls the closeModal function to hide the modal.
Overall, this code provides a way to search for phones, display them on a webpage, and view detailed information about each phone in a modal.
