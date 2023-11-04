// ------ CALL BACK FUNCTION FOR EVENT LISTENER METHOD IN main.js ------
//function will be used as a callback in main.js to generate a plant to add (donate in this case) to inventory
function donatePlant (name, plant,color,notes) { // fx appends donated plant to webpage
    const li = donatedPlantTemplate (name,plant,color,notes); // call back fx that generates html template
    // grab ul list from DOM
    const ul = document.querySelector("ul"); // creating variable for ul tag to append to webpage (need to grab it first in order to append it)
    
    if (name && plant && color) {
        saveDonatedPlant({ name, plant, color, notes });
    }
    ul.append(li); //appending newly created li to webpage
};

// ------ CALL BACK FUNCTION FOR FX donatePlant ------
function donatedPlantTemplate (name, plant,color,notes) { // fx creates template of li tags
    const li = document.createElement("li"); // create variable for li tag by grabbing it from html code
    li.classList.add("single-plant"); // class name for li that we want is single-plant
    
    // create Remove Plant Item button for the template
    const removeButton = document.createElement("button");
    // add text to the button that says "Remove Plant Item"
    removeButton.textContent = "Remove from list";
    // add event listener so button works
    removeButton.addEventListener("click", (event) => {
        event.target.closest(".single-plant").remove(); // when button is clicked it'll delete li element with class "single-plant" closest to the button's parent since button is inside li element with that particular class
        try {
            localStorage.removeItem('donatedPlants');
                alert("Plant removed from list. 💚");
            } catch (e) {
                alert("🤯 Failed to remove plant from list: " + e.message); // Handle errors, such as when local storage is disabled or full
            }
        decrementCount()
    });
    
    if (name && plant && color) { //if statement to check if these fields are filled out since they are required fields
        const currentDate = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };

        li.innerHTML = `<h3>🌻</h3>
            <p><strong>Donor</strong>: ${name}</p>
            <p><strong>Common Plant Name</strong>: ${plant}</p>
            <p><strong>Dominant Plant Color</strong>: ${color}</p>
            <p><strong>In Stock?</strong>
                <select>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </p>
            <p><strong>Notes</strong>: ${notes ? `${notes}` : `none`}</p> 
            <p id="date"><strong>Donated</strong>: ${currentDate.toLocaleDateString(undefined, options)}</p>`; // if notes are entered show notes, otherwise show "none"
        li.append(removeButton); // append button to the li
        count ++;
        addCount(count);
    }
    return li;
};

// ------ Function to save donated plant data to local storage ------
function saveDonatedPlant(plantData) {
    let donatedPlants = JSON.parse(localStorage.getItem('donatedPlants')) || [];

    donatedPlants.push(plantData);

    localStorage.setItem('donatedPlants', JSON.stringify(donatedPlants));
}

// ------ Function to load and display donated plants from local storage ------
function loadDonatedPlants() {
    const ul = document.querySelector("ul");
    const donatedPlants = JSON.parse(localStorage.getItem('donatedPlants')) || [];

    donatedPlants.forEach((plantData) => {
        const li = donatedPlantTemplate(plantData.name, plantData.plant, plantData.color, plantData.notes);
        ul.appendChild(li);
    });
}

// ------ ALERT LETTING USER KNOW ELEMENT HAS BEEN REMOVED from hardcoded elements ------
// Hardcoded elements will persist upon refresh unlike generated ones using js functions however fx will still remove element and give alert
function alert() {
    try {
        alert("Plant removed from list. 💚");
    } catch (e) {
        // Handle errors, such as when local storage is disabled or full
        alert("🤯 Failed to remove plant from list: " + e.message);
    }
}