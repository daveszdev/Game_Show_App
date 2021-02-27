// I added the variables.
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const buttonReset = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');
const hiddenChar = document.querySelector('#phrase ul');
const shownChar = document.getElementsByClassName('show');
const letters = document.getElementsByClassName('letter');
const hearts = document.querySelectorAll('.tries img');
const title = document.querySelector('.title');
let missed = 0;

//  I added 5 phrases.
const phrases = [
  'seashells by the seashore',
  'eddie edited it',
  'red lorry yellow lorry',
  'she sees cheese',
  'we all scream for ice cream'
];

// I added an event listener method, it hides the "Start Game" button.
buttonReset.addEventListener( 'click', () => {
  overlay.style.display = 'none';
});

// I created a function called getRandomPhraseAsArray.
function getRandomPhraseAsArray(arr) {
  const randomPhrase = arr[Math.floor(Math.random() * arr.length)];
  return randomPhrase.split('');
}

// I created a function called addPhraseToDisplay. The "for loop" loops through all of the
// elements inside the array.
function addPhraseToDisplay(arr) {
    for ( i = 0; i < arr.length; i++ ) {
      const lis = document.createElement("li");
      lis.textContent = arr[i];
      hiddenChar.appendChild(lis);
      if ( arr[i] !== ' ' ) {
        lis.className = "letter";
      } else {
        lis.className = "space";
    }
  }
}

const charArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(charArray);

// I created a function called checkLetter, It checks if the player guessed the right letters.
function checkLetter(guess) {
  let match = null;
  for ( i = 0; i < letters.length; i++) {
    if (guess.textContent == letters[i].textContent) {
      letters[i].classList.add('show');
      match = true;
  }
}
  return match;
}

// I added a 'click' event listener to the keyboard.
qwerty.addEventListener( 'click', (e) => {
  if ( e.target.tagName == 'BUTTON' ) {
    const clickedChar = e.target;
    clickedChar.classList.add('chosen');
    clickedChar.disabled = 'true';
    const charFound = checkLetter(clickedChar);

    if ( charFound === null ) {
    let loose = missed;
    hearts[loose].setAttribute("src", "images/lostHeart.png");
    missed += 1;
    }
  }
  checkWin();
});

// This function checks if the player won or lost the game. The player
// can play again in both situations when the game is over.
function checkWin() {
      if (shownChar.length === letters.length) {
        overlay.style.display = 'flex';
        overlay.className = 'win';
        title.textContent = 'You won the game! :)';
        buttonReset.textContent = 'Play again!';
      } else if (missed >= 5) {
        overlay.style.display = 'flex';
        overlay.className = 'lose';
        title.textContent = 'You lost the game! :(';
        buttonReset.textContent = 'Play again!';
      }
    }

  window.addEventListener( 'click', (e) => {
      if (e.target.textContent === 'Play again!'){
        missed = 0;
        window.location.reload(true);
      }
    });
