// =========================
// QUIZ DATA
// =========================

const quizData = {
    web: [
        {
            question: "What does HTML stand for?",
            options: [
                "Hyper Text Markup Language",
                "High Text Machine Language",
                "Hyperlink Text Management Language",
                "Home Tool Markup Language"
            ],
            answer: "Hyper Text Markup Language"
        },
        {
            question: "Which CSS property is used to change text color?",
            options: [
                "font-color",
                "text-color",
                "color",
                "foreground"
            ],
            answer: "color"
        },
        {
            question: "Which HTML tag is used to create a hyperlink?",
            options: [
                "<link>",
                "<a>",
                "<href>",
                "<url>"
            ],
            answer: "<a>"
        },
        {
            question: "Which CSS layout system is commonly used for one-dimensional layouts?",
            options: [
                "Flexbox",
                "SQL",
                "DOM",
                "AJAX"
            ],
            answer: "Flexbox"
        },
        {
            question: "Which attribute provides alternative text for an image?",
            options: [
                "src",
                "href",
                "alt",
                "title"
            ],
            answer: "alt"
        }
    ],

    javascript: [
        {
            question: "Which keyword declares a block-scoped variable that can be reassigned?",
            options: [
                "var",
                "let",
                "const",
                "static"
            ],
            answer: "let"
        },
        {
            question: "Which method selects an element by its ID?",
            options: [
                "getElementById()",
                "queryById()",
                "selectId()",
                "getElement()"
            ],
            answer: "getElementById()"
        },
        {
            question: "Which function runs code repeatedly after a fixed time interval?",
            options: [
                "setTimeout()",
                "setInterval()",
                "repeat()",
                "loopTime()"
            ],
            answer: "setInterval()"
        },
        {
            question: "Which storage mechanism persists data after the browser is closed?",
            options: [
                "sessionStorage",
                "localStorage",
                "temporaryStorage",
                "memoryStorage"
            ],
            answer: "localStorage"
        },
        {
            question: "What does async/await help simplify?",
            options: [
                "CSS styling",
                "Asynchronous JavaScript",
                "HTML parsing",
                "Database schema design"
            ],
            answer: "Asynchronous JavaScript"
        }
    ],

    dataai: [
        {
            question: "Which metric measures the average squared difference between actual and predicted values?",
            options: [
                "Accuracy",
                "MSE",
                "Precision",
                "Recall"
            ],
            answer: "MSE"
        },
        {
            question: "Logistic Regression is mainly used for which task?",
            options: [
                "Binary classification",
                "Sorting",
                "Image compression",
                "Database indexing"
            ],
            answer: "Binary classification"
        },
        {
            question: "Which method can be used to select an appropriate K value in KNN?",
            options: [
                "Cross-validation",
                "Hashing",
                "Compilation",
                "Minification"
            ],
            answer: "Cross-validation"
        },
        {
            question: "What is the purpose of a training dataset?",
            options: [
                "To train a machine learning model",
                "To delete features",
                "To style a webpage",
                "To store browser cookies"
            ],
            answer: "To train a machine learning model"
        },
        {
            question: "Which technique can reduce the number of input features?",
            options: [
                "Feature selection",
                "HTML parsing",
                "DOM traversal",
                "Event bubbling"
            ],
            answer: "Feature selection"
        }
    ]
};


// =========================
// QUIZ STATE
// =========================

let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedTime = 15;
let timeLeft = 15;
let timerId = null;
let questionLocked = false;


// =========================
// DOM REFERENCES
// =========================

const playerName = document.getElementById("playerName");
const category = document.getElementById("category");
const startQuiz = document.getElementById("startQuiz");
const setupMessage = document.getElementById("setupMessage");

const quizSection = document.getElementById("quizSection");
const resultSection = document.getElementById("resultSection");

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const progressElement = document.getElementById("progress");
const progressFill = document.getElementById("progressFill");
const timerElement = document.getElementById("timer");
const feedbackElement = document.getElementById("feedback");
const resultText = document.getElementById("resultText");

