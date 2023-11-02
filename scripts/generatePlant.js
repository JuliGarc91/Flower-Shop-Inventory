// function that will be used as a callback in main.js which generates a plant to add to inventory

function donatePlant (plant,color,notes) {
    const li = document.createElement("li"); // create variable for li tag
    li.classList.add("single-plant"); // class name for li that we want is single-plant

    // to actually add li element with class "single-plant"
    if (plant && color) { //if statement to check if these fields are filled out since they are required fields
        li.innerHTML = `<h3>🌻</h3>
        <p><strong>Common Plant Name</strong>: ${plant}</p>
        <p><strong>Dominant Plant Color</strong>: ${color}</p>
        <p><strong>Description</strong>: ${notes ? `${notes}` : `none`}</p>`;
    };

    // grab ul list from DOM
    const ul = document.querySelector("ul"); // creating variable for ul tag to append to webpage (need to grab it first in order to append it)
    ul.append(li); //appending newly created li to webpage
};