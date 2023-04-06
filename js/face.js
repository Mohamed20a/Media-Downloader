// Get all necessary elements from the DOM
const loader = document.querySelector("#loader"); // Loader Span
const errorMsg = document.getElementById("error-message"); // Error Massage
const linkInput = document.querySelector(".linkOfVideo"); // Link Input Area
const linksDad = document.querySelector(".LinksDad"); // Videos Result Area
const downloadButton = document.querySelector(".download"); // Download Button
const deleteButton = document.getElementById("delete"); // Delete Button

// Function to show the loader element
const showLoader = () => {
    loader.style.display = "block";
};

// Function to hide the loader element
const hideLoader = () => {
    loader.style.display = "none";
};

// Function to show an error message with the given text
const showErrorMsg = (errMessage) => {
	// Set the error message text content
	errorMsg.textContent = errMessage;
	// Show the error message element
	errorMsg.style.display = "block";
	// Listen to the animationend event on the error message element, then hide it
	errorMsg.addEventListener("animationend", () => (errorMsg.style.display = "none"));
}

// Function to show all the video URLs retrieved from the API response
const showAllUrls = (isFacebook, AllUrls, img, title) => {
	// If the video is from Facebook
	if (isFacebook === "facebook.com") {
	    // Create HTML for each video URL in the AllUrls array
	    const linksHtml = AllUrls
		// IF Type Is MP4 && MP3
		.filter(e => e.type === "mp4" || e.type === "opus audio")
		.map(e => `
		<div class="linkUrl">
			<a href="${e.url}" class="Link" id="video" target="_blank">${e.subname} ${e.type} <i class="fa-solid fa-video"></i></a>
		</div>
		`)
		.join('');
	    // Set the HTML content of the linksDad element
	    linksDad.innerHTML = `
		<img src="${img}" alt="" style="width: 80%; margin: auto 50%; border-radius: 20px;">
		<br>
		<h1 style="text-align: center; color: #000; font-size: 29px; margin: 1em auto;">${title}</h1>
		<br>
		<br>
		${linksHtml}
		`;
	} else {
		// If the video is not from Facebook, show an error message
	showErrorMsg("Please enter a valid video URL");
	}
};

// Function to handle the download button click event
const handleDownloadClick = async () => {
	// Get the video URL from the input element
	const link = linkInput.value.trim();
	// If the video URL is empty, show an error message and return
	if (!link) {
		showErrorMsg("Please enter a video URL");
		return;
	}
	// Show the loader element
	showLoader();

	try {
	  // Send a POST request to the save-from.net API with the video URL
	const response = await fetch('https://save-from.net/api/convert', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ url: link }),
	});
    
    // If the response is not OK, show an error message and return
    if (!response.ok) {
        showErrorMsg("An error occurred, please try again later");
        return;
    }

    // Parse the JSON data from the API response
    const data = await response.json();

    // If the data is missing any required properties, show an error message and return
    if (!data || !data.url || !data.hosting || !data.thumb || !data.meta || !data.meta.title || !data.id) {
        showErrorMsg("An error occurred, please try again later");
        return;
    }

    showAllUrls(data.hosting, data.url, data.thumb, data.meta.title);
    } catch (err) {
		// If there's an error, show an error message
        showErrorMsg("An error occurred, please try again later");
    } finally {
        hideLoader();
    }
};

// Attach a click event listener to the delete button
const handleDeleteClick = () => {
    // Clear the input field and the URL display area
    linkInput.value = ""; // URL Input Area
    linksDad.innerHTML = ""; // LInksDad Area
};

downloadButton.addEventListener("click", handleDownloadClick);
deleteButton.addEventListener("click", handleDeleteClick);