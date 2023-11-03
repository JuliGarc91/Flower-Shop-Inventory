// ------ CALLBACK FUNCTION TO USE IN main.js TO UPDATE PLANT COUNT ------
let count = 1; // 1 is already hard coded
function addCount (countParam) {
    const newCount =document.querySelector(".plant-count");
    newCount.textContent = `(Number of Plants: ${countParam})`;
};