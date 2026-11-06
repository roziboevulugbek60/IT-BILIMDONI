
const questions = [
    {
        question: "HTML nima uchun ishlatiladi?",
        answers: [
            "Veb-sahifa tuzilishini yaratish",
            "Rasm chizish",
            "Video montaj qilish",
            "Kompyuterni tozalash"
        ],
        correct: 0
    },
    {
        question: "CSS ning asosiy vazifasi nima?",
        answers: [
            "Ma'lumot saqlash",
            "Veb-sahifani bezash",
            "Internetni tezlashtirish",
            "Ovoz yozish"
        ],
        correct: 1
    },
    {
        question: "JavaScript qanday til?",
        answers: [
            "Dasturlash tili",
            "Operatsion tizim",
            "Brauzer",
            "Kompyuter qurilmasi"
        ],
        correct: 0
    },
    {
        question: "Kompyuterning miyasi deb qaysi qurilma ataladi?",
        answers: [
            "Monitor",
            "Klaviatura",
            "Protsessor",
            "Sichqoncha"
        ],
        correct: 2
    },
    {
        question: "Python dasturlash tilining belgisi qaysi?",
        answers: [
            "🐍",
            "🍎",
            "🚀",
            "🌍"
        ],
        correct: 0
    },
    {
        question: "RAM nima?",
        answers: [
            "Doimiy xotira",
            "Tezkor xotira",
            "Monitor turi",
            "Internet tarmog‘i"
        ],
        correct: 1
    },
    {
        question: "Internet sahifalarini ochish uchun nima ishlatiladi?",
        answers: [
            "Kalkulyator",
            "Brauzer",
            "Paint",
            "Bloknot"
        ],
        correct: 1
    },
    {
        question: "Quyidagilardan qaysi biri operatsion tizim?",
        answers: [
            "Windows",
            "HTML",
            "Google Chrome",
            "JavaScript"
        ],
        correct: 0
    },
    {
        question: "1 kilobayt odatda necha bayt deb olinadi?",
        answers: [
            "100 bayt",
            "512 bayt",
            "1024 bayt",
            "2048 bayt"
        ],
        correct: 2
    },
    {
        question: "Git dasturchilarga nima uchun kerak?",
        answers: [
            "Musiqa tinglash uchun",
            "Kod versiyalarini boshqarish uchun",
            "Rasm chizish uchun",
            "Video ko‘rish uchun"
        ],
        correct: 1
    }
];

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const nameInput = document.getElementById("player-name");
const startBtn = document.getElementById("start-btn");
const questionNumber = document.getElementById("question-number");
const scoreText = document.getElementById("score");
const mistakesText = document.getElementById("mistakes");
const progressBar = document.getElementById("progress-bar");
const questionText = document.getElementById("question");
const answersBox = document.getElementById("answers");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

let playerName = "";
let currentQuestion = 0;
let score = 0;
let mistakes = 0;
let answered = false;

startBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restartGame);

function startGame() {
    playerName = nameInput.value.trim();

    if (!playerName) {
        alert("Iltimos, ismingizni kiriting!");
        return;
    }

    currentQuestion = 0;
    score = 0;
    mistakes = 0;

    startScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    showQuestion();
}

function showQuestion() {
    answered = false;

    const q = questions[currentQuestion];

    questionNumber.textContent =
        `Savol: ${currentQuestion + 1}/${questions.length}`;

    scoreText.textContent = `Ball: ${score}`;
    mistakesText.textContent = `Xatolar: ${mistakes}`;

    progressBar.style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    questionText.textContent = q.question;
    answersBox.innerHTML = "";
    feedback.textContent = "";
    nextBtn.disabled = true;

    q.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.textContent =
            `${String.fromCharCode(65 + index)}. ${answer}`;

        button.className = "answer-btn";

        button.addEventListener("click", () => {
            checkAnswer(index, button);
        });

        answersBox.appendChild(button);
    });
}

function checkAnswer(selectedIndex, selectedButton) {
    if (answered) return;

    answered = true;

    const correctIndex = questions[currentQuestion].correct;
    const buttons = answersBox.querySelectorAll("button");

    buttons.forEach(button => {
        button.disabled = true;
    });

    if (selectedIndex === correctIndex) {
        score++;
        selectedButton.classList.add("correct");
        feedback.textContent = "✅ To‘g‘ri javob! Barakalla!";
    } else {
        mistakes++;
        selectedButton.classList.add("wrong");
        buttons[correctIndex].classList.add("correct");
        feedback.textContent = "❌ Noto‘g‘ri javob!";
    }

    scoreText.textContent = `Ball: ${score}`;
    mistakesText.textContent = `Xatolar: ${mistakes}`;

    nextBtn.disabled = false;

    if (currentQuestion === questions.length - 1) {
        nextBtn.textContent = "Natijani ko‘rish 🏆";
    }
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        nextBtn.textContent = "Keyingi savol ➜";
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    progressBar.style.width = "100%";

    document.getElementById("result-name").textContent =
        `Ishtirokchi: ${playerName}`;

    document.getElementById("final-score").textContent =
        `⭐ Ball: ${score}/${questions.length}`;

    document.getElementById("final-mistakes").textContent =
        `❌ Xatolar: ${mistakes}`;

    let message = "";

    if (score === 10) {
        message = "Ajoyib! Siz haqiqiy IT bilimdonisiz! 🏆";
    } else if (score >= 7) {
        message = "Juda yaxshi! Bilimingiz ancha kuchli! 👏";
    } else if (score >= 5) {
        message = "Yaxshi! Yana mashq qiling! 💪";
    } else {
        message = "Harakatda davom eting! Siz uddalaysiz! 🌟";
    }

    document.getElementById("final-message").textContent = message;
}

function restartGame() {
    resultScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");

    nameInput.value = "";
    nextBtn.textContent = "Keyingi savol ➜";
}
