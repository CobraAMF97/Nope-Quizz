let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeRemaining = 5;
let questions = [
    {
        question: "Quelle est la capitale de la France ?",
        choices: ["Paris", "Londres", "Berlin", "Madrid"],
        correctIndex: 0
    },
    {
        question: "Qui a peint la Joconde ?",
        choices: ["Van Gogh", "Picasso", "Léonard de Vinci", "Monet"],
        correctIndex: 2
    },
    {
        question: "Combien de côtés a un triangle ?",
        choices: ["Deux", "Trois", "Quatre", "Cinq"],
        correctIndex: 1
    }
];

function startQuiz() {
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('restart-message').style.display = 'none';
    document.getElementById('victory-message').style.display = 'none';
    showQuestion();
}

function showQuestion() {
    const questionElement = document.getElementById('question');
    const choicesElement = document.getElementById('choices');
    const timerElement = document.getElementById('time-remaining');
    const currentQuestion = questions[currentQuestionIndex];

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
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedIndex === currentQuestion.correctIndex) {
        score++;
        if (currentQuestionIndex === questions.length - 1 && score >= 2) {
            showVictoryMessage();
        } else {
            currentQuestionIndex++;
            showQuestion();
        }
    } else {
        showRestartMessage();
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
