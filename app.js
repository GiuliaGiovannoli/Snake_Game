const grid = document.querySelector('.grid')
const startButton = document.getElementById('start')
const scoreDisplay = document.getElementById('score')
let squares = []
let currentSnake = [2,1,0]
let direction = 1
const width = 10
let appleIndex = 0
let score = 0
let intervalTime = 1000
let speed = 0.9
let timerId = 0


function createGrid() {
    //create 100 of these elements with a for loop
    for (let i=0; i < width*width; i++) {
    //create element
    const square = document.createElement('div')
    //add styling to the element
    square.classList.add('square')
    //put the element into a grid
    grid.appendChild(square)
    //push it into a new squares array    
    squares.push(square)
    }
}

createGrid()

currentSnake.forEach(index => squares[index].classList.add('snake'))

function startGame() {
    //remove the snake
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    //remove the apple
    squares[appleIndex].classList.remove('apple')
    clearInterval(timerId)
    currentSnake = [2,1,0]
    score = 0
    //add new score
    scoreDisplay.textContent = score
    direction = 1
    intervalTime = 1000
    generateApple()
    //add the class of snake to our new currentSnake
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    timerId = setInterval(move, intervalTime)
}

function move() {
    if (
        (currentSnake[0] + width >= width*width && direction === width) || //if snake has hit bottom border
        (currentSnake[0] % width === width-1 && direction === 1) || //if snake has hit right border
        (currentSnake[0] % width === 0 && direction === -1) || //if snake has hit left border
        (currentSnake[0] - width < 0 && direction === -width)  //if snake has hit top border
    ) {
    return clearInterval(3000)
    } else if (squares[currentSnake[0] + direction].classList.contains('snake')) {
        window.alert('Game over')
        startGame()
    }
    //remove last element from currentSnake array
    const tail = currentSnake.pop()
    //remove styling from last element
    squares[tail].classList.remove('snake')
    //add square in direction heading
    currentSnake.unshift(currentSnake[0] + direction)
    //add styling 
    squares[currentSnake[0]].classList.add('snake')
    //snake eats apple
    if (squares[currentSnake[0]].classList.contains('apple')) {
        //remove the class of apple
        squares[currentSnake[0]].classList.remove('apple')
        //grow snake by adding class of snake to it
        squares[tail].classList.add('snake')
        //grow snake array
        currentSnake.push(tail)
        //generate new apple
        generateApple()
        //add one to the score
        score++
        //display score
        scoreDisplay.textContent = score
        //speed up snake
        clearInterval(timerId)
        intervalTime = intervalTime * speed
        timerId = setInterval(move, intervalTime)
    }
    squares[currentSnake[0]].classList.add('snake')
}

function generateApple() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
} 

generateApple()

// 39 is right arrow
// 38 is for the up arrow
// 37 is for the left arrow
// 40 is for the down arrow
function control(e) {
    if (e.keyCode === 39) {
        direction = 1
    } else if (e.keyCode === 38) {
        direction = -width
    } else if (e.keyCode === 37) {
        direction = -1
    } else if (e.keyCode === 40) {
        direction = +width
    }
}

document.addEventListener('keyup', control)

startButton.addEventListener('click', startGame)