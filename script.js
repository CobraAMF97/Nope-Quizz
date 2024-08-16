let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeRemaining = 5;
let selectedQuestions = [];
let questions = [
    // Ajoute ici les 50 questions comme indiqué précédemment
    // Par exemple :
    { question: "Quelle est la capitale de la France ?", choices: ["Paris", "Londres", "Berlin", "Madrid"], correctIndex: 0 },
    { question: "Qui a peint la Joconde ?", choices: ["Van Gogh", "Picasso", "Léonard de Vinci", "Monet"], correctIndex: 2 }
    // Ajoute les autres questions ici
];

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

startQuiz();
