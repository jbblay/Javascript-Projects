const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imageLoadedCount = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = 'Ctaz8R_gqWBJ05gTBdBpklh21LRpMxgImJaUrDPgxHU';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// check if all images were loaded
function imageLoaded() {
    imageLoadedCount++;
    if (imageLoadedCount === totalImages) {
        ready = true;
        loader.hidden = true; // Hide the loader when all images are loaded
    }
}

// helper Function to set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements For Links & Photos, Add to DOM
// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
    imageLoadedCount = 0;
    totalImages = photosArray.length;

    // Run function for each object in photoArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        // Create <div> for overlay
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');

        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        // Put <img> inside <div>, then put both inside <a>
        overlay.appendChild(img);
        item.appendChild(overlay);
        imageContainer.appendChild(item);
    });
}


// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        console.error('Error fetching photos:', error.message);
    }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        loader.hidden = false; // Show loader when more photos are being loaded
        getPhotos();
    }
});

// Call the function to get initial set of photos
getPhotos();
