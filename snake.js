// Get the canvas and context for drawing
let canvas = document.getElementById('game');
let context = canvas.getContext('2d');

// Get the score element for updating the score
let scoreElement = document.getElementById('score');

// Define the size of a box (segment of the snake or size of food)
let box = 20;

// Initialize the score
let score = 0;

// Initialize the snake as an array of segments
let snake = [];
snake[0] = { x: 10 * box, y: 10 * box };

// Set the initial direction of the snake
let direction = "right";

// Create the food at a random position
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

// Create the obstacle at a random position
let obstacle = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

// Function to draw the game background
function createBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

// Function to draw the snake
function createSnake() {
    for(let i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

// Function to draw the food
function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

// Function to draw the obstacle
function drawObstacle() {
    context.fillStyle = "black";
    context.fillRect(obstacle.x, obstacle.y, box, box);
}

// Event listener for arrow keys to change the direction of the snake
document.addEventListener('keydown', update);

// Function to update the direction of the snake based on the key pressed
function update(event) {
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

// Main game function
function startGame() {
    // If the snake goes off the edge of the screen, wrap it around to the other side
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    // Check if the snake has collided with itself
    for(let i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(game);
            alert('Game Over :(');
        }
    }

    // Check if the snake has collided with the obstacle
    if(snake[0].x == obstacle.x && snake[0].y == obstacle.y) {
        clearInterval(game);
        alert('Game Over :(');
    }

    // Draw the game elements
    createBG();
    createSnake();
    drawFood();
    drawObstacle();

    // Move the snake in the current direction
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    // If the snake eats the food, increase the score and create new food
    if(snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        score++;
        scoreElement.innerText = "Score: " + score;
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    // Create a new head for the snake
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    // Add the new head to the front of the snake
    snake.unshift(newHead);
}

// Start the game loop
let game = setInterval(startGame, 100);