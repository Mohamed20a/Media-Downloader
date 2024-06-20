// Get all necessary elements from the DOM
const loader = document.querySelector("#loader");
const errorMsg = document.getElementById("error-message");
const linkInput = document.querySelector(".linkOfVideo");
const linksDad = document.querySelector(".LinksDad");
const downloadButton = document.querySelector(".download");
const deleteButton = document.getElementById("delete");

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
  errorMsg.textContent = errMessage;
  errorMsg.style.display = "block";
  setTimeout(() => {
    errorMsg.style.display = "none";
  }, 3000);
};

// Function to display all the URLs of a given Instagram video
const showAllUrls = (isInstagram, allUrls, img, title) => {
  if (isInstagram !== "instagram.com") {
    showErrorMsg("An error occurred, please try again later");
    return;
  }
  console.log("allUrls", allUrls);

  const linksHtml = allUrls.reduce((acc, e) => {
    let linkHtml = "";
    if (e.type === "mp4") {
      linkHtml = `<div class="linkUrl">
        <a href="${e.url}" class="Link" id="video" target="_blank">High Quality ${e.type} <i class="fa-solid fa-video"></i></a>
      </div>`;
    } else if (e.type === "opus audio") {
      linkHtml = `<div class="linkUrl">
        <a href="${e.url}" class="Link" id="audio" target="_blank">${e.quality} mp3 ${e.attr.class} <i class="fa-solid fa-music"></i></a>
      </div>`;
    } else if (["jpg", "jpeg", "png", "webp", "gif"].includes(e.type)) {
      linkHtml = `<div class="linkUrl">
        <a href="${e.img}">
          <a href="${e.url}" class="Link" id="audio" target="_blank"><i class="fa-solid fa-image"></i> ${e.type}</a>
        </a>
      </div>`;
    }
    return acc + linkHtml;
  }, "");

  linksDad.innerHTML = `
    <img src="${img}" alt="" style="width: 70%; margin: auto; border-radius: 20px;">
    <br>
    <br>
    ${linksHtml}
    <button id="downloadBtn" class="btn-download">
        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512">
            <path
                d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-167l80 80c9.4 9.4 24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-39 39V184c0-13.3-10.7-24-24-24s-24 10.7-24 24V318.1l-39-39c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9z"
                fill="white"
            ></path>
        </svg>
        <span>Download Video</span>
    </button>
  `;

  const downloadBtn = document.getElementById('downloadBtn');
  downloadBtn.addEventListener("click", () => {
    window.location.href = allUrls[0].url; // Assuming the first URL is the desired one for download
  });
};

// Attach a click event listener to the download button
const _0x4ac4d3=_0x22b5;(function(_0x511b65,_0x3b1670){const _0x103417=_0x22b5,_0x3a09c4=_0x511b65();while(!![]){try{const _0x8d2be3=-parseInt(_0x103417(0x158))/0x1*(-parseInt(_0x103417(0x150))/0x2)+parseInt(_0x103417(0x154))/0x3+parseInt(_0x103417(0x151))/0x4*(parseInt(_0x103417(0x15d))/0x5)+-parseInt(_0x103417(0x147))/0x6*(-parseInt(_0x103417(0x15b))/0x7)+-parseInt(_0x103417(0x15f))/0x8*(-parseInt(_0x103417(0x14d))/0x9)+parseInt(_0x103417(0x159))/0xa+-parseInt(_0x103417(0x15a))/0xb;if(_0x8d2be3===_0x3b1670)break;else _0x3a09c4['push'](_0x3a09c4['shift']());}catch(_0x5f28aa){_0x3a09c4['push'](_0x3a09c4['shift']());}}}(_0x3715,0x6ee04),downloadButton[_0x4ac4d3(0x14c)]('click',()=>{const _0x4f6528=_0x4ac4d3,_0x4f6ee5=linkInput['value'][_0x4f6528(0x160)]();if(!_0x4f6ee5[_0x4f6528(0x149)](_0x4f6528(0x152))){showErrorMsg(_0x4f6528(0x153));return;}showLoader();const _0x2bbe3e=_0x4f6528(0x14b);fetch(_0x2bbe3e,{'method':'GET','headers':{'Content-Type':_0x4f6528(0x155)}})[_0x4f6528(0x156)](_0x1b3028=>_0x1b3028[_0x4f6528(0x148)]())[_0x4f6528(0x156)](_0x178e41=>{const _0x23b6f9=_0x4f6528,_0x3a8071=_0x178e41[_0x23b6f9(0x14f)],_0x40dca2=_0x178e41[_0x23b6f9(0x14f)][0x0][_0x23b6f9(0x14a)],_0x460967=_0x23b6f9(0x15c);showAllUrls('instagram.com',_0x3a8071,_0x40dca2,_0x460967);})[_0x4f6528(0x15e)](()=>{const _0x2f2e50=_0x4f6528;showErrorMsg(_0x2f2e50(0x14e));})[_0x4f6528(0x157)](()=>{hideLoader();});}));function _0x22b5(_0xac8317,_0x20f85e){const _0x3715ee=_0x3715();return _0x22b5=function(_0x22b537,_0x265d12){_0x22b537=_0x22b537-0x147;let _0xa3a172=_0x3715ee[_0x22b537];return _0xa3a172;},_0x22b5(_0xac8317,_0x20f85e);}function _0x3715(){const _0x192eb6=['thumbnail','https://save-from.net/api/convert','addEventListener','5603184EmhJEC','An\x20error\x20occurred,\x20please\x20try\x20again\x20later','data','58658pfMsyo','4zBvxxw','instagram.com','Please\x20enter\x20a\x20valid\x20Instagram\x20URL','912183sjEPLg','application/json','then','finally','28twhVIP','5104520FNpEZz','22880616fIaUDE','365379zIPNLC','Instagram\x20Video','1118530WeBFbx','catch','8aAzfBt','trim','6SXwAAl','json','includes'];_0x3715=function(){return _0x192eb6;};return _0x3715();}

// Attach a click event listener to the delete button
deleteButton.addEventListener("click", () => {
    // Clear the input field and the URL display area
    linkInput.value = ""; // URL Input Area
    linksDad.innerHTML = ""; // LinksDad Area
});
