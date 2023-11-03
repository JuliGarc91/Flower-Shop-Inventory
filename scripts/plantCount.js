// ------ CALLBACK FUNCTION TO USE IN main.js TO UPDATE PLANT COUNT ------
let count = 1; // 1 is already hard coded
function addCount (countParam) {
    const span = document.querySelector(".plant-count");
    span.textContent = `(Number of Plants: ${countParam})`;
};

function decrementCount() {
    count--;
    addCount (count);
};