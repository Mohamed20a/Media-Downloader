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

// Define a function to display all the URLs of a given Youtube video
const showAllUrls = (isYoutube, AllUrls, img, title) => {
    // If the URL is not from Youtube, show an error message and return
	
    if (!isYoutube) {
        showErrorMsg("An error occurred, please try again later");
        return;
    }

    // Loop through all the URLs and generate HTML code for each one
    const linksHtml = AllUrls.reduce((acc, e) => {
        let linkHtml = "";
        // If Type Is MP4
        if (e.type === "mp4") {
            linkHtml = `
			<div class="linkUrl">
			<a href="${e.url}" class="Link" id="video" target="_blank">${e.quality}p ${e.type} <i class="fa-solid fa-video"></i></a>
			</div>
			`;
            // IF Type Is MP3
        } else if (e.type === "opus audio") {
            linkHtml = `
			<div class="linkUrl">
			<a href="${e.url}" class="Link" id="audio" target="_blank">${e.quality}p mp3 ${e.attr.class} <i class="fa-solid fa-music"></i></a>
			</div>
			`;
            
        } 
        return acc + linkHtml;
    }, "");

    // Generate HTML code for the video thumbnail, title, and all the URLs
    linksDad.innerHTML = `
        <img src="${img}" alt="" style="width: 70%; margin: auto 50%; border-radius: 20px;">
        <br>
        <h1 style="text-align: center; color: #000; font-size: 29px; margin: 1em auto;">${title}</h1>
        <br>
        ${linksHtml}
    `;
};

// Attach a click event listener to the download button
downloadButton.addEventListener("click", () => {
    // Get the video URL from the input field
    const link = linkInput.value.trim();
    // If the input field is empty, show an error message and return
    if (!link) {
        showErrorMsg("Please enter a video URL");
        return;
    }

    // Send a POST request to the save-from.net API to get all the URLs of the video
    const data = { "url": link };
    showLoader();
    fetch("https://save-from.net/api/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        // When the response is received, display all the URLs
        const allUrls = data.url;
        console.log(data);
        showAllUrls(data.hosting, allUrls, data.thumb, data.meta.title, data.id);
    })
    .catch(err => {
        // If there's an error, show an error message
        showErrorMsg("An error occurred, please try again later");
    })
    .finally(() => {
        hideLoader();
    });
});

// Attach a click event listener to the delete button
deleteButton.addEventListener("click", () => {
    // Clear the input field and the URL display area
    linkInput.value = ""; // URL Input Area
    linksDad.innerHTML = ""; // LInksDad Area
});