// ------ CALLBACK FUNCTION TO USE IN main.js TO UPDATE PLANT COUNT for submit button and remove button ------
let count = 3; // 3 are already hard coded
function addCount (countParam) {
    const span = document.querySelector(".plant-count");
    span.textContent = `(Number of Plants Donated: ${countParam})`;
    countParam++
};

function decrementCount() {
    count--;
    addCount (count);
};