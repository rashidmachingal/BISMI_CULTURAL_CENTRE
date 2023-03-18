const form = document.getElementById('imageForm');
const message = document.getElementById('message');

form.addEventListener("change", (e) => {
	const file = e.target.files[0];
	const reader = new FileReader();
	reader.onload = function() {
	  const img = document.createElement("img");
	  img.src = reader.result;
	  form.appendChild(img);
	}
	reader.readAsDataURL(file);
})

form.addEventListener('submit', async (e) => {
	e.preventDefault();
	const fileInput = document.querySelector('input[type="file"]');
	const file = fileInput.files[0];
	
	const formData = new FormData();
	formData.append('image', file);

	try {
		const response = await fetch('https://wild-puce-turtle-sock.cyclic.app/upload', {
			method: 'POST',
			body: formData
		});
		
		if (response.ok) {
			alert("Image Uploaded Successfuly")
		} else {
			alert("Something Went Wrong!")
		}
	} catch (error) {
		console.error(error);
		message.innerHTML = 'Error uploading image';
	}
});