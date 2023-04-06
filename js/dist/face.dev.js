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
}; // Function to show all the video URLs retrieved from the API response


var showAllUrls = function showAllUrls(isFacebook, AllUrls, img, title) {
  // If the video is from Facebook
  if (isFacebook === "facebook.com") {
    // Create HTML for each video URL in the AllUrls array
    var linksHtml = AllUrls // IF Type Is MP4 && MP3
    .filter(function (e) {
      return e.type === "mp4" || e.type === "opus audio";
    }).map(function (e) {
      return "\n\t\t<div class=\"linkUrl\">\n\t\t\t<a href=\"".concat(e.url, "\" class=\"Link\" id=\"video\" target=\"_blank\">").concat(e.subname, " ").concat(e.type, " <i class=\"fa-solid fa-video\"></i></a>\n\t\t</div>\n\t\t");
    }).join(''); // Set the HTML content of the linksDad element

    linksDad.innerHTML = "\n\t\t<img src=\"".concat(img, "\" alt=\"\" style=\"width: 80%; margin: auto 50%; border-radius: 20px;\">\n\t\t<br>\n\t\t<h1 style=\"text-align: center; color: #000; font-size: 29px; margin: 1em auto;\">").concat(title, "</h1>\n\t\t<br>\n\t\t<br>\n\t\t").concat(linksHtml, "\n\t\t");
  } else {
    // If the video is not from Facebook, show an error message
    showErrorMsg("Please enter a valid video URL");
  }
}; // Function to handle the download button click event


var handleDownloadClick = function handleDownloadClick() {
  var link, response, data;
  return regeneratorRuntime.async(function handleDownloadClick$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // Get the video URL from the input element
          link = linkInput.value.trim(); // If the video URL is empty, show an error message and return

          if (link) {
            _context.next = 4;
            break;
          }

          showErrorMsg("Please enter a video URL");
          return _context.abrupt("return");

        case 4:
          // Show the loader element
          showLoader();
          _context.prev = 5;
          _context.next = 8;
          return regeneratorRuntime.awrap(fetch('https://save-from.net/api/convert', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              url: link
            })
          }));

        case 8:
          response = _context.sent;

          if (response.ok) {
            _context.next = 12;
            break;
          }

          showErrorMsg("An error occurred, please try again later");
          return _context.abrupt("return");

        case 12:
          _context.next = 14;
          return regeneratorRuntime.awrap(response.json());

        case 14:
          data = _context.sent;

          if (!(!data || !data.url || !data.hosting || !data.thumb || !data.meta || !data.meta.title || !data.id)) {
            _context.next = 18;
            break;
          }

          showErrorMsg("An error occurred, please try again later");
          return _context.abrupt("return");

        case 18:
          showAllUrls(data.hosting, data.url, data.thumb, data.meta.title);
          _context.next = 24;
          break;

        case 21:
          _context.prev = 21;
          _context.t0 = _context["catch"](5);
          // If there's an error, show an error message
          showErrorMsg("An error occurred, please try again later");

        case 24:
          _context.prev = 24;
          hideLoader();
          return _context.finish(24);

        case 27:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[5, 21, 24, 27]]);
}; // Attach a click event listener to the delete button


var handleDeleteClick = function handleDeleteClick() {
  // Clear the input field and the URL display area
  linkInput.value = ""; // URL Input Area

  linksDad.innerHTML = ""; // LInksDad Area
};

downloadButton.addEventListener("click", handleDownloadClick);
deleteButton.addEventListener("click", handleDeleteClick);
//# sourceMappingURL=face.dev.js.map
