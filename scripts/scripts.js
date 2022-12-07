//navbar
const toggleButton = document.getElementsByClassName("toggle")
const navItems = document.getElementsByClassName('nav-items')[0]

for (let i = 0; i < toggleButton.length; i++) {
    toggleButton[i].addEventListener("click",()=>{
        navItems.classList.toggle("active")
    })
  }

//popup video
const popupVideo = document.querySelector(".popup-video-container")
const videoThumbnail = document.querySelector(".latest-video-thumb")

videoThumbnail.addEventListener("click", ()=> {
    popupVideo.style.display = "flex"
})

popupVideo.addEventListener("click", ()=> {
    popupVideo.style.display = "none"
})