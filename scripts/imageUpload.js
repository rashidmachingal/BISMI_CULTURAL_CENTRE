const form = document.getElementById('imageForm');
const message = document.getElementById('message');
const uploadButton = document.getElementById('uploadButton')

form?.addEventListener("change", (e) => {
	const file = e.target.files[0];
	const reader = new FileReader();
	reader.onload = function() {
	  const img = document.createElement("img");
	  img.src = reader.result;
	  form.insertBefore(img, form.lastElementChild)
	}
	reader.readAsDataURL(file);
})

// firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBA91c6SZzCE-JS8zrqBvZkDERY5tfLMhU",
    authDomain: "bismiculture.firebaseapp.com",
    projectId: "bismiculture",
    storageBucket: "bismiculture.appspot.com",
    messagingSenderId: "253727300374",
    appId: "1:253727300374:web:830d4ceafc7abecdc14e37",
    measurementId: "G-77LKFMG6RG"
  };

firebase.initializeApp(firebaseConfig);  

// image upload 
function imageUpload() {
  var file = document.getElementById('fileInput').files[0];
  var storageRef = firebase.storage().ref();
  var uploadTask = storageRef.child('images/' + file.name).put(file);

  uploadTask.on('state_changed', function() {
	
  }, function(error) {
	alert("Something Went Wrong!")
  }, function() {
    alert("Image uploaded successfully")
	passwordInput.value = ""
	const img = form.querySelector('img');
	form.removeChild(img)
	form.reset();
	uploadButton.textContent = "UPLOAD"
  });
}

// check password
function checkPass() {
	uploadButton.textContent = "Loading..."
	const options = {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json'
		},

	  };
	const passwordInput = document.getElementById("passwordInput")
	fetch(`https://determined-pig-pajamas.cyclic.app/api/check-pass/${passwordInput.value}`,options).then((res) => res.json())
	.then((data) => {
		if(data.message === "failed") {
			alert("Invalid Password")
			passwordInput.value = ""
			form.reset();
			uploadButton.textContent = "UPLOAD"
			return
		}else{
			imageUpload()
		}
	})
}

// upload image
form?.addEventListener('submit', function(event) {
  event.preventDefault()	
  checkPass()
});

// map images on home page
const storageRef = firebase.storage().ref().child('images');
storageRef.listAll().then(function(result) {
  const imageList = result.items;
  imageList.sort((a, b) =>  b.timeCreated - a.timeCreated);
  const latestImages = imageList.slice(0, 3);
  const imageContainer = document.querySelector('.latest-activities-images');
  const imgContainer = document.querySelector('.latest-updates');

  for (let i = 0; i < latestImages.length; i++) {
    latestImages[i].getDownloadURL().then(function(url) {
      const imageElement = document.createElement('img');
      imageElement.src = url;
      imageElement.className = 'latest-activities-image';

      const imageWrapper = document.createElement('div');
      imageWrapper.className = 'latest-activities-image';
      imageWrapper.appendChild(imageElement);
      imageContainer.insertBefore(imageWrapper,imageContainer.firstChild);

      imageElement.addEventListener('click', function() {
        window.location.href = url;
      });
    }).catch(function(error) {
      console.log(error);
    });
  }

}).catch(function(error) {
  console.log(error);
});