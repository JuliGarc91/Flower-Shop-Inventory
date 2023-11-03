// ------ CALL BACK FUNCTION FOR EVENT LISTENER METHOD IN main.js ------
//function will be used as a callback in main.js to generate a plant to add (donate in this case) to inventory
function donatePlant (plant,color,notes) { // fx appends donated plant to webpage
    const li = donatedPlantTemplate (plant,color,notes); // call back fx that generates html template
    // grab ul list from DOM
    const ul = document.querySelector("ul"); // creating variable for ul tag to append to webpage (need to grab it first in order to append it)
    ul.append(li); //appending newly created li to webpage
};

// ------ CALL BACK FUNCTION FOR FX donatePlant ------
function donatedPlantTemplate (plant,color,notes) { // fx creates template of li tags
    const li = document.createElement("li"); // create variable for li tag by grabbing it from html code
    li.classList.add("single-plant"); // class name for li that we want is single-plant
    
    // create Remove Plant Item button for the template
    const removeButton = document.createElement("button");
    // add text to the button that says "Remove Plant Item"
    removeButton.textContent = "Remove Plant Item";
    // add event listener so button works
    removeButton.addEventListener("click", (event) => {
        event.target.closest(".single-plant").remove(); // when button is clicked it'll delete li element with class "single-plant" closest to the button's parent since button is inside li element with that particular class
    });

    
    if (plant && color) { //if statement to check if these fields are filled out since they are required fields
        li.innerHTML = `<h3>🌻</h3>
        <p><strong>Common Plant Name</strong>: ${plant}</p>
        <p><strong>Dominant Plant Color</strong>: ${color}</p>
        <p><strong>Description</strong>: ${notes ? `${notes}` : `none`}</p>`; // if notes are entered show notes, otherwise show "none"
        // append button to the li
        li.append(removeButton);
    };
    return li;
};
