let canvas = document.getElementById("gameCanvas");
let gameContext = canvas.getContext("2d");

let score = 0;
let highScore = 0;

function getRandomPosition() { 
    return Math.floor(Math.random() * 20);
}

let food = [getRandomPosition(), getRandomPosition()];

let snake = [
    [10, 10],
    [9, 10],
    [8, 10]
];

let direction = "up";

document.addEventListener("keydown", function(event) { 
    if (event.key === "ArrowUp")    { direction = "up"; }
    if (event.key === "ArrowDown")  { direction = "down"; }
    if (event.key === "ArrowLeft")  { direction = "left"; }
    if (event.key === "ArrowRight") { direction = "right"; }
});

function changeDirection(newDirection) {
    if (newDirection === "up")    { direction = "up"; }
    if (newDirection === "down")  { direction = "down"; }
    if (newDirection === "left")  { direction = "left"; }
    if (newDirection === "right") { direction = "right"; }
}

function drawGame() {   
    // 1. ΔΥΝΑΜΙΚΟ ΜΠΛΕ ΦΟΝΤΟ
    let redBg = Math.min(50 + (score / 10) * 10, 150);   
    let greenBg = Math.min(80 + (score / 10) * 13, 210); 
    let blueBg = Math.min(120 + (score / 10) * 13, 250);  
    
    gameContext.fillStyle = `rgb(${redBg}, ${greenBg}, ${blueBg})`;
    gameContext.fillRect(0, 0, canvas.width, canvas.height);

    // ΔΙΑΚΡΙΤΙΚΟ ΠΛΕΓΜΑ
    gameContext.strokeStyle = score > 40 ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.04)";
    gameContext.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 20) {
        gameContext.beginPath();
        gameContext.moveTo(i, 0); gameContext.lineTo(i, canvas.height);
        gameContext.moveTo(0, i); gameContext.lineTo(canvas.width, i);
        gameContext.stroke();
    }

    /* --------------------------------------------------------------------------
       2. ΝΕΟΣ ΗΛΙΟΣ (Με 8 περιμετρικές ακτίνες)
       -------------------------------------------------------------------------- */
    let foodX = food[0] * 20 + 10;
    let foodY = food[1] * 20 + 10;

    // Λάμψη (glow)
    gameContext.shadowBlur = score > 60 ? 0 : 12;
    gameContext.shadowColor = "#f59e0b";

    // Σχεδίαση 8 ακτίνων γύρω από το κέντρο
    gameContext.strokeStyle = "#d97706";
    gameContext.lineWidth = 2;
    
    for (let i = 0; i < 8; i++) {
        let angle = (i * Math.PI) / 4; // Χωρίζουμε τον κύκλο σε 8 ίσα μέρη (45 μοίρες)
        
        // Από πού ξεκινάει η ακτίνα (λίγο έξω από τον πυρήνα)
        let startX = foodX + Math.cos(angle) * 6;
        let startY = foodY + Math.sin(angle) * 6;
        
        // Πού τελειώνει η ακτίνα
        let endX = foodX + Math.cos(angle) * 11;
        let endY = foodY + Math.sin(angle) * 11;
        
        gameContext.beginPath();
        gameContext.moveTo(startX, startY);
        gameContext.lineTo(endX, endY);
        gameContext.stroke();
    }

    // Ο κεντρικός στρογγυλός πυρήνας του ήλιου (σχεδιάζεται από πάνω για να κρύψει τις βάσεις των ακτίνων)
    gameContext.fillStyle = "#facc15"; 
    gameContext.beginPath();
    gameContext.arc(foodX, foodY, 6, 0, 2 * Math.PI);
    gameContext.fill();

    gameContext.shadowBlur = 0; // Επαναφορά σκιών
    /* -------------------------------------------------------------------------- */

    // 3. ΔΥΝΑΜΙΚΟ ΦΙΔΙ
    let snakeRed = Math.min((score / 10) * 35, 250);
    let snakeGreen = Math.min((score / 10) * 28, 200);
    let snakeBlue = Math.min((score / 10) * 3, 20); 
    let snakeColor = `rgb(${snakeRed}, ${snakeGreen}, ${snakeBlue})`;

    for (let i = 0; i < snake.length; i++) {
        let x = snake[i][0];
        let y = snake[i][1];

        if (i === 0) {
            gameContext.fillStyle = snakeColor; 
            gameContext.fillRect(x * 20, y * 20, 20, 20);
            
            gameContext.fillStyle = score > 0 ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.4)";
            gameContext.fillRect(x * 20 + 4, y * 20 + 4, 3, 3);
            gameContext.fillRect(x * 20 + 13, y * 20 + 4, 3, 3);
        } else {
            gameContext.fillStyle = `rgba(${snakeRed}, ${snakeGreen}, ${snakeBlue}, ${1 - (i / snake.length) * 0.4})`;
            gameContext.fillRect(x * 20 + 1, y * 20 + 1, 18, 18); 
        }
    }
}

function updateSnake() { 
    let head = snake[0];
    let newHead;

    if (direction === "up")    { newHead = [head[0], head[1] - 1]; }
    if (direction === "down")  { newHead = [head[0], head[1] + 1]; }
    if (direction === "left")  { newHead = [head[0] - 1, head[1]]; }
    if (direction === "right") { newHead = [head[0] + 1, head[1]]; }

    if (newHead[0] < 0 || newHead[0] > 19 || newHead[1] < 0 || newHead[1] > 19) {
        alert("Game Over! Χτύπησες στον τοίχο!");
        resetGame(); 
        return; 
    }

    snake.unshift(newHead);

    if (newHead[0] === food[0] && newHead[1] === food[1]) {
        food = [getRandomPosition(), getRandomPosition()];
        score += 10; 
        document.getElementById("currentScore").innerText = score; 
    } else {
        snake.pop(); 
    }
    
    for (let i = 1; i < snake.length; i++) { 
        if (newHead[0] === snake[i][0] && newHead[1] === snake[i][1]) {
            alert("Game Over! Δάγκωσες την ουρά σου!");
            resetGame(); 
            return;
        }
    }
} 

function resetGame() {
    if (score > highScore) {
        highScore = score;
        document.getElementById("highScore").innerText = highScore;
    }
    score = 0;
    document.getElementById("currentScore").innerText = score;
    snake = [[10, 10], [9, 10], [8, 10]];
    direction = "up";
    food = [getRandomPosition(), getRandomPosition()];
}

function gameLoop() { 
    updateSnake();
    drawGame();
}

setInterval(gameLoop, 200);