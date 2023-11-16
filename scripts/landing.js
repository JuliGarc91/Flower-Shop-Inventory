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

// Function to replace a form with buttons
function replaceFormWithButtons() {
    // Get the form and buttons elements
    const volunteerForm = document.getElementById("volunteerForm");
    const donateButton = document.createElement("button");
    const inventoryButton = document.createElement("button");

    // Set attributes for the donate button
    donateButton.className = "hidden-button";
    donateButton.textContent = "Donate Plants 🌸";
    donateButton.href = "./donatePlant.html";
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
    inventoryButton.href = "./plantInventory.html";
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
}

// Event listener for the form submission
const volunteerForm = document.getElementById("volunteerForm");

volunteerForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevents the default form submission behavior

    // Get form values using destructuring
    const { fullName, address, phoneNumber, hours } = event.target;

    // Log form values to the console
    console.log("Full Name:", fullName.value);
    console.log("Address:", address.value);
    console.log("Phone Number:", phoneNumber.value);
    console.log("Hours Willing to Volunteer:", hours.value);

    // Replace the form with buttons
    replaceFormWithButtons();

    // Reset the form after processing
    volunteerForm.reset();
});