let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeRemaining = 5;
let selectedQuestions = [];
let questions = [
    { question: "Quelle est la capitale de la France ?", choices: ["Paris", "Londres", "Berlin", "Madrid"], correctIndex: 0 },
    { question: "Qui a peint la Joconde ?", choices: ["Van Gogh", "Picasso", "Léonard de Vinci", "Monet"], correctIndex: 2 },
    { question: "Combien de côtés a un triangle ?", choices: ["Deux", "Trois", "Quatre", "Cinq"], correctIndex: 1 },
    { question: "En quelle année a eu lieu la Révolution française ?", choices: ["1789", "1799", "1804", "1815"], correctIndex: 0 },
    { question: "Quel est le plus long fleuve du monde ?", choices: ["Amazone", "Nile", "Yangtsé", "Mississippi"], correctIndex: 1 },
    { question: "Qui a écrit 'Les Misérables' ?", choices: ["Victor Hugo", "Emile Zola", "Gustave Flaubert", "Albert Camus"], correctIndex: 0 },
    { question: "Quel est l'élément chimique avec le symbole 'O' ?", choices: ["Or", "Oxygène", "Osmium", "Oganesson"], correctIndex: 1 },
    { question: "Quel est le plus haut sommet du monde ?", choices: ["Mont Everest", "Mont Blanc", "K2", "Kilimandjaro"], correctIndex: 0 },
    { question: "Qui a composé la Symphonie No. 9 en ré mineur ?", choices: ["Mozart", "Bach", "Beethoven", "Tchaïkovski"], correctIndex: 2 },
    { question: "Combien de pattes a une araignée ?", choices: ["Six", "Huit", "Dix", "Douze"], correctIndex: 1 },
    { question: "Quelle est la langue officielle du Brésil ?", choices: ["Espagnol", "Portugais", "Français", "Anglais"], correctIndex: 1 },
    { question: "Quel est le plus grand océan de la Terre ?", choices: ["Atlantique", "Pacifique", "Indien", "Arctique"], correctIndex: 1 },
    { question: "Dans quelle ville se trouve la Tour Eiffel ?", choices: ["Londres", "Berlin", "Paris", "Rome"], correctIndex: 2 },
    { question: "Quel est le nom du vaisseau spatial dans 'Star Wars' ?", choices: ["L'Enterprise", "Le Faucon Millenium", "Le Galactica", "L'Aigle"], correctIndex: 1 },
    { question: "Quelle est la plus grande planète du système solaire ?", choices: ["Terre", "Mars", "Jupiter", "Saturne"], correctIndex: 2 },
    { question: "Qui a écrit 'Le Petit Prince' ?", choices: ["Victor Hugo", "Jules Verne", "Antoine de Saint-Exupéry", "Albert Camus"], correctIndex: 2 },
    { question: "Quelle est la monnaie du Japon ?", choices: ["Yuan", "Won", "Yen", "Dollar"], correctIndex: 2 },
    { question: "Quel est l'animal terrestre le plus rapide ?", choices: ["Lion", "Guépard", "Antilope", "Tigre"], correctIndex: 1 },
    { question: "Qui a découvert la pénicilline ?", choices: ["Marie Curie", "Alexander Fleming", "Louis Pasteur", "Isaac Newton"], correctIndex: 1 },
    { question: "Combien de couleurs y a-t-il dans un arc-en-ciel ?", choices: ["Cinq", "Six", "Sept", "Huit"], correctIndex: 2 },
    { question: "Quel est le plus petit pays du monde ?", choices: ["Monaco", "Malte", "Vatican", "Liechtenstein"], correctIndex: 2 },
    { question: "Qui a réalisé le film 'Titanic' ?", choices: ["Steven Spielberg", "James Cameron", "Martin Scorsese", "Quentin Tarantino"], correctIndex: 1 },
    { question: "Quel est le symbole chimique du fer ?", choices: ["Fe", "Ir", "Fr", "F"], correctIndex: 0 },
    { question: "Quel est l'animal emblème de la France ?", choices: ["Coq", "Lion", "Tigre", "Aigle"], correctIndex: 0 },
    { question: "Quel est le plus grand désert du monde ?", choices: ["Sahara", "Arctique", "Antarctique", "Gobi"], correctIndex: 2 },
    { question: "Qui a écrit 'Hamlet' ?", choices: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Jane Austen"], correctIndex: 2 },
    { question: "Quelle est la distance entre la Terre et le Soleil ?", choices: ["93 millions de km", "150 millions de km", "250 millions de km", "300 millions de km"], correctIndex: 1 },
    { question: "Quel est le plus grand mammifère marin ?", choices: ["Requin", "Baleine bleue", "Dauphin", "Orque"], correctIndex: 1 },
    { question: "Quel est l'animal le plus long vivant aujourd'hui ?", choices: ["Boa", "Python", "Ver plat géant", "Médusa à crinière de lion"], correctIndex: 3 },
    { question: "Qui a écrit 'L'Odyssée' ?", choices: ["Socrate", "Homère", "Platon", "Aristote"], correctIndex: 1 },
    { question: "Quel est le plus grand pays en superficie ?", choices: ["Canada", "Russie", "Chine", "États-Unis"], correctIndex: 1 },
    { question: "Qui a inventé l'ampoule électrique ?", choices: ["Thomas Edison", "Nikola Tesla", "Benjamin Franklin", "James Watt"], correctIndex: 0 },
    { question: "Quelle est la vitesse du son ?", choices: ["343 m/s", "1235 km/h", "299 792 km/s", "1080 km/h"], correctIndex: 0 },
    { question: "Combien y a-t-il de touches sur un piano ?", choices: ["85", "88", "90", "92"], correctIndex: 1 },
    { question: "Quelle est la langue officielle du Brésil ?", choices: ["Portugais", "Espagnol", "Français", "Anglais"], correctIndex: 0 },
    { question: "Quel est le plus grand océan de la Terre ?", choices: ["Pacifique", "Atlantique", "Indien", "Arctique"], correctIndex: 0 },
    { question: "Qui a peint le plafond de la Chapelle Sixtine ?", choices: ["Michel-Ange", "Raphaël", "Léonard de Vinci", "Donatello"], correctIndex: 0 },
    { question: "Combien de temps la lumière met-elle pour atteindre la Terre depuis le Soleil ?", choices: ["8 minutes", "1 seconde", "1 heure", "24 heures"], correctIndex: 0 },
    { question: "Quelle est la capitale du Japon ?", choices: ["Tokyo", "Kyoto", "Osaka", "Nagoya"], correctIndex: 0 },
    { question: "Quelle est la plus longue rivière d'Afrique ?", choices: ["Nil", "Congo", "Zambèze", "Niger"], correctIndex: 0 },
    { question: "Quel est le premier président des États-Unis ?", choices: ["Thomas Jefferson", "John Adams", "George Washington", "Abraham Lincoln"], correctIndex: 2 },
    { question: "Quel est l'animal national du Canada ?", choices: ["Castor", "Caribou", "Loup", "Ours polaire"], correctIndex: 0 },
    { question: "Quel est le plus petit oiseau du monde ?", choices: ["Colibri", "Moineau", "Canari", "Pinson"], correctIndex: 0 },
    { question: "Quel est le plus vieux musée du monde ?", choices: ["Louvre", "British Museum", "Musée du Vatican", "Musée d'Alexandrie"], correctIndex: 2 },
    { question: "Quel est le plus long os du corps humain ?", choices: ["Fémur", "Humérus", "Tibia", "Fibula"], correctIndex: 0 },
    { question: "Quelle est la devise nationale de la France ?", choices: ["Liberté, Égalité, Fraternité", "In God We Trust", "E pluribus unum", "Vive la France"], correctIndex: 0 },
    { question: "Quel est le plus haut gratte-ciel du monde ?", choices: ["Burj Khalifa", "Shanghai Tower", "One World Trade Center", "Taipei 101"], correctIndex: 0 },
    { question: "Quel est le symbole chimique du carbone ?", choices: ["C", "Ca",It seems like the message was cut off. Let me continue from where it left off:

```javascript
    // continuation of the questions array
    { question: "Quel est le symbole chimique du carbone ?", choices: ["C", "Ca", "Cb", "Co"], correctIndex: 0 }
];

function startQuiz() {
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('restart-message').style.display = 'none';
    document.getElementById('victory-message').style.display = 'none';
    score = 0; // Réinitialisation du score
    selectedQuestions = []; // Réinitialisation des questions sélectionnées
    selectRandomQuestions(); // Sélectionne 15 questions aléatoires
    currentQuestionIndex = 0; // Réinitialisation de l'index de question
    showQuestion();
}

function selectRandomQuestions() {
    let availableQuestions = [...questions]; // Copie du tableau de toutes les questions disponibles
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

    currentQuestionIndex++; // Passer à la question suivante

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
