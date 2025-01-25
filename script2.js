let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");
let searchInput = document.querySelector("#searchInput");
let searchBtn = document.querySelector("#searchBtn");




// const image = document.querySelector(".history");
// const checkbox = document.getElementById("checkbox2");


// image.addEventListener("click", function() {
//   checkbox.checked = !checkbox.checked; 
// });





//document me kahi bhi click krenge to navbar off hojaega...
document.addEventListener("DOMContentLoaded", () => {
    const navoff = document.getElementById("checkbox");
    const navbar = document.getElementById("navbar");

    document.addEventListener("click", (event) => {
        if (!navbar.contains(event.target) && event.target !== navoff && event.target !== document.querySelector("fa-duotone fa-solid fa-bars")) {
            navoff.checked = false;
        }
    });
});


document.getElementById("home").addEventListener("click", () => {
    speak("Navigating to Home.");
    window.location.reload();
});

document.getElementById("help").addEventListener("click", () => {
    speak("Here to assist. You can say commands like 'Open YouTube,' 'Check the weather,' or 'What is the time?'");
    document.getElementById("pbox3").style.display = "block";
});

document.getElementById("feedback").addEventListener("click", () => {
    speak("You can provide feedback by sending an email or comment");
    document.getElementById("pbox4").style.display = "block";
});

document.getElementById("about").addEventListener("click", () => {
    speak("Navigating To About Page");
   
});

//popup box ko hide krne ke liye
const helpLink = document.getElementById('help');
const feedbackLink = document.getElementById('feedback');
const helpPopup = document.getElementById('pbox3');
const feedbackPopup = document.getElementById('pbox4');
const historybox = document.getElementById('bottom2');
const historybutton = document.getElementById('history123');


function hideAllPopups() {
    helpPopup.style.display = 'none';
    feedbackPopup.style.display = 'none';
    historybox.style.display = 'none';
    
}

helpLink.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation(); 
    hideAllPopups();
    helpPopup.style.display = 'block';
});

feedbackLink.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation(); 
    hideAllPopups();
    feedbackPopup.style.display = 'block';
});

history123.addEventListener('click' , (e) =>{
    e.preventDefault();
    e.stopPropagation();
    hideAllPopups();
    historybox.style.display = 'block';
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.popup') && e.target.id !== 'help' && e.target.id !== 'feedback' !== 'bottom2') {
        hideAllPopups();
    }
});

helpPopup.addEventListener('click', (e) => {
    e.stopPropagation(); 
});

feedbackPopup.addEventListener('click', (e) => {
    e.stopPropagation(); 
});

// history.addEventListener('click' , (e) =>{
//     e.stopPropagation(); 
// })




//speak function controls
    function speak(text) {
        let text_speak = new SpeechSynthesisUtterance(text);
        text_speak.rate = 1.2;
        text_speak.pitch = 1;
        text_speak.volume = 1;
        text_speak.lang = "hi-GB";
        window.speechSynthesis.speak(text_speak);
    }

//wish function
    function wishMe() {
        let day = new Date();
        let hours = day.getHours();
        if (hours >= 0 && hours < 12) {
            speak("Good Morning Sir");
        } else if (hours >= 12 && hours < 16) {
            speak("Good Afternoon Sir");
        } else {
            speak("Good Evening Sir, how can I help you");
        }
    }

    // window.addEventListener('load', () => {
    //     wishMe();
    // });

