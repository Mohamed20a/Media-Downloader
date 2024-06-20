// Language Translate
let currentLanguage = localStorage.getItem('language') || "en";
let currentDirection = (localStorage.getItem('direction') && currentLanguage === 'ar') ? 'rtl' : 'ltr'; 

function changeLanguage(lang) {
    
    currentLanguage = lang;
    localStorage.setItem('language', currentLanguage);

    currentDirection = (currentLanguage === 'ar') ? 'rtl' : 'ltr';
    localStorage.setItem('direction', currentDirection);

    document.documentElement.dir = currentDirection;
    updatePageLanguage();
}

function updatePageLanguage() {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });

    const englishButton = document.getElementById('englishText');
    const arabicButton = document.getElementById('arabicText');
    
    if (currentLanguage === 'en') {
        englishButton.style.display = 'none'; 
        arabicButton.style.display = 'block'; 
    } else if (currentLanguage === 'ar') {
        englishButton.style.display = 'block'; 
        arabicButton.style.display = 'none'; 
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.dir = currentDirection;
    updatePageLanguage();
});



// English Language
const translations = {
    "en": {
        // Navbar
        "nav-home": "Home",
        "nav-twit": "Twitter Downloader",
        "nav-insta": "Instagram Downloader",
        "nav-face": "Facebook Downloader",
        "nav-you": "YouTube Downloader",

        // Home
        "home-title": "Website works in two languages, Arabic and English",
        "home-title1": "Fast and free all in one video downloader",
        "home-title2": "By",
        "home-title3": "URL",
        "home-btn": "Install App",

        // About
        "sec2-title1": "Supports The Most Popular Sources",
        "sec2-title2": "You can check regularly updated supported sources list",
        "sec2-btn1": "YouTube",
        "sec2-btn2": "Facebook",
        "sec2-btn3": "Instagram",
        "sec2-btn4": "Twitter",

        // How To Download
        "sec3-title1": "How to Download Videos?",
        "sec3-title2": "To download videos, you have to follow three easy steps:",

        "sec3-num1": "1",
        "sec3-title3": "Copy Link",
        "sec3-title4": "Just copy link of source which you want to download",

        "sec3-num2": "2",
        "sec3-title5": "Paste Link",
        "sec3-title6": "Paste a video link of supported sources into the input field above",

        "sec3-num3": "3",
        "sec3-title7": "Download Now",
        "sec3-title8": "Click to download button and see files which is available to download",
        "sec3-title9": "Download QR",


        // Youtube Page
        "tube-title": "Convert and download",
        "tube-title2": "any YouTube video in MP4, MP3 and opus",
        "twit-title2": "any Twitter video in MP4, MP3 and opus",
        "insta-title2": "any Instagram video in MP4 and Images",
        "face-title2": "any Facebook video in MP4, MP3 and opus",
        "tube-btn": "Download",
    },


    // Arabic Language
    "ar": {
        // Navbar
        "nav-home": "الصفحة الرئيسية",
        "nav-twit": "تحميل من تويتر",
        "nav-insta": "تحميل من الأنستجرام",
        "nav-face": "تحميل من الفيس بوك",
        "nav-you": "تحميل من اليوتيوب",

        // Home
        "home-title": "كما يعمل الموقع بلغتين العربية والانجليزية",
        "home-title1": "السرعة والمجانية في فيديو واحد",
        "home-title2": " بواسطة",
        "home-title3": " لينك",
        "home-btn": "تثبيت التطبيق",

        // About
        "sec2-title1": "يدعم أكثر من مصدر شائع",
        "sec2-title2": "يمكنك التحقق من قائمة المصادر المدعومة المحدثة بانتظام",
        "sec2-btn1": "اليوتيوب",
        "sec2-btn2": "الفيس بوك",
        "sec2-btn3": "الأنستجرام",
        "sec2-btn4": "تويتر",

        // How To Download
        "sec3-title1": "كيفية تنزيل مقاطع الفيديو؟",
        "sec3-title2": "لتنزيل مقاطع الفيديو، عليك اتباع ثلاث خطوات سهلة:",

        "sec3-num1": "١",
        "sec3-title3": "انسخ اللينك",
        "sec3-title4": "فقط انسخ رابط المصدر الذي تريد تنزيله",

        "sec3-num2": "٢",
        "sec3-title5": "الصق اللينك",
        "sec3-title6": "الصق رابط فيديو للمصادر المدعومة في حقل الإدخال",

        "sec3-num3": "٣",
        "sec3-title7": "التحميل الان",
        "sec3-title8": "انقر فوق زر التنزيل وشاهد الملفات المتاحة للتنزيل",

        "sec3-title9": "تحميل رمز الاستجابه",
        

        // Youtube Page
        "tube-title": "تحويل وتنزيل",
        "tube-title2": "أي فيديو يوتيوب بصيغة MP4 وMP3 وopus",
        "twit-title2": "أي فيديو تويتر بصيغة MP4 وMP3 وopus",
        "insta-title2": "أي فيديو انستجرام بصيغة MP4 و صور",
        "face-title2": "أي فيديو فيس بوك بصيغة MP4 وMP3 وopus",
        "tube-btn": "تحميل",
    }
};

