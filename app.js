const guessNumberForm = document.querySelector(".guessNumber")
const resultContainer = document.querySelector(".result")
const userGuessField = document.querySelector(".form-control")
let counter = 1
const randomNumber = Math.floor((Math.random() * 100) + 1)
let gesses = []

// Restart Button
const endGame = () => {
    userGuessField.disabled = false
    guessNumberForm.submit.disabled = false
    resultContainer.innerHTML = ""
    userGuessField.focus()
    userGuessField.value = ""
    counter = 1
    gesses = []
}

// Win The Game
const win = () => {
    let template = `
    <div>
    <p class= "p-5 bg-primary text-center text-light">!You Win!</p>
    </div>
    <button class= "btn btn-warning" onclick="endGame()">Restart</button>
    `
    resultContainer.innerHTML = template
    userGuessField.disabled = true
    guessNumberForm.submit.disabled = true
}

// Game Over
const gameOver = () => {
    let template = `
    <div>
    <p>Previous Guesses:${gesses}, ${userGuessField.value} </p>
    <p class= "p-5 bg-danger text-center text-light">!Game Over!</p>
    </div>
    <button class= "btn btn-warning restart" onclick="endGame()">Restart</button>
    <p>The Answer Was ${randomNumber}</p>
    `
    resultContainer.innerHTML = template
    userGuessField.disabled = true
    guessNumberForm.submit.disabled = true
}

// wrong Guess
const lose = hint => {
    let template = `
    <div>
    <p>Previous Guesses:${gesses}</p>
    <p>Chansses: ${10 - counter}</p>
    <p class= "p-5 bg-warning text-center text-light">!Wrong Guess!</p>
    <p>${hint}</p>
    </div>
    `
    resultContainer.innerHTML = template
    userGuessField.focus()
    userGuessField.value = ""
}

const guessNumber = (event, hint) => {
    event.preventDefault()
    let number = Number(event.target.number.value)

    if (number < 1 || number > 100 || number == "") {
        alert("Please Insert An Number From 1 to 100")
        userGuessField.value = ""
        return
    }

    if (number == randomNumber) {
        win()
    }
    else if (counter == 10) {
        gameOver()
    }
    else {
        if (number > randomNumber) {
            hint = "Your Guess Is Higher Than The Answer"
        } else if (number < randomNumber) {
            hint = "Your Guess Is Lower Than The Answer"
        }
        
        lose(hint)
    }

    gesses.push(number)
    counter++
}

guessNumberForm.addEventListener("submit", event => guessNumber(event))