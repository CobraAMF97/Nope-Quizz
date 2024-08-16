let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timerId;
let usedQuestions = [];
let humorMessages = [
    "Oups, Julie ! Ce n'était pas la bonne réponse. Peut-être que les extraterrestres de Narvette connaissent la bonne réponse ?",
    "Mauvaise réponse, Méchante Girafe ! Si tu te demandais, je suis un expert en mauvaise réponse.",
    "Oh non, Gros Prout ! Cette réponse n'est pas correcte. Essaie encore !",
    "C'est raté, Julie ! Tu sais, même les questions ont des mauvais jours !",
    "Argh ! La réponse était plus compliquée que le dernier prout. Réessaie, Julie !"
];

fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        questions = shuffleArray(data);
        startQuiz();
    })
    .catch(error => console.error('Erreur lors du chargement des questions:', error));

function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    usedQuestions = [];
    showQuestion();
    startTimer();
}

function startTimer() {
    clearInterval(timerId);
    timeLeft = 10;
    const timerBar = document.querySelector('#timer .timer-bar');
    timerBar.style.width = '100%';
    timerId = setInterval(() => {
        timeLeft--;
        timerBar.style.width = `${(timeLeft / 10) * 100}%`;
        if (timeLeft <= 0) {
            clearInterval(timerId);
            gameOver("Temps écoulé !");
        }
    }, 1000);
}

function showQuestion() {
    const questionContainer = document.getElementById('quiz-container');
    questionContainer.innerHTML = '';

    if (currentQuestionIndex < 15 && questions.length > 0) {
        let question = getNextQuestion();
        if (!question) {
            showVictoryMessage();
            return;
        }

        const questionElement = document.createElement('h2');
        questionElement.textContent = question.question;
        questionContainer.appendChild(questionElement);

        question.choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.textContent = choice;
            button.addEventListener('click', () => checkAnswer(index));
            questionContainer.appendChild(button);
        });
    } else {
        showVictoryMessage();
    }
}

function getNextQuestion() {
    const availableQuestions = questions.filter(q => !usedQuestions.includes(q));
    if (availableQuestions.length === 0) return null;

    let question = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    usedQuestions.push(question);
    return question;
}

function checkAnswer(index) {
    clearInterval(timerId);
    const question = questions.find(q => !usedQuestions.includes(q));
    if (question.correctIndex === index) {
        score++;
        if (score >= 10) {
            showVictoryMessage();
        } else {
            currentQuestionIndex++;
            startTimer();
            showQuestion();
        }
    } else {
        showHumorousMessage();
    }
}

function showHumorousMessage() {
    const questionContainer = document.getElementById('quiz-container');
    const message = humorMessages[Math.floor(Math.random() * humorMessages.length)];
    questionContainer.innerHTML = `<h2>${message}</h2><button class="recommencer" onclick="startQuiz()">Recommencer</button>`;
}

function gameOver(message) {
    const questionContainer = document.getElementById('quiz-container');
    questionContainer.innerHTML = `<h2>${message}</h2><button class="recommencer" onclick="startQuiz()">Recommencer</button>`;
}

function showVictoryMessage() {
    const questionContainer = document.getElementById('quiz-container');
    questionContainer.innerHTML = `<h2 class="victory-animation">Victoire ! Vous avez bien répondu à ${score} questions sur 15.</h2><button class="recommencer" onclick="startQuiz()">Recommencer</button>`;
}

function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}
