// In a browser environment, you typically don't use require or import to load JSON data directly from a file. Instead, you use the Fetch API or other methods to make an HTTP request to the JSON file and retrieve the data. The require or import statements are typically used in server-side JavaScript (Node.js) to load modules or files, and they are not available in the browser.

// Step 2: add fx generatePlantTemplate as a call back to populate template with JSON data from API
// Function to fetch data from a JSON file in https://perenual.com/docs/api API - will be used to populate inventory ul tags

function fetchDataAndGenerateTemplate() {
    fetch(`https://perenual.com/api/species-list?key=${API_KEY}`) // uses the fetch function to make an HTTP request to the specified URL, which is 'data/plantInventory.json'
        .then((response) => response.json()) // response is received from the URL, this line sets up a then callback that handles the response. The response.json() method is used to parse the response body as JSON. This is important because JSON is a common data format for exchanging data between a web server and a web page
        .then((res) => {
            console.log(res.data)
            generatePlantTemplate(res.data); //  after successfully parsing the JSON data, this line sets up another then callback. It passes the parsed plantData to the generatePlantTemplate function, which is responsible for creating and updating elements in the DOM. This is where the data from plantInventory.json is used to generate the plant inventory list in the DOM
        })
        .catch((error) => {
            console.error('Error fetching data:', error); // If there are any errors during the fetch operation, this line sets up a catch callback to handle them. In this case, it logs an error message using console.error(). It's important to handle errors gracefully to ensure that any issues with fetching data do not crash the web page
        });
}
console.log(fetchDataAndGenerateTemplate()); // Call the function to fetch data and generate the template

// Step 1: make html template be used as callback fx for fx fetchDataAndGenerateTemplate and generate inventory on plantInventory.html
function generatePlantTemplate(plantData) {
    const plantList = document.createElement("ul");

    plantData.forEach((plant) => {
        const listItem = document.createElement("li"); // create new HTML 'li' (list item) element to store in 'listItem'
        listItem.classList.add("single-plant"); // adding the CSS class "single-plant" to the 'listItem' element for styling or identification purposes (also for consistency bc li items in donatePlant.html have class .single-plant)

        const emoji = document.createElement("h3");
        emoji.textContent = "🌻";

        const commonName = document.createElement("p"); // Create a new HTML 'p' (paragraph) element and store in the 'commonName' variable
        commonName.innerHTML = `<strong>Common Plant Name</strong>: ${plant.common_name}`; // Set the inner HTML of the 'commonName' paragraph to display the common plant name. Inner HTML of this paragraph is set to display common plant name using value of plantName property from object named plant. The common plant name is enclosed in <strong> tags to make it bold in the rendered HTML

        const scienceName = document.createElement("p");
        scienceName.innerHTML = `<strong>Dominant Plant Color</strong>: ${plant.scientific_name}`;

        const otherName = document.createElement("p");
        otherName.innerHTML = `<strong>Other Name(s)</strong>: ${plant.other_name.length ? plant.other_name.join(", ") : 'None'}`; // ternary statement (if other_names array is empty then otherName variable will be "None")


        // Append other elements to the list item on web page

        listItem.appendChild(emoji);
        listItem.appendChild(commonName);
        listItem.appendChild(scienceName);
        listItem.appendChild(otherName);

        const inStockSelect = document.createElement("select");

        // Create and append the <option> elements
        const optionYes = document.createElement("option");
        optionYes.value = "In Stock";
        optionYes.textContent = "In Stock";

        const optionNo = document.createElement("option");
        optionNo.value = "Out of Stock";
        optionNo.textContent = "Out of Stock";

        inStockSelect.appendChild(optionYes);
        inStockSelect.appendChild(optionNo);

        // Append the <select> element to the list item
        listItem.appendChild(inStockSelect);

        plantList.appendChild(listItem);
    });

    const plantInventorySection = document.querySelector(".plant-inventory-container"); // find and select an HTML element with class "plant-inventory-container" and store in 'plantInventorySection' this is the entire section that contains all the plant items
    plantInventorySection.innerHTML = ""; // Clear any existing content in html i this section to replace with plantList which contains the list of plants generated from the fetched data to the section with class .plant-inventory-container which is now saved to a variable
    plantInventorySection.appendChild(plantList); // this appends the ul plantList items (with li listItems) to the section
}
