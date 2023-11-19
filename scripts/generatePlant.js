// ------ CALL BACK FUNCTION FOR EVENT LISTENER METHOD IN main.js ------
//function will be used as a callback in main.js to generate a plant to append to page(donate in this case)
function donatePlant (name, plant,color,notes) { // fx appends donated plant to webpage
    const li = donatedPlantTemplate (name,plant,color,notes); // call back fx that generates html template
    // grab ul list from DOM
    const ul = document.querySelector("ul"); // creating variable for ul tag to append to webpage (need to grab it first in order to append it)
    
    if (name && plant && color) {
        saveDonatedPlant({ name, plant, color, notes }); // parsed Data for local storage used as a callback fx here
    }
    ul.append(li); //appending newly created li to webpage
};

// ------ CALL BACK FUNCTION FOR FX donatePlant and local storage fx loadDonatedPlants ------
function donatedPlantTemplate (name, plant,color,notes) { // fx creates template of li tags
    const li = document.createElement("li"); // create variable for li tag by grabbing it from html code
    li.classList.add("single-plant"); // class name for li that we want is single-plant
    
    // create Remove Plant Item button for the template
    const removeButton = document.createElement("button");
    // add text to the button
    removeButton.textContent = "Remove Today's Donated Plant(s)";


    // creating style here instead of using CSS because CSS isn't showing the style properly on webpage as it does locally
    removeButton.addEventListener("mouseover", function() {
        this.style.opacity = 0.9;
        this.style.backgroundImage = "url(https://www.bbg.org/img/uploads/lightbox/_lightbox_retina/15768824452_maple.jpg)"; // makes button have cool image when mice hovers
        this.style.backgroundSize = "contain";
    });
    
    // Add a mouseout event listener to revert styles
    removeButton.addEventListener("mouseout", function() {
        this.style.opacity = 1;
        this.style.backgroundImage = "none";
    });


    // add event listener so button works
    removeButton.addEventListener("click", (event) => {
        event.target.closest(".single-plant").remove(); // when button is clicked it'll delete li element with class "single-plant" closest to the button's parent since button is inside li element with that particular class
            localStorage.removeItem('donatedPlants');
            decrementCount()
    });
    
    if (name && plant && color) { //if statement to check if these fields are filled out since they are required fields
        const currentDate = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };

        li.innerHTML = `<h3>💛</h3>
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

// ------ CALLBACK FUNCTION to save donated plant data to local storage ------

// when a user donates a plant in application, you are using the localStorage.setItem method to save data related to that plant under the 'donatedPlants' key. If this is the first time data is being saved with that key, it will be created. Subsequent donations will append to or modify the data associated with this key.

// initially retrieves the value associated with the key 'donatedPlants' from local storage using localStorage.getItem('donatedPlants'), storing it in the donatedPlants variable as a JSON-formatted string. It then utilizes JSON.parse to transform this string into a JavaScript object, which is stored back in the donatedPlants variable. Next, the plantData object, representing donated plant data, is appended to the donatedPlants array, and the updated array is serialized into a JSON string using JSON.stringify. Finally, this modified string is saved back into local storage under the 'donatedPlants' key with localStorage.setItem('donatedPlants', JSON.stringify(donatedPlants)), effectively updating the stored data.

function saveDonatedPlant(plantData) {
    let donatedPlants = JSON.parse(localStorage.getItem('donatedPlants')) || []; // retrieves the value associated with the key 'donatedPlants' from the browser's local storage. Local storage is a mechanism for storing key-value pairs in a web browser

    // JSON.parse(...) parses the retrieved value as a JSON string and converts it into a JavaScript object. If there's nothing stored under the 'donatedPlants' key or if the stored value is not a valid JSON string, it will result in null or an empty object, depending on the outcome.

    // || [] necessary in case result is falsy (null in this case). So, if there's no value in localStorage or if it's not valid JSON, donatedPlants will be set to an empty array []

    donatedPlants.push(plantData);

    //localStorage.setItem(...): It sets the value in localStorage with the key 'donatedPlants' to the serialized JSON string. This effectively saves the updated donatedPlants array back into localStorage, overwriting any previous value associated with the same key

    localStorage.setItem('donatedPlants', JSON.stringify(donatedPlants)); // converts the donatedPlants array back into a JSON-formatted string. This is necessary because localStorage can only store strings, so you need to serialize the JavaScript object into a string.

}

// ------ CALLBACK FUNCTION to load and display donated plants from local storage - will be used on main.js when page refreshes to let data persist on webpage ------

// the donatedPlants array is essentially a list of all donated plants that have been saved in the local storage, and it gets updated with new plant data each time the saveDonatedPlant function is called. In this case we refer to the individual keys as plantData because we can name it whatever we want after assigning a variable to the parsed data
function loadDonatedPlants() {
    const ul = document.querySelector("ul");
    const donatedPlants = JSON.parse(localStorage.getItem('donatedPlants')) || [];

    // iterated through array of objects to extract keys with values we want to append to li to append to ul
    donatedPlants.forEach((plantData) => {
        const li = donatedPlantTemplate(plantData.name, plantData.plant, plantData.color, plantData.notes);
        ul.appendChild(li);
    });
}