let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timerId;

fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
        startQuiz();
    })
    .catch(error => console.error('Erreur lors du chargement des questions:', error));

function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    showQuestion();
    startTimer();
}

function startTimer() {
    clearInterval(timerId);
    timeLeft = 10;
    document.getElementById('timer').textContent = `Temps restant : ${timeLeft}s`;
    timerId = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = `Temps restant : ${timeLeft}s`;
        if (timeLeft <= 0) {
            gameOver("Temps écoulé !");
        }
    }, 1000);
}

function showQuestion() {
    const questionContainer = document.getElementById('quiz-container');
    questionContainer.innerHTML = '';

    if (currentQuestionIndex < 15) {
        const question = questions[currentQuestionIndex];
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

function checkAnswer(index) {
    clearInterval(timerId);
    const question = questions[currentQuestionIndex];
    if (index === question.correctIndex) {
        score++;
        if (score >= 10) {
            showVictoryMessage();
        } else {
            currentQuestionIndex++;
            startTimer();
            showQuestion();
        }
    } else {
        gameOver("Mauvaise réponse !");
    }
}

function gameOver(message) {
    const questionContainer = document.getElementById('quiz-container');
    questionContainer.innerHTML = `<h2>${message}</h2><button class="recommencer" onclick="startQuiz()">Recommencer</button>`;
}

function showVictoryMessage() {
    const questionContainer = document.getElementById('quiz-container');
    questionContainer.innerHTML = `<h2>Victoire ! Vous avez bien répondu à ${score} questions sur 15.</h2><button class="recommencer" onclick="startQuiz()">Recommencer</button>`;
}

