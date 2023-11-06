// ------ CALLBACK FUNCTIONS TO USE IN main.js TO UPDATE PLANT COUNT for submit button and remove button ------

let count = 3; // 3 already hard coded

function addCount(countParam) {
    const span = document.querySelector(".plant-count"); // select HTML element w/ class "plant-count" and store in the 'span' variable
    span.textContent = `(Donated Plants on Display 🤍: ${countParam})`; // update text content of selected span to display the count parameter
}

function decrementCount() {
    count--; // decrement'count' variable (which is not defined in this code but defined elsewhere in main.js)
    addCount(count); // call 'addCount' fx with updated 'count' value to update displayed count
}