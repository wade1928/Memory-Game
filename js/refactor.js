const deck = document.querySelector('.deck');
let openedCards = [];
let clickCounter = 0;
let moveCounter = 0;
let matches = 0;
let modal = document.getElementById('myModal');
let seconds = 0;
let minutes = 0;
let score = 100;
let count = 5;
let arrayOfStars = Array.from(document.getElementById('starsCount').children);

$(document).ready(function() {
  shuffleDeck();
  reset();
  startTimer();
});

//Event Listener for 'card' click
$('.card').on('click', function() {
  addMoves();
  showCard(this);
});

//Event Listener for 'refresh' click
$('.restart').on('click', function() {
  /*$('.card').removeClass('open');
  $('.card').removeClass('show');
  $('.card').removeClass('match');*/
  stopTimer();
  shuffleDeck();
  reset();
  startTimer();
});

//* shuffle the list of cards using the provided "shuffle" method below
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

//function to call the shuffle function and append to the DOM
function shuffleDeck() {
  const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
  shuffledCards = shuffle(cardsToShuffle);
  for (card of shuffledCards) {
    deck.appendChild(card);
  }
};

//function to reset all values to the original state
function reset() {
  $('.card').removeClass('open');
  $('.card').removeClass('show');
  $('.card').removeClass('match');
  openedCards = [];
  clickCounter = 0;
  moveCounter = 0;
  $('.moves').text(0);
  matches = 0;
  score = 100;
};

//function to start timer
function startTimer() {
  seconds = 0;
  minutes = 0;
  timer = setInterval(function() {
    seconds++;
    if (seconds < 10) {
      document.getElementById("seconds").innerText = ':0' + seconds % 60;
    } else {
      document.getElementById("seconds").innerText = ':' + seconds % 60;
    }
    document.getElementById("minutes").innerText = parseInt(seconds / 60);
  }, 1000);
};

//function to increment the moveCouter variable
function addMoves() {
  clickCounter++;
  if (clickCounter % 2 === 0) {
    moveCounter++;
    checkStars();
  }

  if (moveCounter === 1) {
    document.getElementById('moves').textContent = 'Move';
  } else {
    document.getElementById('moves').textContent = 'Moves';
  }

  $('.moves').text(moveCounter);
};

// function to display the card's symbol
function showCard(card) {
  $(card).addClass('open show');
  addOpen(openedCards, card);
};

// function to add clicked cards to an array
function addOpen(array, card) {
  openedCards.push(card);
  checkForMatch(openedCards, card);
}

//function to check the openedCards array for a match
function checkForMatch(array, card) {
  if (clickCounter % 2 === 0) {
    for (let i = 0; i < openedCards.length - 1; i++) {
      let classL1 = openedCards[openedCards.length - 2].firstElementChild.classList[1];
      let classL2 = card.firstElementChild.classList[1];
      //check to see if the same card was clicked twice
      if (openedCards[openedCards.length - 2].id === card.id) {
        noMatch();
        //check to see if the symbol matches on both cards
      } else if (classL1 === classL2) {
        card.classList.add('match');
        card.classList.remove('open');
        card.classList.remove('show');
        openedCards[i].classList.add('match');
        openedCards[i].classList.remove('open');
        openedCards[i].classList.remove('show');
        openCards = openedCards.splice(openedCards.length - 2, 2);
        matches++;
        checkWin();
        //if the symbol doesn't match and the same card was not clicked
      } else {
        noMatch();
      }
    }
  }
};

function noMatch() {
  $('body').css('pointer-events', 'none');
  openedCards[openedCards.length - 1].classList.add('noMatch');
  openedCards[openedCards.length - 2].classList.add('noMatch');

  let timeoutID;
  let timeoutID2;

  function delayedFunction() {
    timeoutID = window.setTimeout(notAMatch, 600, card, openedCards);
    timeoutID = window.setTimeout(enableClicks, 700);
  };
  delayedFunction();
}

//if the cards do not match, remove the cards from the list and hide the card's symbol
function notAMatch(card1, card2) {

  $(card1).removeClass('open');
  $(card1).removeClass('show');
  $(card2).removeClass('open');
  $(card2).removeClass('show');
  $(card1).removeClass('noMatch');
  $(card2).removeClass('noMatch');
  openCards = openedCards.splice(openedCards.length - 2, 2);
};

//enable clicks after unmatched cards disappear
function enableClicks() {
  $('body').css('pointer-events', 'auto');
}

//check to see if all cards are matched
function checkWin() {
  if (matches === 8) {
    stopTimer();
    getScore();
    displayModal();
  }
};

//stops timer
function stopTimer() {
  clearInterval(timer);
};

//displays modal with score/time info after a win
function displayModal() {
  getStars();
  modal.style.display = "block";
  $('#time').text(minutes + ':' + seconds);
  $('#score').text(score);
  $('#stars').text(count);

}

//if the user clicks on yes to play again
$('#yes').on('click', function() {
  modal.style.display = "none";
  $('.card').removeClass('open');
  $('.card').removeClass('show');
  $('.card').removeClass('match');
  stopTimer();
  resetStars();
  reset();
  shuffleDeck();
  startTimer();
});

//if the user clicks no after a win
$('#no').on('click', function() {
  modal.style.display = "none";
});

//SCORING SECTION

//check to see what score to display in the modal
function getScore() {
  if (seconds > 45) {
    score -= 10;
  } else if (seconds === 40) {
    score -= 10;
  } else if (seconds === 35) {
    score -= 10;
  } else if (seconds === 30) {
    score -= 10;
  }
}

//removes stars based on number of moves
function checkStars() {
  if (moveCounter === 14) {
    $('#star1').css('display', 'none');
    score -= 10;
  } else if (moveCounter === 16) {
    $('#star2').css('display', 'none');
    score -= 10;
  } else if (moveCounter === 18) {
    $('#star3').css('display', 'none');
    score -= 10;
  } else if (moveCounter === 20) {
    $('#star4').css('display', 'none');
    score -= 10;
  }
};

//get count of stars remaining to display in the modal
function getStars() {
  for (let i = 0; i < arrayOfStars.length; i++) {
    if (arrayOfStars[i].style.display === 'none') {
      count--;
    }
    console.log(count);
  }
};

//adds stars back the DOM
function resetStars() {
  for (let i = 0; i < arrayOfStars.length; i++) {
    if (arrayOfStars[i].style.display === 'none') {
      arrayOfStars[i].style.display = 'inline-block';
    }
  }
  count = 5;
}









//   *    + if all cards have matched, display a message with the final score