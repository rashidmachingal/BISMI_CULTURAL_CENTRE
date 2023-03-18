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