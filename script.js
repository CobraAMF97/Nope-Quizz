// Déclaration des variables globales
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timerId;
const timeLimit = 30; // Temps en secondes pour chaque question
let timerDisplay;

// Fonction pour charger les questions depuis le fichier JSON
function loadQuestions() {
    fetch('questions.json')
        .then(response => response.json())
        .then(data => {
            questions = data;
            showQuestion();
        })
        .catch(error => console.error('Erreur de chargement des questions:', error));
}

// Fonction pour afficher la question actuelle
function showQuestion() {
    const question = questions[currentQuestionIndex];
    
    if (!question) {
        console.error("Question non trouvée");
        return;
    }

    // Mettre à jour l'affichage de la question et des choix
    const questionText = document.getElementById('question-text');
    const choicesContainer = document.getElementById('choices');

    if (!questionText || !choicesContainer) {
        console.error("Éléments HTML nécessaires non trouvés");
        return;
    }

    questionText.textContent = question.question;
    choicesContainer.innerHTML = '';

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
    const question = questions[currentQuestionIndex];
    
    if (!question) {
        console.error("Question non trouvée");
        return;
    }

    console.log(`Réponse sélectionnée : ${selectedIndex}, Réponse correcte : ${question.correctIndex}`);

    if (question.correctIndex === selectedIndex) {
        score++;
        button.classList.add('burst-animation'); // Ajouter l'animation d'éclat de couleur

        setTimeout(() => {
            button.classList.remove('burst-animation'); // Retirer la classe après l'animation
            currentQuestionIndex++;
            if (score >= 10 || currentQuestionIndex >= questions.length) {
                showVictoryMessage();
            } else {
                showQuestion();
            }
        }, 1000);

    } else {
        showHumorousMessage();
    }
}

// Fonction pour afficher un message humoristique
function showHumorousMessage() {
    const questionText = document.getElementById('question-text');
    const choicesContainer = document.getElementById('choices');
    
    if (questionText && choicesContainer) {
        questionText.textContent = "Dommage ! Essayez encore ! 😅";
        choicesContainer.innerHTML = '';
    }
}

// Fonction pour afficher un message de victoire
function showVictoryMessage() {
    const questionText = document.getElementById('question-text');
    const choicesContainer = document.getElementById('choices');
    
    if (questionText && choicesContainer) {
        questionText.textContent = `Félicitations ! Vous avez gagné avec un score de ${score} ! 🎉`;
        choicesContainer.innerHTML = '';
    }
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

