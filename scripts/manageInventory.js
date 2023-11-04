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
        const listItem = document.createElement("li"); // create new HTML 'li' (list item) element to store in 'listItem'
        listItem.classList.add("single-plant"); // adding the CSS class "single-plant" to the 'listItem' element for styling or identification purposes

        const emoji = document.createElement("h3");
        emoji.textContent = "🌻";

        const commonName = document.createElement("p"); // Create a new HTML 'p' (paragraph) element and store in the 'commonName' variable
        commonName.innerHTML = `<strong>Common Plant Name</strong>: ${plant.plantName}`; // Set the inner HTML of the 'commonName' paragraph to display the common plant name. Inner HTML of this paragraph is set to display common plant name using value of plantName property from object named plant. The common plant name is enclosed in <strong> tags to make it bold in the rendered HTML

        const dominantColor = document.createElement("p");
        dominantColor.innerHTML = `<strong>Dominant Plant Color</strong>: ${plant.dominantColor}`;

        const priceInCents = document.createElement("p");
        priceInCents.innerHTML = `<strong>PriceInCents</strong>: ${plant.priceInCents}`;

        const inStockSelect = document.createElement("select");
        inStockSelect.classList.add("In-Stock");

        // used when dynamically creating options for a <select> element in an HTML form aka dropdown menu, where the value attribute represents the value associated with the option, and the text is the visible label for the option
        const inStockOption = document.createElement("option"); // new option element created
        inStockOption.value = "In Stock"; // Set 'value' property of 'inStockOption' element to string "In Stock"
        inStockOption.text = "In Stock"; // Set 'text' property of 'inStockOption' element to string "In Stock"


        const outOfStockOption = document.createElement("option"); // Create a new HTML 'option' element and store it in the 'outOfStockOption' variable

        outOfStockOption.value = "Out of Stock";
        outOfStockOption.text = "Out of Stock";

        inStockSelect.appendChild(inStockOption);
        inStockSelect.appendChild(outOfStockOption);

        // set selected option based on the plant's inStock property in json file
        if (plant.inStock) {
            inStockOption.selected = true;
        } else {
            outOfStockOption.selected = true;
        }
        // appends to webpage
        listItem.appendChild(emoji);
        listItem.appendChild(commonName);
        listItem.appendChild(dominantColor);
        listItem.appendChild(priceInCents);
        listItem.appendChild(inStockSelect);

        plantList.appendChild(listItem);
    });

    const plantInventorySection = document.querySelector(".plant-inventory-container"); // find and select an HTML element with class "plant-inventory-container" and store in 'plantInventorySection'
    plantInventorySection.innerHTML = ""; // Clear any existing content
    plantInventorySection.appendChild(plantList);
}