const leaderboardElement = document.getElementById("leaderboard");
const clearLeaderboard = document.getElementById("clearLeaderboard");
const playAgain = document.getElementById("playAgain");


// =========================
// TIME SELECTION
// =========================

document.querySelectorAll(".time-btn").forEach(button => {

    button.addEventListener("click", () => {

        document.querySelectorAll(".time-btn").forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        selectedTime = Number(button.dataset.time);
    });

});


// =========================
// START QUIZ
// =========================

startQuiz.addEventListener("click", startQuizGame);

function startQuizGame() {

    const name = playerName.value.trim();

    if (!name) {
        setupMessage.textContent = "Please enter your name.";
        return;
    }

    setupMessage.textContent = "";

    currentQuestions = [...quizData[category.value]];

    currentQuestionIndex = 0;
    score = 0;

    quizSection.classList.remove("hidden");
    resultSection.classList.add("hidden");

    showQuestion();

    quizSection.scrollIntoView({
        behavior: "smooth"
    });
}


// =========================
// DISPLAY QUESTION
// =========================

function showQuestion() {

    clearInterval(timerId);

    questionLocked = false;

    feedbackElement.textContent = "";

    const current =
        currentQuestions[currentQuestionIndex];

    questionElement.textContent =
        current.question;

    progressElement.textContent =
        `Question ${currentQuestionIndex + 1} / ${currentQuestions.length}`;

    progressFill.style.width =
        `${((currentQuestionIndex + 1) / currentQuestions.length) * 100}%`;

    optionsElement.innerHTML = "";

    current.options.forEach(option => {

        const button =
            document.createElement("button");

        button.className = "option";

        button.textContent = option;

        button.addEventListener("click", () => {
            checkAnswer(button, option);
        });

        optionsElement.appendChild(button);
    });

    startTimer();
}


// =========================
// TIMER
// =========================

function startTimer() {

    timeLeft = selectedTime;

    timerElement.textContent =
        `${timeLeft}s`;

    timerId = setInterval(() => {

        timeLeft--;

        timerElement.textContent =
            `${timeLeft}s`;

        if (timeLeft <= 0) {

            clearInterval(timerId);

            handleTimeout();
        }

    }, 1000);
}


// =========================
// CHECK ANSWER
// =========================

function checkAnswer(clickedButton, selectedAnswer) {

    if (questionLocked) {
        return;
    }

    questionLocked = true;

    clearInterval(timerId);

    const correctAnswer =
        currentQuestions[currentQuestionIndex].answer;

    document.querySelectorAll(".option").forEach(button => {

        button.disabled = true;

        if (button.textContent === correctAnswer) {
            button.classList.add("correct");
        }

    });

    if (selectedAnswer === correctAnswer) {

        score++;

        feedbackElement.textContent =
            "Correct!";

    } else {

        clickedButton.classList.add("wrong");

        feedbackElement.textContent =
            "Incorrect!";
    }

    setTimeout(nextQuestion, 900);
}


// =========================
// TIMEOUT
// =========================

function handleTimeout() {

    if (questionLocked) {
        return;
    }

    questionLocked = true;

    const correctAnswer =
        currentQuestions[currentQuestionIndex].answer;

    document.querySelectorAll(".option").forEach(button => {

        button.disabled = true;

        if (button.textContent === correctAnswer) {
            button.classList.add("correct");
        }

    });

    feedbackElement.textContent =
        "Time's up!";

    setTimeout(nextQuestion, 1000);
}


// =========================
// NEXT QUESTION
// =========================

function nextQuestion() {

    currentQuestionIndex++;

    if (currentQuestionIndex < currentQuestions.length) {

        showQuestion();

    } else {

        finishQuiz();
    }
}


// =========================
// FINISH QUIZ
// =========================

function finishQuiz() {

    clearInterval(timerId);

    quizSection.classList.add("hidden");

    resultSection.classList.remove("hidden");

    const selectedCategory =
        category.options[category.selectedIndex].text;

    resultText.textContent =
        `${playerName.value.trim()}, you scored ${score} out of ${currentQuestions.length} in ${selectedCategory}.`;

    saveScore({
        name: playerName.value.trim(),
        score: score,
        total: currentQuestions.length,
        category: selectedCategory
    });

    displayLeaderboard();

    resultSection.scrollIntoView({
        behavior: "smooth"
    });
}


