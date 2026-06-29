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

document.addEventListener("keydown", function(event) { // Έλεγχος πληκτρολογίου
    if (event.key === "ArrowUp")    { direction = "up"; }
    if (event.key === "ArrowDown")  { direction = "down"; }
    if (event.key === "ArrowLeft")  { direction = "left"; }
    if (event.key === "ArrowRight") { direction = "right"; }
});

// Συνάρτηση για να αλλάζει κατεύθυνση το φίδι από τα κουμπιά του κινητού
function changeDirection(newDirection) {
    if (newDirection === "up")    { direction = "up"; }
    if (newDirection === "down")  { direction = "down"; }
    if (newDirection === "left")  { direction = "left"; }
    if (newDirection === "right") { direction = "right"; }
}
function drawGame() {   // Σχεδίαση των στοιχείων στην οθόνη
    gameContext.clearRect(0, 0, canvas.width, canvas.height); 

    
    gameContext.fillStyle = "#f43f5e"; 
    gameContext.fillRect(food[0] * 20, food[1] * 20, 20, 20);

    for (let i = 0; i < snake.length; i++) {
        let x = snake[i][0];
        let y = snake[i][1];
        
        gameContext.fillStyle = "#10b981"; 
        gameContext.fillRect(x * 20, y * 20, 20, 20);  
    }
}


function updateSnake() { // Κίνηση και έλεγχοι (συγκρούσεις, σκορ)
    let head = snake[0];
    let newHead;

    if (direction === "up")    { newHead = [head[0], head[1] - 1]; }
    if (direction === "down")  { newHead = [head[0], head[1] + 1]; }
    if (direction === "left")  { newHead = [head[0] - 1, head[1]]; }
    if (direction === "right") { newHead = [head[0] + 1, head[1]]; }

    
    if (newHead[0] < 0 || newHead[0] > 19 || newHead[1] < 0 || newHead[1] > 19) { // Έλεγχος πρόσκρουσης σε τοίχο
        alert("Game Over! Χτύπησες στον τοίχο!");
        resetGame(); 
        return; 
    }

    snake.unshift(newHead);


    if (newHead[0] === food[0] && newHead[1] === food[1]) { // Έλεγχος αν έφαγε το φαγητό
        food = [getRandomPosition(), getRandomPosition()];
        score += 10; 
        document.getElementById("currentScore").innerText = score; 
    } else {
        snake.pop(); 
    }
    
    for (let i = 1; i < snake.length; i++) {  // Έλεγχος αν δάγκωσε την ουρά του
        if (newHead[0] === snake[i][0] && newHead[1] === snake[i][1]) {
            alert("Game Over! Δάγκωσες την ουρά σου!");
            resetGame(); 
            return;
        }
    }
} 

function resetGame() { // Επαναφορά του παιχνιδιού χωρίς reload της σελίδας
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


function gameLoop() { // Το Game Loop του παιχνιδιού
    updateSnake();
    drawGame();
}

// Εκτέλεση κάθε 200ms
setInterval(gameLoop, 200);