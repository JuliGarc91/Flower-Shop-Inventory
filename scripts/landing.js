// Fetch data from the API for the slideshow on index.html

// fetch(`https://perenual.com/api/species-list?key=${API_KEY}`)
//     .then(response => response.json())
//     .then(data => {
//         createSlideshow(data.data);
//     })
//     .catch(error => {
//         console.error('Error fetching data:', error);
//     });

const data =""; //temporary so I don't use up API

// ------ FUNCTION TO CREATE SLIDESHOW template ON index.html from the fetched API data -----
function createSlideshow(data) {
    // Get the slideshow container element
    const container = document.getElementById('slideshow-container');

    // Loop through each item in the data
    data.forEach(function (item) {
        // Create a slide element
        const slide = document.createElement('div'); // this is gonna be where images will be shown one at a time
        slide.className = 'mySlides'; // so that it can be manipulated by CSS for example

        // Check if the item has a valid image, and if so, create and append an image element (sometimes there's no image so it'll be null)
        if (item.default_image && item.default_image.regular_url) {
            const img = document.createElement('img');
            img.src = item.default_image.regular_url;
            slide.appendChild(img); //appends image from these keys in array of objects from API to div under #slideshow-container div in HTML dynamically

            // Create and append a paragraph element to display the common name
            const commonName = document.createElement('p');
            commonName.innerText = item.common_name; // .innerText property in JavaScript is used to get or set the text content of an HTML element. It represents the visible text within an element, excluding any HTML tags or elements that might be contained within it
            commonName.className = 'plant-common-name'; // style this class in CSS
            slide.appendChild(commonName);

            container.appendChild(slide); //appends slide div to slideshow container div
        } else {
            // log a message in DOM if the item does not have a valid image
            console.log('Item does not have a valid image:', item);
        }
    });

    // Create and append navigation buttons
    const prev = document.createElement('a');
    prev.className = 'prev';
    prev.innerHTML = '&#10094;'; // .innerHTML property in JavaScript is used to get or set the HTML content of an HTML element. Set the inner HTML of the previous button to a Unicode character for a left-pointing triangle 

    // event listener for slide button
    prev.onclick =  () => plusSlides(-1); // CALL BACK USED: cannot write it as prev.onclick = plusSlides(-1); because it would immediately call the plusSlides callback function and assign its return value to prev.onclick. It's better to assign a function to prev.onclick that will be called when the onclick event occurs
    container.appendChild(prev);

    const next = document.createElement('a');
    next.className = 'next';
    next.innerHTML = '&#10095;'; // Set the inner HTML of the next button to a Unicode character for a right-pointing triangle

    // event listener for slide button
    next.onclick = () => plusSlides(1); // CALLBACK USED: cannot write it as next.onclick = plusSlides(1); because it would immediately call the plusSlides function and assign its return value to next.onclick. It's better to assign a function to next.onclick that will be called when the onclick event occurs
    container.appendChild(next);

    // Display the first slide
    showSlides(slideIndex); // CALLBACK function to assign index to first slide to be able to change images on slides according to index number using plusSlides Callback fx
}
//------ CALL BACK FUNCTIONS TO USE FOR SLIDE TEMPLATE ------

// Variable to keep track of the current slide index to use for showSlides callback fx
let slideIndex = 1;
// Callback Function to navigate to the previous or next slide
function plusSlides(n) {
    showSlides(slideIndex += n); // CALLBACK used which will become assigned index numbers to images in slide to use with arrows to change images in slides
}

