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
    
    // update plant count
    count++; // to increment variable in callback fx
    addCount(count);
    // reset form after appending donated plant to webpage
    form.reset();
});

// ---------- HARDCODED REMOVE BUTTON FUNCTIONALITY ---------- 
// to add functionality where hardcoded listItems can be removed (these list items are single plants donated to the inventory)

const listItems = document.querySelectorAll("li"); // querySelectAll is a method that returns all element descendants of node that match selectors (data type of output is an array so we can iterate through it)
for (item of listItems) {
    item.addEventListener("click", (event) => {
        event.target.closest(".single-plant").remove(); // when button is clicked it'll delete li element with class "single-plant" closest to the button's parent since button is inside li element with that particular class
        decrementCount();
    });
};


// ---------- RESET BUTTON FUNCTIONALITY ---------- 
function resetForm() {
    const form = document.getElementById("new-plant"); // Get the form element by its ID
    form.reset(); // Reset the form to its initial state

    // clear the description textarea if needed
    const notesTextarea = document.getElementById("notes");
    notesTextarea.value = "";
}

// ------ TEST!!!!! ---- handles page load to save data
// Add an event listener to handle page load
window.addEventListener('load', () => {
    const ul = document.querySelector('ul');
    
//     Retrieve donated plant data from localStorage
     const donatedPlants = JSON.parse(localStorage.getItem('donatedPlants')) || [];

//      Iterate through the saved data and render it on the page
    donatedPlants.forEach((plantData) => {
        const { name, plant, color, notes } = plantData;
        donatePlant(name, plant, color, notes); // Render the plant on the page
    });
});

// ------ Description Text Box can only contiain fixed amount of characters ------
const textarea = document.getElementById("notes");
const charCount = document.getElementById("char-count");

textarea.addEventListener("input", () => {
    const maxLength = parseInt(textarea.getAttribute("maxlength"));
    const currentLength = textarea.value.length;
    const remainingCharacters = maxLength - currentLength;

    charCount.textContent = `Characters left: ${remainingCharacters}`;
});
