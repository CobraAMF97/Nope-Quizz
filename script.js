let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timerId;
let usedQuestions = [];

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
        const percentage = (timeLeft / 10) * 100;
        timerBar.style.width = `${percentage}%`;
        if (timeLeft <= 0) {
            clearInterval(timerId);
            gameOver("Temps écoulé !");
        }
    }, 1000);
}

function getRandomQuestion() {
    const easyQuestions = questions.filter(q => q.difficulty === 'easy');
    const mediumQuestions = questions.filter(q => q.difficulty === 'medium');
    const hardQuestions = questions.filter(q => q.difficulty === 'hard');

    // Ensure at least 5 hard questions
    let selectedQuestions = [];
    while (selectedQuestions.length < 15) {
        if (selectedQuestions.length < 5) {
            selectedQuestions.push(...pickRandom(hardQuestions, 5));
        }
        if (selectedQuestions.length < 15) {
            selectedQuestions.push(...pickRandom(mediumQuestions, 10));
        }
    }
    // Remove duplicates
    selectedQuestions = Array.from(new Set(selectedQuestions.map(q => q.question)))
        .map(question => selectedQuestions.find(q => q.question === question));

    // Ensure no duplicates
    let availableQuestions = selectedQuestions.filter(q => !usedQuestions.includes(q.question));
    if (availableQuestions.length === 0) {
        availableQuestions = selectedQuestions.slice();
    }

    return availableQuestions.splice(Math.floor(Math.random() * availableQuestions.length), 1)[0];
}

function pickRandom(array, num) {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

function showQuestion() {
    const questionContainer = document.getElementById('quiz-container');
    questionContainer.innerHTML = '';

    if (currentQuestionIndex < 15) {
        const question = getRandomQuestion();
        usedQuestions.push(question.question);
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
    const question = questions.find(q => q.question === usedQuestions[currentQuestionIndex]);
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
    // Animation for victory message
    const victoryMessage = document.querySelector('#quiz-container h2');
    victoryMessage.classList.add('victory-animation');
}