// Callback Function to display the specified slide
function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName('mySlides');

    // handle cases where the index exceeds the number of slides
    if (n > slides.length) { // if index exceeds the number of available slides, it resets the slideIndex (which is not defined in this code but should be declared in line 67 and used in callback fx plusSlides) to 1. This effectively loops the slideshow back to the first slide.
        slideIndex = 1;
    }

    if (n < 1) { // if n is less than 1 (this means user has gone back past the first slide), this sets the slideIndex to the total number of slides, effectively looping the slideshow to the last slide
        slideIndex = slides.length;
    }

    // for initial state (hides all images except first one because of current slide code) and transition between slides (hide the previous slide and show the new one)
    // iterates through data where all images for slides are contained and assigns display none style
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }

    // display the current slide using index created with variable slideIndex and used in callback functions (previous code hides all of the images/text in slides)
    slides[slideIndex - 1].style.display = 'block';
    // slides is the result of using document.getElementsByClassName('mySlides'). It represents an array-like collection of HTML elements with the class name 'mySlides'. Each element in this collection corresponds to a slide in the slideshow.

    // [slideIndex - 1]: To access a specific element in the slides collection, you use square brackets [ ] with an index inside. 

    // Since JavaScript arrays are zero-indexed (meaning the first element has an index of 0, the second has an index of 1, and so on), slideIndex - 1 is used to convert the logical slide index (which may start at 1 for user convenience) to the zero-based array index. For example, if slideIndex is 1, it will access the first slide in the slides collection, and if slideIndex is 2, it will access the second slide, and so forth.

    // 'block' makes the element visible and takes up the full width of its container, essentially displaying the selected slide on the webpage.
}

// ------ VOLUNTEER FORM FUNCTIONS ------

// Event listener for the form submission
const volunteerForm = document.getElementById("volunteerForm");

volunteerForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevents the default form submission behavior (which is reloading page)

    // Replace the form with buttons previously hidden
    replaceFormWithButtons(); // call back fx

    // Reset the form after processing
    volunteerForm.reset();
});
// Function to replace a form with buttons that navigate to plantInventory.html and donatePlant.html when clicking "Volunteer" submit form button
function replaceFormWithButtons() {
    // Get the form and buttons elements
    const volunteerForm = document.getElementById("volunteerForm");
    const donateButton = document.createElement("button");
    const inventoryButton = document.createElement("button");

    // Set attributes for the donate button
    donateButton.className = "hidden-button";
    donateButton.textContent = "Donate Plants 🌸";
    donateButton.addEventListener("click", function () {
        window.location.href = "./donatePlant.html";
    });
    donateButton.addEventListener("mouseover", function () {
        this.style.backgroundImage = "url(https://www.bbg.org/img/uploads/lightbox/_lightbox_retina/15768824452_maple.jpg)";
        this.style.backgroundSize = "contain";
    });
    donateButton.addEventListener("mouseout", function () {
        this.style.backgroundImage = "none";
    });

    // Set attributes for the inventory button
    inventoryButton.className = "hidden-button";
    inventoryButton.textContent = "Inventory 🌷";
    inventoryButton.addEventListener("click", function () {
        window.location.href = "./plantInventory.html";
    });
    inventoryButton.addEventListener("mouseover", function () {
        this.style.backgroundImage = "url(https://www.bbg.org/img/uploads/lightbox/_lightbox_retina/15768824452_maple.jpg)";
        this.style.backgroundSize = "contain";
    });
    inventoryButton.addEventListener("mouseout", function () {
        this.style.backgroundImage = "none";
    });

    // Hide the form
    volunteerForm.style.display = "none";

    // Append buttons to the document body
    document.getElementById("landing-header-buttons").appendChild(donateButton);
    document.getElementById("landing-header-buttons").appendChild(inventoryButton);

    // Save relevant information to localStorage
    const buttonsData = {
        donateButtonText: donateButton.textContent,
        donateButtonClass: donateButton.className,
        inventoryButtonText: inventoryButton.textContent,
        inventoryButtonClass: inventoryButton.className,
    };

    localStorage.setItem('buttonsData', JSON.stringify(buttonsData)); // converts the buttonsData object back into a JSON-formatted string. This is necessary because localStorage can only store strings, so you need to serialize the JavaScript object into a string.
}

