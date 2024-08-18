// Déclaration des variables globales
let questions = [];
let selectedQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timerId;
const timeLimit = 30; // Temps en secondes pour chaque question
const totalQuestions = 10; // Nombre total de questions à poser
let timerDisplay;

// Fonction pour charger les questions depuis le fichier JSON
function loadQuestions() {
    fetch('questions.json')
        .then(response => response.json())
        .then(data => {
            questions = data;
            selectRandomQuestions();
            showQuestion();
        })
        .catch(error => console.error('Erreur de chargement des questions:', error));
}

// Fonction pour sélectionner aléatoirement 10 questions sans répétition
function selectRandomQuestions() {
    const questionPool = [...questions]; // Crée une copie du tableau de questions
    selectedQuestions = [];
    
    while (selectedQuestions.length < totalQuestions && questionPool.length > 0) {
        const randomIndex = Math.floor(Math.random() * questionPool.length);
        const selectedQuestion = questionPool.splice(randomIndex, 1)[0]; // Retire la question pour éviter les répétitions
        selectedQuestions.push(selectedQuestion);
    }
}

// Fonction pour afficher la question actuelle
function showQuestion() {
    const question = selectedQuestions[currentQuestionIndex];
    
    if (!question) {
        console.error("Question non trouvée");
        return;
    }

    const questionText = document.getElementById('question-text');
    const choicesContainer = document.getElementById('choices');
    const retryButton = document.getElementById('retry-button');

    if (!questionText || !choicesContainer) {
        console.error("Éléments HTML nécessaires non trouvés");
        return;
    }

    questionText.textContent = question.question;
    choicesContainer.innerHTML = '';
    retryButton.style.display = 'none'; // Masquer le bouton de réessai

    question.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.classList.add('choice-button'); // Ajouter une classe pour styliser les boutons
        button.onclick = () => checkAnswer(index, button);
        choicesContainer.appendChild(button);
    });

    startTimer();
}

// Fonction pour démarrer le timer
function startTimer() {
    let timeLeft = timeLimit;
    const timerBar = document.querySelector('#timer .timer-bar');
    
    timerBar.style.width = '100%';

    timerId = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Temps restant : ${timeLeft}s`;

        timerBar.style.width = `${(timeLeft / timeLimit) * 100}%`;

        if (timeLeft <= 0) {
            clearInterval(timerId);
            showHumorousMessage();
        }
    }, 1000);
}

// Fonction pour vérifier la réponse de l'utilisateur
function checkAnswer(selectedIndex, button) {
    clearInterval(timerId); // Arrêter le timer

    const question = selectedQuestions[currentQuestionIndex];
    
    if (!question) {
        console.error("Question non trouvée");
        return;
    }

    if (question.correctIndex === selectedIndex) {
        score++;
        button.classList.add('burst-animation');

        setTimeout(() => {
            button.classList.remove('burst-animation');
            currentQuestionIndex++;
            if (currentQuestionIndex < totalQuestions) {
                showQuestion();
            } else {
                showVictoryMessage();
            }
        }, 1000);

    } else {
        button.classList.add('shake-animation'); // Ajouter l'animation de secousse

        setTimeout(() => {
            button.classList.remove('shake-animation'); // Retirer l'animation après son exécution
            showHumorousMessage();
        }, 500); // La durée de l'animation de secousse est de 0.5s
    }
}

// Fonction pour afficher un message humoristique et le bouton de réessai
function showHumorousMessage() {
    const questionText = document.getElementById('question-text');
    const choicesContainer = document.getElementById('choices');
    const retryButton = document.getElementById('retry-button');
    
    if (questionText && choicesContainer) {
        questionText.textContent = "Dommage ! Essayez encore ! 😅";
        choicesContainer.innerHTML = '';
        retryButton.style.display = 'block';
    }
}

// Fonction pour afficher un message de victoire avec animation de confettis
function showVictoryMessage() {
    const questionText = document.getElementById('question-text');
    const choicesContainer = document.getElementById('choices');
    
    if (questionText && choicesContainer) {
        // Animation de confettis
        confetti({
            particleCount: 200,
            spread: 70,
            origin: { y: 0.6 }
        });

        questionText.textContent = `Félicitations Julie ! Tu as correctement répondu à 10 questions 🎉 Voici ton code : O21`;
        choicesContainer.innerHTML = '';
    }
}

// Fonction pour réinitialiser le jeu
function resetGame() {
    currentQuestionIndex = 0;
    score = 0;
    selectRandomQuestions();
    showQuestion();
}

// Initialisation du jeu
window.onload = () => {
    timerDisplay = document.getElementById('timer');
    loadQuestions();
};

// Ajustements pour les écrans tactiles
document.addEventListener('touchstart', (event) => {
    if (event.target.tagName === 'BUTTON') {
        event.preventDefault();
        event.target.click();
    }
});
