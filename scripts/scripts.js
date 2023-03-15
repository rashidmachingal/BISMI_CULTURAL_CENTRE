//navbar
const toggleButton = document.querySelector(".toggle");
const navbar = document.querySelector(".navbar");
const navItems = document.getElementsByClassName('nav-item')

toggleButton.addEventListener("click", () => {
    navbar.classList.toggle("active")
});

for (let i = 0; i < navItems.length; i++) {
    navItems[i].addEventListener('click', () => {
        navbar.classList.toggle("active")
    });
  }

// get images
fetch("http://localhost:5000/images").then((res) => res.json()).then(data => {
    const imageList = data.images;
    const imageContainer = document.querySelector('.latest-activities-images');
    
    // Iterate through the list of images and create HTML elements to display them
    for (let i = 0; i < imageList.length; i++) {
        const imageElement = document.createElement('img');
        imageElement.src = `http://localhost:5000/uploads/${imageList[i]}`; // Assuming images are stored in the uploads directory
        imageElement.alt = `Image ${i+1}`;
        imageElement.className = 'latest-activities-image';
        
        // Add a click event listener to each image element
        imageElement.addEventListener('click', function() {
            window.location.href = `http://localhost:5000/uploads/${imageList[i]}`;
        });
        
        const imageWrapper = document.createElement('div');
        imageWrapper.className = 'latest-activities-image';
        imageWrapper.appendChild(imageElement);
        imageContainer.appendChild(imageWrapper);
    }
})
.catch(error => console.log(error));

