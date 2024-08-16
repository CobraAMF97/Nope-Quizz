let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timerId;
let usedQuestions = [];
let humorMessages = [
    "Oups, Julie ! Ce n'était pas la bonne réponse. Peut-être que les extraterrestres connaissent la bonne réponse ?",
    "Mauvaise réponse, Méchante girafe ! Si tu te demandais, je suis un expert en mauvaise réponse.",
    "Oh non, Gros prout ! Cette réponse n'est pas correcte. Essaie encore !",
    "Tu vas y arriver, j'en suis certain !",
    "C'est raté, Julie ! Tu sais, même les questions ont des mauvais jours !",
    "Argh ! La réponse était plus compliquée que prévue. Réessaie, Julie !"
];

fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        questions = shuffleArray(data);
        showTutorial();
    })
    .catch(error => console.error('Erreur lors du chargement des questions:', error));

function showTutorial() {
    const questionContainer = document.getElementById('quiz-container');
    questionContainer.innerHTML = `
        <h2>Bienvenue dans le Quiz Mode Challenge !</h2>
        <p>Pour gagner le jeu, il te faudra répondre correctement à 10 questions. Une fois que tu auras atteint cet objectif, tu débloqueras un code spécial !</p>
        <p>Bonne chance, Julie !</p>
        <button class="start-game" onclick="startQuiz()">Commencer le jeu</button>
    `;
}

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
            button.addEventListener('click', () => checkAnswer(index, question));
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

function checkAnswer(index, question) {
    clearInterval(timerId);
    
    console.log(`Réponse sélectionnée : ${index}, Réponse correcte : ${question.correctIndex}`);
    
    if (index === question.correctIndex) {
        score++;
        if (score >= 10) {
            showVictoryMessage();
        } else {
            currentQuestionIndex++;
            showQuestion();
            startTimer();
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
    questionContainer.innerHTML = `
        <h2 class="victory-animation">Victoire ! Vous avez bien répondu à ${score} questions sur 15.</h2>
        <p>Félicitations ! Vous avez débloqué le code suivant :</p>
        <p><strong>CAPDES3ANS</strong></p>
        <button class="recommencer" onclick="startQuiz()">Recommencer</button>
    `;
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
