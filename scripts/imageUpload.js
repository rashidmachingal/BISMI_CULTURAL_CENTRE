const form = document.getElementById('imageForm');
const message = document.getElementById('message');

form.addEventListener('submit', async (e) => {
	e.preventDefault();
	const fileInput = document.querySelector('input[type="file"]');
	const file = fileInput.files[0];
	
	const formData = new FormData();
	formData.append('image', file);

	try {
		const response = await fetch('http://localhost:5000/upload', {
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