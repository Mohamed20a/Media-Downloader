"use strict";

// Get all necessary elements from the DOM
var loader = document.querySelector("#loader"); // Loader Span

var errorMsg = document.getElementById("error-message"); // Error Massage

var linkInput = document.querySelector(".linkOfVideo"); // Link Input Area

var linksDad = document.querySelector(".LinksDad"); // Videos Result Area

var downloadButton = document.querySelector(".download"); // Download Button

var deleteButton = document.getElementById("delete"); // Delete Button
// Function to show the loader element

var showLoader = function showLoader() {
  loader.style.display = "block";
}; // Function to hide the loader element


var hideLoader = function hideLoader() {
  loader.style.display = "none";
}; // Function to show an error message with the given text


var showErrorMsg = function showErrorMsg(errMessage) {
  // Set the error message text content
  errorMsg.textContent = errMessage; // Show the error message element

  errorMsg.style.display = "block"; // Listen to the animationend event on the error message element, then hide it

  errorMsg.addEventListener("animationend", function () {
    return errorMsg.style.display = "none";
  });
}; // Define a function to display all the URLs of a given Youtube video


var showAllUrls = function showAllUrls(isYoutube, AllUrls, img, title) {
  // If the URL is not from Youtube, show an error message and return
  if (!isYoutube) {
    showErrorMsg("An error occurred, please try again later");
    return;
  } // Loop through all the URLs and generate HTML code for each one


  var linksHtml = AllUrls.reduce(function (acc, e) {
    var linkHtml = ""; // If Type Is MP4

    if (e.type === "mp4") {
      linkHtml = "\n\t\t\t<div class=\"linkUrl\">\n\t\t\t<a href=\"".concat(e.url, "\" class=\"Link\" id=\"video\" target=\"_blank\">").concat(e.quality, "p ").concat(e.type, " <i class=\"fa-solid fa-video\"></i></a>\n\t\t\t</div>\n\t\t\t"); // IF Type Is MP3
    } else if (e.type === "opus audio") {
      linkHtml = "\n\t\t\t<div class=\"linkUrl\">\n\t\t\t<a href=\"".concat(e.url, "\" class=\"Link\" id=\"audio\" target=\"_blank\">").concat(e.quality, "p mp3 ").concat(e.attr["class"], " <i class=\"fa-solid fa-music\"></i></a>\n\t\t\t</div>\n\t\t\t");
    }

    return acc + linkHtml;
  }, ""); // Generate HTML code for the video thumbnail, title, and all the URLs

  linksDad.innerHTML = "\n        <img src=\"".concat(img, "\" alt=\"\" style=\"width: 70%; margin: auto 50%; border-radius: 20px;\">\n        <br>\n        <h1 style=\"text-align: center; color: #000; font-size: 29px; margin: 1em auto;\">").concat(title, "</h1>\n        <br>\n        ").concat(linksHtml, "\n    ");
}; // Attach a click event listener to the download button


downloadButton.addEventListener("click", function () {
  // Get the video URL from the input field
  var link = linkInput.value.trim(); // If the input field is empty, show an error message and return

  if (!link.includes("youtube.com").includes("youtu.be)")) {
    showErrorMsg("Please enter a video URL");
    return;
  } // Send a POST request to the save-from.net API to get all the URLs of the video


  var data = {
    "url": link
  };
  showLoader();
  fetch("https://save-from.net/api/convert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    // When the response is received, display all the URLs
    var allUrls = data.url;
    console.log(data);
    showAllUrls(data.hosting, allUrls, data.thumb, data.meta.title, data.id);
  })["catch"](function (err) {
    // If there's an error, show an error message
    showErrorMsg("An error occurred, please try again later");
  })["finally"](function () {
    hideLoader();
  });
}); // Attach a click event listener to the delete button

deleteButton.addEventListener("click", function () {
  // Clear the input field and the URL display area
  linkInput.value = ""; // URL Input Area

  linksDad.innerHTML = ""; // LInksDad Area
});
//# sourceMappingURL=youtube.dev.js.map