// =========================
// SAVE SCORE
// =========================

function saveScore(newScore) {

    const leaderboard =
        JSON.parse(
            localStorage.getItem("quizLeaderboard")
        ) || [];

    leaderboard.push(newScore);

    leaderboard.sort(
        (a, b) => b.score - a.score
    );

    localStorage.setItem(
        "quizLeaderboard",
        JSON.stringify(
            leaderboard.slice(0, 10)
        )
    );
}


// =========================
// DISPLAY LEADERBOARD
// =========================

function displayLeaderboard() {

    const leaderboard =
        JSON.parse(
            localStorage.getItem("quizLeaderboard")
        ) || [];

    if (leaderboard.length === 0) {

        leaderboardElement.innerHTML =
            "<p>No scores yet. Complete a quiz to appear here.</p>";

        return;
    }

    leaderboardElement.innerHTML = "";

    leaderboard.forEach((entry, index) => {

        const row =
            document.createElement("div");

        row.className =
            "leaderboard-row";

        row.innerHTML = `
            <strong>#${index + 1}</strong>
            <span>${escapeHTML(entry.name)}</span>
            <span>${escapeHTML(entry.category)}</span>
            <strong>${entry.score}/${entry.total}</strong>
        `;

        leaderboardElement.appendChild(row);
    });
}


// =========================
// ESCAPE HTML
// =========================

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent = value;

    return div.innerHTML;
}


// =========================
// CLEAR LEADERBOARD
// =========================

clearLeaderboard.addEventListener("click", () => {

    if (confirm("Clear all leaderboard scores?")) {

        localStorage.removeItem("quizLeaderboard");

        displayLeaderboard();
    }

});


// =========================
// PLAY AGAIN
// =========================