//speech recognition ko handle krne ke liye    
    let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!speechRecognition) {
        console.error("Speech Recognition not supported in this browser.");
    } 
    else {
        let recognition = new speechRecognition()

        recognition.continuous = false;
        recognition.interimResults = false;



        recognition.onstart = () => {
            console.log("Voice recognition activated. Try speaking into the microphone.");
        };

        recognition.onresult = (event) => {

            console.log(event)
            let currentIndex = event.resultIndex;
            let transcript = event.results[currentIndex][0].transcript;
            content.innerText = transcript;
            takeCommand(transcript.toLowerCase());
        };

        recognition.onerror = (event) => {
            console.error("Recognition error: ", event.error);
            speak("Sorry, I didn't catch that. Please try again.");
        };

        recognition.onend = () => {
            console.log("Voice recognition turned off.");
            btn.style.display = "flex";
            voice.style.display = "none";
        };

        btn.addEventListener("click", () => {
            recognition.start();
            voice.style.display = "block";
            btn.style.display = "none";
        });
    }

 //search button pe click krne ke baad usko as a command send krega   
    searchBtn.addEventListener("click", () => {
        let message = searchInput.value.toLowerCase();
        takeCommand(message);
    });


//enter button ko as a search button use krne ke liye
    searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            let message = searchInput.value.toLowerCase();
            takeCommand(message);
        }
    });

//weatherAPI ko Handle krne ke liye    
    function getWeather(city) {
        let apiKey = '83733417abbd159fd8804751e147bdb7';
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error("City not found");
                return response.json();
            })
            .then(data => {
                let temp = data.main.temp;
                let weather = data.weather[0].description;
                let finalText = `The temperature in ${city} is ${temp} degrees Celsius with ${weather}.`;
                speak(finalText);
            })
            .catch(error => {
                speak("Sorry, I couldn't fetch the weather information right now. " + error.message);
            });
    }



    let searchHistory = [];
    function takeCommand(command) {
        document.getElementById("voice").style.display = "none" ;
        document.getElementById("btn").style.display = "flex";

    //    console.log("Command Received: ", command);
        searchHistory.push(command);
        displaySearchHistory();
    //    console.log("History Updated: ", searchHistory);
    

        // searchHistory ke liye 
        function displaySearchHistory(){
//            console.log("Displaying");
            const historyContainer = document.getElementById("bottom2");
            historyContainer.innerHTML = "" ;

            searchHistory.forEach((query , index) =>{
                const historyItem = document.createElement("div");
                historyItem.textContent = `${index+1}.${query}`;
                historyContainer.appendChild(historyItem);
            });
 //           console.log("Displayed Search history: " , searchHistory);
        
    
    

//Commands Ko Handle Krne Ke liye

        if (command.includes("hello") || command.includes("hey")) {
            speak("Hello Sir, what can I help you with?");
        } else if (command.includes("who are you")) {
            speak("I am a virtual assistant, S.A.Y.");
        } else if (command.includes("open youtube") || command.includes("youtube") || command.includes("youtube kholo")) {
            speak("Opening YouTube...");
            window.open("https://youtube.com/", "_blank");
        } else if (command.includes("open google") || command.includes("google")) {
            speak("Opening Google...");
            window.open("https://google.com/", "_blank");
        } else if (command.includes("open facebook") || command.includes("facebook")) {
            speak("Opening Facebook...");
            window.open("https://facebook.com/", "_blank");
        } else if (command.includes("open instagram") || command.includes("instagram")) {
            speak("Opening Instagram...");
            window.open("https://instagram.com/", "_blank");
        } else if (command.includes("open calculator")) {
            speak("Opening calculator...");
            window.open("calculator://");
        } else if (command.includes("open whatsapp")) {
            speak("Opening WhatsApp...");
            window.open("whatsapp://");
        }
        else if (command.includes("what is your name")) {
            speak("hi my name is say...");
        }
        else if (command.includes("time")) {
            let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
            speak(`The current time is ${time}.`);
        } else if (command.includes("date")) {
            let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
            speak(`Today's date is ${date}.`);
        } else if (command.includes("weather")) {
            let city = command.split("in ")[1] || "Gorakhpur";
            getWeather(city.trim());
        } else {
            speak("This is what I found on the internet regarding " + command);
            window.open(`https://www.google.com/search?q=${command}`, "_blank");
        }

    }
    }