// ------ LOCAL STORAGE FUNCTION TO retrieve the data from localStorage and use it to recreate the buttons when page refreshes and keep form hidden ------
document.addEventListener('DOMContentLoaded', function () { // event listener listens for the DOMContentLoaded event. When the event occurs (when the DOM is fully loaded), the provided function is executed.

    // Retrieve data from localStorage
    const storedData = localStorage.getItem('buttonsData');

    if (storedData) {
        const buttonsData = JSON.parse(storedData); // storedData is an object

        // ---- Recreate buttons with stored data ---

        // recreate donateButton
        const donateButton = document.createElement("button");
        donateButton.className = buttonsData.donateButtonClass;
        donateButton.textContent = buttonsData.donateButtonText;
        // Adding event listeners because difficult to retrieve from localStorage bc of way it gets stored
        donateButton.addEventListener("click", function () {
            window.location.href = "./donatePlant.html"; // used in JavaScript to change the current web page's location (URL) to a new URL, effectively redirecting the user to a different web page. window.location is a JavaScript object that represents the current URL or location of the web page that is currently loaded in the browser. .href property of window.location is used to get or set the complete URL of the current web page.
        });
        donateButton.addEventListener("mouseover", function () {
            this.style.backgroundImage = "url(https://www.bbg.org/img/uploads/lightbox/_lightbox_retina/15768824452_maple.jpg)"; // "this" refers to the HTML element that triggered the event. In this case, it's the donateButton with class hidden-button button that the user will interacted with, which will cause the event to fire.
            this.style.backgroundSize = "contain";
        });
        donateButton.addEventListener("mouseout", function () {
            this.style.backgroundImage = "none";
        });

        // recreate inventoryButton
        const inventoryButton = document.createElement("button");
        inventoryButton.className = buttonsData.inventoryButtonClass;
        inventoryButton.textContent = buttonsData.inventoryButtonText;
        // Adding event listeners because difficult to retrieve from localStorage bc of way it gets stored
        inventoryButton.addEventListener("click", function () {
            window.location.href = "./plantInventory.html";
        });
        inventoryButton.addEventListener("mouseover", function () {
            this.style.backgroundImage = "url(https://www.bbg.org/img/uploads/lightbox/_lightbox_retina/15768824452_maple.jpg)";
            this.style.backgroundSize = "contain";
        });
        inventoryButton.addEventListener("mouseout", function () {
            this.style.backgroundImage = "none";
        });

        // Append buttons to the document body or any desired location
        document.getElementById("landing-header-buttons").appendChild(donateButton);
        document.getElementById("landing-header-buttons").appendChild(inventoryButton);
        volunteerForm.style.display = "none"; // makes sure form stays hidden when going back to home
    }
});


// ------ NOTES: To learn in the future (just in case): ------
/*
The getEventListeners function is a helper function that retrieves event listeners from an element. It's not a standard JavaScript function, and it relies on internal properties (__events) that may not be present in all browsers.

The fx would work with this data but since the function relies on internal properties that not every browswer has it could be tricky to use so I just recreated the button to make it seem like all of it is getting retrieved from localstorage

If I were to creat an object like this to store all relevant information to localStorage
    const buttonsData = {
        donateButtonText: donateButton.textContent,
        donateButtonClass: donateButton.className,
        donateButtonEvents: getEventListeners(donateButton), // Get event listeners
        inventoryButtonText: inventoryButton.textContent,
        inventoryButtonClass: inventoryButton.className,
        inventoryButtonEvents: getEventListeners(inventoryButton) // Get event listeners
    };
I can retrieve it by using this assuming the browswer has the property I need

function getEventListeners(element) {
    const listeners = [];
    const eventNames = Object.keys(element.__events || {});

    eventNames.forEach(eventName => {
        element.__events[eventName].forEach(listener => {
            listeners.push({ type: eventName, listener: listener });
        });
    });

    return listeners;
}
*/
