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

// Fonction pour sélectionner aléatoirement 10 questions
function selectRandomQuestions() {
    selectedQuestions = [];
    while (selectedQuestions.length < totalQuestions) {
        const randomIndex = Math.floor(Math.random() * questions.length);
        if (!selectedQuestions.includes(questions[randomIndex])) {
            selectedQuestions.push(questions[randomIndex]);
        }
    }
}

// Fonction pour afficher la question actuelle
function showQuestion() {
    const question = selectedQuestions[currentQuestionIndex];
    
    if (!question) {
        console.error("Question non trouvée");
        return;
    }

    // Mettre à jour l'affichage de la question et des choix
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

    // Trouver la question actuelle
    const question = selectedQuestions[currentQuestionIndex];
    
    if (!question) {
        console.error("Question non trouvée");
        return;
    }

    // Vérifier si l'index sélectionné correspond à l'index de la réponse correcte
    if (question.correctIndex === selectedIndex) {
        score++;
        button.classList.add('burst-animation'); // Ajouter l'animation d'éclat de couleur

        setTimeout(() => {
            button.classList.remove('burst-animation'); // Retirer la classe après l'animation
            currentQuestionIndex++;
            if (currentQuestionIndex < totalQuestions) {
                showQuestion();
            } else {
                showVictoryMessage();
            }
        }, 1000);

    } else {
        showHumorousMessage();
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
        retryButton.style.display = 'block'; // Afficher le bouton de réessai
    }
}

// Fonction pour afficher un message de victoire
function showVictoryMessage() {
    const questionText = document.getElementById('question-text');
    const choicesContainer = document.getElementById('choices');
    
    if (questionText && choicesContainer) {
        questionText.textContent = `Félicitations ! Vous avez gagné avec un score de ${score} ! 🎉\nVotre code : CAPDES3ANS`;
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
    // Prévenir les actions indésirables des événements tactiles
    if (event.target.tagName === 'BUTTON') {
        event.preventDefault();
        event.target.click();
    }
});
