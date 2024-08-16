let currentQuestionIndex = 0;
let score = 0;
let questions = [];

fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
        startQuiz();
    });

function startQuiz() {
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('victory-message').style.display = 'none';
    showQuestion();
}

function showQuestion() {
    const questionElement = document.getElementById('question');
    const choicesElement = document.getElementById('choices');
    const currentQuestion = questions[currentQuestionIndex];

    questionElement.textContent = currentQuestion.question;
    choicesElement.innerHTML = '';

    currentQuestion.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.onclick = () => selectAnswer(index);
        choicesElement.appendChild(button);
    });
}

function selectAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedIndex === currentQuestion.correctIndex) {
        score++;
        if (score === 10) {
            showVictoryMessage();
        } else {
            currentQuestionIndex++;
            showQuestion();
        }
    } else {
        restartQuiz();
    }
}

function showVictoryMessage() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('victory-message').style.display = 'block';
    startConfetti();
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    startQuiz();
    stopConfetti();
}

function startConfetti() {
    const confettiElement = document.getElementById('confetti');
    confettiElement.innerHTML = '';
    for (let i = 0; i < 100; i++) {
        const confetto = document.createElement('div');
        confetto.className = 'confetto';
        confetto.style.left = `${Math.random() * 100}%`;
        confetto.style.animationDelay = `${Math.random() * 2}s`;
        confettiElement.appendChild(confetto);
    }
}

function stopConfetti() {
    const confettiElement = document.getElementById('confetti');
    confettiElement.innerHTML = '';
}
