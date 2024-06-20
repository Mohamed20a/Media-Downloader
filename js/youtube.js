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
    errorMsg.textContent = errMessage;
    errorMsg.style.display = "block";
    errorMsg.addEventListener("animationend", () => (errorMsg.style.display = "none"));
};

// Function to show all the video URLs retrieved from the API response
const showAllUrls = (img, title, allUrls) => {
    const validUrls = Object.values(allUrls).filter(e => e.url);
    const linksHtml = validUrls.map(e => `
        <div class="linkUrl">
            <a href="${e.url}" style="text-decoration: none;" target="_blank">
            <button id="downloadBtn" class="btn-download">
                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512">
                    <path
                        d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-167l80 80c9.4 9.4 24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-39 39V184c0-13.3-10.7-24-24-24s-24 10.7-24 24V318.1l-39-39c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9z"
                        fill="white"
                    ></path>
                </svg>
                <span>Download ${e.ext === "mp4" ? "Video" : "Audio"} (${e.format})</span>
            </button>
            </a>
        </div>
    `).join('');

    linksDad.innerHTML = `
        <img src="${img}" alt="" style="width: 80%; margin: auto; border-radius: 20px;">
        <br>
        <h1 style="text-align: center; color: #000; font-size: 29px; margin: 1em auto;">${title}</h1>
        <br>
        ${linksHtml}
    `;
};

// Function to handle the download button click event
const handleDownloadClick = async () => {
    const link = linkInput.value.trim();
    // if (!link.includes("youtube.com")) {
    //     showErrorMsg("Please enter a valid video URL");
    //     return;
    // }
    if (!link) {
        showErrorMsg("Please enter a video URL");
        return;
    }
    showLoader();

    try {
        const response = await fetch('https://save-from.net/api/convert' {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: link }),
        });

        const _0x525c59=_0xce25;(function(_0x2669b4,_0x3a6330){const _0x18ea42=_0xce25,_0x123001=_0x2669b4();while(!![]){try{const _0x5f20d5=parseInt(_0x18ea42(0x171))/0x1+parseInt(_0x18ea42(0x176))/0x2*(parseInt(_0x18ea42(0x17c))/0x3)+-parseInt(_0x18ea42(0x17f))/0x4*(-parseInt(_0x18ea42(0x177))/0x5)+parseInt(_0x18ea42(0x178))/0x6*(-parseInt(_0x18ea42(0x179))/0x7)+-parseInt(_0x18ea42(0x17e))/0x8*(-parseInt(_0x18ea42(0x16f))/0x9)+-parseInt(_0x18ea42(0x175))/0xa*(parseInt(_0x18ea42(0x17d))/0xb)+-parseInt(_0x18ea42(0x16e))/0xc;if(_0x5f20d5===_0x3a6330)break;else _0x123001['push'](_0x123001['shift']());}catch(_0x31629d){_0x123001['push'](_0x123001['shift']());}}}(_0x3085,0x40e5b));if(!response['ok'])throw new Error(_0x525c59(0x174));const data=await response[_0x525c59(0x17b)]();function _0xce25(_0x116448,_0x1e2e7d){const _0x308550=_0x3085();return _0xce25=function(_0xce25a3,_0x3d256b){_0xce25a3=_0xce25a3-0x16e;let _0x4a7277=_0x308550[_0xce25a3];return _0x4a7277;},_0xce25(_0x116448,_0x1e2e7d);}console[_0x525c59(0x173)](_0x525c59(0x17a),data);function _0x3085(){const _0x2e023f=['2025yFUCwl','189222JwyafD','14DdeltG','API\x20Response\x20Data:','json','206163IHQcnt','22soDgXR','8iUhXLa','3492HZbgNo','thumb','6382356oMWuOU','1649439dygSsN','title','340628lqsJpe','data','log','An\x20error\x20occurred,\x20please\x20try\x20again\x20later','2145170vMpigG','12DxDtrl'];_0x3085=function(){return _0x2e023f;};return _0x3085();}if(!data||!data['data']||!data['data'][_0x525c59(0x180)]||!data[_0x525c59(0x172)][_0x525c59(0x170)]){showErrorMsg(_0x525c59(0x174));return;}

        const decodedTitle = decodeURIComponent(data.data.title);
        showAllUrls(data.data.thumb, decodedTitle, allUrls);
    } catch (err) {
        showErrorMsg("An error occurred, please try again later");
        console.error(err);
    } finally {
        hideLoader();
    }
};

// Attach a click event listener to the delete button
const handleDeleteClick = () => {
    linkInput.value = ""; // URL Input Area
    linksDad.innerHTML = ""; // LinksDad Area
};

downloadButton.addEventListener("click", handleDownloadClick);
deleteButton.addEventListener("click", handleDeleteClick);
