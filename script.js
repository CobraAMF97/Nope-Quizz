function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod/.test(navigator.userAgent);
}

function showTutorial() {
    const tutorialText = document.getElementById('tutorialText');
    if (isMobileDevice()) {
        tutorialText.innerHTML = 'Utilisez le glissement du doigt pour diriger le serpent. Évitez les obstacles et mangez la nourriture pour grandir.';
    } else {
        tutorialText.innerHTML = 'Utilisez les flèches directionnelles pour diriger le serpent. Évitez les obstacles et mangez la nourriture pour grandir.';
    }
}

function startGame() {
    document.getElementById('tutorial').style.display = 'none';
    document.getElementById('renarverButton').style.display = 'none';
    document.body.classList.remove('game-over');

    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const boxSize = 20;
    let snake = [{x: boxSize * 5, y: boxSize * 5}];
    let direction = {x: boxSize, y: 0};
    let nextDirection = direction;
    let food = {x: boxSize * Math.floor(Math.random() * 15), y: boxSize * Math.floor(Math.random() * 15)};
    let obstacles = [];
    let gameInterval;
    let score = 0;
    const maxScore = 2000;
    let headAnimationCounter = 0;
    let showMessage = false;

    canvas.width = boxSize * 15;
    canvas.height = boxSize * 15;

    function drawSquare(x, y, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, boxSize, boxSize);
    }

    function drawSnake() {
        if (headAnimationCounter > 0) {
            drawSquare(snake[0].x, snake[0].y, 'white');
            headAnimationCounter--;
        } else {
            drawSquare(snake[0].x, snake[0].y, 'white');
        }
        snake.slice(1).forEach(segment => drawSquare(segment.x, segment.y, 'white'));
    }

    function drawFood() {
        drawSquare(food.x, food.y, 'green');
    }

    function drawObstacles() {
        obstacles.forEach(obstacle => drawSquare(obstacle.x, obstacle.y, 'red'));
    }

    function moveSnake() {
        direction = nextDirection;
        const newHead = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};
        snake.unshift(newHead);

        if (newHead.x === food.x && newHead.y === food.y) {
            let validFoodPosition = false;
            while (!validFoodPosition) {
                food = {x: boxSize * Math.floor(Math.random() * 15), y: boxSize * Math.floor(Math.random() * 15)};
                validFoodPosition = true;

                for (let i = 0; i < snake.length; i++) {
                    if (food.x === snake[i].x && food.y === snake[i].y) {
                        validFoodPosition = false;
                        break;
                    }
                }

                for (let i = 0; i < obstacles.length; i++) {
                    if (food.x === obstacles[i].x && food.y === obstacles[i].y) {
                        validFoodPosition = false;
                        break;
                    }
                }
            }

            score += 100;
            document.getElementById('score').innerText = score;

            if (score === 300 && !showMessage) {
                showMessage = true;
                document.getElementById('message').style.display = 'block';
                setTimeout(() => {
                    document.getElementById('message').style.display = 'none';
                    addObstacles();
                }, 3000);
            } else if (score > 300) {
                addObstacles();
            }

            headAnimationCounter = 5;

            if (score >= maxScore) {
                clearInterval(gameInterval);
                alert("Félicitations, Julie ! Le serpent sait maintenant que tu es digne de connaître le mot de passe. Le voici : CAPDES3ANS. Utilise-le pour découvrir le trésor caché.");
                window.location.href = "https://soeur.b12sites.com/the-last-goodbye";
            }
        } else {
            snake.pop();
        }
    }

    function checkCollision() {
        const head = snake[0];
        if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
            return true;
        }
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                return true;
            }
        }
        for (let i = 0; i < obstacles.length; i++) {
            if (head.x === obstacles[i].x && head.y === obstacles[i].y) {
                return true;
            }
        }
        return false;
    }

    function addObstacles() {
        obstacles = [];

        for (let i = 0; i < 2; i++) {
            let validObstaclePosition = false;
            while (!validObstaclePosition) {
                const newObstacle = {
                    x: boxSize * Math.floor(Math.random() * 15),
                    y: boxSize * Math.floor(Math.random() * 15)
                };
                validObstaclePosition = true;

                for (let j = 0; j < snake.length; j++) {
                    if (newObstacle.x === snake[j].x && newObstacle.y === snake[j].y) {
                        validObstaclePosition = false;
                        break;
                    }
                }

                if (newObstacle.x === food.x && newObstacle.y === food.y) {
                    validObstaclePosition = false;
                }

                if (validObstaclePosition) {
                    obstacles.push(newObstacle);
                }
            }
        }
    }

    function update() {
        moveSnake();
        if (checkCollision()) {
            clearInterval(gameInterval);
            document.body.classList.add('game-over');
            alert("Game Over!");
            document.getElementById('renarverButton').style.display = 'block';
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawSnake();
        drawFood();
        drawObstacles();
    }

    function gameLoop() {
        update();
        draw();
    }

    // Contrôles pour les appareils mobiles
    document.addEventListener('touchstart', (event) => {
        const touchX = event.touches[0].clientX;
        const touchY = event.touches[0].clientY;
        const rect = canvas.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        if (Math.abs(touchX - centerX) > Math.abs(touchY - centerY)) {
            const newDirection = touchX > centerX ? {x: boxSize, y: 0} : {x: -boxSize, y: 0};
            if (newDirection.x !== -direction.x) nextDirection = newDirection;
        } else {
            const newDirection = touchY > centerY ? {x: 0, y: boxSize} : {x: 0, y: -boxSize};
            if (newDirection.y !== -direction.y) nextDirection = newDirection;
        }
    });

    // Contrôles pour les ordinateurs (flèches directionnelles)
    document.addEventListener('keydown', (event) => {
        const key = event.key;
        let newDirection;
        if (key === 'ArrowUp') newDirection = {x: 0, y: -boxSize};
        else if (key === 'ArrowDown') newDirection = {x: 0, y: boxSize};
        else if (key === 'ArrowLeft') newDirection = {x: -boxSize, y: 0};
        else if (key === 'ArrowRight') newDirection = {x: boxSize, y: 0};

        if (newDirection && (newDirection.x !== -direction.x || newDirection.y !== -direction.y)) {
            nextDirection = newDirection;
        }
    });

    gameInterval = setInterval(gameLoop, 150);
}

function restartGame() {
    startGame();
}

// Afficher le tutoriel au démarrage
showTutorial();
