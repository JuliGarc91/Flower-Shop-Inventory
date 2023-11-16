// Fetch data from the API for the slideshow on index.html
fetch(`https://perenual.com/api/species-list?key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        createSlideshow(data.data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

// Function to create a slideshow from the fetched data
function createSlideshow(data) {
    // Get the slideshow container element
    var container = document.getElementById('slideshow-container');

    // Loop through each item in the data
    data.forEach(function (item) {
        // Create a slide element
        var slide = document.createElement('div');
        slide.className = 'mySlides';

        // Check if the item has a valid image, and if so, create and append an image element
        if (item.default_image && item.default_image.regular_url) {
            var img = document.createElement('img');
            img.src = item.default_image.regular_url;

            slide.appendChild(img);
            container.appendChild(slide);
        } else {
            // Log a message if the item does not have a valid image
            console.log('Item does not have a valid image:', item);
        }
    });

    // Create and append navigation buttons
    var prev = document.createElement('a');
    prev.className = 'prev';
    prev.innerHTML = '&#10094;';
    prev.onclick = function () {
        plusSlides(-1);
    };
    container.appendChild(prev);

    var next = document.createElement('a');
    next.className = 'next';
    next.innerHTML = '&#10095;';
    next.onclick = function () {
        plusSlides(1);
    };
    container.appendChild(next);

    // Display the first slide
    showSlides(slideIndex);
}

// Variable to keep track of the current slide index
var slideIndex = 1;

// Function to navigate to the previous or next slide
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Function to display the specified slide
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName('mySlides');

    // Handle cases where the index exceeds the number of slides
    if (n > slides.length) {
        slideIndex = 1;
    }

    if (n < 1) {
        slideIndex = slides.length;
    }

    // Hide all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }

    // Display the current slide
    slides[slideIndex - 1].style.display = 'block';
}

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
        this.style.opacity = "90%";
        this.style.backgroundImage = "url(https://www.bbg.org/img/uploads/lightbox/_lightbox_retina/15768824452_maple.jpg)";
        this.style.backgroundSize = "contain";
    });
    donateButton.addEventListener("mouseout", function () {
        this.style.opacity = "100%";
        this.style.backgroundImage = "none";
    });

    // Set attributes for the inventory button
    inventoryButton.className = "hidden-button";
    inventoryButton.textContent = "Inventory 🌷";
    inventoryButton.addEventListener("click", function () {
        window.location.href = "./plantInventory.html";
    });
    inventoryButton.addEventListener("mouseover", function () {
        this.style.opacity = "90%";
        this.style.backgroundImage = "url(https://www.bbg.org/img/uploads/lightbox/_lightbox_retina/15768824452_maple.jpg)";
        this.style.backgroundSize = "contain";
    });
    inventoryButton.addEventListener("mouseout", function () {
        this.style.opacity = "100%";
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
        inventoryButtonClass: inventoryButton.className

    };

    localStorage.setItem('buttonsData', JSON.stringify(buttonsData));
}
// retrieve the data from localStorage and use it to recreate the buttons
document.addEventListener('DOMContentLoaded', function () {
    // Retrieve data from localStorage
    const storedData = localStorage.getItem('buttonsData');

    if (storedData) {
        const buttonsData = JSON.parse(storedData);

        // Recreate buttons with stored data
        const donateButton = document.createElement("button");
        donateButton.className = buttonsData.donateButtonClass;
        donateButton.textContent = buttonsData.donateButtonText;
        // Adding event listeners because difficult to retrieve from localStorage bc of way it gets stored
        donateButton.addEventListener("click", function () {
            window.location.href = "./donatePlant.html";
        });
        donateButton.addEventListener("mouseover", function () {
            this.style.opacity = "90%";
            this.style.backgroundImage = "url(https://www.bbg.org/img/uploads/lightbox/_lightbox_retina/15768824452_maple.jpg)";
            this.style.backgroundSize = "contain";
        });
        donateButton.addEventListener("mouseout", function () {
            this.style.opacity = "100%";
            this.style.backgroundImage = "none";
        });

        const inventoryButton = document.createElement("button");
        inventoryButton.className = buttonsData.inventoryButtonClass;
        inventoryButton.textContent = buttonsData.inventoryButtonText;
        // Adding event listeners because difficult to retrieve from localStorage bc of way it gets stored
        inventoryButton.addEventListener("click", function () {
            window.location.href = "./plantInventory.html";
        });
        inventoryButton.addEventListener("mouseover", function () {
            this.style.opacity = "90%";
            this.style.backgroundImage = "url(https://www.bbg.org/img/uploads/lightbox/_lightbox_retina/15768824452_maple.jpg)";
            this.style.backgroundSize = "contain";
        });
        inventoryButton.addEventListener("mouseout", function () {
            this.style.opacity = "100%";
            this.style.backgroundImage = "none";
        });

        // Append buttons to the document body or any desired location
        document.getElementById("landing-header-buttons").appendChild(donateButton);
        document.getElementById("landing-header-buttons").appendChild(inventoryButton);
    }
});


// Event listener for the form submission
const volunteerForm = document.getElementById("volunteerForm");

volunteerForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevents the default form submission behavior (which is reloading page)

    // Replace the form with buttons previously hidden
    replaceFormWithButtons(); // call back fx

    // Reset the form after processing
    volunteerForm.reset();
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
