// Déclaration des variables globales
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timerId;
const timeLimit = 30; // Temps en secondes pour chaque question
const timerDisplay = document.getElementById('timer');

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
    document.getElementById('question-text').textContent = question.question;
    const choicesContainer = document.getElementById('choices');
    choicesContainer.innerHTML = '';

    question.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.onclick = () => checkAnswer(index, button);
        choicesContainer.appendChild(button);
    });

    startTimer();
}

// Fonction pour démarrer le timer
function startTimer() {
    let timeLeft = timeLimit;
    timerDisplay.textContent = `Temps restant : ${timeLeft}s`;

    timerId = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Temps restant : ${timeLeft}s`;

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
        }, 1000);

        if (score >= 10) {
            showVictoryMessage();
        } else {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                startTimer();
                showQuestion();
            } else {
                showVictoryMessage();
            }
        }
    } else {
        showHumorousMessage();
    }
}

// Fonction pour afficher un message humoristique
function showHumorousMessage() {
    document.getElementById('question-text').textContent = "Dommage ! Essayez encore ! 😅";
    document.getElementById('choices').innerHTML = '';
}

// Fonction pour afficher un message de victoire
function showVictoryMessage() {
    document.getElementById('question-text').textContent = `Félicitations ! Vous avez gagné avec un score de ${score} ! 🎉`;
    document.getElementById('choices').innerHTML = '';
}

// Initialisation du jeu
window.onload = loadQuestions;


