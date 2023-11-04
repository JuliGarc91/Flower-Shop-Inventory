// ------ ATTACHING JAVASCRIPT TO HTML ------
// grabbing form from index.html
const form = document.querySelector("form");

// ---------- SUBMIT BUTTON FUNCTIONALITY ---------- 
// getting event listener "submit" - Appends an event listener for events whose type attribute value is type "submit" in this case. The callback argument sets the callback that will be invoked when the event is dispatched
form.addEventListener("submit", (event) => {
    event.preventDefault(); // the default is reloading page whenever submit button is clicked
    console.log ("Name:", event.target.name.value);
    console.log ("Plant:", event.target.plant.value);// to grab values of the form make an event target and add .value to get the values inputted in fields instead of the html code. Logs to DOM console
    console.log ("Color:", event.target.color.value);
    console.log ("Description:", event.target.notes.value);
    // add callback function from generatePlant.js to append donated plants to webpage
    const { name,plant,color,notes } = event.target; // using destructuring to keep code DRY and use it as variables in callback fx
    donatePlant(name.value,plant.value,color.value,notes.value); // uses call back function from generatePlant.js and add .value to arguments in order to get the values inputted by user and not just the html code
    addCount(count); // update plant count w/ callback fx from generatePlant.js
    form.reset(); // reset form after appending donated plant to webpage
});

// ---------- HARDCODED REMOVE BUTTON FUNCTIONALITY ---------- 
// to add functionality where hardcoded listItems can be removed (these list items are single plants donated to the inventory)

const listItems = document.querySelectorAll("li"); // querySelectAll is a method that returns all element descendants of node that match selectors (data type of output is an array so we can iterate through it)
for (item of listItems) {
    item.addEventListener("click", (event) => {
        event.target.closest(".single-plant").remove(); // when button is clicked it'll delete li element with class "single-plant" closest to the button's parent since button is inside li element with that particular class
        decrementCount(); // callback fx from generatePlant.js to decrement donated plants count
    });
};

// ---------- RESET BUTTON FUNCTIONALITY ---------- 
function resetForm() {
    const form = document.getElementById("new-plant"); // Get the form element by its ID
    form.reset(); // Reset the form to its initial state
    const notesTextarea = document.getElementById("notes"); // clear the description textarea if needed
    notesTextarea.value = "";
}

// ------ Description Text Box can only contiain fixed amount of characters ------
const textarea = document.getElementById("notes"); // Get a reference to the textarea element with the id "notes"
const charCount = document.getElementById("char-count"); // Get a reference to the element with the id "char-count"
textarea.addEventListener("input", () => { // Add an event listener to the textarea element that listens for the "input" event
    // Get the maximum number of characters allowed for the textarea from its "maxlength" attribute
    const maxLength = parseInt(textarea.getAttribute("maxlength"));
    const currentLength = textarea.value.length; // Get the current length of the text in the textarea
    const remainingCharacters = maxLength - currentLength; // Calculate the number of remaining characters by subtracting the current length from the maximum length
    charCount.textContent = `Characters left: ${remainingCharacters}`; // Update the text content of the element with the id "char-count" to display the remaining characters
});

// ------ DROP DOWN MENU for plant name ------
document.addEventListener("DOMContentLoaded", function () {
    const plantDropdown = document.getElementById("plant");
    // Function to add options to the dropdown
    function populateDropdown(data) {
        data.forEach((plant) => { // method iterates through data array of objects from plantInventory.JSON
            const option = document.createElement("option"); // Create a new HTML <option> element.
            option.value = plant.plantName; // Set the value of the <option> element to the plant's name from the data.
            option.textContent = plant.plantName; // Set the text content of the <option> element to the plant's name from the data.
            plantDropdown.appendChild(option);  // Append the newly created <option> element to the plantDropdown element.
        });
    }
    // Fetch the JSON data from the file
    fetch("data/plantInventory.json") // Initiate a network request to fetch data from the "data/plantInventory.json" URL.
        .then((response) => response.json()) // When the response is received, parse it as JSON
        .then((data) => { // Once the JSON data is successfully parsed, execute the following code block:
            // Call the function to populate the dropdown with the retrieved data
            populateDropdown(data);
        })
        .catch((error) => console.error("Error loading plant data:", error)); // The fetch operation is asynchronous, and the Promise returned by fetch is used to handle the request's success or failure. The Promise part is the structure of the code that involves .then() and .catch(), which are used to handle the asynchronous operation of fetching and processing the data. The .then() block handles success, while .catch() is for handling errors in the Promise.
});

// ------ DROP DOWN MENU for color ------

document.addEventListener("DOMContentLoaded", function () {
    const colorDropdown = document.getElementById("color");
    // Function to add options to the dropdown
    function populateDropdown(data) {
        const uniqueColors = [];
        data.forEach((plant) => {
            if (!uniqueColors.includes(plant.dominantColor)) {
                uniqueColors.push(plant.dominantColor);
                const option = document.createElement("option");
                option.value = plant.dominantColor;
                option.textContent = plant.dominantColor;
                colorDropdown.appendChild(option);
            }
        });
    }
    // Fetch the JSON data from the file
    fetch("data/plantInventory.json")
        .then((response) => response.json())
        .then((data) => {
            // Call the function to populate the dropdown with the retrieved data
            populateDropdown(data);
        })
        .catch((error) => console.error("Error loading plant data:", error));
});

