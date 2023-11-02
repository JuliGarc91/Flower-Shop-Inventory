// ------ ATTACHING JAVASCRIPT TO HTML ------
// grabbing form
const form = document.querySelector("form");

// getting event listener "submit" - Appends an event listener for events whose type attribute value is type "submit" in this case. The callback argument sets the callback that will be invoked when the event is dispatched
form.addEventListener("submit", (event) => {
    event.preventDefault(); // the default is reloading page whenever submit button is clicked
    console.log ("I have submitted my form");
});