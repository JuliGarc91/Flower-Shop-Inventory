// In a browser environment, you typically don't use require or import to load JSON data directly from a file. Instead, you use the Fetch API or other methods to make an HTTP request to the JSON file and retrieve the data. The require or import statements are typically used in server-side JavaScript (Node.js) to load modules or files, and they are not available in the browser.


// Function to fetch data from a JSON file
function fetchDataAndGenerateTemplate() {
    fetch('data/plantInventory.json') // uses the fetch function to make an HTTP request to the specified URL, which is 'data/plantInventory.json'
        .then((response) => response.json()) // response is received from the URL, this line sets up a then callback that handles the response. The response.json() method is used to parse the response body as JSON. This is important because JSON is a common data format for exchanging data between a web server and a web page
        .then((plantData) => {
            generatePlantTemplate(plantData); //  after successfully parsing the JSON data, this line sets up another then callback. It passes the parsed plantData to the generatePlantTemplate function, which is responsible for creating and updating elements in the DOM. This is where the data from plantInventory.json is used to generate the plant inventory list in the DOM
        })
        .catch((error) => {
            console.error('Error fetching data:', error); // If there are any errors during the fetch operation, this line sets up a catch callback to handle them. In this case, it logs an error message using console.error(). It's important to handle errors gracefully to ensure that any issues with fetching data do not crash the web page
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