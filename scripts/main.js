// ------ ATTACHING JAVASCRIPT TO HTML ------
// grabbing form
const form = document.querySelector("form");

// getting event listener "submit" - Appends an event listener for events whose type attribute value is type "submit" in this case. The callback argument sets the callback that will be invoked when the event is dispatched
form.addEventListener("submit", (event) => {
    event.preventDefault(); // the default is reloading page whenever submit button is clicked
    // console.log ("I have submitted my form"); // this is shown in DOM
    console.log ("Plant:", event.target.plant.value);// to grab values of the form make an event target and add .value to get the values inputted in fields instead of the html code. Logs to DOM console
    console.log ("Color:", event.target.color.value);
    console.log ("Description:", event.target.notes.value);
    // add callback function from generatePlant.js to append donated plants to webpage
    const { plant,color,notes } = event.target; // using destructuring to keep code DRY and use it as variables in callback fx
    donatePlant(plant.value,color.value,notes.value); // add .value to get the values inputted by user and not just the html code
    // reset form after appending donated plant to webpage
    form.reset();

});