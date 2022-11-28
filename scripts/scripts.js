//navbar
const toggleButton = document.getElementsByClassName("toggle")
const navItems = document.getElementsByClassName('nav-items')[0]

for (let i = 0; i < toggleButton.length; i++) {
    toggleButton[i].addEventListener("click",()=>{
        navItems.classList.toggle("active")
    })
  }
