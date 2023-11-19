// In a browser environment, you typically don't use require or import to load JSON data directly from a file. Instead, you use the Fetch API or other methods to make an HTTP request to the JSON file and retrieve the data. The require or import statements are typically used in server-side JavaScript (Node.js) to load modules or files, and they are not available in the browser.

// Step 2: add fx generatePlantTemplate as a call back to populate template with JSON data from API
// Function to fetch data from a JSON file in https://perenual.com/docs/api API - will be used to populate inventory ul tags

// comment out fx fetchDataAndGenerateTemplate to not use up API calls when testing other features in plantInventory.html
function fetchDataAndGenerateTemplate() {
    fetch(`https://perenual.com/api/species-list?key=${API_KEY}`) // uses the fetch function to make an HTTP request to the specified URL, which is 'data/plantInventory.json'
        .then((response) => response.json()) // response is received from the URL, this line sets up a then callback that handles the response. The response.json() method is used to parse the response body as JSON. This is important because JSON is a common data format for exchanging data between a web server and a web page
        .then((res) => {
            // console.log(res.data) // to see what API data looks like in DOM
            allPlantsData = res.data; // (for search bar) Store the data which is an object of an array of objects where some keys contain arrays
            generatePlantTemplate(allPlantsData); // Generate the initial template to use for searchbar (uses saved data for function so no API calls per search, only to get data to save to allPlantsData)
            generatePlantTemplate(res.data); //  after successfully parsing the JSON data, this line sets up another then callback. It passes the parsed plantData to the generatePlantTemplate function, which is responsible for creating and updating elements in the DOM. This is where the data from API is used to generate the plant inventory list in the DOM
        })
        .catch((error) => {
            console.error('Error fetching data:', error); // If there are any errors during the fetch operation, this line sets up a catch callback to handle them. In this case, it logs an error message using console.error(). It's important to handle errors gracefully to ensure that any issues with fetching data do not crash the web page
        });
}
console.log(fetchDataAndGenerateTemplate()); // Call the function to fetch data and generate the template

// Step 1: make html template be used as callback fx for fx fetchDataAndGenerateTemplate and generate inventory on plantInventory.html - also used for search bar fx performSearch
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
        scienceName.innerHTML = `<strong>Scientific Name</strong>: ${plant.scientific_name}`;

        const otherName = document.createElement("p");
        otherName.innerHTML = `<strong>Other Name(s)</strong>: ${plant.other_name.length ? plant.other_name.join(", ") : 'None'}`; // ternary statement (if other_names array is empty then otherName variable will be "None")

        const cycle = document.createElement("p");
        cycle.innerHTML = `<strong>Cycle</strong>: ${plant.cycle}`;

        const watering = document.createElement("p");
        watering.innerHTML = `<strong>Watering</strong>: ${plant.watering}`;


        // Append other elements to the list item on web page

        listItem.appendChild(emoji);
        listItem.appendChild(commonName);
        listItem.appendChild(scienceName);
        listItem.appendChild(otherName);
        listItem.appendChild(cycle);
        listItem.appendChild(watering);

        const inStockSelect = document.createElement("select"); // for inStock drop down menu

        // Create and append the <option> elements
        const optionYes = document.createElement("option"); // to add the option
        optionYes.value = "In Stock"; // .value is what gets sent to the server when the form containing the select element is submitted. It's also what JavaScript can access when you want to get the selected option's value
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
    plantInventorySection.innerHTML = ""; // Clear any existing content in html in this section to replace with plantList which contains the list of plants generated from the fetched data to the section with class .plant-inventory-container which is now saved to a variable
    plantInventorySection.appendChild(plantList); // this appends the ul plantList items which are the plant cards (with li listItems - the content of the cards) to the section with class "plant-inventory-container"
}

// ------ SEARCH BAR FX ------
// Function to perform client-side filtering (only 1 API call)

function performSearch(event) {
  event.preventDefault(); // Prevent the default form submission behavior (which is to reload the page) to handle the form submission ourselves to perform a search without a page reload

  // Obtain the search input and filter type from the form
  const searchInput = document.querySelector('.search-area #search-input').value.toLowerCase(); // .search-area is the form tag class #search-input is where user will put what they want to search
  const filterType = document.querySelector('.search-area #filter-type').value; //.value gets sent to server to access the current value selected by the user in option field under select with id filter-type. It retrieves the value that has been set programmatically that user selected

  // allPlantsdata is an array of objects so need array method .filter is a native array method that will Filter the allPlantsData and return a new array based on the search input and filter type (a condition / boolean)
  const filteredData = allPlantsData.filter(plant => { // filteredData is declared as a new array that will store the filtered results. The allPlantsData array is filtered using the .filter() method. For each element (plant) in allPlantsData, it checks whether the value of the property specified by filterType matches the searchInput.
      const searchData = plant[filterType]; // Get the data to filter on based on filterType which is the key in array of objects

      // Join array data into a string or keep string data as-is
      const plantDataToString = Array.isArray(searchData) ? searchData.join(' ').toLowerCase() : searchData.toLowerCase(); // checks if searchData has user selected filterType key which may contain an array. If it is, it joins the array elements into a single string with spaces in between and converts it to lowercase. If searchData is not an array, it simply converts it to lowercase


      return plantDataToString.includes(searchInput); // returns string that contains user searchInput text that matches filterType key (plantDataToString manipulates searchData variable that contains user selected filterType key which may have contained an array which ternary made into string)
  });

  // Callback function to update the UI with filteredData callback function
  generatePlantTemplate(filteredData);
}

// Attach the performSearch function to the form's submit event
const searchForm = document.querySelector('.search-area');
searchForm.addEventListener('submit', performSearch);
