let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeRemaining = 5;
let selectedQuestions = [];
let questions = [];

// Charger les questions depuis le fichier JSON
fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
        startQuiz();
    })
    .catch(error => console.error('Erreur lors du chargement des questions:', error));

function startQuiz() {
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('restart-message').style.display = 'none';
    document.getElementById('victory-message').style.display = 'none';
    score = 0;
    selectedQuestions = [];
    selectRandomQuestions();
    currentQuestionIndex = 0;
    showQuestion();
}

function selectRandomQuestions() {
    let availableQuestions = [...questions];
    while (selectedQuestions.length < 15 && availableQuestions.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableQuestions.length);
        selectedQuestions.push(availableQuestions.splice(randomIndex, 1)[0]);
    }
}

function showQuestion() {
    const questionElement = document.getElementById('question');
    const choicesElement = document.getElementById('choices');
    const timerElement = document.getElementById('time-remaining');
    const currentQuestion = selectedQuestions[currentQuestionIndex];

    timeRemaining = 5;
    timerElement.textContent = timeRemaining;
    startTimer();

    questionElement.textContent = currentQuestion.question;
    choicesElement.innerHTML = '';

    currentQuestion.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.onclick = () => selectAnswer(index);
        choicesElement.appendChild(button);
    });
}

function startTimer() {
    timer = setInterval(() => {
        timeRemaining--;
        document.getElementById('time-remaining').textContent = timeRemaining;
        if (timeRemaining === 0) {
            clearInterval(timer);
            handleAnswerTimeout();
        }
    }, 1000);
}

function handleAnswerTimeout() {
    restartQuiz();
}

function selectAnswer(selectedIndex) {
    clearInterval(timer);
    const currentQuestion = selectedQuestions[currentQuestionIndex];

    if (selectedIndex === currentQuestion.correctIndex) {
        score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex === selectedQuestions.length) {
        if (score >= 10) {
            showVictoryMessage();
        } else {
            showRestartMessage();
        }
    } else {
        showQuestion();
    }
}

function showRestartMessage() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('restart-message').style.display = 'block';
}

function showVictoryMessage() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('victory-message').style.display = 'block';
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    startQuiz();
}
