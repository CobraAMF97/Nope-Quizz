let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timerId;
let askedQuestions = [];
const maxQuestions = 15;
const difficultQuestionsCount = 5;

fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
        startQuiz();
    })
    .catch(error => console.error('Erreur lors du chargement des questions:', error));

function getRandomQuestion() {
    let filteredQuestions = questions.filter(q => !askedQuestions.includes(q));
    if (filteredQuestions.length === 0) return null;
    let randomIndex = Math.floor(Math.random() * filteredQuestions.length);
    return filteredQuestions[randomIndex];
}

function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    askedQuestions = [];
    showQuestion();
    startTimer();
}

function startTimer() {
    clearInterval(timerId);
    timeLeft = 10;
    document.querySelector('.timer-bar').style.width = '100%';
    timerId = setInterval(() => {
        timeLeft--;
        document.querySelector('.timer-bar').style.width = `${(timeLeft / 10) * 100}%`;
        if (timeLeft <= 0) {
            gameOver("Temps écoulé !");
        }
    }, 1000);
}

function showQuestion() {
    const questionContainer = document.getElementById('quiz-container');
    questionContainer.innerHTML = '';

    if (currentQuestionIndex < maxQuestions) {
        let question = getRandomQuestion();
        if (!question) {
            gameOver("Erreur: Pas assez de questions disponibles.");
            return;
        }
        askedQuestions.push(question);

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

function checkAnswer(index, question) {
    clearInterval(timerId);
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
    questionContainer.innerHTML = `
        <div class="victory-message">
            <h2>Victoire ! Vous avez bien répondu à ${score} questions sur ${maxQuestions}.</h2>
            <button class="recommencer" onclick="startQuiz()">Recommencer</button>
        </div>
    `;
    document.querySelector('.victory-message').classList.add('animate');
}
