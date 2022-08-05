const words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango'
]

let wins = 0
let losses = 0
let currentWord

class Word {
  constructor(word) {
    this.word = word
    this.displayWord = word.replaceAll(/[\w]/g, "_")
    this.remainingGuesses = 10
    this.incorrectLetters = []
    this.correctLetters = []
  }

  // implement the guessLetter function:
  // guessLetter(letter) {}
  guessLetter(letter){
    if (this.correctLetters.includes(letter)||(this.incorrectLetters.includes(letter))) {
      return  
    }
    if (this.word.includes(letter)) {
      this.correctLetters.push(letter)
      let correctAnswer = []
      for (let i = 0; i < this.word.length; i++) {
        if(this.word[i]===letter){
          correctAnswer = array[i];
        }  
      }
      
    let newWord = ''
    for(let index =0; index < this.displayWord.length; index++) {
      const element = this.displayWord[index];
      if (correctAnswer.includes(index)) {
        newWord = newWord + letter
      } else {
        newWord = newWord + element
      }
    }
      this.displayWord = newWord
    } else {
      this.incorrectLetters.push(letter)
      this.remainingGuesses --
    }
  }


    

  // implement the updateScreen function:
  // updateScreen() {}
  updateScreen(){
    document.getElementById("incorrect-letters").innerHTML = this.incorrectLetters ;
    document.getElementById("remaining-guesses").innerHTML = this.remainingGuesses ;
    document.getElementById("word-to-guess").innerHTML = this.displayWord ;
  }


  // implement the isGameOver function:
  // isGameOver() {}
  isGameOver(){
    if(this.displayWord!==this.word&&this.remainingGuesses>0){
      return false
    } else {
      return true
    }

  };

  // implement the getWinOrLoss function:
  // getWinOrLoss() {}
  getWinOrLoss(){
    if(this.displayWord!==this.word&&this.remainingGuesses>0){
      return null
    }
    if(this.displayWord==this.word&&this.remainingGuesses>0){
      return 'win'
    }
    if(this.remainingGuesses<=0&&this.displayWord!==this.word){
      return 'loss'
    }
  }
}

function newGame() {
  const randomWord = words[Math.floor(Math.random() * words.length)]
  currentWord = new Word(randomWord)
  currentWord.updateScreen()
}

document.onkeyup = function(e) {
  const pressedKey = e.key.toLowerCase()
  // early exit for non-letter key presses
  if (!/^[a-z]{1}$/g.test(pressedKey)) return

  // pass in guessed letter to word obj
  currentWord.guessLetter(pressedKey)
  // allow word obj to update screen
  currentWord.updateScreen()

  // check if game is over
  const gameOver = currentWord.isGameOver()

  // if game is over, update wins/losses and start new game
  if (gameOver) {
    const previousWord = document.getElementById('previous-word')
    const winDisplay = document.getElementById('wins')
    const lossDisplay = document.getElementById('losses')
    previousWord.textContent = currentWord.word
    const result = currentWord.getWinOrLoss()
    if (result === 'win') {
      wins++
      winDisplay.textContent = wins
    } else if (result === 'loss') {
      losses++
      lossDisplay.textContent = losses
    }
    newGame()
  }
}

newGame()