playAgain.addEventListener("click", () => {

    resultSection.classList.add("hidden");

    quizSection.classList.add("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// =========================
// LOAD LEADERBOARD
// =========================

displayLeaderboard();


// =====================================================
// WEATHER DASHBOARD
// Open-Meteo Geocoding API
// + Open-Meteo Forecast API
// =====================================================

const cityInput =
    document.getElementById("cityInput");

const weatherBtn =
    document.getElementById("weatherBtn");


// =========================
// WEATHER BUTTON
// =========================

weatherBtn.addEventListener(
    "click",
    searchWeather
);


// =========================
// ENTER KEY
// =========================

cityInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {
            searchWeather();
        }

    }
);


// =========================
// SEARCH WEATHER
// =========================

async function searchWeather() {

    const city =
        cityInput.value.trim();

    if (!city) {

        document.getElementById(
            "weatherMessage"
        ).textContent =
            "Please enter a city name.";

        return;
    }


    const message =
        document.getElementById(
            "weatherMessage"
        );


    message.textContent =
        "Loading weather...";


    document.getElementById(
        "weatherContent"
    ).classList.add("hidden");


    try {

        // =================================
        // STEP 1: FIND CITY COORDINATES
        // =================================

        const geoResponse =
            await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
            );


        if (!geoResponse.ok) {

            throw new Error(
                "Unable to search for the city."
            );
        }


        const geoData =
            await geoResponse.json();


        if (
            !geoData.results ||
            geoData.results.length === 0
        ) {

            throw new Error(
                "City not found."
            );
        }


        const location =
            geoData.results[0];


        // =================================
        // STEP 2: GET WEATHER DATA
        // =================================

        const weatherResponse =
            await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&forecast_days=3&timezone=auto`
            );


        if (!weatherResponse.ok) {

            throw new Error(
                "Unable to fetch weather data."
            );
        }


        const weatherData =
            await weatherResponse.json();


        const current =
            weatherData.current;


        // =================================
        // CURRENT WEATHER
        // =================================

        document.getElementById(
            "cityName"
        ).textContent =
            `${location.name}, ${location.country}`;


        document.getElementById(
            "temperature"
        ).textContent =
            Math.round(
                current.temperature_2m
            );


        document.getElementById(
            "humidity"
        ).textContent =
            `${current.relative_humidity_2m}%`;


        document.getElementById(
            "wind"
        ).textContent =
            `${Math.round(current.wind_speed_10m)} km/h`;


        document.getElementById(
            "feelsLike"
        ).textContent =
            `${Math.round(current.apparent_temperature)}°C`;


        document.getElementById(
            "rainProbability"
        ).textContent =
            `${weatherData.daily.precipitation_probability_max[0]}%`;


        document.getElementById(
            "weatherCondition"
        ).textContent =
            getWeatherDescription(
                current.weather_code
            );


        document.getElementById(
            "weatherIcon"
        ).textContent =
            getWeatherIcon(
                current.weather_code
            );


        // =================================
        // 3-DAY FORECAST
        // =================================

        displayForecast(
            weatherData.daily
        );


        // Show weather section

        document.getElementById(
            "weatherContent"
        ).classList.remove("hidden");


        message.textContent = "";


    } catch (error) {

        message.textContent =
            error.message;

    }
}


// =====================================================
// WEATHER DESCRIPTION
// =====================================================

function getWeatherDescription(code) {

    const descriptions = {

        0: "Clear Sky",
        1: "Mainly Clear",
        2: "Partly Cloudy",
        3: "Overcast",

        45: "Fog",
        48: "Fog",

        51: "Light Drizzle",
        53: "Drizzle",
        55: "Heavy Drizzle",

        61: "Light Rain",
        63: "Moderate Rain",
        65: "Heavy Rain",

        71: "Light Snow",
        73: "Moderate Snow",
        75: "Heavy Snow",

        80: "Rain Showers",
        81: "Moderate Rain Showers",
        82: "Heavy Rain Showers",

        95: "Thunderstorm",
        96: "Thunderstorm with Hail",
        99: "Thunderstorm with Heavy Hail"

    };

    return (
        descriptions[code] ||
        "Unknown"
    );
}


// =====================================================
// WEATHER ICON
// =====================================================

function getWeatherIcon(code) {

    if (code === 0) {
        return "☀️";
    }


    if (code === 1 || code === 2) {
        return "🌤️";
    }


    if (
        code === 3 ||
        code === 45 ||
        code === 48
    ) {
        return "☁️";
    }


    if (
        [
            51,
            53,
            55,
            61,
            63,
            65,
            80,
            81,
            82
        ].includes(code)
    ) {

        return "🌧️";
    }


    if (
        [
            71,
            73,
            75
        ].includes(code)
    ) {

        return "❄️";
    }


    if (
        [
            95,
            96,
            99
        ].includes(code)
    ) {

        return "⛈️";
    }


    return "🌤️";
}


// =====================================================
// 3-DAY FORECAST
// =====================================================

function displayForecast(daily) {

    const forecastContainer =
        document.getElementById(
            "forecast"
        );


    forecastContainer.innerHTML = "";


    for (
        let i = 0;
        i < 3;
        i++
    ) {

        const date =
            new Date(
                daily.time[i]
            );


        const dayName =
            date.toLocaleDateString(
                "en-US",
                {
                    weekday: "short"
                }
            );


        const card =
            document.createElement(
                "div"
            );


        card.className =
            "forecast-card";


        card.innerHTML = `

            <div class="day">
                ${i === 0 ? "Today" : dayName}
            </div>

            <div class="forecast-icon">
                ${getWeatherIcon(
                    daily.weather_code[i]
                )}
            </div>

            <div class="forecast-temp">
                ${Math.round(
                    daily.temperature_2m_max[i]
                )}° /
                ${Math.round(
                    daily.temperature_2m_min[i]
                )}°C
            </div>

            <div class="forecast-rain">
                🌧️ ${
                    daily
                    .precipitation_probability_max[i]
                }% rain
            </div>

        `;


        forecastContainer.appendChild(
            card
        );
    }
}