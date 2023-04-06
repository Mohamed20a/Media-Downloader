"use strict";

var showLoader = function showLoader() {
  var loader = document.querySelector("#loader");
  loader.style.display = "block";
};

var hideLoader = function hideLoader() {
  var loader = document.querySelector("#loader");
  loader.style.display = "none";
};

document.querySelector(".download").addEventListener("click", function () {
  var link = document.querySelector(".linkOfVideo").value;
  var data = {
    "url": "".concat(link)
  };
  showLoader(); // Show loader before sending request

  fetch('https://save-from.net/api/convert', {
    method: 'POST',
    // or 'PUT'
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    var AllUrls = data.url;
    console.log(data);
    showAllUrls(data.hosting, AllUrls, data.thumb, data.meta.title, data.id);
  })["catch"](function (err) {
    hideLoader();
    showErrorMsg("Please enter valid video url"); //ask the user to enter the url again
  })["finally"](function () {
    hideLoader(); // Hide loader after request is completed (whether successful or not)
  }); //ADD STYLES WITH JavaScript
  //control loader appearance and showing error message
  //DOM elements

  var errorMsg = document.getElementById("error-message"); //error message
  //Error message styles

  var showErrorMsg = function showErrorMsg(errMessage) {
    errorMsg.textContent = errMessage; //error message content

    errorMsg.style.display = "block"; //show error message

    errorMsg.addEventListener("animationend", function () {
      return errorMsg.style.display = "none";
    }); //hide it again after finishing its animation
  };
});

function showAllUrls(isTwitter, AllUrls, img, title) {
  if (isTwitter == "twitter.com") {
    document.querySelector(".LinksDad").innerHTML = "\n\t\n\t\t<img src=\"".concat(img, "\" alt=\"\" style=\"width: 70%; margin: 0 30px auto; border-radius: 20px;\">\n\t\t<br> <br>\n\t    <h1 style=\"text-align: center; color: #000; font-size: 29px; margin: 1em auto;\">").concat(title, "</h1>\n\t\t<br>\n\t\t\n\t\t");
    AllUrls.forEach(function (e) {
      if (e.type == "mp4") {
        var x = parseInt(e.filesize);
        document.querySelector(".LinksDad").innerHTML += "\n\t\t\t\t<div class=\"linkUrl\">\n\t\t\t\t\t<a href=\"".concat(e.url, "\" class=\"Link\" id=\"video\" class=\"Link\" target=\"blank\">").concat(e.quality, " ").concat(e.type, "</a>\n\t\t\t\t</div>\n\t\t\t\t");
      }

      ;
    });
  } else {
    showErrorMsg("Please enter valid video url"); //ask the user to enter the url again
  }
}

;
document.getElementById("delete").addEventListener("click", function () {
  document.getElementById("url").value = "";
  document.querySelector(".LinksDad").innerHTML = "";
});
//# sourceMappingURL=old.dev.js.map
