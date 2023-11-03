// In a browser environment, you typically don't use require or import to load JSON data directly from a file. Instead, you use the Fetch API or other methods to make an HTTP request to the JSON file and retrieve the data. The require or import statements are typically used in server-side JavaScript (Node.js) to load modules or files, and they are not available in the browser.


// Function to fetch data from a JSON file
function fetchDataAndGenerateTemplate() {
    fetch('data/plantInventory.json') // Replace 'plantInventory.json' with the correct path if needed
        .then((response) => response.json())
        .then((plantData) => {
            generatePlantTemplate(plantData);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
}

// Call the function to fetch data and generate the template
console.log(fetchDataAndGenerateTemplate());

function generatePlantTemplate(plantData) {
    const plantList = document.createElement("ul");

    plantData.forEach((plant) => {
        const listItem = document.createElement("li");
        listItem.classList.add("single-plant");

        const emoji = document.createElement("h3");
        emoji.textContent = "🌻";

        const commonName = document.createElement("p");
        commonName.innerHTML = `<strong>Common Plant Name</strong>: ${plant.plantName}`;

        const dominantColor = document.createElement("p");
        dominantColor.innerHTML = `<strong>Dominant Plant Color</strong>: ${plant.dominantColor}`;

        const priceInCents = document.createElement("p");
        priceInCents.innerHTML = `<strong>PriceInCents</strong>: ${plant.priceInCents}`;

        const inStockButton = document.createElement("button");
        inStockButton.classList.add("In-Stock");
        inStockButton.textContent = plant.inStock ? "In Stock" : "Out of Stock";

        listItem.appendChild(emoji);
        listItem.appendChild(commonName);
        listItem.appendChild(dominantColor);
        listItem.appendChild(priceInCents);
        listItem.appendChild(inStockButton);

        plantList.appendChild(listItem);
    });

    const plantInventorySection = document.querySelector(".plant-inventory-container");
    plantInventorySection.innerHTML = ""; // Clear any existing content
    plantInventorySection.appendChild(plantList);
}

